import merge from "lodash/merge";
import React from "react";
import reactCSS from "reactcss";
import { useColor, withColorProvider } from "../../context/useColor";
import { Color } from "../../types/colors";
import { Alpha, Checkboard, Hue, Saturation } from "../common";
import SketchFields from "./SketchFields";
import SketchPresetColors from "./SketchPresetColors";

type Props = {
  onSwatchHover?: (color: Color, event: React.MouseEvent) => void;
  disableAlpha?: boolean;
  width?: string | number;
  className?: string;
  presetColors?: string[];
  styles?: React.CSSProperties;
  renderers?: any;
};

export function Sketch({
  width = 200,
  onSwatchHover,
  disableAlpha = false,
  presetColors = [
    "#D0021B",
    "#F5A623",
    "#F8E71C",
    "#8B572A",
    "#7ED321",
    "#417505",
    "#BD10E0",
    "#9013FE",
    "#4A90E2",
    "#50E3C2",
    "#B8E986",
    "#000000",
    "#4A4A4A",
    "#9B9B9B",
    "#FFFFFF",
  ],
  renderers,
  styles: passedStyles = {},
  className = "",
}: Props) {
  const { colors, changeColor } = useColor();
  const { rgb, hex, hsv, hsl } = colors;

  const styles: any = reactCSS(
    merge(
      {
        default: {
          picker: {
            width,
            padding: "10px 10px 0",
            boxSizing: "initial",
            background: "#fff",
            borderRadius: "4px",
            boxShadow: "0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15)",
          },
          saturation: {
            width: "100%",
            paddingBottom: "75%",
            position: "relative",
            overflow: "hidden",
          },
          Saturation: {
            radius: "3px",
            shadow:
              "inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)",
          },
          controls: {
            display: "flex",
          },
          sliders: {
            padding: "4px 0",
            flex: "1",
          },
          color: {
            width: "24px",
            height: "24px",
            position: "relative",
            marginTop: "4px",
            marginLeft: "4px",
            borderRadius: "3px",
          },
          activeColor: {
            absolute: "0px 0px 0px 0px",
            borderRadius: "2px",
            background: `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`,
            boxShadow:
              "inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)",
          },
          hue: {
            position: "relative",
            height: "10px",
            overflow: "hidden",
          },
          Hue: {
            radius: "2px",
            shadow:
              "inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)",
          },

          alpha: {
            position: "relative",
            height: "10px",
            marginTop: "4px",
            overflow: "hidden",
          },
          Alpha: {
            radius: "2px",
            shadow:
              "inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)",
          },
          ...passedStyles,
        },
        disableAlpha: {
          color: {
            height: "10px",
          },
          hue: {
            height: "10px",
          },
          alpha: {
            display: "none",
          },
        },
      },
      passedStyles as any
    ),
    { disableAlpha }
  );

  return (
    <div style={styles.picker} className={`sketch-picker ${className}`}>
      <div style={styles.saturation}>
        <Saturation
          style={styles.Saturation}
          hsl={hsl}
          hsv={hsv}
          onChange={changeColor}
        />
      </div>
      <div style={styles.controls} className="flexbox-fix">
        <div style={styles.sliders}>
          <div style={styles.hue}>
            <Hue style={styles.Hue} hsl={hsl} onChange={changeColor} />
          </div>
          <div style={styles.alpha}>
            <Alpha
              style={styles.Alpha}
              rgb={rgb}
              hsl={hsl}
              renderers={renderers}
              onChange={changeColor}
            />
          </div>
        </div>
        <div style={styles.color}>
          <Checkboard />
          <div style={styles.activeColor} />
        </div>
      </div>

      <SketchFields
        rgb={rgb}
        hsl={hsl}
        hex={hex}
        onChange={changeColor}
        disableAlpha={disableAlpha}
      />
      <SketchPresetColors
        colors={presetColors}
        onClick={changeColor}
        onSwatchHover={onSwatchHover}
      />
    </div>
  );
}

export default withColorProvider(Sketch);