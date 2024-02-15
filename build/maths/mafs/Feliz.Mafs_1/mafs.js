import { Record } from "../../fable_modules/fable-library.4.9.0/Types.js";
import { record_type, lambda_type, unit_type, array_type, anonRecord_type, bool_type, class_type, string_type, float64_type } from "../../fable_modules/fable-library.4.9.0/Reflection.js";
import { Vec2__get_array, vec, Vec2_$reflection } from "./maths.js";
import { createElement } from "react";
import { Mafs as Mafs_1 } from "mafs";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.7.0/Interop.fs.js";
import { ofArray } from "../../fable_modules/fable-library.4.9.0/List.js";

export class Props extends Record {
    constructor(width, height, pan, zoom, viewBox, preserveAR, ssr, onClick) {
        super();
        this.width = width;
        this.height = height;
        this.pan = pan;
        this.zoom = zoom;
        this.viewBox = viewBox;
        this.preserveAR = preserveAR;
        this.ssr = ssr;
        this.onClick = onClick;
    }
}

export function Props_$reflection() {
    return record_type("Feliz.Mafs.Mafs.Props", [], Props, () => [["width", class_type("Fable.Core.U2`2", [float64_type, string_type])], ["height", float64_type], ["pan", bool_type], ["zoom", class_type("Fable.Core.U2`2", [bool_type, anonRecord_type(["max", float64_type], ["min", float64_type])])], ["viewBox", anonRecord_type(["padding", float64_type], ["x", Vec2_$reflection()], ["y", Vec2_$reflection()])], ["preserveAR", class_type("Fable.Core.U2`2", [bool_type, string_type])], ["ssr", bool_type], ["onClick", lambda_type(array_type(float64_type), lambda_type(class_type("Browser.Types.MouseEvent"), unit_type))]]);
}

export function Props_get_Default() {
    return new Props("auto", 500, true, false, {
        padding: 0.5,
        x: vec(-3, 3),
        y: vec(-3, 3),
    }, "contain", false, (_arg, _arg_1) => {
    });
}

export function Props_get_DefaultSquare() {
    const bind$0040 = Props_get_Default();
    return new Props(500, bind$0040.height, bind$0040.pan, bind$0040.zoom, bind$0040.viewBox, bind$0040.preserveAR, bind$0040.ssr, bind$0040.onClick);
}

export function create() {
    return Props_get_Default();
}

export function width(width_1, props) {
    return new Props(width_1, props.height, props.pan, props.zoom, props.viewBox, props.preserveAR, props.ssr, props.onClick);
}

export function height(height_1, props) {
    return new Props(props.width, height_1, props.pan, props.zoom, props.viewBox, props.preserveAR, props.ssr, props.onClick);
}

export function pan(pan_1, props) {
    return new Props(props.width, props.height, pan_1, props.zoom, props.viewBox, props.preserveAR, props.ssr, props.onClick);
}

export function zoom(zoomX, zoomY, props) {
    return new Props(props.width, props.height, props.pan, {
        max: zoomY,
        min: zoomX,
    }, props.viewBox, props.preserveAR, props.ssr, props.onClick);
}

export function viewBox(viewBox_1, props) {
    return new Props(props.width, props.height, props.pan, props.zoom, viewBox_1, props.preserveAR, props.ssr, props.onClick);
}

export function onClick(onClick_1, props) {
    return new Props(props.width, props.height, props.pan, props.zoom, props.viewBox, props.preserveAR, props.ssr, onClick_1);
}

export function preserveAR(preserve, props) {
    if (preserve) {
        return new Props(props.width, props.height, props.pan, props.zoom, props.viewBox, "contain", props.ssr, props.onClick);
    }
    else {
        return new Props(props.width, props.height, props.pan, props.zoom, props.viewBox, false, props.ssr, props.onClick);
    }
}

export function Mafs(props, children) {
    const viewBox_1 = {
        padding: props.viewBox.padding,
        x: Vec2__get_array(props.viewBox.x),
        y: Vec2__get_array(props.viewBox.y),
    };
    return createElement(Mafs_1, {
        children: ofArray([["key", 1], ["children", Interop_reactApi.Children.toArray(Array.from(children))]]),
        width: props.width,
        height: props.height,
        pan: props.pan,
        zoom: props.zoom,
        viewBox: viewBox_1,
        preserveAspectRatio: props.preserveAR,
        ssr: props.ssr,
        onClick: props.onClick,
    });
}

export function render(props, children) {
    return Mafs(children, props);
}

