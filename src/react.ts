import type React from "react";
import {DirectiveHandler} from "./handler";
import {directiveNames} from "./map";

function hasDirectiveAttributes(props?: Record<string, any> | null) {
    if (!props) return false;
    return directiveNames.some((x) => typeof props[x] !== "undefined");
}

export function installDirectiveHandler(react: typeof React) {
    const originalCreateElement = react.createElement.bind(react);

    react.createElement = ((type: any, props?: Record<string, any> | null, ...children: React.ReactNode[]) => {
        if (hasDirectiveAttributes(props)) {
            return originalCreateElement(
                DirectiveHandler,
                {
                    Component: type,
                    componentProps: props,
                    key: props?.key,
                    createElement: originalCreateElement,
                },
                ...children
            );
        }

        return originalCreateElement(type, props, ...children);
    }) as typeof React["createElement"];
}
