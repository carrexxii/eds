namespace EDS.CSC

open Elmish
open Elmish.React
open Feliz
open Feliz.Router

open EDS.Shared
open EDS.Shared.Components
open EDS.CSC

module Main =
    type Model =
        { url : string list
          user: Services.User }
        static member Default =
            { url  = []
              user = Services.User.Default }

    type Message =
        | SetUrl of string list
        | GetUser
        | RecvUser of Services.User option

    let init () =
        { Model.Default with
            url = Router.currentUrl () },
        Cmd.ofMsg GetUser

    let update msg state =
        match msg with
        | SetUrl url -> { state with url = url }, Cmd.none
        | GetUser -> state, Cmd.OfAsync.perform Services.userService.get () RecvUser
        | RecvUser user -> { state with user = Option.get user }, Cmd.none

    let view state dispatch =
        let sidebar =
            SidebarButtons
                [ "home-icon"     , "Home", Router.format ""
                  "dashboard-icon", "AS/A", Router.format "asa" ]
        let page =
            match state.url with
            | [] -> Html.div [ sidebar ""; Html.p "CSC page" ]
            | "asa"::url -> Html.div [ sidebar "asa"; AS.view url ]
            | url -> concat (sidebar "mafs") (SubHeading $"Page not found: {url}")

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
