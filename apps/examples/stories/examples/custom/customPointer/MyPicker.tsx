import {
  Alpha,
  useColor,
  withColorProvider,
} from "@hello-pangea/color-picker/src/index";
import React from "react";
import MyPointer from "./MyPointer";

function MyPicker() {
  const { colors, changeColor } = useColor();

  return (
    <div style={{ height: 18, width: 200, position: "relative" }}>
      <Alpha
        rgb={colors.rgb}
        hsl={colors.hsl}
        onChange={changeColor}
        pointer={MyPointer}
      />
    </div>
  );
}

export default withColorProvider(MyPicker);
