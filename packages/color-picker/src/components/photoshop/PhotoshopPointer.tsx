import React from "react";

export default function PhotoshopPointerCircle() {
  const triangleStyles: React.CSSProperties = {
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderWidth: "4px 0 4px 6px",
    borderColor: "transparent transparent transparent #fff",
    position: "absolute",
    top: "1px",
    left: "1px",
  };

  const triangleBorderStyles: React.CSSProperties = {
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderWidth: "5px 0 5px 8px",
    borderColor: "transparent transparent transparent #555",
  };

  const styles: Record<string, React.CSSProperties> = {
    left: {
      ...triangleBorderStyles,
      transform: "translate(-13px, -4px)",
    },
    leftInside: {
      ...triangleStyles,
      transform: "translate(-8px, -5px)",
    },

    right: {
      ...triangleBorderStyles,
      transform: "translate(20px, -14px) rotate(180deg)",
    },
    rightInside: {
      ...triangleStyles,
      transform: "translate(-8px, -5px)",
    },
  };

  return (
    <div style={styles.pointer}>
      <div style={styles.left}>
        <div style={styles.leftInside} />
      </div>

      <div style={styles.right}>
        <div style={styles.rightInside} />
      </div>
    </div>
  );
}
