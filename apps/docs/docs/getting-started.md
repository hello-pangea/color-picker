---
sidebar_position: 1
---

# Getting started

Learn how to get started with **Pangea Color Picker** for react.

## Installation

```bash
npm install @hello-pangea/color-picker
```

### Simple example

```tsx
import { GooglePicker } from "@hello-pangea/color-picker";

export default function App() {
  return <GooglePicker />;
}
```

### Controlled

```tsx
import { ColorResult, GooglePicker } from "@hello-pangea/color-picker";
import { useState } from "react";

export default function App() {
  const [hexValue, setHexValue] = useState<string>("#333333");

  function handleChange(colorResult: ColorResult) {
    setHexValue(colorResult.hex);
  }

  return <GooglePicker color={hexValue} onChange={handleChange} />;
}
```

## Live demos

Check out our [examples site](/examples) to play with live demos.
