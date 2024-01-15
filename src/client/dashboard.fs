namespace Client

open Elmish
open Bolero.Html

open Dashboard

module Dashboard =
    let init user =
        { Model.Default with
            user = user }

    let update remote state msg =
        match msg with
        | Completed -> failwith "Should be caught by the parent"

    let profileView (user: User.Model) dispatch =
        ecomp<ListTable, _, _>
            { headers = None
              elems = [ "Name", user.name
                        "ID", $"{user.id}"
                        "Account type", $"{user.kind}"] }
            (fun _ -> ())
            { attr.empty () }

    let studentsView state dispatch =
        ecomp<Table, _, _>
            { headers = [ "ID"; "Name"; "Surname" ]
              records = [ [ "1"; "Name1"; "Surname1" ]
                          [ "2"; "Name2"; "Surname2" ]
                          [ "3"; "Name3"; "Surname3" ] ] }
            (fun _ -> ())
            { attr.empty () }

    let view page state dispatch =
        match page with
        // | Page.Home     -> 
        | Page.Profile  -> profileView state.user dispatch
        | Page.Students -> studentsView state dispatch
