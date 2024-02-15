import { createElement } from "react";
import React from "react";
import { singleton, append, delay, toList } from "../fable_modules/fable-library.4.9.0/Seq.js";
import { Tabbed, SubHeading, PopupSize, Popup, Heading, SmallHeading, Article } from "../shared/components.js";
import { Latex_pos, Latex_create, Latex_render, Text_create, Text_pos, Text_render, Util_Katex } from "../mafs/Feliz.Mafs_1/text.js";
import { singleton as singleton_1, map, append as append_1, ofArray } from "../fable_modules/fable-library.4.9.0/List.js";
import { Angle, Angle_get_toDeg, Vec2_op_Division_474513F4, Vec2__midpoint_Z3D49C911, Vec2_op_Addition_Z2434DDE0, Vec2_op_Subtraction_Z2434DDE0, Vec2__get_normal, Vec2_op_Multiply_Z1871278C, Vec2__dist_Z3D49C911, Constrain, Vec2__get_y, Vec2__get_x, vec } from "../mafs/Feliz.Mafs_1/maths.js";
import { Arc_color, Arc_create, Arc_targets, Arc_render, Vector_create, Vector_render, Polygon_render, Polygon_create, Polygon_color, Polygon_opacity, movablePoint } from "../mafs/Feliz.Mafs_1/geometry.js";
import { Theme } from "../mafs/Feliz.Mafs_1/common.js";
import { render, viewBox as viewBox_1, create, width as width_1, height as height_1, zoom } from "../mafs/Feliz.Mafs_1/mafs.js";
import { interpolate, toText } from "../fable_modules/fable-library.4.9.0/String.js";
import { Interop_reactApi } from "../fable_modules/Feliz.2.7.0/Interop.fs.js";
import { createObj } from "../fable_modules/fable-library.4.9.0/Util.js";
import { Polar_create, Polar_render } from "../mafs/Feliz.Mafs_1/coordinates.js";

export function PythagoreanProof() {
    const children_1 = toList(delay(() => {
        let value;
        return append(singleton(Article(ofArray([SmallHeading("Pythagorean Proof"), createElement(Util_Katex, {
            text: "\\implies c^2 = a^2 + b^2 \\\\",
        }), (value = "If you look at the equation, you see that each of side of the triangle is squared.\n                If we physically square them (to get a square shape) you can see that the areas\n                of the two squares formed by the legs (b and c) add up to the area of the square\n                formed from the hypotenuse (c)", createElement("p", {
            children: [value],
        })), createElement("br", {})]))), delay(() => {
            let children, props_4, props_13, props_11;
            const corner = vec(2, -2);
            const xPoint = movablePoint(vec(-1, -2), Theme.blue, new Constrain(0, [(p) => vec((Vec2__get_x(p) > Vec2__get_x(corner)) ? Vec2__get_x(corner) : Vec2__get_x(p), Vec2__get_y(corner))]));
            const yPoint = movablePoint(vec(2, 1), Theme.red, new Constrain(0, [(p_1) => vec(Vec2__get_x(corner), (Vec2__get_y(p_1) < Vec2__get_y(corner)) ? Vec2__get_y(corner) : Vec2__get_y(p_1))]));
            const rectData = ofArray([[xPoint.pos, yPoint.pos, Theme.indigo, Vec2__dist_Z3D49C911(xPoint.pos, yPoint.pos)], [corner, xPoint.pos, Theme.red, Vec2__get_x(corner) - xPoint.x], [corner, yPoint.pos, Theme.blue, Vec2__get_y(corner) - yPoint.y]]);
            const extend = (p1, p2, dist) => {
                let p_2;
                return Vec2_op_Multiply_Z1871278C(dist, Vec2__get_normal((p_2 = Vec2_op_Subtraction_Z2434DDE0(p1, p2), vec(Vec2__get_y(p_2), -Vec2__get_x(p_2)))));
            };
            return singleton((children = zoom(0.5, 1, (props_4 = height_1(400, width_1(400, create())), viewBox_1({
                padding: 1,
                x: vec(-5, 5),
                y: vec(-5, 5),
            }, props_4))), render(append_1(map((tupledArg) => {
                const p1_1 = tupledArg[0];
                const p2_1 = tupledArg[1];
                const outer = extend(p1_1, p2_1, tupledArg[3]);
                const props_8 = Polygon_opacity(0.2, Polygon_color(tupledArg[2], Polygon_create(ofArray([p2_1, p1_1, Vec2_op_Addition_Z2434DDE0(p1_1, outer), Vec2_op_Addition_Z2434DDE0(p2_1, outer)]))));
                return createElement(Polygon_render, {
                    joinLast: true,
                    props: props_8,
                });
            }, rectData), append_1(map((tupledArg_1) => {
                const p1_2 = tupledArg_1[0];
                const p2_2 = tupledArg_1[1];
                const len_1 = tupledArg_1[3];
                const outer_1 = extend(p1_2, p2_2, len_1);
                return createElement(Text_render, Text_pos(Vec2_op_Addition_Z2434DDE0(Vec2__midpoint_Z3D49C911(p1_2, p2_2), Vec2_op_Division_474513F4(outer_1, 2)), Text_create(toText(interpolate("%.1f%P()", [len_1 * len_1])))));
            }, rectData), ofArray([(props_13 = Polygon_opacity(0.4, (props_11 = Polygon_create(ofArray([corner, xPoint.pos, yPoint.pos])), Polygon_color(Theme.green, props_11))), createElement(Polygon_render, {
                joinLast: true,
                props: props_13,
            })), xPoint.element, yPoint.element]))), children)));
        }));
    }));
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children_1)),
    });
}

export function Bearings() {
    let elems;
    return createElement("div", createObj(ofArray([["className", "mx-16"], (elems = toList(delay(() => {
        let children, props_5;
        const facing = movablePoint(vec(0, 1), Theme.indigo, void 0);
        const target = movablePoint(vec(2, 2), Theme.red, void 0);
        return singleton((children = height_1(600, create()), render(ofArray([createElement(Polar_render, Polar_create()), createElement(Vector_render, Vector_create(facing.pos)), createElement(Vector_render, Vector_create(target.pos)), createElement(Arc_render, (props_5 = Arc_targets(target.pos, facing.pos, Arc_create(vec(0, 0))), Arc_color(Theme.orange, props_5))), facing.element, target.element]), children)));
    })), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Trigonometry() {
    let elems_2, elems, elems_1;
    return createElement("div", createObj(ofArray([["className", "flex flex-col mx-16"], (elems_2 = [createElement("div", createObj(ofArray([["className", "flex flex-row gap-8 float-right"], (elems = toList(delay(() => {
        let value_4;
        return append(singleton(Article(ofArray([Heading("Trigonometry"), (value_4 = "Trigonometry is maths dealing with right triangles. The first part which you will\n                                       be familiar with is the Pythagorean theorem: ", createElement("p", {
            children: [value_4],
        })), createElement(Util_Katex, {
            text: "\\\\ \\qquad c^2 = a^2 + b^2\\\\",
        }), createElement("p", {
            children: [" where c is the length of the hypotenuse and a and b are the lengths of its two legs."],
        }), Popup("Pythagorean Theorem", new PopupSize(3, []), createElement(PythagoreanProof, null))]))), delay(() => {
            let children, props_5, props_3, props_7, props_6, props_9, value_6, props_12, props_11, props_14, value_7;
            const corner = vec(-2, -2);
            const xPoint = movablePoint(vec(1, -2), Theme.blue, new Constrain(0, [(p) => vec((Vec2__get_x(p) < Vec2__get_x(corner)) ? Vec2__get_x(corner) : Vec2__get_x(p), Vec2__get_y(corner))]));
            const yPoint = movablePoint(vec(-2, 1), Theme.red, new Constrain(0, [(p_1) => vec(Vec2__get_x(corner), (Vec2__get_y(p_1) < Vec2__get_y(corner)) ? Vec2__get_y(corner) : Vec2__get_y(p_1))]));
            const centroid = Vec2_op_Division_474513F4(Vec2_op_Addition_Z2434DDE0(Vec2_op_Addition_Z2434DDE0(corner, xPoint.pos), yPoint.pos), 3);
            return singleton((children = width_1(500, create()), render(ofArray([(props_5 = Polygon_opacity(0.3, (props_3 = Polygon_create(ofArray([corner, xPoint.pos, yPoint.pos])), Polygon_color(Theme.green, props_3))), createElement(Polygon_render, {
                joinLast: true,
                props: props_5,
            })), xPoint.element, createElement(Arc_render, (props_7 = ((props_6 = Arc_create(xPoint.pos), Arc_targets(Vec2_op_Subtraction_Z2434DDE0(corner, xPoint.pos), Vec2_op_Subtraction_Z2434DDE0(yPoint.pos, xPoint.pos), props_6))), Arc_color(Theme.blue, props_7))), createElement(Latex_render, (props_9 = Latex_create(toText(interpolate("\\tiny\n                                %.1f%P()", [Angle_get_toDeg()(new Angle(1, [(value_6 = (-3.141592653589793 + Math.atan2(Vec2__get_y(Vec2_op_Subtraction_Z2434DDE0(yPoint.pos, xPoint.pos)), Vec2__get_x(Vec2_op_Subtraction_Z2434DDE0(corner, xPoint.pos)))), Math.abs(value_6))]))]))), Latex_pos(Vec2_op_Subtraction_Z2434DDE0(xPoint.pos, Vec2_op_Multiply_Z1871278C(0.8, Vec2__get_normal(Vec2_op_Subtraction_Z2434DDE0(xPoint.pos, centroid)))), props_9))), yPoint.element, createElement(Arc_render, (props_12 = ((props_11 = Arc_create(yPoint.pos), Arc_targets(Vec2_op_Subtraction_Z2434DDE0(corner, yPoint.pos), Vec2_op_Subtraction_Z2434DDE0(xPoint.pos, yPoint.pos), props_11))), Arc_color(Theme.red, props_12))), createElement(Latex_render, (props_14 = Latex_create(toText(interpolate("\\tiny\n                                %.1f%P()", [Angle_get_toDeg()(new Angle(1, [(value_7 = ((3.141592653589793 / 2) + Math.atan2(Vec2__get_y(Vec2_op_Subtraction_Z2434DDE0(corner, yPoint.pos)), Vec2__get_x(Vec2_op_Subtraction_Z2434DDE0(xPoint.pos, yPoint.pos)))), Math.abs(value_7))]))]))), Latex_pos(Vec2_op_Subtraction_Z2434DDE0(yPoint.pos, Vec2_op_Multiply_Z1871278C(0.8, Vec2__get_normal(Vec2_op_Subtraction_Z2434DDE0(yPoint.pos, centroid)))), props_14)))]), children)));
        }));
    })), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))), createElement("div", createObj(ofArray([["className", "flex flex-col"], (elems_1 = [Article(singleton_1(SubHeading("The Pythagorean Theorem")))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])));
}

export function FurtherTrigonometry() {
    return createElement("div", {});
}

export const tabs = ofArray([["Bearings", createElement(Bearings, null)], ["Trigonometry", createElement(Trigonometry, null)], ["Further Trigonometry", FurtherTrigonometry()]]);

export function view(tab) {
    return createElement(Tabbed, {
        tabName: tab,
        tabs: tabs,
    });
}

