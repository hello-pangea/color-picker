import merge from "lodash/merge";
import React from "react";
import { useColor, withColorProvider } from "../../context/useColor";
import { Alpha, Checkboard, Hue, Saturation } from "../common";
import ChromeFields from "./ChromeFields";
import ChromePointer from "./ChromePointer";
import ChromePointerCircle from "./ChromePointerCircle";

export type ChromePickerProps = {
  width?: string | number;
  disableAlpha?: boolean;
  styles?: Record<string, React.CSSProperties>;
  renderers?: any;
  className?: string;
  defaultView?: "hex" | "rgb" | "hsl";
};

export const Chrome = ({
  width = 225,
  disableAlpha = false,
  renderers,
  styles: passedStyles = {},
  className = "",
  defaultView,
}: ChromePickerProps) => {
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
        borderRadius: "2px",
        boxShadow: "0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3)",
        boxSizing: "initial",
        fontFamily: "Menlo",
      },
      saturation: {
        width: "100%",
        paddingBottom: "55%",
        position: "relative",
        borderRadius: "2px 2px 0 0",
        overflow: "hidden",
      },
      Saturation: {
        borderRadius: "2px 2px 0 0",
      },
      body: {
        padding: "16px 16px 12px",
      },
      controls: {
        display: "flex",
      },
      color: {
        width: disableAlpha ? "22px" : "32px",
      },
      swatch: {
        marginTop: disableAlpha ? "0px" : "6px",
        width: disableAlpha ? "10px" : "16px",
        height: disableAlpha ? "10px" : "16px",
        borderRadius: "8px",
        position: "relative",
        overflow: "hidden",
      },
      active: {
        position: "absolute",
        inset: "0px",
        borderRadius: "8px",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,.1)",
        background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`,
        zIndex: "2",
      },
      toggles: {
        flex: "1",
      },
      hue: {
        height: "10px",
        position: "relative",
        marginBottom: disableAlpha ? "0px" : "8px",
      },
      Hue: {
        borderRadius: "2px",
      },
      alpha: {
        height: "10px",
        position: "relative",
        display: disableAlpha ? "none" : undefined,
      },
      Alpha: {
        borderRadius: "2px",
      },
    },
    passedStyles
  );

  return (
    <div style={styles.picker} className={`chrome-picker ${className}`}>
      <div style={styles.saturation}>
        <Saturation
          style={styles.Saturation}
          hsl={hsl}
          hsv={hsv}
          pointer={<ChromePointerCircle />}
          onChange={changeColor}
        />
      </div>
      <div style={styles.body}>
        <div style={styles.controls} className="flexbox-fix">
          <div style={styles.color}>
            <div style={styles.swatch}>
              <div style={styles.active} />
              <Checkboard renderers={renderers} />
            </div>
          </div>
          <div style={styles.toggles}>
            <div style={styles.hue}>
              <Hue
                style={styles.Hue}
                hsl={hsl}
                pointer={ChromePointer}
                onChange={changeColor}
              />
            </div>
            <div style={styles.alpha}>
              <Alpha
                style={styles.Alpha}
                rgb={rgb}
                hsl={hsl}
                pointer={ChromePointer}
                renderers={renderers}
                onChange={changeColor}
              />
            </div>
          </div>
        </div>
        <ChromeFields
          rgb={rgb}
          hsl={hsl}
          hex={hex}
          view={defaultView}
          onChange={changeColor}
        />
      </div>
    </div>
  );
};

export default withColorProvider(Chrome);
