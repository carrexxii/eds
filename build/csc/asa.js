import { tabs, view as view_1 } from "./asa/asm.js";
import { tail, head, singleton, map, ofArray, isEmpty } from "./fable_modules/fable-library.4.9.0/List.js";
import { createElement } from "react";
import { createObj } from "./fable_modules/fable-library.4.9.0/Util.js";
import { SubHeading, LinkList, Link, Heading } from "./shared/components.js";
import { RouterModule_encodeQueryString, RouterModule_encodeParts } from "./fable_modules/Feliz.Router.4.0.0/Router.fs.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.7.0/Interop.fs.js";
import { Route_$007CQuery$007C_$007C } from "./fable_modules/Feliz.Router.4.0.0/Router.fs.js";

export function view(_arg) {
    let elems;
    let matchResult, tab;
    if (!isEmpty(_arg)) {
        if (head(_arg) === "asm") {
            if (!isEmpty(tail(_arg))) {
                const activePatternResult = Route_$007CQuery$007C_$007C(head(tail(_arg)));
                if (activePatternResult != null) {
                    if (!isEmpty(activePatternResult)) {
                        if (head(activePatternResult)[0] === "tab") {
                            if (isEmpty(tail(activePatternResult))) {
                                if (isEmpty(tail(tail(_arg)))) {
                                    matchResult = 1;
                                    tab = head(activePatternResult)[1];
                                }
                                else {
                                    matchResult = 2;
                                }
                            }
                            else {
                                matchResult = 2;
                            }
                        }
                        else {
                            matchResult = 2;
                        }
                    }
                    else {
                        matchResult = 2;
                    }
                }
                else {
                    matchResult = 2;
                }
            }
            else {
                matchResult = 0;
            }
        }
        else {
            matchResult = 2;
        }
    }
    else {
        matchResult = 2;
    }
    switch (matchResult) {
        case 0:
            return view_1("");
        case 1:
            return view_1(tab);
        default:
            if (isEmpty(_arg)) {
                return createElement("div", createObj(ofArray([["className", "prose prose-lg p-16"], (elems = [Heading("Outline"), Link("ASM", RouterModule_encodeParts(ofArray(["asa", "asm"]), 1)), LinkList(map((tab_1) => [tab_1[0], RouterModule_encodeParts(ofArray(["asa", "asm" + RouterModule_encodeQueryString(singleton(["tab", tab_1[0]]))]), 1)], tabs))], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
            }
            else {
                return SubHeading(`Page '${_arg}' does not exist`);
            }
    }
}

