namespace Server

open Microsoft.AspNetCore.Components
open Microsoft.AspNetCore.Components.Web

open Bolero
open Bolero.Html
open Bolero.Server.Html
open Bolero.Templating

module Templates =
    type Index = Template<"templates/index.html">

    let sbButtons = [
        ("A", "1")
        ("B", "2")
        ("C", "3")
    ]

    let showButton btn =
        Index.SbButtons()
            .Name(fst btn)
            .Link(snd btn)
            .Icon("≡")
            .Elt()

    let buildIndex () =
        Index()
            .Sidebar(forEach sbButtons showButton)
            .Scripts(span { boleroScript })
            .Elt()
