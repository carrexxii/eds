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

    [<ReactComponent>]
    let Constructions () =
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
                Mafs { MafsProps.Default with
                        width = !^500.0
                        pan = false
                        viewBox = { x = [| -5; 5 |]
                                    y = [| -5; 5 |]
                                    padding = 0.5 } } ([
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
                            Text.create $"%.1f{Angle.toDeg a}"
                            |> Text.pos (p + 0.3*cv)
                            |> Text.size 12
                            |> Text.render)
                            [ p1v; p2v; p3v ]
                    else []))

                Html.div [
                    prop.className "p-4"
                    prop.children [
                        SubHeading $"This is a {triangleName (Vec2 p1) (Vec2 p2) (Vec2 p3)} triangle"
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