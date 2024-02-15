import { Numbers_tabs, Numbers_view } from "./ig/numbers.js";
import { createElement } from "react";
import { view as view_1 } from "./ig/algebra.js";
import { tabs, view as view_2 } from "./ig/geometry.js";
import { tabs as tabs_1, view as view_3 } from "./ig/mensuration.js";
import { tabs as tabs_2, view as view_4 } from "./ig/trignonometry.js";
import { tabs as tabs_3, view as view_5 } from "./ig/transforms.js";
import { tabs as tabs_4, view as view_6 } from "./ig/probability.js";
import { tabs as tabs_5, view as view_7 } from "./ig/statistics.js";
import { tail, head, empty, map, ofArray, singleton, isEmpty } from "./fable_modules/fable-library.4.9.0/List.js";
import { RouterModule_encodeQueryString, RouterModule_encodeParts } from "./fable_modules/Feliz.Router.4.0.0/Router.fs.js";
import { createObj } from "./fable_modules/fable-library.4.9.0/Util.js";
import { SubHeading, LinkList, Link, Heading } from "./shared/components.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.7.0/Interop.fs.js";
import { Route_$007CQuery$007C_$007C } from "./fable_modules/Feliz.Router.4.0.0/Router.fs.js";

export function view(_arg) {
    let elems;
    let matchResult, tab;
    if (!isEmpty(_arg)) {
        if (head(_arg) === "numbers") {
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
            return Numbers_view("");
        case 1:
            return Numbers_view(tab);
        default: {
            let matchResult_1, tab_1;
            if (!isEmpty(_arg)) {
                switch (head(_arg)) {
                    case "algebra": {
                        if (isEmpty(tail(_arg))) {
                            matchResult_1 = 0;
                        }
                        else {
                            matchResult_1 = 3;
                        }
                        break;
                    }
                    case "geometry": {
                        if (!isEmpty(tail(_arg))) {
                            const activePatternResult_1 = Route_$007CQuery$007C_$007C(head(tail(_arg)));
                            if (activePatternResult_1 != null) {
                                if (!isEmpty(activePatternResult_1)) {
                                    if (head(activePatternResult_1)[0] === "tab") {
                                        if (isEmpty(tail(activePatternResult_1))) {
                                            if (isEmpty(tail(tail(_arg)))) {
                                                matchResult_1 = 2;
                                                tab_1 = head(activePatternResult_1)[1];
                                            }
                                            else {
                                                matchResult_1 = 3;
                                            }
                                        }
                                        else {
                                            matchResult_1 = 3;
                                        }
                                    }
                                    else {
                                        matchResult_1 = 3;
                                    }
                                }
                                else {
                                    matchResult_1 = 3;
                                }
                            }
                            else {
                                matchResult_1 = 3;
                            }
                        }
                        else {
                            matchResult_1 = 1;
                        }
                        break;
                    }
                    default:
                        matchResult_1 = 3;
                }
            }
            else {
                matchResult_1 = 3;
            }
            switch (matchResult_1) {
                case 0:
                    return createElement(view_1, null);
                case 1:
                    return view_2("");
                case 2:
                    return view_2(tab_1);
                default: {
                    let matchResult_2, tab_2;
                    if (!isEmpty(_arg)) {
                        if (head(_arg) === "mensuration") {
                            if (!isEmpty(tail(_arg))) {
                                const activePatternResult_2 = Route_$007CQuery$007C_$007C(head(tail(_arg)));
                                if (activePatternResult_2 != null) {
                                    if (!isEmpty(activePatternResult_2)) {
                                        if (head(activePatternResult_2)[0] === "tab") {
                                            if (isEmpty(tail(activePatternResult_2))) {
                                                if (isEmpty(tail(tail(_arg)))) {
                                                    matchResult_2 = 1;
                                                    tab_2 = head(activePatternResult_2)[1];
                                                }
                                                else {
                                                    matchResult_2 = 2;
                                                }
                                            }
                                            else {
                                                matchResult_2 = 2;
                                            }
                                        }
                                        else {
                                            matchResult_2 = 2;
                                        }
                                    }
                                    else {
                                        matchResult_2 = 2;
                                    }
                                }
                                else {
                                    matchResult_2 = 2;
                                }
                            }
                            else {
                                matchResult_2 = 0;
                            }
                        }
                        else {
                            matchResult_2 = 2;
                        }
                    }
                    else {
                        matchResult_2 = 2;
                    }
                    switch (matchResult_2) {
                        case 0:
                            return view_3("");
                        case 1:
                            return view_3(tab_2);
                        default: {
                            let matchResult_3, tab_3;
                            if (!isEmpty(_arg)) {
                                if (head(_arg) === "trigonometry") {
                                    if (!isEmpty(tail(_arg))) {
                                        const activePatternResult_3 = Route_$007CQuery$007C_$007C(head(tail(_arg)));
                                        if (activePatternResult_3 != null) {
                                            if (!isEmpty(activePatternResult_3)) {
                                                if (head(activePatternResult_3)[0] === "tab") {
                                                    if (isEmpty(tail(activePatternResult_3))) {
                                                        if (isEmpty(tail(tail(_arg)))) {
                                                            matchResult_3 = 1;
                                                            tab_3 = head(activePatternResult_3)[1];
                                                        }
                                                        else {
                                                            matchResult_3 = 2;
                                                        }
                                                    }
                                                    else {
                                                        matchResult_3 = 2;
                                                    }
                                                }
                                                else {
                                                    matchResult_3 = 2;
                                                }
                                            }
                                            else {
                                                matchResult_3 = 2;
                                            }
                                        }
                                        else {
                                            matchResult_3 = 2;
                                        }
                                    }
                                    else {
                                        matchResult_3 = 0;
                                    }
                                }
                                else {
                                    matchResult_3 = 2;
                                }
                            }
                            else {
                                matchResult_3 = 2;
                            }
                            switch (matchResult_3) {
                                case 0:
                                    return view_4("");
                                case 1:
                                    return view_4(tab_3);
                                default: {
                                    let matchResult_4, tab_4;
                                    if (!isEmpty(_arg)) {
                                        if (head(_arg) === "transforms") {
                                            if (!isEmpty(tail(_arg))) {
                                                const activePatternResult_4 = Route_$007CQuery$007C_$007C(head(tail(_arg)));
                                                if (activePatternResult_4 != null) {
                                                    if (!isEmpty(activePatternResult_4)) {
                                                        if (head(activePatternResult_4)[0] === "tab") {
                                                            if (isEmpty(tail(activePatternResult_4))) {
                                                                if (isEmpty(tail(tail(_arg)))) {
                                                                    matchResult_4 = 1;
                                                                    tab_4 = head(activePatternResult_4)[1];
                                                                }
                                                                else {
                                                                    matchResult_4 = 2;
                                                                }
                                                            }
                                                            else {
                                                                matchResult_4 = 2;
                                                            }
                                                        }
                                                        else {
                                                            matchResult_4 = 2;
                                                        }
                                                    }
                                                    else {
                                                        matchResult_4 = 2;
                                                    }
                                                }
                                                else {
                                                    matchResult_4 = 2;
                                                }
                                            }
                                            else {
                                                matchResult_4 = 0;
                                            }
                                        }
                                        else {
                                            matchResult_4 = 2;
                                        }
                                    }
                                    else {
                                        matchResult_4 = 2;
                                    }
                                    switch (matchResult_4) {
                                        case 0:
                                            return view_5("");
                                        case 1:
                                            return view_5(tab_4);
                                        default: {
                                            let matchResult_5, tab_5;
                                            if (!isEmpty(_arg)) {
                                                if (head(_arg) === "probability") {
                                                    if (!isEmpty(tail(_arg))) {
                                                        const activePatternResult_5 = Route_$007CQuery$007C_$007C(head(tail(_arg)));
                                                        if (activePatternResult_5 != null) {
                                                            if (!isEmpty(activePatternResult_5)) {
                                                                if (head(activePatternResult_5)[0] === "tab") {
                                                                    if (isEmpty(tail(activePatternResult_5))) {
                                                                        if (isEmpty(tail(tail(_arg)))) {
                                                                            matchResult_5 = 1;
                                                                            tab_5 = head(activePatternResult_5)[1];
                                                                        }
                                                                        else {
                                                                            matchResult_5 = 2;
                                                                        }
                                                                    }
                                                                    else {
                                                                        matchResult_5 = 2;
                                                                    }
                                                                }
                                                                else {
                                                                    matchResult_5 = 2;
                                                                }
                                                            }
                                                            else {
                                                                matchResult_5 = 2;
                                                            }
                                                        }
                                                        else {
                                                            matchResult_5 = 2;
                                                        }
                                                    }
                                                    else {
                                                        matchResult_5 = 0;
                                                    }
                                                }
                                                else {
                                                    matchResult_5 = 2;
                                                }
                                            }
                                            else {
                                                matchResult_5 = 2;
                                            }
                                            switch (matchResult_5) {
                                                case 0:
                                                    return view_6("");
                                                case 1:
                                                    return view_6(tab_5);
                                                default: {
                                                    let matchResult_6, tab_6;
                                                    if (!isEmpty(_arg)) {
                                                        if (head(_arg) === "statistics") {
                                                            if (!isEmpty(tail(_arg))) {
                                                                const activePatternResult_6 = Route_$007CQuery$007C_$007C(head(tail(_arg)));
                                                                if (activePatternResult_6 != null) {
                                                                    if (!isEmpty(activePatternResult_6)) {
                                                                        if (head(activePatternResult_6)[0] === "tab") {
                                                                            if (isEmpty(tail(activePatternResult_6))) {
                                                                                if (isEmpty(tail(tail(_arg)))) {
                                                                                    matchResult_6 = 1;
                                                                                    tab_6 = head(activePatternResult_6)[1];
                                                                                }
                                                                                else {
                                                                                    matchResult_6 = 2;
                                                                                }
                                                                            }
                                                                            else {
                                                                                matchResult_6 = 2;
                                                                            }
                                                                        }
                                                                        else {
                                                                            matchResult_6 = 2;
                                                                        }
                                                                    }
                                                                    else {
                                                                        matchResult_6 = 2;
                                                                    }
                                                                }
                                                                else {
                                                                    matchResult_6 = 2;
                                                                }
                                                            }
                                                            else {
                                                                matchResult_6 = 0;
                                                            }
                                                        }
                                                        else {
                                                            matchResult_6 = 2;
                                                        }
                                                    }
                                                    else {
                                                        matchResult_6 = 2;
                                                    }
                                                    switch (matchResult_6) {
                                                        case 0:
                                                            return view_7("");
                                                        case 1:
                                                            return view_7(tab_6);
                                                        default:
                                                            if (isEmpty(_arg)) {
                                                                const subUrl = (section, url) => RouterModule_encodeParts(ofArray(["ig", section + RouterModule_encodeQueryString(singleton(["tab", url]))]), 1);
                                                                return createElement("div", createObj(ofArray([["className", "prose prose-lg p-16"], (elems = [Heading("Outline"), Link("Numbers", RouterModule_encodeParts(ofArray(["ig", "numbers"]), 1)), LinkList(map((tab_7) => [tab_7[0], subUrl("numbers", tab_7[0])], Numbers_tabs)), Link("Algebra and Graphs", RouterModule_encodeParts(ofArray(["ig", "algebra"]), 1)), LinkList(empty()), Link("Geometry", RouterModule_encodeParts(ofArray(["ig", "geometry"]), 1)), LinkList(map((tab_8) => [tab_8[0], subUrl("geometry", tab_8[0])], tabs)), Link("Mensuration", RouterModule_encodeParts(ofArray(["ig", "mensuration"]), 1)), LinkList(map((tab_9) => [tab_9[0], subUrl("mensuration", tab_9[0])], tabs_1)), Link("Trigonometry", RouterModule_encodeParts(ofArray(["ig", "trigonometry"]), 1)), LinkList(map((tab_10) => [tab_10[0], subUrl("trigonometry", tab_10[0])], tabs_2)), Link("Vectors and Transformations", RouterModule_encodeParts(ofArray(["ig", "transforms"]), 1)), LinkList(map((tab_11) => [tab_11[0], subUrl("transforms", tab_11[0])], tabs_3)), Link("Probability", RouterModule_encodeParts(ofArray(["ig", "probability"]), 1)), LinkList(map((tab_12) => [tab_12[0], subUrl("probability", tab_12[0])], tabs_4)), Link("Statistics", RouterModule_encodeParts(ofArray(["ig", "statistics"]), 1)), LinkList(map((tab_13) => [tab_13[0], subUrl("statistics", tab_13[0])], tabs_5))], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
                                                            }
                                                            else {
                                                                return SubHeading(`Page '${_arg}' does not exist`);
                                                            }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

