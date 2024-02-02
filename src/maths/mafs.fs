namespace EDS.Maths

open Fable.Core.JsInterop
open Feliz
open Feliz.Mafs
open Feliz.Mafs.Plot
open Feliz.Mafs.Geometry.Vector

open EDS.Shared.Components

module Mafs =
    [<ReactComponent>]
    let view () =
        Html.div [
            Mafs { MafsProps.Default with
                    zoom = !^{| min = 0.1; max = 1.0 |} } [
                CartesianDefault

                Plot.create <| fun x -> sin x
                |> Plot.color Theme.blue
                |> Plot.render XAxis
            ]

            // https://mafs.dev/guides/display/vectors
            SubHeading "Examples Showing Vectors"

            let head = movablePoint (vec 0 0) Theme.foreground None
            let v = Vec2 head.point
            let angle = Radians (atan2 v.y v.x)
            let u = v + (v.rotate angle)
            let w = v + (u.rotate (-2.0 * angle))
            Mafs MafsProps.Default [
                CartesianDefault

                create v |> color Theme.blue            |> render
                create u |> color Theme.red   |> tail v |> render
                create w |> color Theme.green |> tail u |> render

                head.element
            ]

            // https://mafs.dev/guides/examples/fancy-parabola
            SubHeading "Examples Showing Movable Points with Constrains"

            let tp    = movablePoint (vec 0 -2) Theme.blue Vertical
            let xInt1 = movablePoint (vec -2 0) Theme.red  Horizontal
            let xInt2 = movablePoint (vec  2 0) Theme.red  Horizontal

            let mid = (xInt1.x + xInt2.x) / 2.0
            let fn x = (x - xInt1.x) * (x - xInt2.x)
            Mafs MafsProps.Default [
                CartesianDefault

                Plot.create <| fun x -> tp.point[1] * fn x / fn mid
                |> Plot.render XAxis

                Text.point 2 xInt1.point xInt1.point |> Text.render
                Text.point 2 xInt2.point xInt2.point |> Text.render
                let tpText = Text.point 2 tp.point tp.point |> Text.render

                xInt1.element
                xInt2.element
                translate (vec mid 0) [
                    tp.element
                    tpText
                ]
            ]
            Html.div [
                prop.className "flex justify-center"
                prop.children [
                    Button "Reset" (fun e ->
                        tp.setPoint    [|  0; -2|]
                        xInt1.setPoint [| -2;  0|]
                        xInt2.setPoint [|  2;  0|])
                ]
            ]

            // https://mafs.dev/guides/display/plots#:~:text=solid-,Vector%20fields,-Vector%20fields%20take
            SubHeading "Vector Fields"

            let point = movablePoint (vec 0.5 1) Theme.indigo None
            Mafs { MafsProps.Default with
                     zoom = !^{| min = 0.1; max = 1.0 |} } [
                CartesianDefault

                VectorField.create <| fun p -> vec ( p.y - point.y - p.x + point.x)
                                                   (-p.x + point.x - p.y + point.y)
                |> VectorField.step 0.5
                |> VectorField.opacity (fun p -> (abs p.x + abs p.y) / 10.0)
                |> VectorField.opacityStep 0.1
                |> VectorField.render

                point.element
            ]
        ]
