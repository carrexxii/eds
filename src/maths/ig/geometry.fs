namespace EDS.Maths.IG

open System

open Fable.Core.JsInterop
open Feliz
open Feliz.Mafs

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
        let props =
            { MafsProps.Default with
                width = !^500.0
                pan = false
                zoom = !^{| min = 0.5; max = 2.0 |}
                viewBox = { x = [| -5; 5 |]
                            y = [| -5; 5 |]
                            padding = 0.5 } }
        Html.div [
            prop.className "flex flex-col gap-12"
            prop.children [
                Html.div [
                    prop.className "flex flex-row"
                    prop.children [
                        let shouldSnap, setShouldSnap = React.useState false
                        let showPoints, setShowPoints = React.useState false
                        let showAngles, setShowAngles = React.useState false

                        let snap (pt: Vec2) =
                            if shouldSnap
                            then vec (Math.Round pt.x) (Math.Round pt.y)
                            else vec (Math.Round (pt.x, 1)) (Math.Round (pt.y, 1))
                        let p1 = movablePoint (vec -1 -1) Theme.green (Constrain snap)
                        let p2 = movablePoint (vec  1 -1) Theme.green (Constrain snap)
                        let p3 = movablePoint (vec  0  1) Theme.green (Constrain snap)
                        let p1v = Vec2 p1.point
                        let p2v = Vec2 p2.point
                        let p3v = Vec2 p3.point
                        Mafs props ([
                            CartesianDefault
                            Polygon.create [ p1v; p2v; p3v ]
                            |> Polygon.opacity 0.3
                            |> Polygon.color Theme.green
                            |> Polygon.render true

                            p1.element
                            p2.element
                            p3.element
                        ]@ (let points = [ p1v; p2v; p3v ]
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
                                [ p1v - p2v, p1v - p3v
                                  p2v - p1v, p2v - p3v
                                  p3v - p1v, p3v - p2v ]
                                |> List.map (fun (p1, p2) -> Radians <| Math.Acos ((p1*p2) / (p1.mag*p2.mag)))
                                |> List.map2 (fun p a ->
                                    let cv = centroid - p
                                    Latex.create $"\\tiny %.1f{Angle.toDeg a}\\degree"
                                    |> Latex.pos (p + 0.3*cv)
                                    |> Latex.render)
                                    [ p1v; p2v; p3v ]
                            else []))

                        Html.div [
                            prop.className "p-4"
                            prop.children [
                                SubHeading $"This is a {triangleName p1v p2v p3v} triangle"
                                Html.div [
                                    prop.className "flex flex-row gap-4"
                                    prop.children [
                                        CheckList "Options"
                                            [ "Snap"       , shouldSnap, (fun e -> setShouldSnap (not shouldSnap))
                                              "Show Points", showPoints, (fun e -> setShowPoints (not showPoints))
                                              "Show Angles", showAngles, (fun e -> setShowAngles (not showAngles)) ]
                                        RadioList "Basic Triangle Types" -1
                                            [ "Equilateral", fun e -> p1.setPoint [| -2; 0     |]
                                                                      p2.setPoint [|  0; 3.464 |]
                                                                      p3.setPoint [|  2; 0     |]
                                              "Isosceles", fun e -> p1.setPoint [|  0; -2 |]
                                                                    p2.setPoint [|  2;  0 |]
                                                                    p3.setPoint [| -2;  2 |]
                                              "Scalene", fun e -> p1.setPoint [| -3; -1 |]
                                                                  p2.setPoint [|  4; -1 |]
                                                                  p3.setPoint [| -2;  3 |]
                                              "Right", fun e -> p1.setPoint [|  4;  3 |]
                                                                p2.setPoint [|  4; -3 |]
                                                                p3.setPoint [| -2;  3 |] ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]

                Html.div [
                    prop.className "flex flex-row-reverse gap-8 ml-auto"
                    prop.children [
                        let shouldSnap, setShouldSnap = React.useState false
                        let showPoints, setShowPoints = React.useState false
                        let showAngles, setShowAngles = React.useState false

                        let snap (pt: Vec2) =
                            if shouldSnap
                            then vec (Math.Round pt.x) (Math.Round pt.y)
                            else vec (Math.Round (pt.x, 1)) (Math.Round (pt.y, 1))
                        let p1 = movablePoint (vec -1 -1) Theme.green (Constrain snap)
                        let p2 = movablePoint (vec -1  1) Theme.green (Constrain snap)
                        let p3 = movablePoint (vec  1  1) Theme.green (Constrain snap)
                        let p4 = movablePoint (vec  1 -1) Theme.green (Constrain snap)
                        let p1v = Vec2 p1.point
                        let p2v = Vec2 p2.point
                        let p3v = Vec2 p3.point
                        let p4v = Vec2 p4.point
                        let isConvex = quadIsConvex p1v p2v p3v p4v
                        Mafs props ([
                            CartesianDefault
                            Polygon.create [ p1v; p2v; p3v; p4v ]
                            |> Polygon.opacity 0.3
                            |> Polygon.color (if isConvex then Theme.green else Theme.red)
                            |> Polygon.render true

                            p1.element
                            p2.element
                            p3.element
                            p4.element
                        ]@ (let points = [ p1v; p2v; p3v; p4v ]
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
                                quadAngles p1v p2v p3v p4v
                                |> List.map2 (fun p a ->
                                    let cv = centroid - p
                                    Latex.create $"\\tiny %.1f{Angle.toDeg a}\\degree"
                                    |> Latex.pos (p + 0.3*cv)
                                    |> Latex.render)
                                    [ p1v; p2v; p3v; p4v ]
                            else []))

                        Html.div [
                            prop.className "p-4"
                            prop.children [
                                if isConvex
                                then SubHeading $"This is a {quadName p1v p2v p3v p4v}"
                                else SubHeading $"Not convex/has crossed points"
                                Html.div [
                                    prop.className "flex flex-row gap-4"
                                    prop.children [
                                        CheckList "Options"
                                            [ "Snap"       , shouldSnap, (fun e -> setShouldSnap (not shouldSnap))
                                              "Show Points", showPoints, (fun e -> setShowPoints (not showPoints))
                                              "Show Angles", showAngles, (fun e -> setShowAngles (not showAngles)) ]
                                        RadioList "Basic Quadrilateral Types" -1
                                            [ "Square", fun e -> p1.setPoint [| -2; -2 |]
                                                                 p2.setPoint [| -2;  2 |]
                                                                 p3.setPoint [|  2;  2 |]
                                                                 p4.setPoint [|  2; -2 |]
                                              "Rectangle", fun e -> p1.setPoint [| -2.5; -1.5 |]
                                                                    p2.setPoint [| -2.5;  1.5 |]
                                                                    p3.setPoint [|  2.5;  1.5 |]
                                                                    p4.setPoint [|  2.5; -1.5 |]
                                              "Rhombus", fun e -> p1.setPoint [| -3; -1 |]
                                                                  p2.setPoint [| -2;  2 |]
                                                                  p3.setPoint [|  1;  3 |]
                                                                  p4.setPoint [|  0;  0 |]
                                              "Parallelogram", fun e -> p1.setPoint [| -4; -3 |]
                                                                        p2.setPoint [|  0;  3 |]
                                                                        p3.setPoint [|  4;  3 |]
                                                                        p4.setPoint [|  0; -3 |]
                                              "Trapezium", fun e -> p1.setPoint [| -3; -2 |]
                                                                    p2.setPoint [| -1;  2 |]
                                                                    p3.setPoint [|  1;  2 |]
                                                                    p4.setPoint [|  3; -2 |]
                                              "Kite", fun e -> p1.setPoint [| -3.0;  0.0 |]
                                                               p2.setPoint [| -0.9;  1.3 |]
                                                               p3.setPoint [|  4.0;  0.0 |]
                                                               p4.setPoint [| -0.9; -1.3 |] ]
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

    let Loci () =
        Html.div [

        ]


    let tabs =
        [ "Constructions"   , Constructions ()
          "Similarity"      , Similarity ()
          "Symmetry"        , Symmetry ()
          "Angle Properties", Angles ()
          "Loci"            , Loci () ]

    let view tab =
        Tabbed tab tabs