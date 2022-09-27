import React, { isValidElement } from "react";
import * as checkboard from "../../helpers/checkboard";

export type CheckboardProps = {
  size?: number;
  white?: string;
  grey?: string;
  renderers?: any;
  borderRadius?: string | number;
  boxShadow?: string;
  children?: React.ReactNode;
};

export default function Checkboard({
  white = "transparent",
  grey = "rgba(0,0,0,.08)",
  size = 8,
  renderers = {},
  borderRadius,
  boxShadow,
  children,
}: CheckboardProps) {
  const styles: Record<string, React.CSSProperties> = {
    grid: {
      borderRadius,
      boxShadow,
      position: "absolute",
      inset: "0px",
      background: `url(${checkboard.get(
        white,
        grey,
        size,
        renderers.canvas
      )}) center left`,
    },
  };

  return isValidElement(children) ? (
    React.cloneElement(children, {
      ...children.props,
      style: { ...children.props.style, ...styles.grid },
    })
  ) : (
    <div style={styles.grid} />
  );
}
