namespace EDS.Maths.IG

open System

open Fable.Core.JsInterop
open Feliz
open Feliz.Mafs

open EDS.Shared
open EDS.Shared.Components

module Transforms =
    [<ReactComponent>]
    let Vectors () =
        Html.div [
            prop.className "flex flex-row-reverse gap-8"
            prop.children [
                Html.div [
                    let snapWith (p: Vec2) (dp: int) =
                        let x = Math.Round (p.x, dp)
                        let y = Math.Round (p.y, dp)
                        vec x y

                    let snap, setSnap = React.useState true
                    let facing = movablePoint (vec 1 2) Theme.green (Some <|
                        Constrain (fun p -> snapWith p (if snap then 0 else 1)))
                    let pos = movablePoint (vec 0 0) Theme.foreground (Some <|
                        Constrain (fun p -> vec 0 0))
                    Mafs.create ()
                    |> Mafs.render [
                        Cartesian.create () |> Cartesian.render

                        Vector.create (pos.pos + facing.pos)
                        |> Vector.tail pos.pos
                        |> Vector.weight 3.0
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
                            Checkbox (TextString "Snap") snap (fun e -> setSnap e)
                            NumberInput -5.0 5.0 facing.x (fun v -> facing.setPoint (vec v facing.y)) "x: "
                            NumberInput -5.0 5.0 facing.y (fun v -> facing.setPoint (vec facing.x v)) "y: "
                            Html.div [ prop.className "w-32" ]
                        ]
                    ]

                    Html.br []
                    Html.hr []
                    Html.br []

                    let snap  , setSnap    = React.useState true
                    let sumVec, setSumVec  = React.useState true
                    let firstVector , setFirstVector  = React.useState "AB"
                    let secondVector, setSecondVector = React.useState "BC"
                    let points = Map <| seq {
                        'O', movablePoint (vec  0  0) Theme.foreground (Some <| Constrain (fun p -> vec 0 0))
                        'A', movablePoint (vec  2  2) Theme.green (Some <| Constrain (fun p -> snapWith p (if snap then 0 else 1)))
                        'B', movablePoint (vec -3  0) Theme.green (Some <| Constrain (fun p -> snapWith p (if snap then 0 else 1)))
                        'C', movablePoint (vec  1 -2) Theme.green (Some <| Constrain (fun p -> snapWith p (if snap then 0 else 1)))
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
                        |> List.fold (fun acc (v, t) ->
                            v::t::acc) []
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
                            Text.create (string p.Key)
                            |> Text.pos p.Value.pos
                            |> Text.attach North -16
                            |> Text.render
                            p.Value.element
                    ])
                    Html.div [
                        Html.div [
                            prop.className "flex flex-row gap-12 items-center"
                            prop.children [
                                CheckList "Options"
                                    [ (TextString "Snap")    , snap  , (fun e -> setSnap e)
                                      (TextString "Show Sum"), sumVec, (fun e -> setSumVec e) ]
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

                    SubHeading "What Are Vectors?"
                    Section [
                        Html.text "Vectors are multi-dimensional values (a number alone is called a "; Terms.scalar
                        Html.text "). We will write vectors as either:"
                        StaticTable
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
                        StaticTable
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

    [<ReactComponent>]
    let Transforms () =
        Html.div [

        ]

    let tabs =
        [ "Vectors"   , Vectors ()
          "Matrices"  , Matrices ()
          "Transforms", Transforms () ]

    let view tab =
        Tabbed tab tabs
