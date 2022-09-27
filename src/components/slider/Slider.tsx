import merge from "lodash/merge";
import React from "react";
import { useColor, withColorProvider } from "../../context/useColor";
import { Hue } from "../common";
import SliderPointer from "./SliderPointer";
import SliderSwatches from "./SliderSwatches";

export type SliderPickerProps = {
  pointer?: typeof SliderPointer;
  styles?: Record<string, React.CSSProperties>;
  className?: string;
};

const Slider = ({
  pointer = SliderPointer,
  styles: passedStyles = {},
  className = "",
}: SliderPickerProps) => {
  const { colors, changeColor } = useColor();
  const { hsl } = colors;

  const styles = merge<
    Record<string, React.CSSProperties>,
    Record<string, React.CSSProperties>
  >(
    {
      hue: {
        height: "12px",
        position: "relative",
      },
      Hue: {
        borderRadius: "2px",
      },
    },
    passedStyles
  );

  return (
    <div style={styles.wrap || {}} className={`slider-picker ${className}`}>
      <div style={styles.hue}>
        <Hue
          style={styles.Hue}
          hsl={hsl}
          pointer={pointer}
          onChange={changeColor}
        />
      </div>
      <div style={styles.swatches}>
        <SliderSwatches hsl={hsl} onClick={changeColor} />
      </div>
    </div>
  );
};

export default withColorProvider(Slider);
