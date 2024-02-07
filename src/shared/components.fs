namespace EDS.Shared

open System
open Option

open Browser
open Browser.Types
open Elmish
open Feliz

[<AutoOpen>]
type SortDirection =
    | Ascending
    | Descending
    static member opposite = function
        | Ascending  -> Descending
        | Descending -> Ascending

[<AutoOpen>]
module Util =
    let concat a b =
        Html.div [
            prop.children [
                a
                b
            ]
        ]

module Components =
    let Heading text =
        Html.div [
            prop.className "prose prose-slate text-center mb-2"
            prop.children [ Html.h1 (string text) ]
        ]
    let SubHeading (text: string) =
        Html.div [
            prop.className "prose prose-slate mb-4"
            prop.children [ Html.h2 text ]
        ]
    let Section (content: string) =
        Html.article [
            prop.className "prose prose-a prose-slate"
            prop.text content
        ]
    let Article (content: ReactElement list) =
        Html.article [
            prop.className "prose prose-slate"
            prop.children content
        ]
    let Link (text: string) (addr: string) =
        Html.a [
            prop.className "prose prose-a"
            prop.href addr
            prop.text text
        ]
    let UnorderedList (xs: string list) =
        Html.ul [
            prop.className "prose prose-ul"
            prop.children (
                xs |> List.map (fun x ->
                    Html.li [
                        prop.className "prose prose-li"
                        prop.text x
                    ])
            )
        ]
    let LinkList (links: (string * string) list) =
        Html.ul [
            prop.className "prose prose-ul"
            prop.children (
                links |> List.mapi (fun i (text, href) ->
                    Html.li [
                        prop.key i
                        prop.children (Link text href)
                    ])
            )
        ]

    let Button text onClick =
        Html.button [
            prop.className "button"
            prop.text (string text)
            prop.onClick onClick
        ]

    let NumberInput (min: float) (max: float) (value: float) (onChange: float -> unit) (label: string) =
        Html.div [
            prop.className "flex flex-col justify-center text-center"
            prop.children [
                Html.p [
                    prop.className "prose prose-p"
                    prop.text label
                ]
                Html.input [
                    prop.type' "number"
                    prop.min min
                    prop.max max
                    prop.value value
                    prop.onChange onChange
                ]
            ]
        ]

    let Slider (min: float) (max: float) (step: float)
               (value: float) (onChange: float -> unit) (withText: bool) =
        Html.div [
            prop.className "text-center m-2"
            prop.children [
                Html.input [
                    prop.className "w-full"
                    prop.type' "range"
                    prop.min min
                    prop.max max
                    prop.step step
                    prop.value value
                    prop.onChange onChange
                ]
                if withText then
                    Html.p [
                        prop.className "prose prose-p"
                        prop.text $"{value}"
                    ]
            ]
        ]

    let Checkbox (text: string) (isChecked: bool) (onChange: bool -> unit) =
        Html.div [
            prop.className "flex flex-row items-center text-center"
            prop.children [
                Html.input [
                    prop.className "mx-2"
                    prop.type' "checkbox"
                    prop.isChecked isChecked
                    prop.onChange onChange
                ]
                Html.p [
                    prop.className "prose prose-p"
                    prop.text text
                ]
            ]
        ]

    let CheckList (legend: string) (xs: (string * bool * (bool -> unit)) list) =
        Html.fieldSet [
            prop.className "m-2 text-gray-700"
            prop.children ([
                Html.legend legend
            ]@ (xs |> List.map (fun (text, isChecked, fn) ->
                    Checkbox text isChecked fn)))
        ]

    let RadioList (legend: string) (selected: int) (xs: list<string * (bool -> unit)>) =
        Html.fieldSet [
            prop.className "m-2 text-gray-700"
            prop.children [
                Html.legend (string legend)
                Html.div (xs |> List.mapi (fun i x ->
                        let id = fst x
                        let isChecked = i = (int selected)
                        Html.div [
                            Html.input [
                                prop.className "form-radio ml-4"
                                prop.type' "radio"
                                prop.name legend
                                prop.id id
                                prop.defaultChecked isChecked
                                prop.onCheckedChange (snd x)
                            ]
                            Html.label [
                                prop.className "pl-2"
                                prop.text id
                                prop.htmlFor id
                            ]
                        ]
                    ))
            ]
        ]

    [<ReactComponent>]
    let TextInput label (value: string) dispatch isValid =
        let error, setError = React.useState None
        Html.label [
            prop.className "label"
            prop.children [
                Html.input [
                    prop.className (match error with
                                    | Some err -> "text-input-error"
                                    | None     -> "text-input")
                    prop.placeholder label
                    prop.value value
                    prop.onChange (fun (txt: string) ->
                        setError <| defaultValue
                            (fun str -> if str = "" then Some "Invalid input" else None)
                            isValid txt
                        dispatch txt)
                ]
                Html.p [
                    prop.className "input-error-text"
                    prop.text (defaultValue "" error)
                ]
            ]
        ]

///////////////////////////////////////////////////////////////////////////////

    [<ReactComponent>]
    let Tabbed (tabName: string) (tabs: (string * ReactElement) list) =
        let tab, setTab = React.useState (
            tabs
            |> List.tryFindIndex (fun t -> fst t = tabName)
            |> defaultValue 0)
        printfn $"Tab -> '{tab}'"
        Html.div [
            Html.nav [
                prop.className "flex flex-row rounded-full"
                prop.children (
                    tabs |> List.mapi (fun i tab ->
                        Html.p [
                            prop.className "grow p-0.5 border-x-2 text-center text-md
                                            border-slate-200 text-gray-700
                                            hover:bg-slate-200 hover:cursor-pointer hover:text-black
                                            duration-200 ease-in-out"
                            prop.onClick (fun e -> setTab i)
                            prop.children [ Html.b (fst tab) ]
                    ]))
            ]
            Html.div [
                prop.className "mt-4 px-8"
                prop.children (snd tabs[tab])
            ]
        ]

///////////////////////////////////////////////////////////////////////////////

    // [<ReactComponent>]
    type Size =
        | Small
        | Medium
        | Large
        | Full
    let Term (text: string) (size: Size) (content: ReactElement) =
        Html.div [
            prop.className "group relative inline-block font-semibold px-1"
            prop.children [
                Html.text text
                Html.span [
                    let w = match size with
                            | Small  -> "w-32"
                            | Medium -> "w-56"
                            | Large  -> "w-96"
                            | Full   -> "w-[48rem]"
                    prop.className (w + " absolute z-10 p-2 left-[5%] bottom-[105%] font-normal opacity-0 invisible
                                    group-hover:visible group-hover:opacity-100 rounded-md border-2 border-slate-800 bg-slate-300
                                    transition-all duration-500 ease-in-out")
                    prop.children content
                ]
            ]
        ]

///////////////////////////////////////////////////////////////////////////////

    [<ReactComponent>]
    let Accordion (xs: (string * string) list) =
        let opened, setOpened = React.useState (xs |> List.map (fun x -> false))
        Html.div [
            prop.className "flex flex-col ml-2 mb-4 pl-2 border-l-4 border-b-0 border-green-300"
            prop.children (
                xs |> List.mapi (fun i x ->
                    Html.div [
                        Html.div [
                            prop.className $"""border-b-2 p-2 hover:cursor-pointer font-semibold
                                                {if i = 0             then "rounded-t-lg" else ""}
                                                {if i = xs.Length - 1 then "rounded-b-lg" else ""}
                                                {if opened[i] then "text-black bg-slate-100" else "text-gray-700"}
                                                duration-200 ease-in-out"""
                            prop.text (fst x)
                            prop.onClick (fun e -> setOpened (List.updateAt i (not opened[i]) opened))
                        ]
                        Html.div [
                            prop.className $"""prose prose-p px-2 text-pretty text-justify overflow-hidden
                                                {if opened[i] then "h-fit" else "h-0"}
                                                transition-all duration-500 ease-in-out"""
                            prop.text (snd x)
                        ]
                    ]
                )
            )
        ]

///////////////////////////////////////////////////////////////////////////////

    [<ReactComponent>]
    let ErrorCard text dispatch =
        Html.div [
            prop.className "card-error"
            prop.children [
                Html.button [
                    prop.className "card-button"
                    prop.onClick (fun e -> dispatch ())
                    prop.children [ Svg.svg [ svg.className "X" ] ]
                ]
                Html.text (string text)
            ]
        ]

///////////////////////////////////////////////////////////////////////////////

    [<ReactComponent>]
    let StaticTable (xs: ReactElement list list) =
        let header  = xs.Head
        let content = xs.Tail
        Html.table [
            prop.className "prose prose-table"
            prop.children [
                Html.thead [
                    Html.tr (header |> List.map (fun h -> Html.th h))
                ]
                Html.tbody (
                    content |> List.map (fun row ->
                        Html.tr (row |> List.map (fun cell -> Html.td cell)))
                )
            ]
        ]

///////////////////////////////////////////////////////////////////////////////

    [<ReactComponent>]
    let Table (header  : string array)
              (records : string array array)
              (sortBy  : (int * SortDirection) option)
              (dispatch: int -> unit) =
        Html.table [
            prop.className "table"
            prop.children [
                Html.tr [
                    prop.className "table-row"
                    prop.children (Array.mapi
                        (fun i h ->
                            Html.th [
                                prop.className "table-header"
                                prop.onClick (fun e -> dispatch i)

                                prop.text (string h)
                                prop.children [
                                    match sortBy with
                                    | Some (si, dir) when si = i ->
                                        Svg.svg [
                                            svg.className (match dir with
                                                           | Ascending  -> "chevron-up"
                                                           | Descending -> "chevron-down")
                                        ]
                                    | _ -> Html.none
                                ]
                            ])
                        header
                    )
                ]
                for record in records do
                    Html.tr [
                        prop.className "table-row"
                        prop.tabIndex 0
                        prop.children (Array.map
                            (fun cell ->
                                Html.td [
                                    prop.className "table-cell"
                                    prop.text (string cell)
                                ])
                            record
                        )
                    ]
            ]
        ]

///////////////////////////////////////////////////////////////////////////////

    [<ReactComponent>]
    let SidebarButtons (buttons: (string * string * string) list) url =
        let expand, setExpand = React.useState true
        let button (icon, text, link) =
            Html.li [
                prop.children [
                    Html.a [
                        prop.href link
                        prop.className $"""sidebar-li {if link = url then "bg-slate-100" else ""}"""
                        prop.children [
                            Svg.svg [ svg.className $"{icon} m-2 p-3" ]
                            Html.p [
                                prop.className $"""inline-block {if not expand then "invisible" else ""}"""
                                prop.text $" — {text}"
                            ]
                        ]
                    ]
                ]
            ]

        let buttons = Html.div [
            Html.button [
                prop.className "sidebar-toggle"
                prop.ariaLabel "sidebar toggle"
                prop.onClick (fun e -> setExpand (not expand))
                prop.children [
                    Svg.svg [ svg.className
                        $"""{if expand then "arrow-left-icon" else "hamburger-icon"}
                            p-3 duration-500 ease-in"""
                    ]
                ]
            ]
            Html.ul [
                prop.className "sidebar-ul"
                prop.children (List.map button buttons)
            ]
        ]
        let sidebar = document.getElementById "sidebar"
        match expand with
        | true  -> sidebar.className <- "sidebar-open"
        | false -> sidebar.className <- "sidebar-collapsed"
        ReactDOM.createPortal (buttons, (document.getElementById "sidebar"))
