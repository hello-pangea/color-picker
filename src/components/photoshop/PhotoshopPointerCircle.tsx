import React from "react";
import reactCSS from "reactcss";
import { Hsl } from "../../types/colors";

type Props = {
  hsl: Hsl;
};

export default function PhotoshopPointerCircle({ hsl }: Props) {
  const styles = reactCSS<any>(
    {
      default: {
        picker: {
          width: "12px",
          height: "12px",
          borderRadius: "6px",
          boxShadow: "inset 0 0 0 1px #fff",
          transform: "translate(-6px, -6px)",
        },
      },
      "black-outline": {
        picker: {
          boxShadow: "inset 0 0 0 1px #000",
        },
      },
    },
    { "black-outline": hsl.l > 0.5 }
  );

  return <div style={styles.picker} />;
}
