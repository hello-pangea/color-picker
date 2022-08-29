# Pangea color picker

Simple color picker for React.

[![Npm Version][npm-version-image]][npm-version-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

- **13 Different Pickers** - Sketch, Photoshop, Chrome and many more
- **Make Your Own** - Use the building block components to make your own

This library is a fork of [react-color](https://github.com/casesandberg/react-color) and builds on the amazing work of @casesandberg

## Demo

![Demo](https://media.giphy.com/media/26FfggT53qE304CwE/giphy.gif)

[**Live Demo**](https://colorpicker.hellopangea.com)

## Installation & Usage

```sh
npm install @hello-pangea/color-picker
```

### Include the Component

```js
import React from "react";
import { SketchPicker } from "@hello-pangea/color-picker";

class Component extends React.Component {
  render() {
    return <SketchPicker />;
  }
}
```

You can import `AlphaPicker` `BlockPicker` `ChromePicker` `CirclePicker` `CompactPicker` `GithubPicker` `HuePicker` `MaterialPicker` `PhotoshopPicker` `SketchPicker` `SliderPicker` `SwatchesPicker` `TwitterPicker` respectively.

> 100% inline styles via [ReactCSS](http://reactcss.com/)

[license-image]: https://img.shields.io/npm/l/@hello-pangea/color-picker
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/@hello-pangea/color-picker
[downloads-url]: https://npm-stat.com/charts.html?package=@hello-pangea/color-picker
[npm-version-image]: https://img.shields.io/npm/v/@hello-pangea/color-picker
[npm-version-url]: https://www.npmjs.com/package/@hello-pangea/color-picker
