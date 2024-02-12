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

        | "mensuration"::[] -> Mensuration.view ""
        | "mensuration"::(Route.Query [ "tab", tab ])::[] -> Mensuration.view tab

        | "trigonometry"::[] -> Trigonometry.view ""
        | "trigonometry"::(Route.Query [ "tab", tab ])::[] -> Trigonometry.view tab

        | "transforms"::[] -> Transforms.view ""
        | "transforms"::(Route.Query [ "tab", tab ])::[] -> Transforms.view tab

        | "probability"::[] -> Probability.view ""
        | "probability"::(Route.Query [ "tab", tab ])::[] -> Probability.view tab

        | "statistics"::[] -> Statistics.view ""
        | "statistics"::(Route.Query [ "tab", tab ])::[] -> Statistics.view tab

        | [] ->
            let subUrl (section: string) (url: string) =
                Router.format ("ig", section, [ "tab", url ])
            Html.div [
                prop.className "prose prose-lg p-16"
                prop.children [
                    Heading "Outline"

                    Link "Numbers"  (Router.format ("ig", "numbers"))
                    LinkList (Numbers.tabs |> List.map (fun tab -> fst tab, subUrl "numbers" (fst tab)))

                    Link "Algebra and Graphs" (Router.format ("ig", "algebra"))
                    LinkList
                        [  ]

                    Link "Geometry"  (Router.format ("ig", "geometry"))
                    LinkList (Geometry.tabs |> List.map (fun tab -> fst tab, subUrl "geometry" (fst tab)))

                    Link "Mensuration"  (Router.format ("ig", "mensuration"))
                    LinkList (Mensuration.tabs |> List.map (fun tab -> fst tab, subUrl "mensuration" (fst tab)))

                    Link "Trigonometry"  (Router.format ("ig", "trigonometry"))
                    LinkList (Trigonometry.tabs |> List.map (fun tab -> fst tab, subUrl "trigonometry" (fst tab)))

                    Link "Vectors and Transformations"  (Router.format ("ig", "transforms"))
                    LinkList (Transforms.tabs |> List.map (fun tab -> fst tab, subUrl "transforms" (fst tab)))

                    Link "Probability"  (Router.format ("ig", "probability"))
                    LinkList (Probability.tabs |> List.map (fun tab -> fst tab, subUrl "probability" (fst tab)))

                    Link "Statistics"  (Router.format ("ig", "statistics"))
                    LinkList (Statistics.tabs |> List.map (fun tab -> fst tab, subUrl "statistics" (fst tab)))
                ]
            ]
        | url -> SubHeading $"Page '{url}' does not exist"
