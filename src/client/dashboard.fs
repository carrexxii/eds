namespace Client

// open Option

// open Elmish
// open Feliz

// module Dashboard =
//     type Model =
//         { user          : User.Model
//           student       : Student.Model
//           studentRecords: Student.Model array option
//           gettingRecords: bool
//           sortBy        : (int * SortDirection) option }
//         static member Default =
//             { user           = User.Model.Default
//               student        = Student.Model.Default
//               studentRecords = None
//               gettingRecords = false
//               sortBy         = None }

//     type Message =
//         | SetStudentName    of string
//         | SetStudentSurname of string
//         | SetStudentDoB     of string
//         | ClearStudent
//         | SubmitStudent
//         | GetStudentList
//         // | RecvStudentList of Student.Model array option
//         | SortStudents    of int
//         | ErrorMsg        of string
//         | ErrorExn        of exn
//         | Completed

//     let init user =
//         { Model.Default with
//             user = user},
//         Cmd.none
    
//     let update msg state =
//         match msg with
//         // | SetStudentName    name'    -> { state with student.name = name' }, Cmd.none
//         // | SetStudentSurname surname' -> { state with student.surname = surname' }, Cmd.none
//         // | SetStudentDoB     dob'     ->
//         //     match DateOnly.TryParse dob' with
//         //     | true, dob' -> { state with student.dob = dob' }, Cmd.none
//         //     | false, _ -> state, Cmd.none
//         // | ClearStudent               -> { state with student = Student.Model.Default }, Cmd.none
//         // | SubmitStudent -> state, Cmd.OfAsync.either remote.addStudent state.student (fun _ -> ClearStudent) ErrorExn
//         // | GetStudentList ->
//         //     { state with gettingRecords = true },
//         //     Cmd.OfAsync.either remote.getStudentList () RecvStudentList ErrorExn
//         // | RecvStudentList lst ->
//         //     { state with
//         //         studentRecords = lst
//         //         gettingRecords = false },
//         //     Cmd.none // TODO: if lst can be empty, maybe check before overwriting 
//         // | SortStudents i ->
//         //     let dir = snd (defaultValue (-1, Descending) state.sortBy)
//         //     { state with
//         //         sortBy = Some (i, opposite dir)
//         //         studentRecords = Some
//         //             (Array.sortByDescending
//         //                 (fun (student: Student.Model) -> (student.toStringArray ())[i])
//         //                 (defaultValue [||] state.studentRecords)
//         //                 |> (fun arr -> if dir = Descending then Array.rev arr
//         //                                                    else arr)) },
//             // Cmd.none
//         | ErrorExn err -> failwith $"Encountered exception: {err}"
//         | Completed    -> failwith "Should be caught by the parent"

//     let profileView state =
//         Components.listTable
//             None
//             [ "Name"    , state.user.name
//               "Password", $"{state.user.password}" ]

    // let view url state dispatch =
    //     match url with
    //     | []  -> profileView state
    //     | url -> Html.p $"Dashboard page not found ~> {url}"

// open System
// open Option

// open Elmish
// open Bolero.Html

// open Dashboard

// module Dashboard =
//     let init user =
//         { Model.Default with
//             user = user }

//     let update remote state msg =
//         match msg with
//         | SetStudentName    name'    -> { state with student.name = name' }, Cmd.none
//         | SetStudentSurname surname' -> { state with student.surname = surname' }, Cmd.none
//         | SetStudentDoB     dob'     ->
//             match DateOnly.TryParse dob' with
//             | true, dob' -> { state with student.dob = dob' }, Cmd.none
//             | false, _ -> state, Cmd.none
//         | ClearStudent               -> { state with student = Student.Model.Default }, Cmd.none
//         | SubmitStudent -> state, Cmd.OfAsync.either remote.addStudent state.student (fun _ -> ClearStudent) ErrorExn
//         | GetStudentList ->
//             { state with gettingRecords = true },
//             Cmd.OfAsync.either remote.getStudentList () RecvStudentList ErrorExn
//         | RecvStudentList lst ->
//             { state with
//                 studentRecords = lst
//                 gettingRecords = false },
//             Cmd.none // TODO: if lst can be empty, maybe check before overwriting 
//         | SortStudents i ->
//             let dir = snd (defaultValue (-1, Descending) state.sortBy)
//             { state with
//                 sortBy = Some (i, opposite dir)
//                 studentRecords = Some
//                     (Array.sortByDescending
//                         (fun (student: Student.Model) -> (student.toStringArray ())[i])
//                         (defaultValue [||] state.studentRecords)
//                         |> (fun arr -> if dir = Descending then Array.rev arr
//                                                            else arr)) },
//             Cmd.none
//         | ErrorExn err -> failwith $"Encountered exception: {err}"
//         | Completed    -> failwith "Should be caught by the parent"

//     let profileView (user: User.Model) dispatch =
//         ecomp<ListTable, _, _>
//             { headers = None
//               elems = [ "Name", user.name
//                         "ID", $"{user.id}"
//                         "Account type", $"{user.kind}"] }
//             (fun _ -> ())
//             { attr.empty () }

//     let studentsView state dispatch =
//         concat {
//             form {
//                 attr.``class`` "form"
//                 ecomp<Input, _, _>
//                     { InputModel.Default with
//                         value = state.student.name.ToString () }
//                     (fun name -> dispatch (SetStudentName name))
//                     { attr.empty () }
//                 ecomp<Input, _, _>
//                     { InputModel.Default with
//                         value = state.student.surname.ToString () }
//                     (fun surname -> dispatch (SetStudentSurname surname))
//                     { attr.empty () }
//                 ecomp<Input, _, _>
//                     { InputModel.Default with
//                         value = state.student.dob.ToString () }
//                     (fun dob -> dispatch (SetStudentDoB dob))
//                     { attr.empty () }
//                 ecomp<Button, _, _>
//                     "Add"
//                     (fun () -> dispatch SubmitStudent)
//                     { attr.empty () }
//             }

//             match state.studentRecords with
//             | None ->
//                 if not state.gettingRecords then dispatch GetStudentList
//                 p { "Loading..." }
//             | Some records ->
//                 let headers = Student.Model.FieldList |> Array.ofList
//                 let records = Array.map (fun (model: Student.Model) -> model.toStringArray ()) records
//                 ecomp<Table, _, _>
//                     { headers = headers
//                       records = records
//                       sortBy  = state.sortBy }
//                     (fun i -> dispatch (SortStudents i))
//                     { attr.empty () }
//         }

//     let view page state dispatch =
//         match page with
//         // | Page.Home     -> 
//         | Page.Profile  -> profileView state.user dispatch
//         | Page.Students -> studentsView state dispatch
