namespace Maths

open Elmish
open Elmish.React
open Feliz
open Feliz.Router

open Shared

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
        let page =
            match state.url with
            | [] -> Html.p "Maths page"
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
