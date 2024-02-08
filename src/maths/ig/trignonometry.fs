namespace EDS.Maths.IG

open System

open Feliz
open Feliz.Mafs

open EDS.Shared.Components

module Trigonometry =
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
                let facing = movablePoint (vec 0 1.0) Theme.indigo None
                let target = movablePoint (vec 2 2) Theme.red    None
                Mafs { MafsProps.Default
                         with height = 600 } [
                    PolarDefault

                    Vector.create (Vec2 facing.point) |> Vector.render
                    Vector.create (Vec2 target.point) |> Vector.render

                    let startAngle = Vec2 target.point |> fun p -> -Math.Atan2 (-p.x, -p.y) + Math.PI + Math.PI/2.0
                    let endAngle   = Vec2 facing.point |> fun p -> -Math.Atan2 (-p.x, -p.y) + Math.PI + Math.PI/2.0
                    Parametric.create <| fun t -> vec (0.35*cos t) (0.35*sin t)
                    |> Parametric.color Theme.orange
                    |> Parametric.render (vec startAngle endAngle)

                    facing.element
                    target.element
                ]
            ]
        ]

    let Trigonometry () =
        Html.div [

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
