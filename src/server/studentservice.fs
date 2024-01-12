namespace Server

open Bolero.Remoting

open Database

module StudentService =
    type Model = Client.Types.Student.Model

    let add (model: Model) =
        if model.id <> -1 then printfn $"Unexpected model id: {model.id}" // TODO: logging
        exec <| $"INSERT INTO \"Students\"
                  (name, surname, dob) VALUES
                  ('{model.name}', '{model.surname}', '{model.dob}')"
             |> ignore

    let get id =
        query <| $"SELECT * FROM \"Students\"
                   WHERE id = {id}"
              <| (fun read -> { id      = read.int64    "id"
                                name    = read.string   "name"
                                surname = read.string   "surname"
                                dob     = read.dateOnly "dob" }: Model)
              |> List.tryHead

    let update id (model: Model) =
        exec <| $"UPDATE \"Students\"
                  SET name    = '{model.name}',
                      surname = '{model.surname}',
                      dob     = '{model.dob}'
                  WHERE id = {id}"
             |> (fun c -> if c = 1 then None else Some "Error updating record")
