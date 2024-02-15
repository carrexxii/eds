import { createElement } from "react";
import React from "react";
import { equals, comparePrimitives, createObj } from "../fable_modules/fable-library.4.9.0/Util.js";
import { map as map_1, collect, empty, singleton, append, delay, toList } from "../fable_modules/fable-library.4.9.0/Seq.js";
import { useFeliz_React__React_useState_Static_1505 } from "../fable_modules/Feliz.2.7.0/React.fs.js";
import { Line_color, Line_weight, Point_color, Point_create, Point_render, Polygon_render, Polygon_create, Polygon_color, Polygon_opacity, Line_point2, Line_render, Line_Type, Line_create, Line_point1, Line_style, Vector_color, Vector_create, Vector_tail, Vector_weight, Vector_render, movablePoint } from "../mafs/Feliz.Mafs_1/geometry.js";
import { Vec2_op_Multiply_Z1871278C, Angle, Vec2__rotateAbout, Vec2__get_normal, Vec2__dist_Z3D49C911, Vec2_op_Subtraction_Z2434DDE0, Vec2__midpoint_Z3D49C911, Vec2__get_mag, Vec2_op_Multiply_474513F4, Vec2__get_y, Vec2__get_x, Vec2_op_Addition_Z2434DDE0, Constrain, vec } from "../mafs/Feliz.Mafs_1/maths.js";
import { Theme } from "../mafs/Feliz.Mafs_1/common.js";
import { pointLineDist, constrainSnap, snapWith } from "../common.js";
import { render, create, zoom } from "../mafs/Feliz.Mafs_1/mafs.js";
import { Cartesian_create, Cartesian_render } from "../mafs/Feliz.Mafs_1/coordinates.js";
import { Util_Katex, Latex_pos, Latex_create, Latex_render, Text_color, Text_pos, Text_create, Text_render } from "../mafs/Feliz.Mafs_1/text.js";
import { interpolate, toText } from "../fable_modules/fable-library.4.9.0/String.js";
import { Tabbed, Slider, RadioList, TableDirection, StaticTable, SubHeading, Heading, Section, Article, TextInput, NumberInput, TextType, CheckList } from "../shared/components.js";
import { zip, item, length, take, ofSeq as ofSeq_1, filter, map, empty as empty_1, ofArrayWithTail, fold, singleton as singleton_1, append as append_1, ofArray } from "../fable_modules/fable-library.4.9.0/List.js";
import { Interop_reactApi } from "../fable_modules/Feliz.2.7.0/Interop.fs.js";
import { FSharpMap__get_Item, FSharpMap__ContainsKey, ofSeq } from "../fable_modules/fable-library.4.9.0/Map.js";
import { scalar, section7, higherDim } from "./terms.js";
import { defaultOf } from "../fable_modules/fable-library.4.9.0/Util.js";
import { Union } from "../fable_modules/fable-library.4.9.0/Types.js";
import { union_type } from "../fable_modules/fable-library.4.9.0/Reflection.js";
import { rangeDouble } from "../fable_modules/fable-library.4.9.0/Range.js";

export function Vectors() {
    let elems_2, children_4, value_9, value_19;
    return createElement("div", createObj(ofArray([["className", "flex flex-row-reverse gap-8"], (elems_2 = [(children_4 = toList(delay(() => {
        let children;
        const patternInput = useFeliz_React__React_useState_Static_1505(true);
        const snap = patternInput[0];
        const patternInput_1 = useFeliz_React__React_useState_Static_1505(false);
        const showScale = patternInput_1[0];
        const patternInput_2 = useFeliz_React__React_useState_Static_1505(1);
        const scale = patternInput_2[0];
        const facing = movablePoint(vec(1, 2), Theme.green, new Constrain(0, [(p) => snapWith(p, snap ? 0 : 1)]));
        const pos = movablePoint(vec(0, 0), Theme.foreground, new Constrain(0, [(p_1) => vec(0, 0)]));
        return append(singleton((children = zoom(0.5, 1, create()), render(toList(delay(() => append(singleton(createElement(Cartesian_render, Cartesian_create())), delay(() => {
            let props_3;
            const head = Vec2_op_Addition_Z2434DDE0(pos.pos, facing.pos);
            return append(singleton(createElement(Vector_render, Vector_weight(3, (props_3 = Vector_tail(pos.pos, Vector_create(head)), Vector_color(Theme.green, props_3))))), delay(() => {
                const leg = Line_style("dashed", Line_point1(head, Line_create(new Line_Type(1, []))));
                return append(singleton(createElement(Line_render, Line_point2(vec(Vec2__get_x(head), 0), leg))), delay(() => append(singleton(createElement(Line_render, Line_point2(vec(0, Vec2__get_y(head)), leg))), delay(() => {
                    let props_12;
                    return append(showScale ? singleton(createElement(Vector_render, (props_12 = Vector_create(Vec2_op_Multiply_474513F4(head, scale)), Vector_color(Theme.red, props_12)))) : empty(), delay(() => {
                        let props_15, props_14;
                        return append(singleton(createElement(Text_render, (props_15 = ((props_14 = Text_create(toText(interpolate("%.1f%P()", [Vec2__get_mag(facing.pos)]))), Text_pos(Vec2__midpoint_Z3D49C911(pos.pos, facing.pos), props_14))), Text_color(Theme.yellow, props_15)))), delay(() => append(singleton(pos.element), delay(() => singleton(facing.element)))));
                    }));
                }))));
            }));
        })))), children))), delay(() => {
            let elems;
            return append(singleton(createElement("div", createObj(ofArray([["className", "flex flex-row gap-12 m-2"], (elems = [CheckList("Options", ofArray([[new TextType(0, ["Snap"]), snap, (e) => {
                patternInput[1](e);
            }], [new TextType(0, ["Scale Vector"]), showScale, (e_1) => {
                patternInput_1[1](e_1);
            }]])), NumberInput(-5, 5, facing.x, (v) => {
                facing.setPoint(vec(v, facing.y));
            }, "x: "), NumberInput(-5, 5, facing.y, (v_1) => {
                facing.setPoint(vec(facing.x, v_1));
            }, "y: "), NumberInput(-5, 5, scale, (v_2) => {
                patternInput_2[1](v_2);
            }, "Scale: ")], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))), delay(() => append(singleton(createElement("br", {})), delay(() => append(singleton(createElement("hr", {})), delay(() => append(singleton(createElement("br", {})), delay(() => {
                let children_1;
                const patternInput_3 = useFeliz_React__React_useState_Static_1505(true);
                const snap_1 = patternInput_3[0];
                const patternInput_4 = useFeliz_React__React_useState_Static_1505(true);
                const showPoints = patternInput_4[0];
                const patternInput_5 = useFeliz_React__React_useState_Static_1505(false);
                const sumVec = patternInput_5[0];
                const patternInput_6 = useFeliz_React__React_useState_Static_1505("AB");
                const firstVector = patternInput_6[0];
                const patternInput_7 = useFeliz_React__React_useState_Static_1505("BC");
                const secondVector = patternInput_7[0];
                const points = ofSeq(delay(() => append(singleton(["O", movablePoint(vec(0, 0), Theme.foreground, new Constrain(0, [(p_2) => vec(0, 0)]))]), delay(() => append(singleton(["A", movablePoint(vec(2, 2), Theme.green, constrainSnap(snap_1))]), delay(() => append(singleton(["B", movablePoint(vec(-3, 0), Theme.green, constrainSnap(snap_1))]), delay(() => singleton(["C", movablePoint(vec(1, -2), Theme.green, constrainSnap(snap_1))])))))))), {
                    Compare: comparePrimitives,
                });
                const vecIsValid = (str) => {
                    if (str.length === 2) {
                        let arr;
                        const array = str.split("");
                        arr = array.filter((key_3) => FSharpMap__ContainsKey(points, key_3));
                        return arr.length === str.length;
                    }
                    else {
                        return false;
                    }
                };
                return append(singleton((children_1 = create(), render(append_1(singleton_1(createElement(Cartesian_render, Cartesian_create())), append_1(fold((acc, tupledArg_2) => ofArrayWithTail([tupledArg_2[0], tupledArg_2[1]], acc), empty_1(), map((tupledArg_1) => {
                    let props_27;
                    const v_4 = tupledArg_1[0];
                    const color_3 = tupledArg_1[1];
                    const tail_1 = FSharpMap__get_Item(points, v_4[0]).pos;
                    const head_1 = FSharpMap__get_Item(points, v_4[1]).pos;
                    return [createElement(Vector_render, Vector_color(color_3, Vector_weight(3, Vector_tail(tail_1, Vector_create(head_1))))), createElement(Text_render, Text_color(color_3, (props_27 = Text_create(toText(interpolate("%.1f%P()", [Vec2__get_mag(Vec2_op_Subtraction_Z2434DDE0(head_1, tail_1))]))), Text_pos(Vec2__midpoint_Z3D49C911(head_1, tail_1), props_27))))];
                }, filter((tupledArg) => vecIsValid(tupledArg[0]), ofArray([[firstVector, Theme.red], [secondVector, Theme.blue]])))), append_1(toList(delay(() => {
                    let props_31;
                    if ((sumVec && vecIsValid(firstVector)) && vecIsValid(secondVector)) {
                        const tail_2 = FSharpMap__get_Item(points, firstVector[0]).pos;
                        const head_2 = Vec2_op_Subtraction_Z2434DDE0(Vec2_op_Addition_Z2434DDE0(tail_2, Vec2_op_Subtraction_Z2434DDE0(FSharpMap__get_Item(points, firstVector[1]).pos, FSharpMap__get_Item(points, firstVector[0]).pos)), Vec2_op_Subtraction_Z2434DDE0(FSharpMap__get_Item(points, secondVector[0]).pos, FSharpMap__get_Item(points, secondVector[1]).pos));
                        return append(singleton(createElement(Vector_render, (props_31 = Vector_tail(tail_2, Vector_create(head_2)), Vector_color(Theme.yellow, props_31)))), delay(() => {
                            let props_34, props_33;
                            return singleton(createElement(Text_render, (props_34 = ((props_33 = Text_create(`${firstVector} + ${secondVector}`), Text_pos(Vec2__midpoint_Z3D49C911(tail_2, head_2), props_33))), Text_color(Theme.yellow, props_34))));
                        }));
                    }
                    else {
                        return empty();
                    }
                })), toList(delay(() => collect((p_3) => {
                    let props_36;
                    return append(singleton(createElement(Latex_render, (props_36 = Latex_create((showPoints && (p_3[0] !== "O")) ? (`${p_3[0]}\\begin{pmatrix} ${Vec2__get_x(p_3[1].pos)} \\\\\ ${Vec2__get_y(p_3[1].pos)} \\end{pmatrix}`) : p_3[0]), Latex_pos(Vec2_op_Addition_Z2434DDE0(p_3[1].pos, (!showPoints ? true : (p_3[0] === "O")) ? vec(0.2, 0.2) : vec(0.7, 0.3)), props_36)))), delay(() => singleton(p_3[1].element)));
                }, points)))))), children_1))), delay(() => {
                    let children_2, elems_1;
                    return append(singleton((children_2 = singleton_1(createElement("div", createObj(ofArray([["className", "flex flex-row gap-12 items-center"], (elems_1 = [CheckList("Options", ofArray([[new TextType(0, ["Snap"]), snap_1, (e_2) => {
                        patternInput_3[1](e_2);
                    }], [new TextType(0, ["Show Points"]), showPoints, (e_3) => {
                        patternInput_4[1](e_3);
                    }], [new TextType(0, ["Show Sum"]), sumVec, (e_4) => {
                        patternInput_5[1](e_4);
                    }]])), createElement(TextInput, {
                        label: "First Vector",
                        value: firstVector,
                        dispatch: (str_1) => {
                            patternInput_6[1](str_1);
                        },
                        isValid: (str_2) => {
                            if (vecIsValid(str_2)) {
                                return void 0;
                            }
                            else {
                                return `'${str_2}' is not a valid vector`;
                            }
                        },
                    }), createElement(TextInput, {
                        label: "Second Vector",
                        value: secondVector,
                        dispatch: (str_3) => {
                            patternInput_7[1](str_3);
                        },
                        isValid: (str_4) => {
                            if (vecIsValid(str_4)) {
                                return void 0;
                            }
                            else {
                                return `'${str_4}' is not a valid vector`;
                            }
                        },
                    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), createElement("div", {
                        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
                    }))), delay(() => {
                        let value_8;
                        return singleton(Article(singleton_1(Section(singleton_1((value_8 = "Try entering in some vectors, such as \'AB\' or \'CB\'. Notice that\n                            reversing the points (\'AB\' -> \'BA\') makes the vector point in the opposite direction", value_8))))));
                    }));
                }));
            }))))))));
        }));
    })), createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    })), Article(ofArray([Heading("Vectors"), Section(ofArray([(value_9 = "Vectors are important for maths involving geometry, 2D/3D maths and are even\n                        important for topics such as machine learning. Our focus will be entirely on using vectors\n                        for doing maths in two dimensions. Where numbers ont their own are single-dimension values,\n                        vectors are multi-dimensional values and can be used for 2D, 3D and even ", value_9), higherDim, " values."])), Section(ofArray(["This covers content for ", section7, " in the syllabus."])), SubHeading("What Are Vectors?"), Section(ofArray(["Vectors are multi-dimensional values (a number alone is called a ", scalar, "). We will write vectors as either:", createElement(StaticTable, {
        dir: new TableDirection(1, []),
        xs: ofArray([singleton_1(defaultOf()), ofArray(["Column vectors: ", createElement(Util_Katex, {
            text: "\\begin{pmatrix} x \\\\ y \\end{pmatrix}, \\;\n                                                                      \\begin{pmatrix} 2 \\\\ 3 \\end{pmatrix}",
        })]), ofArray(["Vectors between points: ", createElement(Util_Katex, {
            text: "\\overrightarrow{AB}, \\; \\overrightarrow{BD}",
        })]), ofArray(["Bolded letters: ", createElement(Util_Katex, {
            text: "\\mathbf{a}, \\; \\mathbf{b}",
        })])]),
    }), " and they can be drawn as arrows like in the example to the right."])), SubHeading("Vector Maths"), Section(ofArray([(value_19 = "We will need to be able to do three different operations using vectors: adding\n                                     subtracting and multiplying (by a scalar). Doing this is no more difficult than\n                                     normal, but we will need to do it twice because our vectors have two values: ", value_19), createElement(StaticTable, {
        dir: new TableDirection(1, []),
        xs: ofArray([ofArray(["Operation", "Rule", "Example"]), ofArray(["Addition: ", createElement(Util_Katex, {
            text: "\\begin{pmatrix} x \\\\ y \\end{pmatrix} +\n                                        \\begin{pmatrix} a \\\\ b \\end{pmatrix} =\n                                        \\begin{pmatrix} x + a \\\\ y + b \\end{pmatrix}",
        }), createElement(Util_Katex, {
            text: "\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} +\n                                        \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix} =\n                                        \\begin{pmatrix} 4 \\\\ 6 \\end{pmatrix}",
        })]), ofArray(["Subtraction: ", createElement(Util_Katex, {
            text: "\\begin{pmatrix} x \\\\ y \\end{pmatrix} -\n                                        \\begin{pmatrix} a \\\\ b \\end{pmatrix} =\n                                        \\begin{pmatrix} x - a \\\\ y - b \\end{pmatrix}",
        }), createElement(Util_Katex, {
            text: "\\begin{pmatrix} 3 \\\\ 3 \\end{pmatrix} -\n                                        \\begin{pmatrix} 4 \\\\ 2 \\end{pmatrix} =\n                                        \\begin{pmatrix} -1 \\\\ 1 \\end{pmatrix}",
        })]), ofArray(["Multiplication: ", createElement(Util_Katex, {
            text: "a \\times \\begin{pmatrix} x \\\\ y \\end{pmatrix} =\n                                        \\begin{pmatrix} ax \\\\ ay \\end{pmatrix}",
        }), createElement(Util_Katex, {
            text: "\\begin{pmatrix} -1 \\\\ 3 \\end{pmatrix} \\times 5 =\n                                        \\begin{pmatrix} -5 \\\\ 15 \\end{pmatrix}",
        })])]),
    })]))]))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])));
}

export function Matrices() {
    return createElement("div", {});
}

export class Transform extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Reflect", "Scale", "Rotate"];
    }
}

export function Transform_$reflection() {
    return union_type("EDS.Maths.IG.Transforms.Transform", [], Transform, () => [[], [], []]);
}

export function Transforms() {
    let elems_1;
    return createElement("div", createObj(ofArray([["className", ""], (elems_1 = toList(delay(() => {
        let children, points_1, reflects, props_8, drawCoord;
        const patternInput = useFeliz_React__React_useState_Static_1505(false);
        const snap = patternInput[0];
        const patternInput_1 = useFeliz_React__React_useState_Static_1505(false);
        const snapRotate = patternInput_1[0];
        const patternInput_2 = useFeliz_React__React_useState_Static_1505(1);
        const pointCount = patternInput_2[0] | 0;
        const patternInput_3 = useFeliz_React__React_useState_Static_1505(false);
        const showCoords = patternInput_3[0];
        const patternInput_4 = useFeliz_React__React_useState_Static_1505(false);
        const showNewCoords = patternInput_4[0];
        const patternInput_5 = useFeliz_React__React_useState_Static_1505(false);
        const showPaths = patternInput_5[0];
        const patternInput_6 = useFeliz_React__React_useState_Static_1505(new Transform(0, []));
        const setMethod = patternInput_6[1];
        const method = patternInput_6[0];
        const patternInput_7 = useFeliz_React__React_useState_Static_1505(2);
        const scaleFactor = patternInput_7[0];
        const patternInput_8 = useFeliz_React__React_useState_Static_1505(180);
        const rotationFactor = patternInput_8[0];
        const points = ofSeq_1(map_1((p) => {
            const p_1 = p - 1;
            return movablePoint(vec(Math.cos(((2 * 3.141592653589793) / 8) * p_1), Math.sin(((2 * 3.141592653589793) / 8) * p_1)), Theme.green, constrainSnap(snap));
        }, rangeDouble(1, 1, ~~8)));
        const tPoint = movablePoint(vec(0, 0), Theme.indigo, constrainSnap(snap));
        const lPoint1 = movablePoint(vec(-3, -3), Theme.indigo, constrainSnap(snap));
        const lPoint2 = movablePoint(vec(3, 3), Theme.indigo, constrainSnap(snap));
        return append(singleton((children = zoom(0.3, 1, create()), render(append_1(toList(delay(() => append(singleton(createElement(Cartesian_render, Cartesian_create())), delay(() => (equals(method, new Transform(0, [])) ? singleton(createElement(Line_render, Line_point2(lPoint2.pos, Line_point1(lPoint1.pos, Line_create(new Line_Type(0, [])))))) : empty()))))), append_1((points_1 = map((p_2) => p_2.pos, take(pointCount, points)), (reflects = map((p_3) => {
            switch (method.tag) {
                case 1: {
                    const dist_1 = Vec2__dist_Z3D49C911(tPoint.pos, p_3);
                    return Vec2_op_Subtraction_Z2434DDE0(p_3, Vec2_op_Multiply_474513F4(Vec2_op_Multiply_474513F4(Vec2__get_normal(Vec2_op_Subtraction_Z2434DDE0(tPoint.pos, p_3)), dist_1), scaleFactor - 1));
                }
                case 2:
                    return Vec2__rotateAbout(p_3, tPoint.pos, new Angle(0, [rotationFactor]));
                default: {
                    const dist = pointLineDist(lPoint1.pos, lPoint2.pos, p_3);
                    const v = Vec2__get_normal(Vec2_op_Subtraction_Z2434DDE0(lPoint2.pos, lPoint1.pos));
                    return Vec2_op_Addition_Z2434DDE0(p_3, Vec2_op_Multiply_Z1871278C(2, Vec2_op_Multiply_474513F4(vec(-Vec2__get_y(v), Vec2__get_x(v)), dist)));
                }
            }
        }, points_1), append_1((length(points_1) > 1) ? map((tupledArg) => {
            const props_7 = Polygon_opacity(0.3, Polygon_color(tupledArg[1], Polygon_create(tupledArg[0])));
            return createElement(Polygon_render, {
                joinLast: true,
                props: props_7,
            });
        }, ofArray([[points_1, Theme.green], [reflects, Theme.red]])) : singleton_1(createElement(Point_render, (props_8 = Point_create(item(0, reflects)), Point_color(Theme.red, props_8)))), append_1(showPaths ? map((tupledArg_1) => {
            let props_12;
            return createElement(Line_render, Line_weight(2, Line_style("dashed", (props_12 = Line_point2(tupledArg_1[1], Line_point1(tupledArg_1[0], Line_create(new Line_Type(1, [])))), Line_color(Theme.yellow, props_12)))));
        }, zip(points_1, reflects)) : empty_1(), (drawCoord = ((p_4) => {
            let props_16;
            return createElement(Latex_render, (props_16 = Latex_create(`\\tiny \\begin{pmatrix} ${toText(interpolate("%.1f%P()", [Vec2__get_x(p_4)]))} \\\\\ ${toText(interpolate("%.1f%P()", [Vec2__get_y(p_4)]))} \\end{pmatrix}`), Latex_pos(Vec2_op_Addition_Z2434DDE0(p_4, vec(0, 0.5)), props_16)));
        }), append_1(showCoords ? map(drawCoord, take(pointCount, points_1)) : empty_1(), showNewCoords ? map(drawCoord, take(pointCount, reflects)) : empty_1())))))), append_1(toList(delay(() => ((method.tag === 2) ? singleton(tPoint.element) : ((method.tag === 0) ? append(singleton(lPoint1.element), delay(() => singleton(lPoint2.element))) : singleton(tPoint.element))))), map((p_7) => p_7.element, take(pointCount, points))))), children))), delay(() => {
            let elems;
            return singleton(createElement("div", createObj(ofArray([["className", "flex flex-row gap-12 m-2"], (elems = toList(delay(() => append(singleton(CheckList("Options", ofArray([[new TextType(0, ["Snap"]), snap, (e) => {
                patternInput[1](e);
            }], [new TextType(0, ["Snap Rotation"]), snapRotate, (e_1) => {
                patternInput_1[1](e_1);
            }], [new TextType(0, ["Show Coordinates"]), showCoords, (e_2) => {
                patternInput_3[1](e_2);
            }], [new TextType(0, ["Show New Coordinates"]), showNewCoords, (e_3) => {
                patternInput_4[1](e_3);
            }], [new TextType(0, ["Show Paths"]), showPaths, (e_4) => {
                patternInput_5[1](e_4);
            }]]))), delay(() => append(singleton(RadioList("We Want to", 0, ofArray([["Reflect", (e_5) => {
                setMethod(new Transform(0, []));
            }], ["Scale", (e_6) => {
                setMethod(new Transform(1, []));
            }], ["Rotate", (e_7) => {
                setMethod(new Transform(2, []));
            }]]))), delay(() => append(singleton(NumberInput(1, 8, pointCount, (v_2) => {
                patternInput_2[1](~~v_2);
            }, "Number of Points: ")), delay(() => append(equals(method, new Transform(1, [])) ? singleton(Slider("Scale: ", -5, 5, 0.1, scaleFactor, (v_3) => {
                patternInput_7[1](v_3);
            }, true)) : empty(), delay(() => (equals(method, new Transform(2, [])) ? singleton(Slider("Rotation: ", -360, 360, snapRotate ? 90 : 1, rotationFactor, (v_4) => {
                patternInput_8[1](v_4);
            }, true)) : empty()))))))))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))));
        }));
    })), ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])));
}

export const tabs = ofArray([["Vectors", createElement(Vectors, null)], ["Matrices", createElement(Matrices, null)], ["Transforms", createElement(Transforms, null)]]);

export function view(tab) {
    return createElement(Tabbed, {
        tabName: tab,
        tabs: tabs,
    });
}

