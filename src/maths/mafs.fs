namespace EDS.Maths

open Fable.Core.JsInterop
open Feliz
open Feliz.Mafs
open Feliz.Mafs.Plot
open Feliz.Mafs.Geometry

open EDS.Shared.Components

module Mafs =
    [<ReactComponent>]
    let view () =
        Html.div [
            // https://mafs.dev/guides/display/vectors
            SubHeading "Examples Showing Vectors"

            let head = movablePoint (vec 0 0) Theme.foreground None
            let angle = Radians (atan2 head.y head.x)
            let v = head.pos
            let u = v + (v.rotate angle)
            let w = v + (u.rotate (-2.0 * angle))
            Mafs.create () |> Mafs.render [
                Cartesian.create() |> Cartesian.render

                Vector.create v |> Vector.color Theme.blue                   |> Vector.render
                Vector.create u |> Vector.color Theme.red   |> Vector.tail v |> Vector.render
                Vector.create w |> Vector.color Theme.green |> Vector.tail u |> Vector.render

                head.element
            ]

            // https://mafs.dev/guides/examples/fancy-parabola
            SubHeading "Examples Showing Movable Points with Constrains"

            let tp    = movablePoint (vec 0 -2) Theme.blue (Some Vertical)
            let xInt1 = movablePoint (vec -2 0) Theme.red  (Some Horizontal)
            let xInt2 = movablePoint (vec  2 0) Theme.red  (Some Horizontal)

            let mid = (xInt1.x + xInt2.x) / 2.0
            let fn x = (x - xInt1.x) * (x - xInt2.x)
            Mafs.create () |> Mafs.render [
                Cartesian.create () |> Cartesian.render

                Plot.create <| fun x -> tp.y * fn x / fn mid
                |> Plot.render XAxis

                Text.point 2 xInt1.pos xInt1.pos |> Text.render
                Text.point 2 xInt2.pos xInt2.pos |> Text.render
                let tpText = Text.point 2 tp.pos tp.pos |> Text.render

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
                        tp.setPoint    (vec  0 -2)
                        xInt1.setPoint (vec -2  0)
                        xInt2.setPoint (vec  2  0))
                ]
            ]

            // https://mafs.dev/guides/display/plots#:~:text=solid-,Vector%20fields,-Vector%20fields%20take
            SubHeading "Vector Fields"

            let point = movablePoint (vec 0.5 1) Theme.indigo None
            Mafs.create ()
            |> Mafs.zoom 0.1 1.0
            |> Mafs.render [
                Cartesian.create () |> Cartesian.render

                VectorField.create <| fun p -> vec ( p.y - point.y - p.x + point.x)
                                                   (-p.x + point.x - p.y + point.y)
                |> VectorField.step 0.5
                |> VectorField.opacity (fun p -> (abs p.x + abs p.y) / 10.0)
                |> VectorField.opacityStep 0.1
                |> VectorField.render

                point.element
            ]

            // https://mafs.dev/guides/examples/riemann-sums
            SubHeading "Riemann Sums"

            let minPartitions = 1
            let maxPartitions = 250
            let partitions, setPartitions = React.useState 100

            let lift  = movablePoint (vec  0 1) Theme.indigo (Some Vertical)
            let slide = movablePoint (vec  1 0) Theme.indigo (Some Horizontal)
            let start = movablePoint (vec -2 0) Theme.orange (Some Horizontal)
            let stop  = movablePoint (vec  2 0) Theme.orange (Some Horizontal)

            let fns = [
                fun x -> sin (3.0*x) - x**2.0 / 20.0 + lift.y
                fun x -> lift.y + sin x
                fun x -> lift.y + sinh x
                fun x -> lift.y + cosh x
            ]

            let fn, setFn = React.useState 0
            let dx = (stop.x - start.x) / float partitions
            let area = ref 0.0
            Mafs.create ()
            |> Mafs.viewBox {| x = vec -1 12
                               y = vec -3 10
                               padding = 2.0 |}
            |> Mafs.zoom 0.3 2.0
            |> Mafs.render ([
                Cartesian.create ()
                |> Cartesian.subDiv 0
                |> Cartesian.render

                Plot.create (fun x -> fns[fn] (x - slide.x))
                |> Plot.color Theme.blue
                |> Plot.render XAxis
            ]@( Seq.map (fun x ->
                    let x = start.x + dx*(x - 1.0)
                    let y = fns[fn] <| (x - slide.x) + dx/2.0
                    area.Value <- area.Value + dx*y
                    Polygon.create [ vec x        0
                                     vec (x + dx) 0
                                     vec (x + dx) y
                                     vec x        y ]
                    |> Polygon.color (if y >= 0 then Theme.green else Theme.red)
                    |> Polygon.weight 1.0
                    |> Polygon.opacity 0.3
                    |> Polygon.render true
                ) { 1..partitions }
                |> List.ofSeq
            )@[ Text.create $"Area: %.5f{area.Value}"
                |> Text.pos (vec 3 3)
                |> Text.render

                lift.element
                slide.element
                start.element
                stop.element ])

            Slider "" minPartitions maxPartitions 1.0 partitions (fun v -> setPartitions (int v)) true
            RadioList "Functions" 0
                [ "Wave", fun e -> if e then setFn 0
                  "Sine", fun e -> if e then setFn 1
                  "Sinh", fun e -> if e then setFn 2
                  "Cosh", fun e -> if e then setFn 3 ]
        ]
