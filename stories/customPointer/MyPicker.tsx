import React from "react";
import { Alpha, CustomPicker } from "../../src";
import MyPointer from "./MyPointer";

export const MyPicker = ({ rgb, hsl, onChange }) => {
  return (
    <div style={{ height: 18, width: 200, position: "relative" }}>
      <Alpha rgb={rgb} hsl={hsl} onChange={onChange} pointer={MyPointer} />
    </div>
  );
};

export default CustomPicker(MyPicker);
