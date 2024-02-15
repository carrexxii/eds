import { createElement } from "react";
import { createObj } from "../fable_modules/fable-library.4.9.0/Util.js";
import { Tabbed, Accordion, UnorderedList, OrderedList, NoteType, Note, PopupSize, Popup, Heading, Article } from "../shared/components.js";
import { singleton, ofArray } from "../fable_modules/fable-library.4.9.0/List.js";
import { Interop_reactApi } from "../fable_modules/Feliz.2.7.0/Interop.fs.js";

export function Units() {
    let elems, children, value_2, value_9;
    return createElement("div", createObj(ofArray([["className", "flex flex-col"], (elems = [(children = singleton(Article(ofArray([Heading("Units"), (value_2 = "When applying maths to real-life problems, numbers should be given some meaning/context.\n                                    We call the context given to a number its ", createElement("p", {
        children: [value_2],
    })), Popup("Unit", new PopupSize(1, []), "The meaning or context of a number, such as 1 kg, 5 cm or 10 m/s"), createElement("p", {
        children: [". The two main types of units are:"],
    }), Note(new NoteType(2, []), "The metric system is the primary one around the world today and will be the one we focus on.\n                                      For real-life situations, however, it can be useful to know the approximate values for some imperial units."), OrderedList(ofArray(["Metric units (or SI units) such as meters and kilograms.", "Imperial units (use in the USA) such as feet and inches."])), createElement("p", {
        children: ["The main units you will come across are:"],
    }), Note(new NoteType(0, []), "The letters in [brackets] are the abbreviations that will be used for telling the units for equations."), UnorderedList(ofArray(["Meters [m]", "Kilograms [kg]", "Seconds [s]"])), (value_9 = "Units can also be combined together to make more units. For example, you probably know that speed\n                                   can be measured in kilometers per hour (km/h). This is a combination of distance (km) and time (h).", createElement("p", {
        children: [value_9],
    })), createElement(Accordion, {
        xs: singleton(["Extended", "\n\n                            "]),
    })]))), createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    })), createElement("div", {})], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

export function Calculations() {
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(["Calculations"]),
    });
}

export const tabs = ofArray([["Units", Units()], ["Perimeter, Area and Volume", Calculations()]]);

export function view(tab) {
    return createElement(Tabbed, {
        tabName: tab,
        tabs: tabs,
    });
}

