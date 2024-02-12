namespace EDS.Maths.IG

open System

open Feliz
open Feliz.Mafs

open EDS.Maths
open EDS.Shared.Components

module Transforms =
    [<ReactComponent>]
    let Vectors () =
        Html.div [
            prop.className "flex flex-row-reverse gap-8"
            prop.children [
                Html.div [
                    let snap     , setSnap      = React.useState true
                    let showScale, setShowScale = React.useState false
                    let scale    , setScale     = React.useState 1.0
                    let facing = movablePoint (vec 1 2) Theme.green   (Some <| Constrain (fun p -> snapWith p (if snap then 0 else 1)))
                    let pos = movablePoint (vec 0 0) Theme.foreground (Some <| Constrain (fun p -> vec 0 0))
                    Mafs.create ()
                    |> Mafs.zoom 0.5 1.0
                    |> Mafs.render [
                        Cartesian.create () |> Cartesian.render

                        let head = (pos.pos + facing.pos)
                        Vector.create head
                        |> Vector.tail pos.pos
                        |> Vector.color Theme.green
                        |> Vector.weight 3.0
                        |> Vector.render

                        let leg = Line.create Line.Segment
                                  |> Line.point1 head
                                  |> Line.style Dashed
                        leg |> Line.point2 (vec head.x 0) |> Line.render
                        leg |> Line.point2 (vec 0 head.y) |> Line.render

                        if showScale then
                            Vector.create (head * scale)
                            |> Vector.color Theme.red
                            |> Vector.render

                        Text.create $"%.1f{facing.pos.mag}"
                        |> Text.pos (pos.pos.midpoint facing.pos)
                        |> Text.color Theme.yellow
                        |> Text.render

                        pos.element
                        facing.element
                    ]
                    Html.div [
                        prop.className "flex flex-row gap-12 m-2"
                        prop.children [
                            CheckList "Options"
                                [ (TextString "Snap")        , snap     , (fun e -> setSnap e)
                                  (TextString "Scale Vector"), showScale, (fun e -> setShowScale e) ]
                            NumberInput -5.0 5.0 facing.x (fun v -> facing.setPoint (vec v facing.y)) "x: "
                            NumberInput -5.0 5.0 facing.y (fun v -> facing.setPoint (vec facing.x v)) "y: "
                            NumberInput -5.0 5.0 scale (fun v -> setScale v) "Scale: "
                        ]
                    ]

                    Html.br []
                    Html.hr []
                    Html.br []

                    let snap      , setSnap       = React.useState true
                    let showPoints, setShowPoints = React.useState true
                    let sumVec    , setSumVec     = React.useState false
                    let firstVector , setFirstVector  = React.useState "AB"
                    let secondVector, setSecondVector = React.useState "BC"
                    let points = Map <| seq {
                        'O', movablePoint (vec  0  0) Theme.foreground (Some <| Constrain (fun p -> vec 0 0))
                        'A', movablePoint (vec  2  2) Theme.green (constrainSnap snap)
                        'B', movablePoint (vec -3  0) Theme.green (constrainSnap snap)
                        'C', movablePoint (vec  1 -2) Theme.green (constrainSnap snap)
                    }
                    let vecIsValid (str: string) =
                        str.Length = 2 &&
                            str.ToCharArray ()
                            |> Array.filter points.ContainsKey
                            |> (fun arr -> arr.Length = str.Length)
                    Mafs.create ()
                    |> Mafs.render ([
                        Cartesian.create () |> Cartesian.render
                    ]@([ firstVector, Theme.red; secondVector, Theme.blue ]
                        |> List.filter (fun (v, _) -> vecIsValid v)
                        |> List.map (fun (v, color) ->
                            let tail = points[v[0]].pos
                            let head = points[v[1]].pos
                            Vector.create head
                            |> Vector.tail tail
                            |> Vector.weight 3
                            |> Vector.color color
                            |> Vector.render,
                            Text.create $"%.1f{(head - tail).mag}"
                            |> Text.pos (head.midpoint tail)
                            |> Text.color color
                            |> Text.render)
                        |> List.fold (fun acc (v, t) -> v::t::acc) []
                    )@[
                        if sumVec && vecIsValid firstVector && vecIsValid secondVector then
                            let tail = points[firstVector[0]].pos
                            let head = tail + (points[firstVector[1]].pos  - points[firstVector[0]].pos) -
                                              (points[secondVector[0]].pos - points[secondVector[1]].pos)
                            Vector.create head
                            |> Vector.tail tail
                            |> Vector.color Theme.yellow
                            |> Vector.render
                            Text.create $"{firstVector} + {secondVector}"
                            |> Text.pos (tail.midpoint head)
                            |> Text.color Theme.yellow
                            |> Text.render
                    ]@[
                        for p in points do
                            if showPoints && p.Key <> 'O'
                            then $$"""{{string p.Key}}\begin{pmatrix} {{p.Value.pos.x}} \\\\ {{p.Value.pos.y}} \end{pmatrix}"""
                            else (string p.Key)
                            |> Latex.create
                            |> Latex.pos (p.Value.pos + (if not showPoints || p.Key = 'O'
                                                         then vec 0.2 0.2
                                                         else vec 0.7 0.3))
                            |> Latex.render
                            p.Value.element
                    ])
                    Html.div [
                        Html.div [
                            prop.className "flex flex-row gap-12 items-center"
                            prop.children [
                                CheckList "Options"
                                    [ (TextString "Snap")       , snap      , (fun e -> setSnap e)
                                      (TextString "Show Points"), showPoints, (fun e -> setShowPoints e)
                                      (TextString "Show Sum")   , sumVec    , (fun e -> setSumVec e) ]
                                TextInput "First Vector" firstVector (fun str -> setFirstVector str)
                                    (Some <| fun str ->
                                        if vecIsValid str
                                        then None
                                        else Some $"'{str}' is not a valid vector")
                                TextInput "Second Vector" secondVector (fun str -> setSecondVector str)
                                    (Some <| fun str ->
                                        if vecIsValid str
                                        then None
                                        else Some $"'{str}' is not a valid vector")
                            ]
                        ]
                    ]
                    Article [
                        Section [
                            Html.text """Try entering in some vectors, such as 'AB' or 'CB'. Notice that
                            reversing the points ('AB' -> 'BA') makes the vector point in the opposite direction""" ]
                    ]
                ]

                Article [
                    Heading "Vectors"
                    Section [
                        Html.text """Vectors are important for maths involving geometry, 2D/3D maths and are even
                        important for topics such as machine learning. Our focus will be entirely on using vectors
                        for doing maths in two dimensions. Where numbers ont their own are single-dimension values,
                        vectors are multi-dimensional values and can be used for 2D, 3D and even """
                        Terms.higherDim; Html.text """ values."""
                    ]
                    Section [
                        Html.text "This covers content for "; Terms.section7; Html.text " in the syllabus."
                    ]

                    SubHeading "What Are Vectors?"
                    Section [
                        Html.text "Vectors are multi-dimensional values (a number alone is called a "; Terms.scalar
                        Html.text "). We will write vectors as either:"
                        StaticTable TableVertical
                            [ [ Html.none ]
                              [ Html.text "Column vectors: "; Katex @"\begin{pmatrix} x \\ y \end{pmatrix}, \;
                                                                      \begin{pmatrix} 2 \\ 3 \end{pmatrix}" ]
                              [ Html.text "Vectors between points: "; Katex @"\overrightarrow{AB}, \; \overrightarrow{BD}" ]
                              [ Html.text "Bolded letters: "        ; Katex @"\mathbf{a}, \; \mathbf{b}" ] ]
                        Html.text """ and they can be drawn as arrows like in the example to the right."""
                    ]

                    SubHeading "Vector Maths"
                    Section [
                        Html.text """We will need to be able to do three different operations using vectors: adding
                                     subtracting and multiplying (by a scalar). Doing this is no more difficult than
                                     normal, but we will need to do it twice because our vectors have two values: """
                        StaticTable TableVertical
                            [ [ Html.text "Operation"; Html.text "Rule"; Html.text "Example" ]
                              [ Html.text "Addition: "
                                Katex @"\begin{pmatrix} x \\ y \end{pmatrix} +
                                        \begin{pmatrix} a \\ b \end{pmatrix} =
                                        \begin{pmatrix} x + a \\ y + b \end{pmatrix}"
                                Katex @"\begin{pmatrix} 1 \\ 2 \end{pmatrix} +
                                        \begin{pmatrix} 3 \\ 4 \end{pmatrix} =
                                        \begin{pmatrix} 4 \\ 6 \end{pmatrix}" ]
                              [ Html.text "Subtraction: "
                                Katex @"\begin{pmatrix} x \\ y \end{pmatrix} -
                                        \begin{pmatrix} a \\ b \end{pmatrix} =
                                        \begin{pmatrix} x - a \\ y - b \end{pmatrix}"
                                Katex @"\begin{pmatrix} 3 \\ 3 \end{pmatrix} -
                                        \begin{pmatrix} 4 \\ 2 \end{pmatrix} =
                                        \begin{pmatrix} -1 \\ 1 \end{pmatrix}" ]
                              [ Html.text "Multiplication: "
                                Katex @"a \times \begin{pmatrix} x \\ y \end{pmatrix} =
                                        \begin{pmatrix} ax \\ ay \end{pmatrix}"
                                Katex @"\begin{pmatrix} -1 \\ 3 \end{pmatrix} \times 5 =
                                        \begin{pmatrix} -5 \\ 15 \end{pmatrix}" ] ]
                    ]
                ]
            ]
        ]

    [<ReactComponent>]
    let Matrices () =
        Html.div [

        ]

    type Transform =
        | Reflect
        | Scale
        | Rotate
    [<ReactComponent>]
    let Transforms () =
        Html.div [
            prop.className ""
            prop.children [
                let maxPoints = 8.0
                let snap          , setSnap           = React.useState false
                let snapRotate    , setSnapRotate     = React.useState false
                let pointCount    , setPointCount     = React.useState 1
                let showCoords    , setShowCoords     = React.useState false
                let showNewCoords , setShowNewCoords  = React.useState false
                let showPaths     , setShowPaths      = React.useState false
                let method        , setMethod         = React.useState Reflect
                let scaleFactor   , setScaleFactor    = React.useState 2.0
                let rotationFactor, setRotationFactor = React.useState 180.0
                let points = { 1..int maxPoints }
                             |> Seq.map (fun p ->
                                let p = float (p - 1)
                                let x = cos (2.0*Math.PI/maxPoints * p)
                                let y = sin (2.0*Math.PI/maxPoints * p)
                                movablePoint (vec x y) Theme.green (constrainSnap snap))
                             |> List.ofSeq
                let tPoint  = movablePoint (vec  0  0) Theme.indigo (constrainSnap snap)
                let lPoint1 = movablePoint (vec -3 -3) Theme.indigo (constrainSnap snap)
                let lPoint2 = movablePoint (vec  3  3) Theme.indigo (constrainSnap snap)
                Mafs.create ()
                |> Mafs.zoom 0.3 1.0
                |> Mafs.render ([
                    Cartesian.create () |> Cartesian.render
                    if method = Reflect then
                        Line.create Line.ThroughPoints
                        |> Line.point1 lPoint1.pos
                        |> Line.point2 lPoint2.pos
                        |> Line.render
                ]@(
                    let points = points
                                 |> List.take (pointCount)
                                 |> List.map (fun p -> p.pos)
                    let reflects =
                        points
                        |> List.map (fun p ->
                            match method with
                            | Reflect ->
                                let dist = pointLineDist lPoint1.pos lPoint2.pos p
                                let v = (lPoint2.pos - lPoint1.pos).normal
                                p + 2.0*((vec -v.y v.x) * dist)
                            | Scale ->
                                let dist = tPoint.pos.dist p
                                let dir  = (tPoint.pos - p).normal
                                p - dir*dist*(scaleFactor - 1.0)
                            | Rotate ->
                                p.rotateAbout tPoint.pos (Degrees rotationFactor))

                    (if points.Length > 1 then
                        [ points  , Theme.green
                          reflects, Theme.red ]
                        |> List.map (fun (points, color) ->
                            Polygon.create points
                            |> Polygon.color color
                            |> Polygon.opacity 0.3
                            |> Polygon.render true)
                    else
                        [ Point.create reflects[0]
                          |> Point.color Theme.red
                          |> Point.render ])
                    @(
                        if showPaths then
                            List.zip points reflects
                            |> List.map (fun (p1, p2) ->
                                Line.create Line.Segment
                                |> Line.point1 p1
                                |> Line.point2 p2
                                |> Line.color Theme.yellow
                                |> Line.style Dashed
                                |> Line.weight 2.0
                                |> Line.render)
                        else []
                    )@(
                        let drawCoord (p: Vec2) =
                            let x = $"%.1f{p.x}"
                            let y = $"%.1f{p.y}"
                            Latex.create $$"""\tiny \begin{pmatrix} {{x}} \\\\ {{y}} \end{pmatrix}"""
                            |> Latex.pos (p + vec 0 0.5)
                            |> Latex.render
                        if showCoords
                        then points |> List.take (pointCount) |> List.map (fun p -> drawCoord p)
                        else []
                    @
                        if showNewCoords
                        then reflects |> List.take (pointCount) |> List.map (fun p -> drawCoord p)
                        else [])
                )@[
                    match method with
                    | Scale
                    | Rotate -> tPoint.element
                    | Reflect ->
                        lPoint1.element
                        lPoint2.element
                ]@(points
                    |> List.take pointCount
                    |> List.map (fun p -> p.element)
                ))
                Html.div [
                    prop.className "flex flex-row gap-12 m-2"
                    prop.children [
                        CheckList "Options"
                            [ TextString "Snap"                , snap         , fun e -> setSnap e
                              TextString "Snap Rotation"       , snapRotate   , fun e -> setSnapRotate e
                              TextString "Show Coordinates"    , showCoords   , fun e -> setShowCoords e
                              TextString "Show New Coordinates", showNewCoords, fun e -> setShowNewCoords e
                              TextString "Show Paths"          , showPaths    , fun e -> setShowPaths e ]
                        RadioList "We Want to" 0
                            [ "Reflect", fun e -> setMethod Reflect
                              "Scale"  , fun e -> setMethod Scale
                              "Rotate" , fun e -> setMethod Rotate ]
                        NumberInput 1 maxPoints pointCount (fun v -> setPointCount (int v)) "Number of Points: "
                        if method = Scale  then Slider "Scale: " -5 5 0.1 scaleFactor (fun v -> setScaleFactor v) true
                        if method = Rotate then
                            let scale = if snapRotate then 90 else 1
                            Slider "Rotation: " -360 360 scale rotationFactor (fun v -> setRotationFactor v) true
                    ]
                ]
            ]
        ]

    let tabs =
        [ "Vectors"   , Vectors ()
          "Matrices"  , Matrices ()
          "Transforms", Transforms () ]

    let view tab =
        Tabbed tab tabs
