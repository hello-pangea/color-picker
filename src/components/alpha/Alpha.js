import React from "react";
import reactCSS from "reactcss";
import { useColor, withColorProvider } from "../../context/useColor";
import { Alpha } from "../common";
import AlphaPointer from "./AlphaPointer";

export const AlphaPicker = ({
  width,
  height,
  direction,
  style,
  renderers,
  pointer,
  className = "",
}) => {
  const { colors: currentColors, changeColor } = useColor();
  const { hsl, rgb } = currentColors;

  const styles = reactCSS({
    default: {
      picker: {
        position: "relative",
        width,
        height,
      },
      alpha: {
        radius: "2px",
        style,
      },
    },
  });

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
};

AlphaPicker.defaultProps = {
  width: "316px",
  height: "16px",
  direction: "horizontal",
  pointer: AlphaPointer,
};

export default withColorProvider(AlphaPicker);
