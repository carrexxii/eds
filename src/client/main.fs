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
          username    : string
          password    : string
          signedInAs  : option<string>
          signInFailed: bool }
    let initModel =
        { page         = Home
          error        = None
          username     = ""
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
        | SetUsername of string
        | SetPassword of string
        | SubmitLogin
        | LoginResult of option<string>
        | ClearLoginForm
        | DisplayError of string
        | ErrorMsg of exn
        | ClearError

    let update remote msg model =
        match msg with
        | SetPage page -> { model with page = page }, Cmd.none
        | SetUsername name -> { model with username = name }, Cmd.none
        | SetPassword pw -> { model with password = pw }, Cmd.none

        | SubmitLogin -> model, Cmd.OfAsync.either remote.signIn (model.username, model.password) LoginResult ErrorMsg
        | LoginResult r ->
            (match r with
            | None -> { model with signedInAs = Some model.username },
                      SetPage Home |> Cmd.ofMsg
            | Some err -> model,
                          DisplayError err |> Cmd.ofMsg)
        | ClearLoginForm -> { model with username = ""; password = "" }, Cmd.none

        | DisplayError err -> { model with error = Some err }, Cmd.none
        | ErrorMsg err -> { model with error = Some (err.ToString ()) }, Cmd.none
        | ClearError -> { model with error = None }, Cmd.none

    let router = Router.infer SetPage (fun model -> model.page)

    type Login = Template<"wwwroot/login.html">
    let loginPage model dispatch =
        Login()
            .Username(model.username, (fun name -> SetUsername name |> dispatch))
            .Password(model.password, (fun pw -> SetPassword pw |> dispatch))
            .Login(fun btn -> SubmitLogin |> dispatch)
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
