namespace EDS.Server

open Microsoft.AspNetCore.Http

open EDS.Shared
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
