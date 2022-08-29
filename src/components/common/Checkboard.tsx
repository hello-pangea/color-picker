import React, { isValidElement } from "react";
import reactCSS from "reactcss";
import * as checkboard from "../../helpers/checkboard";

type Props = {
  size?: number;
  white?: string;
  grey?: string;
  renderers?: any;
  borderRadius?: string;
  boxShadow?: string;
  children?: React.ReactNode;
};

export default function Checkboard({
  white = "transparent",
  grey = "rgba(0,0,0,.08)",
  size = 8,
  renderers,
  borderRadius,
  boxShadow,
  children,
}: Props) {
  const styles = reactCSS<any>({
    default: {
      grid: {
        borderRadius,
        boxShadow,
        absolute: "0px 0px 0px 0px",
        background: `url(${checkboard.get(
          white,
          grey,
          size,
          renderers.canvas
        )}) center left`,
      },
    },
  });
  return isValidElement(children) ? (
    React.cloneElement(children, {
      ...children.props,
      style: { ...children.props.style, ...styles.grid },
    })
  ) : (
    <div style={styles.grid} />
  );
}
