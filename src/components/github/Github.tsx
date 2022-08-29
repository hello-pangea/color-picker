import map from "lodash/map";
import merge from "lodash/merge";
import React from "react";
import reactCSS from "reactcss";
import { useColor, withColorProvider } from "../../context/useColor";
import { Color, Hex } from "../../types/colors";
import GithubSwatch from "./GithubSwatch";

type Props = {
  width?: string | number;
  styles?: React.CSSProperties;
  className?: string;
  triangle?: "hide" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  colors?: string[];
  onSwatchHover?: (color: Color, event: React.MouseEvent) => void;
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
  onSwatchHover,
  triangle = "top-left",
  styles: passedStyles = {},
  className = "",
}: Props) {
  const { changeColor } = useColor();

  const styles = reactCSS<any>(
    merge(
      {
        default: {
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
          },
          triangleShadow: {
            position: "absolute",
            border: "8px solid transparent",
            borderBottomColor: "rgba(0,0,0,0.15)",
          },
        },
        "hide-triangle": {
          triangle: {
            display: "none",
          },
          triangleShadow: {
            display: "none",
          },
        },
        "top-left-triangle": {
          triangle: {
            top: "-14px",
            left: "10px",
          },
          triangleShadow: {
            top: "-16px",
            left: "9px",
          },
        },
        "top-right-triangle": {
          triangle: {
            top: "-14px",
            right: "10px",
          },
          triangleShadow: {
            top: "-16px",
            right: "9px",
          },
        },
        "bottom-left-triangle": {
          triangle: {
            top: "35px",
            left: "10px",
            transform: "rotate(180deg)",
          },
          triangleShadow: {
            top: "37px",
            left: "9px",
            transform: "rotate(180deg)",
          },
        },
        "bottom-right-triangle": {
          triangle: {
            top: "35px",
            right: "10px",
            transform: "rotate(180deg)",
          },
          triangleShadow: {
            top: "37px",
            right: "9px",
            transform: "rotate(180deg)",
          },
        },
      },
      passedStyles as any
    ),
    {
      "hide-triangle": triangle === "hide",
      "top-left-triangle": triangle === "top-left",
      "top-right-triangle": triangle === "top-right",
      "bottom-left-triangle": triangle === "bottom-left",
      "bottom-right-triangle": triangle === "bottom-right",
    }
  );

  const handleChange = (hex: Hex, e: React.MouseEvent) =>
    changeColor({ hex, source: "hex" }, e);

  return (
    <div style={styles.card} className={`github-picker ${className}`}>
      <div style={styles.triangleShadow} />
      <div style={styles.triangle} />
      {map(colors, (c) => (
        <GithubSwatch
          color={c}
          key={c}
          onClick={handleChange}
          onSwatchHover={onSwatchHover}
        />
      ))}
    </div>
  );
}

export default withColorProvider(Github);
