namespace Server

open System
open Microsoft.AspNetCore.Hosting

open Bolero.Remoting
open Bolero.Remoting.Server

type UserModel = Client.Types.User.Model

type Service =
    | Students

type Services (ctx: IRemoteContext, env: IWebHostEnvironment) =
    inherit RemoteHandler<Client.Types.Services> ()

    override this.Handler =
        {
            getStudent    = fun id -> async { return StudentService.get id }
            addStudent    = fun model -> async { return StudentService.add model }
            updateStudent = fun (id, model) -> async { return StudentService.update id model }

            signIn = fun (name, pw) -> async {
                match name, pw with
                | "name", "pw" ->
                    do! ctx.HttpContext.AsyncSignIn (name, TimeSpan.FromDays 1)
                    return Ok { UserModel.Default
                                with name = name }
                | "name", _ -> return Error "Incorrect password"
                | _, _ -> return Error "Incorrect username"
            }

            getUser = ctx.Authorize <| fun () -> async {
                let name = ctx.HttpContext.User.Identity.Name
                return { UserModel.Default
                         with name = name }
            }
        }
