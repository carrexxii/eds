namespace EDS.Maths.IG

open System

open Feliz
open Feliz.Mafs

open EDS.Shared.Components

module Probability =
    let Probability () =
        Html.div [

        ]

    let RelativeFrequency () =
        Html.div [

        ]

    let TreeDiagrams () =
        Html.div [

        ]

    let VennDiagrams () =
        Html.div [

        ]

    let tabs =
        [ "Probability"       , Probability ()
          "Relative Frequency", RelativeFrequency ()
          "Tree Diagrams"     , TreeDiagrams ()
          "Venn Diagrams"     , VennDiagrams () ]

    let view tab =
        Tabbed tab tabs
