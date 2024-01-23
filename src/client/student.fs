namespace Client

open System

open Elmish
open Bolero.Html
open Bolero.Remoting.Client

open Student

module Student =
    let update (remote: Services) student msg =
        match msg with
        | SetID      id'      -> { student with id      = id'      }, Cmd.none
        | SetName    name'    -> { student with name    = name'    }, Cmd.none
        | SetSurname surname' -> { student with surname = surname' }, Cmd.none
        | SetDoB     dob'     -> { student with dob     = dob'     }, Cmd.none
        | GetStudent  id    -> student, Cmd.OfAsync.either remote.getStudent id RecvStudent ErrorExn
        | RecvStudent model -> student, Cmd.none
        | AddStudent    -> student, Cmd.OfAsync.either remote.addStudent    student (fun _ -> Completed) ErrorExn
        | UpdateStudent -> student, Cmd.OfAsync.either remote.updateStudent student (fun _ -> Completed) ErrorExn
        | ErrorExn err -> failwith $"Encountered an exception: {err}"
        | Completed -> failwith "This should be caught by the parent"

    let view student dispatch =
        p { "student view" }
