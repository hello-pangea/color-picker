import React, { useState } from "react";
import { ChromePicker, CirclePicker, GooglePicker } from "../../src";

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
