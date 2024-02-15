import { createElement } from "react";
import { ofArray } from "../fable_modules/fable-library.4.9.0/List.js";
import { Tabbed } from "../shared/components.js";

export function Probability() {
    return createElement("div", {});
}

export function RelativeFrequency() {
    return createElement("div", {});
}

export function TreeDiagrams() {
    return createElement("div", {});
}

export function VennDiagrams() {
    return createElement("div", {});
}

export const tabs = ofArray([["Probability", Probability()], ["Relative Frequency", RelativeFrequency()], ["Tree Diagrams", TreeDiagrams()], ["Venn Diagrams", VennDiagrams()]]);

export function view(tab) {
    return createElement(Tabbed, {
        tabName: tab,
        tabs: tabs,
    });
}

