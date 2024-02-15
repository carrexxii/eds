import { Union, Record } from "./fable_modules/fable-library.4.9.0/Types.js";
import { union_type, class_type, record_type, option_type, list_type, string_type } from "./fable_modules/fable-library.4.9.0/Reflection.js";
import { userService, User_get_Default, User_$reflection } from "./shared/services.js";
import { view as view_1, Message_$reflection as Message_$reflection_1, Model_get_Default as Model_get_Default_1, Model_$reflection as Model_$reflection_1 } from "./dashboard.js";
import { tail, head, isEmpty, ofArray, singleton, empty } from "./fable_modules/fable-library.4.9.0/List.js";
import { RouterModule_router, RouterModule_encodeParts, RouterModule_urlSegments } from "./fable_modules/Feliz.Router.4.0.0/Router.fs.js";
import { Cmd_OfAsync_start, Cmd_OfAsyncWith_perform } from "./fable_modules/Fable.Elmish.4.0.0/cmd.fs.js";
import { value as value_5 } from "./fable_modules/fable-library.4.9.0/Option.js";
import { Cmd_none } from "./fable_modules/Fable.Elmish.4.0.0/cmd.fs.js";
import { createElement } from "react";
import { SidebarButtons } from "./shared/components.js";
import { concat } from "./shared/util.js";
import { printf, toText } from "./fable_modules/fable-library.4.9.0/String.js";
import { ProgramModule_mkProgram, ProgramModule_run } from "./fable_modules/Fable.Elmish.4.0.0/program.fs.js";
import { Program_withReactSynchronous } from "./fable_modules/Fable.Elmish.React.4.0.0/react.fs.js";

export class Model extends Record {
    constructor(url, user, dash, error) {
        super();
        this.url = url;
        this.user = user;
        this.dash = dash;
        this.error = error;
    }
}

export function Model_$reflection() {
    return record_type("EDS.User.Main.Model", [], Model, () => [["url", list_type(string_type)], ["user", User_$reflection()], ["dash", Model_$reflection_1()], ["error", option_type(string_type)]]);
}

export function Model_get_Default() {
    return new Model(empty(), User_get_Default(), Model_get_Default_1(), void 0);
}

export class Message extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["SetUrl", "GetUser", "RecvUser", "ErrorMsg", "ErrorExn", "ClearError", "DashMsg"];
    }
}

export function Message_$reflection() {
    return union_type("EDS.User.Main.Message", [], Message, () => [[["Item", list_type(string_type)]], [], [["Item", option_type(User_$reflection())]], [["Item", string_type]], [["Item", class_type("System.Exception")]], [], [["Item", Message_$reflection_1()]]]);
}

export function init() {
    let bind$0040;
    return [(bind$0040 = Model_get_Default(), new Model(RouterModule_urlSegments(window.location.hash, 1), bind$0040.user, bind$0040.dash, bind$0040.error)), singleton((dispatch) => {
        dispatch(new Message(1, []));
    })];
}

export function update(msg, state) {
    switch (msg.tag) {
        case 0:
            return [new Model(msg.fields[0], state.user, state.dash, state.error), singleton((dispatch) => {
                dispatch(new Message(1, []));
            })];
        case 1:
            return [state, Cmd_OfAsyncWith_perform((x) => {
                Cmd_OfAsync_start(x);
            }, userService.get, void 0, (Item) => (new Message(2, [Item])))];
        case 2:
            return [new Model(state.url, value_5(msg.fields[0]), state.dash, state.error), Cmd_none()];
        default:
            throw new Error("Match failure: EDS.User.Main.Message");
    }
}

export function view(state, dispatch) {
    let matchValue;
    let sidebar;
    const buttons = ofArray([["dashboard-icon", "Dashboard", RouterModule_encodeParts(singleton("/dashboard"), 1)], ["user-icon", "Profile", RouterModule_encodeParts(singleton("/"), 1)], ["settings-icon", "Settings", RouterModule_encodeParts(singleton("/settings"), 1)], ["info-icon", "About", RouterModule_encodeParts(singleton("/about"), 1)], ["question-icon", "Help", RouterModule_encodeParts(singleton("/help"), 1)]]);
    sidebar = ((url) => createElement(SidebarButtons, {
        buttons: buttons,
        url: url,
    }));
    return RouterModule_router({
        onUrlChanged: (arg_2) => {
            dispatch(new Message(0, [arg_2]));
        },
        application: (matchValue = state.url, !isEmpty(matchValue) ? ((head(matchValue) === "dashboard") ? concat(sidebar("/dashboard"), view_1(tail(matchValue), state.dash, (arg) => {
            dispatch(new Message(6, [arg]));
        })) : ((head(matchValue) === "settings") ? concat(sidebar("/settings"), createElement("p", {
            children: [`Settings page ~> ${tail(matchValue)}`],
        })) : ((head(matchValue) === "about") ? concat(sidebar("/about"), createElement("p", {
            children: [`About page ~> ${tail(matchValue)}`],
        })) : ((head(matchValue) === "help") ? concat(sidebar("/help"), createElement("p", {
            children: [`Help page ~> ${tail(matchValue)}`],
        })) : createElement("p", {
            children: [toText(printf("Page not found: %A"))(matchValue)],
        }))))) : concat(sidebar("/"), createElement("p", {
            children: ["Profile page ~> /"],
        }))),
    });
}

(function (args) {
    ProgramModule_run(Program_withReactSynchronous("root", ProgramModule_mkProgram(init, update, view)));
    return 0;
})(typeof process === 'object' ? process.argv.slice(2) : []);

