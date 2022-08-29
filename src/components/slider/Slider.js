import merge from "lodash/merge";
import PropTypes from "prop-types";
import React from "react";
import reactCSS from "reactcss";
import { useColor, withColorProvider } from "../../context/useColor";
import { Hue } from "../common";
import SliderPointer from "./SliderPointer";
import SliderSwatches from "./SliderSwatches";

const Slider = ({ pointer, styles: passedStyles = {}, className = "" }) => {
  const { colors, changeColor } = useColor();
  const { hsl } = colors;

  const styles = reactCSS(
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
      passedStyles
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

Slider.propTypes = {
  styles: PropTypes.object,
};
Slider.defaultProps = {
  pointer: SliderPointer,
  styles: {},
};

export default withColorProvider(Slider);
