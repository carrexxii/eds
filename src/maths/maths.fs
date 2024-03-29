namespace EDS.Maths

open Elmish
open Elmish.React
open Feliz
open Feliz.Router

open EDS.Shared
open EDS.Shared.Components
open EDS.Maths

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
                [ "home-icon"     , "Home"          , Router.format ""
                  "open-book-icon", "Mafs"          , Router.format "mafs"
                  "open-book-icon", "Linear Algebra", Router.format "la"
                  "compass-icon"  , "GA"            , Router.format "ga"
                  "abacus-icon"   , "IG"            , Router.format "ig" ]
        let page =
            match state.url with
            | [] -> Html.div [ sidebar ""; Html.p $"Maths page" ]
            | mafs::url when mafs = "mafs" -> concat (sidebar mafs) (Mafs.view ())
            | la  ::url when la   = "la"   -> concat (sidebar la  ) (LA.view url)
            | ga  ::url when ga   = "ga"   -> concat (sidebar ga  ) (GA.view ())
            | ig  ::url when ig   = "ig"   -> concat (sidebar ig  ) (IG.view url)
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
