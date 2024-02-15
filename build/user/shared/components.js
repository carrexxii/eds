import { toString, Union } from "../fable_modules/fable-library.4.9.0/Types.js";
import { union_type, string_type } from "../fable_modules/fable-library.4.9.0/Reflection.js";
import { createElement } from "react";
import React from "react";
import { Interop_reactApi } from "../fable_modules/Feliz.2.7.0/Interop.fs.js";
import { tail, head, updateAt, length, item, filter, tryFindIndex, singleton as singleton_1, append as append_1, ofArray, mapIndexed, map } from "../fable_modules/fable-library.4.9.0/List.js";
import { equals, createObj } from "../fable_modules/fable-library.4.9.0/Util.js";
import { map as map_1, empty, singleton, append, delay, toList } from "../fable_modules/fable-library.4.9.0/Seq.js";
import { Util_Katex } from "../mafs/Feliz.Mafs/text.js";
import { useFeliz_React__React_useState_Static_1505 } from "../fable_modules/Feliz.2.7.0/React.fs.js";
import { defaultArg } from "../fable_modules/fable-library.4.9.0/Option.js";
import { RouterModule_urlSegments, RouterModule_encodeParts, RouterModule_nav } from "../fable_modules/Feliz.Router.4.0.0/Router.fs.js";
import { defaultOf } from "../fable_modules/fable-library.4.9.0/Util.js";
import { map as map_2, mapIndexed as mapIndexed_1 } from "../fable_modules/fable-library.4.9.0/Array.js";
import { createPortal } from "react-dom";

export class TextType extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["TextString", "LatexString"];
    }
}

export function TextType_$reflection() {
    return union_type("EDS.Shared.Components.TextType", [], TextType, () => [[["Item", string_type]], [["Item", string_type]]]);
}

export class SortDirection extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Ascending", "Descending"];
    }
}

export function SortDirection_$reflection() {
    return union_type("EDS.Shared.Components.SortDirection", [], SortDirection, () => [[], []]);
}

export function SortDirection_get_opposite() {
    return (_arg) => ((_arg.tag === 1) ? (new SortDirection(0, [])) : (new SortDirection(1, [])));
}

export function Article(content) {
    return createElement("article", {
        className: "prose prose-zinc m-2 text-justify",
        children: Interop_reactApi.Children.toArray(Array.from(content)),
    });
}

export function Heading(text) {
    return createElement("h1", {
        className: "text-3xl text-center font-semibold",
        children: text,
    });
}

export function SubHeading(text) {
    return createElement("h2", {
        className: "text-xl font-semibold",
        children: text,
    });
}

export function SmallHeading(text) {
    return createElement("h3", {
        className: "text-lg font-semibold m-0 p-0 inline",
        children: text,
    });
}

export function Section(content) {
    return createElement("p", {
        className: "",
        children: Interop_reactApi.Children.toArray(Array.from(content)),
    });
}

export function Link(text, addr) {
    return createElement("a", {
        className: "",
        href: addr,
        children: text,
    });
}

export function UnorderedList(xs) {
    const children = map((x) => createElement("li", {
        className: "prose prose-li",
        children: x,
    }), xs);
    return createElement("ul", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

export function OrderedList(xs) {
    const children = map((x) => createElement("li", {
        children: [x],
    }), xs);
    return createElement("ol", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

export function LinkList(links) {
    let elems;
    return createElement("ul", createObj(ofArray([["className", ""], (elems = mapIndexed((i, tupledArg) => createElement("li", {
        key: i,
        children: Link(tupledArg[0], tupledArg[1]),
    }), links), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export class NoteType extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Info", "Warning", "Extra"];
    }
}

export function NoteType_$reflection() {
    return union_type("EDS.Shared.Components.NoteType", [], NoteType, () => [[], [], []]);
}

export function Note(type$0027, text) {
    let elems;
    return createElement("aside", createObj(ofArray([["className", "float-right w-64 -mr-64 mt-8 p-2 border-l-2 rounded-md text-sm text-justify"], (elems = [createElement("svg", {
        className: `mx-2 mb-0.5
                        ${(type$0027.tag === 1) ? "warning-icon" : ((type$0027.tag === 2) ? "extra-icon" : "info-icon")}
                    `,
    }), text], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Button(text, onClick) {
    return createElement("button", {
        className: "button",
        children: toString(text),
        onClick: onClick,
    });
}

export function NumberInput(min, max, value, onChange, label) {
    let elems;
    return createElement("label", createObj(ofArray([["className", "flex flex-row m-2 items-center text-center"], (elems = [label, createElement("input", {
        className: "ml-2 px-1 py-1 border-x-0 border-slate-500 bg-transparent",
        type: "number",
        min: min,
        max: max,
        value: value,
        onChange: (ev) => {
            const value_14 = ev.target.valueAsNumber;
            if (!(value_14 == null) && !Number.isNaN(value_14)) {
                onChange(value_14);
            }
        },
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Slider(title, min, max, step, value, onChange, withText) {
    let elems;
    return createElement("div", createObj(ofArray([["className", "flex flex-row grow gap-4 text-center items-center m-2"], (elems = toList(delay(() => append(singleton(createElement("h6", {
        className: "font-semibold",
        children: title,
    })), delay(() => append(singleton(createElement("input", {
        className: "w-full",
        type: "range",
        min: min,
        max: max,
        step: step,
        value: value,
        onChange: (ev) => {
            const value_19 = ev.target.valueAsNumber;
            if (!(value_19 == null) && !Number.isNaN(value_19)) {
                onChange(value_19);
            }
        },
    })), delay(() => (withText ? singleton(createElement("p", {
        className: "",
        children: `${value}`,
    })) : empty()))))))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Checkbox(text, isChecked, onChange) {
    let elems;
    return createElement("label", createObj(ofArray([["className", "flex flex-row items-center text-center"], (elems = toList(delay(() => append(singleton(createElement("input", {
        className: "mx-2",
        type: "checkbox",
        checked: isChecked,
        onChange: (ev) => {
            onChange(ev.target.checked);
        },
    })), delay(() => {
        const matchValue = text;
        return (matchValue.tag === 1) ? singleton(createElement(Util_Katex, {
            text: matchValue.fields[0],
        })) : singleton(matchValue.fields[0]);
    })))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function CheckList(legend, xs) {
    let elems;
    return createElement("fieldset", createObj(ofArray([["className", "m-2 text-gray-700"], (elems = append_1(singleton_1(createElement("legend", {
        children: [legend],
    })), map((tupledArg) => Checkbox(tupledArg[0], tupledArg[1], tupledArg[2]), xs)), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function RadioList(legend, selected, xs) {
    let elems, children_2;
    return createElement("fieldset", createObj(ofArray([["className", "m-2 text-gray-700"], (elems = [createElement("legend", {
        children: [legend],
    }), (children_2 = mapIndexed((i, x) => {
        const id = x[0];
        const children = ofArray([createElement("input", {
            className: "form-radio ml-4",
            type: "radio",
            name: legend,
            id: id,
            defaultChecked: i === selected,
            onChange: (ev) => {
                x[1](ev.target.checked);
            },
        }), createElement("label", {
            className: "pl-2",
            children: id,
            htmlFor: id,
        })]);
        return createElement("div", {
            children: Interop_reactApi.Children.toArray(Array.from(children)),
        });
    }, xs), createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function TextInput(textInputInputProps) {
    let elems, err;
    const isValid = textInputInputProps.isValid;
    const dispatch = textInputInputProps.dispatch;
    const value = textInputInputProps.value;
    const label = textInputInputProps.label;
    const patternInput = useFeliz_React__React_useState_Static_1505(void 0);
    const error = patternInput[0];
    return createElement("label", createObj(ofArray([["className", "label"], (elems = [createElement("input", {
        className: (error == null) ? "text-input" : ((err = error, "text-input-error")),
        placeholder: label,
        value: value,
        onChange: (ev) => {
            const txt = ev.target.value;
            patternInput[1](defaultArg(isValid, (str) => ((str === "") ? "Invalid input" : void 0))(txt));
            dispatch(txt);
        },
    }), createElement("p", {
        className: "input-error-text",
        children: defaultArg(error, ""),
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Loading() {
    return createElement("div", {
        className: "m-8 text-center",
        children: Interop_reactApi.Children.toArray(["Loading..."]),
    });
}

export function Tabbed(tabbedInputProps) {
    let elems_1;
    const tabs = tabbedInputProps.tabs;
    const tabName = tabbedInputProps.tabName;
    const patternInput = useFeliz_React__React_useState_Static_1505(defaultArg(tryFindIndex((t) => (t[0] === tabName), tabs), 0));
    const children = ofArray([createElement("nav", createObj(ofArray([["className", "flex flex-row rounded-full"], (elems_1 = mapIndexed((i, tab_1) => {
        let value_3, elems;
        return createElement("div", createObj(ofArray([(value_3 = "grow p-0.5 border-x-2 text-center text-md\n                                            border-slate-200 text-gray-700\n                                            hover:bg-slate-200 hover:cursor-pointer hover:text-black\n                                            duration-200 ease-in-out", ["className", value_3]), ["onClick", (e) => {
            RouterModule_nav(singleton_1(RouterModule_encodeParts(append_1(filter((seg) => !(seg.indexOf("?") === 0), RouterModule_urlSegments(window.location.hash, 1)), singleton_1(`?tab=${tab_1[0]}`)), 1)), 1, 1);
            patternInput[1](i);
        }], (elems = [createElement("b", {
            children: [tab_1[0]],
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
    }, tabs), ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])]))), createElement("div", {
        id: "root-inner",
        className: "mt-4 px-8",
        children: item(patternInput[0], tabs)[1],
    })]);
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

export class PopupSize extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Small", "Medium", "Large", "Full"];
    }
}

export function PopupSize_$reflection() {
    return union_type("EDS.Shared.Components.PopupSize", [], PopupSize, () => [[], [], [], []]);
}

export function Popup(text, size, content) {
    let elems;
    return createElement("div", createObj(ofArray([["className", "group relative inline font-semibold "], (elems = [text, createElement("div", createObj(toList(delay(() => append(singleton(["className", ((size.tag === 1) ? "w-64 p-3" : ((size.tag === 2) ? "w-96 p-4" : ((size.tag === 3) ? "w-[48rem] p-4" : "w-36 p-2"))) + " absolute z-10 -top-[5rem] prose prose-sm opacity-0 invisible\n                                    group-hover:visible group-hover:opacity-100 rounded-md border-2 border-slate-800 bg-slate-300\n                                    transition-all duration-500 ease-in-out"]), delay(() => singleton(["children", content])))))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Accordion(accordionInputProps) {
    let elems;
    const xs = accordionInputProps.xs;
    const patternInput = useFeliz_React__React_useState_Static_1505(map((x) => false, xs));
    const opened = patternInput[0];
    return createElement("div", createObj(ofArray([["className", "flex flex-col h-fit ml-2 mb-4 pl-2 border-l-4 border-b-0 border-green-300"], (elems = mapIndexed((i, x_1) => {
        const children = ofArray([createElement("div", {
            className: `border-b-2 p-2 hover:cursor-pointer font-semibold
                                                ${(i === 0) ? "rounded-t-lg" : ""}
                                                ${(i === (length(xs) - 1)) ? "rounded-b-lg" : ""}
                                                ${item(i, opened) ? "text-black bg-slate-100" : "text-gray-700"}
                                                duration-200 ease-in-out`,
            children: x_1[0],
            onClick: (e) => {
                patternInput[1](updateAt(i, !item(i, opened), opened));
            },
        }), createElement("div", {
            className: `prose prose-p px-2 text-pretty text-justify overflow-hidden
                                                ${item(i, opened) ? "h-fit opacity-1" : "h-0 opacity-0"}
                                                transition-all duration-500 ease-in-out`,
            children: x_1[1],
        })]);
        return createElement("div", {
            children: Interop_reactApi.Children.toArray(Array.from(children)),
        });
    }, xs), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function ErrorCard(errorCardInputProps) {
    let elems_1, elems;
    const dispatch = errorCardInputProps.dispatch;
    const text = errorCardInputProps.text;
    return createElement("div", createObj(ofArray([["className", "card-error"], (elems_1 = [createElement("button", createObj(ofArray([["className", "card-button"], ["onClick", (e) => {
        dispatch();
    }], (elems = [createElement("svg", {
        className: "X",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))), toString(text)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])));
}

export class TableDirection extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["TableHorizontal", "TableVertical"];
    }
}

export function TableDirection_$reflection() {
    return union_type("EDS.Shared.Components.TableDirection", [], TableDirection, () => [[], []]);
}

export function StaticTable(staticTableInputProps) {
    let elems;
    const xs = staticTableInputProps.xs;
    const dir = staticTableInputProps.dir;
    return createElement("table", createObj(ofArray([["className", "prose prose-table mx-0 my-4"], (elems = toList(delay(() => {
        let children_2, children, children_10;
        if (equals(dir, new TableDirection(1, []))) {
            const header = head(xs);
            const content = tail(xs);
            return append(!equals(item(0, header), defaultOf()) ? singleton((children_2 = singleton_1((children = map((h) => createElement("th", {
                children: [h],
            }), header), createElement("tr", {
                children: Interop_reactApi.Children.toArray(Array.from(children)),
            }))), createElement("thead", {
                children: Interop_reactApi.Children.toArray(Array.from(children_2)),
            }))) : empty(), delay(() => {
                let children_6;
                return singleton((children_6 = map((row) => {
                    const children_4 = map((cell) => createElement("td", {
                        children: [cell],
                    }), row);
                    return createElement("tr", {
                        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
                    });
                }, content), createElement("tbody", {
                    children: Interop_reactApi.Children.toArray(Array.from(children_6)),
                })));
            }));
        }
        else {
            return singleton((children_10 = map((row_1) => {
                const children_8 = mapIndexed((i, cell_1) => {
                    if ((i === 0) && !equals(cell_1, defaultOf())) {
                        return createElement("th", {
                            children: [cell_1],
                        });
                    }
                    else {
                        return createElement("td", {
                            children: [cell_1],
                        });
                    }
                }, row_1);
                return createElement("tr", {
                    children: Interop_reactApi.Children.toArray(Array.from(children_8)),
                });
            }, xs), createElement("tbody", {
                children: Interop_reactApi.Children.toArray(Array.from(children_10)),
            })));
        }
    })), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Table(tableInputProps) {
    let elems_3;
    const dispatch = tableInputProps.dispatch;
    const sortBy = tableInputProps.sortBy;
    const records = tableInputProps.records;
    const header = tableInputProps.header;
    return createElement("table", createObj(ofArray([["className", "table"], (elems_3 = toList(delay(() => {
        let elems_1;
        return append(singleton(createElement("tr", createObj(ofArray([["className", "table-row"], (elems_1 = mapIndexed_1((i, h) => {
            let elems;
            return createElement("th", createObj(ofArray([["className", "table-header"], ["onClick", (e) => {
                dispatch(i);
            }], ["children", h], (elems = toList(delay(() => {
                let dir, dir_1, si_1;
                return (sortBy != null) ? (((dir = sortBy[1], sortBy[0] === i)) ? ((dir_1 = sortBy[1], (si_1 = (sortBy[0] | 0), singleton(createElement("svg", {
                    className: (dir_1.tag === 1) ? "chevron-down" : "chevron-up",
                }))))) : singleton(defaultOf())) : singleton(defaultOf());
            })), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
        }, header), ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), delay(() => map_1((record) => {
            let elems_2;
            return createElement("tr", createObj(ofArray([["className", "table-row"], ["tabIndex", 0], (elems_2 = map_2((cell) => createElement("td", {
                className: "table-cell",
                children: cell,
            }), record), ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])));
        }, records)));
    })), ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])])));
}

export function SidebarButtons(sidebarButtonsInputProps) {
    let elems_2, elems_3;
    const url = sidebarButtonsInputProps.url;
    const buttons = sidebarButtonsInputProps.buttons;
    const patternInput = useFeliz_React__React_useState_Static_1505(false);
    const expand = patternInput[0];
    let buttons_1;
    const children = ofArray([createElement("button", createObj(ofArray([["className", "sidebar-toggle"], ["aria-label", "sidebar toggle"], ["onClick", (e) => {
        patternInput[1](!expand);
    }], (elems_2 = [createElement("svg", {
        className: `${expand ? "arrow-left-icon" : "hamburger-icon"}
                                          p-3 duration-500 ease-in`,
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])]))), createElement("ul", createObj(ofArray([["className", "sidebar-ul"], (elems_3 = map((tupledArg) => {
        let elems_1, elems;
        const link = tupledArg[2];
        return createElement("li", createObj(singleton_1((elems_1 = [createElement("a", createObj(ofArray([["href", link], ["className", `sidebar-li ${(link === url) ? "bg-slate-100" : ""}`], (elems = [createElement("svg", {
            className: `${tupledArg[0]} m-2 p-3`,
        }), createElement("p", {
            className: `inline-block ${!expand ? "invisible" : ""}`,
            children: ` — ${tupledArg[1]}`,
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))]))));
    }, buttons), ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])])))]);
    buttons_1 = createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
    const sidebar = document.getElementById("sidebar");
    if (expand) {
        sidebar.className = "sidebar-open";
    }
    else {
        sidebar.className = "sidebar-collapsed";
    }
    return createPortal(buttons_1, sidebar);
}

