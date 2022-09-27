import merge from "lodash/merge";
import React from "react";

export type RaisedProps = {
  background?: string;
  zDepth?: 0 | 1 | 2 | 3 | 4 | 5;
  radius?: number;
  styles?: Record<string, React.CSSProperties>;
  children?: React.ReactNode;
};

export default function Raised({
  zDepth = 1,
  radius = 2,
  background = "#fff",
  children,
  styles: passedStyles = {},
}: RaisedProps) {
  const styles = merge<
    Record<string, React.CSSProperties>,
    Record<string, React.CSSProperties>
  >(
    {
      wrap: {
        position: "relative",
        display: "inline-block",
      },
      content: {
        position: "relative",
      },
      bg: {
        position: "absolute",
        inset: "0px",
        boxShadow:
          zDepth === 1
            ? "0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16)"
            : `0 ${zDepth}px ${zDepth * 4}px rgba(0,0,0,.24)`,
        borderRadius: radius,
        background,
      },
    },
    passedStyles
  );

  return (
    <div style={styles.wrap}>
      <div style={styles.bg} />
      <div style={styles.content}>{children}</div>
    </div>
  );
}
