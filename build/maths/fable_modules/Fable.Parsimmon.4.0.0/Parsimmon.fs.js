import { Record } from "../fable-library.4.9.0/Types.js";
import { string_type, record_type, int32_type } from "../fable-library.4.9.0/Reflection.js";
import { some } from "../fable-library.4.9.0/Option.js";
import { seq, noneOf, optWhitespace, whitespace, oneOf, string, takeWhile, test, fail, all, any, digit, lookahead, succeed, eof, letters, letter, lazy, index } from "./Parsimmon.js";
import { join } from "../fable-library.4.9.0/String.js";
import { reduce } from "../fable-library.4.9.0/List.js";

export class TokenPosition extends Record {
    constructor(offset, line, column) {
        super();
        this.offset = (offset | 0);
        this.line = (line | 0);
        this.column = (column | 0);
    }
}

export function TokenPosition_$reflection() {
    return record_type("Fable.Parsimmon.TokenPosition", [], TokenPosition, () => [["offset", int32_type], ["line", int32_type], ["column", int32_type]]);
}

export class NodeResult$1 extends Record {
    constructor(name, value, start, end) {
        super();
        this.name = name;
        this.value = value;
        this.start = start;
        this.end = end;
    }
}

export function NodeResult$1_$reflection(gen0) {
    return record_type("Fable.Parsimmon.NodeResult`1", [gen0], NodeResult$1, () => [["name", string_type], ["value", gen0], ["start", TokenPosition_$reflection()], ["end", TokenPosition_$reflection()]]);
}

export function Parsimmon_parseRaw(input, parser) {
    return parser.parse(input);
}

export function Parsimmon_parse(input, parser) {
    const result = parser.parse(input);
    if (result.status) {
        return some(result.value);
    }
    else {
        return void 0;
    }
}

export const Parsimmon_index = index;

/**
 * Returns a new parser which tries parser, and if it fails uses otherParser. Example:
 */
export function Parsimmon_orTry(otherParser, parser) {
    return parser.or(otherParser);
}

/**
 * Returns a new parser that tries to parse the input exactly `n` times
 */
export function Parsimmon_times(n, parser) {
    return parser.times(n);
}

/**
 * Expects parser at least n times. Yields an array of the results.
 */
export function Parsimmon_atLeast(n, parser) {
    return parser.atLeast(n);
}

/**
 * Expects parser at most n times. Yields an array of the results.
 */
export function Parsimmon_atMost(n, parser) {
    return parser.atMost(n);
}

export function Parsimmon_skip(skipped, keep) {
    return keep.skip(skipped);
}

export function Parsimmon_many(parser) {
    return parser.many();
}

export const Parsimmon_ofLazy = lazy;

/**
 * This is the same as Parsimmon.sepBy, but matches the parser at least once.
 */
export function Parsimmon_seperateByAtLeastOne(seperator, parser) {
    return parser.sepBy1(seperator);
}

/**
 * Expects parser "after" to follow parser "before", and yields the result of "before".
 */
export function Parsimmon_chain(after, before) {
    return before.then(after);
}

/**
 * Returns a new parser which tries parser "p", and on success calls the function "f" with the result of the parse, which is expected to return another parser, which will be tried next. This allows you to dynamically decide how to continue the parse, which is impossible with the other combinators.
 */
export function Parsimmon_bind(f, p) {
    return p.chain(f);
}

export const Parsimmon_letter = letter;

/**
 * Returns a parser that tries `parser` and succeeds if `parser` is able to parse between `min` and `max` times
 */
export function Parsimmon_timesBetween(min, max, parser) {
    return parser.times(min, max);
}

export const Parsimmon_letters = letters;

export const Parsimmon_endOfFile = eof;

/**
 * Returns a parser that looks for anything but whatever "p" wants to parse, and does not consume it. Yields the same result as "before".
 */
export function Parsimmon_notFollowedBy(p, before) {
    return before.notFollowedBy(p);
}

export const Parsimmon_succeed = succeed;

export const Parsimmon_lookahead = lookahead;

export const Parsimmon_digit = digit;

export const Parsimmon_digits = Parsimmon_many(Parsimmon_digit);

/**
 * Returns a new parser which tries "parser" and, if it fails, yields value without consuming any input.
 */
export function Parsimmon_fallback(value, parser) {
    return parser.fallback(value);
}

export function Parsimmon_seperateBy(content, others) {
    return others.sepBy(content);
}

export function Parsimmon_between(left, right, middle) {
    return Parsimmon_skip(right, Parsimmon_chain(middle, left));
}

/**
 * Transforms the parsed value of the given parser.
 */
export function Parsimmon_map(f, parser) {
    return parser.map(f);
}

/**
 * Alias of Parsimmon.concat
 */
export function Parsimmon_tie(parser) {
    return Parsimmon_map((strings) => join("", strings), parser);
}

export const Parsimmon_any = any;

/**
 * Accepts any number of parsers, yielding the value of the first one that succeeds, backtracking in between.
 */
export function Parsimmon_choose(ps) {
    return reduce((acc, parser) => (acc.or(parser)), ps);
}

export const Parsimmon_all = all;

export const Parsimmon_fail = fail;

export const Parsimmon_satisfy = test;

export const Parsimmon_takeWhile = takeWhile;

export const Parsimmon_str = string;

export const Parsimmon_oneOf = oneOf;

export const Parsimmon_whitespace = whitespace;

export const Parsimmon_optionalWhitespace = optWhitespace;

/**
 * Returns a parser that succeeds one or more times
 */
export function Parsimmon_atLeastOneOrMany(parser) {
    return Parsimmon_atLeast(1, parser);
}

export function Parsimmon_stringReturn(input, value) {
    return Parsimmon_map((_arg) => value, Parsimmon_str(input));
}

export const Parsimmon_noneOf = noneOf;

export const Parsimmon_seq2 = seq;

export function Parsimmon_trim(trimmed, p) {
    return p.trim(trimmed);
}

/**
 * Equivalent to `parser.map (String.concat "")`
 */
export function Parsimmon_concat(parser) {
    return parser.map((strings) => join("", strings));
}

export const Parsimmon_seq3 = seq;

export const Parsimmon_seq4 = seq;

export const Parsimmon_seq5 = seq;

/**
 * Equivalent to `parser.node("description")`
 */
export function Parsimmon_node(description, p) {
    return p.node(description);
}

