import { Record } from "../fable_modules/fable-library.4.9.0/Types.js";
import { record_type, option_type, tuple_type, int32_type } from "../fable_modules/fable-library.4.9.0/Reflection.js";
import { createElement } from "react";
import React from "react";
import { useFeliz_React__React_useState_Static_1505 } from "../fable_modules/Feliz.2.7.0/React.fs.js";
import { step, load, State_get_Default } from "../asm/src/vm.js";
import { reverse as reverse_2, length, item, mapIndexed as mapIndexed_1, singleton as singleton_2, append as append_1, ofArray, cons, empty } from "../fable_modules/fable-library.4.9.0/List.js";
import { startImmediate } from "../fable_modules/fable-library.4.9.0/Async.js";
import { singleton } from "../fable_modules/fable-library.4.9.0/AsyncBuilder.js";
import { resourceService } from "../shared/services.js";
import { printf, toConsole } from "../fable_modules/fable-library.4.9.0/String.js";
import { parse } from "../asm/src/parser.js";
import { comparePrimitives, equals, createObj } from "../fable_modules/fable-library.4.9.0/Util.js";
import { reverse as reverse_1, sortBy, map, append, singleton as singleton_1, delay, toList } from "../fable_modules/fable-library.4.9.0/Seq.js";
import { Tabbed, Button, Loading } from "../shared/components.js";
import { Instruction } from "../asm/src/tokens.js";
import { Interop_reactApi } from "../fable_modules/Feliz.2.7.0/Interop.fs.js";
import { reverse, map as map_1, mapIndexed } from "../fable_modules/fable-library.4.9.0/Array.js";
import { defaultOf } from "../fable_modules/fable-library.4.9.0/Util.js";

export class HistoryEntry extends Record {
    constructor(pc, acc, ix, mem) {
        super();
        this.pc = (pc | 0);
        this.acc = (acc | 0);
        this.ix = (ix | 0);
        this.mem = mem;
    }
}

export function HistoryEntry_$reflection() {
    return record_type("EDS.CSC.ASA.ASM.HistoryEntry", [], HistoryEntry, () => [["pc", int32_type], ["acc", int32_type], ["ix", int32_type], ["mem", option_type(tuple_type(int32_type, int32_type))]]);
}

export function Emulator() {
    let elems_8;
    const patternInput = useFeliz_React__React_useState_Static_1505(true);
    const loading = patternInput[0];
    const patternInput_1 = useFeliz_React__React_useState_Static_1505(State_get_Default());
    const state = patternInput_1[0];
    const setState = patternInput_1[1];
    const patternInput_2 = useFeliz_React__React_useState_Static_1505(empty());
    const history = patternInput_2[0];
    if (loading) {
        startImmediate(singleton.Delay(() => singleton.Bind(resourceService.getProgram("test"), (_arg) => {
            const program = _arg;
            return singleton.Combine((program != null) ? ((setState(load((s) => {
                toConsole(`${s}`);
            }, parse(program))), singleton.Zero())) : ((toConsole(printf("Error retrieving program")), singleton.Zero())), singleton.Delay(() => {
                patternInput[1](false);
                return singleton.Zero();
            }));
        })));
    }
    return createElement("div", createObj(ofArray([["className", "flex flex-col"], (elems_8 = toList(delay(() => (loading ? singleton_1(createElement(Loading, null)) : append(singleton_1(Button("Step", (e) => {
        let matchValue;
        if (equals(state.cir, new Instruction(19, []))) {
        }
        else {
            const newState = step(state);
            patternInput_2[1](cons(new HistoryEntry(state.pc, newState.acc, newState.ix, (matchValue = newState.cir, (matchValue.tag === 6) ? [matchValue.fields[0], newState.acc] : void 0)), history));
            setState(newState);
        }
    })), delay(() => {
        let elems_1;
        const li = (name, value_2) => {
            let elems;
            return createElement("li", createObj(ofArray([["className", "inline m-4 px-2 py-1"], (elems = [createElement("b", {
                children: [name],
            }), value_2], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
        };
        return append(singleton_1(createElement("ul", createObj(ofArray([["className", "m-4 grow text-center border-b-2"], (elems_1 = [li("PC: ", `${state.pc}`), li("CIR: ", `${state.cir}`), li("ACC: ", `${state.acc}`), li("IX: ", `${state.ix}`), li("MAR: ", `${state.mar}`), li("MDR: ", `${state.mdr}`), li("flag: ", `${state.flag}`)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), delay(() => {
            let elems_7, elems_3, elems_6;
            return singleton_1(createElement("div", createObj(ofArray([["className", "flex flex-row"], (elems_7 = [createElement("ul", createObj(ofArray([["className", "mx-2 text-nowrap"], (elems_3 = mapIndexed((i, instr) => {
                let elems_2;
                return createElement("li", createObj(ofArray([["className", `p-1 rounded-md
                                                            ${(state.pc === i) ? "bg-green-200" : ""}`], (elems_2 = [createElement("b", {
                    children: [`${i + state.program.start} `],
                }), `${instr}`], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])));
            }, state.program.instrs), ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])]))), createElement("table", createObj(ofArray([["className", "h-fit m-4"], (elems_6 = toList(delay(() => {
                let elems_4;
                return append(singleton_1(createElement("thead", createObj(ofArray([["className", "font-semibold"], (elems_4 = toList(delay(() => {
                    let children;
                    return append(singleton_1((children = ofArray([createElement("th", {
                        colSpan: 3,
                    }), createElement("th", {
                        className: "border-2 text-center text-xl",
                        colSpan: state.memory.size,
                        children: "Memory Address",
                    })]), createElement("tr", {
                        children: Interop_reactApi.Children.toArray(Array.from(children)),
                    }))), delay(() => {
                        let children_2;
                        const th = (text) => createElement("th", {
                            className: "w-32 border-2 px-2 py-1",
                            children: text,
                        });
                        return singleton_1((children_2 = append_1(ofArray([th("Instruction"), th("ACC"), th("IX")]), toList(map((addr_1) => th(`${addr_1[0]}`), sortBy((_arg_1) => _arg_1[0], state.memory, {
                            Compare: comparePrimitives,
                        })))), createElement("tr", {
                            children: Interop_reactApi.Children.toArray(Array.from(children_2)),
                        })));
                    }));
                })), ["children", Interop_reactApi.Children.toArray(Array.from(elems_4))])])))), delay(() => {
                    let children_6, children_4;
                    const td = (inner) => createElement("td", {
                        className: "border-2 text-center",
                        children: inner,
                    });
                    return singleton_1((children_6 = append_1(singleton_2((children_4 = append_1(ofArray([td(""), td(""), td("")]), ofArray(map_1((mem_1) => td(`${mem_1[1]}`), reverse(state.program.memory)))), createElement("tr", {
                        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
                    }))), mapIndexed_1((i_1, entry_1) => {
                        let elems_5;
                        if (i_1 === 0) {
                            return defaultOf();
                        }
                        else {
                            return createElement("tr", createObj(ofArray([["className", "h-8 align-top"], (elems_5 = append_1(toList(delay(() => append(singleton_1(td(`${entry_1.pc + state.program.start}`)), delay(() => append((entry_1.acc !== item(length(history) - i_1, history).acc) ? singleton_1(td(`${entry_1.acc}`)) : singleton_1(td("")), delay(() => ((entry_1.ix !== item(length(history) - i_1, history).ix) ? singleton_1(td(`${entry_1.ix}`)) : singleton_1(td(""))))))))), toList(map((mem_2) => {
                                let matchValue_1, value_44, addr_3, value_45;
                                return td((matchValue_1 = entry_1.mem, (matchValue_1 != null) ? (((value_44 = (matchValue_1[1] | 0), matchValue_1[0] === mem_2)) ? ((addr_3 = (matchValue_1[0] | 0), (value_45 = (matchValue_1[1] | 0), `${value_45}`))) : "") : ""));
                            }, reverse_1(state.memory.keys())))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_5))])])));
                        }
                    }, reverse_2(history))), createElement("tbody", {
                        children: Interop_reactApi.Children.toArray(Array.from(children_6)),
                    })));
                }));
            })), ["children", Interop_reactApi.Children.toArray(Array.from(elems_6))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_7))])]))));
        }));
    }))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_8))])])));
}

export const tabs = singleton_2(["Emulator", createElement(Emulator, null)]);

export function view(tab) {
    return createElement(Tabbed, {
        tabName: tab,
        tabs: tabs,
    });
}

