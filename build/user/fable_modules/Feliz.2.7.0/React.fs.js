import { useLayoutEffectWithDeps, useLayoutEffect, useEffectWithDeps, useEffect, useDebugValue } from "./ReactInterop.js";
import { class_type } from "../fable-library.4.9.0/Reflection.js";
import { iterate } from "../fable-library.4.9.0/Seq.js";
import { unwrap, some, map, defaultArg, toArray } from "../fable-library.4.9.0/Option.js";
import { Interop_reactApi } from "./Interop.fs.js";
import { disposeSafe, defaultOf, curry2, uncurry2 } from "../fable-library.4.9.0/Util.js";
import { useState } from "react";
import * as react from "react";

export const ReactInterop_useDebugValueWithFormatter = useDebugValue;

export const ReactInterop_useEffect = useEffect;

export const ReactInterop_useEffectWithDeps = useEffectWithDeps;

export const ReactInterop_useLayoutEffect = useLayoutEffect;

export const ReactInterop_useLayoutEffectWithDeps = useLayoutEffectWithDeps;

export class Internal {
    constructor() {
    }
}

export function Internal_$reflection() {
    return class_type("Feliz.Internal", void 0, Internal);
}

export function Internal_$ctor() {
    return new Internal();
}


export function Internal_functionComponent_Z45822769(renderElement, name, withKey) {
    iterate((name_1) => {
        renderElement.displayName = name_1;
    }, toArray(name));
    return (props) => {
        const props_2 = Internal_propsWithKey(withKey, props);
        return Interop_reactApi.createElement(renderElement, props_2);
    };
}

export function Internal_memo_Z1716C242(renderElement, name, areEqual, withKey) {
    const memoElementType = Interop_reactApi.memo(renderElement, uncurry2(defaultArg(map(curry2, areEqual), defaultOf())));
    iterate((name_1) => {
        renderElement.displayName = name_1;
    }, toArray(name));
    return (props) => {
        const props_2 = Internal_propsWithKey(withKey, props);
        return Interop_reactApi.createElement(memoElementType, props_2);
    };
}

export function Internal_propsWithKey(withKey, props) {
    if (withKey == null) {
        return props;
    }
    else {
        const f = withKey;
        props.key = f(props);
        return props;
    }
}

export class React {
    constructor() {
    }
}

export function React_$reflection() {
    return class_type("Feliz.React", void 0, React);
}

/**
 * Creates a disposable instance by providing the implementation of the dispose member.
 */
export function React_createDisposable_3A5B6456(dispose) {
    return {
        Dispose() {
            dispose();
        },
    };
}

/**
 * The `useState` hook that creates a state variable for React function components from an initialization function.
 */
export function useReact_useState_FCFD9EF(initializer) {
    return Interop_reactApi.useState(initializer);
}

/**
 * Accepts a reducer and returns the current state paired with a dispatch.
 */
export function useReact_useReducer_2B9E6EA0(update, initialState) {
    const arg = update;
    return Interop_reactApi.useReducer(arg, initialState);
}

/**
 * The `useEffect` hook that creates a disposable effect for React function components.
 * This effect has no dependencies which means the effect is re-executed on every re-render.
 * To make the effect run once (for example you subscribe once to web sockets) then provide an empty array
 * for the dependencies: `React.useEffect(disposableEffect, [| |])`.
 */
export function useReact_useEffect_Z5ECA432F(effect) {
    ReactInterop_useEffect(effect);
}

/**
 * The `useEffect` hook that creates a disposable effect for React function components.
 * This effect takes an array of *dependencies*.
 * Whenever any of these dependencies change, the effect is re-executed. To execute the effect only once,
 * you have to explicitly provide an empty array for the dependencies: `React.useEffect(effect, [| |])`.
 */
export function useReact_useEffect_7331F961(effect, dependencies) {
    ReactInterop_useEffectWithDeps(effect, dependencies);
}

/**
 * The `useLayoutEffect` hook that creates a disposable effect for React function components.
 * This effect has no dependencies which means the effect is re-executed on every re-render.
 * To make the effect run once (for example you subscribe once to web sockets) then provide an empty array
 * for the dependencies: `React.useLayoutEffect(disposableEffect, [| |])`.
 * The signature is identical to useEffect, but it fires synchronously after all DOM mutations. Use this to read layout from the DOM and synchronously re-render. Updates scheduled inside useLayoutEffect will be flushed synchronously, before the browser has a chance to paint.
 */
export function useReact_useLayoutEffect_Z5ECA432F(effect) {
    ReactInterop_useLayoutEffect(effect);
}

/**
 * The `useLayoutEffect` hook that creates a disposable effect for React function components.
 * This effect takes an array of *dependencies*.
 * Whenever any of these dependencies change, the effect is re-executed. To execute the effect only once,
 * you have to explicitly provide an empty array for the dependencies: `React.useLayoutEffect(effect, [| |])`.
 * The signature is identical to useEffect, but it fires synchronously after all DOM mutations. Use this to read layout from the DOM and synchronously re-render. Updates scheduled inside useLayoutEffect will be flushed synchronously, before the browser has a chance to paint.
 */
export function useReact_useLayoutEffect_7331F961(effect, dependencies) {
    ReactInterop_useLayoutEffectWithDeps(effect, dependencies);
}

/**
 * The signature is identical to useEffect, but it fires synchronously after all DOM mutations. Use this to read layout from the DOM and synchronously re-render. Updates scheduled inside useLayoutEffect will be flushed synchronously, before the browser has a chance to paint.
 * This effect is executed on every (re)render
 */
export function useReact_useLayoutEffect_3A5B6456(effect) {
    ReactInterop_useLayoutEffect((_arg) => {
        effect();
        return React_createDisposable_3A5B6456(() => {
        });
    });
}

/**
 * The signature is identical to useEffect, but it fires synchronously after all DOM mutations. Use this to read layout from the DOM and synchronously re-render. Updates scheduled inside useLayoutEffect will be flushed synchronously, before the browser has a chance to paint.
 */
export function useReact_useLayoutEffect_311B4086(effect, dependencies) {
    ReactInterop_useLayoutEffectWithDeps((_arg) => {
        effect();
        return React_createDisposable_3A5B6456(() => {
        });
    }, dependencies);
}

/**
 * React hook to define and use an effect only once when a function component renders for the first time.
 * This is an alias for `React.useEffect(effect, [| |])` which explicitly provides an empty array for the dependencies of the effect which means the effect will only run once.
 */
export function useReact_useEffectOnce_3A5B6456(effect) {
    const calledOnce = Interop_reactApi.useRef(false);
    useReact_useEffect_311B4086(() => {
        if (calledOnce.current) {
        }
        else {
            calledOnce.current = true;
            effect();
        }
    }, []);
}

/**
 * React hook to define and use a disposable effect only once when a function component renders for the first time.
 * This is an alias for `React.useEffect(effect, [| |])` which explicitly provides an empty array for the dependencies of the effect which means the effect will only run once.
 */
export function useReact_useEffectOnce_Z5ECA432F(effect) {
    const destroyFunc = Interop_reactApi.useRef(void 0);
    const calledOnce = Interop_reactApi.useRef(false);
    const renderAfterCalled = Interop_reactApi.useRef(false);
    if (calledOnce.current) {
        renderAfterCalled.current = true;
    }
    useReact_useEffect_7331F961(() => {
        let disposeOption;
        if (calledOnce.current) {
            disposeOption = void 0;
        }
        else {
            calledOnce.current = true;
            destroyFunc.current = some(effect());
            disposeOption = (renderAfterCalled.current ? destroyFunc.current : void 0);
        }
        return {
            Dispose() {
                iterate((d) => {
                    let copyOfStruct = d;
                    disposeSafe(copyOfStruct);
                }, toArray(disposeOption));
            },
        };
    }, []);
}

/**
 * React hook to define and use a disposable effect only once when a function component renders for the first time.
 * This is an alias for `React.useEffect(effect, [| |])` which explicitly provide an empty array for the dependencies of the effect which means the effect will only run once.
 */
export function useReact_useEffectOnce_69320292(effect) {
    const destroyFunc = Interop_reactApi.useRef(void 0);
    const calledOnce = Interop_reactApi.useRef(false);
    const renderAfterCalled = Interop_reactApi.useRef(false);
    if (calledOnce.current) {
        renderAfterCalled.current = true;
    }
    useReact_useEffect_7331F961(() => {
        let disposeOption;
        if (calledOnce.current) {
            disposeOption = void 0;
        }
        else {
            calledOnce.current = true;
            destroyFunc.current = effect();
            disposeOption = (renderAfterCalled.current ? destroyFunc.current : void 0);
        }
        return {
            Dispose() {
                iterate((d) => {
                    let copyOfStruct = d;
                    disposeSafe(copyOfStruct);
                }, toArray(disposeOption));
            },
        };
    }, []);
}

/**
 * The `useEffect` hook that creates an effect for React function components.
 * This effect is executed *every time* the function component re-renders.
 * 
 * To make the effect run only once, write: `React.useEffect(effect, [| |])` which explicitly states
 * that this effect has no dependencies and should only run once on initial render.
 */
export function useReact_useEffect_3A5B6456(effect) {
    ReactInterop_useEffect((_arg) => {
        effect();
        return React_createDisposable_3A5B6456(() => {
        });
    });
}

/**
 * The `useEffect` hook that creates an effect for React function components. This effect takes an array of *dependencies*.
 * Whenever any of these dependencies change, the effect is re-executed. To execute the effect only once,
 * you have to explicitly provide an empty array for the dependencies: `React.useEffect(effect, [| |])`.
 */
export function useReact_useEffect_311B4086(effect, dependencies) {
    ReactInterop_useEffectWithDeps((_arg) => {
        effect();
        return React_createDisposable_3A5B6456(() => {
        });
    }, dependencies);
}

/**
 * Can be used to display a label for custom hooks in React DevTools.
 */
export function useReact_useDebugValue_Z721C83C5(value) {
    ReactInterop_useDebugValueWithFormatter(value, (x) => x);
}

/**
 * Can be used to display a label for custom hooks in React DevTools.
 */
export function useReact_useDebugValue_77A55D6D(value, formatter) {
    ReactInterop_useDebugValueWithFormatter(value, formatter);
}

/**
 * The `useCallback` hook. Returns a memoized callback. Pass an inline callback and an array of dependencies.
 * `useCallback` will return a memoized version of the callback that only changes if one of the dependencies has changed.
 */
export function useReact_useCallback_1CA17B65(callbackFunction, dependencies) {
    const dependencies_1 = defaultArg(dependencies, []);
    return Interop_reactApi.useCallback(callbackFunction, dependencies_1);
}

/**
 * Returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.
 * 
 * Essentially, useRef is like a container that can hold a mutable value in its .current property.
 */
export function useReact_useRef_1505(initialValue) {
    return Interop_reactApi.useRef(initialValue);
}

/**
 * A specialized version of React.useRef() that creates a reference to an input element.
 * 
 * Useful for controlling the internal properties and methods of that element, for example to enable focus().
 */
export function useReact_useInputRef() {
    return useReact_useRef_1505(void 0);
}

/**
 * A specialized version of React.useRef() that creates a reference to a button element.
 */
export function useReact_useButtonRef() {
    return useReact_useRef_1505(void 0);
}

/**
 * A specialized version of React.useRef() that creates a reference to a generic HTML element.
 * 
 * Useful for controlling the internal properties and methods of that element, for integration with third-party libraries that require a Html element.
 */
export function useReact_useElementRef() {
    return useReact_useRef_1505(void 0);
}

/**
 * The `useMemo` hook. Returns a memoized value. Pass a "create" function and an array of dependencies.
 * `useMemo` will only recompute the memoized value when one of the dependencies has changed.
 */
export function useReact_useMemo_10C6A43C(createFunction, dependencies) {
    const dependencies_1 = defaultArg(dependencies, []);
    return Interop_reactApi.useMemo(createFunction, dependencies_1);
}

/**
 * Creates a React function component from a function that accepts a "props" object and renders a result.
 * A component key can be provided in the props object, or a custom `withKey` function can be provided.
 */
export function React_functionComponent_Z336EF691(render, withKey) {
    return Internal_functionComponent_Z45822769(render, void 0, unwrap(withKey));
}

/**
 * Creates a React function component from a function that accepts a "props" object and renders a result.
 * A component key can be provided in the props object, or a custom `withKey` function can be provided.
 */
export function React_functionComponent_50AC6514(name, render, withKey) {
    return Internal_functionComponent_Z45822769(render, name, unwrap(withKey));
}

/**
 * Creates a React function component from a function that accepts a "props" object and renders a result.
 * A component key can be provided in the props object, or a custom `withKey` function can be provided.
 */
export function React_functionComponent_Z552AB1C(render, withKey) {
    return Internal_functionComponent_Z45822769((arg) => {
        const xs = render(arg);
        return react.createElement(react.Fragment, {}, ...xs);
    }, void 0, unwrap(withKey));
}

/**
 * Creates a React function component from a function that accepts a "props" object and renders a result.
 * A component key can be provided in the props object, or a custom `withKey` function can be provided.
 */
export function React_functionComponent_Z32EE5C21(name, render, withKey) {
    return Internal_functionComponent_Z45822769((arg) => {
        const xs = render(arg);
        return react.createElement(react.Fragment, {}, ...xs);
    }, name, unwrap(withKey));
}

/**
 * `React.memo` memoizes the result of a function component. Given the same props, React will skip rendering the component, and reuse the last rendered result.
 * By default it will only shallowly compare complex objects in the props object. For more control, a custom `areEqual` function can be provided.
 * A component key can be provided in the props object, or a custom `withKey` function can be provided.
 */
export function React_memo_Z71E4ACFA(render, withKey, areEqual) {
    return Internal_memo_Z1716C242(render, void 0, unwrap(areEqual), unwrap(withKey));
}

/**
 * `React.memo` memoizes the result of a function component. Given the same props, React will skip rendering the component, and reuse the last rendered result.
 * By default it will only shallowly compare complex objects in the props object. For more control, a custom `areEqual` function can be provided.
 * A component key can be provided in the props object, or a custom `withKey` function can be provided.
 */
export function React_memo_Z496F9C23(name, render, withKey, areEqual) {
    return Internal_memo_Z1716C242(render, name, unwrap(areEqual), unwrap(withKey));
}

/**
 * `React.memo` memoizes the result of a function component. Given the same props, React will skip rendering the component, and reuse the last rendered result.
 * By default it will only shallowly compare complex objects in the props object. For more control, a custom `areEqual` function can be provided.
 * A component key can be provided in the props object, or a custom `withKey` function can be provided.
 */
export function React_memo_Z7F016AD3(render, withKey, areEqual) {
    return Internal_memo_Z1716C242((arg) => {
        const xs = render(arg);
        return react.createElement(react.Fragment, {}, ...xs);
    }, void 0, unwrap(areEqual), unwrap(withKey));
}

/**
 * `React.memo` memoizes the result of a function component. Given the same props, React will skip rendering the component, and reuse the last rendered result.
 * By default it will only shallowly compare complex objects in the props object. For more control, a custom `areEqual` function can be provided.
 * A component key can be provided in the props object, or a custom `withKey` function can be provided.
 */
export function React_memo_Z4010840A(name, render, withKey, areEqual) {
    return Internal_memo_Z1716C242((arg) => {
        const xs = render(arg);
        return react.createElement(react.Fragment, {}, ...xs);
    }, name, unwrap(areEqual), unwrap(withKey));
}

/**
 * Creates a Context object. When React renders a component that subscribes to this Context object
 * it will read the current context value from the closest matching Provider above it in the tree.
 */
export function React_createContext_Z10F951C2(name, defaultValue) {
    const contextObject = Interop_reactApi.createContext(defaultArg(defaultValue, void 0));
    iterate((name_1) => {
        contextObject.displayName = name_1;
    }, toArray(name));
    return contextObject;
}

/**
 * A Provider component that allows consuming components to subscribe to context changes.
 */
export function React_contextProvider_34D9BBBD(contextObject, contextValue, child) {
    return Interop_reactApi.createElement(contextObject.Provider, {
        value: contextValue,
    }, child);
}

/**
 * A Provider component that allows consuming components to subscribe to context changes.
 */
export function React_contextProvider_138D2F56(contextObject, contextValue, children) {
    return Interop_reactApi.createElement(contextObject.Provider, {
        value: contextValue,
    }, ...children);
}

/**
 * A Consumer component that subscribes to context changes.
 */
export function React_contextConsumer_Z68910595(contextObject, render) {
    return Interop_reactApi.createElement(contextObject.Consumer, defaultOf(), render);
}

/**
 * A Consumer component that subscribes to context changes.
 */
export function React_contextConsumer_56D53A40(contextObject, render) {
    return Interop_reactApi.createElement(contextObject.Consumer, defaultOf(), (arg) => {
        const xs = render(arg);
        return react.createElement(react.Fragment, {}, ...xs);
    });
}

/**
 * The `useContext` hook. Accepts a context object (the value returned from React.createContext) and returns the current context value for that context.
 * The current context value is determined by the value prop of the nearest Provider component above the calling component in the tree.
 */
export function useReact_useContext_37FA55CF(contextObject) {
    return Interop_reactApi.useContext(contextObject);
}

/**
 * Creates a callback that keeps the same reference during the entire lifecycle of the component while having access to
 * the current value of the dependencies on every call.
 * 
 * This hook should only be used for (like a dispatch) functions that are not used to provide information during render.
 * 
 * This is not a complete replacement for the `useCallback` hook. It returns a callback that does not need explicit
 * dependency declarations and never causes a re-render.
 */
export function useReact_useCallbackRef_7C4B0DD6(callback) {
    const lastRenderCallbackRef = useReact_useRef_1505(callback);
    const callbackRef = useReact_useCallback_1CA17B65((arg) => lastRenderCallbackRef.current(arg), []);
    useReact_useLayoutEffect_3A5B6456(() => {
        lastRenderCallbackRef.current = callback;
    });
    return callbackRef;
}

export const React_useStateWithUpdater_1505 = useState;

/**
 * Forwards a given ref, allowing you to pass it further down to a child.
 */
export function React_forwardRef_3790D881(render) {
    const forwardRefType = Interop_reactApi.forwardRef((props, ref) => render([props, ref]));
    return (tupledArg) => {
        const propsObj = Object.assign({}, tupledArg[0]);
        propsObj.ref = tupledArg[1];
        return Interop_reactApi.createElement(forwardRefType, propsObj);
    };
}

/**
 * Forwards a given ref, allowing you to pass it further down to a child.
 */
export function React_forwardRef_7DC3DB1A(name, render) {
    const forwardRefType = Interop_reactApi.forwardRef((props, ref) => render([props, ref]));
    render.displayName = name;
    return (tupledArg) => {
        const propsObj = Object.assign({}, tupledArg[0]);
        propsObj.ref = tupledArg[1];
        return Interop_reactApi.createElement(forwardRefType, propsObj);
    };
}

/**
 * Highlights potential problems in an application by enabling additional checks
 * and warnings for descendants. As well as double rendering function components.
 * 
 * This *does not do anything* in production mode. You do not need to hide it
 * with compiler directives.
 */
export function React_strictMode_1FEFDAB5(children) {
    return Interop_reactApi.createElement(Interop_reactApi.StrictMode, void 0, ...children);
}

/**
 * Lets you define a component that is loaded dynamically. Which helps with code splitting.
 */
export function React_lazy$0027_4712D3AE(dynamicImport, props) {
    return Interop_reactApi.createElement(Interop_reactApi.lazy(() => dynamicImport), props);
}

/**
 * Lets you define a component that is loaded dynamically. Which helps with code
 * splitting.
 */
export function React_lazy$0027_Z3D8450FC(dynamicImport, props) {
    return Interop_reactApi.createElement(Interop_reactApi.lazy(dynamicImport), props);
}

/**
 * Lets you specify a loading indicator whenever a child element is not yet ready
 * to render.
 * 
 * Currently this is only usable with `React.lazy'`.
 */
export function React_suspense_1FEFDAB5(children) {
    let o;
    return Interop_reactApi.createElement(Interop_reactApi.Suspense, (o = {
        fallback: defaultOf(),
    }, Object.assign({}, o)), ...children);
}

/**
 * Lets you specify a loading indicator whenever a child element is not yet ready
 * to render.
 * 
 * Currently this is only usable with `React.lazy'`.
 */
export function React_suspense_36DAE502(children, fallback) {
    let o;
    return Interop_reactApi.createElement(Interop_reactApi.Suspense, (o = {
        fallback: fallback,
    }, Object.assign({}, o)), ...children);
}

/**
 * Allows you to override the behavior of a given ref.
 */
export function useReact_useImperativeHandle_596DDC25(ref, createHandle) {
    Interop_reactApi.useImperativeHandle(ref, createHandle);
}

/**
 * Lets you specify a loading indicator whenever a child element is not yet ready
 * to render.
 * 
 * Currently this is only usable with `React.lazy'`.
 */
export function useReact_useImperativeHandle_33F5CF55(ref, createHandle, dependencies) {
    Interop_reactApi.useImperativeHandle(ref, createHandle, dependencies);
}

/**
 * The `useState` hook that creates a state variable for React function components.
 */
export function useFeliz_React__React_useState_Static_1505(initial) {
    return Interop_reactApi.useState(initial);
}

export const Feliz_React__React_useStateWithUpdater_Static_FCFD9EF = useState;

