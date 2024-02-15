import { Record, Union } from "../../fable_modules/fable-library.4.9.0/Types.js";
import { record_type, tuple_type, array_type, int32_type, union_type } from "../../fable_modules/fable-library.4.9.0/Reflection.js";

export class Register extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["ACC", "IX"];
    }
}

export function Register_$reflection() {
    return union_type("ASAEmulator.Tokens.Register", [], Register, () => [[], []]);
}

export class Operand extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Number", "Address", "Register"];
    }
    toString() {
        const this$ = this;
        return (this$.tag === 1) ? (`${this$.fields[0]}`) : ((this$.tag === 2) ? (`${this$.fields[0]}`) : (`#${this$.fields[0]}`));
    }
}

export function Operand_$reflection() {
    return union_type("ASAEmulator.Tokens.Operand", [], Operand, () => [[["Item", int32_type]], [["Item", int32_type]], [["Item", Register_$reflection()]]]);
}

export class Instruction extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["LDM", "LDD", "LDI", "LDX", "LDR", "MOV", "STO", "ADD", "SUB", "INC", "DEC", "JMP", "CMP", "CMI", "JPE", "JPN", "IN", "OUT", "START", "END", "AND", "OR", "XOR", "LSL", "LSR"];
    }
}

export function Instruction_$reflection() {
    return union_type("ASAEmulator.Tokens.Instruction", [], Instruction, () => [[["Item", int32_type]], [["Item", int32_type]], [["Item", int32_type]], [["Item", int32_type]], [["Item", int32_type]], [["Item", Register_$reflection()]], [["Item", int32_type]], [["Item", Operand_$reflection()]], [["Item", Operand_$reflection()]], [["Item", Register_$reflection()]], [["Item", Register_$reflection()]], [["Item", int32_type]], [["Item", Operand_$reflection()]], [["Item", int32_type]], [["Item", int32_type]], [["Item", int32_type]], [], [], [], [], [["Item", Operand_$reflection()]], [["Item", Operand_$reflection()]], [["Item", Operand_$reflection()]], [["Item", int32_type]], [["Item", int32_type]]]);
}

export class Program extends Record {
    constructor(instrs, memory, start) {
        super();
        this.instrs = instrs;
        this.memory = memory;
        this.start = (start | 0);
    }
}

export function Program_$reflection() {
    return record_type("ASAEmulator.Tokens.Program", [], Program, () => [["instrs", array_type(Instruction_$reflection())], ["memory", array_type(tuple_type(int32_type, int32_type))], ["start", int32_type]]);
}

export function Program_get_Default() {
    return new Program([], [], 0);
}

