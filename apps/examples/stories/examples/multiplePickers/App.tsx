import {
  ChromePicker,
  CirclePicker,
  GooglePicker,
} from "@hello-pangea/color-picker/src/index";
import React, { useState } from "react";

export const App = () => {
  const [colorValue, setColorValue] = useState<string>();

  return (
    <>
      <div style={{ marginBottom: "16px" }}>
        <ChromePicker
          color={colorValue}
          onChange={(e) => setColorValue(e.hex)}
        />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <GooglePicker
          color={colorValue}
          onChange={(e) => setColorValue(e.hex)}
        />
      </div>
      <CirclePicker color={colorValue} onChange={(e) => setColorValue(e.hex)} />
    </>
  );
};

export default App;
