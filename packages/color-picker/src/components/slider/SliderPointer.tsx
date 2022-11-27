import React from "react";

export default function SliderPointer() {
  const styles: Record<string, React.CSSProperties> = {
    picker: {
      width: "14px",
      height: "14px",
      borderRadius: "6px",
      transform: "translate(-7px, -1px)",
      backgroundColor: "rgb(248, 248, 248)",
      boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.37)",
    },
  };

  return <div style={styles.picker} />;
}
