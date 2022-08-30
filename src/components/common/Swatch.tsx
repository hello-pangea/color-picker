import React from "react";
import { handleFocus } from "../../helpers/interaction";
import Checkboard from "./Checkboard";

const ENTER = 13;

type Props = {
  color: string;
  style?: React.CSSProperties;
  onClick: any;
  onHover: any;
  title?: string;
  children?: React.ReactNode;
  focus?: any;
  focusStyle?: React.CSSProperties;
};

export const Swatch = ({
  color,
  style,
  onClick = () => {},
  onHover,
  title = color,
  children,
  focus,
  focusStyle = {},
}: Props) => {
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
  const handleHover = (e: React.MouseEvent) => onHover(color, e);

  const optionalEvents: any = {};
  if (onHover) {
    optionalEvents.onMouseOver = handleHover;
  }

  return (
    <div
      style={styles.swatch}
      onClick={handleClick}
      title={title}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...optionalEvents}
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
