import { equals, getEnumUnderlyingType, isEnum, getTupleElements, isTuple, getElementType, isArray, getFunctionElements, isFunction, getUnionCases, getUnionCaseFields, isUnion, getGenerics, getRecordElements, name, isRecord, fullName } from "../fable-library.4.9.0/Reflection.js";
import { UnionCase, RecordField, TypeInfo } from "./TypeInfo.fs.js";
import { map } from "../fable-library.4.9.0/Array.js";
import { collect, singleton, append, delay, toArray } from "../fable-library.4.9.0/Seq.js";
import { defaultOf, structuralHash, Lazy } from "../fable-library.4.9.0/Util.js";
import { Dictionary } from "../fable-library.4.9.0/MutableMap.js";
import { tryGetValue } from "../fable-library.4.9.0/MapUtil.js";
import { FSharpRef } from "../fable-library.4.9.0/Types.js";
import { endsWith, isNullOrEmpty } from "../fable-library.4.9.0/String.js";

export function $007CPrimitiveType$007C_$007C(primType) {
    const matchValue = fullName(primType);
    switch (matchValue) {
        case "System.String":
            return new TypeInfo(2, []);
        case "System.Char":
            return new TypeInfo(1, []);
        case "System.Int16":
            return new TypeInfo(11, []);
        case "System.Int32":
            return new TypeInfo(6, []);
        case "Microsoft.FSharp.Core.int64`1":
        case "System.Int64":
            return new TypeInfo(12, []);
        case "System.UInt16":
            return new TypeInfo(3, []);
        case "System.UInt32":
            return new TypeInfo(4, []);
        case "System.UInt64":
            return new TypeInfo(5, []);
        case "System.DateTime":
            return new TypeInfo(15, []);
        case "System.DateOnly":
            return new TypeInfo(17, []);
        case "System.TimeOnly":
            return new TypeInfo(18, []);
        case "System.TimeSpan":
            return new TypeInfo(20, []);
        case "System.DateTimeOffset":
            return new TypeInfo(16, []);
        case "System.Boolean":
            return new TypeInfo(7, []);
        case "System.Single":
            return new TypeInfo(8, []);
        case "System.Double":
            return new TypeInfo(9, []);
        case "Microsoft.FSharp.Core.decimal`1":
        case "System.Decimal":
            return new TypeInfo(10, []);
        case "System.Numerics.BigInteger":
            return new TypeInfo(19, []);
        case "Microsoft.FSharp.Core.Unit":
            return new TypeInfo(0, []);
        case "System.Guid":
            return new TypeInfo(21, []);
        case "System.Byte":
            return new TypeInfo(13, []);
        case "System.SByte":
            return new TypeInfo(14, []);
        case "System.Object":
            return new TypeInfo(23, []);
        case "System.Uri":
            return new TypeInfo(22, []);
        default:
            return void 0;
    }
}

export function $007CRecordType$007C_$007C(t) {
    if (isRecord(t)) {
        return map((field) => [field, name(field), field[1]], getRecordElements(t));
    }
    else {
        return void 0;
    }
}

export function $007CSetType$007C_$007C(t) {
    if (fullName(t).indexOf("Microsoft.FSharp.Collections.FSharpSet`1") === 0) {
        return getGenerics(t)[0];
    }
    else {
        return void 0;
    }
}

export function $007CNullable$007C_$007C(t) {
    if (fullName(t).indexOf("System.Nullable`1") === 0) {
        return getGenerics(t)[0];
    }
    else {
        return void 0;
    }
}

export function $007CUnionType$007C_$007C(t) {
    if (isUnion(t)) {
        return map((info) => [name(info), info, map((prop) => prop[1], getUnionCaseFields(info))], getUnionCases(t));
    }
    else {
        return void 0;
    }
}

export function $007CMapType$007C_$007C(t) {
    if (fullName(t).indexOf("Microsoft.FSharp.Collections.FSharpMap`2") === 0) {
        const genArgs = getGenerics(t);
        return [genArgs[0], genArgs[1]];
    }
    else {
        return void 0;
    }
}

export function $007CListType$007C_$007C(t) {
    if (fullName(t).indexOf("Microsoft.FSharp.Collections.FSharpList`1") === 0) {
        return getGenerics(t)[0];
    }
    else {
        return void 0;
    }
}

export function flattenFuncTypes(typeDef) {
    return toArray(delay(() => {
        if (isFunction(typeDef)) {
            const patternInput = getFunctionElements(typeDef);
            return append(flattenFuncTypes(patternInput[0]), delay(() => flattenFuncTypes(patternInput[1])));
        }
        else {
            return singleton(typeDef);
        }
    }));
}

export function $007CFuncType$007C_$007C(t) {
    if (isFunction(t)) {
        return flattenFuncTypes(t);
    }
    else {
        return void 0;
    }
}

export function $007CArrayType$007C_$007C(t) {
    if (isArray(t)) {
        return getElementType(t);
    }
    else {
        return void 0;
    }
}

export function $007COptionType$007C_$007C(t) {
    if (fullName(t).indexOf("Microsoft.FSharp.Core.FSharpOption`1") === 0) {
        return getGenerics(t)[0];
    }
    else {
        return void 0;
    }
}

export function $007CTupleType$007C_$007C(t) {
    if (isTuple(t)) {
        return getTupleElements(t);
    }
    else {
        return void 0;
    }
}

export function $007CSeqType$007C_$007C(t) {
    if (fullName(t).indexOf("System.Collections.Generic.IEnumerable`1") === 0) {
        return getGenerics(t)[0];
    }
    else {
        return void 0;
    }
}

export function $007CDictionaryType$007C_$007C(t) {
    if (fullName(t).indexOf("System.Collections.Generic.Dictionary") === 0) {
        const genArgs = getGenerics(t);
        return [genArgs[0], genArgs[1]];
    }
    else {
        return void 0;
    }
}

export function $007CResizeArrayType$007C_$007C(t) {
    if (fullName(t).indexOf("System.Collections.Generic.List") === 0) {
        return getGenerics(t)[0];
    }
    else {
        return void 0;
    }
}

export function $007CHashSetType$007C_$007C(t) {
    if (fullName(t).indexOf("System.Collections.Generic.HashSet") === 0) {
        return getGenerics(t)[0];
    }
    else {
        return void 0;
    }
}

export function $007CAsyncType$007C_$007C(t) {
    if (fullName(t).indexOf("Microsoft.FSharp.Control.FSharpAsync`1") === 0) {
        return getGenerics(t)[0];
    }
    else {
        return void 0;
    }
}

export function $007CPromiseType$007C_$007C(t) {
    if (fullName(t).indexOf("Fable.Core.JS.Promise`1") === 0) {
        return getGenerics(t)[0];
    }
    else {
        return void 0;
    }
}

function lazyToDelayed(l, unitVar) {
    return l.Value;
}

export function $007CEnumType$007C_$007C(t) {
    if (isEnum(t)) {
        return getEnumUnderlyingType(t);
    }
    else {
        return void 0;
    }
}

function _createTypeInfo(resolvedType) {
    let l, l_3, l_4, l_5, l_6, l_7, l_8, l_9, l_10, l_11, l_12, l_13, l_14, l_15, l_16, l_17;
    const activePatternResult = $007CPrimitiveType$007C_$007C(resolvedType);
    if (activePatternResult != null) {
        const typeInfo = activePatternResult;
        return typeInfo;
    }
    else {
        const activePatternResult_1 = $007CFuncType$007C_$007C(resolvedType);
        if (activePatternResult_1 != null) {
            const types = activePatternResult_1;
            return new TypeInfo(37, [(l = (new Lazy(() => map(createTypeInfo, types))), () => lazyToDelayed(l, void 0))]);
        }
        else {
            const activePatternResult_2 = $007CRecordType$007C_$007C(resolvedType);
            if (activePatternResult_2 != null) {
                const fields = activePatternResult_2;
                const l_1 = new Lazy(() => [toArray(delay(() => collect((matchValue) => singleton(new RecordField(matchValue[1], createTypeInfo(matchValue[2]), matchValue[0])), fields))), resolvedType]);
                return new TypeInfo(39, [() => lazyToDelayed(l_1, void 0)]);
            }
            else {
                const activePatternResult_3 = $007CUnionType$007C_$007C(resolvedType);
                if (activePatternResult_3 != null) {
                    const cases = activePatternResult_3;
                    const l_2 = new Lazy(() => [toArray(delay(() => collect((matchValue_1) => singleton(new UnionCase(matchValue_1[0], map(createTypeInfo, matchValue_1[2]), matchValue_1[1])), cases))), resolvedType]);
                    return new TypeInfo(40, [() => lazyToDelayed(l_2, void 0)]);
                }
                else {
                    const activePatternResult_4 = $007CEnumType$007C_$007C(resolvedType);
                    if (activePatternResult_4 != null) {
                        const elemType = activePatternResult_4;
                        return new TypeInfo(38, [(l_3 = (new Lazy(() => [createTypeInfo(elemType), resolvedType])), () => lazyToDelayed(l_3, void 0))]);
                    }
                    else {
                        const activePatternResult_5 = $007CListType$007C_$007C(resolvedType);
                        if (activePatternResult_5 != null) {
                            const elemType_1 = activePatternResult_5;
                            return new TypeInfo(28, [(l_4 = (new Lazy(() => createTypeInfo(elemType_1))), () => lazyToDelayed(l_4, void 0))]);
                        }
                        else {
                            const activePatternResult_6 = $007CResizeArrayType$007C_$007C(resolvedType);
                            if (activePatternResult_6 != null) {
                                const elemType_2 = activePatternResult_6;
                                return new TypeInfo(35, [(l_5 = (new Lazy(() => createTypeInfo(elemType_2))), () => lazyToDelayed(l_5, void 0))]);
                            }
                            else {
                                const activePatternResult_7 = $007CHashSetType$007C_$007C(resolvedType);
                                if (activePatternResult_7 != null) {
                                    const elemType_3 = activePatternResult_7;
                                    return new TypeInfo(36, [(l_6 = (new Lazy(() => createTypeInfo(elemType_3))), () => lazyToDelayed(l_6, void 0))]);
                                }
                                else {
                                    const activePatternResult_8 = $007CArrayType$007C_$007C(resolvedType);
                                    if (activePatternResult_8 != null) {
                                        const elemType_4 = activePatternResult_8;
                                        return new TypeInfo(30, [(l_7 = (new Lazy(() => createTypeInfo(elemType_4))), () => lazyToDelayed(l_7, void 0))]);
                                    }
                                    else {
                                        const activePatternResult_9 = $007CTupleType$007C_$007C(resolvedType);
                                        if (activePatternResult_9 != null) {
                                            const types_1 = activePatternResult_9;
                                            return new TypeInfo(32, [(l_8 = (new Lazy(() => map(createTypeInfo, types_1))), () => lazyToDelayed(l_8, void 0))]);
                                        }
                                        else {
                                            const activePatternResult_10 = $007COptionType$007C_$007C(resolvedType);
                                            if (activePatternResult_10 != null) {
                                                const elemType_5 = activePatternResult_10;
                                                return new TypeInfo(27, [(l_9 = (new Lazy(() => createTypeInfo(elemType_5))), () => lazyToDelayed(l_9, void 0))]);
                                            }
                                            else {
                                                const activePatternResult_11 = $007CNullable$007C_$007C(resolvedType);
                                                if (activePatternResult_11 != null) {
                                                    const elemType_6 = activePatternResult_11;
                                                    return new TypeInfo(27, [(l_10 = (new Lazy(() => createTypeInfo(elemType_6))), () => lazyToDelayed(l_10, void 0))]);
                                                }
                                                else {
                                                    const activePatternResult_12 = $007CSetType$007C_$007C(resolvedType);
                                                    if (activePatternResult_12 != null) {
                                                        const elemType_7 = activePatternResult_12;
                                                        return new TypeInfo(29, [(l_11 = (new Lazy(() => createTypeInfo(elemType_7))), () => lazyToDelayed(l_11, void 0))]);
                                                    }
                                                    else {
                                                        const activePatternResult_13 = $007CMapType$007C_$007C(resolvedType);
                                                        if (activePatternResult_13 != null) {
                                                            const keyType = activePatternResult_13[0];
                                                            const valueType = activePatternResult_13[1];
                                                            return new TypeInfo(33, [(l_12 = (new Lazy(() => [createTypeInfo(keyType), createTypeInfo(valueType)])), () => lazyToDelayed(l_12, void 0))]);
                                                        }
                                                        else {
                                                            const activePatternResult_14 = $007CDictionaryType$007C_$007C(resolvedType);
                                                            if (activePatternResult_14 != null) {
                                                                const keyType_1 = activePatternResult_14[0];
                                                                const valueType_1 = activePatternResult_14[1];
                                                                return new TypeInfo(34, [(l_13 = (new Lazy(() => [createTypeInfo(keyType_1), createTypeInfo(valueType_1), valueType_1])), () => lazyToDelayed(l_13, void 0))]);
                                                            }
                                                            else {
                                                                const activePatternResult_15 = $007CSeqType$007C_$007C(resolvedType);
                                                                if (activePatternResult_15 != null) {
                                                                    const elemType_8 = activePatternResult_15;
                                                                    return new TypeInfo(31, [(l_14 = (new Lazy(() => createTypeInfo(elemType_8))), () => lazyToDelayed(l_14, void 0))]);
                                                                }
                                                                else {
                                                                    const activePatternResult_16 = $007CAsyncType$007C_$007C(resolvedType);
                                                                    if (activePatternResult_16 != null) {
                                                                        const elemType_9 = activePatternResult_16;
                                                                        return new TypeInfo(25, [(l_15 = (new Lazy(() => createTypeInfo(elemType_9))), () => lazyToDelayed(l_15, void 0))]);
                                                                    }
                                                                    else {
                                                                        const activePatternResult_17 = $007CPromiseType$007C_$007C(resolvedType);
                                                                        if (activePatternResult_17 != null) {
                                                                            const elemType_10 = activePatternResult_17;
                                                                            return new TypeInfo(26, [(l_16 = (new Lazy(() => createTypeInfo(elemType_10))), () => lazyToDelayed(l_16, void 0))]);
                                                                        }
                                                                        else {
                                                                            return new TypeInfo(24, [(l_17 = (new Lazy(() => resolvedType)), () => lazyToDelayed(l_17, void 0))]);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

const typeInfoCache = new Dictionary([], {
    Equals: equals,
    GetHashCode: structuralHash,
});

export function createTypeInfo(resolvedType) {
    let matchValue;
    let outArg = defaultOf();
    matchValue = [tryGetValue(typeInfoCache, resolvedType, new FSharpRef(() => outArg, (v) => {
        outArg = v;
    })), outArg];
    if (matchValue[0]) {
        return matchValue[1];
    }
    else {
        const ti_1 = _createTypeInfo(resolvedType);
        if ((!isNullOrEmpty(fullName(resolvedType)) && !endsWith(fullName(resolvedType), "`1[]")) && !endsWith(fullName(resolvedType), "`2[]")) {
            typeInfoCache.set(resolvedType, ti_1);
            return ti_1;
        }
        else {
            return ti_1;
        }
    }
}

/**
 * returns whether a type is primitive
 */
export function isPrimitive(_arg) {
    switch (_arg.tag) {
        case 0:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 21:
        case 27:
            return true;
        default:
            return false;
    }
}

/**
 * returns whether the discrimiated union type is like a enum
 */
export function enumUnion(_arg) {
    if (_arg.tag === 40) {
        const array = _arg.fields[0]()[0];
        return array.every((case$) => (case$.CaseTypes.length === 0));
    }
    else {
        return false;
    }
}

