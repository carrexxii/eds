namespace Client

open Option

open Bolero
open Bolero.Html

[<AutoOpen>]
module Components =
    type InputModel =
        { label        : string
          value        : string
          isValid      : string -> string option
          mutable error: string option }
        static member Default =
            { label   = ""
              value   = ""
              isValid = fun str -> if str = "" then Some "Invalid" else None
              error   = None }
    type Input () =
        inherit ElmishComponent<InputModel, string> ()

        override this.View model dispatch =
            model.error <- model.isValid model.value
            label {
                attr.``class`` "label"
                input {
                    attr.``class`` (if isNone model.error then "text-input"
                                                          else "text-input-error")
                    attr.placeholder model.label
                    attr.value model.value
                    on.change (fun e ->
                        // this.value <- unbox e.Value
                        dispatch (unbox e.Value))
                }
                p {
                    attr.``class`` "input-error-text"
                    defaultValue "" model.error
                }
            }

///////////////////////////////////////////////////////////////////////////////

    type Button () =
        inherit ElmishComponent<string, unit> ()

        override this.View text dispatch =
            button {
                attr.``class`` "button"
                on.click (fun btn -> dispatch ())
                text
            }

///////////////////////////////////////////////////////////////////////////////

    type Profile () =
        inherit ElmishComponent<User.Model, string> ()

        override this.View user dispatch =
            div {
                p { user.name }
            }

///////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////

    type TableModel =
        { headers: string array
          records: string array array
          sortBy : (int * SortDirection) option }
    type Table () =
        inherit ElmishComponent<TableModel, int> ()

        override this.ShouldRender (model, model') =
            true // TODO: Might need to do this properly later

        override this.View model dispatch = table {
            attr.``class`` "table"
            tr {
                attr.``class`` "table-row"
                forEach (Array.mapi (fun i header -> i, header) model.headers)
                    (fun (i, header) -> th {
                        attr.``class`` "table-header"
                        on.click (fun _ -> dispatch i)

                        header
                        match model.sortBy with
                        | Some (si, dir) when si = i -> svg {
                            attr.``class``
                                (match dir with
                                 | Ascending  -> "chevron-up"
                                 | Descending -> "chevron-down")
                            }
                        | _ -> empty ()
                    })
            }
            forEach model.records (fun record -> tr {
                attr.``class`` "table-row"
                attr.tabindex "0"
                forEach record (fun cell -> td {
                    attr.``class`` "table-cell"
                    cell
                })
            })
        }
