namespace EDS.Maths

open Feliz
open Feliz.Mafs

open EDS.Shared.Components

module LA =
    [<ReactComponent>]
    let Index () =
        Article [
            Heading "Linear Algebra"
        ]

    [<ReactComponent>]
    let Vectors () =
        Article [
            Heading "Vectors"
        ]

    [<ReactComponent>]
    let Matrices () =
        Article [
            Heading "Matrices"
        ]

    let view url =
        match url with
        | [] -> Index ()
        | "vectors" ::[] -> Vectors ()
        | "matrices"::[] -> Matrices ()
        | url -> Heading $"Page not found: '{url}'"
