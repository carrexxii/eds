namespace Maths

open Fable.Core.JsInterop
open Feliz
open Feliz.Mafs
open Feliz.Mafs.Geometry.Vector

open Shared.Components

module MafsExamples =
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

            Html.br []
            SubHeading "Examples showing vectors"

            // https://mafs.dev/guides/display/vectors
            let head = movablePoint [| 0.0; 0.0 |]
            let v = Vec2 head.point
            let angle = Radians (atan2 v.y v.x)
            let u = v + (v.rotate angle)
            let w = v + (u.rotate (-2.0 * angle))
            Mafs MafsProps.Default [
                CartesianDefault

                create v |> setColor Theme.blue               |> render
                create v |> setColor Theme.red   |> setTail u |> render
                create u |> setColor Theme.green |> setTail w |> render

                head.element
            ]
        ]
