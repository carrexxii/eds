import { render, create } from "./mafs/Feliz.Mafs_1/mafs.js";
import { createElement } from "react";
import { Cartesian_create, Cartesian_render } from "./mafs/Feliz.Mafs_1/coordinates.js";
import { singleton } from "./fable_modules/fable-library.4.9.0/List.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.7.0/Interop.fs.js";

export function view() {
    let children;
    const children_1 = singleton((children = create(), render(singleton(createElement(Cartesian_render, Cartesian_create())), children)));
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children_1)),
    });
}

