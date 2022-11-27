import merge from "lodash/merge";
import React from "react";
import { useColor, withColorProvider } from "../../context/useColor";
import { Hue, Saturation } from "../common";
import GoogleFields from "./GoogleFields";
import GooglePointer from "./GooglePointer";
import GooglePointerCircle from "./GooglePointerCircle";

export type GooglePickerProps = {
  width?: string | number;
  styles?: Record<string, React.CSSProperties>;
  header?: string;
  className?: string;
};

export function Google({
  width = 652,
  header = "Color picker",
  styles: passedStyles = {},
  className = "",
}: GooglePickerProps) {
  const { colors, changeColor } = useColor();
  const { rgb, hex, hsl, hsv } = colors;

  const styles = merge<
    Record<string, React.CSSProperties>,
    Record<string, React.CSSProperties>
  >(
    {
      picker: {
        width,
        background: "#fff",
        border: "1px solid #dfe1e5",
        boxSizing: "initial",
        display: "flex",
        flexWrap: "wrap",
        borderRadius: "8px 8px 0px 0px",
      },
      head: {
        height: "57px",
        width: "100%",
        paddingTop: "16px",
        paddingBottom: "16px",
        paddingLeft: "16px",
        fontSize: "20px",
        boxSizing: "border-box",
        fontFamily: "Roboto-Regular,HelveticaNeue,Arial,sans-serif",
      },
      saturation: {
        width: "70%",
        padding: "0px",
        position: "relative",
        overflow: "hidden",
      },
      swatch: {
        width: "30%",
        height: "228px",
        padding: "0px",
        background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`,
        position: "relative",
        overflow: "hidden",
      },
      body: {
        margin: "auto",
        width: "95%",
      },
      controls: {
        display: "flex",
        boxSizing: "border-box",
        height: "52px",
        paddingTop: "22px",
      },
      color: {
        width: "32px",
      },
      hue: {
        height: "8px",
        position: "relative",
        margin: "0px 16px 0px 16px",
        width: "100%",
      },
      Hue: {
        borderRadius: "2px",
      },
    },
    passedStyles
  );

  return (
    <div style={styles.picker} className={`google-picker ${className}`}>
      <div style={styles.head}>{header}</div>
      <div style={styles.swatch} />
      <div style={styles.saturation}>
        <Saturation
          hsl={hsl}
          hsv={hsv}
          pointer={<GooglePointerCircle hsl={hsl} />}
          onChange={changeColor}
        />
      </div>
      <div style={styles.body}>
        <div style={styles.controls} className="flexbox-fix">
          <div style={styles.hue}>
            <Hue
              style={styles.Hue}
              hsl={hsl}
              radius="4px"
              pointer={GooglePointer}
              onChange={changeColor}
            />
          </div>
        </div>
        <GoogleFields
          rgb={rgb}
          hsl={hsl}
          hex={hex}
          hsv={hsv}
          onChange={changeColor}
        />
      </div>
    </div>
  );
}

export default withColorProvider(Google);
