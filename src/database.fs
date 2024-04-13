namespace EDS.Server

open Fumble

open EDS.Shared

module Database =
    let [<Literal>] connStr = "Data Source=data/database.db"
    let mutable userCount = 0

    let query str reader =
        connStr
        |> Sql.connect
        |> Sql.query str
        |> Sql.execute reader

    connStr
    |> Sql.connect
    |> Sql.commandCreate<Services.User> "Users"
    |> Sql.executeCommand
    |> (function
        | Error err -> failwith $"Error setting up \"Users\" table: {err}"
        | Ok x      -> printfn $"Created \"Users\" table: {x}")

    connStr
    |> Sql.connect
    |> Sql.query "SELECT MAX(id) FROM Users;"
    |> Sql.execute (fun reader -> userCount <- reader.int "MAX(id)")
    |> (function
        | Ok    x   -> printfn $"There are {userCount} users"
        | Error err -> printfn $"Error getting max user count: \"{err}\"")
