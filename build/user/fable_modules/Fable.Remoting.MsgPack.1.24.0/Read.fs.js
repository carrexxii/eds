import { isEnum, int8_type, uint16_type, uint32_type, bigint_type, array_type, uint8_type, fullName, decimal_type, int16_type, int64_type, getTupleElements, makeTuple, isTuple, getElementType, isArray, list_type, option_type, isGenericType, makeUnion, getUnionCaseFields, getUnionCases, int32_type, isUnion, getRecordElements, makeRecord, isRecord, obj_type, getGenericTypeDefinition, equals, name, getGenerics, class_type } from "../fable-library.4.9.0/Reflection.js";
import { get_UTF8 } from "../fable-library.4.9.0/Encoding.js";
import { fromUInt64, fromUInt32, fromUInt16, fromInt16, fromInt32, toFloat64, toInt8, toUInt8, toUInt16, toUInt32, toInt16, toInt32, fromInt8, fromUInt8, toInt64 as toInt64_1, fromByteArray, equals as equals_2, fromInt64, toUInt64 } from "../fable-library.4.9.0/BigInt.js";
import { isLittleEndian, toDouble, toSingle, toInt64 } from "../fable-library.4.9.0/BitConverter.js";
import { printf, toFail } from "../fable-library.4.9.0/String.js";
import { head, find, map, fill } from "../fable-library.4.9.0/Array.js";
import { Dictionary } from "../fable-library.4.9.0/MutableMap.js";
import { defaultOf, compare, structuralHash, equals as equals_1 } from "../fable-library.4.9.0/Util.js";
import { addToDict } from "../fable-library.4.9.0/MapUtil.js";
import { ofArray } from "../fable-library.4.9.0/Map.js";
import { FSharpSet__Add, empty } from "../fable-library.4.9.0/Set.js";
import { some } from "../fable-library.4.9.0/Option.js";
import { singleton, collect, delay, toList } from "../fable-library.4.9.0/Seq.js";
import { rangeDouble } from "../fable-library.4.9.0/Range.js";
import { fromTicks } from "../fable-library.4.9.0/Date.js";
import { fromTicks as fromTicks_1 } from "../fable-library.4.9.0/DateOffset.js";
import { fromTicks as fromTicks_2, fromMinutes } from "../fable-library.4.9.0/TimeSpan.js";
import { fromIntArray } from "../fable-library.4.9.0/Decimal.js";
import { arrayToGuid } from "../fable-library.4.9.0/Guid.js";
import { fromDayNumber } from "../fable-library.4.9.0/DateOnly.js";
import { fromTicks as fromTicks_3 } from "../fable-library.4.9.0/TimeOnly.js";

export function interpretStringAs(typ, str) {
    return str;
}

export class Reader {
    constructor(data) {
        this.data = data;
        this.pos = 0;
        this.numberBuffer = (new Uint8Array(8));
    }
}

export function Reader_$reflection() {
    return class_type("Fable.Remoting.MsgPack.Read.Reader", void 0, Reader);
}

export function Reader_$ctor_Z3F6BC7B1(data) {
    return new Reader(data);
}

export function Reader__ReadByte(_) {
    _.pos = ((_.pos + 1) | 0);
    return _.data[_.pos - 1];
}

export function Reader__ReadRawBin_Z524259A4(_, len) {
    _.pos = ((_.pos + len) | 0);
    return _.data.slice(_.pos - len, (_.pos - 1) + 1);
}

export function Reader__ReadString_Z524259A4(_, len) {
    _.pos = ((_.pos + len) | 0);
    return get_UTF8().getString(_.data, _.pos - len, len);
}

export function Reader__ReadUInt8(x) {
    return Reader__ReadByte(x);
}

export function Reader__ReadInt8(x) {
    const value = Reader__ReadByte(x);
    return ((value + 0x80 & 0xFF) - 0x80) | 0;
}

export function Reader__ReadUInt16(x) {
    const value = Reader__ReadInt16(x) | 0;
    return value & 0xFFFF;
}

export function Reader__ReadInt16(_) {
    _.pos = ((_.pos + 2) | 0);
    return ((((_.data[_.pos - 2] + 0x8000 & 0xFFFF) - 0x8000) << 8) | ((_.data[_.pos - 1] + 0x8000 & 0xFFFF) - 0x8000)) | 0;
}

export function Reader__ReadUInt32(x) {
    const value = Reader__ReadInt32(x) | 0;
    return value >>> 0;
}

export function Reader__ReadInt32(_) {
    _.pos = ((_.pos + 4) | 0);
    return ((((~~_.data[_.pos - 4] << 24) | (~~_.data[_.pos - 3] << 16)) | (~~_.data[_.pos - 2] << 8)) | ~~_.data[_.pos - 1]) | 0;
}

export function Reader__ReadUInt64(x) {
    return toUInt64(fromInt64(Reader__ReadInt64(x)));
}

export function Reader__ReadInt64(_) {
    return Reader__readNumber(_, 8, (tupledArg) => toInt64(tupledArg[0], tupledArg[1]));
}

export function Reader__ReadFloat32(x) {
    return Reader__readNumber(x, 4, (tupledArg) => toSingle(tupledArg[0], tupledArg[1]));
}

export function Reader__ReadFloat64(x) {
    return Reader__readNumber(x, 8, (tupledArg) => toDouble(tupledArg[0], tupledArg[1]));
}

export function Reader__ReadMap_412036CA(x, len, t) {
    const args = getGenerics(t);
    if (args.length !== 2) {
        const arg = name(t);
        toFail(printf("Expecting %s, but the data contains a map."))(arg);
    }
    let pairs;
    const arr = fill(new Array(len), 0, len, null);
    for (let i = 0; i <= (len - 1); i++) {
        arr[i] = [Reader__Read_24524716(x, args[0]), Reader__Read_24524716(x, args[1])];
    }
    pairs = arr;
    if (equals(getGenericTypeDefinition(t), class_type("System.Collections.Generic.Dictionary`2", [obj_type, obj_type]))) {
        const dict = new Dictionary([], {
            Equals: equals_1,
            GetHashCode: structuralHash,
        });
        pairs.forEach((tupledArg) => {
            addToDict(dict, tupledArg[0], tupledArg[1]);
        });
        return dict;
    }
    else {
        return ofArray(pairs, {
            Compare: compare,
        });
    }
}

export function Reader__ReadSet_412036CA(x, len, t) {
    const args = getGenerics(t);
    if (args.length !== 1) {
        const arg = name(t);
        toFail(printf("Expecting %s, but the data contains a set."))(arg);
    }
    let set$ = empty({
        Compare: compare,
    });
    for (let forLoopVar = 0; forLoopVar <= (len - 1); forLoopVar++) {
        set$ = FSharpSet__Add(set$, Reader__Read_24524716(x, args[0]));
    }
    return set$;
}

export function Reader__ReadRawArray_412036CA(x, len, elementType) {
    const arr = fill(new Array(len), 0, len, null);
    for (let i = 0; i <= (len - 1); i++) {
        arr[i] = Reader__Read_24524716(x, elementType);
    }
    return arr;
}

export function Reader__ReadArray_412036CA(x, len, t) {
    if (isRecord(t)) {
        return makeRecord(t, map((prop) => Reader__Read_24524716(x, prop[1]), getRecordElements(t)));
    }
    else if (isUnion(t, true)) {
        const tag = Reader__Read_24524716(x, int32_type) | 0;
        const case$ = find((x_1) => (x_1.tag === tag), getUnionCases(t, true));
        const fieldTypes = map((x_2) => x_2[1], getUnionCaseFields(case$));
        return makeUnion(case$, (fieldTypes.length === 1) ? [Reader__Read_24524716(x, fieldTypes[0])] : ((fieldTypes.length === 0) ? [] : ((void Reader__ReadByte(x), map((t_1) => Reader__Read_24524716(x, t_1), fieldTypes)))), true);
    }
    else if (isGenericType(t) && equals(getGenericTypeDefinition(t), option_type(obj_type))) {
        if (Reader__ReadByte(x) === 0) {
            return defaultOf();
        }
        else {
            return some(Reader__Read_24524716(x, head(getGenerics(t))));
        }
    }
    else if (isGenericType(t) && equals(getGenericTypeDefinition(t), list_type(obj_type))) {
        const elementType = head(getGenerics(t));
        return toList(delay(() => collect((matchValue) => singleton(Reader__Read_24524716(x, elementType)), rangeDouble(0, 1, len - 1))));
    }
    else if (isArray(t)) {
        return Reader__ReadRawArray_412036CA(x, len, getElementType(t));
    }
    else if (isTuple(t)) {
        return makeTuple(map((t_2) => Reader__Read_24524716(x, t_2), getTupleElements(t)), t);
    }
    else if (equals(t, class_type("System.DateTime"))) {
        const dateTimeTicks = Reader__Read_24524716(x, int64_type);
        const kindAsInt = Reader__Read_24524716(x, int64_type);
        return fromTicks(dateTimeTicks, equals_2(kindAsInt, 1n) ? 1 : (equals_2(kindAsInt, 2n) ? 2 : 0));
    }
    else if (equals(t, class_type("System.DateTimeOffset"))) {
        return fromTicks_1(Reader__Read_24524716(x, int64_type), fromMinutes(Reader__Read_24524716(x, int16_type)));
    }
    else if (isGenericType(t) && equals(getGenericTypeDefinition(t), class_type("Microsoft.FSharp.Collections.FSharpSet`1", [obj_type]))) {
        return Reader__ReadSet_412036CA(x, len, t);
    }
    else if (equals(t, decimal_type) ? true : (fullName(t) === "Microsoft.FSharp.Core.decimal`1")) {
        return fromIntArray(Reader__ReadRawArray_412036CA(x, 4, int32_type));
    }
    else {
        const arg = name(t);
        const arg_1 = x.pos | 0;
        return toFail(printf("Expecting %s at position %d, but the data contains an array."))(arg)(arg_1);
    }
}

export function Reader__ReadBin_412036CA(x, len, t) {
    if (equals(t, class_type("System.Guid"))) {
        return arrayToGuid(Reader__ReadRawBin_Z524259A4(x, len));
    }
    else if (equals(t, array_type(uint8_type))) {
        return Reader__ReadRawBin_Z524259A4(x, len);
    }
    else if (equals(t, bigint_type)) {
        return fromByteArray(Reader__ReadRawBin_Z524259A4(x, len));
    }
    else {
        const arg = name(t);
        const arg_1 = x.pos | 0;
        return toFail(printf("Expecting %s at position %d, but the data contains bin."))(arg)(arg_1);
    }
}

export function Reader__Read_24524716(x, t) {
    const matchValue = Reader__ReadByte(x);
    let matchResult, b_58, b_59, b_60, b_61;
    if ((matchValue | 31) === 191) {
        matchResult = 0;
    }
    else {
        switch (matchValue) {
            case 192: {
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else {
                    matchResult = 16;
                }
                break;
            }
            case 194: {
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else {
                    matchResult = 18;
                }
                break;
            }
            case 195: {
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else {
                    matchResult = 17;
                }
                break;
            }
            case 196: {
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else if ((matchValue | 15) === 159) {
                    matchResult = 19;
                    b_60 = matchValue;
                }
                else if ((matchValue | 15) === 143) {
                    matchResult = 22;
                    b_61 = matchValue;
                }
                else {
                    matchResult = 25;
                }
                break;
            }
            case 197: {
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else if ((matchValue | 15) === 159) {
                    matchResult = 19;
                    b_60 = matchValue;
                }
                else if ((matchValue | 15) === 143) {
                    matchResult = 22;
                    b_61 = matchValue;
                }
                else {
                    matchResult = 26;
                }
                break;
            }
            case 198: {
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else if ((matchValue | 15) === 159) {
                    matchResult = 19;
                    b_60 = matchValue;
                }
                else if ((matchValue | 15) === 143) {
                    matchResult = 22;
                    b_61 = matchValue;
                }
                else {
                    matchResult = 27;
                }
                break;
            }
            case 202: {
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else {
                    matchResult = 14;
                }
                break;
            }
            case 203: {
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else {
                    matchResult = 15;
                }
                break;
            }
            case 204: {
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else {
                    matchResult = 10;
                }
                break;
            }
            case 205: {
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else {
                    matchResult = 11;
                }
                break;
            }
            case 206: {
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else {
                    matchResult = 12;
                }
                break;
            }
            case 207: {
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else {
                    matchResult = 13;
                }
                break;
            }
            case 208: {
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else {
                    matchResult = 9;
                }
                break;
            }
            case 209: {
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else {
                    matchResult = 8;
                }
                break;
            }
            case 210: {
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else {
                    matchResult = 7;
                }
                break;
            }
            case 211: {
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else {
                    matchResult = 6;
                }
                break;
            }
            case 217: {
                matchResult = 1;
                break;
            }
            case 218: {
                matchResult = 2;
                break;
            }
            case 219: {
                matchResult = 3;
                break;
            }
            case 220: {
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else if ((matchValue | 15) === 159) {
                    matchResult = 19;
                    b_60 = matchValue;
                }
                else {
                    matchResult = 20;
                }
                break;
            }
            case 221: {
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else if ((matchValue | 15) === 159) {
                    matchResult = 19;
                    b_60 = matchValue;
                }
                else {
                    matchResult = 21;
                }
                break;
            }
            case 222: {
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else if ((matchValue | 15) === 159) {
                    matchResult = 19;
                    b_60 = matchValue;
                }
                else if ((matchValue | 15) === 143) {
                    matchResult = 22;
                    b_61 = matchValue;
                }
                else {
                    matchResult = 23;
                }
                break;
            }
            case 223: {
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else if ((matchValue | 15) === 159) {
                    matchResult = 19;
                    b_60 = matchValue;
                }
                else if ((matchValue | 15) === 143) {
                    matchResult = 22;
                    b_61 = matchValue;
                }
                else {
                    matchResult = 24;
                }
                break;
            }
            default:
                if ((matchValue | 127) === 127) {
                    matchResult = 4;
                    b_58 = matchValue;
                }
                else if ((matchValue | 31) === 255) {
                    matchResult = 5;
                    b_59 = matchValue;
                }
                else if ((matchValue | 15) === 159) {
                    matchResult = 19;
                    b_60 = matchValue;
                }
                else if ((matchValue | 15) === 143) {
                    matchResult = 22;
                    b_61 = matchValue;
                }
                else {
                    matchResult = 28;
                }
        }
    }
    switch (matchResult) {
        case 0:
            return interpretStringAs(t, Reader__ReadString_Z524259A4(x, ~~(matchValue & 31)));
        case 1:
            return interpretStringAs(t, Reader__ReadString_Z524259A4(x, ~~Reader__ReadByte(x)));
        case 2:
            return interpretStringAs(t, Reader__ReadString_Z524259A4(x, ~~Reader__ReadUInt16(x)));
        case 3:
            return interpretStringAs(t, Reader__ReadString_Z524259A4(x, ~~Reader__ReadUInt32(x)));
        case 4: {
            const typ = t;
            const n = b_58;
            if (typ === int32_type) {
                return ~~n;
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return toInt64_1(fromUInt8(n));
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return toUInt64(fromUInt8(n));
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else {
                    switch (typeName) {
                        case "System.TimeSpan":
                            return fromTicks_2(toInt64_1(fromUInt8(n)));
                        case "System.DateOnly":
                            return fromDayNumber(~~n);
                        case "System.TimeOnly":
                            return fromTicks_3(toInt64_1(fromUInt8(n)));
                        case "Microsoft.FSharp.Core.int16`1":
                            return (n + 0x8000 & 0xFFFF) - 0x8000;
                        case "Microsoft.FSharp.Core.int32`1":
                            return ~~n;
                        case "Microsoft.FSharp.Core.int64`1":
                            return toInt64_1(fromUInt8(n));
                        default:
                            if (typ === uint8_type) {
                                return n;
                            }
                            else if (typ === int8_type) {
                                return (n + 0x80 & 0xFF) - 0x80;
                            }
                            else if (isEnum(typ)) {
                                return n;
                            }
                            else {
                                const arg_1 = name(typ);
                                return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1);
                            }
                    }
                }
            }
        }
        case 5: {
            const typ_1 = t;
            const n_2 = ((b_59 + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return toInt64_1(fromInt8(n_2));
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return toUInt64(fromInt8(n_2));
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else {
                    switch (typeName_1) {
                        case "System.TimeSpan":
                            return fromTicks_2(toInt64_1(fromInt8(n_2)));
                        case "System.DateOnly":
                            return fromDayNumber(n_2);
                        case "System.TimeOnly":
                            return fromTicks_3(toInt64_1(fromInt8(n_2)));
                        case "Microsoft.FSharp.Core.int16`1":
                            return n_2;
                        case "Microsoft.FSharp.Core.int32`1":
                            return n_2;
                        case "Microsoft.FSharp.Core.int64`1":
                            return toInt64_1(fromInt8(n_2));
                        default:
                            if (typ_1 === uint8_type) {
                                return n_2 & 0xFF;
                            }
                            else if (typ_1 === int8_type) {
                                return n_2;
                            }
                            else if (isEnum(typ_1)) {
                                return n_2;
                            }
                            else {
                                const arg_1_1 = name(typ_1);
                                return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_1);
                            }
                    }
                }
            }
        }
        case 6: {
            const typ_2 = t;
            const n_4 = Reader__ReadInt64(x);
            if (typ_2 === int32_type) {
                return ~~toInt32(n_4);
            }
            else {
                const typeName_2 = fullName(typ_2);
                if (typeName_2 === "System.Int64") {
                    return toInt64_1(fromInt64(n_4));
                }
                else if (typ_2 === int16_type) {
                    return (toInt16(n_4) + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ_2 === uint32_type) {
                    return toUInt32(n_4) >>> 0;
                }
                else if (typeName_2 === "System.UInt64") {
                    return toUInt64(fromInt64(n_4));
                }
                else if (typ_2 === uint16_type) {
                    return toUInt16(n_4) & 0xFFFF;
                }
                else {
                    switch (typeName_2) {
                        case "System.TimeSpan":
                            return fromTicks_2(toInt64_1(fromInt64(n_4)));
                        case "System.DateOnly":
                            return fromDayNumber(~~toInt32(n_4));
                        case "System.TimeOnly":
                            return fromTicks_3(toInt64_1(fromInt64(n_4)));
                        case "Microsoft.FSharp.Core.int16`1":
                            return (toInt16(n_4) + 0x8000 & 0xFFFF) - 0x8000;
                        case "Microsoft.FSharp.Core.int32`1":
                            return ~~toInt32(n_4);
                        case "Microsoft.FSharp.Core.int64`1":
                            return toInt64_1(fromInt64(n_4));
                        default:
                            if (typ_2 === uint8_type) {
                                return toUInt8(n_4) & 0xFF;
                            }
                            else if (typ_2 === int8_type) {
                                return (toInt8(n_4) + 0x80 & 0xFF) - 0x80;
                            }
                            else if (isEnum(typ_2)) {
                                return toFloat64(n_4);
                            }
                            else {
                                const arg_1_2 = name(typ_2);
                                return toFail(printf("Cannot interpret integer %A as %s."))(n_4)(arg_1_2);
                            }
                    }
                }
            }
        }
        case 7: {
            const typ_3 = t;
            const n_6 = Reader__ReadInt32(x) | 0;
            if (typ_3 === int32_type) {
                return n_6;
            }
            else {
                const typeName_3 = fullName(typ_3);
                if (typeName_3 === "System.Int64") {
                    return toInt64_1(fromInt32(n_6));
                }
                else if (typ_3 === int16_type) {
                    return (n_6 + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ_3 === uint32_type) {
                    return n_6 >>> 0;
                }
                else if (typeName_3 === "System.UInt64") {
                    return toUInt64(fromInt32(n_6));
                }
                else if (typ_3 === uint16_type) {
                    return n_6 & 0xFFFF;
                }
                else {
                    switch (typeName_3) {
                        case "System.TimeSpan":
                            return fromTicks_2(toInt64_1(fromInt32(n_6)));
                        case "System.DateOnly":
                            return fromDayNumber(n_6);
                        case "System.TimeOnly":
                            return fromTicks_3(toInt64_1(fromInt32(n_6)));
                        case "Microsoft.FSharp.Core.int16`1":
                            return (n_6 + 0x8000 & 0xFFFF) - 0x8000;
                        case "Microsoft.FSharp.Core.int32`1":
                            return n_6;
                        case "Microsoft.FSharp.Core.int64`1":
                            return toInt64_1(fromInt32(n_6));
                        default:
                            if (typ_3 === uint8_type) {
                                return n_6 & 0xFF;
                            }
                            else if (typ_3 === int8_type) {
                                return (n_6 + 0x80 & 0xFF) - 0x80;
                            }
                            else if (isEnum(typ_3)) {
                                return n_6;
                            }
                            else {
                                const arg_1_3 = name(typ_3);
                                return toFail(printf("Cannot interpret integer %A as %s."))(n_6)(arg_1_3);
                            }
                    }
                }
            }
        }
        case 8: {
            const typ_4 = t;
            const n_8 = Reader__ReadInt16(x) | 0;
            if (typ_4 === int32_type) {
                return n_8;
            }
            else {
                const typeName_4 = fullName(typ_4);
                if (typeName_4 === "System.Int64") {
                    return toInt64_1(fromInt16(n_8));
                }
                else if (typ_4 === int16_type) {
                    return n_8;
                }
                else if (typ_4 === uint32_type) {
                    return n_8 >>> 0;
                }
                else if (typeName_4 === "System.UInt64") {
                    return toUInt64(fromInt16(n_8));
                }
                else if (typ_4 === uint16_type) {
                    return n_8 & 0xFFFF;
                }
                else {
                    switch (typeName_4) {
                        case "System.TimeSpan":
                            return fromTicks_2(toInt64_1(fromInt16(n_8)));
                        case "System.DateOnly":
                            return fromDayNumber(n_8);
                        case "System.TimeOnly":
                            return fromTicks_3(toInt64_1(fromInt16(n_8)));
                        case "Microsoft.FSharp.Core.int16`1":
                            return n_8;
                        case "Microsoft.FSharp.Core.int32`1":
                            return n_8;
                        case "Microsoft.FSharp.Core.int64`1":
                            return toInt64_1(fromInt16(n_8));
                        default:
                            if (typ_4 === uint8_type) {
                                return n_8 & 0xFF;
                            }
                            else if (typ_4 === int8_type) {
                                return (n_8 + 0x80 & 0xFF) - 0x80;
                            }
                            else if (isEnum(typ_4)) {
                                return n_8;
                            }
                            else {
                                const arg_1_4 = name(typ_4);
                                return toFail(printf("Cannot interpret integer %A as %s."))(n_8)(arg_1_4);
                            }
                    }
                }
            }
        }
        case 9: {
            const typ_5 = t;
            const n_10 = Reader__ReadInt8(x) | 0;
            if (typ_5 === int32_type) {
                return n_10;
            }
            else {
                const typeName_5 = fullName(typ_5);
                if (typeName_5 === "System.Int64") {
                    return toInt64_1(fromInt8(n_10));
                }
                else if (typ_5 === int16_type) {
                    return n_10;
                }
                else if (typ_5 === uint32_type) {
                    return n_10 >>> 0;
                }
                else if (typeName_5 === "System.UInt64") {
                    return toUInt64(fromInt8(n_10));
                }
                else if (typ_5 === uint16_type) {
                    return n_10 & 0xFFFF;
                }
                else {
                    switch (typeName_5) {
                        case "System.TimeSpan":
                            return fromTicks_2(toInt64_1(fromInt8(n_10)));
                        case "System.DateOnly":
                            return fromDayNumber(n_10);
                        case "System.TimeOnly":
                            return fromTicks_3(toInt64_1(fromInt8(n_10)));
                        case "Microsoft.FSharp.Core.int16`1":
                            return n_10;
                        case "Microsoft.FSharp.Core.int32`1":
                            return n_10;
                        case "Microsoft.FSharp.Core.int64`1":
                            return toInt64_1(fromInt8(n_10));
                        default:
                            if (typ_5 === uint8_type) {
                                return n_10 & 0xFF;
                            }
                            else if (typ_5 === int8_type) {
                                return n_10;
                            }
                            else if (isEnum(typ_5)) {
                                return n_10;
                            }
                            else {
                                const arg_1_5 = name(typ_5);
                                return toFail(printf("Cannot interpret integer %A as %s."))(n_10)(arg_1_5);
                            }
                    }
                }
            }
        }
        case 10: {
            const typ_6 = t;
            const n_12 = Reader__ReadUInt8(x);
            if (typ_6 === int32_type) {
                return ~~n_12;
            }
            else {
                const typeName_6 = fullName(typ_6);
                if (typeName_6 === "System.Int64") {
                    return toInt64_1(fromUInt8(n_12));
                }
                else if (typ_6 === int16_type) {
                    return (n_12 + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ_6 === uint32_type) {
                    return n_12;
                }
                else if (typeName_6 === "System.UInt64") {
                    return toUInt64(fromUInt8(n_12));
                }
                else if (typ_6 === uint16_type) {
                    return n_12;
                }
                else {
                    switch (typeName_6) {
                        case "System.TimeSpan":
                            return fromTicks_2(toInt64_1(fromUInt8(n_12)));
                        case "System.DateOnly":
                            return fromDayNumber(~~n_12);
                        case "System.TimeOnly":
                            return fromTicks_3(toInt64_1(fromUInt8(n_12)));
                        case "Microsoft.FSharp.Core.int16`1":
                            return (n_12 + 0x8000 & 0xFFFF) - 0x8000;
                        case "Microsoft.FSharp.Core.int32`1":
                            return ~~n_12;
                        case "Microsoft.FSharp.Core.int64`1":
                            return toInt64_1(fromUInt8(n_12));
                        default:
                            if (typ_6 === uint8_type) {
                                return n_12;
                            }
                            else if (typ_6 === int8_type) {
                                return (n_12 + 0x80 & 0xFF) - 0x80;
                            }
                            else if (isEnum(typ_6)) {
                                return n_12;
                            }
                            else {
                                const arg_1_6 = name(typ_6);
                                return toFail(printf("Cannot interpret integer %A as %s."))(n_12)(arg_1_6);
                            }
                    }
                }
            }
        }
        case 11: {
            const typ_7 = t;
            const n_14 = Reader__ReadUInt16(x);
            if (typ_7 === int32_type) {
                return ~~n_14;
            }
            else {
                const typeName_7 = fullName(typ_7);
                if (typeName_7 === "System.Int64") {
                    return toInt64_1(fromUInt16(n_14));
                }
                else if (typ_7 === int16_type) {
                    return (n_14 + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ_7 === uint32_type) {
                    return n_14;
                }
                else if (typeName_7 === "System.UInt64") {
                    return toUInt64(fromUInt16(n_14));
                }
                else if (typ_7 === uint16_type) {
                    return n_14;
                }
                else {
                    switch (typeName_7) {
                        case "System.TimeSpan":
                            return fromTicks_2(toInt64_1(fromUInt16(n_14)));
                        case "System.DateOnly":
                            return fromDayNumber(~~n_14);
                        case "System.TimeOnly":
                            return fromTicks_3(toInt64_1(fromUInt16(n_14)));
                        case "Microsoft.FSharp.Core.int16`1":
                            return (n_14 + 0x8000 & 0xFFFF) - 0x8000;
                        case "Microsoft.FSharp.Core.int32`1":
                            return ~~n_14;
                        case "Microsoft.FSharp.Core.int64`1":
                            return toInt64_1(fromUInt16(n_14));
                        default:
                            if (typ_7 === uint8_type) {
                                return n_14 & 0xFF;
                            }
                            else if (typ_7 === int8_type) {
                                return (n_14 + 0x80 & 0xFF) - 0x80;
                            }
                            else if (isEnum(typ_7)) {
                                return n_14;
                            }
                            else {
                                const arg_1_7 = name(typ_7);
                                return toFail(printf("Cannot interpret integer %A as %s."))(n_14)(arg_1_7);
                            }
                    }
                }
            }
        }
        case 12: {
            const typ_8 = t;
            const n_16 = Reader__ReadUInt32(x);
            if (typ_8 === int32_type) {
                return ~~n_16;
            }
            else {
                const typeName_8 = fullName(typ_8);
                if (typeName_8 === "System.Int64") {
                    return toInt64_1(fromUInt32(n_16));
                }
                else if (typ_8 === int16_type) {
                    return (n_16 + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ_8 === uint32_type) {
                    return n_16;
                }
                else if (typeName_8 === "System.UInt64") {
                    return toUInt64(fromUInt32(n_16));
                }
                else if (typ_8 === uint16_type) {
                    return n_16 & 0xFFFF;
                }
                else {
                    switch (typeName_8) {
                        case "System.TimeSpan":
                            return fromTicks_2(toInt64_1(fromUInt32(n_16)));
                        case "System.DateOnly":
                            return fromDayNumber(~~n_16);
                        case "System.TimeOnly":
                            return fromTicks_3(toInt64_1(fromUInt32(n_16)));
                        case "Microsoft.FSharp.Core.int16`1":
                            return (n_16 + 0x8000 & 0xFFFF) - 0x8000;
                        case "Microsoft.FSharp.Core.int32`1":
                            return ~~n_16;
                        case "Microsoft.FSharp.Core.int64`1":
                            return toInt64_1(fromUInt32(n_16));
                        default:
                            if (typ_8 === uint8_type) {
                                return n_16 & 0xFF;
                            }
                            else if (typ_8 === int8_type) {
                                return (n_16 + 0x80 & 0xFF) - 0x80;
                            }
                            else if (isEnum(typ_8)) {
                                return n_16;
                            }
                            else {
                                const arg_1_8 = name(typ_8);
                                return toFail(printf("Cannot interpret integer %A as %s."))(n_16)(arg_1_8);
                            }
                    }
                }
            }
        }
        case 13: {
            const typ_9 = t;
            const n_18 = Reader__ReadUInt64(x);
            if (typ_9 === int32_type) {
                return ~~toInt32(n_18);
            }
            else {
                const typeName_9 = fullName(typ_9);
                if (typeName_9 === "System.Int64") {
                    return toInt64_1(fromUInt64(n_18));
                }
                else if (typ_9 === int16_type) {
                    return (toInt16(n_18) + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ_9 === uint32_type) {
                    return toUInt32(n_18) >>> 0;
                }
                else if (typeName_9 === "System.UInt64") {
                    return toUInt64(fromUInt64(n_18));
                }
                else if (typ_9 === uint16_type) {
                    return toUInt16(n_18) & 0xFFFF;
                }
                else {
                    switch (typeName_9) {
                        case "System.TimeSpan":
                            return fromTicks_2(toInt64_1(fromUInt64(n_18)));
                        case "System.DateOnly":
                            return fromDayNumber(~~toInt32(n_18));
                        case "System.TimeOnly":
                            return fromTicks_3(toInt64_1(fromUInt64(n_18)));
                        case "Microsoft.FSharp.Core.int16`1":
                            return (toInt16(n_18) + 0x8000 & 0xFFFF) - 0x8000;
                        case "Microsoft.FSharp.Core.int32`1":
                            return ~~toInt32(n_18);
                        case "Microsoft.FSharp.Core.int64`1":
                            return toInt64_1(fromUInt64(n_18));
                        default:
                            if (typ_9 === uint8_type) {
                                return toUInt8(n_18) & 0xFF;
                            }
                            else if (typ_9 === int8_type) {
                                return (toInt8(n_18) + 0x80 & 0xFF) - 0x80;
                            }
                            else if (isEnum(typ_9)) {
                                return toFloat64(n_18);
                            }
                            else {
                                const arg_1_9 = name(typ_9);
                                return toFail(printf("Cannot interpret integer %A as %s."))(n_18)(arg_1_9);
                            }
                    }
                }
            }
        }
        case 14:
            return Reader__ReadFloat32(x);
        case 15:
            return Reader__ReadFloat64(x);
        case 16:
            return defaultOf();
        case 17:
            return true;
        case 18:
            return false;
        case 19:
            return Reader__ReadArray_412036CA(x, ~~(b_60 & 15), t);
        case 20:
            return Reader__ReadArray_412036CA(x, ~~Reader__ReadUInt16(x), t);
        case 21:
            return Reader__ReadArray_412036CA(x, ~~Reader__ReadUInt32(x), t);
        case 22:
            return Reader__ReadMap_412036CA(x, ~~(b_61 & 15), t);
        case 23:
            return Reader__ReadMap_412036CA(x, ~~Reader__ReadUInt16(x), t);
        case 24:
            return Reader__ReadMap_412036CA(x, ~~Reader__ReadUInt32(x), t);
        case 25:
            return Reader__ReadBin_412036CA(x, ~~Reader__ReadByte(x), t);
        case 26:
            return Reader__ReadBin_412036CA(x, ~~Reader__ReadUInt16(x), t);
        case 27:
            return Reader__ReadBin_412036CA(x, ~~Reader__ReadUInt32(x), t);
        default: {
            const arg_11 = x.pos | 0;
            const arg_13 = name(t);
            return toFail(printf("Position %d, byte %d, expected type %s."))(arg_11)(matchValue)(arg_13);
        }
    }
}

export function Reader__readNumber(this$, len, bytesInterpretation) {
    this$.pos = ((this$.pos + len) | 0);
    if (isLittleEndian()) {
        for (let i = 0; i <= (len - 1); i++) {
            this$.numberBuffer[i] = this$.data[(this$.pos - 1) - i];
        }
        return bytesInterpretation([this$.numberBuffer, 0]);
    }
    else {
        return bytesInterpretation([this$.data, this$.pos - len]);
    }
}

