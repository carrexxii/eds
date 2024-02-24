namespace EDS.Maths.IG

open System
open Feliz
open Feliz.Recharts

open EDS.Shared
open EDS.Shared.Services
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

    // TODO: fetch list from server
    let singleDataSets = [ "Heights"; "Grades" ]
    let pairDataSets =
        [ "Strong Positive Correlation"
          "Weak Positive Correlation"
          "Strong Negative Correlation"
          "Weak Negative Correlation"
          "Random" ]

    let loadData name dest =
        async {
            let! data = resourceService.getMathsData name
            dest data
        } |> Async.StartImmediate

    type DataPoint =
        { name  : string
          values: int list }
        static member toKeys   = List.map (fun p -> p.name)
        static member toValues = List.map (fun p -> p.values)
        static member toPairs  = List.map (fun p -> p.name, p.values)

    let groupData name data =
        match data with
        | SingleData data ->
            data |> List.groupBy (
                match name with
                | "Heights" -> fun v ->
                    let v = v / 10
                    $"{v*10}-{v*10 + 9}"
                | "Grades" -> fun v ->
                    let v = max 0 (min 99 v)
                    [ "Ungraded"; "Ungraded"; "G"; "F"; "E"; "D"; "C"; "B"; "A"; "A*" ]
                    |> _.Item(v / 10)
                | dset -> fun v ->
                    printfn $"groupData not implmemented for '{dset}'"
                    "")
            |> List.map (fun (n, v) -> { name = n; values = v })
        | PairData data ->
            data |> List.map (fun (x, y) -> { name = x.ToString (); values = [ y ] })

    let chartContainer chart descrip rev =
        Html.div [
            prop.className $"""flex flex-col{if rev then "-reverse" else ""} gap-12"""
            prop.children [
                Recharts.responsiveContainer [
                    responsiveContainer.width (length.percent 100)
                    responsiveContainer.height 600
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
        let dataSet, setDataSet = React.useState "Heights"
        let data   , setData    = React.useState None
        React.useEffect ((fun () -> loadData dataSet setData), [| box dataSet |])

        if data.IsNone then Loading ()
        else
            let data = groupData dataSet data.Value
            Html.div [
                let barChart = Recharts.barChart [
                    barChart.data data
                    barChart.children [
                        Recharts.xAxis [ xAxis.dataKey (fun point -> point.name) ]
                        Recharts.yAxis []
                        Recharts.tooltip []
                        Recharts.bar [
                            bar.dataKey (fun point -> point.values.Length)
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
                        Popup "Data" (dataTable (dataSet, "Frequency") (DataPoint.toPairs data))
                        Html.hr [ prop.className "my-2" ]
                        Listbox (fun x -> setDataSet x) singleDataSets
                    ]
                ]

                chartContainer barChart barDescrip true
            ]

    [<ReactComponent>]
    let PieCharts () =
        let dataSet   , setDataSet    = React.useState "Heights"
        let data      , setData       = React.useState None
        let showLegend, setShowLegend = React.useState false
        let showInner , setShowInner  = React.useState true
        React.useEffect ((fun () -> loadData dataSet setData), [| box dataSet |])

        if data.IsNone then Loading ()
        else
            let data = groupData dataSet data.Value
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
                                    Html.text $"{data[i].name} - {data[i].values.Length}")
                            ]
                        Recharts.pie [
                            pie.data data
                            pie.dataKey (fun point -> point.values.Length)
                            pie.labelLine false
                            pie.children cells
                            pie.label (fun prop ->
                                if prop.percent <> 0 then
                                    let radius = prop.innerRadius + 0.7*(prop.outerRadius - prop.innerRadius)
                                    let angle  = Math.PI / 180.0
                                    Svg.text [
                                        svg.fill color.darkSlateGray
                                        svg.x (prop.cx + radius * cos (-prop.midAngle * angle))
                                        svg.y (prop.cy + radius * sin (-prop.midAngle * angle))
                                        svg.dominantBaseline.central
                                        if showInner then
                                            svg.text ($"{data[prop.index].name} - %.0f{prop.percent * 100.0}%%")
                                    ]
                                else Html.none)
                        ]
                    ]
                ]

                let pieDescrip = Html.div [
                    prop.className "w-1/2 text-center"
                    prop.children [
                        Popup "Data" (dataTable (dataSet, "Frequency") (DataPoint.toPairs data))
                        Html.hr [ prop.className "my-2" ]
                        Listbox (fun x -> setDataSet x) singleDataSets
                        CheckList "Options"
                            [ TextString "Show Legend", showLegend, (fun e -> setShowLegend e)
                              TextString "Show Inner" , showInner , (fun e -> setShowInner  e) ]
                    ]
                ]

                chartContainer pieChart pieDescrip true
            ]

    [<ReactComponent>]
    let ScatterPlots () =
        let dataSet, setDataSet = React.useState pairDataSets[0]
        let bestFit, setBestFit = React.useState false
        let data   , setData    = React.useState None
        React.useEffect ((fun () ->
            let dataSet = dataSet.ToLower ()
            if dataSet <> "random"
            then loadData dataSet setData
            else
                [ for _ in 1..50 do
                    rand.Next () % 100,
                    rand.Next () % 100 ]
                |> (PairData >> Some)
                |> setData),
            [| box dataSet |])

        if data.IsNone then Loading ()
        else
            let data = groupData dataSet data.Value
                       |> List.map (fun p -> {| x = float p.name
                                                y = float p.values[0] |})
            let meanX = data |> List.averageBy (fun point -> point.x)
            let meanY = data |> List.averageBy (fun point -> point.y)
            let numer = data |> List.sumBy (fun point -> (point.x - meanX)*(point.y - meanY))
            let denom = data |> List.sumBy (fun point -> (point.x - meanX)**2)
            let m = numer / denom
            let b = meanY - m*meanX
            let size = 20
            Html.div [
                let scatterPlot = Recharts.composedChart [
                    composedChart.children [
                        Recharts.cartesianGrid []
                        Recharts.yAxis [
                            yAxis.dataKey (fun (point: {| x: float; y: float |}) -> point.x)
                            yAxis.domain (domain.constant 0, domain.constant size)
                        ]

                        Recharts.xAxis [
                            xAxis.number
                            xAxis.dataKey (fun (point: {| x: float; y: float |}) -> point.y)
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
                                    [ 0, b
                                      1, b + m*float size ]
                                line.dataKey (fun (point: float * float) -> snd point)
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
                        // Popup "Data" (dataTable ("X: ", "Y: ") data)
                        Html.hr [ prop.className "my-2" ]
                        Listbox (fun x -> setDataSet x) pairDataSets
                        Checkbox (TextString "Line of Best Fit") bestFit (fun e -> setBestFit e)
                        Html.hr [ prop.className "my-2" ]
                        Html.text "description for the scatter plot and line of best fit"
                    ]
                ]

                chartContainer scatterPlot scatterDescrip true
            ]

    [<ReactComponent>]
    let CumulativeFrequency () =
        let dataSet, setDataSet = React.useState "Heights"
        let data   , setData    = React.useState None
        React.useEffect ((fun () -> loadData dataSet setData), [| box dataSet |])

        if data.IsNone then Html.text "Loading..."
        else
            let data = data.Value.single

            let dataMin = List.min data
            let dataMax = List.max data
            let lower  = data[float data.Length * 0.25 |> int]
            let median = data[float data.Length * 0.50 |> int]
            let upper  = data[float data.Length * 0.75 |> int]
            let data =
                [ 0, dataMin
                  data |> List.filter (fun v -> float v <= lower)  |> List.length, lower
                  data |> List.filter (fun v -> float v <= median) |> List.length, median
                  data |> List.filter (fun v -> float v <= upper)  |> List.length, upper
                  data.Length, dataMax ]
            Html.div [
                let lineChart = Recharts.lineChart [
                    lineChart.data data
                    lineChart.margin (0, 25, 25, 25)
                    lineChart.children [
                        Recharts.xAxis [
                            xAxis.number
                            xAxis.domain (domain.constant dataMin, domain.constant dataMax)
                            xAxis.dataKey (fun (point: int * int) -> snd point)
                            xAxis.label (dataSet, 0, Label.Position.Bottom)
                        ]
                        Recharts.yAxis [
                            yAxis.dataKey (fun (point: int * int) -> fst point)
                            yAxis.label ("Frequency", -90, Label.Position.Left)
                        ]

                        Recharts.line [
                            line.monotone
                            line.dataKey (fun (point: int * int) -> fst point)
                            line.stroke colors[5]
                            // line.dot false
                        ]
                        Recharts.referenceLine [
                            referenceLine.label "Lower Quartile"
                            referenceLine.x lower
                        ]
                        Recharts.referenceLine [
                            referenceLine.label "Median"
                            referenceLine.x median
                        ]
                        Recharts.referenceLine [
                            referenceLine.label "Upper Quartile"
                            referenceLine.x upper
                        ]
                    ]
                ]

                let lineDescrip = Html.div [
                    prop.className "w-full text-center"
                    prop.children [
                        Popup "Data" (dataTable ("X: ", "Y: ") data)
                        Html.hr [ prop.className "my-2" ]
                        Listbox (fun x -> setDataSet x) singleDataSets
                        Html.hr [ prop.className "my-2" ]
                        Html.text "description for the scatter plot and line of best fit"
                    ]
                ]

                chartContainer lineChart lineDescrip true
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
