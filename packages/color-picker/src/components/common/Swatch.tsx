import React from "react";
import { useColor } from "../../context/useColor";
import { handleFocus } from "../../helpers/interaction";
import Checkboard from "./Checkboard";

const ENTER = 13;

export type SwatchProps = {
  color: string;
  style?: React.CSSProperties;
  onClick: any;
  title?: string;
  children?: React.ReactNode;
  focus?: any;
  focusStyle?: React.CSSProperties;
};

export const Swatch = ({
  color,
  style,
  onClick = () => {},
  title = color,
  children,
  focus,
  focusStyle = {},
}: SwatchProps) => {
  const { onSwatchHover } = useColor();

  const transparent = color === "transparent";
  const styles: Record<string, React.CSSProperties> = {
    swatch: {
      background: color,
      height: "100%",
      width: "100%",
      cursor: "pointer",
      position: "relative",
      outline: "none",
      ...style,
      ...(focus ? focusStyle : {}),
    },
  };

  const handleClick = (e: React.MouseEvent) => onClick(color, e);
  const handleKeyDown = (e: React.KeyboardEvent) =>
    e.keyCode === ENTER && onClick(color, e);

  return (
    <div
      style={styles.swatch}
      onClick={handleClick}
      title={title}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseOver={(event) => {
        onSwatchHover && onSwatchHover(color, event);
      }}
    >
      {children}
      {transparent && (
        <Checkboard
          borderRadius={styles.swatch.borderRadius}
          boxShadow="inset 0 0 0 1px rgba(0,0,0,0.1)"
        />
      )}
    </div>
  );
};

export default handleFocus(Swatch);
