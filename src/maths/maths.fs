namespace Maths

open Elmish
open Elmish.React
open Feliz
open Feliz.Router

open Shared
open Shared.Components

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
        | RecvUser of Services.User

    let init () =
        { Model.Default with
            url = Router.currentUrl () },
        Cmd.ofMsg GetUser

    let update msg state =
        match msg with
        | SetUrl url -> { state with url = url }, Cmd.none
        | GetUser -> state, Cmd.OfAsync.perform Services.userService.getUser () RecvUser
        | RecvUser user -> { state with user = user }, Cmd.none

    let view state dispatch =
        let sidebar =
            SidebarButtons
                [ "home-icon"     , "Home", Router.format "/"
                  "open-book-icon", "Mafs", Router.format "/mafs"
                  "compass-icon"  , "GA"  , Router.format "/ga" ]
        let page =
            match state.url with
            | [] -> Html.div [ sidebar "/"; Html.p $"Maths page" ]
            | mafs::url when mafs = "mafs" ->
                Html.div [
                    sidebar mafs
                    MafsExamples.view ()
                ]
            | ga::url when ga = "ga" ->
                Html.div [
                    sidebar ga
                    Examples.GA.view ()
                ]
            | url -> Html.div [ sidebar "/mafs"; Html.p (sprintf "Page not found: %A" url) ]

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
