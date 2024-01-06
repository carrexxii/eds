namespace Client

open Elmish
open Bolero
open Bolero.Html
open Bolero.Templating.Client

module Main =
    type Model = {
        id: int
    }

    let initModel = {
        id = 0
    }

    type Message =
    | Msg

    let update message model =
        match message with
        | Msg -> model

    let view model dispatch =
        p { "Hello, world!" }

    type EDS () =
        inherit ProgramComponent<Model, Message>()

        override this.Program =
            Program.mkSimple (fun _ -> initModel) update view
    //#if (hotreload_actual)
#if DEBUG
            |> Program.withHotReload
#endif
