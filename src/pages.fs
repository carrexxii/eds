namespace Server

open Falco
open Falco.Markup
open Falco.Markup.Templates
open Falco.Markup.Elem
open Falco.Markup.Attr
open Falco.Markup.Text
open Falco.Security

module Pages =
    let template inner = 
        html5 "en" [
            meta [ charset "utf-8" ]
            meta [ name "viewport"; content "width=device-width, initial-scale=1.0" ]

            Elem.title [] [ raw "Page Title" ]

            link [ rel "stylesheet"; href "styles.css" ]
            script [ type' "module"; src "main.js" ] []
        ] [
            div [ id "main" ] [ inner ]
        ]

    let index: HttpHandler = 
        p [] [ raw "Hello, World!" ]
        |> template
        |> Response.ofHtml

    let login: HttpHandler =
        fun token -> 
            Elem.form [ method "POST" ] [
                input [ name "name"     ]
                input [ name "password" ]
                Xss.antiforgeryInput token
                input [ type' "submit"; value "Submit" ]
            ]
            |> template
        |> Response.ofHtmlCsrf

    let notFound: HttpHandler =
        Response.withStatusCode 404
        >> Response.ofPlainText "404: File not found"
