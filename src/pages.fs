namespace Server

open Falco
open Falco.Markup
open Falco.Markup.Templates
open Falco.Markup.Elem
open Falco.Markup.Attr
open Falco.Markup.Text
open Falco.Security

module Pages =
    let master script' inner =
        fun token ->
            html5 "en" [
                meta [ charset "utf-8" ]
                meta [ name "viewport"; content "width=device-width, initial-scale=1.0" ]

                Elem.title [] [ raw "Page Title" ]

                link [ rel "stylesheet"; href "styles.css" ]
                if script' <> "" then
                    script [ type' "module"; src script' ] []
            ] [
                Elem.form [ method "POST"; action "/logout" ] [
                    input [ type' "submit"; value "Submit" ]
                    Xss.antiforgeryInput token
                ]
                div [ id "root" ] [ inner ]
            ]
        |> Response.ofHtmlCsrf

    let index: HttpHandler = 
        master ""
            (p [] [ raw "~ Index page ~" ])

    let user: HttpHandler =
        master "main.js"
            (p [] [ raw "Loading..." ])

    let status: HttpHandler = fun ctx ->
        let user = Auth.getUser ctx
        Request.ifAuthenticated
            (Response.ofPlainText $"Authenticated ~> {user.Value.Identity.Name}")
            (Response.ofPlainText "Not authenticated")
            ctx

    let notFound: HttpHandler =
        Response.withStatusCode 404
        >> Response.ofPlainText "404: File not found"

    let login: HttpHandler =
        fun token ->
            html5 "en" [
                meta [ charset "utf-8" ]
                meta [ name "viewport"; content "width=device-width, initial-scale=1.0" ]

                Elem.title [] [ raw "Sign In" ]

                link [ rel "stylesheet"; href "styles.css" ]
            ] [
                Elem.form [ class' "form"; method "POST" ] [
                    input [ class' "text-input"; name "name"    ; placeholder "Name" ]
                    input [ class' "text-input"; name "password"; placeholder "Password"; type' "password" ]
                    Xss.antiforgeryInput token
                    input [ class' "button"; type' "submit"; value "Submit" ]
                ]
            ]
        |> Response.ofHtmlCsrf
