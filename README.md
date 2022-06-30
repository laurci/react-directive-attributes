# react-directive-attributes

This package is inspired by Angular's attribute directive. You can check it out [here](https://angular.io/guide/attribute-directives). TLDR: it's a cool way to add behavior to a component from the markup. You bind and configure it via an attribute, ex:

```tsx
<MyTextComponent copyToClipboard="https://my-link.com">My Link</MyTextComponent>
```

The implementation of `copyToClipboard` would wrap the `MyTextComponent` to provide the extra behavior. You can write it as a simple wrapper like so:

```tsx
<CopyToClipboard content="https://my-link.com">
    <MyTextComponent>My Link</MyTextComponent>
</CopyToClipboard>
```

This package allows you to do the same but in React.

## Warning

This package was made in a little over 1 hour. It does not support **SSR**, it does not work with JSX Transform, it might be an anti-pattern, it might affect performance and it only works with Typescript. It works by hacking React's built-in `createElement` to inject a custom component when a directive is detected (check `src/react.ts`).

That being said, it's enough to prove the concept and, if interest for the project exists, I will implement it properly. So, don't be shy, create an issue and tell me what you want from this project.

## How to implement a directive

1. Install the hook. This needs to exist before any component is rendered. I recommend doing this in your entry point right after importing `React`. It might look something like this.

```tsx
import {installDirectiveHandler} from "react-directive-attributes";
import React from "react";
installDirectiveHandler(React); // this line is important

import {createRoot} from "react-dom/client";
import {App} from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
```

2. Create a global attribute type for your directive. You can do this by extending `Attributes` interface in the `React` namespace. I recommend to create a dedicated file `attributes.d.ts` just for this.

```ts
declare namespace React {
    interface Attributes {
        abcd?: string;
    }
}
```

3. Create the directive implementation (this is just a wrapper component). You can bind it's params to the type of the attribute by using `DirectiveAttributeBinding<"<attribute name>">`.

```tsx
import React from "react";
import {DirectiveAttributeBinding} from "react-directive-attributes";

export function AbcdDirective({value, children}: DirectiveAttributeBinding<"abcd">) {
    return (
        <>
            <p>wrapped by directive abcd with value {value}</p>

            {children}
        </>
    );
}
```

4. Bind you directive to an attribute. Again, make sure this is called before you render anything. The entry point is a good place to do this. You can create an `directive.ts` and bind all your directives there.

```ts
import {bindDirectiveToAttribute} from "react-directive-attributes";

import {AbcdDirective} from "./abcd";

bindDirectiveToAttribute(AbcdDirective, "abcd");
```

5. Done. You can now use your directive.

```tsx
<MyComponent abcd="hello" />
```

## Usage with CRA (create-react-app)

If you use a newer version of CRA, you must disable the JSX Transform and roll back to the "classic" version.

1. Modify your `tsconfig.json` to match:

```json
"jsx": "react",
"jsxFactory": "React.createElement",
"jsxFragmentFactory": "React.Fragment"
```

2. Set the `DISABLE_NEW_JSX_TRANSFORM` to `true` when starting or building the application:

```bash
DISABLE_NEW_JSX_TRANSFORM=true yarn start
```

If this does not work, you might also need to eject.
