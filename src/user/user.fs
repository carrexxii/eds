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
        | RecvUser of Services.User option
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
        | SetUrl url -> { state with url = url }, Cmd.ofMsg GetUser
        | GetUser -> state, Cmd.OfAsync.perform Services.userService.get () RecvUser
        | RecvUser user -> { state with user = Option.get user }, Cmd.none

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
            | "dashboard"::url -> concat (sidebar "/dashboard") (Dashboard.view url state.dash (DashMsg >> dispatch))
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
