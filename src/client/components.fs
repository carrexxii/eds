namespace Client

open System
open Option

open Elmish
open Feliz
open Feliz.UseElmish

module Components =
    [<ReactComponent>]
    let Counter() =
        let (count, setCount) = React.useState(0)
        Html.div [
            Html.h1 count
            Html.button [
                prop.className "button"
                prop.text "Increment"
                prop.onClick (fun _ -> setCount(count + 1))
            ]
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
                        printfn "%s -> %s" value txt
                        setError <| defaultValue
                            (fun str -> if str = "" then Some "Invalid input" else None)
                            isValid txt
                        // match isValid with
                        // | None -> setError (if value.Length = 0 then None
                        //                     else Some "Invalid Input")
                        // | Some isValid -> setError (if isValid value then None
                        //                             else Some "Invalid Input")
                        dispatch txt)
                ]
                Html.p [
                    prop.className "input-error-text"
                    prop.text (Option.defaultValue "" error)
                ]
            ]
        ]

///////////////////////////////////////////////////////////////////////////////

//     type Button () =
//         inherit ElmishComponent<string, unit> ()

//         override this.View text dispatch =
//             button {
//                 attr.``class`` "button"
//                 on.click (fun btn -> dispatch ())
//                 text
//             }

// ///////////////////////////////////////////////////////////////////////////////

//     type Profile () =
//         inherit ElmishComponent<User.Model, string> ()

//         override this.View user dispatch =
//             div {
//                 p { user.name }
//             }

// ///////////////////////////////////////////////////////////////////////////////

//     type ErrorCard () =
//         inherit ElmishComponent<string, unit> ()

//         override this.View err dispatch =
//             div {
//                 attr.``class`` "card-error"
//                 button {
//                     attr.``class`` "card-button"
//                     on.click (fun e -> dispatch ())
//                     "X"
//                 }
//                 err
//             }

// ///////////////////////////////////////////////////////////////////////////////

//     type ListTableModel =
//         { headers: string list option
//           elems  : (string * string) list }
//     type ListTable () =
//         inherit ElmishComponent<ListTableModel, unit> ()

//         override this.View model _ =
//             table {
//                 attr.``class`` "list-table"
//                 if isSome model.headers then
//                     tr {
//                         forEach (get model.headers) <| (fun header ->
//                             th { attr.``class`` "list-table-t"; header })
//                     }
//                 forEach model.elems <| (fun elem ->
//                     tr {
//                         td { attr.``class`` "list-table-l"; fst elem }
//                         td { attr.``class`` "list-table-r"; snd elem }
//                     })
//             }

// ///////////////////////////////////////////////////////////////////////////////

//     type TableModel =
//         { headers: string array
//           records: string array array
//           sortBy : (int * SortDirection) option }
//     type Table () =
//         inherit ElmishComponent<TableModel, int> ()

//         override this.ShouldRender (model, model') =
//             true // TODO: Might need to do this properly later

//         override this.View model dispatch = table {
//             attr.``class`` "table"
//             tr {
//                 attr.``class`` "table-row"
//                 forEach (Array.mapi (fun i header -> i, header) model.headers)
//                     (fun (i, header) -> th {
//                         attr.``class`` "table-header"
//                         on.click (fun _ -> dispatch i)

//                         header
//                         match model.sortBy with
//                         | Some (si, dir) when si = i -> svg {
//                             attr.``class``
//                                 (match dir with
//                                  | Ascending  -> "chevron-up"
//                                  | Descending -> "chevron-down")
//                             }
//                         | _ -> empty ()
//                     })
//             }
//             forEach model.records (fun record -> tr {
//                 attr.``class`` "table-row"
//                 attr.tabindex "0"
//                 forEach record (fun cell -> td {
//                     attr.``class`` "table-cell"
//                     cell
//                 })
//             })
//         }
