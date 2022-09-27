import React from "react";
import { HslColor } from "../../types/colors";
import SliderSwatch from "./SliderSwatch";

type Props = {
  onClick: any;
  hsl: HslColor;
};

export default function SliderSwatches({ onClick, hsl }: Props) {
  const styles: Record<string, React.CSSProperties> = {
    swatches: {
      marginTop: "20px",
    },
    swatch: {
      boxSizing: "border-box",
      width: "20%",
      paddingRight: "1px",
      float: "left",
    },
    clear: {
      clear: "both",
    },
  };

  // Acceptible difference in floating point equality
  const epsilon = 0.1;

  return (
    <div style={styles.swatches}>
      <div style={styles.swatch}>
        <SliderSwatch
          hsl={hsl}
          offset={0.8}
          active={
            Math.abs(hsl.l - 0.8) < epsilon && Math.abs(hsl.s - 0.5) < epsilon
          }
          onClick={onClick}
          first
        />
      </div>
      <div style={styles.swatch}>
        <SliderSwatch
          hsl={hsl}
          offset={0.65}
          active={
            Math.abs(hsl.l - 0.65) < epsilon && Math.abs(hsl.s - 0.5) < epsilon
          }
          onClick={onClick}
        />
      </div>
      <div style={styles.swatch}>
        <SliderSwatch
          hsl={hsl}
          offset={0.5}
          active={
            Math.abs(hsl.l - 0.5) < epsilon && Math.abs(hsl.s - 0.5) < epsilon
          }
          onClick={onClick}
        />
      </div>
      <div style={styles.swatch}>
        <SliderSwatch
          hsl={hsl}
          offset={0.35}
          active={
            Math.abs(hsl.l - 0.35) < epsilon && Math.abs(hsl.s - 0.5) < epsilon
          }
          onClick={onClick}
        />
      </div>
      <div style={styles.swatch}>
        <SliderSwatch
          hsl={hsl}
          offset={0.2}
          active={
            Math.abs(hsl.l - 0.2) < epsilon && Math.abs(hsl.s - 0.5) < epsilon
          }
          onClick={onClick}
          last
        />
      </div>
      <div style={styles.clear} />
    </div>
  );
}
