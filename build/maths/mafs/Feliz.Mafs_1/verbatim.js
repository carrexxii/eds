import { Record } from "../../fable_modules/fable-library.4.9.0/Types.js";
import { record_type, lambda_type, unit_type, array_type, float64_type, class_type } from "../../fable_modules/fable-library.4.9.0/Reflection.js";

export class VerbatimMovablePoint extends Record {
    constructor(element, point, setPoint, x, y) {
        super();
        this.element = element;
        this.point = point;
        this.setPoint = setPoint;
        this.x = x;
        this.y = y;
    }
}

export function VerbatimMovablePoint_$reflection() {
    return record_type("Feliz.Mafs.VerbatimMovablePoint", [], VerbatimMovablePoint, () => [["element", class_type("Fable.React.ReactElement")], ["point", array_type(float64_type)], ["setPoint", lambda_type(array_type(float64_type), unit_type)], ["x", float64_type], ["y", float64_type]]);
}

export class Verbatim {
    constructor() {
    }
}

export function Verbatim_$reflection() {
    return class_type("Feliz.Mafs.Verbatim", void 0, Verbatim);
}

export class VerbatimModule_Coordinates {
    constructor() {
    }
}

export function VerbatimModule_Coordinates_$reflection() {
    return class_type("Feliz.Mafs.VerbatimModule.Coordinates", void 0, VerbatimModule_Coordinates);
}

export class VerbatimModule_Line {
    constructor() {
    }
}

export function VerbatimModule_Line_$reflection() {
    return class_type("Feliz.Mafs.VerbatimModule.Line", void 0, VerbatimModule_Line);
}

export class VerbatimModule_Plot {
    constructor() {
    }
}

export function VerbatimModule_Plot_$reflection() {
    return class_type("Feliz.Mafs.VerbatimModule.Plot", void 0, VerbatimModule_Plot);
}

export class VerbatimModule_vec {
    constructor() {
    }
}

export function VerbatimModule_vec_$reflection() {
    return class_type("Feliz.Mafs.VerbatimModule.vec", void 0, VerbatimModule_vec);
}

export class VerbatimModule_Debug {
    constructor() {
    }
}

export function VerbatimModule_Debug_$reflection() {
    return class_type("Feliz.Mafs.VerbatimModule.Debug", void 0, VerbatimModule_Debug);
}

export class VerbatimModule_Katex {
    constructor() {
    }
}

export function VerbatimModule_Katex_$reflection() {
    return class_type("Feliz.Mafs.VerbatimModule.Katex", void 0, VerbatimModule_Katex);
}

