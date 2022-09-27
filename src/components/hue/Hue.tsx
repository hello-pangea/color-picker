import merge from "lodash/merge";
import React from "react";
import { useColor, withColorProvider } from "../../context/useColor";
import { ChangeColor } from "../../types/colors";
import { Hue } from "../common";
import HuePointer from "./HuePointer";

export type HuePickerProps = {
  width?: string | number;
  height?: string | number;
  direction?: "horizontal" | "vertical";
  pointer: typeof HuePointer;
  className?: string;
  styles?: Record<string, React.CSSProperties>;
};

export function HuePicker({
  width = "316px",
  height = "16px",
  direction = "horizontal",
  pointer = HuePointer,
  styles: passedStyles = {},
  className = "",
}: HuePickerProps) {
  const { colors, changeColor } = useColor();
  const { hsl } = colors;

  const styles = merge<
    Record<string, React.CSSProperties>,
    Record<string, React.CSSProperties>
  >(
    {
      picker: {
        position: "relative",
        width,
        height,
      },
      hue: {
        borderRadius: "2px",
      },
    },
    passedStyles
  );

  // Overwrite to provide pure hue color
  const handleChange = (data: ChangeColor) =>
    changeColor({
      a: 1,
      h: typeof data !== "string" && "h" in data ? data.h : 0,
      l: 0.5,
      s: 1,
    });

  return (
    <div style={styles.picker} className={`hue-picker ${className}`}>
      <Hue
        {...styles.hue}
        hsl={hsl}
        pointer={pointer}
        onChange={handleChange}
        direction={direction}
      />
    </div>
  );
}

export default withColorProvider(HuePicker);
