import { createElement } from "react";
import React from "react";
import { map, singleton, append, delay, toList } from "./fable_modules/fable-library.4.9.0/Seq.js";
import { RadioList, Slider, Button, SubHeading } from "./shared/components.js";
import { Polygon_render, Polygon_color, Polygon_create, Polygon_weight, Polygon_opacity, Vector_tail, Vector_color, Vector_create, Vector_render, movablePoint } from "./mafs/Feliz.Mafs_1/geometry.js";
import { Vec2__get_y, Vec2__get_x, Transform_translate, Constrain, Angle_op_Multiply_3DE80ED7, Vec2__rotate_18D0E04C, Vec2_op_Addition_Z2434DDE0, Angle, vec as vec_1 } from "./mafs/Feliz.Mafs_1/maths.js";
import { XYAxis, Theme } from "./mafs/Feliz.Mafs_1/common.js";
import { viewBox as viewBox_1, zoom, render, create } from "./mafs/Feliz.Mafs_1/mafs.js";
import { Cartesian_subDiv, Cartesian_create, Cartesian_render } from "./mafs/Feliz.Mafs_1/coordinates.js";
import { ofSeq, item, append as append_1, ofArray } from "./fable_modules/fable-library.4.9.0/List.js";
import { Plot_color, VectorField_create, VectorField_step, VectorField_opacity, VectorField_opacityStep, VectorField_render, Plot_render, Plot_create } from "./mafs/Feliz.Mafs_1/plot.js";
import { Text_pos, Text_create, Text_point, Text_render } from "./mafs/Feliz.Mafs_1/text.js";
import { createObj } from "./fable_modules/fable-library.4.9.0/Util.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.7.0/Interop.fs.js";
import { useFeliz_React__React_useState_Static_1505 } from "./fable_modules/Feliz.2.7.0/React.fs.js";
import { FSharpRef } from "./fable_modules/fable-library.4.9.0/Types.js";
import { rangeDouble } from "./fable_modules/fable-library.4.9.0/Range.js";
import { interpolate, toText } from "./fable_modules/fable-library.4.9.0/String.js";

export function view() {
    const children_4 = toList(delay(() => append(singleton(SubHeading("Examples Showing Vectors")), delay(() => {
        let children, props_1, props_3, props_6;
        const head = movablePoint(vec_1(0, 0), Theme.foreground, void 0);
        const angle = new Angle(1, [Math.atan2(head.y, head.x)]);
        const v = head.pos;
        const u = Vec2_op_Addition_Z2434DDE0(v, Vec2__rotate_18D0E04C(v, angle));
        const w = Vec2_op_Addition_Z2434DDE0(v, Vec2__rotate_18D0E04C(u, Angle_op_Multiply_3DE80ED7(-2, angle)));
        return append(singleton((children = create(), render(ofArray([createElement(Cartesian_render, Cartesian_create()), createElement(Vector_render, (props_1 = Vector_create(v), Vector_color(Theme.blue, props_1))), createElement(Vector_render, Vector_tail(v, (props_3 = Vector_create(u), Vector_color(Theme.red, props_3)))), createElement(Vector_render, Vector_tail(u, (props_6 = Vector_create(w), Vector_color(Theme.green, props_6)))), head.element]), children))), delay(() => append(singleton(SubHeading("Examples Showing Movable Points with Constrains")), delay(() => {
            let children_1;
            const tp = movablePoint(vec_1(0, -2), Theme.blue, new Constrain(2, []));
            const xInt1 = movablePoint(vec_1(-2, 0), Theme.red, new Constrain(1, []));
            const xInt2 = movablePoint(vec_1(2, 0), Theme.red, new Constrain(1, []));
            const mid = (xInt1.x + xInt2.x) / 2;
            const fn = (x) => ((x - xInt1.x) * (x - xInt2.x));
            return append(singleton((children_1 = create(), render(toList(delay(() => append(singleton(createElement(Cartesian_render, Cartesian_create())), delay(() => {
                let props_11;
                return append(singleton((props_11 = Plot_create((x_1) => ((tp.y * fn(x_1)) / fn(mid))), createElement(Plot_render, {
                    axis: new XYAxis(0, []),
                    props: props_11,
                }))), delay(() => append(singleton(createElement(Text_render, Text_point(2, xInt1.pos, xInt1.pos))), delay(() => append(singleton(createElement(Text_render, Text_point(2, xInt2.pos, xInt2.pos))), delay(() => {
                    const tpText = createElement(Text_render, Text_point(2, tp.pos, tp.pos));
                    return append(singleton(xInt1.element), delay(() => append(singleton(xInt2.element), delay(() => singleton(Transform_translate(vec_1(mid, 0), ofArray([tp.element, tpText])))))));
                }))))));
            })))), children_1))), delay(() => {
                let elems_1;
                return append(singleton(createElement("div", createObj(ofArray([["className", "flex justify-center"], (elems_1 = [Button("Reset", (e) => {
                    tp.setPoint(vec_1(0, -2));
                    xInt1.setPoint(vec_1(-2, 0));
                    xInt2.setPoint(vec_1(2, 0));
                })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), delay(() => append(singleton(SubHeading("Vector Fields")), delay(() => {
                    let children_2;
                    const point = movablePoint(vec_1(0.5, 1), Theme.indigo, void 0);
                    return append(singleton((children_2 = zoom(0.1, 1, create()), render(ofArray([createElement(Cartesian_render, Cartesian_create()), createElement(VectorField_render, VectorField_opacityStep(0.1, VectorField_opacity((p_1) => ((Math.abs(Vec2__get_x(p_1)) + Math.abs(Vec2__get_y(p_1))) / 10), VectorField_step(0.5, VectorField_create((p) => vec_1(((Vec2__get_y(p) - point.y) - Vec2__get_x(p)) + point.x, ((-Vec2__get_x(p) + point.x) - Vec2__get_y(p)) + point.y)))))), point.element]), children_2))), delay(() => append(singleton(SubHeading("Riemann Sums")), delay(() => {
                        let children_3, props_24, props_29, props_28, props_34;
                        const patternInput = useFeliz_React__React_useState_Static_1505(100);
                        const partitions = patternInput[0] | 0;
                        const lift = movablePoint(vec_1(0, 1), Theme.indigo, new Constrain(2, []));
                        const slide = movablePoint(vec_1(1, 0), Theme.indigo, new Constrain(1, []));
                        const start = movablePoint(vec_1(-2, 0), Theme.orange, new Constrain(1, []));
                        const stop = movablePoint(vec_1(2, 0), Theme.orange, new Constrain(1, []));
                        const fns = ofArray([(x_2) => ((Math.sin(3 * x_2) - (Math.pow(x_2, 2) / 20)) + lift.y), (x_3) => (lift.y + Math.sin(x_3)), (x_4) => (lift.y + Math.sinh(x_4)), (x_5) => (lift.y + Math.cosh(x_5))]);
                        const patternInput_1 = useFeliz_React__React_useState_Static_1505(0);
                        const setFn = patternInput_1[1];
                        const fn_3 = patternInput_1[0] | 0;
                        const dx = (stop.x - start.x) / partitions;
                        const area = new FSharpRef(0);
                        return append(singleton((children_3 = zoom(0.3, 2, (props_24 = create(), viewBox_1({
                            padding: 2,
                            x: vec_1(-1, 12),
                            y: vec_1(-3, 10),
                        }, props_24))), render(append_1(ofArray([createElement(Cartesian_render, Cartesian_subDiv(0, Cartesian_create())), (props_29 = ((props_28 = Plot_create((x_7) => item(fn_3, fns)(x_7 - slide.x)), Plot_color(Theme.blue, props_28))), createElement(Plot_render, {
                            axis: new XYAxis(0, []),
                            props: props_29,
                        }))]), append_1(ofSeq(map((x_8) => {
                            let props_30;
                            const x_9 = start.x + (dx * (x_8 - 1));
                            const y_1 = item(fn_3, fns)((x_9 - slide.x) + (dx / 2));
                            area.contents = (area.contents + (dx * y_1));
                            const props_33 = Polygon_opacity(0.3, Polygon_weight(1, (props_30 = Polygon_create(ofArray([vec_1(x_9, 0), vec_1(x_9 + dx, 0), vec_1(x_9 + dx, y_1), vec_1(x_9, y_1)])), Polygon_color((y_1 >= 0) ? Theme.green : Theme.red, props_30))));
                            return createElement(Polygon_render, {
                                joinLast: true,
                                props: props_33,
                            });
                        }, rangeDouble(1, 1, partitions))), ofArray([createElement(Text_render, (props_34 = Text_create(toText(interpolate("Area: %.5f%P()", [area.contents]))), Text_pos(vec_1(3, 3), props_34))), lift.element, slide.element, start.element, stop.element]))), children_3))), delay(() => append(singleton(Slider("", 1, 250, 1, partitions, (v_1) => {
                            patternInput[1](~~v_1);
                        }, true)), delay(() => singleton(RadioList("Functions", 0, ofArray([["Wave", (e_1) => {
                            if (e_1) {
                                setFn(0);
                            }
                        }], ["Sine", (e_2) => {
                            if (e_2) {
                                setFn(1);
                            }
                        }], ["Sinh", (e_3) => {
                            if (e_3) {
                                setFn(2);
                            }
                        }], ["Cosh", (e_4) => {
                            if (e_4) {
                                setFn(3);
                            }
                        }]])))))));
                    }))));
                }))));
            }));
        }))));
    }))));
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    });
}

