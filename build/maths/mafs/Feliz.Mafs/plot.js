import { toString, Record } from "../../fable_modules/fable-library.4.9.0/Types.js";
import { tuple_type, record_type, string_type, lambda_type, float64_type } from "../../fable_modules/fable-library.4.9.0/Reflection.js";
import { Theme } from "./common.js";
import { createElement } from "react";
import React from "react";
import { Plot } from "mafs";
import { createObj } from "../../fable_modules/fable-library.4.9.0/Util.js";
import { ofArray } from "../../fable_modules/fable-library.4.9.0/List.js";
import { some } from "../../fable_modules/fable-library.4.9.0/Option.js";
import { Vec2_$ctor_52AF8430, Vec2__get_array, vec, Vec2_$reflection } from "./maths.js";

export class Plot_Props extends Record {
    constructor(fn, color, opacity, weight, style, minDepth, maxDepth) {
        super();
        this.fn = fn;
        this.color = color;
        this.opacity = opacity;
        this.weight = weight;
        this.style = style;
        this.minDepth = minDepth;
        this.maxDepth = maxDepth;
    }
}

export function Plot_Props_$reflection() {
    return record_type("Feliz.Mafs.Plot.Plot.Props", [], Plot_Props, () => [["fn", lambda_type(float64_type, float64_type)], ["color", string_type], ["opacity", float64_type], ["weight", float64_type], ["style", string_type], ["minDepth", float64_type], ["maxDepth", float64_type]]);
}

export function Plot_Props_get_Default() {
    return new Plot_Props((x) => x, Theme.foreground, 1, 2, "solid", 8, 15);
}

export class Plot_InequalityPair extends Record {
    constructor(lower, upper) {
        super();
        this.lower = lower;
        this.upper = upper;
    }
}

export function Plot_InequalityPair_$reflection() {
    return record_type("Feliz.Mafs.Plot.Plot.InequalityPair", [], Plot_InequalityPair, () => [["lower", tuple_type(string_type, lambda_type(float64_type, float64_type))], ["upper", tuple_type(string_type, lambda_type(float64_type, float64_type))]]);
}

export function Plot_InequalityPair_get_Default() {
    return new Plot_InequalityPair([">", (x) => x], ["<=", (y) => 5]);
}

export function Plot_create(fn) {
    const bind$0040 = Plot_Props_get_Default();
    return new Plot_Props(fn, bind$0040.color, bind$0040.opacity, bind$0040.weight, bind$0040.style, bind$0040.minDepth, bind$0040.maxDepth);
}

export function Plot_color(color, props) {
    return new Plot_Props(props.fn, color, props.opacity, props.weight, props.style, props.minDepth, props.maxDepth);
}

export function Plot_weight(weight, props) {
    return new Plot_Props(props.fn, props.color, props.opacity, weight, props.style, props.minDepth, props.maxDepth);
}

export function Plot_opacity(opacity, props) {
    return new Plot_Props(props.fn, props.color, opacity, props.weight, props.style, props.minDepth, props.maxDepth);
}

export function Plot_style(style, props) {
    return new Plot_Props(props.fn, props.color, props.opacity, props.weight, style, props.minDepth, props.maxDepth);
}

export function Plot_minDepth(depth, props) {
    return new Plot_Props(props.fn, props.color, props.opacity, props.weight, props.style, depth, props.maxDepth);
}

export function Plot_maxDepth(depth, props) {
    return new Plot_Props(props.fn, props.color, props.opacity, props.weight, props.style, props.minDepth, depth);
}

export function Plot_render(plot_renderInputProps) {
    const props = plot_renderInputProps.props;
    const axis = plot_renderInputProps.axis;
    if (axis.tag === 1) {
        return createElement(Plot.OfY, {
            x: props.fn,
            color: props.color,
            opacity: props.opacity,
            weight: props.weight,
            style: props.style,
            minSamplingDepth: props.minDepth,
            maxSamplingDepth: props.maxDepth,
        });
    }
    else {
        return createElement(Plot.OfX, {
            y: props.fn,
            color: props.color,
            opacity: props.opacity,
            weight: props.weight,
            style: props.style,
            minSamplingDepth: props.minDepth,
            maxSamplingDepth: props.maxDepth,
        });
    }
}

export function Plot_renderInequality(axis, leq, ueq, lprop, uprop) {
    let copyOfStruct_2, copyOfStruct_3, copyOfStruct, copyOfStruct_1;
    if (axis.tag === 1) {
        return createElement(Plot.Inequality, {
            x: some(createObj(ofArray([[(copyOfStruct_2 = leq, toString(copyOfStruct_2)), lprop.fn], [(copyOfStruct_3 = ueq, toString(copyOfStruct_3)), uprop.fn]]))),
            upperColor: uprop.color,
            upperOpacity: uprop.opacity,
            upperWeight: uprop.weight,
            lowerColor: lprop.color,
            lowerOpacity: lprop.opacity,
            lowerWeight: lprop.weight,
        });
    }
    else {
        return createElement(Plot.Inequality, {
            y: some(createObj(ofArray([[(copyOfStruct = leq, toString(copyOfStruct)), lprop.fn], [(copyOfStruct_1 = ueq, toString(copyOfStruct_1)), uprop.fn]]))),
            upperColor: uprop.color,
            upperOpacity: uprop.opacity,
            upperWeight: uprop.weight,
            lowerColor: lprop.color,
            lowerOpacity: lprop.opacity,
            lowerWeight: lprop.weight,
        });
    }
}

export class Parametric_Props extends Record {
    constructor(fn, t, color, opacity, weight, style, minDepth, maxDepth) {
        super();
        this.fn = fn;
        this.t = t;
        this.color = color;
        this.opacity = opacity;
        this.weight = weight;
        this.style = style;
        this.minDepth = minDepth;
        this.maxDepth = maxDepth;
    }
}

export function Parametric_Props_$reflection() {
    return record_type("Feliz.Mafs.Plot.Parametric.Props", [], Parametric_Props, () => [["fn", lambda_type(float64_type, Vec2_$reflection())], ["t", Vec2_$reflection()], ["color", string_type], ["opacity", float64_type], ["weight", float64_type], ["style", string_type], ["minDepth", float64_type], ["maxDepth", float64_type]]);
}

export function Parametric_Props_get_Default() {
    return new Parametric_Props((t) => vec(1 - t, t - 1), vec(0, 1), Theme.foreground, 1, 2, "solid", 8, 15);
}

export function Parametric_create(fn) {
    const bind$0040 = Parametric_Props_get_Default();
    return new Parametric_Props(fn, bind$0040.t, bind$0040.color, bind$0040.opacity, bind$0040.weight, bind$0040.style, bind$0040.minDepth, bind$0040.maxDepth);
}

export function Parametric_color(color, props) {
    return new Parametric_Props(props.fn, props.t, color, props.opacity, props.weight, props.style, props.minDepth, props.maxDepth);
}

export function Parametric_weight(weight, props) {
    return new Parametric_Props(props.fn, props.t, props.color, props.opacity, weight, props.style, props.minDepth, props.maxDepth);
}

export function Parametric_opacity(opacity, props) {
    return new Parametric_Props(props.fn, props.t, props.color, opacity, props.weight, props.style, props.minDepth, props.maxDepth);
}

export function Parametric_style(style, props) {
    return new Parametric_Props(props.fn, props.t, props.color, props.opacity, props.weight, style, props.minDepth, props.maxDepth);
}

export function Parametric_minDepth(depth, props) {
    return new Parametric_Props(props.fn, props.t, props.color, props.opacity, props.weight, props.style, depth, props.maxDepth);
}

export function Parametric_maxDepth(depth, props) {
    return new Parametric_Props(props.fn, props.t, props.color, props.opacity, props.weight, props.style, props.minDepth, depth);
}

export function Parametric_render(parametric_renderInputProps) {
    const props = parametric_renderInputProps.props;
    const t = parametric_renderInputProps.t;
    return createElement(Plot.Parametric, {
        xy: (t_1) => Vec2__get_array(props.fn(t_1)),
        t: Vec2__get_array(t),
        color: props.color,
        opacity: props.opacity,
        style: props.style,
        minSamplingDepth: props.minDepth,
        maxSamplingDepth: props.maxDepth,
    });
}

export class VectorField_Props extends Record {
    constructor(fn, opacity, step, opacityStep, color) {
        super();
        this.fn = fn;
        this.opacity = opacity;
        this.step = step;
        this.opacityStep = opacityStep;
        this.color = color;
    }
}

export function VectorField_Props_$reflection() {
    return record_type("Feliz.Mafs.Plot.VectorField.Props", [], VectorField_Props, () => [["fn", lambda_type(Vec2_$reflection(), Vec2_$reflection())], ["opacity", lambda_type(Vec2_$reflection(), float64_type)], ["step", float64_type], ["opacityStep", float64_type], ["color", string_type]]);
}

export function VectorField_Props_get_Default() {
    return new VectorField_Props((p) => p, (p_1) => 1, 1, 1, Theme.foreground);
}

export function VectorField_create(fn) {
    const bind$0040 = VectorField_Props_get_Default();
    return new VectorField_Props(fn, bind$0040.opacity, bind$0040.step, bind$0040.opacityStep, bind$0040.color);
}

export function VectorField_opacity(opacity, props) {
    return new VectorField_Props(props.fn, opacity, props.step, props.opacityStep, props.color);
}

export function VectorField_step(step, props) {
    return new VectorField_Props(props.fn, props.opacity, step, props.opacityStep, props.color);
}

export function VectorField_opacityStep(opacityStep, props) {
    return new VectorField_Props(props.fn, props.opacity, props.step, opacityStep, props.color);
}

export function VectorField_color(color, props) {
    return new VectorField_Props(props.fn, props.opacity, props.step, props.opacityStep, color);
}

export function VectorField_render(props) {
    return createElement(Plot.VectorField, {
        xy: (p) => Vec2__get_array(props.fn(Vec2_$ctor_52AF8430(p))),
        step: props.step,
        xyOpacity: (p_1) => props.opacity(Vec2_$ctor_52AF8430(p_1)),
        opacityStep: props.opacityStep,
        color: props.color,
    });
}

