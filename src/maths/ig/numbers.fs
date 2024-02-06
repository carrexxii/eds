namespace EDS.Maths.IG

open Fable.Core.JsInterop
open Feliz
open Feliz.Mafs

open EDS.Shared.Components

type Set =
    | Integers
    | Naturals
    | Rationals
    | Irrationals
    | Reals
    | Complex
    static member toInt = function
        | Integers    -> 0
        | Naturals    -> 1
        | Rationals   -> 2
        | Irrationals -> 3
        | Reals       -> 4
        | Complex     -> 5
    static member toLatex = function
        | Integers    -> @"\Z"
        | Naturals    -> @"\N"
        | Rationals   -> @"\Q"
        | Irrationals -> @"\I"
        | Reals       -> @"\Reals"
        | Complex     -> @"\Complex"

module Numbers =
    [<ReactComponent>]
    let NumberLines () =
        Html.div [
            let min = -20
            let max = 20
            let lower, setLower = React.useState 0.0
            let upper, setUpper = React.useState 5.0
            let lowerInc, setLowerInc = React.useState true
            let upperInc, setUpperInc = React.useState true
            let numberSet, setNumberSet = React.useState Integers
            Mafs { MafsProps.Default with
                     height = 200
                     zoom   = !^{| min = 0.5; max = 7.5 |} } ([
                Cartesian { CartesianProps.Default with
                              yAxis = !^false }

                Latex.create
                    $$"""\Large{ {{Set.toLatex numberSet}} =
                                {{if lowerInc then "[" else "("}}
                                   {{lower}}, {{upper}}
                                {{if upperInc then "]" else ")"}} }"""
                |> Latex.color (if lower > upper || (numberSet = Naturals && lower < 0.0) then Theme.red else Theme.foreground)
                |> Latex.pos (vec 0 1.25)
                |> Latex.render
            ]@(
                let points =
                    match numberSet with
                    | Integers | Naturals ->
                        { (if lowerInc then lower else lower + 1.0)
                        ..(if upperInc then upper else upper - 1.0) }
                        |> Seq.filter (fun n -> if numberSet = Naturals
                                                then n >= 0.0
                                                else true)
                    | Reals ->
                        if lower > upper || (lower = upper && (not lowerInc || not upperInc))
                        then []
                        else [ lower; upper ]
                    | set -> printfn $"Number set '{set}' not implemented"; []

                match numberSet with
                    | Integers | Naturals ->
                        points
                        |> Seq.map (fun x ->
                            Point.create (vec x 0)
                            |> Point.color Theme.indigo
                            |> Point.render)
                        |> List.ofSeq
                    | Reals when points <> [] ->
                        (let points = points |> List.ofSeq
                         Line.create Line.Segment
                         |> Line.point1 (vec points[0] 0)
                         |> Line.point2 (vec points[1] 0)
                         |> Line.color Theme.orange
                         |> Line.weight 5.0
                         |> Line.render)
                        ::[ let circle = Circle.create 0.3
                                         |> Circle.color Theme.orange
                            circle
                            |> Circle.center (vec lower 0)
                            |> Circle.opacity (if lowerInc then 1.0 else 0.0)
                            |> Circle.render
                            circle
                            |> Circle.center (vec upper 0)
                            |> Circle.opacity (if upperInc then 1.0 else 0.0)
                            |> Circle.render ]
                    | _ -> [ Html.div [] ]
            ))

            let step = if numberSet = Integers || numberSet = Naturals then 1.0 else 0.1
            Html.div [
                prop.className "flex flex-row justify-center m-2"
                prop.children [
                    Html.div [
                        prop.className "px-3 border-r-2"
                        prop.children [
                            "Lower Limit" |> NumberInput min max lower (fun v -> setLower v)
                            Slider min max step lower (fun v -> setLower v) false
                            Checkbox "Inclusive" lowerInc (fun v -> setLowerInc v)
                        ]
                    ]
                    Html.div [
                        prop.className "px-3 border-l-2"
                        prop.children [
                            "Upper Limit" |> NumberInput min max upper (fun v -> setUpper v)
                            Slider min max step upper (fun v -> setUpper v) false
                            Checkbox "Inclusive" upperInc (fun v -> setUpperInc v)
                        ]
                    ]
                    Html.div [
                        prop.className "pl-12"
                        prop.children [
                            RadioList "Number Sets" (Set.toInt numberSet)
                                [ "Integers", fun e -> setNumberSet Integers
                                                       setLower (int lower)
                                                       setUpper (int upper)
                                  "Naturals", fun e -> setNumberSet Naturals
                                                       setLower (int lower)
                                                       setUpper (int upper)
                                  "Reals", fun e -> setNumberSet Reals ]
                        ]
                    ]
                ]
            ]
        ]

    [<ReactComponent>]
    let Exponents () =
        Heading "TODO"

    [<ReactComponent>]
    let Percentages () =
        Heading "TODO"

    [<ReactComponent>]
    let Estimates () =
        Heading "TODO"

    [<ReactComponent>]
    let Currency () =
        Heading "TODO"


    let view () =
        Tabbed [ "Sets and Number Lines", NumberLines ()
                 "Exponents"            , Exponents ()
                 "Percentages"          , Percentages ()
                 "Estimates"            , Estimates ()
                 "Currency"             , Currency () ]
