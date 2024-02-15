import { createElement } from "react";
import React from "react";
import katex from "katex";
import { Record } from "../../fable_modules/fable-library.4.9.0/Types.js";
import { record_type, obj_type, float64_type, string_type } from "../../fable_modules/fable-library.4.9.0/Reflection.js";
import { Vec2__get_array, Vec2__get_y, Vec2__get_x, vec, Vec2_$reflection } from "./maths.js";
import { LaTeX, Text as Text$ } from "mafs";
import { some } from "../../fable_modules/fable-library.4.9.0/Option.js";
import { round } from "../../fable_modules/fable-library.4.9.0/Util.js";
import { Theme } from "./common.js";

export function Util_Katex(util_KatexInputProps) {
    const text = util_KatexInputProps.text;
    return createElement("span", {
        dangerouslySetInnerHTML: {
            __html: katex.renderToString(text),
        },
    });
}

export class Text_Props extends Record {
    constructor(text, pos, attachDir, attachDist, size, color, svgProps) {
        super();
        this.text = text;
        this.pos = pos;
        this.attachDir = attachDir;
        this.attachDist = attachDist;
        this.size = size;
        this.color = color;
        this.svgProps = svgProps;
    }
}

export function Text_Props_$reflection() {
    return record_type("Feliz.Mafs.Text.Props", [], Text_Props, () => [["text", string_type], ["pos", Vec2_$reflection()], ["attachDir", string_type], ["attachDist", float64_type], ["size", float64_type], ["color", string_type], ["svgProps", obj_type]]);
}

export function Text_Props_get_Default() {
    return new Text_Props("", vec(0, 0), "n", 0, 24, "#FFF", () => ({}));
}

export function Text_create(text) {
    const bind$0040 = Text_Props_get_Default();
    return new Text_Props(text, bind$0040.pos, bind$0040.attachDir, bind$0040.attachDist, bind$0040.size, bind$0040.color, bind$0040.svgProps);
}

export function Text_pos(pos, props) {
    return new Text_Props(props.text, pos, props.attachDir, props.attachDist, props.size, props.color, props.svgProps);
}

export function Text_size(size, props) {
    return new Text_Props(props.text, props.pos, props.attachDir, props.attachDist, size, props.color, props.svgProps);
}

export function Text_color(color, props) {
    return new Text_Props(props.text, props.pos, props.attachDir, props.attachDist, props.size, color, props.svgProps);
}

export function Text_attach(dir, dist, props) {
    return new Text_Props(props.text, props.pos, dir, dist, props.size, props.color, props.svgProps);
}

export function Text_render(props) {
    return createElement(Text$, {
        children: props.text,
        x: Vec2__get_x(props.pos),
        y: Vec2__get_y(props.pos),
        attach: props.attachDir,
        attachDistance: props.attachDist,
        size: props.size,
        color: props.color,
        svgTextProps: some(props.svgProps),
    });
}

export function Text_point(dp, pt, textPos) {
    return Text_attach("s", -12, Text_pos(textPos, Text_create(`(${round(Vec2__get_x(pt), dp)}, ${round(Vec2__get_y(pt), dp)})`)));
}

export class Latex_Props extends Record {
    constructor(tex, pos, color, katexOptions) {
        super();
        this.tex = tex;
        this.pos = pos;
        this.color = color;
        this.katexOptions = katexOptions;
    }
}

export function Latex_Props_$reflection() {
    return record_type("Feliz.Mafs.Latex.Props", [], Latex_Props, () => [["tex", string_type], ["pos", Vec2_$reflection()], ["color", string_type], ["katexOptions", obj_type]]);
}

export function Latex_Props_get_Default() {
    return new Latex_Props("", vec(0, 0), Theme.foreground, () => ({}));
}

export function Latex_create(tex) {
    const bind$0040 = Latex_Props_get_Default();
    return new Latex_Props(tex, bind$0040.pos, bind$0040.color, bind$0040.katexOptions);
}

export function Latex_pos(pos, props) {
    return new Latex_Props(props.tex, pos, props.color, props.katexOptions);
}

export function Latex_color(color, props) {
    return new Latex_Props(props.tex, props.pos, color, props.katexOptions);
}

export function Latex_katexOptions(katexOptions, props) {
    return new Latex_Props(props.tex, props.pos, props.color, katexOptions);
}

export function Latex_render(props) {
    return createElement(LaTeX, {
        tex: props.tex,
        at: Vec2__get_array(props.pos),
        color: props.color,
        katexOptions: some(props.katexOptions),
    });
}

