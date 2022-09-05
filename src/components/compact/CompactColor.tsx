import React from "react";
import * as colorUtils from "../../helpers/color";
import { Swatch } from "../common";

type Props = {
  color: string;
  active: boolean;
  onClick: any;
};

export default function CompactColor({
  color,
  onClick = () => {},
  active,
}: Props) {
  const styles: Record<string, React.CSSProperties> = {
    color: {
      background: color,
      width: "15px",
      height: "15px",
      float: "left",
      marginRight: "5px",
      marginBottom: "5px",
      position: "relative",
      cursor: "pointer",
      boxShadow: color === "#FFFFFF" ? "inset 0 0 0 1px #ddd" : undefined,
    },
    dot: {
      position: "absolute",
      inset: "5px",
      background:
        color === "#FFFFFF"
          ? "#000"
          : color === "transparent"
          ? "#000"
          : colorUtils.getContrastingColor(color),
      borderRadius: "50%",
      opacity: active ? 1 : 0,
    },
  };

  return (
    <Swatch
      style={styles.color}
      color={color}
      onClick={onClick}
      focusStyle={{ boxShadow: `0 0 4px ${color}` }}
    >
      <div style={styles.dot} />
    </Swatch>
  );
}
