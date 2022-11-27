import merge from "lodash/merge";
import React from "react";
import { useColor, withColorProvider } from "../../context/useColor";
import { HexColor } from "../../types/colors";
import CircleSwatch from "./CircleSwatch";

export type CirclePickerProps = {
  width?: string | number;
  circleSize?: number;
  circleSpacing?: number;
  className?: string;
  colors?: string[];
  styles?: Record<string, React.CSSProperties>;
};

export function Circle({
  width = 252,
  colors = [
    "#F44336",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#3F51B5",
    "#2196F3",
    "#03A9F4",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#8BC34A",
    "#CDDC39",
    "#FFEB3B",
    "#FFC107",
    "#FF9800",
    "#FF5722",
    "#795548",
    "#607D8B",
  ],
  circleSize = 28,
  styles: passedStyles = {},
  circleSpacing = 14,
  className = "",
}: CirclePickerProps) {
  const { colors: currentColors, changeColor } = useColor();
  const { hex } = currentColors;

  const styles = merge<
    Record<string, React.CSSProperties>,
    Record<string, React.CSSProperties>
  >(
    {
      card: {
        width,
        display: "flex",
        flexWrap: "wrap",
        marginRight: -circleSpacing,
        marginBottom: -circleSpacing,
      },
    },
    passedStyles
  );

  const handleChange = (hexCode: HexColor, e: React.MouseEvent) =>
    changeColor({ hex: hexCode, source: "hex" }, e);

  return (
    <div style={styles.card} className={`circle-picker ${className}`}>
      {colors.map((c) => (
        <CircleSwatch
          key={c}
          color={c}
          onClick={handleChange}
          active={hex === c.toLowerCase()}
          circleSize={circleSize}
          circleSpacing={circleSpacing}
        />
      ))}
    </div>
  );
}

export default withColorProvider(Circle);
