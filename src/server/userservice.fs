namespace Server

open System
open System.IO
open System.Text.Json
open System.Text.Json.Serialization
open Microsoft.AspNetCore.Hosting
open Bolero
open Bolero.Remoting
open Bolero.Remoting.Server
open System

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
        }
