import {DefinedAttributes} from "./types";

export const directiveMap: {[key: string]: any} = {};
export const directiveNames: string[] = [];

export function bindDirectiveToAttribute(directive: any, attribute: DefinedAttributes) {
    directiveMap[attribute] = directive;
    if (directiveNames.indexOf(attribute) < 0) {
        directiveNames.push(attribute);
    }
}
