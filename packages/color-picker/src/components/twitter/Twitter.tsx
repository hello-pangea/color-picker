import merge from "lodash/merge";
import React from "react";
import { useColor, withColorProvider } from "../../context/useColor";
import * as color from "../../helpers/color";
import { EditableInput, Swatch } from "../common";

export type TwitterPickerProps = {
  width?: string | number;
  triangle?: "hide" | "top-left" | "top-right";
  colors?: string[];
  styles?: Record<string, React.CSSProperties>;
  className?: string;
};

export const Twitter = ({
  colors = [
    "#FF6900",
    "#FCB900",
    "#7BDCB5",
    "#00D084",
    "#8ED1FC",
    "#0693E3",
    "#ABB8C3",
    "#EB144C",
    "#F78DA7",
    "#9900EF",
  ],
  width = 276,
  triangle = "top-left",
  styles: passedStyles = {},
  className = "",
}: TwitterPickerProps) => {
  const { colors: currentColors, changeColor } = useColor();
  const { hex } = currentColors;

  const styles = merge<
    Record<string, React.CSSProperties>,
    Record<string, React.CSSProperties>
  >(
    {
      card: {
        width,
        background: "#fff",
        border: "0 solid rgba(0,0,0,0.25)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
        borderRadius: "4px",
        position: "relative",
      },
      body: {
        padding: "15px 9px 9px 15px",
      },
      label: {
        fontSize: "18px",
        color: "#fff",
      },
      triangle: {
        width: "0px",
        height: "0px",
        borderStyle: "solid",
        borderWidth: "0 9px 10px 9px",
        borderColor: "transparent transparent #fff transparent",
        position: "absolute",
        display: triangle === "hide" ? "none" : undefined,
        top:
          triangle === "top-left" || triangle === "top-right"
            ? "-10px"
            : undefined,
        left:
          triangle === "top-left" || triangle === "top-right"
            ? "12px"
            : undefined,
      },
      triangleShadow: {
        width: "0px",
        height: "0px",
        borderStyle: "solid",
        borderWidth: "0 9px 10px 9px",
        borderColor: "transparent transparent rgba(0,0,0,.1) transparent",
        position: "absolute",
        display: triangle === "hide" ? "none" : undefined,
        top:
          triangle === "top-left" || triangle === "top-right"
            ? "-11px"
            : undefined,
        left:
          triangle === "top-left" || triangle === "top-right"
            ? "12px"
            : undefined,
      },
      hash: {
        background: "#F0F0F0",
        height: "30px",
        width: "30px",
        borderRadius: "4px 0 0 4px",
        float: "left",
        color: "#98A1A4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      input: {
        width: "100px",
        fontSize: "14px",
        color: "#666",
        border: "0px",
        outline: "none",
        height: "28px",
        boxShadow: "inset 0 0 0 1px #F0F0F0",
        boxSizing: "content-box",
        borderRadius: "0 4px 4px 0",
        float: "left",
        paddingLeft: "8px",
      },
      swatch: {
        width: "30px",
        height: "30px",
        float: "left",
        borderRadius: "4px",
        margin: "0 6px 6px 0",
      },
      clear: {
        clear: "both",
      },
    },
    passedStyles
  );

  const handleChange = (hexcode: string, e: React.MouseEvent) => {
    color.isValidHex(hexcode) &&
      changeColor(
        {
          hex: hexcode,
          source: "hex",
        },
        e
      );
  };

  return (
    <div style={styles.card} className={`twitter-picker ${className}`}>
      <div style={styles.triangleShadow} />
      <div style={styles.triangle} />

      <div style={styles.body}>
        {colors.map((c, i) => {
          return (
            <Swatch
              key={i}
              color={c}
              hex={c}
              style={styles.swatch}
              onClick={handleChange}
              focusStyle={{
                boxShadow: `0 0 4px ${c}`,
              }}
            />
          );
        })}
        <div style={styles.hash}>#</div>
        <EditableInput
          label={null}
          style={{ input: styles.input }}
          value={hex.replace("#", "")}
          onChange={handleChange}
        />
        <div style={styles.clear} />
      </div>
    </div>
  );
};

export default withColorProvider(Twitter);
