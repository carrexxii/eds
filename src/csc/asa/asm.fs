namespace EDS.CSC.ASA

open Feliz

open EDS.Shared
open EDS.Shared.Components
open ASAEmulator
open ASAEmulator.Tokens

module ASM =
    type HistoryEntry =
        { pc : int
          acc: int
          ix : int
          mem: (int * int) option }
    [<ReactComponent>]
    let Emulator () =
        let loading, setLoading = React.useState true
        let state  , setState   = React.useState VM.State.Default
        let history, setHistory = React.useState []
        if loading then
            async {
                let! program = Services.resourceService.getProgram "test"
                match program with
                | None -> printfn "Error retrieving program"
                | Some program ->
                    program
                    |> Parser.parse
                    |> VM.load (fun s -> printfn $"{s}")
                    |> setState
                setLoading false
            } |> Async.StartImmediate
        Html.div [
            prop.className "flex flex-col"
            prop.children [
                match loading with
                | true  -> Loading ()
                | false ->
                    Button "Step" (fun e ->
                        if state.cir = END then ()
                        else
                            let newState = VM.step state
                            let mem = match newState.cir with
                                      | STO addr -> Some (addr, newState.acc)
                                      | _ -> None
                            let entry =
                                { pc  = state.pc
                                  acc = newState.acc
                                  ix  = newState.ix
                                  mem = mem }
                            setHistory (entry::history)
                            setState newState)

                    let li (name: string) (value: string) =
                        Html.li [
                            prop.className "inline m-4 px-2 py-1"
                            prop.children [
                                Html.b name
                                Html.text value
                            ]
                        ]
                    Html.ul [
                        prop.className "m-4 grow text-center border-b-2"
                        prop.children [
                            li "PC: " $"{state.pc}"
                            li "CIR: " $"{state.cir}"
                            li "ACC: " $"{state.acc}"
                            li "IX: " $"{state.ix}"
                            li "MAR: " $"{state.mar}"
                            li "MDR: " $"{state.mdr}"
                            li "flag: " $"{state.flag}"
                        ]
                    ]

                    Html.div [
                        prop.className "flex flex-row"
                        prop.children [
                            Html.ul [
                                prop.className "mx-2 text-nowrap"
                                prop.children (
                                    state.program.instrs
                                    |> Array.mapi (fun i instr ->
                                        Html.li [
                                            prop.className $"""p-1 rounded-md
                                                            {if state.pc = i then "bg-green-200" else ""}"""
                                            prop.children [
                                                Html.b $"{i + state.program.start} "
                                                Html.text $"{instr}"
                                            ]
                                        ])
                                )
                            ]
                            Html.table [
                                prop.className "h-fit m-4"
                                prop.children [
                                    Html.thead [
                                        prop.className "font-semibold"
                                        prop.children [
                                            Html.tr [
                                                Html.th [
                                                    prop.colSpan 3
                                                ]
                                                Html.th [
                                                    prop.className "border-2 text-center text-xl"
                                                    prop.colSpan state.memory.Count
                                                    prop.text "Memory Address"
                                                ]
                                            ]

                                            let th (text: string) =
                                                Html.th [
                                                    prop.className "w-32 border-2 px-2 py-1"
                                                    prop.text text
                                                ]
                                            Html.tr ([ th "Instruction"; th "ACC"; th "IX" ]
                                            @(state.memory
                                                |> Seq.sortBy _.Key
                                                |> Seq.map (fun addr -> th $"{addr.Key}")
                                                |> Seq.toList))
                                        ]
                                    ]

                                    let td (inner: string) =
                                        Html.td [
                                            prop.className "border-2 text-center"
                                            prop.text inner
                                        ]
                                    Html.tbody ([
                                        Html.tr ([
                                            td ""
                                            td ""
                                            td ""
                                        ]@(state.program.memory
                                            |> Array.rev
                                            |> Array.map (fun mem -> td $"{snd mem}")
                                            |> List.ofArray))
                                    ]@(history
                                        |> List.rev
                                        |> List.mapi (fun i entry ->
                                            if i = 0 then Html.none
                                            else
                                                Html.tr [
                                                    prop.className "h-8 align-top"
                                                    prop.children ([
                                                            td $"{entry.pc + state.program.start}"

                                                            // len - i due to the reversing
                                                            if entry.acc <> history[history.Length - i].acc
                                                            then td $"{entry.acc}"
                                                            else td ""

                                                            if entry.ix <> history[history.Length - i].ix
                                                            then td $"{entry.ix}"
                                                            else td ""
                                                    ]@(state.memory.Keys
                                                        |> Seq.rev
                                                        |> Seq.map (fun mem ->
                                                            td (match entry.mem with
                                                                | Some (addr, value)
                                                                    when addr = mem -> $"{value}"
                                                                | _ -> ""))
                                                        |> Seq.toList
                                                    ))
                                                ])
                                    ))
                                ]
                            ]
                        ]
                    ]
            ]
        ]



    let tabs =
        [ "Emulator", Emulator () ]

    let view tab =
        Tabbed tab tabs
