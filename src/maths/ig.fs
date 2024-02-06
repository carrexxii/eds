namespace EDS.Maths

open Fable.Core.JsInterop
open Feliz
open Feliz.Mafs

open EDS.Shared.Components
open EDS.Maths.IG

module IG =
    [<ReactComponent>]
    let view () =
        Tabbed
            [ "Numbers"                   , Numbers.view ()
              "Algebra"                   , Algebra.view ()
              "Geometry and Trigonometry" , GeoAndTrig.view ()
              "Probability and Statistics", ProbAndStats.view () ]
