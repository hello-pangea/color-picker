import merge from "lodash/merge";
import React from "react";
import reactCSS from "reactcss";
import { useColor, withColorProvider } from "../../context/useColor";
import { Hue } from "../common";
import SliderPointer from "./SliderPointer";
import SliderSwatches from "./SliderSwatches";

type Props = {
  pointer: typeof SliderPointer;
  styles?: React.CSSProperties;
  className?: string;
};

const Slider = ({
  pointer = SliderPointer,
  styles: passedStyles = {},
  className = "",
}: Props) => {
  const { colors, changeColor } = useColor();
  const { hsl } = colors;

  const styles = reactCSS<any>(
    merge(
      {
        default: {
          hue: {
            height: "12px",
            position: "relative",
          },
          Hue: {
            radius: "2px",
          },
        },
      },
      passedStyles as any
    )
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
