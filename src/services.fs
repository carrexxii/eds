namespace EDS.Server

open System.IO
open Microsoft.AspNetCore.Http
open FSharp.Data
open FSharp.Data.CsvExtensions

open EDS.Shared
open EDS.Shared.Services
open Database

module Services =
    module User =
        let [<Literal>] table = "testing"

        let private readModel (read: RowReader): Services.User =
            { id       = read.int   "id"
              username = read.string "username"
              email    = read.string "email"
              password = read.string "password" }

        let User: HttpContext -> Services.IUser =
            fun (ctx: HttpContext) -> {
                get = fun () -> async {
                    return
                        query $"SELECT * FROM {table}
                                WHERE id = 2"
                        readModel
                        |> List.tryHead
                }

                getMany = fun (first, last) -> async {
                    return
                        query $"SELECT * FROM {table}
                                WHERE BETWEEN {first} AND {last}"
                        readModel
                        |> Array.ofList
                        |> Some
                }

                set = fun user -> async {
                    return
                        exec $"UPDATE {table}
                               SET username = '{user.username}',
                                   email    = '{user.email}',
                                   password = '{user.password}'
                               WHERE id = {user.id}"
                        |> function
                           | 1 -> Ok ()
                           | _ -> Error $"User {user.id} is not in '{table}' for update: {user}"
                }

                add = fun user -> async {
                    if user.id <> -1 then
                        return () // (Error $"User id should be set to -1 for adding a new record ({user})")
                    else
                        exec $"INSERT INTO {table}
                               (username, email, password) VALUES
                               ('{user.username}', '{user.email}', '{user.password}')"
                        |> ignore
                    return Ok ()
                }
            }

    module Resource =
        let [<Literal>] CSCDir   = "data/csc"
        let [<Literal>] MathsDir = "data/maths"

        let Resource: HttpContext -> Services.IResource =
            fun (ctx: HttpContext) -> {
                getProgram = fun name -> async {
                    return
                        try File.ReadAllLines $"{CSCDir}/test.asaasm" |> Some
                        with exn ->
                            printfn $"getProgram error: '{exn}'"
                            None
                }

                // TODO: cache
                getMathsData = fun name -> async {
                    let name = name.Replace (' ', '-') |> _.ToLower()
                    let path = $"{MathsDir}/{name}.csv"
                    if not (File.Exists path) then
                        printfn $"Requested file '{path}' does not exist"
                        return None
                    else
                        let csv = File.ReadAllText path |> CsvFile.Parse
                        return
                            if csv.NumberOfColumns = 1 then
                                csv.Rows
                                |> Seq.map (fun row -> row[0].AsInteger ())
                                |> Seq.sort
                                |> List.ofSeq
                                |> (SingleData >> Some)
                            elif csv.NumberOfColumns = 2 then
                                csv.Rows
                                |> Seq.map (fun row -> row[0].AsInteger (), row[1].AsInteger ())
                                |> List.ofSeq
                                |> (PairData >> Some)
                            else None
                }
            }
