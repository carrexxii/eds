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
        | SetPage page' -> { state with page = page' }, Cmd.none
        | Completed -> failwith "Should be caught by the parent"

    let profileView (user: User.Model) dispatch =
        ecomp<ListTable, _, _>
            { headers = None
              elems = [ "Name: ", user.name
                        "ID: ", $"{user.id}" ] }
            (fun _ -> ())
            { attr.empty () }

    let studentsView state dispatch =
        h1 { "Students Dashboard Page" }

    let view state dispatch =
        match state.page with
        | Page.Profile  -> profileView state.user dispatch
        | Page.Students -> studentsView state dispatch
