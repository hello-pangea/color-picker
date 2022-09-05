import React from "react";
import { SketchPicker } from "../../src";

export const App = () => {
  const handleColorChange = ({ hex }) => console.log("new color", hex);
  const handleSwatchHoverChange = ({ hex }) => console.log("hover", hex);

  return (
    <div>
      <SketchPicker
        color="#333"
        onChangeComplete={handleColorChange}
        onSwatchHover={handleSwatchHoverChange}
      />
    </div>
  );
};

export default App;
