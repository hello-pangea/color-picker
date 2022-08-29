import React from "react";
import reactCSS from "reactcss";
import * as colorUtils from "../../helpers/color";
// @ts-ignore
import CheckIcon from "@icons/material/CheckIcon";
import { Color } from "../../types/colors";
import { Swatch } from "../common";

type Props = {
  color: string;
  onClick: (color: Color, event: React.MouseEvent) => void;
  onSwatchHover?: (color: Color, event: React.MouseEvent) => void;
  first: boolean;
  last: boolean;
  active: boolean;
};

export default function SwatchesColor({
  color,
  onClick = () => {},
  onSwatchHover,
  first,
  last,
  active,
}: Props) {
  const styles = reactCSS<any>(
    {
      default: {
        color: {
          width: "40px",
          height: "24px",
          cursor: "pointer",
          background: color,
          marginBottom: "1px",
        },
        check: {
          color: colorUtils.getContrastingColor(color),
          marginLeft: "8px",
          display: "none",
        },
      },
      first: {
        color: {
          overflow: "hidden",
          borderRadius: "2px 2px 0 0",
        },
      },
      last: {
        color: {
          overflow: "hidden",
          borderRadius: "0 0 2px 2px",
        },
      },
      active: {
        check: {
          display: "block",
        },
      },
      "color-#FFFFFF": {
        color: {
          boxShadow: "inset 0 0 0 1px #ddd",
        },
        check: {
          color: "#333",
        },
      },
      transparent: {
        check: {
          color: "#333",
        },
      },
    },
    {
      first,
      last,
      active,
      "color-#FFFFFF": color === "#FFFFFF",
      transparent: color === "transparent",
    }
  );

  return (
    <Swatch
      color={color}
      style={styles.color}
      onClick={onClick}
      onHover={onSwatchHover}
      focusStyle={{ boxShadow: `0 0 4px ${color}` }}
    >
      <div style={styles.check}>
        <CheckIcon />
      </div>
    </Swatch>
  );
}
