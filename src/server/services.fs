namespace Server

open System
open Microsoft.AspNetCore.Hosting

open Bolero.Remoting
open Bolero.Remoting.Server

type Service =
    | Students

type Services (ctx: IRemoteContext, env: IWebHostEnvironment) =
    inherit RemoteHandler<Client.Types.Services> ()

    override this.Handler =
        {
            getStudent = fun id -> async { return StudentService.get id }
            addStudent = fun (name, surname, dob) -> async { return StudentService.add name surname dob }

            signIn = fun (name, pw) -> async {
                match name, pw with
                | "name", "pw" ->
                    do! ctx.HttpContext.AsyncSignIn (name, TimeSpan.FromDays 1)
                    return None
                | "name", _ -> return Some "Incorrect password"
                | _, _ -> return Some "Incorrect username"
            }

            getUsername = ctx.Authorize <| fun () -> async {
                return ctx.HttpContext.User.Identity.Name
            }
        }
