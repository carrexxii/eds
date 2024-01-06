namespace Server

open Bolero.Html
open Bolero.Server.Html

module Index =
    let page = doctypeHtml {
        head {
            meta { attr.charset "utf-8" }
            meta { attr.name "viewport"; attr.content "width=device-width, initial-scale=1.0" }
            title { "Bolero Application" }
            ``base`` { attr.href "/" }
            link { attr.rel "stylesheet"; attr.href "styles.css" }
        }
        body {
            div { attr.id "main"; comp<Client.Main.EDS> }
            boleroScript
        }
    }
