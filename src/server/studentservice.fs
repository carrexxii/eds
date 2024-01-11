namespace Server

open System.Collections.Generic
open Microsoft.AspNetCore.Hosting
open Bolero.Remoting
open Bolero.Remoting.Server
open MongoDB.Bson
open MongoDB.Driver
open Mondocks.Queries

module StudentService =
    type Model = Client.Types.Student.Model
    let students  = Database.db.GetCollection<Model> "testing"
    let queryable = students.AsQueryable<Model> ()

    let get id = 
        query {
            for student in queryable do
            where (student.id = id)
            select student
        }
        |> Seq.tryHead

    // get       : StudentID -> Async<Student.Model>
    let add name =
        let model =
            { id      = ObjectId.GenerateNewId ()
              name    = name
              surname = ""
              dob     = System.DateTime.Now }: Model
        students.InsertOne model
        model

    // add       : Student.Model -> Async<Result<StudentID, string>>
    // setName   : StudentID -> string -> Async<option<string>>
    // setSurname: StudentID -> string -> Async<option<string>>
    // setDoB    : StudentID -> DateOnly -> Async<option<string>>
