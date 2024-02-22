namespace EDS.Maths.IG

open System

open Feliz
open Feliz.Recharts

open EDS.Shared
open EDS.Shared.Components

module Statistics =
    let rand = Random ()
    let colors =
        [ "#00876c"
          "#64ac72"
          "#afcf7a"
          "#ffee8c"
          "#fab661"
          "#ed7c4f"
          "#d43d51" ]

    let heightData =
        [ "140-149", 4
          "150-159", 23
          "160-169", 47
          "170-179", 35
          "180-189", 8
          "190-199", 1 ]
    let gradeData =
        [ "G" , 4
          "F" , 8
          "E" , 17
          "D" , 27
          "C" , 31
          "B" , 25
          "A" , 7
          "A*", 3 ]

    let singleDataSets =
        Map [ "Heights", heightData
              "Grades" , gradeData ]

    let spData =
        [ 3, 2 ; 4 , 2 ; 4 , 4 ; 5 , 4 ; 1 , 2; 3 , 3 ; 6 , 3
          5, 6 ; 4 , 5 ; 6 , 6 ; 9 , 7 ; 8 , 9; 6 , 8 ; 9 , 7
          9, 11; 12, 13; 10, 12; 10, 14; 12, 9; 11, 11; 13, 15 ]
    let wpData =
        [ 1 , 3 ; 2 , 5 ; 4 , 7 ; 4, 3 ; 2 , 9 ; 3 , 6 ; 2 , 8
          6 , 6 ; 8 , 5 ; 8 , 8 ; 6, 12; 12, 7 ; 8 , 6 ; 6 , 9
          10, 10; 11, 11; 13, 11; 9, 12; 15, 13; 15, 10; 11, 15 ]
    let snData = spData |> List.map (fun (p1, p2) -> p1, 20 - p2)
    let wnData = wpData |> List.map (fun (p1, p2) -> p1, 20 - p2)
    let randData =
        [ for y in 1..5 do
            for x in 1..5 do
                rand.Next () % 20,
                rand.Next () % 20 ]
    let pairDataSets =
        Map [ "Strong Positive Correlation", spData
              "Weak Positive Correlation"  , wpData
              "Strong Negative Correlation", snData
              "Weak Negative Correlation"  , wnData
              "Random"                     , randData ]

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

    let dataTable (descrip: string * string) data =
        Html.div [
            prop.className "mx-4"
            prop.children [
                Html.div [
                    StaticTable TableHorizontal
                        [ [ Html.text (fst descrip) ] @ [ for point in data -> Html.text $"{fst point}" ]
                          [ Html.text (snd descrip) ] @ [ for point in data -> Html.text $"{snd point}" ] ]
                ]
            ]
        ]

    [<ReactComponent>]
    let BarCharts () =
        let dataSet, setDataSet = React.useState "Grades"
        let data = singleDataSets[dataSet]
        Html.div [
            let barChart = Recharts.barChart [
                barChart.data data
                barChart.children [
                    Recharts.xAxis [ xAxis.dataKey (fun (point: string * int) -> fst point) ]
                    Recharts.yAxis []
                    Recharts.tooltip []
                    Recharts.bar [
                        bar.dataKey (fun (point: string * int) -> snd point)
                        bar.barSize 9999
                        bar.fill colors[2]
                        bar.fillOpacity 0.4
                        bar.stroke colors[2]
                        bar.strokeWidth 2
                        bar.strokeOpacity 0.8
                    ]
                ]
            ]
            let barDescrip = Html.div [
                prop.className "w-1/2 text-center"
                prop.children [
                    Popup "Data" (dataTable (dataSet, "Frequency") data)
                    Html.hr [ prop.className "my-2" ]
                    Listbox (fun x -> setDataSet x) (singleDataSets.Keys |> List.ofSeq)
                ]
            ]

            chartContainer barChart barDescrip true
        ]

    [<ReactComponent>]
    let PieCharts () =
        let dataSet   , setDataSet    = React.useState "Grades"
        let showLegend, setShowLegend = React.useState false
        let showInner , setShowInner  = React.useState true
        let data = singleDataSets[dataSet]
        Html.div [
            let pieChart = Recharts.pieChart [
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
                    if showLegend then
                        Recharts.legend [
                            legend.formatter (fun _ _ i ->
                                Html.text $"{fst data[i]} - {snd data[i]}")
                        ]
                    Recharts.pie [
                        pie.data data
                        pie.dataKey (fun (point: string * int) -> snd point)
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
                                    if showInner then
                                        svg.text ($"{fst data[prop.index]} - %.0f{prop.percent * 100.0}%%")
                                ]
                            else Html.none)
                    ]
                ]
            ]

            let pieDescrip = Html.div [
                prop.className "w-1/2 text-center"
                prop.children [
                    Popup "Data" (dataTable (dataSet, "Frequency") data)
                    Html.hr [ prop.className "my-2" ]
                    Listbox (fun x -> setDataSet x) (singleDataSets.Keys |> List.ofSeq)
                    CheckList "Options"
                        [ TextString "Show Legend", showLegend, (fun e -> setShowLegend e)
                          TextString "Show Inner" , showInner , (fun e -> setShowInner  e) ]
                ]
            ]

            chartContainer pieChart pieDescrip true
        ]

    [<ReactComponent>]
    let ScatterPlots () =
        let dataSet, setDataSet = React.useState "Random"
        let bestFit, setBestFit = React.useState false
        let meanX = pairDataSets[dataSet] |> List.map (fun point -> float (fst point)) |> List.average
        let meanY = pairDataSets[dataSet] |> List.map (fun point -> float (snd point)) |> List.average
        let numer = pairDataSets[dataSet] |> List.sumBy (fun point -> (float (fst point) - meanX)*(float (snd point) - meanY))
        let denom = pairDataSets[dataSet] |> List.sumBy (fun point -> (float (fst point) - meanX)**2)
        let m = numer / denom
        let b = meanY - m*meanX
        let data = pairDataSets[dataSet]
        let size = 20
        Html.div [
            let scatterPlot = Recharts.composedChart [
                composedChart.children [
                    Recharts.cartesianGrid []
                    Recharts.yAxis [
                        yAxis.dataKey (fun (point: float * float) -> snd point)
                        yAxis.domain (domain.constant 0, domain.constant size)
                    ]

                    Recharts.xAxis [
                        xAxis.number
                        xAxis.dataKey (fun (point: float * float) -> fst point)
                        xAxis.domain (domain.constant 0, domain.constant size)
                        xAxis.xAxisId 1
                    ]
                    Recharts.scatter [
                        scatter.data data
                        scatter.fill "#2C8"
                        scatter.xAxisId 1
                    ]

                    if bestFit then
                        Recharts.xAxis [
                            xAxis.domain (domain.constant 0, domain.constant size)
                            xAxis.hide true
                            xAxis.xAxisId 2
                        ]
                        Recharts.line [
                            line.data
                                [ {| x = 0; y = b |}
                                  {| x = 1; y = b + m*float size |} ]
                            line.dataKey (fun (point: {| x:float; y:float |}) -> point.y)
                            line.stroke "#D38"
                            line.strokeWidth 2
                            line.dot false
                            line.xAxisId 2
                        ]
                ]
            ]
            let scatterDescrip = Html.div [
                prop.className "w-1/2 text-center"
                prop.children [
                    Popup "Data" (dataTable ("X: ", "Y: ") data)
                    Html.hr [ prop.className "my-2" ]
                    Listbox (fun x -> setDataSet x) (pairDataSets.Keys |> List.ofSeq)
                    Checkbox (TextString "Line of Best Fit") bestFit (fun e -> setBestFit e)
                    Html.hr [ prop.className "my-2" ]
                    Html.text "description for the scatter plot and line of best fit"
                ]
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
          "Bar Charts and Histograms"   , BarCharts ()
          "Pie Charts"                  , PieCharts ()
          "Scatter Plots"               , ScatterPlots ()
          "Cumulative Frequency"        , CumulativeFrequency ()
          "Correlation"                 , Correlation ()
          "Lines of Best Fit"           , LinesofBestFit () ]

    let view tab =
        Tabbed tab tabs
