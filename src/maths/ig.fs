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

        | "geometry"::[] -> Geometry.view ""
        | "geometry"::(Route.Query [ "tab", tab ])::[] -> Geometry.view tab

        | "probstat"::[] -> ProbAndStats.view ()

        | [] ->
            Html.div [
                prop.className "prose prose-lg p-16"
                prop.children [
                    Heading "Outline"

                    Link "Numbers"  (Router.format ("ig", "numbers"))
                    let subUrl (url: string) =
                        Router.format ("ig", "numbers", [ "tab", url ])
                    LinkList (Numbers.tabs |> List.map (fun tab -> fst tab, subUrl (fst tab)))

                    Link "Algebra and Graphs" (Router.format ("ig", "algebra"))
                    LinkList
                        [  ]

                    Link "Geometry"  (Router.format ("ig", "geometry"))
                    let subUrl (url: string) =
                        Router.format ("ig", "geometry", [ "tab", url ])
                    LinkList (Geometry.tabs |> List.map (fun tab -> fst tab, subUrl (fst tab)))

                    Link "Mensuration"  (Router.format ("ig", "mensuration"))
                    LinkList
                        [  ]

                    Link "Coordinate Geometry"  (Router.format ("ig", "coordinates"))
                    LinkList
                        [  ]

                    Link "Trigonometry"  (Router.format ("ig", "trigonometry"))
                    LinkList
                        [  ]

                    Link "Matrices and Transformations"  (Router.format ("ig", "matrices"))
                    LinkList
                        [  ]

                    Link "Probability"  (Router.format ("ig", "probability"))
                    LinkList
                        [  ]

                    Link "Statistics" (Router.format ("ig", "statistics"))
                    LinkList
                        [  ]
                ]
            ]
        | url -> SubHeading $"Page '{url}' does not exist"
