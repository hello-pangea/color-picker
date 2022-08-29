import merge from "lodash/merge";
import React from "react";
import reactCSS from "reactcss";
import {
  ChangeColor,
  useColor,
  withColorProvider,
} from "../../context/useColor";
import { Hue } from "../common";
import HuePointer from "./HuePointer";

type Props = {
  width?: string | number;
  height?: string | number;
  direction?: "horizontal" | "vertical";
  pointer: typeof HuePointer;
  className?: string;
  styles?: React.CSSProperties;
};

export function HuePicker({
  width = "316px",
  height = "16px",
  direction = "horizontal",
  pointer = HuePointer,
  styles: passedStyles = {},
  className = "",
}: Props) {
  const { colors, changeColor } = useColor();
  const { hsl } = colors;

  const styles = reactCSS<any>(
    merge(
      {
        default: {
          picker: {
            position: "relative",
            width,
            height,
          },
          hue: {
            radius: "2px",
          },
        },
      },
      passedStyles as any
    )
  );

  // Overwrite to provide pure hue color
  const handleChange = (data: ChangeColor) =>
    changeColor({ a: 1, h: "h" in data ? data.h : 0, l: 0.5, s: 1 });

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
