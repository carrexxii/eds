namespace EDS.User

open Option

open Elmish
open Feliz
open Feliz.Router

open EDS.Shared
open EDS.Shared.Components

module Dashboard =
    type Model =
        { user    : Services.User
          records : Services.User array
          sortBy  : (int * SortDirection) option }
        static member Default =
            { user    = Services.User.Default
              records = [||]
              sortBy  = None }

    type Message =
        | SetUsername of string
        | SetEmail    of string
        | ClearForm
        | GetUser
        | RecvUser    of Services.User option
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
        match msg with
        | SetUsername name -> { state with user.username = name  }, Cmd.none
        | SetEmail email   -> { state with user.email    = email }, Cmd.none
        | ClearForm ->
            { state with
                user.username = ""
                user.email    = "" },
            Cmd.none

        | GetUser -> state, Cmd.OfAsync.perform Services.userService.get () RecvUser
        | RecvUser user ->
            match user with
            | Some user -> { state with user = user }, Cmd.none
            | None -> failwith "Got 'None' from GetUser"

        | GetRecords range -> state, Cmd.OfAsync.perform Services.userService.getMany range RecvRecords
        | RecvRecords records ->
            match records with
            | Some records -> { state with records = records }, Cmd.none
            | None -> failwith "Got 'None' from GetRecords"

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

    let profileView state =
        StaticTable
            [ [ Html.text ""; Html.text "" ]
              [ Html.text "Name"    ; Html.text state.user.username      ]
              [ Html.text "Email"   ; Html.text state.user.email         ]
              [ Html.text "Password"; Html.text $"{state.user.password}" ] ]

    let view url state dispatch =
        match url with
        | []  -> profileView state
        | url -> Html.p $"Dashboard page not found ~> {url}"
