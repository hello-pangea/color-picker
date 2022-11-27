import React from "react";
import { HslColor } from "../../types/colors";

type Props = {
  hsl?: HslColor;
};

export default function GooglePointer({
  hsl = { a: 1, h: 249.94, l: 0.2, s: 0.5 },
}: Props) {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "22px",
        transform: "translate(-10px, -7px)",
        background: `hsl(${Math.round(hsl.h)}, 100%, 50%)`,
        border: "2px white solid",
      }}
    />
  );
}
