import { Union } from "./fable_modules/fable-library.4.9.0/Types.js";
import { union_type } from "./fable_modules/fable-library.4.9.0/Reflection.js";
import { Constrain, Vec2__get_y, Vec2__get_x, vec } from "./mafs/Feliz.Mafs_1/maths.js";
import { round } from "./fable_modules/fable-library.4.9.0/Util.js";

export class Shape extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Point", "Circle", "Line", "Triangle", "Rectangle", "Pentagon", "Hexagon", "Septagon", "Octagon"];
    }
}

export function Shape_$reflection() {
    return union_type("EDS.Maths.Common.Shape", [], Shape, () => [[], [], [], [], [], [], [], [], []]);
}

export function Shape_get_points() {
    return (_arg) => ((_arg.tag === 1) ? 1 : ((_arg.tag === 2) ? 2 : ((_arg.tag === 3) ? 3 : ((_arg.tag === 4) ? 4 : ((_arg.tag === 5) ? 5 : ((_arg.tag === 6) ? 6 : ((_arg.tag === 7) ? 7 : ((_arg.tag === 8) ? 8 : 1))))))));
}

export function snapWith(p, dp) {
    return vec(round(Vec2__get_x(p), dp), round(Vec2__get_y(p), dp));
}

export function constrainSnap(snap) {
    return new Constrain(0, [(p) => snapWith(p, snap ? 0 : 1)]);
}

export function pointLineDist(p, q, a) {
    let arg0__9, arg0__12;
    return (((Vec2__get_x(q) - Vec2__get_x(p)) * (Vec2__get_y(p) - Vec2__get_y(a))) - ((Vec2__get_x(p) - Vec2__get_x(a)) * (Vec2__get_y(q) - Vec2__get_y(p)))) / Math.sqrt(((arg0__9 = (Vec2__get_x(q) - Vec2__get_x(p)), Math.pow(arg0__9, 2))) + ((arg0__12 = (Vec2__get_y(p) - Vec2__get_y(q)), Math.pow(arg0__12, 2))));
}

