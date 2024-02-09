namespace EDS.Maths.IG

open System

open Fable.Core.JsInterop
open Feliz
open Feliz.Mafs

open EDS.Shared
open EDS.Shared.Components

module Geometry =
    let triangleVectors (p1: Vec2) (p2: Vec2) (p3: Vec2) =
        let v1 = p1 - p2
        let v2 = p2 - p3
        let v3 = p3 - p1
        [ v1, v2; v2, v3; v3, v1 ]

    let isRightTriangle (p1: Vec2) (p2: Vec2) (p3: Vec2) =
        triangleVectors p1 p2 p3
        |> List.fold (fun acc (p1, p2) ->
            if Math.Round (p1 * p2, 1) = 0.0
            then acc + 1
            else acc) 0
        |> (<) 0

    let isObtuseTriangle (p1: Vec2) (p2: Vec2) (p3: Vec2) =
        triangleVectors p1 p2 p3
        |> List.fold (fun acc (p1, p2) -> acc * (p1 * p2)) 1.0
        |> (<) 0

    let triangleName (p1: Vec2) (p2: Vec2) (p3: Vec2) =
        let l1 = Math.Round (p1.dist p2, 1)
        let l2 = Math.Round (p2.dist p3, 1)
        let l3 = Math.Round (p3.dist p1, 1)
        let eqCount = List.fold (fun acc eq -> if eq then acc + 1 else acc) 0 [ l1 = l2; l2 = l3; l3 = l1 ]

        let prefix = if   isRightTriangle  p1 p2 p3 then "Right "
                     elif isObtuseTriangle p1 p2 p3 then "Obtuse "
                     else "Acute "
        prefix + match eqCount with
                 | 0 -> "Scalene"
                 | 1 -> "Isosceles"
                 | 3 -> "Equilateral"
                 | _ -> "Unknown"

    let quadAngles (p1: Vec2) (p2: Vec2) (p3: Vec2) (p4: Vec2) =
        [ p1 - p2, p1 - p4
          p2 - p1, p2 - p3
          p3 - p2, p3 - p4
          p4 - p3, p4 - p1 ]
        |> List.map (fun (p1, p2) -> Radians <| Math.Acos ((p1*p2) / (p1.mag*p2.mag)))

    let quadName (p1: Vec2) (p2: Vec2) (p3: Vec2) (p4: Vec2) =
        let s1 = Math.Round (p1.dist p2, 1)
        let s2 = Math.Round (p2.dist p3, 1)
        let s3 = Math.Round (p3.dist p4, 1)
        let s4 = Math.Round (p4.dist p1, 1)
        match quadAngles p1 p2 p3 p4 with
        | a::b::c::d::[] ->
            if a = b && b = c && c = d then
                if s1 = s2 && s2 = s3 && s3 = s4
                    then "Square"
                    else "Rectangle"
            elif a = c && b = d then
                if s1 = s2 && s2 = s3 && s3 = s4
                    then "Rhombus"
                    else "Parallelogram"
            elif (a = d && b = c) || (a = b && c = d) then "Trapezium"
            elif (s1 = s2 && s3 = s4) || (s2 = s3 && s4 = s1) then "Kite"
            else "Quadrilateral"
        | _ -> failwith "Error in data from `quadAngles`"

    let quadIsConvex (p1: Vec2) (p2: Vec2) (p3: Vec2) (p4: Vec2) =
        let cross (p1: Vec2) (p2: Vec2) (p3: Vec2) =
            (p2.x - p1.x) * (p3.y - p2.y) - (p2.y - p1.y) * (p3.x - p2.x)
        cross p1 p2 p3 < 0 &&
        cross p2 p3 p4 < 0 &&
        cross p3 p4 p1 < 0 &&
        cross p4 p1 p2 < 0

    [<ReactComponent>]
    let Constructions () =
        Html.div [
            prop.className "flex flex-col gap-12"
            prop.children [
                Html.div [
                    prop.className "flex flex-row"
                    prop.children [
                        let shouldSnap, setShouldSnap = React.useState true
                        let showPoints, setShowPoints = React.useState false
                        let showAngles, setShowAngles = React.useState false

                        let snap (pt: Vec2) =
                            if shouldSnap
                            then vec (Math.Round pt.x) (Math.Round pt.y)
                            else vec (Math.Round (pt.x, 1)) (Math.Round (pt.y, 1))
                        let p1 = movablePoint (vec -1 -1) Theme.green (Some <| Constrain snap)
                        let p2 = movablePoint (vec  1 -1) Theme.green (Some <| Constrain snap)
                        let p3 = movablePoint (vec  0  1) Theme.green (Some <| Constrain snap)
                        Mafs.create ()
                        |> Mafs.width 500
                        |> Mafs.pan false
                        |> Mafs.zoom 0.5 2.0
                        |> Mafs.viewBox {| x = vec -5 5
                                           y = vec -5 5
                                           padding = 0.5 |}
                        |> Mafs.render ([
                            Cartesian.create () |> Cartesian.render
                            Polygon.create [ p1.pos; p2.pos; p3.pos ]
                            |> Polygon.opacity 0.3
                            |> Polygon.color Theme.green
                            |> Polygon.render true

                            p1.element
                            p2.element
                            p3.element
                        ]@ (let points = [ p1.pos; p2.pos; p3.pos ]
                            if showPoints then points else []
                            |> List.map (fun p ->
                                let isHighest (p: Vec2) =
                                    points
                                    |> List.fold (fun acc p2 ->
                                        if p.y > p2.y && p.y > p2.y
                                        then acc + 1
                                        else acc) 0
                                    |> (<) 1
                                Text.create $"(%.1f{p.x}, %.1f{p.y})"
                                |> Text.pos p
                                |> Text.attach (if isHighest p then North else South) -12.0
                                |> Text.size 16
                                |> Text.render))
                        @ (if showAngles then
                                let centroid = vec ((p1.x + p2.x + p3.x) / 3.0) ((p1.y + p2.y + p3.y) / 3.0)
                                [ p1.pos - p2.pos, p1.pos - p3.pos
                                  p2.pos - p1.pos, p2.pos - p3.pos
                                  p3.pos - p1.pos, p3.pos - p2.pos ]
                                |> List.map (fun (p1, p2) -> Radians <| Math.Acos ((p1*p2) / (p1.mag*p2.mag)))
                                |> List.map2 (fun p a ->
                                    let cv = centroid - p
                                    Latex.create $"\\tiny %.1f{Angle.toDeg a}\\degree"
                                    |> Latex.pos (p + 0.3*cv)
                                    |> Latex.render)
                                    [ p1.pos; p2.pos; p3.pos ]
                            else []))

                        Html.div [
                            prop.className "p-4"
                            prop.children [
                                let name = triangleName p1.pos p2.pos p3.pos
                                SubHeading $"""This is {aOrAn name} {name} triangle"""
                                Html.div [
                                    prop.className "flex flex-row gap-4"
                                    prop.children [
                                        CheckList "Options"
                                            [ "Snap"       , shouldSnap, (fun e -> setShouldSnap (not shouldSnap))
                                              "Show Points", showPoints, (fun e -> setShowPoints (not showPoints))
                                              "Show Angles", showAngles, (fun e -> setShowAngles (not showAngles)) ]
                                        RadioList "Basic Triangle Types" -1
                                            [ "Equilateral", fun e -> p1.setPoint (vec -2 0    )
                                                                      p2.setPoint (vec  0 3.464)
                                                                      p3.setPoint (vec  2 0    )
                                              "Isosceles", fun e -> p1.setPoint (vec  0 -2)
                                                                    p2.setPoint (vec  2  0)
                                                                    p3.setPoint (vec -2  2)
                                              "Scalene", fun e -> p1.setPoint (vec -3 -1)
                                                                  p2.setPoint (vec  4 -1)
                                                                  p3.setPoint (vec -2  3)
                                              "Right", fun e -> p1.setPoint (vec  4  3)
                                                                p2.setPoint (vec  4 -3)
                                                                p3.setPoint (vec -2  3) ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]

                Html.div [
                    prop.className "flex flex-row-reverse gap-8 ml-auto"
                    prop.children [
                        let shouldSnap, setShouldSnap = React.useState true
                        let showPoints, setShowPoints = React.useState false
                        let showAngles, setShowAngles = React.useState false

                        let snap (pt: Vec2) =
                            if shouldSnap
                            then vec (Math.Round pt.x) (Math.Round pt.y)
                            else vec (Math.Round (pt.x, 1)) (Math.Round (pt.y, 1))
                        let p1 = movablePoint (vec -1 -1) Theme.green (Some <| Constrain snap)
                        let p2 = movablePoint (vec -1  1) Theme.green (Some <| Constrain snap)
                        let p3 = movablePoint (vec  1  1) Theme.green (Some <| Constrain snap)
                        let p4 = movablePoint (vec  1 -1) Theme.green (Some <| Constrain snap)
                        let isConvex = quadIsConvex p1.pos p2.pos p3.pos p4.pos
                        Mafs.create ()
                        |> Mafs.width 500
                        |> Mafs.pan false
                        |> Mafs.zoom 0.5 2.0
                        |> Mafs.viewBox {| x = vec -5 5
                                           y = vec -5 5
                                           padding = 0.5 |}
                        |> Mafs.render ([
                            Cartesian.create () |> Cartesian.render
                            Polygon.create [ p1.pos; p2.pos; p3.pos; p4.pos ]
                            |> Polygon.opacity 0.3
                            |> Polygon.color (if isConvex then Theme.green else Theme.red)
                            |> Polygon.render true

                            p1.element
                            p2.element
                            p3.element
                            p4.element
                        ]@ (let points = [ p1.pos; p2.pos; p3.pos; p4.pos ]
                            if showPoints then points else []
                            |> List.map (fun p ->
                                let isHighest (p: Vec2) =
                                    points
                                    |> List.fold (fun acc p2 ->
                                        if p.y > p2.y && p.y > p2.y
                                        then acc + 1
                                        else acc) 0
                                    |> (<) 1
                                Text.create $"(%.1f{p.x}, %.1f{p.y})"
                                |> Text.pos p
                                |> Text.attach (if isHighest p then North else South) -12.0
                                |> Text.size 16
                                |> Text.render))
                        @ (if showAngles then
                                let centroid = vec ((p1.x + p2.x + p3.x + p4.x) / 4.0) ((p1.y + p2.y + p3.y + p4.y) / 4.0)
                                quadAngles p1.pos p2.pos p3.pos p4.pos
                                |> List.map2 (fun p a ->
                                    let cv = centroid - p
                                    Latex.create $"\\tiny %.1f{Angle.toDeg a}\\degree"
                                    |> Latex.pos (p + 0.3*cv)
                                    |> Latex.render)
                                    [ p1.pos; p2.pos; p3.pos; p4.pos ]
                            else []))

                        Html.div [
                            prop.className "p-4"
                            prop.children [
                                if isConvex
                                then SubHeading $"This is a {quadName p1.pos p2.pos p3.pos p4.pos}"
                                else SubHeading $"Not convex/has crossed points"
                                Html.div [
                                    prop.className "flex flex-row gap-4"
                                    prop.children [
                                        CheckList "Options"
                                            [ "Snap"       , shouldSnap, (fun e -> setShouldSnap (not shouldSnap))
                                              "Show Points", showPoints, (fun e -> setShowPoints (not showPoints))
                                              "Show Angles", showAngles, (fun e -> setShowAngles (not showAngles)) ]
                                        RadioList "Basic Quadrilateral Types" -1
                                            [ "Square", fun e -> p1.setPoint (vec -2 -2)
                                                                 p2.setPoint (vec -2  2)
                                                                 p3.setPoint (vec  2  2)
                                                                 p4.setPoint (vec  2 -2)
                                              "Rectangle", fun e -> p1.setPoint (vec -2.5 -1.5)
                                                                    p2.setPoint (vec -2.5  1.5)
                                                                    p3.setPoint (vec  2.5  1.5)
                                                                    p4.setPoint (vec  2.5 -1.5)
                                              "Rhombus", fun e -> p1.setPoint (vec -3 -1)
                                                                  p2.setPoint (vec -2  2)
                                                                  p3.setPoint (vec  1  3)
                                                                  p4.setPoint (vec  0  0)
                                              "Parallelogram", fun e -> p1.setPoint (vec -4 -3)
                                                                        p2.setPoint (vec  0  3)
                                                                        p3.setPoint (vec  4  3)
                                                                        p4.setPoint (vec  0 -3)
                                              "Trapezium", fun e -> p1.setPoint (vec -3 -2)
                                                                    p2.setPoint (vec -1  2)
                                                                    p3.setPoint (vec  1  2)
                                                                    p4.setPoint (vec  3 -2)
                                              "Kite", fun e -> p1.setPoint (vec -3.0  0.0)
                                                               p2.setPoint (vec -0.9  1.3)
                                                               p3.setPoint (vec  4.0  0.0)
                                                               p4.setPoint (vec -0.9 -1.3) ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]

    let Similarity () =
        Html.div [

        ]

    let Symmetry () =
        Html.div [

        ]

    let Angles () =
        Html.div [

        ]

    type LociExamples =
        | LociCircle
        | LociLine
    [<ReactComponent>]
    let Loci () =
        Html.div [
            Html.div [
                prop.className "flex flex-row-reverse"
                prop.children [
                    let xRange = vec -5 5
                    let yRange = vec -5 5
                    let points =
                        [ movablePoint (vec -3  1) Theme.green None
                          movablePoint (vec  3 -3) Theme.green None
                          movablePoint (vec  2  3) Theme.green None ]
                    let pointCount, setPointCount = React.useState 2
                    let lociCount , setLociCount  = React.useState 10
                    let selection , setSelection  = React.useState LociCircle
                    let len       , setLen        = React.useState 5.0

                    Mafs.create ()
                    |> Mafs.preserveAR true
                    |> Mafs.pan false
                    |> Mafs.viewBox {| x = xRange
                                       y = yRange
                                       padding = 0 |}
                    |> Mafs.render ((
                        points
                        |> List.take pointCount
                        |> List.map (fun p -> p.element)
                    )@([ 0..lociCount ]
                        |> List.map (
                            match selection with
                            | LociCircle -> (fun t ->
                                let center = points[0].pos
                                let angle  = 2.0*Math.PI * ((float t) / (float lociCount))
                                let p = vec (center.x + len * Math.Cos angle) (center.y + len * Math.Sin angle)
                                Point.create p
                                |> Point.render)
                            | LociLine -> (fun t ->
                                let mid = points[0].pos.midpoint points[1].pos
                                let m = (vec (points[1].y - points[0].y) -(points[1].x - points[0].x)).normal
                                let p1 = mid - len*m
                                let p2 = mid + len*m
                                Point.create (p1.lerp p2 ((float t) / (float lociCount)))
                                |> Point.render)
                            | _ -> (fun t -> Point.create (vec 0 0) |> Point.render))
                    ))

                    Article [
                        Heading "Loci"
                        Section """Loci are a set of points.Loci are a set of pointsLoci are a set of pointsLoci are a set of pointsLoci are a set of pointsLoci are a set of points"""
                        RadioList "Examples" 0
                            [ "Circle Around a Point", fun e -> if e then
                                                                    setSelection LociCircle
                                                                    setPointCount 1
                              "Closest to Two Points", fun e -> if e then
                                                                    setSelection LociLine
                                                                    setPointCount 2 ]

                        SubHeading "Number of Loci: "
                        Slider 2 200 1 lociCount (fun v -> setLociCount (int v)) true
                        Slider 1 10 0.1 len (fun v -> setLen v) true
                    ]
                ]
            ]
        ]

    let tabs =
        [ "Constructions"   , Constructions ()
          "Similarity"      , Similarity ()
          "Symmetry"        , Symmetry ()
          "Angle Properties", Angles ()
          "Loci"            , Loci () ]

    let view tab =
        Tabbed tab tabs