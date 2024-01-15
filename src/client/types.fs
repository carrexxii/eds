namespace Client

open System

open Bolero
open Bolero.Remoting

[<AutoOpen>]
module Types =
    type Error =
        | IncorrectUsername
        | IncorrectPassword
        | PageNotFound
        | AccessDenied
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

///////////////////////////////////////////////////////////////////////////////

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
            | SetID       of StudentID
            | SetName     of string
            | SetSurname  of string
            | SetDoB      of DateOnly
            | GetStudent  of StudentID
            | RecvStudent of Model option
            | AddStudent
            | UpdateStudent
            | ErrorExn    of exn
            | Completed

///////////////////////////////////////////////////////////////////////////////

    type UserID = int64
    module User =
        type Model =
            { id  : UserID
              name: string
              kind: Kind }
            static member Default =
                { id   = -1
                  name = ""
                  kind = Anonymous }
        and LoginModel =
            { name     : string
              password : string
              nameError: bool
              pwError  : bool }
            static member Default =
                { name      = ""
                  password  = ""
                  nameError = false
                  pwError   = false }
        and Kind =
            | Anonymous
            // | Admin
            | Student
            // | Teacher

        type Message =
            | SetUsername of string
            | SetPassword of string
            | SubmitLogin
            | GetSession
            | RecvLogin   of Result<Model, Error>
            | RecvUser    of Model option
            | ErrorExn    of exn
            | Completed   of Model

///////////////////////////////////////////////////////////////////////////////

    module Dashboard =
        [<RequireQualifiedAccess>]
        type Page =
            | [<EndPoint "/"        >] Home
            | [<EndPoint "/profile" >] Profile
            | [<EndPoint "/students">] Students

        type Model =
            { user: User.Model }
            static member Default =
                { user = User.Model.Default }
        
        type Message =
            | Completed

///////////////////////////////////////////////////////////////////////////////

    module Main =
        [<RequireQualifiedAccess>]
        type Page =
            | [<EndPoint "/"      >] Home
            | [<EndPoint "/login" >] Login
            | [<EndPoint "/logout">] Logout
            | [<EndPoint "/error" >] Error
            | [<EndPoint "/dashboard/{page}" >] Dashboard of page: Dashboard.Page

        type Model =
            { page : Page
              login: User.LoginModel
              user : User.Model
              dash : Dashboard.Model
              error: Error option }
            static member Default =
                { page  = Page.Home
                  login = User.LoginModel.Default
                  user  = User.Model.Default
                  dash  = Dashboard.Model.Default
                  error = None }

        type Message =
            | SetPage  of Page
            | ErrorMsg of Error
            | ErrorExn of exn
            | ClearError

            | UserMsg      of User.Message
            | DashboardMsg of Dashboard.Message
            // | StudentMsg of Student.Message

///////////////////////////////////////////////////////////////////////////////

    type Services =
        {
            signIn : User.LoginModel -> Async<Result<User.Model, Error>>
            signOut: unit -> Async<unit>
            getUser: unit -> Async<User.Model>

            getStudent   : StudentID -> Async<Student.Model option>
            addStudent   : Student.Model -> Async<unit>
            updateStudent: Student.Model -> Async<string option>
        }

        interface IRemoteService with
            member this.BasePath = "/server"
