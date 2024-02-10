namespace EDS.Maths.IG

open System

open Feliz
open Feliz.Mafs

open EDS.Shared.Components

module Trigonometry =
    [<ReactComponent>]
    let PythagoreanProof () =
        Html.div [
            Article [
                SmallHeading "Pythagorean Proof"
                Katex "\\implies c^2 = a^2 + b^2 \\\\"
                Html.p """If you look at the equation, you see that each of side of the triangle is squared.
                If we physically square them (to get a square shape) you can see that the areas
                of the two squares formed by the legs (b and c) add up to the area of the square
                formed from the hypotenuse (c)"""
                Html.br []
            ]
            let corner = vec 2 -2
            let xPoint = movablePoint (vec -1 -2) Theme.blue (Some
                (Constrain <| fun p -> vec (if p.x > corner.x then corner.x else p.x) corner.y))
            let yPoint = movablePoint (vec 2 1) Theme.red (Some
                (Constrain <| fun p -> vec corner.x (if p.y < corner.y then corner.y else p.y)))
            let rectData =
                [ xPoint.pos, yPoint.pos, Theme.indigo, xPoint.pos.dist yPoint.pos
                  corner    , xPoint.pos, Theme.red   , corner.x - xPoint.x
                  corner    , yPoint.pos, Theme.blue  , corner.y - yPoint.y ]
            let extend p1 p2 dist =
                p1 - p2
                |> fun (p: Vec2) -> vec p.y -p.x
                |> _.normal
                |> ( * ) dist
            Mafs.create ()
            |> Mafs.width  400
            |> Mafs.height 400
            |> Mafs.viewBox {| x = vec -5 5
                               y = vec -5 5
                               padding = 1.0 |}
            |> Mafs.zoom 0.5 1.0
            |> Mafs.render (
                (rectData
                |> List.map (fun (p1, p2, color, len) ->
                    let outer = extend p1 p2 len
                    Polygon.create [ p2; p1; p1 + outer; p2 + outer ]
                    |> Polygon.color color
                    |> Polygon.opacity 0.2
                    |> Polygon.render true)
                )@(
                    rectData
                    |> List.map (fun (p1, p2, _, len) ->
                        let outer = extend p1 p2 len
                        let center = p1.midpoint p2 + outer/2.0
                        Text.create $"%.1f{len*len}"
                        |> Text.pos center
                        |> Text.render)
                )@[
                    Polygon.create [ corner; xPoint.pos; yPoint.pos ]
                    |> Polygon.color Theme.green
                    |> Polygon.opacity 0.4
                    |> Polygon.render true

                    xPoint.element
                    yPoint.element
                ]
            )
        ]

// Core
    // 1 Interpret and use three-figure bearings
        // Measured clockwise from the North, i.e. 000°–360°.
    // 2 Apply Pythagoras’ theorem and the sine, cosine
    // and tangent ratios for acute angles to the
    // calculation of a side or of an angle of a right-angled triangle.
        // Angles will be quoted in degrees. Answers should
        // be written in degrees and decimals to one
        // decimal place.
// Extended
    // 2 Solve trigonometric problems in two dimensions
    // involving angles of elevation and depression.
    // Know that the perpendicular distance from a
    // point to a line is the shortest distance to the line
    // 3 Recognise, sketch and interpret graphs of simple
    // trigonometric functions.
    // Graph and know the properties of trigonometric
    // functions.
    // Solve simple trigonometric equations for values
    // between 0° and 360°.
        // e.g. sin x = sqrt(3)/2 for values of x between 0° and 360°.
    // 4 Solve problems using the sine and cosine rules
    // for any triangle and the formula
    // area of triangle = 2
    // 1 ab sin C.
        // Includes problems involving obtuse angles.
    // 5 Solve simple trigonometrical problems in three
    // dimensions including angle between a line and a
    // plane.

    [<ReactComponent>]
    let Bearings () =
        Html.div [
            prop.className "mx-16"
            prop.children [
                let facing = movablePoint (vec 0 1) Theme.indigo None
                let target = movablePoint (vec 2 2) Theme.red    None
                Mafs.create ()
                |> Mafs.height 600
                |> Mafs.render [
                    Polar.create () |> Polar.render

                    Vector.create facing.pos |> Vector.render
                    Vector.create target.pos |> Vector.render

                    Arc.create (vec 0 0)
                    |> Arc.targets (target.pos, facing.pos)
                    |> Arc.color Theme.orange
                    |> Arc.render

                    facing.element
                    target.element
                ]
            ]
        ]

    [<ReactComponent>]
    let Trigonometry () =
        Html.div [
            prop.className "flex flex-col mx-16"
            prop.children [
                Html.div [
                    prop.className "flex flex-row gap-8 float-right"
                    prop.children [
                        Article [
                            Heading "Trigonometry"
                            Html.p """Trigonometry is maths dealing with right triangles. The first part which you will
                                       be familiar with is the Pythagorean theorem: """
                            Katex "\\\\ \\qquad c^2 = a^2 + b^2\\\\"
                            Html.p """ where c is the length of the hypotenuse and a and b are the lengths of its two legs."""
                            Popup "Pythagorean Theorem" Full (PythagoreanProof ())
                        ]

                        let corner = vec -2 -2
                        let xPoint = movablePoint (vec 1 -2) Theme.blue (Some
                            (Constrain <| fun p -> vec (if p.x < corner.x then corner.x else p.x) corner.y))
                        let yPoint = movablePoint (vec -2 1) Theme.red (Some
                            (Constrain <| fun p -> vec corner.x (if p.y < corner.y then corner.y else p.y)))
                        let centroid = (corner + xPoint.pos + yPoint.pos) / 3.0
                        Mafs.create ()
                        |> Mafs.width 500
                        |> Mafs.render ([
                            Polygon.create [ corner; xPoint.pos; yPoint.pos ]
                            |> Polygon.color Theme.green
                            |> Polygon.opacity 0.3
                            |> Polygon.render true

                            xPoint.element
                            Arc.create xPoint.pos
                            |> Arc.targets (corner - xPoint.pos, yPoint.pos - xPoint.pos)
                            |> Arc.color Theme.blue
                            |> Arc.render
                            Latex.create $"\\tiny
                                %.1f{ Math.Atan2 ((yPoint.pos - xPoint.pos).y,
                                                  (corner     - xPoint.pos).x)
                                    |> (+) (-Math.PI)
                                    |> abs
                                    |> Radians
                                    |> Angle.toDeg}"
                            |> Latex.pos (xPoint.pos - 0.8*(xPoint.pos - centroid).normal)
                            |> Latex.render

                            yPoint.element
                            Arc.create yPoint.pos
                            |> Arc.targets (corner - yPoint.pos, xPoint.pos - yPoint.pos)
                            |> Arc.color Theme.red
                            |> Arc.render
                            Latex.create $"\\tiny
                                %.1f{ Math.Atan2 ((corner     - yPoint.pos).y,
                                                  (xPoint.pos - yPoint.pos).x)
                                    |> (+) (Math.PI/2.00)
                                    |> abs
                                    |> Radians
                                    |> Angle.toDeg}"
                            |> Latex.pos (yPoint.pos - 0.8*(yPoint.pos - centroid).normal)
                            |> Latex.render
                        ])
                    ]
                ]

                Html.div [
                    prop.className "flex flex-col"
                    prop.children [
                        Article [
                            SubHeading "The Pythagorean Theorem"
                        ]
                    ]
                ]
            ]
        ]

    let FurtherTrigonometry () =
        Html.div [

        ]

    let tabs =
        [ "Bearings"            , Bearings ()
          "Trigonometry"        , Trigonometry ()
          "Further Trigonometry", FurtherTrigonometry () ]
    let view tab =
        Tabbed tab tabs
