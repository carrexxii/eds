namespace EDS.Shared

open Feliz

[<AutoOpen>]
module Util =
    let aOrAn (str: string) =
        match str.ToLower () |> _.Chars(0) with
        | 'a' | 'e' | 'i' | 'o' | 'u' -> "an"
        | _ -> "a"

    let concat a b =
        Html.div [
            prop.children [
                a
                b
            ]
        ]
