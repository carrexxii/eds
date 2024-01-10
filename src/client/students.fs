namespace Client

open System

open Elmish
open Bolero.Remoting

type StudentID = int64

module Student =
    type Model =
        { id     : StudentID
          name   : string
          surname: string
          dob    : DateOnly }

    type Message =
        | SetName    of string
        | SetSurname of string
        | SetDoB     of DateOnly

        | Add    of Model
        | Delete of StudentID

    type StudentService =
        {
            get       : StudentID -> Async<Model>
            // add       : Student.Model -> Async<Result<StudentID, string>>
            // setName   : StudentID -> string -> Async<option<string>>
            // setSurname: StudentID -> string -> Async<option<string>>
            // setDoB    : StudentID -> DateOnly -> Async<option<string>>
        }

        interface IRemoteService with
            member this.BasePath = "/student/{StudentID}"


    let init id =
        { id      = id
          name    = ""
          surname = ""
          dob     = DateOnly.MinValue },
        Cmd.none

    let update msg model =
        match msg with
        | SetName name'       -> { model with name = name' },       Cmd.none
        | SetSurname surname' -> { model with surname = surname' }, Cmd.none
        | SetDoB dob'         -> { model with dob = dob' },         Cmd.none

        // | Add model ->
        // | Delete id ->
