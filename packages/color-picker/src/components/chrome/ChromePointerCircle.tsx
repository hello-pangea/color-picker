import React from "react";

export default function ChromePointerCircle() {
  return (
    <div
      style={{
        width: "12px",
        height: "12px",
        borderRadius: "6px",
        boxShadow: "inset 0 0 0 1px #fff",
        transform: "translate(-6px, -6px)",
      }}
    />
  );
}
