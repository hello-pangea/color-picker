import React from "react";
import { HslColor } from "../../types/colors";

type Props = {
  hsl: HslColor;
};

export default function PhotoshopPointerCircle({ hsl }: Props) {
  return (
    <div
      style={{
        width: "12px",
        height: "12px",
        borderRadius: "6px",
        boxShadow:
          hsl.l > 0.5 ? "inset 0 0 0 1px #000" : "inset 0 0 0 1px #fff",
        transform: "translate(-6px, -6px)",
      }}
    />
  );
}
