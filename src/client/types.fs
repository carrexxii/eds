namespace Client

open System

open Bolero
open Bolero.Remoting

[<AutoOpen>]
module Types =
    type StudentID = MongoDB.Bson.ObjectId
    module Student =
        type Model =
            { id     : StudentID
              name   : string
              surname: string
              dob    : DateTime }

        type Message =
            | SetName    of string
            | SetSurname of string
            | SetDoB     of DateTime

            | GetStudent of StudentID
            | GotStudent of Model option

            | AddStudent   of string
            | AddedStudent of Model

            | ErrorExn      of exn

            // | Add    of Model
            // | Delete of StudentID

    module Main =
        type Page =
            | [<EndPoint "/"       >] Home
            | [<EndPoint "/profile">] Profile
            | [<EndPoint "/db"     >] DBTest
            | [<EndPoint "/login"  >] Login
            | [<EndPoint "/404"    >] Page404

        type Model =
            { page        : Page
              error       : string option
              username    : string
              password    : string
              signedInAs  : string option
              signInFailed: bool
              userData    : UserData }
            static member Default =
                { page         = Home
                  error        = None
                  username     = ""
                  password     = ""
                  signedInAs   = None
                  signInFailed = false
                  userData     = Anonymous }
        and UserData =
            | Anonymous
            | Student of Student.Model
            // | Teacher of Teacher.Model
            // | Admin   of Admin.Model

        type LoginModel =
            { id  : int64
              name: string }
            static member Default =
                { id   = -1
                  name = "" }

        type Message =
            | SetPage     of Page
            | SetUsername of string
            | SetPassword of string
            | SubmitLogin
            | LoginResult of option<string>
            | GetSignedInAs
            | RecvSignedInAs of option<string>
            | ClearLoginForm
            | DisplayError of string
            | ErrorExn of exn
            | ClearError

            | StudentMsg of Student.Message
            // | UserMsg    of User.Message

    type Services =
        {
            signIn     : string * string -> Async<string option>
            getUsername: unit -> Async<string>

            getStudent       : StudentID -> Async<Student.Model option>
            addStudent       : string -> Async<Student.Model>
            // setStudentName   : StudentID -> string -> Async<string option>
            // setStudentSurname: StudentID -> string -> Async<string option>
            // setStudentDoB    : StudentID -> DateOnly -> Async<string option>
        }

        interface IRemoteService with
            member this.BasePath = "/serverRequest"