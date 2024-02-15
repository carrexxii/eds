import { ofSeq, cons, fold, append, singleton, skip, take, ofArray, tail, head, isEmpty } from "../../fable_modules/fable-library.4.9.0/List.js";
import { toConsole, replace, trimEnd } from "../../fable_modules/fable-library.4.9.0/String.js";
import { Record, Union } from "../../fable_modules/fable-library.4.9.0/Types.js";
import { list_type, int32_type, class_type, record_type, union_type, float64_type } from "../../fable_modules/fable-library.4.9.0/Reflection.js";
import { map, append as append_1, delay, toList } from "../../fable_modules/fable-library.4.9.0/Seq.js";
import { rangeDouble } from "../../fable_modules/fable-library.4.9.0/Range.js";

export function Algebra_vecStr(elems, suffixes) {
    const loop = (_arg_2) => {
        let _arg_1, _arg;
        let matchResult, b_2, bs, x_1, xs;
        if (!isEmpty(_arg_2[1])) {
            if (!isEmpty(_arg_2[0])) {
                matchResult = 1;
                b_2 = head(_arg_2[1]);
                bs = tail(_arg_2[1]);
                x_1 = head(_arg_2[0]);
                xs = tail(_arg_2[0]);
            }
            else {
                matchResult = 0;
            }
        }
        else {
            matchResult = 0;
        }
        switch (matchResult) {
            case 0:
                return "";
            default:
                return (((_arg_1 = [x_1, b_2], (_arg_1[0] === 1) ? ((_arg_1[1] === "") ? "1" : "") : ((_arg_1[0] === 0) ? "" : ((_arg_1[0] === -1) ? "-" : (`${_arg_1[0]}`))))) + ((_arg = [x_1, xs, b_2], (_arg[0] === 0) ? "" : (isEmpty(_arg[1]) ? _arg[2] : (`${_arg[2]} + `))))) + loop([xs, bs]);
        }
    };
    const s = trimEnd(replace(loop([elems, suffixes]), "+ -", "- "), " ", "+");
    if (s === "") {
        return "0";
    }
    else {
        return s;
    }
}

export const R200_basis = ofArray(["", "e1", "e2", "e12"]);

export class R200_Blades extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Zero", "One", "Two"];
    }
}

export function R200_Blades_$reflection() {
    return union_type("SharpGA.R200.Blades", [], R200_Blades, () => [[["Item", float64_type]], [["Item", R200_Vec_$reflection()]], [["Item", R200_Bivec_$reflection()]]]);
}

export class R200_Vec extends Record {
    constructor(e1, e2) {
        super();
        this.e1 = e1;
        this.e2 = e2;
    }
    toString() {
        const this$ = this;
        return Algebra_vecStr(R200_Vec__get_list(this$), take(2, skip(1, R200_basis)));
    }
}

export function R200_Vec_$reflection() {
    return record_type("SharpGA.R200.Vec", [], R200_Vec, () => [["e1", float64_type], ["e2", float64_type]]);
}

export class R200_Bivec extends Record {
    constructor(e12) {
        super();
        this.e12 = e12;
    }
    toString() {
        const this$ = this;
        return Algebra_vecStr(singleton(this$.e12), take(1, skip(3, R200_basis)));
    }
}

export function R200_Bivec_$reflection() {
    return record_type("SharpGA.R200.Bivec", [], R200_Bivec, () => [["e12", float64_type]]);
}

export class R200_MultiVec extends Record {
    constructor(s, e1, e2, e12) {
        super();
        this.s = s;
        this.e1 = e1;
        this.e2 = e2;
        this.e12 = e12;
    }
    toString() {
        const this$ = this;
        return Algebra_vecStr(R200_MultiVec__get_list(this$), R200_basis);
    }
}

export function R200_MultiVec_$reflection() {
    return record_type("SharpGA.R200.MultiVec", [], R200_MultiVec, () => [["s", float64_type], ["e1", float64_type], ["e2", float64_type], ["e12", float64_type]]);
}

export function R200_Vec_get_Default() {
    return new R200_Vec(0, 0);
}

export function R200_Vec_create(e1, e2) {
    return new R200_Vec(e1, e2);
}

export function R200_Vec__get_list(this$) {
    return ofArray([this$.e1, this$.e2]);
}

export function R200_Vec_op_BangMultiply_Z2D4D68D5(a) {
    return new R200_Vec(-a.e2, a.e1);
}

export function R200_Vec_op_Addition_773D7BB0(a, s) {
    return R200_MultiVec_create(s, a.e1, a.e2, 0);
}

export function R200_Vec_op_Addition_Z8758650(s, a) {
    return R200_MultiVec_create(s, a.e1, a.e2, 0);
}

export function R200_Vec_op_Addition_Z4481460(a, b) {
    return new R200_Vec(a.e1 + b.e1, a.e2 + b.e2);
}

export function R200_Vec_op_Addition_638EC28B(a, B) {
    return R200_MultiVec_create(0, a.e1, a.e2, B.e12);
}

export function R200_Vec_op_DotBarDot_Z4481460(a, b) {
    return (a.e1 * b.e1) + (a.e2 * b.e2);
}

export function R200_Vec_op_DotHatDot_Z4481460(a, b) {
    return new R200_Bivec((a.e1 * b.e2) - (a.e2 * b.e1));
}

export function R200_Vec_op_Multiply_Z4481460(a, b) {
    return R200_Bivec_op_Addition_6FB3509B(R200_Vec_op_DotBarDot_Z4481460(a, b), R200_Vec_op_DotHatDot_Z4481460(a, b));
}

export function R200_Vec_op_DotAmpDot_Z4481460(a, b) {
    return R200_Bivec_op_BangMultiply_4A8BBE00(R200_Vec_op_DotHatDot_Z4481460(R200_Vec_op_BangMultiply_Z2D4D68D5(a), R200_Vec_op_BangMultiply_Z2D4D68D5(b)));
}

export function R200_Bivec_get_Default() {
    return new R200_Bivec(0);
}

export function R200_Bivec_create_5E38073B(e12) {
    return new R200_Bivec(e12);
}

export function R200_Bivec_op_BangMultiply_4A8BBE00(A) {
    return -1;
}

export function R200_Bivec_op_Addition_Z3DC486C5(A, s) {
    return R200_MultiVec_create(s, 0, 0, A.e12);
}

export function R200_Bivec_op_Addition_6FB3509B(s, A) {
    return R200_MultiVec_create(s, 0, 0, A.e12);
}

export function R200_Bivec_op_Addition_4EB1E92B(B, a) {
    return R200_MultiVec_create(0, a.e1, a.e2, B.e12);
}

export function R200_Bivec_op_Addition_Z6A5E95BE(A, V) {
    const V_1 = V;
    return new R200_MultiVec(V_1.s, V_1.e1, V_1.e2, V_1.e12 + A.e12);
}

export function R200_MultiVec_get_Default() {
    return new R200_MultiVec(0, 0, 0, 0);
}

export function R200_MultiVec_create(s, e1, e2, e12) {
    return new R200_MultiVec(s, e1, e2, e12);
}

export function R200_MultiVec__get_list(this$) {
    return ofArray([this$.s, this$.e1, this$.e2, this$.e12]);
}

export function R200_MultiVec_op_Addition_Z10A9F457(V, a) {
    const V_1 = V;
    return new R200_MultiVec(V_1.s, V_1.e1 + a.e1, V_1.e2 + a.e2, V_1.e12);
}

export function R200_MultiVec_op_Addition_776F2282(V, A) {
    const V_1 = V;
    return new R200_MultiVec(V_1.s, V_1.e1, V_1.e2, V_1.e12 + A.e12);
}

export function R200_MultiVec_op_Addition_344688C0(V, U) {
    const V_1 = V;
    const U_1 = U;
    return R200_MultiVec_create(V_1.s + U_1.s, V_1.e1 + U_1.e1, V_1.e2 + U_1.e2, V_1.e12 + U_1.e12);
}

export function R200_Helpers_vec(e, e_1) {
    return R200_Vec_create(e, e_1);
}

export function R200_Helpers_bivec(e) {
    return R200_Bivec_create_5E38073B(e);
}

export function R200_Helpers_multivec(s, e, e_1, e_2) {
    return R200_MultiVec_create(s, e, e_1, e_2);
}

export const R201_basis = ofArray(["", "e1", "e2", "e0", "e01", "e02", "e12", "e012"]);

export function R201_op_BangLessGreater(x) {
    return x;
}

export class R201_Point extends Record {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
    toString() {
        const this$ = this;
        return `${this$.x}, ${this$.y}`;
    }
}

export function R201_Point_$reflection() {
    return record_type("SharpGA.R201.Point", [], R201_Point, () => [["x", float64_type], ["y", float64_type]]);
}

export function R201_Point_get_Default() {
    return new R201_Point(0, 0);
}

export function R201_Point_create(x, y) {
    return new R201_Point(x, y);
}

export function R201_Point__get_tuple(this$) {
    return [this$.x, this$.y];
}

export function R201_Point_op_Addition_2B7E8140(p1, p2) {
    return new R201_Point(p1.x + p2.x, p1.y + p2.y);
}

export function R201_Point_op_Subtraction_2B7E8140(p1, p2) {
    return new R201_Point(p1.x - p2.x, p1.y - p2.y);
}

export function R201_Point_op_Multiply_126FF58D(p, s) {
    return new R201_Point(p.x * s, p.y * s);
}

export function R201_Point_op_Division_126FF58D(p, s) {
    return new R201_Point(p.x / s, p.y / s);
}

export class R201_Blade extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Zero", "One", "Two", "Three"];
    }
}

export function R201_Blade_$reflection() {
    return union_type("SharpGA.R201.Blade", [], R201_Blade, () => [[["Item", float64_type]], [["Item", R201_Vec_$reflection()]], [["Item", R201_Bivec_$reflection()]], [["Item", R201_PSS_$reflection()]]]);
}

export class R201_Vec extends Record {
    constructor(e1, e2, e0) {
        super();
        this.e1 = e1;
        this.e2 = e2;
        this.e0 = e0;
    }
    toString() {
        const this$ = this;
        return Algebra_vecStr(R201_Vec__get_list(this$), take(3, skip(1, R201_basis)));
    }
}

export function R201_Vec_$reflection() {
    return record_type("SharpGA.R201.Vec", [], R201_Vec, () => [["e1", float64_type], ["e2", float64_type], ["e0", float64_type]]);
}

export class R201_Bivec extends Record {
    constructor(e01, e02, e12) {
        super();
        this.e01 = e01;
        this.e02 = e02;
        this.e12 = e12;
    }
    toString() {
        const this$ = this;
        return Algebra_vecStr(R201_Bivec__get_list(this$), take(3, skip(4, R201_basis)));
    }
}

export function R201_Bivec_$reflection() {
    return record_type("SharpGA.R201.Bivec", [], R201_Bivec, () => [["e01", float64_type], ["e02", float64_type], ["e12", float64_type]]);
}

export class R201_PSS extends Record {
    constructor(e012) {
        super();
        this.e012 = e012;
    }
    toString() {
        const this$ = this;
        return Algebra_vecStr(R201_PSS__get_list(this$), take(1, skip(7, R201_basis)));
    }
}

export function R201_PSS_$reflection() {
    return record_type("SharpGA.R201.PSS", [], R201_PSS, () => [["e012", float64_type]]);
}

export class R201_MultiVec extends Record {
    constructor(scalar, vec, bivec, pss) {
        super();
        this.scalar = scalar;
        this.vec = vec;
        this.bivec = bivec;
        this.pss = pss;
    }
    toString() {
        const this$ = this;
        return Algebra_vecStr(R201_MultiVec__get_list(this$), R201_basis);
    }
}

export function R201_MultiVec_$reflection() {
    return record_type("SharpGA.R201.MultiVec", [], R201_MultiVec, () => [["scalar", float64_type], ["vec", R201_Vec_$reflection()], ["bivec", R201_Bivec_$reflection()], ["pss", R201_PSS_$reflection()]]);
}

export function R201_Vec_get_Default() {
    return new R201_Vec(0, 0, 0);
}

export function R201_Vec_create(a, b, c) {
    return new R201_Vec(a * 1, b * 1, c * 1);
}

export function R201_Vec__get_list(this$) {
    return ofArray([R201_op_BangLessGreater(this$.e1), R201_op_BangLessGreater(this$.e2), R201_op_BangLessGreater(this$.e0)]);
}

export function R201_Vec__get_tuple(this$) {
    return [R201_op_BangLessGreater(this$.e1), R201_op_BangLessGreater(this$.e2), R201_op_BangLessGreater(this$.e0)];
}

export function R201_Vec__get_mag(this$) {
    const patternInput = R201_Vec__get_tuple(this$);
    return Math.sqrt((Math.pow(patternInput[0], 2) + Math.pow(patternInput[1], 2)) + Math.pow(patternInput[2], 2));
}

export function R201_Vec__get_normalized(this$) {
    return new R201_Vec(this$.e1 / R201_Vec__get_mag(this$), this$.e2 / R201_Vec__get_mag(this$), this$.e0 / R201_Vec__get_mag(this$));
}

export function R201_Vec__get_Item(this$) {
    return (_arg) => {
        switch (_arg) {
            case 0:
                return R201_op_BangLessGreater(this$.e1);
            case 1:
                return R201_op_BangLessGreater(this$.e2);
            case 2:
                return R201_op_BangLessGreater(this$.e0);
            default:
                throw new Error();
        }
    };
}

export function R201_Vec__points_Z2997FE88(this$, midX) {
    const patternInput = R201_Vec__get_tuple(this$);
    const b_1 = -patternInput[0];
    const x_1 = (midX != null) ? (midX + R201_Vec__get_mag(this$)) : R201_Vec__get_mag(this$);
    const m = -(patternInput[1] / b_1);
    const yi = -(patternInput[2] / b_1);
    if (x_1 === 0) {
        toConsole(`${this$}`);
        return [R201_Point_create(x_1, 10), R201_Point_create(-x_1, -10)];
    }
    else {
        return [R201_Point_create(x_1, (m * x_1) + yi), R201_Point_create(-x_1, (-m * x_1) + yi)];
    }
}

export function R201_Vec_op_BangMultiply_Z2D829096(a) {
    return new R201_Bivec(a.e2 * 1, -a.e1 * 1, a.e0 * 1);
}

export function R201_Vec_op_BangMultiplyMultiply_Z2D829096(a) {
    return R201_Vec_op_BangMultiply_Z2D829096(a);
}

export function R201_Vec_op_TwiddleTwiddle_Z2D829096(a) {
    return R201_Bivec_op_BangMultiply_686DB281(R201_Vec_op_BangMultiply_Z2D829096(a));
}

export function R201_Vec_op_Addition_ZFA9CC40(a, b) {
    return new R201_Vec(a.e1 + b.e1, a.e2 + b.e2, a.e0 + b.e0);
}

export function R201_Vec_op_Multiply_7C135B91(a, s) {
    return new R201_Vec(a.e1 * s, a.e2 * s, a.e0 * s);
}

export function R201_Vec_op_Multiply_Z8BA7E0F(s, a) {
    return R201_Vec_op_Multiply_7C135B91(a, s);
}

export function R201_Vec_op_Division_7C135B91(a, s) {
    return new R201_Vec(a.e1 / s, a.e2 / s, a.e0 / s);
}

export function R201_Vec_op_DotHatDot_7C135B91(a, s) {
    return R201_Vec_op_Multiply_Z8BA7E0F(s, a);
}

export function R201_Vec_op_DotHatDot_Z8BA7E0F(s, a) {
    return R201_Vec_op_Multiply_Z8BA7E0F(s, a);
}

export function R201_Vec_op_DotHatDot_ZFA9CC40(a, b) {
    return new R201_Bivec((a.e0 * b.e1) - (a.e1 * b.e0), (a.e0 * b.e2) - (a.e2 * b.e0), (a.e1 * b.e2) - (a.e2 * b.e1));
}

export function R201_Vec_op_DotHatDot_4A46EE2B(a, B) {
    const B_1 = B;
    return new R201_PSS(((a.e0 * B_1.e12) - (a.e1 * B_1.e02)) + (a.e2 * B_1.e01));
}

export function R201_Vec_op_Amp_4A46EE2B(a, b) {
    return R201_PSS_op_BangMultiplyMultiply_Z2D82AB96(R201_Bivec_op_DotHatDot_Z5BA69235(R201_Vec_op_BangMultiplyMultiply_Z2D829096(a), R201_Bivec_op_BangMultiplyMultiply_686DB281(b)));
}

export function R201_Bivec_get_Default() {
    return new R201_Bivec(0, 0, 0);
}

export function R201_Bivec_create(a, b, c) {
    return new R201_Bivec(a * 1, b * 1, c * 1);
}

export function R201_Bivec__get_list(this$) {
    return ofArray([R201_op_BangLessGreater(this$.e01), R201_op_BangLessGreater(this$.e02), R201_op_BangLessGreater(this$.e12)]);
}

export function R201_Bivec__get_tuple(this$) {
    return [R201_op_BangLessGreater(this$.e01), R201_op_BangLessGreater(this$.e02), R201_op_BangLessGreater(this$.e12)];
}

export function R201_Bivec__get_point(this$) {
    return R201_Point_create(R201_op_BangLessGreater(this$.e01 / this$.e12), R201_op_BangLessGreater(this$.e02 / this$.e12));
}

export function R201_Bivec__get_Item(this$) {
    return (_arg) => {
        switch (_arg) {
            case 0:
                return R201_op_BangLessGreater(this$.e01);
            case 1:
                return R201_op_BangLessGreater(this$.e02);
            case 2:
                return R201_op_BangLessGreater(this$.e12);
            default:
                throw new Error();
        }
    };
}

export function R201_Bivec_op_BangMultiply_686DB281(a) {
    return new R201_Vec(a.e02 * 1, a.e01 * 1, a.e12 * 1);
}

export function R201_Bivec_op_BangMultiplyMultiply_686DB281(a) {
    return R201_Bivec_op_BangMultiply_686DB281(a);
}

export function R201_Bivec_op_TwiddleTwiddle_686DB281(a) {
    return R201_Vec_op_BangMultiply_Z2D829096(R201_Bivec_op_BangMultiply_686DB281(a));
}

export function R201_Bivec_op_Addition_1E49B020(A, B) {
    const A_1 = A;
    const B_1 = B;
    return new R201_Bivec(A_1.e01 + B_1.e01, A_1.e02 + B_1.e02, A_1.e12 + B_1.e12);
}

export function R201_Bivec_op_Multiply_281C059A(A, s) {
    const A_1 = A;
    return new R201_Bivec(A_1.e01 * s, A_1.e02 * s, A_1.e12 * s);
}

export function R201_Bivec_op_Multiply_4D555C1A(s, A) {
    return R201_Bivec_op_Multiply_281C059A(A, s);
}

export function R201_Bivec_op_DotHatDot_Z5BA69235(B, a) {
    return R201_Vec_op_DotHatDot_4A46EE2B(a, B);
}

export function R201_Bivec_op_DotAmpDot_1E49B020(A, B) {
    return R201_Bivec_op_BangMultiplyMultiply_686DB281(R201_Vec_op_DotHatDot_ZFA9CC40(R201_Bivec_op_BangMultiplyMultiply_686DB281(A), R201_Bivec_op_BangMultiplyMultiply_686DB281(B)));
}

export function R201_PSS_get_Default() {
    return new R201_PSS(0);
}

export function R201_PSS_create_5E38073B(a) {
    return new R201_PSS(a * 1);
}

export function R201_PSS__get_list(this$) {
    return singleton(R201_op_BangLessGreater(this$.e012));
}

export function R201_PSS_op_BangMultiply_Z2D82AB96(I) {
    return R201_op_BangLessGreater(I.e012);
}

export function R201_PSS_op_BangMultiplyMultiply_Z2D82AB96(I) {
    return R201_PSS_op_BangMultiply_Z2D82AB96(I);
}

export function R201_PSS_op_Addition_ZFA54A40(I1, I2) {
    return new R201_PSS(I1.e012 + I2.e012);
}

export function R201_PSS_op_Multiply_7C1FE691(I, s) {
    return new R201_PSS(I.e012 * s);
}

export function R201_PSS_op_Multiply_Z8BA450F(s, I) {
    return R201_PSS_op_Multiply_7C1FE691(I, s);
}

export function R201_PSS_op_Amp_ZFA54A40(I1, I2) {
    return new R201_PSS((I1.e012 * I2.e012) / 1);
}

export function R201_MultiVec_get_Default() {
    return new R201_MultiVec(0, R201_Vec_get_Default(), R201_Bivec_get_Default(), R201_PSS_get_Default());
}

export function R201_MultiVec_create(scalar, vec, bivec, pss) {
    return new R201_MultiVec(scalar, vec, bivec, pss);
}

export function R201_MultiVec__get_list(this$) {
    return append(singleton(this$.scalar), append(R201_Vec__get_list(this$.vec), append(R201_Bivec__get_list(this$.bivec), R201_PSS__get_list(this$.pss))));
}

export class R201_Helpers {
    constructor() {
    }
}

export function R201_Helpers_$reflection() {
    return class_type("SharpGA.R201.Helpers", void 0, R201_Helpers);
}

export function R201_Helpers_get_vec() {
    return (a) => ((b) => ((c) => R201_Vec_create(a, b, c)));
}

export function R201_Helpers_get_bivec() {
    return (a) => ((b) => ((c) => R201_Bivec_create(a, b, c)));
}

export function R201_Helpers_get_pss() {
    return R201_PSS_create_5E38073B;
}

export function R201_Helpers_get_mvec() {
    return (scalar) => ((vec) => ((bivec) => ((pss) => R201_MultiVec_create(scalar, vec, bivec, pss))));
}

export function R201_Helpers_get_point() {
    return (x) => ((y) => R201_Point_create(x, y));
}

export function R201_Helpers_midpoint(A, B) {
    return R201_Point_op_Division_126FF58D(R201_Point_op_Addition_2B7E8140(R201_Bivec__get_point(A), R201_Bivec__get_point(B)), 2);
}

export class T_Basis extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Positive", "Negative", "Zero", "Mixed", "Scalar"];
    }
    toString() {
        const this$ = this;
        let matchResult, a;
        switch (this$.tag) {
            case 1: {
                matchResult = 0;
                a = this$.fields[0];
                break;
            }
            case 2: {
                matchResult = 0;
                a = this$.fields[0];
                break;
            }
            case 3: {
                matchResult = 1;
                break;
            }
            case 4: {
                matchResult = 2;
                break;
            }
            default: {
                matchResult = 0;
                a = this$.fields[0];
            }
        }
        switch (matchResult) {
            case 0:
                return `e${a}`;
            case 1:
                return `e${fold((acc, b) => (`${acc}${T_Basis__get_value(b)}`), "", this$.fields[0])}`;
            default:
                return `${this$.fields[0]}`;
        }
    }
}

export function T_Basis_$reflection() {
    return union_type("SharpGA.T.Basis", [], T_Basis, () => [[["Item", int32_type]], [["Item", int32_type]], [["Item", int32_type]], [["Item", list_type(T_Basis_$reflection())]], [["Item", int32_type]]]);
}

export function T_Basis__get_value(this$) {
    let matchResult, a;
    switch (this$.tag) {
        case 3:
        case 4: {
            matchResult = 1;
            break;
        }
        case 1: {
            matchResult = 0;
            a = this$.fields[0];
            break;
        }
        case 2: {
            matchResult = 0;
            a = this$.fields[0];
            break;
        }
        default: {
            matchResult = 0;
            a = this$.fields[0];
        }
    }
    switch (matchResult) {
        case 0:
            return a | 0;
        default:
            return 0;
    }
}

export function T_Basis_op_Multiply_Z7C893760(a, b) {
    let matchResult, a_4, b_4, a_5, b_5, a_6, b_6, a_7, b_7, a_8, b_8, a_9, b_9, a_10, b_10, a_11, b_11;
    switch (a.tag) {
        case 0: {
            switch (b.tag) {
                case 0: {
                    if (a.fields[0] === b.fields[0]) {
                        matchResult = 0;
                        a_4 = a.fields[0];
                        b_4 = b.fields[0];
                    }
                    else {
                        matchResult = 3;
                        a_7 = a.fields[0];
                        b_7 = b.fields[0];
                    }
                    break;
                }
                case 2: {
                    matchResult = 4;
                    a_8 = a.fields[0];
                    b_8 = b.fields[0];
                    break;
                }
                case 3: {
                    matchResult = 7;
                    a_11 = b.fields[0];
                    b_11 = a;
                    break;
                }
                default:
                    matchResult = 8;
            }
            break;
        }
        case 1: {
            switch (b.tag) {
                case 1: {
                    if (a.fields[0] === b.fields[0]) {
                        matchResult = 1;
                        a_5 = a.fields[0];
                        b_5 = b.fields[0];
                    }
                    else {
                        matchResult = 8;
                    }
                    break;
                }
                case 2: {
                    matchResult = 5;
                    a_9 = a.fields[0];
                    b_9 = b.fields[0];
                    break;
                }
                case 3: {
                    matchResult = 7;
                    a_11 = b.fields[0];
                    b_11 = a;
                    break;
                }
                default:
                    matchResult = 8;
            }
            break;
        }
        case 2: {
            switch (b.tag) {
                case 2: {
                    if (a.fields[0] === b.fields[0]) {
                        matchResult = 2;
                        a_6 = a.fields[0];
                        b_6 = b.fields[0];
                    }
                    else {
                        matchResult = 8;
                    }
                    break;
                }
                case 0: {
                    matchResult = 4;
                    a_8 = b.fields[0];
                    b_8 = a.fields[0];
                    break;
                }
                case 1: {
                    matchResult = 5;
                    a_9 = b.fields[0];
                    b_9 = a.fields[0];
                    break;
                }
                case 3: {
                    matchResult = 7;
                    a_11 = b.fields[0];
                    b_11 = a;
                    break;
                }
                default:
                    matchResult = 8;
            }
            break;
        }
        case 3: {
            if (b.tag === 3) {
                matchResult = 6;
                a_10 = a.fields[0];
                b_10 = b.fields[0];
            }
            else {
                matchResult = 7;
                a_11 = a.fields[0];
                b_11 = b;
            }
            break;
        }
        default:
            if (b.tag === 3) {
                matchResult = 7;
                a_11 = b.fields[0];
                b_11 = a;
            }
            else {
                matchResult = 8;
            }
    }
    switch (matchResult) {
        case 0:
            return new T_Basis(4, [1]);
        case 1:
            return new T_Basis(4, [-1]);
        case 2:
            return new T_Basis(4, [0]);
        case 3:
            return new T_Basis(3, [ofArray([new T_Basis(0, [a_7]), new T_Basis(0, [b_7])])]);
        case 4:
            return new T_Basis(3, [ofArray([new T_Basis(2, [b_8]), new T_Basis(0, [a_8])])]);
        case 5:
            return new T_Basis(3, [ofArray([new T_Basis(2, [b_9]), new T_Basis(1, [a_9])])]);
        case 6:
            return new T_Basis(3, [append(a_10, b_10)]);
        case 7:
            return new T_Basis(3, [cons(b_11, a_11)]);
        default:
            throw new Error(`Unmatched: ${a} :: ${b}`);
    }
}

export class T_Algebra_R {
    constructor(p, n, z) {
        this["p@437"] = (p | 0);
        this["n@437"] = (n | 0);
        this["z@437"] = (z | 0);
    }
    toString() {
        const this$ = this;
        return `Algebra of R(${T_Algebra_R__get_p(this$)}, ${T_Algebra_R__get_n(this$)}, ${T_Algebra_R__get_z(this$)}) -> ${ofSeq(T_Algebra_R__get_basis(this$))}`;
    }
}

export function T_Algebra_R_$reflection() {
    return class_type("SharpGA.T.Algebra.R", void 0, T_Algebra_R);
}

export function T_Algebra_R_$ctor_4F7761DC(p, n, z) {
    return new T_Algebra_R(p, n, z);
}

export function T_Algebra_R__get_p(this$) {
    return this$["p@437"];
}

export function T_Algebra_R__get_n(this$) {
    return this$["n@437"];
}

export function T_Algebra_R__get_z(this$) {
    return this$["z@437"];
}

export function T_Algebra_R__get_basis(this$) {
    return toList(delay(() => append_1(map((n) => (new T_Basis(0, [n])), rangeDouble(1, 1, this$["p@437"])), delay(() => append_1(map((n_1) => (new T_Basis(1, [n_1])), rangeDouble(1, 1, this$["n@437"])), delay(() => map((n_2) => (new T_Basis(2, [n_2])), rangeDouble(1, 1, this$["z@437"]))))))));
}

