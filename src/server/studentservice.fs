namespace Server

open System

open Bolero.Remoting
open Npgsql
open Npgsql.FSharp

open Database

module StudentService =
    type Model = Client.Types.Student.Model

    let add name surname dob =
        exec
        <| $"INSERT INTO \"Students\"
             (name, surname, dob) VALUES
             ('{name}', '{surname}', '{dob}')"
        |> ignore

    let get id =
        query
        <| $"SELECT * FROM \"Students\"
             WHERE id = {id}"
        <| (fun read -> { id      = read.int64    "id"
                          name    = read.string   "name"
                          surname = read.string   "surname"
                          dob     = read.dateOnly "dob" }: Model)
        |> List.tryHead
        
        // setStudentName   : StudentID -> string -> Async<string option>
        // setStudentSurname: StudentID -> string -> Async<string option>
        // setStudentDoB    : StudentID -> DateOnly -> Async<string option>