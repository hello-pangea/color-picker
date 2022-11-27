---
sidebar_position: 2
---

# Custom components

You can use our hooks and helper functions to create custom color pickers.

## `withColorProvider` HOC

`withColorProvider` is a higher-order-component which conveniently wraps your components in our context provider. This gives your custom component and any sub-components access to the `useColor` hook.

## `useColor` hook

`useColor` is the hook that powers our color pickers. It allows you to access the current color in a variety of formats as well as accessing the `changeColor` function.

```tsx
import { withColorProvider, useColor } from "@hello-pangea/color-picker";
import React from "react";

function MyCustomPicker() {
  const { colors, changeColor } = useColor();

  // You can now access the following properties
  const { hex, rgb, hsl, hsv } = colors;

  return; // ...your custom component
}

export default withColorProvider(MyCustomPicker);
```

## Full example

```tsx
import {
  withColorProvider,
  useColor,
  EditableInput,
  Hue,
} from "@hello-pangea/color-picker";
import React from "react";

function MyPicker() {
  const { colors, changeColor } = useColor();
  const { hex, hsl } = colors;

  return (
    <div>
      <div
        style={{
          height: 10,
          position: "relative",
          marginBottom: 10,
        }}
      >
        <Hue hsl={hsl} onChange={onChange} />
      </div>

      <div style={{ display: "flex" }}>
        <EditableInput
          style={{
            input: {
              height: 34,
              border: `1px solid ${hex}`,
              paddingLeft: 10,
            },
          }}
          value={hex}
          onChange={onChange}
        />
        <div
          style={{
            width: 54,
            height: 38,
            background: hex,
          }}
        />
      </div>
    </div>
  );
}

export default withColorProvider(MyPicker);
```
