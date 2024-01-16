namespace Client

open Option

open Elmish
open Bolero.Html

open Dashboard

module Dashboard =
    let init user =
        { Model.Default with
            user = user }

    let update remote state msg =
        match msg with
        | GetStudentList ->
            { state with gettingRecords = true },
            Cmd.OfAsync.either remote.getStudentList () RecvStudentList ErrorExn
        | RecvStudentList lst ->
            { state with
                studentRecords = lst
                gettingRecords = false },
            Cmd.none // TODO: if lst can be empty, maybe check before overwriting 
        | SortStudents i ->
            let dir = snd (defaultValue (-1, Descending) state.sortBy)
            { state with
                sortBy = Some (i, opposite dir)
                studentRecords = Some
                    (Array.sortByDescending
                        (fun (student: Student.Model) -> (student.toStringArray ())[i])
                        (defaultValue [||] state.studentRecords)
                        |> (fun arr -> if dir = Descending then Array.rev arr
                                                           else arr)) },
            Cmd.none
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
        match state.studentRecords with
        | None ->
            if not state.gettingRecords then dispatch GetStudentList
            p { "Loading..." }
        | Some records ->
            let headers = Student.Model.FieldList |> Array.ofList
            let records = Array.map (fun (model: Student.Model) -> model.toStringArray ()) records
            ecomp<Table, _, _>
                { headers = headers
                  records = records
                  sortBy  = state.sortBy }
                (fun i -> dispatch (SortStudents i))
                { attr.empty () }

    let view page state dispatch =
        match page with
        // | Page.Home     -> 
        | Page.Profile  -> profileView state.user dispatch
        | Page.Students -> studentsView state dispatch
