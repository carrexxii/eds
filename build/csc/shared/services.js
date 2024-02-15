import { Record } from "../fable_modules/fable-library.4.9.0/Types.js";
import { union_type, array_type, tuple_type, lambda_type, class_type, option_type, unit_type, record_type, string_type, int32_type } from "../fable_modules/fable-library.4.9.0/Reflection.js";
import { defaultOf, int32ToString } from "../fable_modules/fable-library.4.9.0/Util.js";
import { FSharpResult$2 } from "../fable_modules/fable-library.4.9.0/Choice.js";
import { Remoting_buildProxy_64DC51C } from "../fable_modules/Fable.Remoting.Client.7.31.0/Remoting.fs.js";
import { RemotingModule_createApi } from "../fable_modules/Fable.Remoting.Client.7.31.0/Remoting.fs.js";

export class User extends Record {
    constructor(id, username, email, password) {
        super();
        this.id = (id | 0);
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

export function User_$reflection() {
    return record_type("EDS.Shared.Services.User", [], User, () => [["id", int32_type], ["username", string_type], ["email", string_type], ["password", string_type]]);
}

export function User_get_Default() {
    return new User(-1, "", "", "");
}

export function User__toStringArray(this$) {
    return [int32ToString(this$.id), this$.username, this$.email];
}

export class IUser extends Record {
    constructor(get$, getMany, set$, add) {
        super();
        this.get = get$;
        this.getMany = getMany;
        this.set = set$;
        this.add = add;
    }
}

export function IUser_$reflection() {
    return record_type("EDS.Shared.Services.IUser", [], IUser, () => [["get", lambda_type(unit_type, class_type("Microsoft.FSharp.Control.FSharpAsync`1", [option_type(User_$reflection())]))], ["getMany", lambda_type(tuple_type(int32_type, int32_type), class_type("Microsoft.FSharp.Control.FSharpAsync`1", [option_type(array_type(User_$reflection()))]))], ["set", lambda_type(User_$reflection(), class_type("Microsoft.FSharp.Control.FSharpAsync`1", [union_type("Microsoft.FSharp.Core.FSharpResult`2", [unit_type, string_type], FSharpResult$2, () => [[["ResultValue", unit_type]], [["ErrorValue", string_type]]])]))], ["add", lambda_type(User_$reflection(), class_type("Microsoft.FSharp.Control.FSharpAsync`1", [union_type("Microsoft.FSharp.Core.FSharpResult`2", [unit_type, string_type], FSharpResult$2, () => [[["ResultValue", unit_type]], [["ErrorValue", string_type]]])]))]]);
}

export function IUser__get_ctx(this$) {
    return defaultOf();
}

export const userService = Remoting_buildProxy_64DC51C(RemotingModule_createApi(), IUser_$reflection());

export class IResource extends Record {
    constructor(getProgram) {
        super();
        this.getProgram = getProgram;
    }
}

export function IResource_$reflection() {
    return record_type("EDS.Shared.Services.IResource", [], IResource, () => [["getProgram", lambda_type(string_type, class_type("Microsoft.FSharp.Control.FSharpAsync`1", [option_type(array_type(string_type))]))]]);
}

export const resourceService = Remoting_buildProxy_64DC51C(RemotingModule_createApi(), IResource_$reflection());

