import { Union, Record } from "./fable_modules/fable-library.4.9.0/Types.js";
import { User__toStringArray, userService, User, User_get_Default, User_$reflection } from "./shared/services.js";
import { union_type, class_type, string_type, record_type, option_type, tuple_type, int32_type, array_type } from "./fable_modules/fable-library.4.9.0/Reflection.js";
import { TableDirection, StaticTable, SortDirection_get_opposite, SortDirection, SortDirection_$reflection } from "./shared/components.js";
import { Cmd_none } from "./fable_modules/Fable.Elmish.4.0.0/cmd.fs.js";
import { Cmd_OfAsync_start, Cmd_OfAsyncWith_perform } from "./fable_modules/Fable.Elmish.4.0.0/cmd.fs.js";
import { defaultArg } from "./fable_modules/fable-library.4.9.0/Option.js";
import { reverse, sortByDescending } from "./fable_modules/fable-library.4.9.0/Array.js";
import { equals, comparePrimitives } from "./fable_modules/fable-library.4.9.0/Util.js";
import { createElement } from "react";
import { isEmpty, ofArray } from "./fable_modules/fable-library.4.9.0/List.js";

export class Model extends Record {
    constructor(user, records, sortBy) {
        super();
        this.user = user;
        this.records = records;
        this.sortBy = sortBy;
    }
}

export function Model_$reflection() {
    return record_type("EDS.User.Dashboard.Model", [], Model, () => [["user", User_$reflection()], ["records", array_type(User_$reflection())], ["sortBy", option_type(tuple_type(int32_type, SortDirection_$reflection()))]]);
}

export function Model_get_Default() {
    return new Model(User_get_Default(), [], void 0);
}

export class Message extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["SetUsername", "SetEmail", "ClearForm", "GetUser", "RecvUser", "GetRecords", "RecvRecords", "SortTable", "ErrorMsg", "ErrorExn", "Completed"];
    }
}

export function Message_$reflection() {
    return union_type("EDS.User.Dashboard.Message", [], Message, () => [[["Item", string_type]], [["Item", string_type]], [], [], [["Item", option_type(User_$reflection())]], [["Item", tuple_type(int32_type, int32_type)]], [["Item", option_type(array_type(User_$reflection()))]], [["Item", int32_type]], [["Item", string_type]], [["Item", class_type("System.Exception")]], []]);
}

export function init(user) {
    let bind$0040;
    return [(bind$0040 = Model_get_Default(), new Model(user, bind$0040.records, bind$0040.sortBy)), Cmd_none()];
}

export function update(msg, state) {
    let bind$0040_1, bind$0040_2, sortBy, arr, bind$0040;
    switch (msg.tag) {
        case 1:
            return [new Model((bind$0040_1 = state.user, new User(bind$0040_1.id, bind$0040_1.username, msg.fields[0], bind$0040_1.password)), state.records, state.sortBy), Cmd_none()];
        case 2:
            return [new Model((bind$0040_2 = state.user, new User(bind$0040_2.id, "", "", bind$0040_2.password)), state.records, state.sortBy), Cmd_none()];
        case 3:
            return [state, Cmd_OfAsyncWith_perform((x) => {
                Cmd_OfAsync_start(x);
            }, userService.get, void 0, (Item) => (new Message(4, [Item])))];
        case 4: {
            const user = msg.fields[0];
            if (user == null) {
                throw new Error("Got \'None\' from GetUser");
            }
            else {
                return [new Model(user, state.records, state.sortBy), Cmd_none()];
            }
        }
        case 5:
            return [state, Cmd_OfAsyncWith_perform((x_1) => {
                Cmd_OfAsync_start(x_1);
            }, userService.getMany, msg.fields[0], (Item_1) => (new Message(6, [Item_1])))];
        case 6: {
            const records = msg.fields[0];
            if (records == null) {
                throw new Error("Got \'None\' from GetRecords");
            }
            else {
                return [new Model(state.user, records, state.sortBy), Cmd_none()];
            }
        }
        case 7: {
            const i = msg.fields[0] | 0;
            const dir = defaultArg(state.sortBy, [-1, new SortDirection(1, [])])[1];
            return [(sortBy = [i, SortDirection_get_opposite()(dir)], new Model(state.user, (arr = sortByDescending((student) => User__toStringArray(state.user)[i], state.records, {
                Compare: comparePrimitives,
            }), equals(dir, new SortDirection(1, [])) ? reverse(arr) : arr), sortBy)), Cmd_none()];
        }
        case 8:
            throw new Error(`Encountered dashboard error: ${msg.fields[0]}`);
        case 9:
            throw new Error(`Encountered dashboard exception: ${msg.fields[0]}`);
        case 10:
            throw new Error("Should be caught by the parent");
        default:
            return [new Model((bind$0040 = state.user, new User(bind$0040.id, msg.fields[0], bind$0040.email, bind$0040.password)), state.records, state.sortBy), Cmd_none()];
    }
}

export function profileView(state) {
    return createElement(StaticTable, {
        dir: new TableDirection(1, []),
        xs: ofArray([ofArray(["", ""]), ofArray(["Name", state.user.username]), ofArray(["Email", state.user.email]), ofArray(["Password", `${state.user.password}`])]),
    });
}

export function view(url, state, dispatch) {
    if (isEmpty(url)) {
        return profileView(state);
    }
    else {
        return createElement("p", {
            children: [`Dashboard page not found ~> ${url}`],
        });
    }
}

