namespace EDS.Maths.IG

open System

open Feliz
open Feliz.Recharts

open EDS.Shared
open EDS.Shared.Components

// TODO:
// - Add example data sets (marks, genres, etc) + option to upload/add

module Statistics =
    type Point =
        { name : string
          value: int }
    let rand = Random ()
    let marks =
        [ for x in 1..75 do
            let mark = rand.Next () % 100
            if   mark < 30 && mark % 2 = 0 then mark * 2
            elif mark > 80 && mark % 2 = 0 then mark / 2
            else mark ]
    let symbol = function
        | m when m >= 90 -> "A*"
        | m when m >= 80 -> "A"
        | m when m >= 70 -> "B"
        | m when m >= 60 -> "C"
        | m when m >= 50 -> "D"
        | m when m >= 40 -> "E"
        | m when m >= 30 -> "F"
        | m when m >= 20 -> "G"
        | _ -> "Ungraded"
    let data =
        [ for grade in 0..8 do
            let grade = symbol (10*(grade + 1))
            { name  = grade
              value = marks
                      |> List.filter (fun mark -> symbol mark = grade)
                      |> List.length } ]
    let pairData =
        [ for y in 0..5 do
            for x in 0..5 do
                float (rand.Next () % 1000),
                float (rand.Next () % 1000) ]
        |> List.sort

    let chartContainer chart descrip rev =
        Html.div [
            prop.className $"""flex flex-col{if rev then "-reverse" else ""} gap-12"""
            prop.children [
                Recharts.responsiveContainer [
                    responsiveContainer.width (length.percent 100)
                    responsiveContainer.height 500
                    responsiveContainer.chart chart
                ]
                descrip
            ]
        ]

    let MMMaR () =
        Html.div [

        ]

// Construct and interpret bar charts, pie charts,
// pictograms, stem-and-leaf diagrams, simple
// frequency distributions, histograms with equal
// intervals and scatter diagrams.
    [<ReactComponent>]
    let BarPieCharts () =
        Html.div [
            Html.div [
                prop.className "flex flex-row gap-20"
                prop.children [
                    Html.div [
                        StaticTable TableHorizontal
                            [ [ Html.text "Grade: " ] @ [ for point in data -> Html.text $"{point.name}  "  ]
                              [ Html.text "Mark: "  ] @ [ for point in data -> Html.text point.value ] ]
                    ]
                    Accordion [
                        Html.text "Table of Marks (randomly generated)",
                        Html.div [
                            prop.className "max-w-max"
                            prop.children [
                                let chunks = List.chunkBySize 15 marks
                                StaticTable TableHorizontal
                                    (chunks |> List.map (fun row ->
                                        row |> List.map (fun p ->
                                            Html.text p)
                                        |> (@) [ Html.none ]))
                            ]
                        ]
                    ]
                ]
            ]

            Html.div [
                prop.className ""
                prop.children [
                    let barChart = Recharts.barChart [
                        barChart.data data
                        barChart.children [
                            Recharts.xAxis [ xAxis.dataKey (fun point -> point.name) ]
                            Recharts.yAxis []
                            Recharts.tooltip []
                            Recharts.bar [
                                bar.dataKey (fun point -> point.value)
                                bar.fill "#8C3"
                                bar.fillOpacity 0.4
                                bar.stroke "#8C3"
                                bar.strokeWidth 2
                                bar.strokeOpacity 0.8
                            ]
                        ]
                    ]
                    let barDescrip = Html.div [
                        Html.text ""
                    ]

                    let pieChart = Recharts.pieChart [
                        let colors =
                            [ "#0088FE"
                              "#00C49F"
                              "#FFBB28"
                              "#FF8042" ]
                        let cells =
                            data |> List.mapi (fun i point ->
                                let color = colors.[i % colors.Length]
                                Recharts.cell [
                                    cell.fill color
                                    cell.fillOpacity 0.5
                                    cell.stroke color
                                    cell.strokeOpacity 0.8
                                    cell.strokeWidth 2
                                ])
                        pieChart.children [
                            Recharts.pie [
                                pie.data data
                                pie.dataKey (fun point -> point.value)
                                pie.labelLine false
                                pie.children cells
                                pie.label (fun prop ->
                                    if prop.percent <> 0 then
                                        let radius = prop.innerRadius + 0.7*(prop.outerRadius - prop.innerRadius);
                                        let angle  = Math.PI / 180.0
                                        Svg.text [
                                            svg.fill color.darkSlateGray
                                            svg.x (prop.cx + radius * cos (-prop.midAngle * angle))
                                            svg.y (prop.cy + radius * sin (-prop.midAngle * angle))
                                            svg.dominantBaseline.central
                                            svg.text ($"{symbol (10*(prop.index + 1))} - %.0f{prop.percent * 100.0}%%")
                                        ]
                                    else Html.none)
                            ]
                        ]
                    ]
                    let pieDescrip = Html.div [
                        Html.text ""
                    ]

                    chartContainer barChart barDescrip false
                    chartContainer pieChart pieDescrip true
                ]
            ]
        ]

    [<ReactComponent>]
    let ScatterPlots () =
        let bestFit, setBestFit = React.useState false
        let meanX = pairData |> List.map (fun point -> float (fst point)) |> List.average
        let meanY = pairData |> List.map (fun point -> float (snd point)) |> List.average
        let numer = pairData |> List.sumBy (fun point -> (fst point - meanX)*(snd point - meanY))
        let denom = pairData |> List.sumBy (fun point -> (fst point - meanX)**2)
        let m = numer / denom
        let b = meanY - m*meanX
        Html.div [
            let scatterPlot = Recharts.composedChart [
                composedChart.children [
                    Recharts.cartesianGrid []
                    Recharts.yAxis [ yAxis.dataKey (fun (point: int * int) -> snd point) ]

                    Recharts.xAxis [
                        xAxis.dataKey (fun (point: float * float) -> fst point)
                        xAxis.domain (domain.constant 0, domain.max)
                        xAxis.xAxisId 1
                    ]
                    Recharts.scatter [
                        scatter.data pairData
                        scatter.fill "#2C8"
                        scatter.xAxisId 1
                    ]

                    if bestFit then
                        Recharts.xAxis [
                            xAxis.domain (domain.constant 0, domain.constant 1)
                            xAxis.hide true
                            xAxis.xAxisId 2
                        ]
                        Recharts.line [
                            line.data
                                [ {| x = 0; y = b |}
                                  {| x = 1; y = b + 1000.0*m |} ]
                            line.dataKey (fun (point: {| x:float; y:float |}) -> point.y)
                            line.stroke "#D38"
                            line.strokeWidth 2
                            line.dot false
                            line.xAxisId 2
                        ]
                ]
            ]
            let scatterDescrip = Html.div [
                Listbox [ "a"; "b"; "c" ] (fun x -> printfn $"{x}")
                Checkbox (TextString "Line of Best Fit") bestFit (fun e -> setBestFit e)
                Html.hr [ prop.className "my-2" ]
                Html.text "description for the scatter plot and line of best fit"
            ]

            chartContainer scatterPlot scatterDescrip true
        ]

    let CumulativeFrequency () =
        Html.div [

        ]

    let Correlation () =
        Html.div [

        ]

    let LinesofBestFit () =
        Html.div [

        ]

    let tabs =
        [ "Mean, Median, Mode and Range", MMMaR ()
          "Bar and Pie Charts"          , BarPieCharts ()
          "Scatter Plots"               , ScatterPlots ()
          "Cumulative Frequency"        , CumulativeFrequency ()
          "Correlation"                 , Correlation ()
          "Lines of Best Fit"           , LinesofBestFit () ]

    let view tab =
        Tabbed tab tabs
