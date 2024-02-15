import { MatchFailureException, FSharpRef, Record } from "../../fable_modules/fable-library.4.9.0/Types.js";
import { Register, Operand, Instruction, Program_get_Default, Instruction_$reflection, Program_$reflection } from "./tokens.js";
import { record_type, lambda_type, unit_type, string_type, class_type, int32_type } from "../../fable_modules/fable-library.4.9.0/Reflection.js";
import { toConsole } from "../../fable_modules/fable-library.4.9.0/String.js";
import { tryGetValue } from "../../fable_modules/fable-library.4.9.0/MapUtil.js";
import { equals } from "../../fable_modules/fable-library.4.9.0/Util.js";

export class State extends Record {
    constructor(program, pc, acc, ix, mar, mdr, cir, flag, memory, output) {
        super();
        this.program = program;
        this.pc = (pc | 0);
        this.acc = (acc | 0);
        this.ix = (ix | 0);
        this.mar = (mar | 0);
        this.mdr = (mdr | 0);
        this.cir = cir;
        this.flag = (flag | 0);
        this.memory = memory;
        this.output = output;
    }
}

export function State_$reflection() {
    return record_type("ASAEmulator.VM.State", [], State, () => [["program", Program_$reflection()], ["pc", int32_type], ["acc", int32_type], ["ix", int32_type], ["mar", int32_type], ["mdr", int32_type], ["cir", Instruction_$reflection()], ["flag", int32_type], ["memory", class_type("System.Collections.Generic.Dictionary`2", [int32_type, int32_type])], ["output", lambda_type(string_type, unit_type)]]);
}

export function State_get_Default() {
    return new State(Program_get_Default(), 0, 0, -1, 0, 0, new Instruction(18, []), 0, new Map([]), (str) => {
        toConsole(`${str}`);
    });
}

export function matchNum(_arg) {
    switch (_arg.tag) {
        case 1:
            return new Operand(1, [_arg.fields[0]]);
        case 2:
            throw new Error("Expected a number, got a register\\nParameter name: " + (`${_arg.fields[0]}`));
        default:
            return new Operand(0, [_arg.fields[0]]);
    }
}

export function getMem(memory, addr) {
    const content = new FSharpRef(0);
    if (tryGetValue(memory, addr, new FSharpRef(() => content.contents, (v) => {
        content.contents = (v | 0);
    }))) {
        return content.contents | 0;
    }
    else {
        throw new Error(((`Invalid memory access: address '${addr}' has not been set`) + "\\nParameter name: ") + (`${addr}`));
    }
}

export function regAdd(state, num, reg, neg) {
    let num_2;
    switch (num.tag) {
        case 1: {
            num_2 = getMem(state.memory, num.fields[0]);
            break;
        }
        case 2: {
            throw new Error("Unexpected register argument for regAdd\\nParameter name: " + (`${num.fields[0]}`));
            break;
        }
        default:
            num_2 = num.fields[0];
    }
    if (reg.tag === 1) {
        return new State(state.program, state.pc, state.acc, !neg ? (state.ix + num_2) : (state.ix - num_2), state.mar, state.mdr, state.cir, state.flag, state.memory, state.output);
    }
    else {
        return new State(state.program, state.pc, !neg ? (state.acc + num_2) : (state.acc - num_2), state.ix, state.mar, state.mdr, state.cir, state.flag, state.memory, state.output);
    }
}

export function regAddIndirect(state, addr, _arg) {
    if (_arg.tag === 1) {
        return new State(state.program, state.pc, state.acc, state.ix + getMem(state.memory, addr), state.mar, state.mdr, state.cir, state.flag, state.memory, state.output);
    }
    else {
        return new State(state.program, state.pc, state.acc + getMem(state.memory, addr), state.ix, state.mar, state.mdr, state.cir, state.flag, state.memory, state.output);
    }
}

export function step(state) {
    const state_1 = new State(state.program, state.pc, state.acc, state.ix, state.mar, state.mdr, state.program.instrs[state.pc], state.flag, state.memory, state.output);
    const next = new State(state_1.program, state.pc + 1, state_1.acc, state_1.ix, state_1.mar, state_1.mdr, state_1.cir, state_1.flag, state_1.memory, state_1.output);
    const matchValue = state_1.cir;
    switch (matchValue.tag) {
        case 18:
            return next;
        case 0:
            return new State(next.program, next.pc, matchValue.fields[0], next.ix, next.mar, next.mdr, next.cir, next.flag, next.memory, next.output);
        case 1:
            return new State(next.program, next.pc, getMem(state_1.memory, matchValue.fields[0]), next.ix, next.mar, next.mdr, next.cir, next.flag, next.memory, next.output);
        case 2:
            return new State(next.program, next.pc, getMem(state_1.memory, getMem(state_1.memory, matchValue.fields[0])), next.ix, next.mar, next.mdr, next.cir, next.flag, next.memory, next.output);
        case 3:
            return new State(next.program, next.pc, getMem(state_1.memory, matchValue.fields[0] + state_1.ix), next.ix, next.mar, next.mdr, next.cir, next.flag, next.memory, next.output);
        case 4:
            return new State(next.program, next.pc, next.acc, matchValue.fields[0], next.mar, next.mdr, next.cir, next.flag, next.memory, next.output);
        case 5:
            if (matchValue.fields[0].tag === 1) {
                return new State(next.program, next.pc, next.acc, state_1.acc, next.mar, next.mdr, next.cir, next.flag, next.memory, next.output);
            }
            else {
                return next;
            }
        case 6: {
            state_1.memory.set(matchValue.fields[0], state_1.acc);
            return next;
        }
        case 7:
            return regAdd(next, matchNum(matchValue.fields[0]), new Register(0, []), false);
        case 8:
            return regAdd(next, matchNum(matchValue.fields[0]), new Register(0, []), true);
        case 9:
            return regAdd(next, new Operand(0, [1]), matchValue.fields[0], false);
        case 10:
            return regAdd(next, new Operand(0, [1]), matchValue.fields[0], true);
        case 11:
            return new State(state_1.program, matchValue.fields[0] - state_1.program.start, state_1.acc, state_1.ix, state_1.mar, state_1.mdr, state_1.cir, state_1.flag, state_1.memory, state_1.output);
        case 12: {
            const oper_2 = matchValue.fields[0];
            return new State(next.program, next.pc, next.acc, next.ix, next.mar, next.mdr, next.cir, (oper_2.tag === 0) ? ((oper_2.fields[0] === state_1.acc) ? 0 : ((oper_2.fields[0] < state_1.acc) ? -1 : ((oper_2.fields[0] > state_1.acc) ? 1 : (() => {
                throw new Error("Match failure: ASAEmulator.Tokens.Operand");
            })()))) : (() => {
                throw new Error("Match failure: ASAEmulator.Tokens.Operand");
            })(), next.memory, next.output);
        }
        case 13: {
            const oper_3 = getMem(state_1.memory, matchValue.fields[0]) | 0;
            return new State(next.program, next.pc, next.acc, next.ix, next.mar, next.mdr, next.cir, (oper_3 === state_1.acc) ? 0 : ((oper_3 < state_1.acc) ? -1 : ((oper_3 > state_1.acc) ? 1 : (() => {
                throw new MatchFailureException("/home/charles/Projects/eds2/src/csc/asm/src/vm.fs", 87, 29);
            })())), next.memory, next.output);
        }
        case 14:
            return new State(state_1.program, (state_1.flag === 0) ? (matchValue.fields[0] - state_1.program.start) : (state_1.pc + 1), state_1.acc, state_1.ix, state_1.mar, state_1.mdr, state_1.cir, state_1.flag, state_1.memory, state_1.output);
        case 15:
            return new State(state_1.program, (state_1.flag !== 0) ? (matchValue.fields[0] - state_1.program.start) : (state_1.pc + 1), state_1.acc, state_1.ix, state_1.mar, state_1.mdr, state_1.cir, state_1.flag, state_1.memory, state_1.output);
        case 16:
            return next;
        case 17: {
            state_1.output(String.fromCharCode(state_1.acc));
            return next;
        }
        case 19:
            return state_1;
        default:
            throw new Error("Match failure: ASAEmulator.Tokens.Instruction");
    }
}

export function load(output, program) {
    let state;
    const bind$0040 = State_get_Default();
    state = (new State(program, bind$0040.pc, bind$0040.acc, bind$0040.ix, bind$0040.mar, bind$0040.mdr, bind$0040.cir, bind$0040.flag, bind$0040.memory, output));
    program.memory.forEach((tupledArg) => {
        state.memory.set(tupledArg[0], tupledArg[1]);
    });
    return state;
}

export function run(state_mut) {
    run:
    while (true) {
        const state = state_mut;
        if (!equals(state.cir, new Instruction(19, []))) {
            state_mut = step(state);
            continue run;
        }
        break;
    }
}

