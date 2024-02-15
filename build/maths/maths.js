import { Union, Record } from "./fable_modules/fable-library.4.9.0/Types.js";
import { union_type, option_type, record_type, list_type, string_type } from "./fable_modules/fable-library.4.9.0/Reflection.js";
import { userService, User_get_Default, User_$reflection } from "./shared/services.js";
import { tail, head, isEmpty, ofArray, singleton, empty } from "./fable_modules/fable-library.4.9.0/List.js";
import { RouterModule_router, RouterModule_encodeParts, RouterModule_urlSegments } from "./fable_modules/Feliz.Router.4.0.0/Router.fs.js";
import { Cmd_OfAsync_start, Cmd_OfAsyncWith_perform } from "./fable_modules/Fable.Elmish.4.0.0/cmd.fs.js";
import { value as value_1 } from "./fable_modules/fable-library.4.9.0/Option.js";
import { Cmd_none } from "./fable_modules/Fable.Elmish.4.0.0/cmd.fs.js";
import { createElement } from "react";
import { SubHeading, SidebarButtons } from "./shared/components.js";
import { concat } from "./shared/util.js";
import { view as view_1 } from "./mafs.js";
import { view as view_2 } from "./la.js";
import { view as view_3 } from "./ga.js";
import { view as view_4 } from "./ig.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.7.0/Interop.fs.js";
import { ProgramModule_mkProgram, ProgramModule_run } from "./fable_modules/Fable.Elmish.4.0.0/program.fs.js";
import { Program_withReactSynchronous } from "./fable_modules/Fable.Elmish.React.4.0.0/react.fs.js";

export class Model extends Record {
    constructor(url, user) {
        super();
        this.url = url;
        this.user = user;
    }
}

export function Model_$reflection() {
    return record_type("EDS.Maths.Main.Model", [], Model, () => [["url", list_type(string_type)], ["user", User_$reflection()]]);
}

export function Model_get_Default() {
    return new Model(empty(), User_get_Default());
}

export class Message extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["SetUrl", "GetUser", "RecvUser"];
    }
}

export function Message_$reflection() {
    return union_type("EDS.Maths.Main.Message", [], Message, () => [[["Item", list_type(string_type)]], [], [["Item", option_type(User_$reflection())]]]);
}

export function init() {
    let bind$0040;
    return [(bind$0040 = Model_get_Default(), new Model(RouterModule_urlSegments(window.location.hash, 1), bind$0040.user)), singleton((dispatch) => {
        dispatch(new Message(1, []));
    })];
}

export function update(msg, state) {
    switch (msg.tag) {
        case 1:
            return [state, Cmd_OfAsyncWith_perform((x) => {
                Cmd_OfAsync_start(x);
            }, userService.get, void 0, (Item) => (new Message(2, [Item])))];
        case 2:
            return [new Model(state.url, value_1(msg.fields[0])), Cmd_none()];
        default:
            return [new Model(msg.fields[0], state.user), Cmd_none()];
    }
}

export function view(state, dispatch) {
    let matchValue, children;
    let sidebar;
    const buttons = ofArray([["home-icon", "Home", RouterModule_encodeParts(singleton(""), 1)], ["open-book-icon", "Mafs", RouterModule_encodeParts(singleton("mafs"), 1)], ["open-book-icon", "Linear Algebra", RouterModule_encodeParts(singleton("la"), 1)], ["compass-icon", "GA", RouterModule_encodeParts(singleton("ga"), 1)], ["abacus-icon", "IG", RouterModule_encodeParts(singleton("ig"), 1)]]);
    sidebar = ((url) => createElement(SidebarButtons, {
        buttons: buttons,
        url: url,
    }));
    return RouterModule_router({
        onUrlChanged: (arg) => {
            dispatch(new Message(0, [arg]));
        },
        application: (matchValue = state.url, !isEmpty(matchValue) ? ((head(matchValue) === "mafs") ? concat(sidebar(head(matchValue)), createElement(view_1, null)) : ((head(matchValue) === "la") ? concat(sidebar(head(matchValue)), view_2(tail(matchValue))) : ((head(matchValue) === "ga") ? concat(sidebar(head(matchValue)), view_3()) : ((head(matchValue) === "ig") ? concat(sidebar(head(matchValue)), view_4(tail(matchValue))) : concat(sidebar("mafs"), SubHeading(`Page not found: ${matchValue}`)))))) : ((children = ofArray([sidebar(""), createElement("p", {
            children: ["Maths page"],
        })]), createElement("div", {
            children: Interop_reactApi.Children.toArray(Array.from(children)),
        })))),
    });
}

(function (args) {
    ProgramModule_run(Program_withReactSynchronous("root", ProgramModule_mkProgram(init, update, view)));
    return 0;
})(typeof process === 'object' ? process.argv.slice(2) : []);

