import { SketchPicker } from "@hello-pangea/color-picker";
import React from "react";

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
