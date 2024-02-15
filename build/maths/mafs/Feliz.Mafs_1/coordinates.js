import { Record } from "../../fable_modules/fable-library.4.9.0/Types.js";
import { Axis_get_Default, Axis_$reflection } from "./common.js";
import { record_type, float64_type, option_type } from "../../fable_modules/fable-library.4.9.0/Reflection.js";
import { createElement } from "react";
import React from "react";
import { Coordinates } from "mafs";

export class Cartesian_Props extends Record {
    constructor(xAxis, yAxis, subDiv) {
        super();
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.subDiv = subDiv;
    }
}

export function Cartesian_Props_$reflection() {
    return record_type("Feliz.Mafs.Coordinates.Cartesian.Props", [], Cartesian_Props, () => [["xAxis", option_type(Axis_$reflection())], ["yAxis", option_type(Axis_$reflection())], ["subDiv", float64_type]]);
}

export function Cartesian_Props_get_Default() {
    return new Cartesian_Props(Axis_get_Default(), Axis_get_Default(), 1);
}

export function Cartesian_create() {
    return Cartesian_Props_get_Default();
}

export function Cartesian_xAxis(xAxis, props) {
    return new Cartesian_Props(xAxis, props.yAxis, props.subDiv);
}

export function Cartesian_yAxis(yAxis, props) {
    return new Cartesian_Props(props.xAxis, yAxis, props.subDiv);
}

export function Cartesian_subDiv(subDiv, props) {
    return new Cartesian_Props(props.xAxis, props.yAxis, subDiv);
}

export function Cartesian_render(props) {
    const render = (x, y) => createElement(Coordinates.Cartesian, {
        xAxis: x,
        yAxis: y,
        subdivisions: props.subDiv,
    });
    const matchValue = props.xAxis;
    if (matchValue != null) {
        const xAxis = matchValue;
        const matchValue_2 = props.yAxis;
        if (matchValue_2 != null) {
            return render(xAxis, matchValue_2);
        }
        else {
            return render(xAxis, false);
        }
    }
    else {
        const matchValue_1 = props.yAxis;
        if (matchValue_1 != null) {
            return render(false, matchValue_1);
        }
        else {
            return render(false, false);
        }
    }
}

export class Polar_Props extends Record {
    constructor(xAxis, yAxis, lines, subDiv) {
        super();
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.lines = lines;
        this.subDiv = subDiv;
    }
}

export function Polar_Props_$reflection() {
    return record_type("Feliz.Mafs.Coordinates.Polar.Props", [], Polar_Props, () => [["xAxis", option_type(Axis_$reflection())], ["yAxis", option_type(Axis_$reflection())], ["lines", float64_type], ["subDiv", float64_type]]);
}

export function Polar_Props_get_Default() {
    return new Polar_Props(Axis_get_Default(), Axis_get_Default(), 1, 1);
}

export function Polar_create() {
    return Polar_Props_get_Default();
}

export function Polar_xAxis(xAxis, props) {
    return new Polar_Props(xAxis, props.yAxis, props.lines, props.subDiv);
}

export function Polar_yAxis(yAxis, props) {
    return new Polar_Props(props.xAxis, yAxis, props.lines, props.subDiv);
}

export function Polar_lines(lines, props) {
    return new Polar_Props(props.xAxis, props.yAxis, lines, props.subDiv);
}

export function Polar_subDiv(subDiv, props) {
    return new Polar_Props(props.xAxis, props.yAxis, props.lines, subDiv);
}

export function Polar_render(props) {
    const render = (x, y) => createElement(Coordinates.Polar, {
        xAxis: x,
        yAxis: y,
        lines: props.lines,
        subdivisions: props.subDiv,
    });
    const matchValue = props.xAxis;
    if (matchValue != null) {
        const xAxis = matchValue;
        const matchValue_2 = props.yAxis;
        if (matchValue_2 != null) {
            return render(xAxis, matchValue_2);
        }
        else {
            return render(xAxis, false);
        }
    }
    else {
        const matchValue_1 = props.yAxis;
        if (matchValue_1 != null) {
            return render(false, matchValue_1);
        }
        else {
            return render(false, false);
        }
    }
}

