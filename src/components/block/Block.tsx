import merge from "lodash/merge";
import React from "react";
import { useColor, withColorProvider } from "../../context/useColor";
import * as color from "../../helpers/color";
import { HexColor } from "../../types/colors";
import { Checkboard, EditableInput } from "../common";
import BlockSwatches from "./BlockSwatches";

export type BlockPickerProps = {
  width?: string | number;
  colors?: string[];
  triangle?: "top" | "hide";
  className?: string;
  styles?: Record<string, React.CSSProperties>;
};

export const Block = ({
  colors = [
    "#D9E3F0",
    "#F47373",
    "#697689",
    "#37D67A",
    "#2CCCE4",
    "#555555",
    "#dce775",
    "#ff8a65",
    "#ba68c8",
  ],
  width = 170,
  triangle = "top",
  styles: passedStyles = {},
  className = "",
}: BlockPickerProps) => {
  const { colors: currentColors, changeColor } = useColor();
  const { hex } = currentColors;

  const transparent = hex === "transparent";
  const handleChange = (hexCode: HexColor, e: React.MouseEvent) => {
    color.isValidHex(hexCode) &&
      changeColor(
        {
          hex: hexCode,
          source: "hex",
        },
        e
      );
  };

  const styles = merge<
    Record<string, React.CSSProperties>,
    Record<string, React.CSSProperties>
  >(
    {
      card: {
        width,
        background: "#fff",
        boxShadow: "0 1px rgba(0,0,0,.1)",
        borderRadius: "6px",
        position: "relative",
      },
      head: {
        height: "110px",
        background: hex,
        borderRadius: "6px 6px 0 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      },
      body: {
        padding: "10px",
      },
      label: {
        fontSize: "18px",
        color: color.getContrastingColor(hex),
        position: "relative",
      },
      triangle: {
        width: "0px",
        height: "0px",
        borderStyle: "solid",
        borderWidth: "0 10px 10px 10px",
        borderColor: `transparent transparent ${hex} transparent`,
        position: "absolute",
        top: "-10px",
        left: "50%",
        marginLeft: "-10px",
        display: triangle === "hide" ? "none" : undefined,
      },
      input: {
        width: "100%",
        fontSize: "12px",
        color: "#666",
        border: "0px",
        outline: "none",
        height: "22px",
        boxShadow: "inset 0 0 0 1px #ddd",
        borderRadius: "4px",
        padding: "0 7px",
        boxSizing: "border-box",
      },
    },
    passedStyles
  );

  return (
    <div style={styles.card} className={`block-picker ${className}`}>
      <div style={styles.triangle} />

      <div style={styles.head}>
        {transparent && <Checkboard borderRadius="6px 6px 0 0" />}
        <div style={styles.label}>{hex}</div>
      </div>

      <div style={styles.body}>
        <BlockSwatches colors={colors} onClick={handleChange} />
        <EditableInput
          style={{ input: styles.input }}
          value={hex}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default withColorProvider(Block);
