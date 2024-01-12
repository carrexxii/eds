namespace Client

open System

open Bolero
open Bolero.Remoting

[<AutoOpen>]
module Types =
    type StudentID = int64
    module Student =
        type Model =
            { id     : StudentID
              name   : string
              surname: string
              dob    : DateOnly }
            static member Default =
                { id      = -1
                  name    = ""
                  surname = ""
                  dob     = DateOnly.MinValue }

        type Message =
            | SetName    of string
            | SetSurname of string
            | SetDoB     of DateOnly

            | GetStudent of StudentID
            | GotStudent of Model option

            | AddStudent   of string
            | AddedStudent

            | ErrorExn      of exn

            // | Add    of Model
            // | Delete of StudentID

    type UserID = int64
    module User =
        type Model =
            { id  : UserID
              name: string
              form: string * string
              kind: Kind }
            static member Default =
                { id   = -1
                  name = ""
                  form = ("", "")
                  kind = Anonymous }
        and Kind =
            | Anonymous
            // | Admin of Admin.Model
            | Student of Student.Model
            // | Teacher of Teacher.Model
        
        type Message =
            | SetUsername of string
            | SetPassword of string
            | SubmitLogin
            | RecvLogin   of Result<string, string>
            | ErrorMsg    of exn
            | Completed   of Result<Model, string>

    module Main =
        type Page =
            | [<EndPoint "/"       >] Home
            | [<EndPoint "/profile">] Profile
            | [<EndPoint "/db"     >] DBTest
            | [<EndPoint "/login"  >] Login
            | [<EndPoint "/404"    >] Page404

        type Model =
            { page    : Page
              user    : User.Model option
              error   : string option }
            static member Default =
                { page     = Home
                  user     = None
                  error    = None }

        type Message =
            | SetPage     of Page
            | SetUsername of string
            | SetPassword of string
            | SubmitLogin
            | LoginResult of option<string>
            | GetSignedInAs
            | RecvSignedInAs of option<string>
            | ClearLoginForm
            | ErrorMsg of string
            | ErrorExn of exn
            | ClearError

            | UserMsg    of User.Message
            | StudentMsg of Student.Message
            // | UserMsg    of User.Message

    type Services =
        {
            signIn     : string * string -> Async<Result<string, string>>
            getUsername: unit -> Async<string>

            getStudent   : StudentID -> Async<Student.Model option>
            addStudent   : Student.Model -> Async<unit>
            updateStudent: StudentID * Student.Model -> Async<string option>
        }

        interface IRemoteService with
            member this.BasePath = "/serverRequest"
