import { Union } from "../fable_modules/fable-library.4.9.0/Types.js";
import { union_type } from "../fable_modules/fable-library.4.9.0/Reflection.js";
import { createElement } from "react";
import React from "react";
import { map, filter, singleton, append, delay, toList } from "../fable_modules/fable-library.4.9.0/Seq.js";
import { useFeliz_React__React_useState_Static_1505 } from "../fable_modules/Feliz.2.7.0/React.fs.js";
import { render, create, height as height_1, zoom } from "../mafs/Feliz.Mafs_1/mafs.js";
import { singleton as singleton_1, cons, item, ofSeq, ofArray, append as append_1 } from "../fable_modules/fable-library.4.9.0/List.js";
import { Cartesian_create, Cartesian_yAxis, Cartesian_render } from "../mafs/Feliz.Mafs_1/coordinates.js";
import { Util_Katex, Latex_pos, Latex_color, Latex_create, Latex_render } from "../mafs/Feliz.Mafs_1/text.js";
import { createObj, equals } from "../fable_modules/fable-library.4.9.0/Util.js";
import { Theme } from "../mafs/Feliz.Mafs_1/common.js";
import { vec } from "../mafs/Feliz.Mafs_1/maths.js";
import { rangeDouble } from "../fable_modules/fable-library.4.9.0/Range.js";
import { toConsole } from "../fable_modules/fable-library.4.9.0/String.js";
import { Circle_center, Circle_opacity, Circle_render, Circle_color, Circle_create, Line_color, Line_point2, Line_point1, Line_Type, Line_create, Line_weight, Line_render, Point_color, Point_create, Point_render } from "../mafs/Feliz.Mafs_1/geometry.js";
import { Tabbed, TableDirection, StaticTable, SubHeading, Heading, Accordion, UnorderedList, PopupSize, Popup, Article, RadioList, TextType, Checkbox, Slider, NumberInput } from "../shared/components.js";
import { Interop_reactApi } from "../fable_modules/Feliz.2.7.0/Interop.fs.js";

export class Set$ extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Integers", "Naturals", "Rationals", "Irrationals", "Reals", "Complex"];
    }
}

export function Set$_$reflection() {
    return union_type("EDS.Maths.IG.Set", [], Set$, () => [[], [], [], [], [], []]);
}

export function Set_get_toInt() {
    return (_arg) => ((_arg.tag === 1) ? 1 : ((_arg.tag === 2) ? 2 : ((_arg.tag === 3) ? 3 : ((_arg.tag === 4) ? 4 : ((_arg.tag === 5) ? 5 : 0)))));
}

export function Set_get_toLatex() {
    return (_arg) => ((_arg.tag === 1) ? "\\N" : ((_arg.tag === 2) ? "\\Q" : ((_arg.tag === 3) ? "\\I" : ((_arg.tag === 4) ? "\\Reals" : ((_arg.tag === 5) ? "\\Complex" : "\\Z")))));
}

export function Numbers_NumberSets() {
    const children_1 = toList(delay(() => {
        let children, props_5, props_4, points, points_1, props_11, props_10, props_9;
        const patternInput = useFeliz_React__React_useState_Static_1505(0);
        const setLower = patternInput[1];
        const lower = patternInput[0];
        const patternInput_1 = useFeliz_React__React_useState_Static_1505(5);
        const upper = patternInput_1[0];
        const setUpper = patternInput_1[1];
        const patternInput_2 = useFeliz_React__React_useState_Static_1505(true);
        const lowerInc = patternInput_2[0];
        const patternInput_3 = useFeliz_React__React_useState_Static_1505(true);
        const upperInc = patternInput_3[0];
        const patternInput_4 = useFeliz_React__React_useState_Static_1505(new Set$(0, []));
        const setNumberSet = patternInput_4[1];
        const numberSet = patternInput_4[0];
        return append(singleton((children = zoom(0.5, 7.5, height_1(200, create())), render(append_1(ofArray([createElement(Cartesian_render, Cartesian_yAxis(void 0, Cartesian_create())), createElement(Latex_render, (props_5 = ((props_4 = Latex_create(`\\Large{ ${Set_get_toLatex()(numberSet)} =
                                ${lowerInc ? "[" : "("}
                                   ${lower}, ${upper}
                                ${upperInc ? "]" : ")"} }`), Latex_color(((lower > upper) ? true : (equals(numberSet, new Set$(1, [])) && (lower < 0))) ? Theme.red : Theme.foreground, props_4))), Latex_pos(vec(0, 1.25), props_5)))]), (points = ((numberSet.tag === 0) ? filter((n) => {
            if (equals(numberSet, new Set$(1, []))) {
                return n >= 0;
            }
            else {
                return true;
            }
        }, rangeDouble(lowerInc ? lower : (lower + 1), 1, upperInc ? upper : (upper - 1))) : ((numberSet.tag === 1) ? filter((n) => {
            if (equals(numberSet, new Set$(1, []))) {
                return n >= 0;
            }
            else {
                return true;
            }
        }, rangeDouble(lowerInc ? lower : (lower + 1), 1, upperInc ? upper : (upper - 1))) : ((numberSet.tag === 4) ? (((lower > upper) ? true : ((lower === upper) && (!lowerInc ? true : !upperInc))) ? [] : [lower, upper]) : ((toConsole(`Number set '${numberSet}' not implemented`), []))))), (numberSet.tag === 0) ? ofSeq(map((x) => {
            let props_7;
            return createElement(Point_render, (props_7 = Point_create(vec(x, 0)), Point_color(Theme.indigo, props_7)));
        }, points)) : ((numberSet.tag === 1) ? ofSeq(map((x) => {
            let props_7;
            return createElement(Point_render, (props_7 = Point_create(vec(x, 0)), Point_color(Theme.indigo, props_7)));
        }, points)) : ((numberSet.tag === 4) ? (!equals(points, []) ? cons((points_1 = ofSeq(points), createElement(Line_render, Line_weight(5, (props_11 = ((props_10 = ((props_9 = Line_create(new Line_Type(1, [])), Line_point1(vec(item(0, points_1), 0), props_9))), Line_point2(vec(item(1, points_1), 0), props_10))), Line_color(Theme.orange, props_11))))), toList(delay(() => {
            let circle;
            const props_14 = Circle_create(0.3);
            circle = Circle_color(Theme.orange, props_14);
            return append(singleton(createElement(Circle_render, Circle_opacity(lowerInc ? 1 : 0, Circle_center(vec(lower, 0), circle)))), delay(() => singleton(createElement(Circle_render, Circle_opacity(upperInc ? 1 : 0, Circle_center(vec(upper, 0), circle))))));
        }))) : singleton_1(createElement("div", {}))) : singleton_1(createElement("div", {})))))), children))), delay(() => {
            let elems_3, elems, elems_1, elems_2;
            const step = (equals(numberSet, new Set$(0, [])) ? true : equals(numberSet, new Set$(1, []))) ? 1 : 0.1;
            return append(singleton(createElement("div", createObj(ofArray([["className", "flex flex-row justify-center m-2"], (elems_3 = [createElement("div", createObj(ofArray([["className", "px-3 border-r-2"], (elems = [NumberInput(-20, 20, lower, (v) => {
                setLower(v);
            }, "Lower Limit"), Slider("", -20, 20, step, lower, (v_1) => {
                setLower(v_1);
            }, false), Checkbox(new TextType(0, ["Inclusive"]), lowerInc, (v_2) => {
                patternInput_2[1](v_2);
            })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))), createElement("div", createObj(ofArray([["className", "px-3 border-l-2"], (elems_1 = [NumberInput(-20, 20, upper, (v_3) => {
                setUpper(v_3);
            }, "Upper Limit"), Slider("", -20, 20, step, upper, (v_4) => {
                setUpper(v_4);
            }, false), Checkbox(new TextType(0, ["Inclusive"]), upperInc, (v_5) => {
                patternInput_3[1](v_5);
            })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])]))), createElement("div", createObj(ofArray([["className", "pl-12"], (elems_2 = [RadioList("Number Sets", Set_get_toInt()(numberSet), ofArray([["Integers", (e) => {
                setNumberSet(new Set$(0, []));
                setLower(~~lower);
                setUpper(~~upper);
            }], ["Naturals", (e_1) => {
                setNumberSet(new Set$(1, []));
                setLower(~~lower);
                setUpper(~~upper);
            }], ["Reals", (e_2) => {
                setNumberSet(new Set$(4, []));
            }]]))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])])))), delay(() => append(singleton(Article(ofArray(["Some text before", Popup("Define this", new PopupSize(0, []), "This is the definition"), createElement("br", {}), Popup("Define this", new PopupSize(1, []), "This is the definition"), createElement("br", {}), Popup("Define this", new PopupSize(2, []), "This is the definition"), createElement("br", {}), Popup("Define this", new PopupSize(3, []), "This is the definition"), "Some text afterwards"]))), delay(() => singleton(Article(ofArray([UnorderedList(ofArray(["Natural Numbers", "Integers", "Rational Numbers", "Irrational Numbers", "Real Numbers", "Prime Numbers", "Square Numbers and Square Roots", "Cubic Numbers", "Factors", "Prime Factors"])), UnorderedList(ofArray(["Highest Common Factor", "Least Common Factor", "Upper and Lower Bounds", "Significant Figures and Decimal Places", "Accuracy and Precision", "Inequalities", "Integers, Fractions Decimals and Percentages"])), createElement(Accordion, {
                xs: ofArray([["Extended", "Content for the extended section"], ["Beyond", "Content for the beyond section"]]),
            }), createElement("p", {
                children: ["Text following the extended section"],
            })])))))));
        }));
    }));
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children_1)),
    });
}

export function Numbers_Exponents() {
    const children = toList(delay(() => append(singleton(Heading("Exponents")), delay(() => append(singleton(SubHeading("Rules for Exponents")), delay(() => {
        const tex = (inner) => createElement(Util_Katex, {
            text: `\\color{black}${inner}`,
        });
        return singleton(createElement(StaticTable, {
            dir: new TableDirection(1, []),
            xs: ofArray([ofArray(["Rules", "Examples"]), ofArray([tex("x^0 = 1"), tex("\\qquad 2^0 = 1")]), ofArray([tex("x^1 = x"), tex("\\qquad 3^1 = 3")]), ofArray([tex("x^n = x_1 \\times x_2 \\times \\dots \\times x_n"), tex("\\qquad x^5 = x \\times x \\times x \\times x \\times x")]), ofArray([tex("x^ax^b = x^{a + b}"), tex("\\qquad x^2x^3 = x^{2 + 3} = x^5 \\\\\n                          \\qquad x^{-1}x^2 = x^{-1 + 2} = x")]), ofArray([tex("(x^n)^m = x^{nm}"), tex("\\qquad (x^2)^3 = x^{2 \\times 3} = x^6")]), ofArray([tex("\\dfrac{a}{x^n} = ax^{-n}"), tex("\\qquad \\frac{1}{x} = x^{-1}\n                          \\qquad \\frac{5}{x^2} = 5x^{-2}\n                          \\qquad \\frac{2}{3x^{-3}} = \\frac{2}{3}x^3")]), ofArray([tex("\\dfrac{x^a}{x^b} = x^{a - b}"), tex("\\qquad \\frac{x^2}{x^3} = x^{2 - 3} = x^{-1} = \\frac{1}{x} \\\\\n                          \\qquad \\frac{x^7}{x^3} = x^{7 - 3} = x^4")]), ofArray([tex("\\left( \\dfrac{x}{y} \\right)^n = \\dfrac{x^n}{y^n}"), tex("\\qquad \\left( \\frac{x}{y^2} \\right)^3 = \\frac{x^3}{y^6}")])]),
        }));
    }))))));
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

export function Numbers_Percentages() {
    return Heading("Percentages");
}

export function Numbers_Estimates() {
    return Heading("Estimates");
}

export function Numbers_Currency() {
    return Heading("Currency");
}

export const Numbers_tabs = ofArray([["Sets", createElement(Numbers_NumberSets, null)], ["Exponents", createElement(Numbers_Exponents, null)], ["Percentages", createElement(Numbers_Percentages, null)], ["Estimates", createElement(Numbers_Estimates, null)], ["Currency", createElement(Numbers_Currency, null)]]);

export function Numbers_view(tab) {
    return createElement(Tabbed, {
        tabName: tab,
        tabs: Numbers_tabs,
    });
}

