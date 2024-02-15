import { Record } from "../fable_modules/fable-library.4.9.0/Types.js";
import { record_type, int32_type, string_type } from "../fable_modules/fable-library.4.9.0/Reflection.js";
import { nonSeeded } from "../fable_modules/fable-library.4.9.0/Random.js";
import { map, append, singleton, collect, delay, toList } from "../fable_modules/fable-library.4.9.0/Seq.js";
import { rangeDouble } from "../fable_modules/fable-library.4.9.0/Range.js";
import { item, mapIndexed, toArray, map as map_1, chunkBySize, ofArray, singleton as singleton_1, append as append_1, filter, length } from "../fable_modules/fable-library.4.9.0/List.js";
import { interpolate, toText, toConsole } from "../fable_modules/fable-library.4.9.0/String.js";
import { createElement } from "react";
import React from "react";
import { equals, createObj } from "../fable_modules/fable-library.4.9.0/Util.js";
import { Tabbed, Accordion, TableDirection, StaticTable } from "../shared/components.js";
import { Interop_reactApi } from "../fable_modules/Feliz.2.7.0/Interop.fs.js";
import { defaultOf } from "../fable_modules/fable-library.4.9.0/Util.js";
import { Interop_reactApi as Interop_reactApi_1 } from "../fable_modules/Feliz.2.7.0/Interop.fs.js";
import { PieChart, Pie, Cell, BarChart, Bar, Tooltip, YAxis, XAxis, ResponsiveContainer } from "recharts";

export class Point extends Record {
    constructor(name, value) {
        super();
        this.name = name;
        this.value = (value | 0);
    }
}

export function Point_$reflection() {
    return record_type("EDS.Maths.IG.Statistics.Point", [], Point, () => [["name", string_type], ["value", int32_type]]);
}

export const rand = nonSeeded();

export const marks = toList(delay(() => collect((x) => {
    const mark = (rand.Next0() % 100) | 0;
    return ((mark < 30) && ((mark % 2) === 0)) ? singleton(mark * 2) : (((mark > 80) && ((mark % 2) === 0)) ? singleton(~~(mark / 2)) : singleton(mark));
}, rangeDouble(1, 1, 75))));

export function symbol(_arg) {
    if (_arg >= 90) {
        return "A*";
    }
    else if (_arg >= 80) {
        return "A";
    }
    else if (_arg >= 70) {
        return "B";
    }
    else if (_arg >= 60) {
        return "C";
    }
    else if (_arg >= 50) {
        return "D";
    }
    else if (_arg >= 40) {
        return "E";
    }
    else if (_arg >= 30) {
        return "F";
    }
    else if (_arg >= 20) {
        return "G";
    }
    else {
        return "Ungraded";
    }
}

export const data = toList(delay(() => collect((grade) => {
    const grade_1 = symbol(10 * (grade + 1));
    return singleton(new Point(grade_1, length(filter((mark) => {
        toConsole(`${mark} -> ${symbol(mark)} (${symbol(mark) === grade_1})`);
        return symbol(mark) === grade_1;
    }, marks))));
}, rangeDouble(0, 1, 8))));

export function MMMaR() {
    return createElement("div", {});
}

export function ChartsDiagrams() {
    const children_6 = toList(delay(() => {
        let elems_1, children, elems;
        return append(singleton(createElement("div", createObj(ofArray([["className", "flex flex-row gap-20"], (elems_1 = [(children = singleton_1(createElement(StaticTable, {
            dir: new TableDirection(0, []),
            xs: ofArray([append_1(singleton_1("Grade: "), toList(delay(() => map((point) => (`${point.name}  `), data)))), append_1(singleton_1("Mark: "), toList(delay(() => map((point_1) => point_1.value, data))))]),
        })), createElement("div", {
            children: Interop_reactApi.Children.toArray(Array.from(children)),
        })), createElement(Accordion, {
            xs: singleton_1(["Table of Marks (randomly generated)", createElement("div", createObj(ofArray([["className", "max-w-max"], (elems = toList(delay(() => {
                const chunks = chunkBySize(15, marks);
                return singleton(createElement(StaticTable, {
                    dir: new TableDirection(0, []),
                    xs: map_1((row) => {
                        const list_2 = map_1((p) => p, row);
                        return append_1(singleton_1(defaultOf()), list_2);
                    }, chunks),
                }));
            })), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))]),
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), delay(() => {
            let elems_6;
            const chartContainer = (chart, descrip, rev) => {
                let elems_2, properties_2, value_15;
                return createElement("div", createObj(ofArray([["className", `flex flex-col${rev ? "-reverse" : ""}`], (elems_2 = [(properties_2 = ofArray([(value_15 = (100 + "%"), (equals(value_15, 100 + "%") ? true : equals(value_15, 100 + "%")) ? ["width", 99 + "%"] : ["width", value_15]), ["height", 500], ["children", chart]]), Interop_reactApi_1.createElement(ResponsiveContainer, createObj(properties_2))), descrip], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])));
            };
            return singleton(createElement("div", createObj(ofArray([["className", ""], (elems_6 = toList(delay(() => {
                let elements;
                let barChart;
                const properties_8 = ofArray([["data", toArray(data)], (elements = ofArray([Interop_reactApi_1.createElement(XAxis, {
                    dataKey: (point_2) => point_2.name,
                }), Interop_reactApi_1.createElement(YAxis, {}), Interop_reactApi_1.createElement(Tooltip, {}), Interop_reactApi_1.createElement(Bar, {
                    dataKey: (point_3) => point_3.value,
                    fill: "#8C3",
                    fillOpacity: 0.4,
                    stroke: "#8C3",
                    strokeWidth: 2,
                    strokeOpacity: 0.8,
                })]), ["children", Interop_reactApi.Children.toArray(Array.from(elements))])]);
                barChart = Interop_reactApi_1.createElement(BarChart, createObj(properties_8));
                const barDescrip = createElement("div", {
                    children: Interop_reactApi.Children.toArray([""]),
                });
                let pieChart;
                const properties_12 = toList(delay(() => {
                    let elements_2, properties_11;
                    const colors = ofArray(["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]);
                    const cells = mapIndexed((i, point_4) => {
                        const color_2 = item(i % length(colors), colors);
                        return Interop_reactApi_1.createElement(Cell, {
                            fill: color_2,
                            fillOpacity: 0.5,
                            stroke: color_2,
                            strokeOpacity: 0.8,
                            strokeWidth: 2,
                        });
                    }, data);
                    return singleton((elements_2 = singleton_1((properties_11 = ofArray([["data", toArray(data)], ["dataKey", (point_5) => point_5.value], ["labelLine", false], ["children", ["children", Interop_reactApi.Children.toArray(Array.from(cells))]], ["label", (prop) => {
                        if (prop.percent !== 0) {
                            const radius = prop.innerRadius + (0.7 * (prop.outerRadius - prop.innerRadius));
                            const angle = 3.141592653589793 / 180;
                            return createElement("text", {
                                fill: "#2F4F4F",
                                x: prop.cx + (radius * Math.cos(-prop.midAngle * angle)),
                                y: prop.cy + (radius * Math.sin(-prop.midAngle * angle)),
                                dominantBaseline: "central",
                                children: toText(interpolate("%P() - %.0f%P()%%", [symbol(10 * (prop.index + 1)), prop.percent * 100])),
                            });
                        }
                        else {
                            return defaultOf();
                        }
                    }]]), Interop_reactApi_1.createElement(Pie, createObj(properties_11)))), ["children", Interop_reactApi.Children.toArray(Array.from(elements_2))]));
                }));
                pieChart = Interop_reactApi_1.createElement(PieChart, createObj(properties_12));
                const pieDescrip = createElement("div", {
                    children: Interop_reactApi.Children.toArray([""]),
                });
                return append(singleton(chartContainer(barChart, barDescrip, false)), delay(() => singleton(chartContainer(pieChart, pieDescrip, true))));
            })), ["children", Interop_reactApi.Children.toArray(Array.from(elems_6))])]))));
        }));
    }));
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children_6)),
    });
}

export function CumulativeFrequency() {
    return createElement("div", {});
}

export function Correlation() {
    return createElement("div", {});
}

export function LinesofBestFit() {
    return createElement("div", {});
}

export const tabs = ofArray([["Mean, Median, Mode and Range", MMMaR()], ["Charts and Diagrams", createElement(ChartsDiagrams, null)], ["Cumulative Frequency", CumulativeFrequency()], ["Correlation", Correlation()], ["Lines of Best Fit", LinesofBestFit()]]);

export function view(tab) {
    return createElement(Tabbed, {
        tabName: tab,
        tabs: tabs,
    });
}

