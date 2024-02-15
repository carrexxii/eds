import { Union, Record } from "../../fable_modules/fable-library.4.9.0/Types.js";
import { list_type, union_type, obj_type, string_type, record_type, float64_type, lambda_type, unit_type, class_type } from "../../fable_modules/fable-library.4.9.0/Reflection.js";
import { Angle_get_toRad, Angle, Angle_$reflection, Vec2_$ctor_7B00E9A0, Vec2__get_y, Vec2__get_x, Vec2_$ctor_52AF8430, Vec2__get_array, vec, Vec2_$reflection } from "./maths.js";
import { createElement } from "react";
import React from "react";
import { Polyline, Polygon, Vector, Circle, Line, Point, useMovablePoint } from "mafs";
import { Theme } from "./common.js";
import { Parametric_render, Parametric_create, Parametric_color } from "./plot.js";
import { defaultOf } from "../../fable_modules/fable-library.4.9.0/Util.js";
import { some } from "../../fable_modules/fable-library.4.9.0/Option.js";
import { map, toArray, empty } from "../../fable_modules/fable-library.4.9.0/List.js";

export class MovablePoint extends Record {
    constructor(element, pos, setPoint, x, y) {
        super();
        this.element = element;
        this.pos = pos;
        this.setPoint = setPoint;
        this.x = x;
        this.y = y;
    }
}

export function MovablePoint_$reflection() {
    return record_type("Feliz.Mafs.Geometry.MovablePoint", [], MovablePoint, () => [["element", class_type("Fable.React.ReactElement")], ["pos", Vec2_$reflection()], ["setPoint", lambda_type(Vec2_$reflection(), unit_type)], ["x", float64_type], ["y", float64_type]]);
}

export function MovablePoint_get_Default() {
    return new MovablePoint(createElement("div", {}), vec(0, 0), (p) => {
    }, 0, 0);
}

export function movablePoint(initial, color, constrain) {
    let fn;
    const mvp = (constrain != null) ? ((constrain.tag === 2) ? (useMovablePoint(Vec2__get_array(initial), {constrain: "vertical", color: color})) : ((constrain.tag === 0) ? ((fn = constrain.fields[0], useMovablePoint(Vec2__get_array(initial), {constrain: ((p) => Vec2__get_array(fn(Vec2_$ctor_52AF8430(p)))), color: color}))) : (useMovablePoint(Vec2__get_array(initial), {constrain: "horizontal", color: color})))) : (useMovablePoint(Vec2__get_array(initial), {constrain: void 0, color: color}));
    return new MovablePoint(mvp.element, Vec2_$ctor_52AF8430(mvp.point), (p_1) => {
        mvp.setPoint(Vec2__get_array(p_1));
    }, mvp.x, mvp.y);
}

export class Arc_Props extends Record {
    constructor(pos, v1, v2, r, color) {
        super();
        this.pos = pos;
        this.v1 = v1;
        this.v2 = v2;
        this.r = r;
        this.color = color;
    }
}

export function Arc_Props_$reflection() {
    return record_type("Feliz.Mafs.Geometry.Arc.Props", [], Arc_Props, () => [["pos", Vec2_$reflection()], ["v1", Vec2_$reflection()], ["v2", Vec2_$reflection()], ["r", float64_type], ["color", string_type]]);
}

export function Arc_Props_get_Default() {
    return new Arc_Props(vec(0, 0), vec(1, 0), vec(0, 1), 0.5, Theme.foreground);
}

export function Arc_create(pos) {
    const bind$0040 = Arc_Props_get_Default();
    return new Arc_Props(pos, bind$0040.v1, bind$0040.v2, bind$0040.r, bind$0040.color);
}

export function Arc_targets(targets_, targets__1, props) {
    const targets = [targets_, targets__1];
    return new Arc_Props(props.pos, targets[0], targets[1], props.r, props.color);
}

export function Arc_color(color, props) {
    return new Arc_Props(props.pos, props.v1, props.v2, props.r, color);
}

export function Arc_render(props) {
    let p, p_1;
    const props_2 = Parametric_color(props.color, Parametric_create((t) => vec(Vec2__get_x(props.pos) + (props.r * Math.cos(t)), Vec2__get_y(props.pos) + (props.r * Math.sin(t)))));
    const t_1 = vec((p = props.v1, (-Math.atan2(-Vec2__get_x(p), -Vec2__get_y(p)) + 3.141592653589793) + (3.141592653589793 / 2)), (p_1 = props.v2, (-Math.atan2(-Vec2__get_x(p_1), -Vec2__get_y(p_1)) + 3.141592653589793) + (3.141592653589793 / 2)));
    return createElement(Parametric_render, {
        t: t_1,
        props: props_2,
    });
}

export class Point_Props extends Record {
    constructor(pos, color, opacity, constrain, svgProps) {
        super();
        this.pos = pos;
        this.color = color;
        this.opacity = opacity;
        this.constrain = constrain;
        this.svgProps = svgProps;
    }
}

export function Point_Props_$reflection() {
    return record_type("Feliz.Mafs.Geometry.Point.Props", [], Point_Props, () => [["pos", Vec2_$reflection()], ["color", string_type], ["opacity", float64_type], ["constrain", lambda_type(Vec2_$reflection(), Vec2_$reflection())], ["svgProps", obj_type]]);
}

export function Point_Props_get_Default() {
    return new Point_Props(Vec2_$ctor_7B00E9A0(0, 0), Theme.foreground, 1, (p) => p, defaultOf());
}

export function Point_create(pos) {
    const bind$0040 = Point_Props_get_Default();
    return new Point_Props(pos, bind$0040.color, bind$0040.opacity, bind$0040.constrain, bind$0040.svgProps);
}

export function Point_color(color, props) {
    return new Point_Props(props.pos, color, props.opacity, props.constrain, props.svgProps);
}

export function Point_opacity(opacity, props) {
    return new Point_Props(props.pos, props.color, opacity, props.constrain, props.svgProps);
}

export function Point_constrain(constrain, props) {
    return new Point_Props(props.pos, props.color, props.opacity, constrain, props.svgProps);
}

export function Point_svgProps(svgProps, props) {
    return new Point_Props(props.pos, props.color, props.opacity, props.constrain, svgProps);
}

export function Point_render(props) {
    return createElement(Point, {
        x: Vec2__get_x(props.pos),
        y: Vec2__get_y(props.pos),
        color: props.color,
        opacity: props.opacity,
        svgCircleProps: some(props.svgProps),
    });
}

export class Line_Type extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["ThroughPoints", "Segment", "PointSlope", "PointAngle"];
    }
}

export function Line_Type_$reflection() {
    return union_type("Feliz.Mafs.Geometry.Line.Type", [], Line_Type, () => [[], [], [], []]);
}

export class Line_Props extends Record {
    constructor(type$0027, p1, p2, slope, angle, color, opacity, weight, style) {
        super();
        this["type\'"] = type$0027;
        this.p1 = p1;
        this.p2 = p2;
        this.slope = slope;
        this.angle = angle;
        this.color = color;
        this.opacity = opacity;
        this.weight = weight;
        this.style = style;
    }
}

export function Line_Props_$reflection() {
    return record_type("Feliz.Mafs.Geometry.Line.Props", [], Line_Props, () => [["type\'", Line_Type_$reflection()], ["p1", Vec2_$reflection()], ["p2", Vec2_$reflection()], ["slope", float64_type], ["angle", Angle_$reflection()], ["color", string_type], ["opacity", float64_type], ["weight", float64_type], ["style", string_type]]);
}

export function Line_Props_get_Default() {
    return new Line_Props(new Line_Type(0, []), vec(0, 0), vec(0, 0), 1, new Angle(1, [0]), Theme.foreground, 1, 2, "solid");
}

export function Line_create(type$0027) {
    const bind$0040 = Line_Props_get_Default();
    return new Line_Props(type$0027, bind$0040.p1, bind$0040.p2, bind$0040.slope, bind$0040.angle, bind$0040.color, bind$0040.opacity, bind$0040.weight, bind$0040.style);
}

export function Line_point1(pt, props) {
    return new Line_Props(props["type\'"], pt, props.p2, props.slope, props.angle, props.color, props.opacity, props.weight, props.style);
}

export function Line_point2(pt, props) {
    return new Line_Props(props["type\'"], props.p1, pt, props.slope, props.angle, props.color, props.opacity, props.weight, props.style);
}

export function Line_angle(angle, props) {
    return new Line_Props(props["type\'"], props.p1, props.p2, props.slope, angle, props.color, props.opacity, props.weight, props.style);
}

export function Line_color(color, props) {
    return new Line_Props(props["type\'"], props.p1, props.p2, props.slope, props.angle, color, props.opacity, props.weight, props.style);
}

export function Line_opacity(opacity, props) {
    return new Line_Props(props["type\'"], props.p1, props.p2, props.slope, props.angle, props.color, opacity, props.weight, props.style);
}

export function Line_weight(weight, props) {
    return new Line_Props(props["type\'"], props.p1, props.p2, props.slope, props.angle, props.color, props.opacity, weight, props.style);
}

export function Line_style(style, props) {
    return new Line_Props(props["type\'"], props.p1, props.p2, props.slope, props.angle, props.color, props.opacity, props.weight, style);
}

export function Line_render(props) {
    const weight = props.weight;
    const style = props.style;
    const opacity = props.opacity;
    const color = props.color;
    const p1 = Vec2__get_array(props.p1);
    const p2 = Vec2__get_array(props.p2);
    const angle = Angle_get_toRad()(props.angle);
    const matchValue_4 = props["type\'"];
    switch (matchValue_4.tag) {
        case 1:
            return createElement(Line.Segment, {
                point1: p1,
                point2: p2,
                color: color,
                opacity: opacity,
                weight: weight,
                style: style,
            });
        case 2:
            return createElement(Line.PointSlope, {
                point: p1,
                slope: props.slope,
                color: color,
                opacity: opacity,
                weight: weight,
                style: style,
            });
        case 3:
            return createElement(Line.PointAngle, {
                point: p1,
                angle: angle,
                color: color,
                opacity: opacity,
                weight: weight,
                style: style,
            });
        default:
            return createElement(Line.ThroughPoints, {
                point1: p1,
                point2: p2,
                color: color,
                opacity: opacity,
                weight: weight,
                style: style,
            });
    }
}

export class Circle_Props extends Record {
    constructor(center, radius, angle, color, weight, opacity, lineOpacity, lineStyle, svgProps) {
        super();
        this.center = center;
        this.radius = radius;
        this.angle = angle;
        this.color = color;
        this.weight = weight;
        this.opacity = opacity;
        this.lineOpacity = lineOpacity;
        this.lineStyle = lineStyle;
        this.svgProps = svgProps;
    }
}

export function Circle_Props_$reflection() {
    return record_type("Feliz.Mafs.Geometry.Circle.Props", [], Circle_Props, () => [["center", Vec2_$reflection()], ["radius", float64_type], ["angle", Angle_$reflection()], ["color", string_type], ["weight", float64_type], ["opacity", float64_type], ["lineOpacity", float64_type], ["lineStyle", string_type], ["svgProps", obj_type]]);
}

export function Circle_Props_get_Default() {
    return new Circle_Props(vec(0, 0), 1, new Angle(1, [0]), Theme.foreground, 2, 0.7, 1, "solid", defaultOf());
}

export function Circle_create(radius) {
    const bind$0040 = Circle_Props_get_Default();
    return new Circle_Props(bind$0040.center, radius, bind$0040.angle, bind$0040.color, bind$0040.weight, bind$0040.opacity, bind$0040.lineOpacity, bind$0040.lineStyle, bind$0040.svgProps);
}

export function Circle_center(center, props) {
    return new Circle_Props(center, props.radius, props.angle, props.color, props.weight, props.opacity, props.lineOpacity, props.lineStyle, props.svgProps);
}

export function Circle_angle(angle, props) {
    return new Circle_Props(props.center, props.radius, angle, props.color, props.weight, props.opacity, props.lineOpacity, props.lineStyle, props.svgProps);
}

export function Circle_color(color, props) {
    return new Circle_Props(props.center, props.radius, props.angle, color, props.weight, props.opacity, props.lineOpacity, props.lineStyle, props.svgProps);
}

export function Circle_weight(weight, props) {
    return new Circle_Props(props.center, props.radius, props.angle, props.color, weight, props.opacity, props.lineOpacity, props.lineStyle, props.svgProps);
}

export function Circle_opacity(opacity, props) {
    return new Circle_Props(props.center, props.radius, props.angle, props.color, props.weight, opacity, props.lineOpacity, props.lineStyle, props.svgProps);
}

export function Circle_lineOpacity(lineOpacity, props) {
    return new Circle_Props(props.center, props.radius, props.angle, props.color, props.weight, props.opacity, lineOpacity, props.lineStyle, props.svgProps);
}

export function Circle_lineStyle(lineStyle, props) {
    return new Circle_Props(props.center, props.radius, props.angle, props.color, props.weight, props.opacity, props.lineOpacity, lineStyle, props.svgProps);
}

export function Circle_svgProps(svgProps, props) {
    return new Circle_Props(props.center, props.radius, props.angle, props.color, props.weight, props.opacity, props.lineOpacity, props.lineStyle, svgProps);
}

export function Circle_render(props) {
    return createElement(Circle, {
        center: Vec2__get_array(props.center),
        radius: props.radius,
        angle: Angle_get_toRad()(props.angle),
        color: props.color,
        weight: props.weight,
        fillOpacity: props.opacity,
        strokeOpacity: props.lineOpacity,
        strokeStyle: props.lineStyle,
        svgEllipseProps: some(props.svgProps),
    });
}

export class Vector_Props extends Record {
    constructor(head, tail, color, opacity, weight, style, lineProps) {
        super();
        this.head = head;
        this.tail = tail;
        this.color = color;
        this.opacity = opacity;
        this.weight = weight;
        this.style = style;
        this.lineProps = lineProps;
    }
}

export function Vector_Props_$reflection() {
    return record_type("Feliz.Mafs.Geometry.Vector.Props", [], Vector_Props, () => [["head", Vec2_$reflection()], ["tail", Vec2_$reflection()], ["color", string_type], ["opacity", float64_type], ["weight", float64_type], ["style", string_type], ["lineProps", obj_type]]);
}

export function Vector_Props_get_Default() {
    return new Vector_Props(Vec2_$ctor_7B00E9A0(0, 0), Vec2_$ctor_7B00E9A0(0, 0), Theme.foreground, 1, 2, "solid", defaultOf());
}

export function Vector_create(head) {
    const bind$0040 = Vector_Props_get_Default();
    return new Vector_Props(head, bind$0040.tail, bind$0040.color, bind$0040.opacity, bind$0040.weight, bind$0040.style, bind$0040.lineProps);
}

export function Vector_tail(tail, props) {
    return new Vector_Props(props.head, tail, props.color, props.opacity, props.weight, props.style, props.lineProps);
}

export function Vector_color(color, props) {
    return new Vector_Props(props.head, props.tail, color, props.opacity, props.weight, props.style, props.lineProps);
}

export function Vector_opacity(opacity, props) {
    return new Vector_Props(props.head, props.tail, props.color, opacity, props.weight, props.style, props.lineProps);
}

export function Vector_weight(weight, props) {
    return new Vector_Props(props.head, props.tail, props.color, props.opacity, weight, props.style, props.lineProps);
}

export function Vector_style(style, props) {
    return new Vector_Props(props.head, props.tail, props.color, props.opacity, props.weight, style, props.lineProps);
}

export function Vector_svgProps(svgProps, props) {
    return new Vector_Props(props.head, props.tail, props.color, props.opacity, props.weight, props.style, svgProps);
}

export function Vector_render(props) {
    return createElement(Vector, {
        tip: Vec2__get_array(props.head),
        tail: Vec2__get_array(props.tail),
        color: props.color,
        opacity: props.opacity,
        weight: props.weight,
        style: props.style,
        svgLineProps: some(props.lineProps),
    });
}

export class Polygon_Props extends Record {
    constructor(points, color, weight, opacity, lineOpacity, lineStyle, svgProps) {
        super();
        this.points = points;
        this.color = color;
        this.weight = weight;
        this.opacity = opacity;
        this.lineOpacity = lineOpacity;
        this.lineStyle = lineStyle;
        this.svgProps = svgProps;
    }
}

export function Polygon_Props_$reflection() {
    return record_type("Feliz.Mafs.Geometry.Polygon.Props", [], Polygon_Props, () => [["points", list_type(Vec2_$reflection())], ["color", string_type], ["weight", float64_type], ["opacity", float64_type], ["lineOpacity", float64_type], ["lineStyle", string_type], ["svgProps", obj_type]]);
}

export function Polygon_Props_get_Default() {
    return new Polygon_Props(empty(), Theme.foreground, 2, 1, 1, "solid", defaultOf());
}

export function Polygon_create(points) {
    const bind$0040 = Polygon_Props_get_Default();
    return new Polygon_Props(points, bind$0040.color, bind$0040.weight, bind$0040.opacity, bind$0040.lineOpacity, bind$0040.lineStyle, bind$0040.svgProps);
}

export function Polygon_color(color, props) {
    return new Polygon_Props(props.points, color, props.weight, props.opacity, props.lineOpacity, props.lineStyle, props.svgProps);
}

export function Polygon_weight(weight, props) {
    return new Polygon_Props(props.points, props.color, weight, props.opacity, props.lineOpacity, props.lineStyle, props.svgProps);
}

export function Polygon_opacity(opacity, props) {
    return new Polygon_Props(props.points, props.color, props.weight, opacity, props.lineOpacity, props.lineStyle, props.svgProps);
}

export function Polygon_lineOpacity(lineOpacity, props) {
    return new Polygon_Props(props.points, props.color, props.weight, props.opacity, lineOpacity, props.lineStyle, props.svgProps);
}

export function Polygon_lineStyle(lineStyle, props) {
    return new Polygon_Props(props.points, props.color, props.weight, props.opacity, props.lineOpacity, lineStyle, props.svgProps);
}

export function Polygon_render(polygon_renderInputProps) {
    const props = polygon_renderInputProps.props;
    const joinLast = polygon_renderInputProps.joinLast;
    const points = toArray(map(Vec2__get_array, props.points));
    if (joinLast) {
        return createElement(Polygon, {
            points: points,
            color: props.color,
            weight: props.weight,
            fillOpacity: props.opacity,
            strokeOpacity: props.lineOpacity,
            strokeStyle: props.lineStyle,
            svgPolygonProps: some(props.svgProps),
        });
    }
    else {
        return createElement(Polyline, {
            points: points,
            color: props.color,
            weight: props.weight,
            fillOpacity: props.opacity,
            strokeOpacity: props.lineOpacity,
            strokeStyle: props.lineStyle,
            svgPolygonProps: some(props.svgProps),
        });
    }
}

