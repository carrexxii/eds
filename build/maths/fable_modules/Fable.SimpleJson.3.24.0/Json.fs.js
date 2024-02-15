import { Union } from "../fable-library.4.9.0/Types.js";
import { union_type, class_type, list_type, bool_type, string_type, float64_type } from "../fable-library.4.9.0/Reflection.js";

export class Json extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["JNumber", "JString", "JBool", "JNull", "JArray", "JObject"];
    }
}

export function Json_$reflection() {
    return union_type("Fable.SimpleJson.Json", [], Json, () => [[["Item", float64_type]], [["Item", string_type]], [["Item", bool_type]], [], [["Item", list_type(Json_$reflection())]], [["Item", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, Json_$reflection()])]]]);
}

