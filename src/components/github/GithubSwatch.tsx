import React from "react";
// @ts-ignore
import reactCSS, { handleHover } from "reactcss";
import { ChangeColor } from "../../context/useColor";
import { Color } from "../../types/colors";
import { Swatch } from "../common";

type Props = {
  hover?: any;
  color: string;
  onSwatchHover?: (color: Color, event: React.MouseEvent) => void;
  onClick?: (newColor: ChangeColor, event: React.MouseEvent) => void;
};

export function GithubSwatch({ hover, color, onClick, onSwatchHover }: Props) {
  const hoverSwatch = {
    position: "relative",
    zIndex: "2",
    outline: "2px solid #fff",
    boxShadow: "0 0 5px 2px rgba(0,0,0,0.25)",
  };

  const styles = reactCSS<any>(
    {
      default: {
        swatch: {
          width: "25px",
          height: "25px",
          fontSize: "0",
        },
      },
      hover: {
        swatch: hoverSwatch,
      },
    },
    { hover }
  );

  return (
    <div style={styles.swatch}>
      <Swatch
        color={color}
        onClick={onClick}
        onHover={onSwatchHover}
        focusStyle={hoverSwatch}
      />
    </div>
  );
}

export default handleHover(GithubSwatch);
