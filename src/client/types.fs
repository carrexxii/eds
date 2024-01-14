namespace Client

open System

open Bolero
open Bolero.Remoting

[<AutoOpen>]
module Types =
    type Error =
        | IncorrectUsername
        | IncorrectPassword
        | Warning   of string
        | Fatal     of string
        | Exception of exn
        with
        override this.ToString () =
            match this with
            | IncorrectUsername -> "Incorrect Username"
            | IncorrectPassword -> "Incorrect Password"
            | Warning str       -> $"Warning: {str}"
            | Fatal str         -> $"Fatal Error: {str}"
            | Exception e       -> $"Exception: {e}"

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
              kind: Kind
              form: string * string
              nameError: bool
              pwError  : bool }
            static member Default =
                { id   = -1
                  name = ""
                  kind = Anonymous
                  form = ("", "")
                  nameError = false
                  pwError   = false }
        and Kind =
            | Anonymous
            // | Admin of Admin.Model
            | Student of Student.Model
            // | Teacher of Teacher.Model

        type Message =
            | SetUsername of string
            | SetPassword of string
            | SubmitLogin
            | ClearForm
            | GetSession
            | RecvLogin   of Result<Model, Error>
            | RecvUser    of Model option
            | ErrorExn    of exn
            | Completed

    module Main =
        type Page =
            | [<EndPoint "/"       >] Home
            | [<EndPoint "/profile">] Profile
            | [<EndPoint "/db"     >] DBTest
            | [<EndPoint "/login"  >] Login
            | [<EndPoint "/404"    >] Page404

        type Model =
            { page : Page
              user : User.Model
              error: Error option }
            static member Default =
                { page  = Home
                  user  = User.Model.Default
                  error = None }

        type Message =
            | SetPage  of Page
            | ErrorMsg of Error
            | ErrorExn of exn
            | ClearError

            | UserMsg    of User.Message
            | StudentMsg of Student.Message

    type Services =
        {
            signIn : string * string -> Async<Result<User.Model, Error>>
            getUser: unit -> Async<User.Model>

            getStudent   : StudentID -> Async<Student.Model option>
            addStudent   : Student.Model -> Async<unit>
            updateStudent: StudentID * Student.Model -> Async<string option>
        }

        interface IRemoteService with
            member this.BasePath = "/server"
