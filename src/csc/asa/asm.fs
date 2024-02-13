namespace EDS.CSC.ASA

open Feliz

open EDS.Shared
open EDS.Shared.Components
open ASAEmulator
open ASAEmulator.Tokens

module ASM =
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
            prop.className "flex flex-row"
            prop.children [
                match loading with
                | true  -> Loading ()
                | false ->
                    Button "Step" (fun e ->
                        let memState = state.memory
                                       |> Seq.sortBy _.Key
                                       |> Seq.map (fun e -> e.Key, e.Value)
                                       |> List.ofSeq
                        setHistory (memState::history)
                        setState (VM.step state))
                    Html.ul (
                        state.program.instrs
                        |> Array.map (fun instr ->
                            Html.li [
                                prop.className "bg-green-300"
                                prop.children [
                                    Html.text $"{instr}"
                                ]
                            ])
                    )
                    Html.ul [
                        prop.className "text-justify bg-red-200"
                        prop.children (
                            [ $"{state.acc}"; $"{state.cir}"; $"{state.pc}" ]
                            |> List.map (fun reg ->
                                Html.li [
                                    prop.className "inline"
                                    prop.children [
                                        Html.text $"{reg}"
                                    ]
                                ])
                        )
                    ]
                    Html.table [
                        prop.className "h-fit bg-slate-200"
                        prop.children [
                            Html.thead [
                                prop.className "font-semibold"
                                prop.children (
                                    state.memory
                                    |> Seq.sortBy _.Key
                                    |> Seq.map (fun addr ->
                                        Html.th [
                                            prop.className "p-2"
                                            prop.children [
                                                Html.text $"{addr.Key}"
                                            ]
                                        ])
                                )
                            ]
                            Html.tbody (
                                history
                                |> List.rev
                                |> List.map (fun memState ->
                                    Html.tr [
                                        prop.className "h-8 align-top"
                                        prop.children (
                                            memState
                                            |> List.map (fun mem ->
                                                Html.td [
                                                    prop.className "w-12 text-center border-2 border-black"
                                                    prop.children [
                                                        Html.text $"{snd mem}"
                                                    ]
                                                ])
                                        )
                                    ])
                            )
                        ]
                    ]
            ]
        ]



    let tabs =
        [ "Emulator", Emulator () ]

    let view tab =
        Tabbed tab tabs
