namespace Server

open System
open Microsoft.AspNetCore.Hosting

open Bolero.Remoting
open Bolero.Remoting.Server

open Client.Types

type Service =
    | Students

type Services (ctx: IRemoteContext, env: IWebHostEnvironment) =
    inherit RemoteHandler<Client.Types.Services> ()

    override this.Handler =
        {
            getStudent    = fun id -> async { return StudentService.get id }
            addStudent    = fun model -> async { return StudentService.add model }
            updateStudent = fun model -> async { return StudentService.update model }

            signIn = fun (name, pw) -> async {
                printfn $"Attempting to sign in: {name} | {pw}"
                match name, pw with
                | "name", "pw" ->
                    do! ctx.HttpContext.AsyncSignIn (name, TimeSpan.FromDays 1)
                    return Ok { User.Model.Default
                                with name = name
                                     kind = User.Student Student.Model.Default }
                | "name", _ -> return Error IncorrectPassword
                | _     , _ -> return Error IncorrectUsername
            }

            getUser = ctx.Authorize <| fun () -> async {
                let name = ctx.HttpContext.User.Identity.Name
                return { User.Model.Default
                         with name = name }
            }
        }
