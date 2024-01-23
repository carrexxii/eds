namespace Client

open Fable.Core
open Fable.Core.JsInterop
open Browser.Dom
open Browser
open Feliz

open Components

module Main =
    [<EntryPoint>]
    let main args =
        let root = ReactDOM.createRoot (document.getElementById "main")
        root.render (Counter ())
        0
