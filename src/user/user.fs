namespace EDS.User

open Elmish
open Elmish.React
open Feliz
open Feliz.Router

open EDS.Shared
open EDS.Shared.Components

module Main =
    type Model =
        { url  : string list
          user : Services.User
          dash : Dashboard.Model
          error: string option }
        static member Default =
            { url   = []
              user  = Services.User.Default
              dash  = Dashboard.Model.Default
              error = None }

    type Message =
        | SetUrl   of string list
        | GetUser
        | RecvUser of Services.User list
        | ErrorMsg of string
        | ErrorExn of exn
        | ClearError

        | DashMsg of Dashboard.Message

    let init () =
        { Model.Default with
            url = Router.currentUrl () },
        Cmd.ofMsg GetUser

    let update msg state =
        match msg with
        | SetUrl url -> { state with url = url }, Cmd.none
        | GetUser -> state, Cmd.OfAsync.perform Services.userService.get Services.UserQuery.Default RecvUser
        | RecvUser user ->
            match user with
            | [user] -> { state with user = user }, Cmd.none
            | users -> printfn $"Error requesting user data, got: {users}"
                       state, Cmd.none
        | DashMsg msg ->
            match msg with
            | Dashboard.Message.Completed -> state, Cmd.none
            | _ -> let dash, msg = Dashboard.update msg state.dash
                   { state with dash = dash }, Cmd.map DashMsg msg

    let view state dispatch =
        let sidebar =
            SidebarButtons
                [ "dashboard-icon", "Dashboard", Router.format "/dashboard"
                  "user-icon"     , "Profile"  , Router.format "/"
                  "settings-icon" , "Settings" , Router.format "/settings"
                  "info-icon"     , "About"    , Router.format "/about"
                  "question-icon" , "Help"     , Router.format "/help" ]
        let page =
            match state.url with
            | [] -> concat (sidebar "/") (Html.p $"Profile page ~> /")
            | "dashboard"::url -> concat (sidebar "/dashboard") (Dashboard.view state.dash (DashMsg >> dispatch))
            | "settings" ::url -> concat (sidebar "/settings" ) (Html.p $"Settings page ~> {url}")
            | "about"    ::url -> concat (sidebar "/about"    ) (Html.p $"About page ~> {url}")
            | "help"     ::url -> concat (sidebar "/help"     ) (Html.p $"Help page ~> {url}")
            | url -> Html.p (sprintf "Page not found: %A" url)

        React.router [
            router.onUrlChanged (SetUrl >> dispatch)
            router.children page
        ]

    [<EntryPoint>]
    let main args =
        Program.mkProgram init update view
        |> Program.withReactSynchronous "root"
        |> Program.run
        0
