namespace Server

open Microsoft.AspNetCore.Hosting
open Bolero.Remoting
open Bolero.Remoting.Server
open MongoDB.Driver

type Student = Client.Student.Model

type StudentService (ctx: IRemoteContext, env: IWebHostEnvironment) =
    inherit RemoteHandler<Client.Student.StudentService> ()

    let students  = Services.db.GetCollection<Student> "students"
    let queryable = students.AsQueryable<Student> ()

    override this.Handler = 
        {
            get = fun id -> async {
                return query {
                    for student in queryable do
                    where (student.id = id)
                    select student
                } |> Seq.head
            }
            // get       : StudentID -> Async<Student.Model>
            // add       : Student.Model -> Async<Result<StudentID, string>>
            // setName   : StudentID -> string -> Async<option<string>>
            // setSurname: StudentID -> string -> Async<option<string>>
            // setDoB    : StudentID -> DateOnly -> Async<option<string>>
        }
