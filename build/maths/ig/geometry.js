import { Vec2__lerp, Vec2__get_normal, Vec2__midpoint_Z3D49C911, Vec2_op_Multiply_Z1871278C, Vec2_op_Addition_Z2434DDE0, Angle_get_toDeg, Constrain, vec, Vec2__get_y, Vec2__get_x, Angle, Vec2__get_mag, Vec2__dist_Z3D49C911, Vec2_op_Multiply_Z2434DDE0, Vec2_op_Subtraction_Z2434DDE0 } from "../mafs/Feliz.Mafs_1/maths.js";
import { singleton as singleton_1, map2, empty, append as append_1, head, tail, isEmpty, map, fold, ofArray } from "../fable_modules/fable-library.4.9.0/List.js";
import { createObj, equals, round } from "../fable_modules/fable-library.4.9.0/Util.js";
import { createElement } from "react";
import React from "react";
import { empty as empty_1, singleton, append, delay, toList } from "../fable_modules/fable-library.4.9.0/Seq.js";
import { useFeliz_React__React_useState_Static_1505 } from "../fable_modules/Feliz.2.7.0/React.fs.js";
import { Point_create, Point_render, Polygon_render, Polygon_color, Polygon_create, Polygon_opacity, movablePoint } from "../mafs/Feliz.Mafs_1/geometry.js";
import { Theme } from "../mafs/Feliz.Mafs_1/common.js";
import { preserveAR, render, viewBox as viewBox_2, create, width as width_2, pan as pan_2, zoom } from "../mafs/Feliz.Mafs_1/mafs.js";
import { Cartesian_create, Cartesian_render } from "../mafs/Feliz.Mafs_1/coordinates.js";
import { Latex_pos, Latex_create, Latex_render, Text_attach, Text_create, Text_pos, Text_size, Text_render } from "../mafs/Feliz.Mafs_1/text.js";
import { interpolate, toText } from "../fable_modules/fable-library.4.9.0/String.js";
import { Tabbed, Slider, Heading, Article, RadioList, TextType, CheckList, SubHeading } from "../shared/components.js";
import { aOrAn } from "../shared/util.js";
import { Interop_reactApi } from "../fable_modules/Feliz.2.7.0/Interop.fs.js";
import { Union } from "../fable_modules/fable-library.4.9.0/Types.js";
import { union_type } from "../fable_modules/fable-library.4.9.0/Reflection.js";
import { rangeDouble } from "../fable_modules/fable-library.4.9.0/Range.js";

export function triangleVectors(p1, p2, p3) {
    const v1 = Vec2_op_Subtraction_Z2434DDE0(p1, p2);
    const v2 = Vec2_op_Subtraction_Z2434DDE0(p2, p3);
    const v3 = Vec2_op_Subtraction_Z2434DDE0(p3, p1);
    return ofArray([[v1, v2], [v2, v3], [v3, v1]]);
}

export function isRightTriangle(p1, p2, p3) {
    return 0 < fold((acc, tupledArg) => {
        if (round(Vec2_op_Multiply_Z2434DDE0(tupledArg[0], tupledArg[1]), 1) === 0) {
            return (acc + 1) | 0;
        }
        else {
            return acc | 0;
        }
    }, 0, triangleVectors(p1, p2, p3));
}

export function isObtuseTriangle(p1, p2, p3) {
    return 0 < fold((acc, tupledArg) => (acc * Vec2_op_Multiply_Z2434DDE0(tupledArg[0], tupledArg[1])), 1, triangleVectors(p1, p2, p3));
}

export function triangleName(p1, p2, p3) {
    const l1 = round(Vec2__dist_Z3D49C911(p1, p2), 1);
    const l2 = round(Vec2__dist_Z3D49C911(p2, p3), 1);
    const l3 = round(Vec2__dist_Z3D49C911(p3, p1), 1);
    const eqCount = fold((acc, eq) => (eq ? (acc + 1) : acc), 0, ofArray([l1 === l2, l2 === l3, l3 === l1])) | 0;
    return (isRightTriangle(p1, p2, p3) ? "Right " : (isObtuseTriangle(p1, p2, p3) ? "Obtuse " : "Acute ")) + ((eqCount === 0) ? "Scalene" : ((eqCount === 1) ? "Isosceles" : ((eqCount === 3) ? "Equilateral" : "Unknown")));
}

export function quadAngles(p1, p2, p3, p4) {
    return map((tupledArg) => {
        const p1_1 = tupledArg[0];
        const p2_1 = tupledArg[1];
        return new Angle(1, [Math.acos(Vec2_op_Multiply_Z2434DDE0(p1_1, p2_1) / (Vec2__get_mag(p1_1) * Vec2__get_mag(p2_1)))]);
    }, ofArray([[Vec2_op_Subtraction_Z2434DDE0(p1, p2), Vec2_op_Subtraction_Z2434DDE0(p1, p4)], [Vec2_op_Subtraction_Z2434DDE0(p2, p1), Vec2_op_Subtraction_Z2434DDE0(p2, p3)], [Vec2_op_Subtraction_Z2434DDE0(p3, p2), Vec2_op_Subtraction_Z2434DDE0(p3, p4)], [Vec2_op_Subtraction_Z2434DDE0(p4, p3), Vec2_op_Subtraction_Z2434DDE0(p4, p1)]]));
}

export function quadName(p1, p2, p3, p4) {
    const s1 = round(Vec2__dist_Z3D49C911(p1, p2), 1);
    const s2 = round(Vec2__dist_Z3D49C911(p2, p3), 1);
    const s3 = round(Vec2__dist_Z3D49C911(p3, p4), 1);
    const s4 = round(Vec2__dist_Z3D49C911(p4, p1), 1);
    const matchValue = quadAngles(p1, p2, p3, p4);
    let matchResult, a, b, c, d;
    if (!isEmpty(matchValue)) {
        if (!isEmpty(tail(matchValue))) {
            if (!isEmpty(tail(tail(matchValue)))) {
                if (!isEmpty(tail(tail(tail(matchValue))))) {
                    if (isEmpty(tail(tail(tail(tail(matchValue)))))) {
                        matchResult = 0;
                        a = head(matchValue);
                        b = head(tail(matchValue));
                        c = head(tail(tail(matchValue)));
                        d = head(tail(tail(tail(matchValue))));
                    }
                    else {
                        matchResult = 1;
                    }
                }
                else {
                    matchResult = 1;
                }
            }
            else {
                matchResult = 1;
            }
        }
        else {
            matchResult = 1;
        }
    }
    else {
        matchResult = 1;
    }
    switch (matchResult) {
        case 0:
            if ((equals(a, b) && equals(b, c)) && equals(c, d)) {
                if (((s1 === s2) && (s2 === s3)) && (s3 === s4)) {
                    return "Square";
                }
                else {
                    return "Rectangle";
                }
            }
            else if (equals(a, c) && equals(b, d)) {
                if (((s1 === s2) && (s2 === s3)) && (s3 === s4)) {
                    return "Rhombus";
                }
                else {
                    return "Parallelogram";
                }
            }
            else if ((equals(a, d) && equals(b, c)) ? true : (equals(a, b) && equals(c, d))) {
                return "Trapezium";
            }
            else if (((s1 === s2) && (s3 === s4)) ? true : ((s2 === s3) && (s4 === s1))) {
                return "Kite";
            }
            else {
                return "Quadrilateral";
            }
        default:
            throw new Error("Error in data from `quadAngles`");
    }
}

export function quadIsConvex(p1, p2, p3, p4) {
    const cross = (p1_1, p2_1, p3_1) => (((Vec2__get_x(p2_1) - Vec2__get_x(p1_1)) * (Vec2__get_y(p3_1) - Vec2__get_y(p2_1))) - ((Vec2__get_y(p2_1) - Vec2__get_y(p1_1)) * (Vec2__get_x(p3_1) - Vec2__get_x(p2_1))));
    if (((cross(p1, p2, p3) < 0) && (cross(p2, p3, p4) < 0)) && (cross(p3, p4, p1) < 0)) {
        return cross(p4, p1, p2) < 0;
    }
    else {
        return false;
    }
}

export function Constructions() {
    let elems_6, elems_2, elems_5;
    return createElement("div", createObj(ofArray([["className", "flex flex-col gap-12"], (elems_6 = [createElement("div", createObj(ofArray([["className", "flex flex-row"], (elems_2 = toList(delay(() => {
        let children, props_3, props_7, props_6, points, centroid;
        const patternInput = useFeliz_React__React_useState_Static_1505(true);
        const shouldSnap = patternInput[0];
        const patternInput_1 = useFeliz_React__React_useState_Static_1505(false);
        const showPoints = patternInput_1[0];
        const patternInput_2 = useFeliz_React__React_useState_Static_1505(false);
        const showAngles = patternInput_2[0];
        const snap = (pt) => {
            if (shouldSnap) {
                return vec(round(Vec2__get_x(pt)), round(Vec2__get_y(pt)));
            }
            else {
                return vec(round(Vec2__get_x(pt), 1), round(Vec2__get_y(pt), 1));
            }
        };
        const p1 = movablePoint(vec(-1, -1), Theme.green, new Constrain(0, [snap]));
        const p2 = movablePoint(vec(1, -1), Theme.green, new Constrain(0, [snap]));
        const p3 = movablePoint(vec(0, 1), Theme.green, new Constrain(0, [snap]));
        return append(singleton((children = ((props_3 = zoom(0.5, 2, pan_2(false, width_2(500, create()))), viewBox_2({
            padding: 0.5,
            x: vec(-5, 5),
            y: vec(-5, 5),
        }, props_3))), render(append_1(ofArray([createElement(Cartesian_render, Cartesian_create()), (props_7 = ((props_6 = Polygon_opacity(0.3, Polygon_create(ofArray([p1.pos, p2.pos, p3.pos]))), Polygon_color(Theme.green, props_6))), createElement(Polygon_render, {
            joinLast: true,
            props: props_7,
        })), p1.element, p2.element, p3.element]), append_1((points = ofArray([p1.pos, p2.pos, p3.pos]), map((p) => {
            let props_9, p_1;
            return createElement(Text_render, Text_size(16, (props_9 = Text_pos(p, Text_create(toText(interpolate("(%.1f%P(), %.1f%P())", [Vec2__get_x(p), Vec2__get_y(p)])))), Text_attach(((p_1 = p, 1 < fold((acc, p2_1) => {
                if ((Vec2__get_y(p_1) > Vec2__get_y(p2_1)) && (Vec2__get_y(p_1) > Vec2__get_y(p2_1))) {
                    return (acc + 1) | 0;
                }
                else {
                    return acc | 0;
                }
            }, 0, points))) ? "n" : "s", -12, props_9))));
        }, showPoints ? points : empty())), showAngles ? ((centroid = vec(((p1.x + p2.x) + p3.x) / 3, ((p1.y + p2.y) + p3.y) / 3), map2((p_2, a) => {
            let props_12;
            return createElement(Latex_render, (props_12 = Latex_create(toText(interpolate("\\tiny %.1f%P()\\degree", [Angle_get_toDeg()(a)]))), Latex_pos(Vec2_op_Addition_Z2434DDE0(p_2, Vec2_op_Multiply_Z1871278C(0.3, Vec2_op_Subtraction_Z2434DDE0(centroid, p_2))), props_12)));
        }, ofArray([p1.pos, p2.pos, p3.pos]), map((tupledArg) => {
            const p1_1 = tupledArg[0];
            const p2_2 = tupledArg[1];
            return new Angle(1, [Math.acos(Vec2_op_Multiply_Z2434DDE0(p1_1, p2_2) / (Vec2__get_mag(p1_1) * Vec2__get_mag(p2_2)))]);
        }, ofArray([[Vec2_op_Subtraction_Z2434DDE0(p1.pos, p2.pos), Vec2_op_Subtraction_Z2434DDE0(p1.pos, p3.pos)], [Vec2_op_Subtraction_Z2434DDE0(p2.pos, p1.pos), Vec2_op_Subtraction_Z2434DDE0(p2.pos, p3.pos)], [Vec2_op_Subtraction_Z2434DDE0(p3.pos, p1.pos), Vec2_op_Subtraction_Z2434DDE0(p3.pos, p2.pos)]]))))) : empty())), children))), delay(() => {
            let elems_1;
            return singleton(createElement("div", createObj(ofArray([["className", "p-4"], (elems_1 = toList(delay(() => {
                const name = triangleName(p1.pos, p2.pos, p3.pos);
                return append(singleton(SubHeading(`This is ${aOrAn(name)} ${name} triangle`)), delay(() => {
                    let elems;
                    return singleton(createElement("div", createObj(ofArray([["className", "flex flex-row gap-4"], (elems = [CheckList("Options", ofArray([[new TextType(0, ["Snap"]), shouldSnap, (e) => {
                        patternInput[1](!shouldSnap);
                    }], [new TextType(0, ["Show Points"]), showPoints, (e_1) => {
                        patternInput_1[1](!showPoints);
                    }], [new TextType(0, ["Show Angles"]), showAngles, (e_2) => {
                        patternInput_2[1](!showAngles);
                    }]])), RadioList("Basic Triangle Types", -1, ofArray([["Equilateral", (e_3) => {
                        p1.setPoint(vec(-2, 0));
                        p2.setPoint(vec(0, 3.464));
                        p3.setPoint(vec(2, 0));
                    }], ["Isosceles", (e_4) => {
                        p1.setPoint(vec(0, -2));
                        p2.setPoint(vec(2, 0));
                        p3.setPoint(vec(-2, 2));
                    }], ["Scalene", (e_5) => {
                        p1.setPoint(vec(-3, -1));
                        p2.setPoint(vec(4, -1));
                        p3.setPoint(vec(-2, 3));
                    }], ["Right", (e_6) => {
                        p1.setPoint(vec(4, 3));
                        p2.setPoint(vec(4, -3));
                        p3.setPoint(vec(-2, 3));
                    }]]))], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))));
                }));
            })), ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])]))));
        }));
    })), ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])]))), createElement("div", createObj(ofArray([["className", "flex flex-row-reverse gap-8 ml-auto"], (elems_5 = toList(delay(() => {
        let children_1, props_21, props_25, props_24, points_1, centroid_1;
        const patternInput_3 = useFeliz_React__React_useState_Static_1505(true);
        const shouldSnap_1 = patternInput_3[0];
        const patternInput_4 = useFeliz_React__React_useState_Static_1505(false);
        const showPoints_1 = patternInput_4[0];
        const patternInput_5 = useFeliz_React__React_useState_Static_1505(false);
        const showAngles_1 = patternInput_5[0];
        const snap_1 = (pt_1) => {
            if (shouldSnap_1) {
                return vec(round(Vec2__get_x(pt_1)), round(Vec2__get_y(pt_1)));
            }
            else {
                return vec(round(Vec2__get_x(pt_1), 1), round(Vec2__get_y(pt_1), 1));
            }
        };
        const p1_2 = movablePoint(vec(-1, -1), Theme.green, new Constrain(0, [snap_1]));
        const p2_3 = movablePoint(vec(-1, 1), Theme.green, new Constrain(0, [snap_1]));
        const p3_1 = movablePoint(vec(1, 1), Theme.green, new Constrain(0, [snap_1]));
        const p4 = movablePoint(vec(1, -1), Theme.green, new Constrain(0, [snap_1]));
        const isConvex = quadIsConvex(p1_2.pos, p2_3.pos, p3_1.pos, p4.pos);
        return append(singleton((children_1 = ((props_21 = zoom(0.5, 2, pan_2(false, width_2(500, create()))), viewBox_2({
            padding: 0.5,
            x: vec(-5, 5),
            y: vec(-5, 5),
        }, props_21))), render(append_1(ofArray([createElement(Cartesian_render, Cartesian_create()), (props_25 = ((props_24 = Polygon_opacity(0.3, Polygon_create(ofArray([p1_2.pos, p2_3.pos, p3_1.pos, p4.pos]))), Polygon_color(isConvex ? Theme.green : Theme.red, props_24))), createElement(Polygon_render, {
            joinLast: true,
            props: props_25,
        })), p1_2.element, p2_3.element, p3_1.element, p4.element]), append_1((points_1 = ofArray([p1_2.pos, p2_3.pos, p3_1.pos, p4.pos]), map((p_3) => {
            let props_27, p_4;
            return createElement(Text_render, Text_size(16, (props_27 = Text_pos(p_3, Text_create(toText(interpolate("(%.1f%P(), %.1f%P())", [Vec2__get_x(p_3), Vec2__get_y(p_3)])))), Text_attach(((p_4 = p_3, 1 < fold((acc_1, p2_4) => {
                if ((Vec2__get_y(p_4) > Vec2__get_y(p2_4)) && (Vec2__get_y(p_4) > Vec2__get_y(p2_4))) {
                    return (acc_1 + 1) | 0;
                }
                else {
                    return acc_1 | 0;
                }
            }, 0, points_1))) ? "n" : "s", -12, props_27))));
        }, showPoints_1 ? points_1 : empty())), showAngles_1 ? ((centroid_1 = vec((((p1_2.x + p2_3.x) + p3_1.x) + p4.x) / 4, (((p1_2.y + p2_3.y) + p3_1.y) + p4.y) / 4), map2((p_5, a_1) => {
            let props_30;
            return createElement(Latex_render, (props_30 = Latex_create(toText(interpolate("\\tiny %.1f%P()\\degree", [Angle_get_toDeg()(a_1)]))), Latex_pos(Vec2_op_Addition_Z2434DDE0(p_5, Vec2_op_Multiply_Z1871278C(0.3, Vec2_op_Subtraction_Z2434DDE0(centroid_1, p_5))), props_30)));
        }, ofArray([p1_2.pos, p2_3.pos, p3_1.pos, p4.pos]), quadAngles(p1_2.pos, p2_3.pos, p3_1.pos, p4.pos)))) : empty())), children_1))), delay(() => {
            let elems_4;
            return singleton(createElement("div", createObj(ofArray([["className", "p-4"], (elems_4 = toList(delay(() => append(isConvex ? singleton(SubHeading(`This is a ${quadName(p1_2.pos, p2_3.pos, p3_1.pos, p4.pos)}`)) : singleton(SubHeading("Not convex/has crossed points")), delay(() => {
                let elems_3;
                return singleton(createElement("div", createObj(ofArray([["className", "flex flex-row gap-4"], (elems_3 = [CheckList("Options", ofArray([[new TextType(0, ["Snap"]), shouldSnap_1, (e_7) => {
                    patternInput_3[1](!shouldSnap_1);
                }], [new TextType(0, ["Show Points"]), showPoints_1, (e_8) => {
                    patternInput_4[1](!showPoints_1);
                }], [new TextType(0, ["Show Angles"]), showAngles_1, (e_9) => {
                    patternInput_5[1](!showAngles_1);
                }]])), RadioList("Basic Quadrilateral Types", -1, ofArray([["Square", (e_10) => {
                    p1_2.setPoint(vec(-2, -2));
                    p2_3.setPoint(vec(-2, 2));
                    p3_1.setPoint(vec(2, 2));
                    p4.setPoint(vec(2, -2));
                }], ["Rectangle", (e_11) => {
                    p1_2.setPoint(vec(-2.5, -1.5));
                    p2_3.setPoint(vec(-2.5, 1.5));
                    p3_1.setPoint(vec(2.5, 1.5));
                    p4.setPoint(vec(2.5, -1.5));
                }], ["Rhombus", (e_12) => {
                    p1_2.setPoint(vec(-3, -1));
                    p2_3.setPoint(vec(-2, 2));
                    p3_1.setPoint(vec(1, 3));
                    p4.setPoint(vec(0, 0));
                }], ["Parallelogram", (e_13) => {
                    p1_2.setPoint(vec(-4, -3));
                    p2_3.setPoint(vec(0, 3));
                    p3_1.setPoint(vec(4, 3));
                    p4.setPoint(vec(0, -3));
                }], ["Trapezium", (e_14) => {
                    p1_2.setPoint(vec(-3, -2));
                    p2_3.setPoint(vec(-1, 2));
                    p3_1.setPoint(vec(1, 2));
                    p4.setPoint(vec(3, -2));
                }], ["Kite", (e_15) => {
                    p1_2.setPoint(vec(-3, 0));
                    p2_3.setPoint(vec(-0.9, 1.3));
                    p3_1.setPoint(vec(4, 0));
                    p4.setPoint(vec(-0.9, -1.3));
                }]]))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])]))));
            })))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_4))])]))));
        }));
    })), ["children", Interop_reactApi.Children.toArray(Array.from(elems_5))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_6))])])));
}

export function Similarity() {
    return createElement("div", {});
}

export function Symmetry() {
    return createElement("div", {});
}

export function Angles() {
    return createElement("div", {});
}

export class LociExamples extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["LociCircle", "LociLine"];
    }
}

export function LociExamples_$reflection() {
    return union_type("EDS.Maths.IG.Geometry.LociExamples", [], LociExamples, () => [[], []]);
}

export function Loci() {
    let elems;
    const children_1 = singleton_1(createElement("div", createObj(ofArray([["className", "flex flex-row-reverse"], (elems = toList(delay(() => {
        let children, list;
        const xRange = vec(-5, 5);
        const yRange = vec(-5, 5);
        const p1 = movablePoint(vec(-3, 1), Theme.green, void 0);
        const p2 = movablePoint(vec(3, -3), Theme.green, void 0);
        const patternInput = useFeliz_React__React_useState_Static_1505(10);
        const lociCount = patternInput[0] | 0;
        const patternInput_1 = useFeliz_React__React_useState_Static_1505(new LociExamples(0, []));
        const setSelection = patternInput_1[1];
        const selection = patternInput_1[0];
        const patternInput_2 = useFeliz_React__React_useState_Static_1505(5);
        const len = patternInput_2[0];
        return append(singleton((children = viewBox_2({
            padding: 0,
            x: xRange,
            y: yRange,
        }, pan_2(false, preserveAR(true, create()))), render(append_1(toList(delay(() => append(singleton(p1.element), delay(() => (!equals(selection, new LociExamples(0, [])) ? singleton(p2.element) : empty_1()))))), (list = toList(rangeDouble(0, 1, lociCount)), map((selection.tag === 1) ? ((t_1) => {
            const mid = Vec2__midpoint_Z3D49C911(p1.pos, p2.pos);
            const m = Vec2__get_normal(vec(p2.y - p1.y, -(p2.x - p1.x)));
            return createElement(Point_render, Point_create(Vec2__lerp(Vec2_op_Subtraction_Z2434DDE0(mid, Vec2_op_Multiply_Z1871278C(len, m)), Vec2_op_Addition_Z2434DDE0(mid, Vec2_op_Multiply_Z1871278C(len, m)), t_1 / lociCount)));
        }) : ((t) => {
            const center = p1.pos;
            const angle = (2 * 3.141592653589793) * (t / lociCount);
            return createElement(Point_render, Point_create(vec(Vec2__get_x(center) + (len * Math.cos(angle)), Vec2__get_y(center) + (len * Math.sin(angle)))));
        }), list))), children))), delay(() => {
            let value_2;
            return singleton(Article(ofArray([Heading("Loci"), (value_2 = "Loci are a set of points.Loci are a set of pointsLoci are a set of pointsLoci are a set of pointsLoci are a set of pointsLoci are a set of points", createElement("p", {
                children: [value_2],
            })), RadioList("Examples", 0, ofArray([["Circle Around a Point", (e) => {
                setSelection(new LociExamples(0, []));
            }], ["Closest to Two Points", (e_1) => {
                setSelection(new LociExamples(1, []));
            }]])), Slider("Loci:", 2, 200, 1, lociCount, (v_1) => {
                patternInput[1](~~v_1);
            }, true), Slider("Length:", 1, 10, 0.1, len, (v_2) => {
                patternInput_2[1](v_2);
            }, true)])));
        }));
    })), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))));
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children_1)),
    });
}

export const tabs = ofArray([["Constructions", createElement(Constructions, null)], ["Similarity", Similarity()], ["Symmetry", Symmetry()], ["Angle Properties", Angles()], ["Loci", createElement(Loci, null)]]);

export function view(tab) {
    return createElement(Tabbed, {
        tabName: tab,
        tabs: tabs,
    });
}

