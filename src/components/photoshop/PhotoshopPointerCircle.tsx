import React from "react";
import { Hsl } from "../../types/colors";

type Props = {
  hsl: Hsl;
};

export default function PhotoshopPointerCircle({ hsl }: Props) {
  const styles: Record<string, React.CSSProperties> = {
    picker: {
      width: "12px",
      height: "12px",
      borderRadius: "6px",
      boxShadow: hsl.l > 0.5 ? "inset 0 0 0 1px #000" : "inset 0 0 0 1px #fff",
      transform: "translate(-6px, -6px)",
    },
  };

  return <div style={styles.picker} />;
}
