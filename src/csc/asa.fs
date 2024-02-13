namespace EDS.CSC

open Feliz
open Feliz.Router

open EDS.Shared.Components
open EDS.CSC.ASA

module AS =
    let view = function
        | "asm"::[] -> ASM.view ""
        | "asm"::(Route.Query [ "tab", tab ])::[] -> ASM.view tab

        | [] ->
            let subUrl (section: string) (url: string) =
                Router.format ("asa", section, [ "tab", url ])
            Html.div [
                prop.className "prose prose-lg p-16"
                prop.children [
                    Heading "Outline"

                    Link "ASM"  (Router.format ("asa", "asm"))
                    LinkList (ASM.tabs |> List.map (fun tab -> fst tab, subUrl "asm" (fst tab)))
                ]
            ]
        | url -> SubHeading $"Page '{url}' does not exist"
