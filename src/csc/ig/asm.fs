namespace EDS.CSC.IG

open System

open Feliz

open EDS.Shared
open EDS.Shared.Components

module ASM =
    [<ReactComponent>]
    let Emulator () =
        Html.div [
            Html.text "CSC Emulator"
        ]

    let tabs =
        [ "Emulator", Emulator () ]

    let view tab =
        Tabbed tab tabs
