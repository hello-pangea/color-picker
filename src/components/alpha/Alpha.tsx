import React from "react";
import { useColor, withColorProvider } from "../../context/useColor";
import { Alpha } from "../common";
import AlphaPointer from "./AlphaPointer";

export type AlphaPickerProps = {
  width?: string | number;
  height?: string | number;
  direction?: "horizontal" | "vertical";
  pointer?: typeof AlphaPointer;
  renderers?: any;
  className?: string;
  style?: Record<string, React.CSSProperties>;
};

export function AlphaPicker({
  width = "316px",
  height = "16px",
  direction = "horizontal",
  style,
  renderers,
  pointer = AlphaPointer,
  className = "",
}: AlphaPickerProps) {
  const { colors: currentColors, changeColor } = useColor();
  const { hsl, rgb } = currentColors;

  const styles: Record<string, React.CSSProperties> = {
    picker: {
      position: "relative",
      width,
      height,
    },
    alpha: {
      borderRadius: "2px",
      ...style,
    },
  };

  return (
    <div style={styles.picker} className={`alpha-picker ${className}`}>
      <Alpha
        {...styles.alpha}
        rgb={rgb}
        hsl={hsl}
        pointer={pointer}
        renderers={renderers}
        onChange={changeColor}
        direction={direction}
      />
    </div>
  );
}

export default withColorProvider(AlphaPicker);
