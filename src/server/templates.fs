namespace Server

open Bolero
open Bolero.Html
open Bolero.Server.Html
open Bolero.Templating

module Templates =
    type Index = Template<"templates/index.html">

    let buildIndex () =
        Index()
            .Scripts(span { boleroScript })
            .Elt ()
