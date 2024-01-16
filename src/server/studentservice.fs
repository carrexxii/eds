namespace Server

open Bolero.Remoting

open Database

module StudentService =
    type Model = Client.Types.Student.Model

    let private readModel (read: RowReader) = 
        { id      = read.int64    "id"
          name    = read.string   "name"
          surname = read.string   "surname"
          dob     = read.dateTime "dob" |> System.DateOnly.FromDateTime }: Model

    let add (model: Model) =
        if model.id <> -1 then printfn $"Unexpected model id: \"{model.id}\". Should be -1 to indicate new record." // TODO: logging
        else exec <| $"INSERT INTO \"Students\"
                       (name, surname, dob) VALUES
                       ('{model.name}', '{model.surname}', '{model.dob}')"
                  |> ignore

    let get id =
        query <| $"SELECT * FROM \"Students\"
                   WHERE id = {id}"
              <| readModel
              |> List.tryHead

    let getMany () =
        query <| $"SELECT * FROM \"Students\""
              <| readModel
              |> function
                 | [] -> None
                 | xs -> Some (Array.ofList xs)

    let update (model: Model) =
        if model.id < 0 then Some "Error updating record: invalid id"
        else exec <| $"UPDATE \"Students\"
                       SET name    = '{model.name}',
                           surname = '{model.surname}',
                           dob     = '{model.dob}'
                       WHERE id = {model.id}"
                  |> (fun c -> if c = 1 then None else Some "Error updating record")
