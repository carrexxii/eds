namespace EDS.Maths

open Fable.Core.JsInterop
open Feliz
open Feliz.Mafs

open EDS.Shared.Components

type Set =
    | Naturals
    | Integers
    | Rationals
    | Irrationals
    | Reals
    | Complex

module IG =
    [<ReactComponent>]
    let view () =
        Html.div [
            let min = -50
            let max = 50
            let lower, setLower = React.useState 0.0
            let upper, setUpper = React.useState 5.0
            let lowerInc, setLowerInc = React.useState true
            let upperInc, setUpperInc = React.useState true
            let points = (
                { (if lowerInc then lower else lower - 1.0)
                ..(if upperInc then upper else upper - 1.0) }
                |> Seq.map (fun x ->
                    Point.create (vec x 0)
                    |> Point.render))

            Mafs { MafsProps.Default with
                     height = 200
                     zoom   = !^{| min = 0.5; max = 7.5 |} } ([
                Cartesian { CartesianProps.Default with
                              yAxis = !^false }

                Latex.create
                    $$"""\Large{ {{if lowerInc then "[" else "("}}
                                    {{lower}}, {{upper}}
                                 {{if upperInc then "]" else ")"}} }"""
                |> Latex.pos (vec 0 1.1)
                |> Latex.render
            ]@(List.ofSeq points))

            Html.div [
                prop.className "flex flex-row justify-center m-2"
                prop.children [
                    Html.div [
                        prop.className "px-2 border-r-2"
                        prop.children [
                            NumberInput min max lower (fun v -> setLower v) "Lower Limit"
                            Slider min max lower (fun v -> setLower v) false
                            Checkbox "Inclusive" lowerInc (fun v -> setLowerInc v)
                        ]
                    ]
                    Html.div [
                        prop.className "px-2 border-l-2"
                        prop.children [
                            NumberInput min max upper (fun v -> setUpper v) "Upper Limit"
                            Slider min max upper (fun v -> setUpper v) false
                            Checkbox "Inclusive" upperInc (fun v -> setUpperInc v)
                        ]
                    ]
                ]
            ]
        ]
