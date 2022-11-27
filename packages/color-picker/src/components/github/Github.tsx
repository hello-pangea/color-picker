import merge from "lodash/merge";
import React from "react";
import { useColor, withColorProvider } from "../../context/useColor";
import { HexColor } from "../../types/colors";
import GithubSwatch from "./GithubSwatch";

export type GithubPickerProps = {
  width?: string | number;
  styles?: Record<string, React.CSSProperties>;
  className?: string;
  triangle?: "hide" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  colors?: string[];
};

export function Github({
  width = 200,
  colors = [
    "#B80000",
    "#DB3E00",
    "#FCCB00",
    "#008B02",
    "#006B76",
    "#1273DE",
    "#004DCF",
    "#5300EB",
    "#EB9694",
    "#FAD0C3",
    "#FEF3BD",
    "#C1E1C5",
    "#BEDADC",
    "#C4DEF6",
    "#BED3F3",
    "#D4C4FB",
  ],
  triangle = "top-left",
  styles: passedStyles = {},
  className = "",
}: GithubPickerProps) {
  const { changeColor } = useColor();

  const styles = merge<
    Record<string, React.CSSProperties>,
    Record<string, React.CSSProperties>
  >(
    {
      card: {
        width,
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.2)",
        boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
        borderRadius: "4px",
        position: "relative",
        padding: "5px",
        display: "flex",
        flexWrap: "wrap",
      },
      triangle: {
        position: "absolute",
        border: "7px solid transparent",
        borderBottomColor: "#fff",
        display: triangle === "hide" ? "none" : undefined,
        top:
          triangle === "top-left" || triangle === "top-right"
            ? "-14px"
            : "37px",
        left:
          triangle === "top-left" || triangle === "bottom-left"
            ? "10px"
            : undefined,
        right:
          triangle === "top-right" || triangle === "bottom-right"
            ? "10px"
            : undefined,
        transform:
          triangle === "bottom-left" || triangle === "bottom-right"
            ? "rotate(180deg)"
            : undefined,
      },
      triangleShadow: {
        position: "absolute",
        border: "8px solid transparent",
        borderBottomColor: "rgba(0,0,0,0.15)",
        display: triangle === "hide" ? "none" : undefined,
        top:
          triangle === "top-left" || triangle === "top-right"
            ? "-16px"
            : "35px",
        left:
          triangle === "top-left" || triangle === "bottom-left"
            ? "9px"
            : undefined,
        right:
          triangle === "top-right" || triangle === "bottom-right"
            ? "9px"
            : undefined,
        transform:
          triangle === "bottom-left" || triangle === "bottom-right"
            ? "rotate(180deg)"
            : undefined,
      },
    },
    passedStyles
  );

  const handleChange = (hex: HexColor, e: React.MouseEvent) =>
    changeColor({ hex, source: "hex" }, e);

  return (
    <div style={styles.card} className={`github-picker ${className}`}>
      <div style={styles.triangleShadow} />
      <div style={styles.triangle} />
      {colors.map((c) => (
        <GithubSwatch color={c} key={c} onClick={handleChange} />
      ))}
    </div>
  );
}

export default withColorProvider(Github);
