import { Union } from "../../fable_modules/fable-library.4.9.0/Types.js";
import { lambda_type, class_type, union_type, float64_type } from "../../fable_modules/fable-library.4.9.0/Reflection.js";
import { Transform as Transform_1, vec as vec_2 } from "mafs";
import { createElement } from "react";

export class Angle extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Degrees", "Radians"];
    }
}

export function Angle_$reflection() {
    return union_type("Feliz.Mafs.Maths.Angle", [], Angle, () => [[["Item", float64_type]], [["Item", float64_type]]]);
}

export class Vec2 {
    constructor(x, y) {
        this["x@22"] = x;
        this["y@22"] = y;
    }
}

export function Vec2_$reflection() {
    return class_type("Feliz.Mafs.Maths.Vec2", void 0, Vec2);
}

export function Vec2_$ctor_7B00E9A0(x, y) {
    return new Vec2(x, y);
}

export function Angle_get_toRad() {
    return (_arg) => ((_arg.tag === 1) ? _arg.fields[0] : (((_arg.fields[0] / 360) * 2) * 3.141592653589793));
}

export function Angle_get_toDeg() {
    return (_arg) => ((_arg.tag === 1) ? (((_arg.fields[0] * 360) / 2) * 3.141592653589793) : _arg.fields[0]);
}

export function Angle_op_Multiply_6CD4EEF7(a, s) {
    if (a.tag === 1) {
        return new Angle(1, [a.fields[0] * s]);
    }
    else {
        return new Angle(0, [a.fields[0] * s]);
    }
}

export function Angle_op_Multiply_3DE80ED7(s, a) {
    return Angle_op_Multiply_6CD4EEF7(a, s);
}

export function Vec2_$ctor_52AF8430(arr) {
    return Vec2_$ctor_7B00E9A0(arr[0], arr[1]);
}

export function Vec2__get_x(this$) {
    return this$["x@22"];
}

export function Vec2__get_y(this$) {
    return this$["y@22"];
}

export function Vec2__get_array(this$) {
    return new Float64Array([Vec2__get_x(this$), Vec2__get_y(this$)]);
}

export function Vec2__dist_Z3D49C911(this$, v) {
    return vec_2.dist(Vec2__get_array(this$), Vec2__get_array(v));
}

export function Vec2__get_mag(this$) {
    return vec_2.mag(Vec2__get_array(this$));
}

export function Vec2__lerp(this$, v, t) {
    return Vec2_$ctor_52AF8430(vec_2.lerp(Vec2__get_array(this$), Vec2__get_array(v), t));
}

export function Vec2__midpoint_Z3D49C911(this$, v) {
    return Vec2_$ctor_52AF8430(vec_2.midpoint(Vec2__get_array(this$), Vec2__get_array(v)));
}

export function Vec2__squareDist_Z3D49C911(this$, v) {
    return Vec2_$ctor_52AF8430(vec_2.squareDist(Vec2__get_array(this$), Vec2__get_array(v)));
}

export function Vec2__withMag_5E38073B(this$, s) {
    return Vec2_$ctor_52AF8430(vec_2.withMag(Vec2__get_array(this$), s));
}

export function Vec2__rotate_18D0E04C(this$, angle) {
    return Vec2_$ctor_52AF8430(vec_2.rotate(Vec2__get_array(this$), Angle_get_toRad()(angle)));
}

export function Vec2__rotateAbout(this$, v, angle) {
    return Vec2_$ctor_52AF8430(vec_2.rotateAbout(Vec2__get_array(this$), Vec2__get_array(v), Angle_get_toRad()(angle)));
}

export function Vec2_op_Addition_Z2434DDE0(v, w) {
    return Vec2_$ctor_52AF8430(vec_2.add(Vec2__get_array(v), Vec2__get_array(w)));
}

export function Vec2_op_Subtraction_Z2434DDE0(v, w) {
    return Vec2_$ctor_52AF8430(vec_2.sub(Vec2__get_array(v), Vec2__get_array(w)));
}

export function Vec2_op_Multiply_474513F4(v, s) {
    return Vec2_$ctor_52AF8430(vec_2.scale(Vec2__get_array(v), s));
}

export function Vec2_op_Multiply_Z1871278C(s, v) {
    return Vec2_$ctor_52AF8430(vec_2.scale(Vec2__get_array(v), s));
}

export function Vec2_op_Division_474513F4(v, s) {
    return Vec2_$ctor_52AF8430(vec_2.scale(Vec2__get_array(v), 1 / s));
}

export function Vec2_op_Division_Z1871278C(s, v) {
    return Vec2_$ctor_52AF8430(vec_2.scale(Vec2__get_array(v), 1 / s));
}

export function Vec2_op_Multiply_Z2434DDE0(v, w) {
    return vec_2.dot(Vec2__get_array(v), Vec2__get_array(w));
}

export function Vec2__get_normal(this$) {
    let arg0__3, arg0_, arg0__1;
    return Vec2_op_Division_474513F4(this$, (arg0__3 = (((arg0_ = Vec2__get_x(this$), Math.pow(arg0_, 2))) + ((arg0__1 = Vec2__get_y(this$), Math.pow(arg0__1, 2)))), Math.pow(arg0__3, 0.5)));
}

export class Transform {
    constructor() {
    }
}

export function Transform_$reflection() {
    return class_type("Feliz.Mafs.Maths.Transform", void 0, Transform);
}

export function Transform_translate(vec_1, elems) {
    return createElement(Transform_1, {
        children: elems,
        translate: Vec2__get_array(vec_1),
    });
}

export function vec(x, y) {
    return Vec2_$ctor_7B00E9A0(x, y);
}

export class Constrain extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Constrain", "Horizontal", "Vertical"];
    }
}

export function Constrain_$reflection() {
    return union_type("Feliz.Mafs.Maths.Constrain", [], Constrain, () => [[["Item", lambda_type(Vec2_$reflection(), Vec2_$reflection())]], [], []]);
}

