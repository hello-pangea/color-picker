import React from "react";

export default function ChromePointerCircle() {
  const styles: Record<string, React.CSSProperties> = {
    picker: {
      width: "12px",
      height: "12px",
      borderRadius: "6px",
      boxShadow: "inset 0 0 0 1px #fff",
      transform: "translate(-6px, -6px)",
    },
  };

  return <div style={styles.picker} />;
}
