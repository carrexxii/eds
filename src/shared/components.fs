namespace Shared

open Option

open Browser
open Elmish
open Feliz

type SortDirection =
    | Ascending
    | Descending
    static member opposite = function
        | Ascending  -> Descending
        | Descending -> Ascending

module Components =
    let Heading (text: string) =
        Html.div [
            prop.className "prose prose-slate"
            prop.children [ Html.h1 text ]
        ]
    let SubHeading (text: string) =
        Html.div [
            prop.className "prose prose-slate mb-4"
            prop.children [ Html.h2 text ]
        ]
    let Paragraph (text: string) =
        Html.div [
            prop.className "prose prose-slate"
            prop.children [
                Html.p text
            ]
        ]

    let Button text onClick =
        Html.button [
            prop.className "button"
            prop.text (string text)
            prop.onClick onClick
        ]

    [<ReactComponent>]
    let textInput label (value: string) dispatch isValid =
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
    let button text dispatch =
        Html.button [
            prop.className "button"
            prop.onClick (fun e -> dispatch ())
            prop.text (string text)
        ]

///////////////////////////////////////////////////////////////////////////////

    [<ReactComponent>]
    let errorCard text dispatch =
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
    let listTable (header: (string * string) option)
                  (elems : (string * string) list) =
        Html.table [
            prop.className "list-table"
            prop.children [
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
                for elem in elems do
                    Html.tr [
                        Html.td [ prop.className "list-table-l"; prop.text (fst elem) ]
                        Html.td [ prop.className "list-table-r"; prop.text (snd elem) ]
                    ]
            ]
        ]

///////////////////////////////////////////////////////////////////////////////

    [<ReactComponent>]
    let table (header  : string array)
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
