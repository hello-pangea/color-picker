import React from "react";
import { Color, Hex } from "../../types/colors";
import SwatchesColor from "./SwatchesColor";

type Props = {
  onClick: (color: Color, event: React.MouseEvent) => void;
  onSwatchHover?: (color: Color, event: React.MouseEvent) => void;
  active: Hex;
  group: string[];
};

export default function SwatchesGroup({
  onClick,
  onSwatchHover,
  group,
  active,
}: Props) {
  const styles: Record<string, React.CSSProperties> = {
    group: {
      paddingBottom: "10px",
      width: "40px",
      float: "left",
      marginRight: "10px",
    },
  };

  return (
    <div style={styles.group}>
      {group.map((color, i) => (
        <SwatchesColor
          key={color}
          color={color}
          active={color.toLowerCase() === active}
          first={i === 0}
          last={i === group.length - 1}
          onClick={onClick}
          onSwatchHover={onSwatchHover}
        />
      ))}
    </div>
  );
}
