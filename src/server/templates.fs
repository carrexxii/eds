namespace Server

open Bolero
open Bolero.Html
open Bolero.Server.Html

module Templates =
    type Index = Template<"templates/index.html">

    let sbButtons = [
        ("Profile", "/profile")
        ("Login", "/login")
        ("db", "/db")
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
