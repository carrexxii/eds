import { createElement } from "react";
import React from "react";
import { Tabbed } from "../shared/components.js";
import { empty } from "../fable_modules/fable-library.4.9.0/List.js";

export function view() {
    return createElement(Tabbed, {
        tabName: "",
        tabs: empty(),
    });
}

