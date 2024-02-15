import { Union, Record } from "../../fable_modules/fable-library.4.9.0/Types.js";
import { string_type, int32_type, union_type, record_type, unit_type, tuple_type, lambda_type, array_type, float64_type } from "../../fable_modules/fable-library.4.9.0/Reflection.js";
import { Theme as Theme_1 } from "mafs";

export class IMatrixBuilder extends Record {
    constructor(mult, translate, rotate, scale, shear, get$) {
        super();
        this.mult = mult;
        this.translate = translate;
        this.rotate = rotate;
        this.scale = scale;
        this.shear = shear;
        this.get = get$;
    }
}

export function IMatrixBuilder_$reflection() {
    return record_type("Feliz.Mafs.Common.IMatrixBuilder", [], IMatrixBuilder, () => [["mult", lambda_type(array_type(float64_type), array_type(float64_type))], ["translate", lambda_type(tuple_type(float64_type, float64_type), array_type(float64_type))], ["rotate", lambda_type(float64_type, array_type(float64_type))], ["scale", lambda_type(tuple_type(float64_type, float64_type), array_type(float64_type))], ["shear", lambda_type(tuple_type(float64_type, float64_type), array_type(float64_type))], ["get", lambda_type(unit_type, array_type(float64_type))]]);
}

export const Theme = Theme_1;

export class XYAxis extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["XAxis", "YAxis"];
    }
}

export function XYAxis_$reflection() {
    return union_type("Feliz.Mafs.Common.XYAxis", [], XYAxis, () => [[], []]);
}

export class Axis extends Record {
    constructor(lines, labels) {
        super();
        this.lines = lines;
        this.labels = labels;
    }
}

export function Axis_$reflection() {
    return record_type("Feliz.Mafs.Common.Axis", [], Axis, () => [["lines", float64_type], ["labels", lambda_type(int32_type, string_type)]]);
}

export function Axis_get_Default() {
    return new Axis(1, (x) => (`${x}`));
}

