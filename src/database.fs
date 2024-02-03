namespace EDS.Server

open Npgsql.FSharp

module Database =
    let connStr =
        Sql.host "localhost"
        |> Sql.database "test"
        |> Sql.username "postgres"
        |> Sql.password "postgres"
        |> Sql.port 5432
        |> Sql.formatConnectionString

    let query str reader =
        connStr
        |> Sql.connect
        |> Sql.query str
        |> Sql.execute reader

    let exec str =
        connStr
        |> Sql.connect
        |> Sql.query str
        |> Sql.executeNonQuery
