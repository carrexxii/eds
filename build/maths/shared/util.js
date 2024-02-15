import { getCharAtIndex } from "../fable_modules/fable-library.4.9.0/String.js";
import { createElement } from "react";
import { Interop_reactApi } from "../fable_modules/Feliz.2.7.0/Interop.fs.js";

export function aOrAn(str) {
    const matchValue = getCharAtIndex(str.toLocaleLowerCase(), 0);
    switch (matchValue) {
        case "a":
        case "e":
        case "i":
        case "o":
        case "u":
            return "an";
        default:
            return "a";
    }
}

export function concat(a, b) {
    return createElement("div", {
        children: Interop_reactApi.Children.toArray([a, b]),
    });
}

