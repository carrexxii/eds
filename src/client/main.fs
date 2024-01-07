namespace Client

open System
open System.Net.Http
open System.Net.Http.Json
open Microsoft.AspNetCore.Components

open Elmish
open Bolero
open Bolero.Html
open Bolero.Templating.Client
open Bolero.Remoting
open Bolero.Remoting.Client

module Main =
    type Page =
        | [<EndPoint "/"       >] Home
        | [<EndPoint "/login"  >] Login

    type Model =
        { page        : Page
          error       : option<string>
          userName    : string
          password    : string
          signedInAs  : option<string>
          signInFailed: bool }
    let initModel =
        { page         = Home
          error        = None
          userName     = ""
          password     = ""
          signedInAs   = None
          signInFailed = false }

    type UserData =
        { id  : int64
          name: string }
    let initUserData =
        { id   = -1
          name = "" }

    type UserService =
        { signIn: string * string -> Async<option<string>> }
        interface IRemoteService with
            member this.BasePath = "/profile"

    type Message =
        | SetPage     of Page
        | SetUserName of string
        | SetPassword of string
        | ClearLoginForm
        | Error of exn
        | ClearError

    let update remote msg model =
        let onSignIn = function
            | Some _ -> Cmd.ofMsg ClearLoginForm
            | None   -> Cmd.none
        match msg with
        | SetPage page -> { model with page = page }, Cmd.none
        | SetUserName name -> { model with userName = name }, Cmd.none
        | SetPassword pw -> { model with password = pw }, Cmd.none
        | ClearLoginForm -> { model with userName = ""; password = "" }, Cmd.none
        | Error e -> { model with error = Some (e.ToString ()) }, Cmd.none
        | ClearError -> { model with error = None }, Cmd.none

    let router = Router.infer SetPage (fun model -> model.page)

    type Login = Template<"wwwroot/login.html">
    let loginPage model dispatch =
        Login()
            .Elt()

    let view model dispatch =
        match model.page with
        | Home  -> p { "Hello, world!" }
        | Login -> loginPage model dispatch
        | _ -> p { "404" }

    type EDS () =
        inherit ProgramComponent<Model, Message>()

        override this.Program =
            Program.mkProgram (fun _ -> initModel, Cmd.ofMsg ClearLoginForm)
                              (update <| this.Remote<UserService> ())
                              view
            |> Program.withRouter router
#if DEBUG
            |> Program.withHotReload
#endif
