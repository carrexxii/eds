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

            // Claims: https://fsbolero.io/docs/Remoting#authentication-and-authorization:~:text=%7C%20%22administrator%22%20%2D%3E%20%5BClaim(ClaimTypes.Role%2C%20%22admin%22)%5D
            signIn = fun model -> async {
                printfn $"Attempting to sign in: {model.name} | {model.password}"
                match model.name, model.password with
                | "name", "pw" ->
                    do! ctx.HttpContext.AsyncSignIn (model.name, TimeSpan.FromDays 1)
                    return Ok { User.Model.Default
                                with name = model.name
                                     kind = User.Student }
                | "name", _ -> return Error IncorrectPassword
                | _     , _ -> return Error IncorrectUsername
            }

            signOut = fun () -> async {
                return! ctx.HttpContext.AsyncSignOut ()
            }

            getUser = fun () -> async {
                return match ctx.HttpContext.TryUsername () with
                       | None -> User.Model.Default
                       | Some name ->
                           { User.Model.Default with
                               name = name
                               kind = User.Kind.Student }
            }
        }
