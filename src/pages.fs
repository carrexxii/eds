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

                link [ rel "icon"      ; href "icons/favicon.ico" ]
                link [ rel "manifest"  ; href "manifest.json" ]
                link [ rel "stylesheet"; href "styles.css" ]
            ] [
                script [] [
                    raw """
                        if("serviceWorker" in navigator) {
                            navigator.serviceWorker.register("sw.js", { scope: "/" })
                        }
                    """
                ]

                header [ class' "top-0 w-full h-16 border-b-2 bg-slate-100" ]
                    [ a [ class' "flex flex-row h-full prose prose-zinc items-center"; href "/" ] [
                        img [ class' "m-0 p-2 h-full"; src "icons/android-chrome-192x192.png" ]
                        h1 [ class' "pl-4" ] [ raw "" ]
                    ] ]
                div [ id "layout"; class' "flex" ] [
                    // Elem.form [ method "POST"; action "/logout" ] [
                    //     input [ type' "submit"; value "Submit" ]
                    //     Xss.antiforgeryInput token
                    // ]
                    div [ id "sidebar"; class' "sidebar-closed" ]
                        [ ]
                    div [ id "root"; class' "flex flex-col grow bg-gray-50" ]
                        [ inner ]
                ]
            ]
        |> Response.ofHtmlCsrf

    let index: HttpHandler =
        master (div [ class' "prose prose-zinc ml-4" ] [
            h2 [ class' "text-center test-3xl m-2" ] [ raw "Current Examples" ]
            h6 [ class' "text-center test-xl" ] [
                raw """This is still a work in progress. Most examples also have no written examples and
                       are only the interactive program. Some of the main examples are listed here."""
            ]
            ul [ class' "ml-8" ] [
                li [] [
                    a [ href "maths#/ig" ] [ raw "IGCSE Maths" ]
                    ul [] [
                        li [] [ a [ href "maths#/ig/geometry?tab=Constructions"     ] [ raw "Constructions" ] ]
                        li [] [ a [ href "maths#/ig/transforms?tab=Vectors"         ] [ raw "Vectors" ] ]
                        li [] [ a [ href "maths#/ig/transforms?tab=Transforms"      ] [ raw "Transforms" ] ]
                        li [] [ a [ href "maths#/ig/statistics?tab=Scatter%20Plots" ] [ raw "Graphs" ] ]
                    ]
                ]
                li [] [ a [ href "csc#/asa/asm?tab=Emulator" ] [ raw "AS/A Assembly Emulator" ] ]
            ]
        ])

    let user: HttpHandler =
        master (script [ type' "module"; src "user.js" ] [])

    let maths: HttpHandler =
        master (script [ type' "module"; src "maths.js" ] [])

    let csc: HttpHandler =
        master (script [ type' "module"; src "csc.js" ] [])

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
