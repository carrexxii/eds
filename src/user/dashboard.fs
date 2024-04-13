namespace EDS.User

open Option

open Elmish
open Feliz
open Feliz.Router

open EDS.Shared
open EDS.Shared.Components

module Dashboard =
    type Model =
        { user   : Services.User
          mode   : Mode
          records: Services.User array
          sortBy : (int * SortDirection) option }
        static member Default =
            { user    = Services.User.Default
              mode    = Viewing
              records = [||]
              sortBy  = None }
    and Mode =
        | Viewing
        | Inserting
        static member ofString = function
            | "View" | "Viewing" ->
                Viewing
            | "Insert" | "Inserting" | "Editing" ->
                Inserting
            | str ->
                printfn $"Cannot covert \"{str}\" to Dashboard.Mode"
                Viewing

    type Message =
        | SetMode     of string
        | SetUsername of string
        | SetEmail    of string
        | SetPassword of string
        | ClearForm
        | SubmitStudent
        | ConfirmStudent of Result<unit, string>
        | GetUsers    of Services.UserQuery
        | RecvUsers   of Services.User list
        | GetRecords  of (int * int)
        | RecvRecords of Services.User array option
        | SortTable   of int
        | ErrorMsg    of string
        | ErrorExn    of exn
        | Completed

    let init user =
        { Model.Default with
            user = user },
        Cmd.none

    let update msg state =
        printfn $"{msg}"
        match msg with
        | SetMode mode -> { state with mode = Mode.ofString mode }, Cmd.none

        | SetUsername name  -> { state with user.username = name  }, Cmd.none
        | SetEmail    email -> { state with user.email    = email }, Cmd.none
        | SetPassword pw    -> { state with user.password = pw    }, Cmd.none
        | ClearForm ->
            { state with
                user.username = ""
                user.email    = ""
                user.password = "" },
            Cmd.none

        | SubmitStudent -> state, Cmd.OfAsync.perform Services.userService.add state.user ConfirmStudent
        | ConfirmStudent err ->
            match err with
            | Ok    ()  -> ()
            | Error err -> printfn $"Error submitting student: \"{err}\""
            state, Cmd.none

        | GetUsers query -> state, Cmd.OfAsync.perform Services.userService.get query RecvUsers
        | RecvUsers users ->
            printfn $"{users}"
            state, Cmd.none
            // match users with
            // | Some user -> { state with user = user }, Cmd.none
            // | None -> printfn "Got 'None' from GetUser"
                    //   state, Cmd.none

        | SortTable i ->
            let dir = snd (defaultValue (-1, Descending) state.sortBy)
            { state with
                sortBy = Some (i, opposite dir)
                records =
                    (Array.sortByDescending
                        (fun (student: Services.User) -> (state.user.toStringArray ())[i])
                        state.records
                        |> (fun arr -> if dir = Descending then Array.rev arr
                                                           else arr)) },
            Cmd.none

        | ErrorMsg err -> failwith $"Encountered dashboard error: {err}"
        | ErrorExn exn -> failwith $"Encountered dashboard exception: {exn}"
        | Completed    -> failwith "Should be caught by the parent"

    let view state dispatch =
        concat
            (Listbox (fun sel -> dispatch (SetMode sel)) [ "View"; "Insert" ])
            (match state.mode with
            | Viewing ->
                StaticTable TableVertical
                    [ [ Html.text " - "; Html.text "" ]
                      [ Html.text " - Name"    ; Html.text state.user.username      ]
                      [ Html.text " - Email"   ; Html.text state.user.email         ]
                      [ Html.text " - Password"; Html.text $"{state.user.password}" ] ]
            | Inserting ->
                Html.form [
                    prop.children [
                        TextInput "Name:     " state.user.username (fun name  -> dispatch (SetUsername name )) None
                        TextInput "Email:    " state.user.email    (fun email -> dispatch (SetEmail    email)) None
                        TextInput "Password: " state.user.password (fun pw    -> dispatch (SetPassword pw   )) None
                        Button "Submit" (fun e -> dispatch SubmitStudent)
                    ]
                ])
