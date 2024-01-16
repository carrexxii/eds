namespace Client

open Option

open Bolero
open Bolero.Html

[<AutoOpen>]
type SortDirection =
    | Ascending
    | Descending
    static member opposite = function
        | Ascending  -> Descending
        | Descending -> Ascending

[<AutoOpen>]
module Components =
    type InputModel =
        { label: string
          value: string
          error: string option }
    type Input () =
        inherit ElmishComponent<InputModel, string> ()

        override this.View model dispatch =
            label {
                attr.``class`` "label inline-block"
                model.label
                input {
                    attr.``class`` (if isNone model.error then "text-input" else "text-input-error")
                    attr.value model.value
                    on.change (fun e -> dispatch (unbox e.Value))
                }
                p {
                    attr.``class`` "input-error-text"
                    defaultValue "" model.error
                }
            }

    type Button () =
        inherit ElmishComponent<string, string> ()

        override this.View text dispatch =
            button {
                attr.``class`` "button"
                text
            }
    
    type Profile () =
        inherit ElmishComponent<User.Model, string> ()

        override this.View user dispatch =
            div {
                p { user.name }
            }

    type ErrorCard () =
        inherit ElmishComponent<string, unit> ()

        override this.View err dispatch =
            div {
                attr.``class`` "card-error"
                button {
                    attr.``class`` "card-button"
                    on.click (fun e -> dispatch ())
                    "X"
                }
                err
            }

    type ListTableModel =
        { headers: string list option
          elems  : (string * string) list }
    type ListTable () =
        inherit ElmishComponent<ListTableModel, unit> ()

        override this.View model _ =
            table {
                attr.``class`` "list-table"
                if isSome model.headers then
                    tr {
                        forEach (get model.headers) <| (fun header ->
                            th { attr.``class`` "list-table-t"; header })
                    }
                forEach model.elems <| (fun elem ->
                    tr {
                        td { attr.``class`` "list-table-l"; fst elem }
                        td { attr.``class`` "list-table-r"; snd elem }
                    })
            }

    type TableModel =
        { headers: string list
          records: string list list
          mutable sortBy: (int * SortDirection) option }
    type Table () =
        inherit ElmishComponent<TableModel, unit> ()

        override this.ShouldRender (model, model') =
            true // TODO: Might need to do this properly later

        override this.View model _ = table {
            attr.``class`` "table"
            tr {
                attr.``class`` "table-row"
                forEach (List.mapi (fun i header -> i, header ) model.headers)
                    (fun (i, header) -> th {
                        attr.``class`` "table-header"
                        on.click (fun _ ->
                            let dir = snd (defaultValue (-1, Descending) model.sortBy)
                            model.sortBy <- Some (i, opposite dir))

                        header
                        match model.sortBy with
                        | Some (si, dir) when si = i -> span {
                            attr.``class``
                                (match dir with
                                 | Ascending  -> "chevron-up"
                                 | Descending -> "chevron-down")
                            "_"
                            }
                        | _ -> empty ()
                    })
            }
            forEach model.records <| (fun record -> tr {
                attr.``class`` "table-row"
                attr.tabindex "0"
                forEach record <| (fun cell -> td {
                    attr.``class`` "table-cell"
                    cell
                })
            })
        }
