import {
  ColorResult,
  GooglePicker,
} from "@hello-pangea/color-picker/src/index";
import React, { useState } from "react";

export default function App() {
  const [hexValue, setHexValue] = useState<string>("#333333");

  function handleChange(colorResult: ColorResult) {
    setHexValue(colorResult.hex);
  }

  return <GooglePicker color={hexValue} onChange={handleChange} />;
}
