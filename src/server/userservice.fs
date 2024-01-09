namespace Server

open System
open Microsoft.AspNetCore.Hosting
open Bolero.Remoting
open Bolero.Remoting.Server

type UserService (ctx: IRemoteContext, env: IWebHostEnvironment) =
    inherit RemoteHandler<Client.Main.UserService> ()

    override this.Handler =
        {
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
