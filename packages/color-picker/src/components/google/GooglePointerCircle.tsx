import React from "react";
import { HslColor } from "../../types/colors";

type Props = {
  hsl?: HslColor;
};

export default function GooglePointerCircle({
  hsl = { a: 1, h: 249.94, l: 0.2, s: 0.5 },
}: Props) {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "22px",
        border: "2px #fff solid",
        transform: "translate(-12px, -13px)",
        background: `hsl(${Math.round(hsl.h)}, ${Math.round(
          hsl.s * 100
        )}%, ${Math.round(hsl.l * 100)}%)`,
      }}
    />
  );
}
