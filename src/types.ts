import type {Attributes, PropsWithChildren} from "react";

export type DefinedAttributes = Exclude<keyof Attributes, "key">;

export type DirectiveAttributeBinding<T extends DefinedAttributes> = T extends keyof Attributes
    ? PropsWithChildren<{
          value: Attributes[T];
      }>
    : never;
