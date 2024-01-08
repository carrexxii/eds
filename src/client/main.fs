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
        | [<EndPoint "/"     >] Home
        | [<EndPoint "/login">] Login
        | [<EndPoint "/404"  >] Page404

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
        {
            signIn     : string * string -> Async<option<string>>
            getUsername: unit -> Async<string>
        }

        interface IRemoteService with
            member this.BasePath = "/profile"

    type Message =
        | SetPage     of Page
        | SetUsername of string
        | SetPassword of string
        | SubmitLogin
        | LoginResult of option<string>
        | GetSignedInAs
        | RecvSignedInAs of option<string>
        | ClearLoginForm
        | DisplayError of string
        | ErrorExn of exn
        | ClearError

    let update remote msg model =
        match msg with
        | SetPage page     -> { model with page = page }, Cmd.none
        | SetUsername name -> { model with username = name }, Cmd.none
        | SetPassword pw   -> { model with password = pw }, Cmd.none

        | SubmitLogin -> model, Cmd.OfAsync.either remote.signIn (model.username, model.password) LoginResult ErrorExn
        | LoginResult r ->
            (match r with
            | None -> { model with signedInAs = Some model.username },
                      SetPage Home |> Cmd.ofMsg
            | Some err -> model,
                          DisplayError err |> Cmd.ofMsg)
        | ClearLoginForm -> { model with username = ""; password = "" }, Cmd.none

        | GetSignedInAs -> model, Cmd.OfAuthorized.either remote.getUsername () RecvSignedInAs ErrorExn
        | RecvSignedInAs name -> { model with username = Option.defaultValue "" name }, Cmd.none

        | DisplayError err -> { model with error = Some err }, Cmd.none
        | ErrorExn err -> { model with error = Some (err.ToString ()) }, Cmd.none
        | ClearError -> { model with error = None }, Cmd.none

    let router =
        Router.infer SetPage (fun model -> model.page)
        |> Router.withNotFound Page404

    type Login = Template<"wwwroot/login.html">
    let loginPage model dispatch =
        Login()
            .Username(model.username, (fun name -> SetUsername name |> dispatch))
            .Password(model.password, (fun pw -> SetPassword pw |> dispatch))
            .Login(fun btn -> dispatch SubmitLogin)
            .Elt()

    type ErrorPage = Template<"wwwroot/error.html">
    let errorPage (code: string) (msg: string) =
        ErrorPage()
            .ErrorCode(code)
            .ErrorMsg(msg)
            .Elt()

    let view model dispatch =
        match model.page with
        | Home  -> p { $"Username: {model.signedInAs}" }
        | Login -> loginPage model dispatch 
        | Page404 -> errorPage "404" "Page not found"

    type EDS () =
        inherit ProgramComponent<Model, Message> ()

        override this.Program =
            Program.mkProgram (fun _ -> initModel, Cmd.ofMsg GetSignedInAs)
                              (update <| this.Remote<UserService> ())
                              view
            |> Program.withRouter router
#if DEBUG
            |> Program.withHotReload
#endif
