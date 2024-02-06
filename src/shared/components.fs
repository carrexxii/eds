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
    let P text =
        Html.p [
            prop.className "prose prose-p"
            prop.text (string text)
        ]
    let Heading text =
        Html.div [
            prop.className "prose prose-slate"
            prop.children [ Html.h1 (string text) ]
        ]
    let SubHeading (text: string) =
        Html.div [
            prop.className "prose prose-slate mb-4"
            prop.children [ Html.h2 text ]
        ]
    let Article (content: ReactElement list) =
        Html.article [
            prop.className "prose prose-slate"
            prop.children content
        ]

    let Button text onClick =
        Html.button [
            prop.className "button"
            prop.text (string text)
            prop.onClick onClick
        ]

    let NumberInput (min: float) (max: float) (value: float) (onChange: float -> unit) label =
        Html.div [
            prop.className "flex flex-col justify-center text-center"
            prop.children [
                P label
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
               (value: float) (onChange: float -> unit) withText =
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
                if withText then P $"{value}"
            ]
        ]

    let Checkbox text isChecked (onChange: bool -> unit) =
        Html.div [
            prop.className "flex flex-row items-center text-center"
            prop.children [
                Html.input [
                    prop.className "mx-2"
                    prop.type' "checkbox"
                    prop.isChecked isChecked
                    prop.onChange onChange
                ]
                P (string text)
            ]
        ]

    let RadioList legend selected (xs: list<string * (bool -> unit)>) =
        Html.fieldSet [
            prop.className "text-gray-700"
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
    let Tabbed (tabs: (string * ReactElement) list) =
        let tab, setTab = React.useState 0
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
    let ListTable (header: (string * string) option)
                  (elems : (string * string) list) =
        Html.table [
            prop.className "list-table"
            prop.children [
                Html.thead [
                    if isSome header then
                        Html.tr [
                            Html.th [
                                prop.className "list-table-t"
                                prop.text (fst <| get header)
                            ]
                            Html.th [
                                prop.className "list-table-t"
                                prop.text (snd <| get header)
                            ]
                        ]
                ]
                Html.tbody [
                    for elem in elems do
                        Html.tr [
                            Html.td [ prop.className "list-table-l"; prop.text (fst elem) ]
                            Html.td [ prop.className "list-table-r"; prop.text (snd elem) ]
                        ]
                ]
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
