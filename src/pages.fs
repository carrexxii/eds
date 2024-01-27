namespace Server

open Falco
open Falco.Markup
open Falco.Markup.Templates
open Falco.Markup.Elem
open Falco.Markup.Attr
open Falco.Markup.Text
open Falco.Security

module Pages =
    let master inner =
        fun token ->
            html5 "en" [
                meta [ charset "utf-8" ]
                meta [ name "viewport"; content "width=device-width, initial-scale=1.0" ]
                meta [ name "description"; content "Meta page description" ]

                Elem.title [] [ raw "Page Title" ]

                link [ rel "stylesheet"; href "styles.css" ]
            ] [
                header [ id "header" ]
                    [ a [ href "/" ] [ raw "~~~ Header ~~~" ] ]
                div [ id "layout" ] [
                    // Elem.form [ method "POST"; action "/logout" ] [
                    //     input [ type' "submit"; value "Submit" ]
                    //     Xss.antiforgeryInput token
                    // ]
                    div [ id "sidebar"; class' "sidebar-open" ]
                        [ ]
                    div [ id "root" ]
                        [ inner ]
                ]
                footer [ id "footer" ]
                    [ raw "~~~ Footer ~~~" ]
            ]
        |> Response.ofHtmlCsrf

    let index: HttpHandler = 
        master (raw "Index")

    let user: HttpHandler =
        master (script [ type' "module"; src "main.js" ] [])

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
