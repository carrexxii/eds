import { FSharpResult$2, Result_Map } from "../../fable_modules/fable-library.4.9.0/Choice.js";
import { parse as parse_1 } from "../../fable_modules/fable-library.4.9.0/Int32.js";
import { split, trimStart, getCharAtIndex, substring } from "../../fable_modules/fable-library.4.9.0/String.js";
import { Program, Instruction, Register, Operand } from "./tokens.js";
import { append, reverse, equalsWith } from "../../fable_modules/fable-library.4.9.0/Array.js";
import { equals, defaultOf } from "../../fable_modules/fable-library.4.9.0/Util.js";
import { map, toArray, empty, cons } from "../../fable_modules/fable-library.4.9.0/List.js";

export function op_GreaterBarEquals() {
    return (mapping) => ((result) => Result_Map(mapping, result));
}

export function parseNumber(str) {
    try {
        return new FSharpResult$2(0, [parse_1(substring(str, 1), 7, false, 32)]);
    }
    catch (exn) {
        return new FSharpResult$2(1, [`Expected a #number, got: '${str}'`]);
    }
}

export function parseAddress(str) {
    try {
        return new FSharpResult$2(0, [parse_1(str, 7, false, 32)]);
    }
    catch (exn) {
        return new FSharpResult$2(1, [`Expected an address, got: '${str}'`]);
    }
}

export function parseNumOrAddr(str) {
    const prefix = getCharAtIndex(str, 0);
    const tail = substring(str, 1);
    try {
        return (prefix === "#") ? op_GreaterBarEquals()((Item_2) => (new Operand(0, [Item_2])))(parseNumber(str)) : ((prefix === "&") ? (new FSharpResult$2(0, [new Operand(0, [parse_1(tail, 515, false, 32)])])) : ((prefix === "B") ? (new FSharpResult$2(0, [new Operand(0, [parse_1(tail, 1027, false, 32)])])) : op_GreaterBarEquals()((Item_3) => (new Operand(1, [Item_3])))(parseAddress(str))));
    }
    catch (exn) {
        return new FSharpResult$2(1, [`Failed to parse number: '${str}' (${exn})`]);
    }
}

export function parseRegister(str) {
    const matchValue = str.toLocaleLowerCase();
    switch (matchValue) {
        case "acc":
            return new FSharpResult$2(0, [new Register(0, [])]);
        case "ix":
            return new FSharpResult$2(0, [new Register(1, [])]);
        default:
            return new FSharpResult$2(1, [`Expected a register (ACC or IX), got: '${matchValue}'`]);
    }
}

export function parseOperand(str) {
    try {
        return parseNumOrAddr(str);
    }
    catch (exn) {
        try {
            return op_GreaterBarEquals()((Item) => (new Operand(2, [Item])))(parseRegister(str));
        }
        catch (exn_1) {
            return new FSharpResult$2(1, [`Expected an operand (Register or number), got: ${str}`]);
        }
    }
}

export function parseInstr(instr, oper) {
    let matchResult, instr_1, oper_22;
    switch (instr) {
        case "LDM": {
            if (oper != null) {
                matchResult = 0;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "LDD": {
            if (oper != null) {
                matchResult = 1;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "LDI": {
            if (oper != null) {
                matchResult = 2;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "LDX": {
            if (oper != null) {
                matchResult = 3;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "LDR": {
            if (oper != null) {
                matchResult = 4;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "MOV": {
            if (oper != null) {
                matchResult = 5;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "STO": {
            if (oper != null) {
                matchResult = 6;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "ADD": {
            if (oper != null) {
                matchResult = 7;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "SUB": {
            if (oper != null) {
                matchResult = 8;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "INC": {
            if (oper != null) {
                matchResult = 9;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "DEC": {
            if (oper != null) {
                matchResult = 10;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "JMP": {
            if (oper != null) {
                matchResult = 11;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "CMP": {
            if (oper != null) {
                matchResult = 12;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "CMI": {
            if (oper != null) {
                matchResult = 13;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "JPE": {
            if (oper != null) {
                matchResult = 14;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "JPN": {
            if (oper != null) {
                matchResult = 15;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "IN": {
            if (oper == null) {
                matchResult = 16;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "OUT": {
            if (oper == null) {
                matchResult = 17;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "END": {
            if (oper == null) {
                matchResult = 18;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "AND": {
            if (oper != null) {
                matchResult = 19;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "OR": {
            if (oper != null) {
                matchResult = 20;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "XOR": {
            if (oper != null) {
                matchResult = 21;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "LSL": {
            if (oper != null) {
                matchResult = 22;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        case "LSR": {
            if (oper != null) {
                matchResult = 23;
            }
            else {
                matchResult = 24;
                instr_1 = instr;
                oper_22 = oper;
            }
            break;
        }
        default: {
            matchResult = 24;
            instr_1 = instr;
            oper_22 = oper;
        }
    }
    switch (matchResult) {
        case 0: {
            const oper_1 = oper;
            return op_GreaterBarEquals()((Item) => (new Instruction(0, [Item])))(parseNumber(oper_1));
        }
        case 1: {
            const oper_2 = oper;
            return op_GreaterBarEquals()((Item_1) => (new Instruction(1, [Item_1])))(parseAddress(oper_2));
        }
        case 2: {
            const oper_3 = oper;
            return op_GreaterBarEquals()((Item_2) => (new Instruction(2, [Item_2])))(parseAddress(oper_3));
        }
        case 3: {
            const oper_4 = oper;
            return op_GreaterBarEquals()((Item_3) => (new Instruction(3, [Item_3])))(parseAddress(oper_4));
        }
        case 4: {
            const oper_5 = oper;
            return op_GreaterBarEquals()((Item_4) => (new Instruction(4, [Item_4])))(parseNumber(oper_5));
        }
        case 5: {
            const oper_6 = oper;
            return op_GreaterBarEquals()((Item_5) => (new Instruction(5, [Item_5])))(parseRegister(oper_6));
        }
        case 6: {
            const oper_7 = oper;
            return op_GreaterBarEquals()((Item_6) => (new Instruction(6, [Item_6])))(parseAddress(oper_7));
        }
        case 7: {
            const oper_8 = oper;
            return op_GreaterBarEquals()((Item_7) => (new Instruction(7, [Item_7])))(parseNumOrAddr(oper_8));
        }
        case 8: {
            const oper_9 = oper;
            return op_GreaterBarEquals()((Item_8) => (new Instruction(8, [Item_8])))(parseNumOrAddr(oper_9));
        }
        case 9: {
            const oper_10 = oper;
            return op_GreaterBarEquals()((Item_9) => (new Instruction(9, [Item_9])))(parseRegister(oper_10));
        }
        case 10: {
            const oper_11 = oper;
            return op_GreaterBarEquals()((Item_10) => (new Instruction(10, [Item_10])))(parseRegister(oper_11));
        }
        case 11: {
            const oper_12 = oper;
            return op_GreaterBarEquals()((Item_11) => (new Instruction(11, [Item_11])))(parseAddress(oper_12));
        }
        case 12: {
            const oper_13 = oper;
            return op_GreaterBarEquals()((Item_12) => (new Instruction(12, [Item_12])))(parseOperand(oper_13));
        }
        case 13: {
            const oper_14 = oper;
            return op_GreaterBarEquals()((Item_13) => (new Instruction(13, [Item_13])))(parseAddress(oper_14));
        }
        case 14: {
            const oper_15 = oper;
            return op_GreaterBarEquals()((Item_14) => (new Instruction(14, [Item_14])))(parseAddress(oper_15));
        }
        case 15: {
            const oper_16 = oper;
            return op_GreaterBarEquals()((Item_15) => (new Instruction(15, [Item_15])))(parseAddress(oper_16));
        }
        case 16:
            return new FSharpResult$2(0, [new Instruction(16, [])]);
        case 17:
            return new FSharpResult$2(0, [new Instruction(17, [])]);
        case 18:
            return new FSharpResult$2(0, [new Instruction(19, [])]);
        case 19: {
            const oper_17 = oper;
            return op_GreaterBarEquals()((Item_16) => (new Instruction(20, [Item_16])))(parseOperand(oper_17));
        }
        case 20: {
            const oper_18 = oper;
            return op_GreaterBarEquals()((Item_17) => (new Instruction(21, [Item_17])))(parseOperand(oper_18));
        }
        case 21: {
            const oper_19 = oper;
            return op_GreaterBarEquals()((Item_18) => (new Instruction(22, [Item_18])))(parseOperand(oper_19));
        }
        case 22: {
            const oper_20 = oper;
            return op_GreaterBarEquals()((Item_19) => (new Instruction(23, [Item_19])))(parseNumber(oper_20));
        }
        case 23: {
            const oper_21 = oper;
            return op_GreaterBarEquals()((Item_20) => (new Instruction(24, [Item_20])))(parseNumber(oper_21));
        }
        default:
            return new FSharpResult$2(1, [`Unrecognized values: '${instr_1}' '${oper_22}'`]);
    }
}

export function parse(lines) {
    const parseMemory = (start_mut, memory_mut, lNum_mut) => {
        parseMemory:
        while (true) {
            const start = start_mut, memory = memory_mut, lNum = lNum_mut;
            const line = lines[lNum].trim();
            if (line.indexOf(";") === 0) {
                const line_1 = trimStart(line, ";", " ");
                const matchValue = split(line_1, [" "], void 0, 0);
                if (!equalsWith((x, y) => (x === y), matchValue, defaultOf()) && (matchValue.length === 2)) {
                    if (matchValue[0] === "start") {
                        start_mut = parse_1(matchValue[1], 511, false, 32);
                        memory_mut = memory;
                        lNum_mut = (lNum + 1);
                        continue parseMemory;
                    }
                    else {
                        const value_1 = matchValue[1];
                        start_mut = start;
                        memory_mut = cons([parse_1(matchValue[0], 511, false, 32), parse_1(value_1, 511, false, 32)], memory);
                        lNum_mut = (lNum + 1);
                        continue parseMemory;
                    }
                }
                else {
                    throw new Error("Memory on line {lNum} appears to be malformed.\n                                              It should have the form: \'; <addr> <value>\'\n                                              where <addr> and <value> are integers.\\nParameter name: " + (`${line_1}`));
                }
            }
            else {
                return [start, memory, lNum];
            }
            break;
        }
    };
    const parseProgram = (instrs_mut, lNum_1_mut) => {
        parseProgram:
        while (true) {
            const instrs = instrs_mut, lNum_1 = lNum_1_mut;
            if (lNum_1 < lines.length) {
                const matchValue_1 = lines[lNum_1];
                if (matchValue_1 === "") {
                    instrs_mut = instrs;
                    lNum_1_mut = (lNum_1 + 1);
                    continue parseProgram;
                }
                else {
                    const line_2 = matchValue_1;
                    let ci;
                    const matchValue_2 = split(line_2, [" "], void 0, 0);
                    if (!equalsWith((x_1, y_1) => (x_1 === y_1), matchValue_2, defaultOf()) && (matchValue_2.length === 2)) {
                        const oper = matchValue_2[1];
                        ci = parseInstr(matchValue_2[0], oper);
                    }
                    else if (!equalsWith((x_2, y_2) => (x_2 === y_2), matchValue_2, defaultOf()) && (matchValue_2.length === 1)) {
                        ci = parseInstr(matchValue_2[0], void 0);
                    }
                    else {
                        throw new Error("Unrecognized\\nParameter name: " + (`${matchValue_2}`));
                    }
                    if (ci.tag === 1) {
                        throw new Error(((`Error parsing line ${lNum_1}: ${ci.fields[0]}`) + "\\nParameter name: ") + (`${line_2}`));
                    }
                    else {
                        instrs_mut = cons([lNum_1, ci.fields[0]], instrs);
                        lNum_1_mut = (lNum_1 + 1);
                        continue parseProgram;
                    }
                }
            }
            else {
                return instrs;
            }
            break;
        }
    };
    const patternInput = parseMemory(1, empty(), 0);
    const start_1 = patternInput[0] | 0;
    const instrs_1 = reverse(toArray(map((tupledArg) => tupledArg[1], parseProgram(empty(), patternInput[2]))));
    const patternInput_1 = !equals(instrs_1[0], new Instruction(18, [])) ? [append([new Instruction(18, [])], instrs_1), start_1 - 1] : [instrs_1, start_1];
    return new Program(patternInput_1[0], toArray(patternInput[1]), patternInput_1[1]);
}

