namespace EDS.Shared

open System
open Option

open Browser
open Browser.Types
open Elmish
open Feliz
open Feliz.Mafs
open Feliz.Router

module Components =
    type TextType =
        | TextString  of string
        | LatexString of string

    [<AutoOpen>]
    type SortDirection =
        | Ascending
        | Descending
        static member opposite = function
            | Ascending  -> Descending
            | Descending -> Ascending

    let Article (content: ReactElement list) =
        Html.article [
            prop.className "prose prose-zinc m-2 text-justify"
            prop.children content
        ]
    let Heading (text: string) =
        Html.h1 [
            prop.className "text-3xl text-center font-semibold"
            prop.text text
        ]
    let SubHeading (text: string) =
        Html.h2 [
            prop.className "text-xl font-semibold"
            prop.text text
        ]
    let SmallHeading (text: string) =
        Html.h3 [
            prop.className "text-lg font-semibold m-0 p-0 inline"
            prop.text text
        ]
    let Section (content: ReactElement list) =
        Html.p  [
            prop.className ""
            prop.children content
        ]
    let Link (text: string) (addr: string) =
        Html.a [
            prop.className ""
            prop.href addr
            prop.text text
        ]
    let UnorderedList (xs: ReactElement list) =
        Html.ul (
            xs |> List.map (fun x ->
                Html.li [
                    prop.className "prose prose-li"
                    prop.children x
                ])
        )
    let OrderedList (xs: string list) =
        Html.ol (
            xs |> List.map (fun x ->
                Html.li x)
        )
    let LinkList (links: (string * string) list) =
        Html.ul [
            prop.className ""
            prop.children (
                links |> List.mapi (fun i (text, href) ->
                    Html.li [
                        prop.key i
                        prop.children (Link text href)
                    ])
            )
        ]

    type NoteType =
        | Info
        | Warning
        | Extra
    let Note (type': NoteType) (text: string) =
        Html.aside [
            prop.className "float-right w-64 -mr-64 mt-8 p-2 border-l-2 rounded-md text-sm text-justify"
            prop.children [
                Svg.svg [
                    svg.className $"""mx-2 mb-0.5
                        {match type' with
                         | Info    -> "info-icon"
                         | Warning -> "warning-icon"
                         | Extra   -> "extra-icon"}
                    """
                ]
                Html.text text
            ]
        ]

    let Button text onClick =
        Html.button [
            prop.className "button"
            prop.text (string text)
            prop.onClick onClick
        ]

    let NumberInput (min: float) (max: float) (value: float) (onChange: float -> unit) (label: string) =
        Html.label [
            prop.className "flex flex-row m-2 items-center text-center"
            prop.children [
                Html.text label
                Html.input [
                    prop.className "ml-2 px-1 py-1 border-x-0 border-slate-500 bg-transparent"
                    prop.type' "number"
                    prop.min min
                    prop.max max
                    prop.value value
                    prop.onChange onChange
                ]
            ]
        ]

    let Slider (title: string) (min: float) (max: float) (step: float)
               (value: float) (onChange: float -> unit) (withText: bool) =
        Html.div [
            prop.className "flex flex-row grow gap-4 text-center items-center m-2"
            prop.children [
                Html.h6 [
                    prop.className "font-semibold"
                    prop.text title
                ]
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
                        prop.className ""
                        prop.text $"{value}"
                    ]
            ]
        ]

    let Checkbox (text: TextType) (isChecked: bool) (onChange: bool -> unit) =
        Html.label [
            prop.className "flex flex-row items-center text-center"
            prop.children [
                Html.input [
                    prop.className "mx-2"
                    prop.type' "checkbox"
                    prop.isChecked isChecked
                    prop.onChange onChange
                ]
                match text with
                | TextString  str -> Html.text str
                | LatexString str -> Katex str
            ]
        ]

    let CheckList (legend: string) (xs: (TextType * bool * (bool -> unit)) list) =
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

    [<ReactComponent>]
    let Listbox (onSelect: string -> unit) (xs: string list) =
        Html.select [
            prop.className "m-2 w-full"
            prop.onChange onSelect
            prop.children (
                xs |> List.map (fun x -> Html.option x)
            )
        ]

    [<ReactComponent>]
    let Loading () =
        Html.div [
            prop.className "m-8 text-center"
            prop.children [
                Html.text "Loading..."
            ]
        ]

///////////////////////////////////////////////////////////////////////////////

    [<ReactComponent>]
    let Tabbed (tabName: string) (tabs: (string * ReactElement) list) =
        let tab, setTab = React.useState (
            tabs
            |> List.tryFindIndex (fun t -> fst t = tabName)
            |> defaultValue 0)
        Html.div [
            Html.nav [
                prop.className "flex flex-row rounded-full"
                prop.children (
                    tabs |> List.mapi (fun i tab ->
                        Html.div [
                            prop.className "grow p-0.5 border-x-2 text-center text-md
                                            border-slate-200 text-gray-700
                                            hover:bg-slate-200 hover:cursor-pointer hover:text-black
                                            duration-200 ease-in-out"
                            prop.onClick (fun e ->
                                Router.currentUrl ()
                                |> List.filter (fun seg -> not (seg.StartsWith "?"))
                                |> fun path -> Router.format (path @ [ $"?tab={fst tab}" ])
                                               |> Router.navigate
                                setTab i)
                            prop.children [ Html.b (fst tab) ]
                    ]))
            ]
            Html.div [
                prop.id "root-inner"
                prop.className "mt-4 px-8"
                prop.children (snd tabs[tab])
            ]
        ]

///////////////////////////////////////////////////////////////////////////////

    let Popup (text: string) (content: ReactElement) =
        Html.div [
            prop.className "group relative inline font-semibold"
            prop.children [
                Html.text text
                Html.div [
                    prop.className "absolute origin-center z-10 min-w-16 top-[2rem] prose prose-zinc prose-sm opacity-0 invisible
                                    group-hover:visible group-hover:opacity-100 rounded-md border-2 border-slate-800 bg-slate-200
                                    transition-all duration-500 ease-in-out overflow-auto"
                    prop.children content
                ]
            ]
        ]

///////////////////////////////////////////////////////////////////////////////

    [<ReactComponent>]
    let Accordion (xs: (ReactElement * ReactElement) list) =
        let opened, setOpened = React.useState (xs |> List.map (fun x -> false))
        Html.div [
            prop.className "flex flex-col h-fit ml-2 mb-4 pl-2 border-l-4 border-b-0 border-green-300"
            prop.children (
                xs |> List.mapi (fun i x ->
                    Html.div [
                        Html.div [
                            prop.className $"""border-b-2 p-2 hover:cursor-pointer font-semibold
                                                {if i = 0             then "rounded-t-lg" else ""}
                                                {if i = xs.Length - 1 then "rounded-b-lg" else ""}
                                                {if opened[i] then "text-black bg-slate-100" else "text-gray-700"}
                                                duration-200 ease-in-out"""
                            prop.children (fst x)
                            prop.onClick (fun e -> setOpened (List.updateAt i (not opened[i]) opened))
                        ]
                        Html.div [
                            prop.className $"""prose prose-p px-2 text-pretty text-justify overflow-hidden
                                                {if opened[i] then "h-fit opacity-1" else "h-0 opacity-0"}
                                                transition-all duration-500 ease-in-out"""
                            prop.children (snd x)
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

    type TableDirection =
        | TableHorizontal
        | TableVertical
    [<ReactComponent>]
    let StaticTable (dir: TableDirection) (xs: ReactElement list list) =
        Html.table [
            prop.className "prose prose-table mx-0 my-4"
            prop.children [
                if dir = TableVertical then
                    let header  = xs.Head
                    let content = xs.Tail
                    if header[0] <> Html.none then
                        Html.thead [
                            Html.tr (header |> List.map (fun h -> Html.th h))
                        ]
                    Html.tbody (
                        content |> List.map (fun row ->
                            Html.tr (row |> List.map (fun cell -> Html.td cell)))
                    )
                else
                    Html.tbody (
                        xs |> List.map (fun row ->
                            Html.tr (row |> List.mapi (fun i cell ->
                                if i = 0 && cell <> Html.none
                                then Html.th cell
                                else Html.td cell)))
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
        let expand, setExpand = React.useState false
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
                    Svg.svg [
                        svg.className $"""{if expand then "arrow-left-icon" else "hamburger-icon"}
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
        ReactDOM.createPortal (buttons, sidebar)
