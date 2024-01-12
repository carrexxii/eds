namespace Client

open System

open Elmish
open Bolero.Remoting.Client

open Student

module Student =
    let update (remote: Services) msg =
        match msg with
        // | SetName name'       -> { model with name = name' },       Cmd.none
        // | SetSurname surname' -> { model with surname = surname' }, Cmd.none
        // | SetDoB dob'         -> { model with dob = dob' },         Cmd.none

        // | GetStudent id -> model, Cmd.OfAsync.either remote.getStudent id GotStudent ErrorExn
        // | GotStudent model -> failwith "succcceeeessss"

        | AddStudent name -> Cmd.OfAsync.either remote.updateStudent (4, {Model.Default with name = "qwe"; surname = "poi"}) (fun _ -> AddedStudent) ErrorExn
        | AddedStudent    -> Cmd.none

        // | Add model ->
        // | Delete id ->
