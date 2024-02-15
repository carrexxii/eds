import { fromContinuations } from "../fable-library.4.9.0/Async.js";
import { toFail, printf, toText, trimEnd } from "../fable-library.4.9.0/String.js";
import { fullName, getGenerics, isGenericType, getFunctionElements, isFunction } from "../fable-library.4.9.0/Reflection.js";
import { take, equalsWith, last, head } from "../fable-library.4.9.0/Array.js";
import { curry2, defaultOf, equals } from "../fable-library.4.9.0/Util.js";
import { empty, singleton, append, delay, toList } from "../fable-library.4.9.0/Seq.js";
import { map } from "../fable-library.4.9.0/Option.js";
import { singleton as singleton_1 } from "../fable-library.4.9.0/AsyncBuilder.js";
import { send, get$, post, withBody, withHeaders, withCredentials as withCredentials_4, sendAndReadBinary } from "./Http.fs.js";
import { RequestBody, ProxyRequestException_$ctor_76BC5104, HttpResponse } from "./Types.fs.js";
import { createTypeInfo } from "../Fable.SimpleJson.3.24.0/TypeInfo.Converter.fs.js";
import { SimpleJson_parseNative } from "../Fable.SimpleJson.3.24.0/SimpleJson.fs.js";
import { Convert_serialize, Convert_arrayLike, Convert_fromJsonAs } from "../Fable.SimpleJson.3.24.0/Json.Converter.fs.js";
import { TypeInfo } from "../Fable.SimpleJson.3.24.0/TypeInfo.fs.js";

/**
 * Asynchronously reads the blob data content as string
 */
export function Blob_readBlobAsText(blob) {
    return fromContinuations((tupledArg) => {
        const reader = new FileReader();
        reader.onload = ((_arg_2) => {
            if (reader.readyState === 2) {
                tupledArg[0](reader.result);
            }
        });
        reader.readAsText(blob);
    });
}

export function Proxy_combineRouteWithBaseUrl(route, baseUrl) {
    if (baseUrl != null) {
        const arg = trimEnd(baseUrl, "/");
        return toText(printf("%s%s"))(arg)(route);
    }
    else {
        return route;
    }
}

export function Proxy_isByteArray(_arg) {
    if (_arg.tag === 30) {
        if (_arg.fields[0]().tag === 13) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

export function Proxy_isAsyncOfByteArray(_arg) {
    if (_arg.tag === 25) {
        const matchValue = _arg.fields[0]();
        if (matchValue.tag === 30) {
            if (matchValue.fields[0]().tag === 13) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

export function Proxy_getReturnType(typ_mut) {
    Proxy_getReturnType:
    while (true) {
        const typ = typ_mut;
        if (isFunction(typ)) {
            typ_mut = getFunctionElements(typ)[1];
            continue Proxy_getReturnType;
        }
        else if (isGenericType(typ)) {
            return head(getGenerics(typ));
        }
        else {
            return typ;
        }
        break;
    }
}

export function Proxy_proxyFetch(options, typeName, func, fieldType) {
    let funcArgs;
    const matchValue = func.FieldType;
    funcArgs = ((matchValue.tag === 25) ? [func.FieldType] : ((matchValue.tag === 26) ? [func.FieldType] : ((matchValue.tag === 37) ? matchValue.fields[0]() : toFail(printf("Field %s does not have a valid definiton"))(func.FieldName))));
    const argumentCount = (funcArgs.length - 1) | 0;
    const returnTypeAsync = last(funcArgs);
    let binaryInput;
    const matchValue_1 = func.FieldType;
    if (matchValue_1.tag === 37) {
        const matchValue_2 = matchValue_1.fields[0]();
        if (!equalsWith(equals, matchValue_2, defaultOf()) && (matchValue_2.length === 2)) {
            const output = matchValue_2[1];
            binaryInput = Proxy_isByteArray(matchValue_2[0]);
        }
        else {
            binaryInput = false;
        }
    }
    else {
        binaryInput = false;
    }
    const url = Proxy_combineRouteWithBaseUrl(options.RouteBuilder(typeName, func.FieldName), options.BaseUrl);
    const funcNeedParameters = (!equalsWith(equals, funcArgs, defaultOf()) && (funcArgs.length === 1)) ? ((funcArgs[0].tag === 25) ? false : (!(funcArgs[0].tag === 26))) : ((!equalsWith(equals, funcArgs, defaultOf()) && (funcArgs.length === 2)) ? ((funcArgs[0].tag === 0) ? (!(funcArgs[1].tag === 25)) : true) : true);
    const contentType = binaryInput ? "application/octet-stream" : "application/json; charset=utf-8";
    const inputArgumentTypes = take(argumentCount, funcArgs);
    const headers = toList(delay(() => append(singleton(["Content-Type", contentType]), delay(() => append(singleton(["x-remoting-proxy", "true"]), delay(() => append(options.CustomHeaders, delay(() => {
        const matchValue_3 = options.Authorization;
        if (matchValue_3 == null) {
            return empty();
        }
        else {
            return singleton(["Authorization", matchValue_3]);
        }
    }))))))));
    let executeRequest;
    if ((options.CustomResponseSerialization != null) ? true : Proxy_isAsyncOfByteArray(returnTypeAsync)) {
        let onOk;
        const matchValue_4 = options.CustomResponseSerialization;
        if (matchValue_4 != null) {
            const serializer = map(curry2, matchValue_4);
            const returnType = Proxy_getReturnType(fieldType);
            onOk = ((response) => serializer(response)(returnType));
        }
        else {
            onOk = ((value) => value);
        }
        executeRequest = ((requestBody) => singleton_1.Delay(() => singleton_1.Bind(funcNeedParameters ? sendAndReadBinary(withCredentials_4(options.WithCredentials, withHeaders(headers, withBody(requestBody, post(url))))) : sendAndReadBinary(withCredentials_4(options.WithCredentials, withHeaders(headers, get$(url)))), (_arg) => {
            const statusCode = _arg[1] | 0;
            const response_1 = _arg[0];
            if (statusCode === 200) {
                return singleton_1.Return(onOk(response_1));
            }
            else {
                const n = statusCode | 0;
                const responseAsBlob = new Blob([response_1.buffer], { type: 'text/plain' });
                return singleton_1.Bind(Blob_readBlobAsText(responseAsBlob), (_arg_1) => {
                    const response_2 = new HttpResponse(statusCode, _arg_1);
                    const errorMsg = (n === 500) ? toText(printf("Internal server error (500) while making request to %s"))(url) : toText(printf("Http error (%d) while making request to %s"))(n)(url);
                    return singleton_1.ReturnFrom((() => {
                        throw ProxyRequestException_$ctor_76BC5104(response_2, errorMsg, response_2.ResponseBody);
                    })());
                });
            }
        })));
    }
    else {
        let returnType_1;
        switch (returnTypeAsync.tag) {
            case 25: {
                returnType_1 = returnTypeAsync.fields[0]();
                break;
            }
            case 26: {
                returnType_1 = returnTypeAsync.fields[0]();
                break;
            }
            case 24: {
                const t = returnTypeAsync.fields[0]();
                returnType_1 = ((fullName(t).indexOf("System.Threading.Tasks.Task`1") === 0) ? createTypeInfo(getGenerics(t)[0]) : toFail(printf("Expected field %s to have a return type of Async<\'t> or Task<\'t>"))(func.FieldName));
                break;
            }
            default:
                returnType_1 = toFail(printf("Expected field %s to have a return type of Async<\'t> or Task<\'t>"))(func.FieldName);
        }
        executeRequest = ((requestBody_1) => singleton_1.Delay(() => singleton_1.Bind(funcNeedParameters ? send(withCredentials_4(options.WithCredentials, withHeaders(headers, withBody(requestBody_1, post(url))))) : send(withCredentials_4(options.WithCredentials, withHeaders(headers, get$(url)))), (_arg_2) => {
            const response_3 = _arg_2;
            const matchValue_5 = response_3.StatusCode | 0;
            switch (matchValue_5) {
                case 200: {
                    const parsedJson = SimpleJson_parseNative(response_3.ResponseBody);
                    return singleton_1.Return(Convert_fromJsonAs(parsedJson, returnType_1));
                }
                case 500:
                    return singleton_1.ReturnFrom((() => {
                        throw ProxyRequestException_$ctor_76BC5104(response_3, toText(printf("Internal server error (500) while making request to %s"))(url), response_3.ResponseBody);
                    })());
                default:
                    return singleton_1.ReturnFrom((() => {
                        throw ProxyRequestException_$ctor_76BC5104(response_3, toText(printf("Http error (%d) from server occured while making request to %s"))(matchValue_5)(url), response_3.ResponseBody);
                    })());
            }
        })));
    }
    return (arg0) => ((arg1) => ((arg2) => ((arg3) => ((arg4) => ((arg5) => ((arg6) => ((arg7) => {
        let matchValue_6;
        const inputArguments = funcNeedParameters ? take(argumentCount, [arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7]) : [];
        return executeRequest(binaryInput ? (new RequestBody(2, [arg0])) : ((matchValue_6 = (inputArgumentTypes.length | 0), (matchValue_6 === 1) ? (!Convert_arrayLike(inputArgumentTypes[0]) ? (new RequestBody(1, [Convert_serialize(inputArguments[0], new TypeInfo(32, [() => inputArgumentTypes]))])) : (new RequestBody(1, [Convert_serialize([inputArguments[0]], new TypeInfo(30, [() => inputArgumentTypes[0]]))]))) : (new RequestBody(1, [Convert_serialize(inputArguments, new TypeInfo(32, [() => inputArgumentTypes]))])))));
    })))))));
}

