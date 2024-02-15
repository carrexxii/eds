import { empty } from "../fable-library.4.9.0/List.js";
import { defaultOf, uncurry2 } from "../fable-library.4.9.0/Util.js";
import { toFail, printf, toText } from "../fable-library.4.9.0/String.js";
import { RemoteBuilderOptions } from "./Types.fs.js";
import { Reader_$ctor_Z3F6BC7B1, Reader__Read_24524716 } from "../Fable.Remoting.MsgPack.1.24.0/Read.fs.js";
import { fullName, makeRecord, getRecordElements, name as name_1, class_type } from "../fable-library.4.9.0/Reflection.js";
import { createTypeInfo } from "../Fable.SimpleJson.3.24.0/TypeInfo.Converter.fs.js";
import { pick, map } from "../fable-library.4.9.0/Array.js";
import { singleton, collect, delay, toArray } from "../fable-library.4.9.0/Seq.js";
import { Proxy_proxyFetch } from "./Proxy.fs.js";

/**
 * Starts with default configuration for building a proxy
 */
export function RemotingModule_createApi() {
    let clo;
    return new RemoteBuilderOptions(empty(), void 0, void 0, false, uncurry2((clo = toText(printf("/%s/%s")), (arg) => {
        const clo_1 = clo(arg);
        return clo_1;
    })), void 0);
}

/**
 * Defines how routes are built using the type name and method name. By default, the generated routes are of the form `/typeName/methodName`.
 */
export function RemotingModule_withRouteBuilder(builder, options) {
    return new RemoteBuilderOptions(options.CustomHeaders, options.BaseUrl, options.Authorization, options.WithCredentials, builder, options.CustomResponseSerialization);
}

/**
 * Sets the base url for the request. Useful if you are making cross-domain requests
 */
export function RemotingModule_withBaseUrl(url, options) {
    return new RemoteBuilderOptions(options.CustomHeaders, url, options.Authorization, options.WithCredentials, options.RouteBuilder, options.CustomResponseSerialization);
}

/**
 * Adds custom headers to each request of the proxy
 */
export function RemotingModule_withCustomHeader(headers, options) {
    return new RemoteBuilderOptions(headers, options.BaseUrl, options.Authorization, options.WithCredentials, options.RouteBuilder, options.CustomResponseSerialization);
}

/**
 * Sets the authorization header of every request from the proxy
 */
export function RemotingModule_withAuthorizationHeader(token, options) {
    return new RemoteBuilderOptions(options.CustomHeaders, options.BaseUrl, token, options.WithCredentials, options.RouteBuilder, options.CustomResponseSerialization);
}

/**
 * Sets the withCredentials option on the XHR request, which is useful for CORS scenarios
 */
export function RemotingModule_withCredentials(withCredentials, options) {
    return new RemoteBuilderOptions(options.CustomHeaders, options.BaseUrl, options.Authorization, withCredentials, options.RouteBuilder, options.CustomResponseSerialization);
}

/**
 * Specifies that the API uses binary serialization for responses
 */
export function RemotingModule_withBinarySerialization(options) {
    return new RemoteBuilderOptions(options.CustomHeaders, options.BaseUrl, options.Authorization, options.WithCredentials, options.RouteBuilder, (response, returnType) => Reader__Read_24524716(Reader_$ctor_Z3F6BC7B1(response), returnType));
}

export class Remoting {
    constructor() {
    }
}

export function Remoting_$reflection() {
    return class_type("Fable.Remoting.Client.Remoting", void 0, Remoting);
}

export function Remoting_$ctor() {
    return new Remoting();
}

/**
 * For internal library use only.
 */
export function Remoting_buildProxy_64DC51C(options, resolvedType) {
    const schemaType = createTypeInfo(resolvedType);
    if (schemaType.tag === 39) {
        const patternInput = schemaType.fields[0]();
        const recordType = patternInput[1];
        const fieldTypes = map((prop) => [name_1(prop), prop[1]], getRecordElements(recordType));
        return makeRecord(recordType, toArray(delay(() => collect((field) => {
            let n, matchValue, fieldType, fn;
            return singleton((n = (((matchValue = field.FieldType, (matchValue.tag === 25) ? 0 : ((matchValue.tag === 26) ? 0 : ((matchValue.tag === 37) ? (matchValue.fields[0]().length - 1) : 0)))) | 0), (fieldType = pick((tupledArg) => {
                if (tupledArg[0] === field.FieldName) {
                    return tupledArg[1];
                }
                else {
                    return void 0;
                }
            }, fieldTypes), (fn = Proxy_proxyFetch(options, name_1(recordType), field, fieldType), (n === 0) ? fn(defaultOf())(defaultOf())(defaultOf())(defaultOf())(defaultOf())(defaultOf())(defaultOf())(defaultOf()) : ((n === 1) ? ((a) => fn(a)(defaultOf())(defaultOf())(defaultOf())(defaultOf())(defaultOf())(defaultOf())(defaultOf())) : ((n === 2) ? ((delegateArg, delegateArg_1) => fn(delegateArg)(delegateArg_1)(defaultOf())(defaultOf())(defaultOf())(defaultOf())(defaultOf())(defaultOf())) : ((n === 3) ? ((delegateArg_2, delegateArg_3, delegateArg_4) => fn(delegateArg_2)(delegateArg_3)(delegateArg_4)(defaultOf())(defaultOf())(defaultOf())(defaultOf())(defaultOf())) : ((n === 4) ? ((delegateArg_5, delegateArg_6, delegateArg_7, delegateArg_8) => fn(delegateArg_5)(delegateArg_6)(delegateArg_7)(delegateArg_8)(defaultOf())(defaultOf())(defaultOf())(defaultOf())) : ((n === 5) ? ((delegateArg_9, delegateArg_10, delegateArg_11, delegateArg_12, delegateArg_13) => fn(delegateArg_9)(delegateArg_10)(delegateArg_11)(delegateArg_12)(delegateArg_13)(defaultOf())(defaultOf())(defaultOf())) : ((n === 6) ? ((delegateArg_14, delegateArg_15, delegateArg_16, delegateArg_17, delegateArg_18, delegateArg_19) => fn(delegateArg_14)(delegateArg_15)(delegateArg_16)(delegateArg_17)(delegateArg_18)(delegateArg_19)(defaultOf())(defaultOf())) : ((n === 7) ? ((delegateArg_20, delegateArg_21, delegateArg_22, delegateArg_23, delegateArg_24, delegateArg_25, delegateArg_26) => fn(delegateArg_20)(delegateArg_21)(delegateArg_22)(delegateArg_23)(delegateArg_24)(delegateArg_25)(delegateArg_26)(defaultOf())) : ((n === 8) ? ((delegateArg_27, delegateArg_28, delegateArg_29, delegateArg_30, delegateArg_31, delegateArg_32, delegateArg_33, delegateArg_34) => fn(delegateArg_27)(delegateArg_28)(delegateArg_29)(delegateArg_30)(delegateArg_31)(delegateArg_32)(delegateArg_33)(delegateArg_34)) : toFail(printf("Cannot generate proxy function for %s. Only up to 8 arguments are supported. Consider using a record type as input"))(field.FieldName)))))))))))));
        }, patternInput[0]))));
    }
    else {
        const arg_1 = fullName(resolvedType);
        return toFail(printf("Cannot build proxy. Exepected type %s to be a valid protocol definition which is a record of functions"))(arg_1);
    }
}

