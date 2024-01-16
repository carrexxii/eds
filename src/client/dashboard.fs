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
        | GetStudentList -> printfn "GetStudentList"; { state with gettingRecords = true }, Cmd.OfAsync.either remote.getStudentList () RecvStudentList ErrorExn
        | RecvStudentList lst -> printfn "RecvStudentList"; { state with studentRecords = lst; gettingRecords = false }, Cmd.none // TODO: if lst can be empty, maybe check before overwriting 
        | ErrorExn err -> failwith $"Encountered exception: {err}"
        | Completed    -> failwith "Should be caught by the parent"

    let profileView (user: User.Model) dispatch =
        ecomp<ListTable, _, _>
            { headers = None
              elems = [ "Name", user.name
                        "ID", $"{user.id}"
                        "Account type", $"{user.kind}"] }
            (fun _ -> ())
            { attr.empty () }

    let studentsView state dispatch =
        printfn "studentsView..."
        match state.studentRecords with
        | None ->
            if not state.gettingRecords then dispatch GetStudentList
            p { "Loading..." }
        | Some records ->
            let headers = Student.Model.FieldList
            let records = List.map (fun (model: Student.Model) -> model.toStringList ()) records
            ecomp<Table, _, _>
                { headers = headers
                  records = records
                  sortBy = Some (1, Ascending) }
                (fun _ -> ())
                { attr.empty () }

    let view page state dispatch =
        match page with
        // | Page.Home     -> 
        | Page.Profile  -> profileView state.user dispatch
        | Page.Students -> studentsView state dispatch
