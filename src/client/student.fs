namespace Client

// open System

// module Student =
//     type StudentID = int64
//     type Model =
//         { id     : StudentID
//           name   : string
//           surname: string
//           dob    : DateOnly }
//         static member Default =
//             { id      = -1
//               name    = ""
//               surname = ""
//               dob     = DateOnly.MinValue }
//         static member FieldList =
//             [ "ID"
//               "Name"
//               "Surname"
//               "DoB" ]
//         member this.toStringArray () =
//             [| this.id.ToString ()
//                this.name
//                this.surname
//                this.dob.ToString () |]
//         member this.toStringList () =
//             this.toStringArray ()
//             |> List.ofArray

    // let update (remote: Services) student msg =
    //     match msg with
    //     | SetID      id'      -> { student with id      = id'      }, Cmd.none
    //     | SetName    name'    -> { student with name    = name'    }, Cmd.none
    //     | SetSurname surname' -> { student with surname = surname' }, Cmd.none
    //     | SetDoB     dob'     -> { student with dob     = dob'     }, Cmd.none
    //     | GetStudent  id    -> student, Cmd.OfAsync.either remote.getStudent id RecvStudent ErrorExn
    //     | RecvStudent model -> student, Cmd.none
    //     | AddStudent    -> student, Cmd.OfAsync.either remote.addStudent    student (fun _ -> Completed) ErrorExn
    //     | UpdateStudent -> student, Cmd.OfAsync.either remote.updateStudent student (fun _ -> Completed) ErrorExn
    //     | ErrorExn err -> failwith $"Encountered an exception: {err}"
    //     | Completed -> failwith "This should be caught by the parent"

    // let view student dispatch =
    //     p { "student view" }
