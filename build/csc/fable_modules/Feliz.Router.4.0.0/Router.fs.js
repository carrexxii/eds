import { split, trimEnd, isNullOrWhiteSpace, substring, join, endsWith } from "../fable-library.4.9.0/String.js";
import { ofArray, singleton, collect, head, empty, tail, isEmpty, reverse, map } from "../fable-library.4.9.0/List.js";
import { equalsWith } from "../fable-library.4.9.0/Array.js";
import { defaultOf } from "../fable-library.4.9.0/Util.js";
import { useReact_useEffectOnce_3A5B6456, React_createDisposable_3A5B6456, useReact_useEffectOnce_Z5ECA432F, useReact_useCallbackRef_7C4B0DD6, React_memo_Z71E4ACFA } from "../Feliz.2.7.0/React.fs.js";
import { defaultArg } from "../fable-library.4.9.0/Option.js";
import { defaultOf as defaultOf_1 } from "../fable-library.4.9.0/Util.js";
import { tryParse } from "../fable-library.4.9.0/Int32.js";
import { FSharpRef } from "../fable-library.4.9.0/Types.js";
import { tryParse as tryParse_1 } from "../fable-library.4.9.0/Long.js";
import { tryParse as tryParse_2 } from "../fable-library.4.9.0/Guid.js";
import { tryParse as tryParse_3 } from "../fable-library.4.9.0/Double.js";
import { tryParse as tryParse_4 } from "../fable-library.4.9.0/Decimal.js";
import Decimal from "../fable-library.4.9.0/Decimal.js";
import { map as map_1, delay, toList } from "../fable-library.4.9.0/Seq.js";

export function RouterModule_String_$007CPrefix$007C(prefix, str) {
    if (str.indexOf(prefix) === 0) {
        return str;
    }
    else {
        return void 0;
    }
}

export function RouterModule_String_$007CSuffix$007C(suffix, str) {
    if (endsWith(str, suffix)) {
        return str;
    }
    else {
        return void 0;
    }
}

export function RouterModule_encodeQueryString(queryStringPairs) {
    const _arg = join("&", map((tupledArg) => join("=", [encodeURIComponent(tupledArg[0]), encodeURIComponent(tupledArg[1])]), queryStringPairs));
    if (_arg === "") {
        return "";
    }
    else {
        return "?" + _arg;
    }
}

export function RouterModule_encodeQueryStringInts(queryStringIntPairs) {
    const _arg = join("&", map((tupledArg) => join("=", [encodeURIComponent(tupledArg[0]), tupledArg[1]]), queryStringIntPairs));
    if (_arg === "") {
        return "";
    }
    else {
        return "?" + _arg;
    }
}

function RouterModule_normalizeRoute(routeMode) {
    if (routeMode === 1) {
        return (_arg) => {
            let activePatternResult, path, activePatternResult_1, path_1, activePatternResult_2, path_2;
            return (activePatternResult = RouterModule_String_$007CPrefix$007C("/", _arg), (activePatternResult != null) ? ((path = activePatternResult, "#" + path)) : ((activePatternResult_1 = RouterModule_String_$007CPrefix$007C("#/", _arg), (activePatternResult_1 != null) ? ((path_1 = activePatternResult_1, path_1)) : ((activePatternResult_2 = RouterModule_String_$007CPrefix$007C("#", _arg), (activePatternResult_2 != null) ? ((path_2 = activePatternResult_2, "#/" + substring(path_2, 1, path_2.length - 1))) : ("#/" + _arg))))));
        };
    }
    else {
        return (_arg_1) => {
            let activePatternResult_3, path_4;
            return (activePatternResult_3 = RouterModule_String_$007CPrefix$007C("/", _arg_1), (activePatternResult_3 != null) ? ((path_4 = activePatternResult_3, path_4)) : ("/" + _arg_1));
        };
    }
}

export function RouterModule_encodeParts(xs, routeMode) {
    return RouterModule_normalizeRoute(routeMode)(join("/", map((part) => {
        if (((part.indexOf("?") >= 0) ? true : (part.indexOf("#") === 0)) ? true : (part.indexOf("/") === 0)) {
            return part;
        }
        else {
            return encodeURIComponent(part);
        }
    }, xs)));
}

/**
 * Safely returns tuple of list items without last one and last item
 */
export function RouterModule_trySeparateLast(xs) {
    const matchValue = reverse(xs);
    if (!isEmpty(matchValue)) {
        if (isEmpty(tail(matchValue))) {
            return [empty(), head(matchValue)];
        }
        else {
            return [reverse(tail(matchValue)), head(matchValue)];
        }
    }
    else {
        return void 0;
    }
}

export function RouterModule_nav(xs, mode, routeMode) {
    if (mode === 1) {
        history.pushState(void 0, "", RouterModule_encodeParts(xs, routeMode));
    }
    else {
        history.replaceState(void 0, "", RouterModule_encodeParts(xs, routeMode));
    }
    const ev = document.createEvent("CustomEvent");
    ev.initEvent("CUSTOM_NAVIGATION_EVENT", true, true);
    window.dispatchEvent(ev);
}

/**
 * Parses the URL into multiple path segments
 */
export function RouterModule_urlSegments(path, mode) {
    return collect((segment) => {
        if (isNullOrWhiteSpace(segment)) {
            return empty();
        }
        else {
            const segment_1 = trimEnd(segment, "#");
            if (segment_1 === "?") {
                return empty();
            }
            else if (RouterModule_String_$007CPrefix$007C("?", segment_1) != null) {
                return singleton(segment_1);
            }
            else {
                const matchValue = segment_1.split("?");
                if (!equalsWith((x, y) => (x === y), matchValue, defaultOf()) && (matchValue.length === 1)) {
                    const value = matchValue[0];
                    return singleton(decodeURIComponent(value));
                }
                else if (!equalsWith((x_1, y_1) => (x_1 === y_1), matchValue, defaultOf()) && (matchValue.length === 2)) {
                    if (matchValue[1] === "") {
                        const value_1 = matchValue[0];
                        return singleton(decodeURIComponent(value_1));
                    }
                    else {
                        const value_2 = matchValue[0];
                        const query = matchValue[1];
                        return ofArray([decodeURIComponent(value_2), "?" + query]);
                    }
                }
                else {
                    return empty();
                }
            }
        }
    }, ofArray(split((RouterModule_String_$007CPrefix$007C("#", path) != null) ? substring(path, 1, path.length - 1) : ((mode === 1) ? ((RouterModule_String_$007CSuffix$007C("#", path) != null) ? "" : ((RouterModule_String_$007CSuffix$007C("#/", path) != null) ? "" : path)) : path), ["/"], void 0, 0)));
}

export function RouterModule_onUrlChange(routeMode, urlChanged, ev) {
    return urlChanged(RouterModule_urlSegments((routeMode === 2) ? (window.location.pathname + window.location.search) : window.location.hash, routeMode));
}

export const RouterModule_router = React_memo_Z71E4ACFA((input) => {
    const onChange = useReact_useCallbackRef_7C4B0DD6((ev) => {
        const urlChanged = defaultArg(input.onUrlChanged, (value) => {
        });
        RouterModule_onUrlChange(defaultArg(input.hashMode, 1), urlChanged, ev);
    });
    useReact_useEffectOnce_Z5ECA432F(() => {
        if (((window.navigator.userAgent).indexOf("Trident") >= 0) ? true : ((window.navigator.userAgent).indexOf("MSIE") >= 0)) {
            window.addEventListener("hashchange", onChange);
        }
        else {
            window.addEventListener("popstate", onChange);
        }
        window.addEventListener("CUSTOM_NAVIGATION_EVENT", onChange);
        return React_createDisposable_3A5B6456(() => {
            if (((window.navigator.userAgent).indexOf("Trident") >= 0) ? true : ((window.navigator.userAgent).indexOf("MSIE") >= 0)) {
                window.removeEventListener("hashchange", onChange);
            }
            else {
                window.removeEventListener("popstate", onChange);
            }
            window.removeEventListener("CUSTOM_NAVIGATION_EVENT", onChange);
        });
    });
    useReact_useEffectOnce_3A5B6456(() => {
        const ev_1 = document.createEvent("CustomEvent");
        ev_1.initEvent("CUSTOM_NAVIGATION_EVENT", true, true);
        window.dispatchEvent(ev_1);
    });
    const matchValue = input.application;
    return (matchValue == null) ? defaultOf_1() : matchValue;
});

export function Route_$007CInt$007C_$007C(input) {
    let matchValue;
    let outArg = 0;
    matchValue = [tryParse(input, 511, false, 32, new FSharpRef(() => outArg, (v) => {
        outArg = (v | 0);
    })), outArg];
    if (matchValue[0]) {
        return matchValue[1];
    }
    else {
        return void 0;
    }
}

export function Route_$007CInt64$007C_$007C(input) {
    let matchValue;
    let outArg = 0n;
    matchValue = [tryParse_1(input, 511, false, 64, new FSharpRef(() => outArg, (v) => {
        outArg = v;
    })), outArg];
    if (matchValue[0]) {
        return matchValue[1];
    }
    else {
        return void 0;
    }
}

export function Route_$007CGuid$007C_$007C(input) {
    let matchValue;
    let outArg = "00000000-0000-0000-0000-000000000000";
    matchValue = [tryParse_2(input, new FSharpRef(() => outArg, (v) => {
        outArg = v;
    })), outArg];
    if (matchValue[0]) {
        return matchValue[1];
    }
    else {
        return void 0;
    }
}

export function Route_$007CNumber$007C_$007C(input) {
    let matchValue;
    let outArg = 0;
    matchValue = [tryParse_3(input, new FSharpRef(() => outArg, (v) => {
        outArg = v;
    })), outArg];
    if (matchValue[0]) {
        return matchValue[1];
    }
    else {
        return void 0;
    }
}

export function Route_$007CDecimal$007C_$007C(input) {
    let matchValue;
    let outArg = new Decimal("0");
    matchValue = [tryParse_4(input, new FSharpRef(() => outArg, (v) => {
        outArg = v;
    })), outArg];
    if (matchValue[0]) {
        return matchValue[1];
    }
    else {
        return void 0;
    }
}

export function Route_$007CBool$007C_$007C(input) {
    const matchValue = input.toLocaleLowerCase();
    switch (matchValue) {
        case "1":
        case "true":
            return true;
        case "0":
        case "false":
            return false;
        case "":
            return true;
        default:
            return void 0;
    }
}

/**
 * Used to parse the query string parameter of the route.
 * 
 * For example to match against
 * 
 * `/users?id={value}`
 * 
 * You can pattern match:
 * 
 * `[ "users"; Route.Query [ "id", value ] ] -> value`
 * 
 * When `{value}` is an integer then you can pattern match:
 * 
 * `[ "users"; Route.Query [ "id", Route.Int userId ] ] -> userId`
 */
export function Route_$007CQuery$007C_$007C(input) {
    try {
        const urlParams = new URLSearchParams(input);
        return toList(delay(() => map_1((entry) => [entry[0], entry[1]], urlParams.entries())));
    }
    catch (matchValue) {
        return void 0;
    }
}

