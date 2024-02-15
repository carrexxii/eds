import { createElement } from "react";
import React from "react";
import { Heading, Article } from "./shared/components.js";
import { tail, head, isEmpty, singleton } from "./fable_modules/fable-library.4.9.0/List.js";

export function Index() {
    return Article(singleton(Heading("Linear Algebra")));
}

export function Vectors() {
    return Article(singleton(Heading("Vectors")));
}

export function Matrices() {
    return Article(singleton(Heading("Matrices")));
}

export function view(url) {
    let matchResult, url_1;
    if (!isEmpty(url)) {
        switch (head(url)) {
            case "vectors": {
                if (isEmpty(tail(url))) {
                    matchResult = 1;
                }
                else {
                    matchResult = 3;
                    url_1 = url;
                }
                break;
            }
            case "matrices": {
                if (isEmpty(tail(url))) {
                    matchResult = 2;
                }
                else {
                    matchResult = 3;
                    url_1 = url;
                }
                break;
            }
            default: {
                matchResult = 3;
                url_1 = url;
            }
        }
    }
    else {
        matchResult = 0;
    }
    switch (matchResult) {
        case 0:
            return createElement(Index, null);
        case 1:
            return createElement(Vectors, null);
        case 2:
            return createElement(Matrices, null);
        default:
            return Heading(`Page not found: '${url_1}'`);
    }
}

