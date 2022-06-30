import type React from "react";

import {directiveMap, directiveNames} from "./map";

type DirectiveHandlerProps = React.PropsWithChildren<{
    Component: any;
    componentProps: any;
    key?: any;
    createElement: typeof React["createElement"];
}>;

export function DirectiveHandler({Component, componentProps, children, createElement}: DirectiveHandlerProps) {
    let component = createElement(Component, componentProps, children);

    for (let directiveName of directiveNames) {
        if (typeof componentProps[directiveName] !== "undefined") {
            const Directive = directiveMap[directiveName];
            component = createElement(Directive, {value: componentProps[directiveName]}, component);
        }
    }

    return component;
}
