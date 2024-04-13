namespace EDS.Server

open System.IO
open Microsoft.AspNetCore.Http
open FSharp.Data
open FSharp.Data.CsvExtensions
open Option
open Fumble

open EDS.Shared
open EDS.Shared.Services
open Database

module Services =
    module User =
        let [<Literal>] table = "Users"

        let User: HttpContext -> Services.IUser =
            fun (ctx: HttpContext) -> {
                get = fun userQuery -> async {
                    let req = $"""{if isSome userQuery.id       then $"id       = '{userQuery.id}'"       else ""}""" +
                              $"""{if isSome userQuery.username then $"username = '{userQuery.username}'" else ""}""" +
                              $"""{if isSome userQuery.email    then $"email    = '{userQuery.email}'"    else ""}"""
                    let req = if req = "" then "id = '0'" else req // TODO: fetch logged-in user
                    printfn $"Getting... {userQuery} -> \"{req}\""
                    return (query
                        $"SELECT * FROM users
                          WHERE {req};"
                        (fun read ->
                            { id       = read.int    "id"
                              username = read.string "username"
                              email    = read.string "email"
                              password = read.string "password" }))
                    |> (function
                        | Error err -> printfn $"Error getting users with userQuery = {userQuery}:\n{err}\n\"{req}\""
                                       []
                        | Ok users  -> users)
                }

                set = fun user -> async {
                    printfn $"Setting... {user}"
                    return Ok ()
                }

                add = fun user -> async {
                    printfn $"Adding... {user} (userCount = {userCount})"
                    userCount <- userCount + 1
                    return query
                        $"INSERT INTO {table} (id, username, email, password)
                          VALUES ('{userCount}', '{user.username}', '{user.email}', '{user.password}');"
                        (fun reader -> Ok ())
                        |> (function
                            | Error err -> Error $"Error inserting user: {err}"
                            | Ok user   -> Ok ())
                }
            }

    ///////////////////////////////////////////////////////////////////////////

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
