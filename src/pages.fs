namespace EDS.Server

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
                header [ class' "top-0 w-full h-16 border-b-2 bg-slate-100" ]
                    [ a [ href "/" ] [ raw "~~~ Header ~~~" ] ]
                div [ id "layout"; class' "flex" ] [
                    // Elem.form [ method "POST"; action "/logout" ] [
                    //     input [ type' "submit"; value "Submit" ]
                    //     Xss.antiforgeryInput token
                    // ]
                    div [ id "sidebar"; class' "sidebar-open" ]
                        [ ]
                    div [ id "root"; class' "flex flex-col grow sm:mr-0 md:mr-16 lg:mr-32 bg-gray-50" ]
                        [ inner ]
                ]
                footer [ id "footer"; class' "left-0 w-full h-16 p-4 border-t-2 text-center" ]
                    [ raw "~~~ Footer ~~~" ]
            ]
        |> Response.ofHtmlCsrf

    let index: HttpHandler =
        master (raw "Index")

    let user: HttpHandler =
        master (script [ type' "module"; src "user.js" ] [])

    let maths: HttpHandler =
        master (script [ type' "module"; src "maths.js" ] [])

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
