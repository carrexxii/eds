namespace EDS.CSC

open Feliz
open Feliz.Router

open EDS.Shared.Components
open EDS.CSC.IG

module IG =
    let view = function
        | "asm"::[] -> ASM.view ""
        | "asm"::(Route.Query [ "tab", tab ])::[] -> ASM.view tab

        | [] ->
            let subUrl (section: string) (url: string) =
                Router.format ("ig", section, [ "tab", url ])
            Html.div [
                prop.className "prose prose-lg p-16"
                prop.children [
                    Heading "Outline"

                    Link "ASM"  (Router.format ("ig", "asm"))
                    LinkList (ASM.tabs |> List.map (fun tab -> fst tab, subUrl "asm" (fst tab)))
                ]
            ]
        | url -> SubHeading $"Page '{url}' does not exist"
