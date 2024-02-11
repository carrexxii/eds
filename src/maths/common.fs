namespace EDS.Maths

open System

open Feliz.Mafs

[<AutoOpen>]
module Common =
    type Shape =
        | Point
        | Circle
        | Line
        | Triangle
        | Rectangle
        | Pentagon
        | Hexagon
        | Septagon
        | Octagon
        static member points = function
            | Point | Circle -> 1
            | Line      -> 2
            | Triangle  -> 3
            | Rectangle -> 4
            | Pentagon  -> 5
            | Hexagon   -> 6
            | Septagon  -> 7
            | Octagon   -> 8

    let snapWith (p: Vec2) (dp: int) =
        let x = Math.Round (p.x, dp)
        let y = Math.Round (p.y, dp)
        vec x y

    let constrainSnap =
        fun snap ->
            Some <| Constrain (fun p ->
                snapWith p (if snap then 0 else 1))

    let pointLineDist (p: Vec2) (q: Vec2) (a: Vec2) =
        ((q.x - p.x)*(p.y - a.y) - (p.x - a.x)*(q.y - p.y))
        / sqrt ((q.x - p.x)**2 + (p.y - q.y)**2)
