import React from "react";
import { HslColor } from "../../types/colors";

type Props = {
  hsl: HslColor;
  onClick: any;
  offset: number;
  active?: boolean;
  first?: boolean;
  last?: boolean;
};

export default function SliderSwatch({
  hsl,
  offset,
  onClick = () => {},
  active,
  first,
  last,
}: Props) {
  const styles: Record<string, React.CSSProperties> = {
    swatch: {
      height: "12px",
      background: `hsl(${hsl.h}, 50%, ${offset * 100}%)`,
      cursor: "pointer",
      borderRadius: active
        ? "3.6px/2px"
        : first
        ? "2px 0 0 2px"
        : last
        ? "0 2px 2px 0"
        : undefined,
      transform: active ? "scaleY(1.8)" : undefined,
    },
  };

  const handleClick = (e: React.MouseEvent) =>
    onClick(
      {
        h: hsl.h,
        s: 0.5,
        l: offset,
        source: "hsl",
      },
      e
    );

  return <div style={styles.swatch} onClick={handleClick} />;
}
