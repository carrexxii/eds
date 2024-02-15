import { equals } from "../fable-library.4.9.0/Util.js";
import { toList } from "../fable-library.4.9.0/Seq.js";

export function objectHas(keys, x) {
    return equals(keys, toList(Object.keys(x)));
}

