namespace EDS.Maths

open Feliz
open Feliz.Router

open EDS.Shared.Components
open EDS.Maths.IG

module IG =
    let view = function
        | "numbers"::[] -> Numbers.view ""
        | "numbers"::(Route.Query [ "tab", tab ])::[] -> Numbers.view tab
        | "algebra" ::[] -> Algebra.view ()
        | "geotrig" ::[] -> GeoAndTrig.view ()
        | "probstat"::[] -> ProbAndStats.view ()
        | [] ->
            Html.div [
                prop.className "prose prose-lg p-16"
                prop.children [
                    Heading "Outline"

                    Link "Numbers" (Router.format ("ig", "numbers"))
                    LinkList
                        [ let subUrl (url: string) = Router.format ("ig", "numbers", [ "tab", url ])
                          "Number sets", subUrl "sets"
                          "Exponents"  , subUrl "exponents"
                          "Percentages", subUrl "percentages"
                          "Estimates"  , subUrl "estimates"
                          "Currency"   , subUrl "currency" ]

                    Link "Algebra" (Router.format ("ig", "algebra"))
                    LinkList
                        [  ]

                    Link "Geometry and Trigonometry"  (Router.format ("ig", "geotrig"))
                    LinkList
                        [  ]

                    Link "Probability and Statistics" (Router.format ("ig", "probstat"))
                    LinkList
                        [  ]
                ]
            ]
        | url -> SubHeading $"Page '{url}' does not exist"
