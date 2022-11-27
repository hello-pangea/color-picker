import React from "react";
import CheckIcon from "../../../icons/check.svg";
import * as colorUtils from "../../helpers/color";
import { Color } from "../../types/colors";
import { Swatch } from "../common";

type Props = {
  color: string;
  onClick: (color: Color, event: React.MouseEvent) => void;
  first: boolean;
  last: boolean;
  active: boolean;
};

export default function SwatchesColor({
  color,
  onClick = () => {},
  first,
  last,
  active,
}: Props) {
  const styles: Record<string, React.CSSProperties> = {
    color: {
      width: "40px",
      height: "24px",
      cursor: "pointer",
      background: color,
      marginBottom: "1px",
      overflow: first || last ? "hidden" : undefined,
      borderRadius: first ? "2px 2px 0 0" : last ? "0 0 2px 2px" : undefined,
      boxShadow: color === "#FFFFFF" ? "inset 0 0 0 1px #ddd" : undefined,
    },
    check: {
      color:
        color === "#FFFFFF" || color === "transparent"
          ? "#333"
          : colorUtils.getContrastingColor(color),
      marginLeft: "8px",
      display: active ? "block" : "none",
    },
  };

  return (
    <Swatch
      color={color}
      style={styles.color}
      onClick={onClick}
      focusStyle={{ boxShadow: `0 0 4px ${color}` }}
    >
      <div style={styles.check}>
        <img
          width="24"
          height="24"
          style={{ fill: "white", stroke: "white" }}
          src={CheckIcon}
        />
      </div>
    </Swatch>
  );
}
