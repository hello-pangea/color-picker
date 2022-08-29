import React from "react";
import reactCSS from "reactcss";
import * as colorUtils from "../../helpers/color";
import { Color } from "../../types/colors";
import { Swatch } from "../common";

type Props = {
  onSwatchHover?: (color: Color, event: React.MouseEvent) => void;
  color: string;
  active: boolean;
  onClick: any;
};

export default function CompactColor({
  color,
  onClick = () => {},
  onSwatchHover,
  active,
}: Props) {
  const styles = reactCSS<any>(
    {
      default: {
        color: {
          background: color,
          width: "15px",
          height: "15px",
          float: "left",
          marginRight: "5px",
          marginBottom: "5px",
          position: "relative",
          cursor: "pointer",
        },
        dot: {
          absolute: "5px 5px 5px 5px",
          background: colorUtils.getContrastingColor(color),
          borderRadius: "50%",
          opacity: "0",
        },
      },
      active: {
        dot: {
          opacity: "1",
        },
      },
      "color-#FFFFFF": {
        color: {
          boxShadow: "inset 0 0 0 1px #ddd",
        },
        dot: {
          background: "#000",
        },
      },
      transparent: {
        dot: {
          background: "#000",
        },
      },
    },
    {
      active,
      "color-#FFFFFF": color === "#FFFFFF",
      transparent: color === "transparent",
    }
  );

  return (
    <Swatch
      style={styles.color}
      color={color}
      onClick={onClick}
      onHover={onSwatchHover}
      focusStyle={{ boxShadow: `0 0 4px ${color}` }}
    >
      <div style={styles.dot} />
    </Swatch>
  );
}
