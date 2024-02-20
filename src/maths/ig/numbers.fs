namespace EDS.Maths.IG

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
    let NumberSets () =
        Html.div [
            let min = -20
            let max = 20
            let lower, setLower = React.useState 0.0
            let upper, setUpper = React.useState 5.0
            let lowerInc, setLowerInc = React.useState true
            let upperInc, setUpperInc = React.useState true
            let numberSet, setNumberSet = React.useState Integers
            Mafs.create ()
            |> Mafs.height 200
            |> Mafs.zoom 0.5 7.5
            |> Mafs.render ([
                Cartesian.create ()
                |> Cartesian.yAxis None
                |> Cartesian.render

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
                            Slider "" min max step lower (fun v -> setLower v) false
                            Checkbox (TextString "Inclusive") lowerInc (fun v -> setLowerInc v)
                        ]
                    ]
                    Html.div [
                        prop.className "px-3 border-l-2"
                        prop.children [
                            "Upper Limit" |> NumberInput min max upper (fun v -> setUpper v)
                            Slider "" min max step upper (fun v -> setUpper v) false
                            Checkbox (TextString "Inclusive") upperInc (fun v -> setUpperInc v)
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

            Article [
                Html.text "Some text before"
                Popup "Define this" (Html.text "This is the definition")
                Html.br []
                Popup "Define this" (Html.text "This is the definition")
                Html.br []
                Popup "Define this" (Html.text "This is the definition")
                Html.br []
                Popup "Define this" (Html.text "This is the definition")
                Html.text "Some text afterwards"
            ]

            Article [
                UnorderedList [ Html.text "Natural Numbers"
                                Html.text "Integers"
                                Html.text "Rational Numbers"
                                Html.text "Irrational Numbers"
                                Html.text "Real Numbers"
                                Html.text "Prime Numbers"
                                Html.text "Square Numbers and Square Roots"
                                Html.text "Cubic Numbers"
                                Html.text "Factors"
                                Html.text "Prime Factors" ]
                UnorderedList [ Html.text "Highest Common Factor"
                                Html.text "Least Common Factor"
                                Html.text "Upper and Lower Bounds"
                                Html.text "Significant Figures and Decimal Places"
                                Html.text "Accuracy and Precision"
                                Html.text "Inequalities"
                                Html.text "Integers, Fractions Decimals and Percentages" ]
                Accordion [
                    Html.text "Extended", Html.text "Content for the extended section"
                    Html.text "Beyond"  , Html.text "Content for the beyond section"
                ]

                Html.p """Text following the extended section"""
            ]
        ]

    [<ReactComponent>]
    let Exponents () =
        Html.div [
            Heading "Exponents"

            SubHeading "Rules for Exponents"
            let tex inner = Katex $$"""\color{black}{{inner}}"""
            StaticTable TableVertical
                [ [ Html.text "Rules"; Html.text "Examples" ]
                  [ tex @"x^0 = 1"
                    tex @"\qquad 2^0 = 1" ]
                  [ tex @"x^1 = x"
                    tex @"\qquad 3^1 = 3" ]
                  [ tex @"x^n = x_1 \times x_2 \times \dots \times x_n"
                    tex @"\qquad x^5 = x \times x \times x \times x \times x" ]
                  [ tex @"x^ax^b = x^{a + b}"
                    tex @"\qquad x^2x^3 = x^{2 + 3} = x^5 \\
                          \qquad x^{-1}x^2 = x^{-1 + 2} = x" ]
                  [ tex @"(x^n)^m = x^{nm}"
                    tex @"\qquad (x^2)^3 = x^{2 \times 3} = x^6" ]
                  [ tex @"\dfrac{a}{x^n} = ax^{-n}"
                    tex @"\qquad \frac{1}{x} = x^{-1}
                          \qquad \frac{5}{x^2} = 5x^{-2}
                          \qquad \frac{2}{3x^{-3}} = \frac{2}{3}x^3" ]
                  [ tex @"\dfrac{x^a}{x^b} = x^{a - b}"
                    tex @"\qquad \frac{x^2}{x^3} = x^{2 - 3} = x^{-1} = \frac{1}{x} \\
                          \qquad \frac{x^7}{x^3} = x^{7 - 3} = x^4" ]
                  [ tex @"\left( \dfrac{x}{y} \right)^n = \dfrac{x^n}{y^n}"
                    tex @"\qquad \left( \frac{x}{y^2} \right)^3 = \frac{x^3}{y^6}" ] ]
        ]

    [<ReactComponent>]
    let Percentages () =
        Heading "Percentages"

    [<ReactComponent>]
    let Estimates () =
        Heading "Estimates"

    [<ReactComponent>]
    let Currency () =
        Heading "Currency"

    let tabs =
        [ "Sets"       , NumberSets ()
          "Exponents"  , Exponents ()
          "Percentages", Percentages ()
          "Estimates"  , Estimates ()
          "Currency"   , Currency () ]

    let view tab =
        Tabbed tab tabs
