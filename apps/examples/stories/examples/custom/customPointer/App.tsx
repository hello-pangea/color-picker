import React from "react";
import MyPicker from "./MyPicker";

export default function App() {
  const handleColorChange = ({ hex }) => console.log(hex);

  return (
    <div>
      <MyPicker color="coral" onChangeComplete={handleColorChange} />
    </div>
  );
}
