import merge from "lodash/merge";
import * as material from "material-colors";
import React from "react";
import { useColor, withColorProvider } from "../../context/useColor";
import { Color, Hex } from "../../types/colors";
import CircleSwatch from "./CircleSwatch";

type Props = {
  width?: string | number;
  circleSize?: number;
  circleSpacing?: number;
  onSwatchHover?: (color: Color, event: React.MouseEvent) => void;
  className?: string;
  colors?: string[];
  styles?: Record<string, React.CSSProperties>;
};

export function Circle({
  width = 252,
  onSwatchHover,
  colors = [
    material.red["500"],
    material.pink["500"],
    material.purple["500"],
    material.deepPurple["500"],
    material.indigo["500"],
    material.blue["500"],
    material.lightBlue["500"],
    material.cyan["500"],
    material.teal["500"],
    material.green["500"],
    material.lightGreen["500"],
    material.lime["500"],
    material.yellow["500"],
    material.amber["500"],
    material.orange["500"],
    material.deepOrange["500"],
    material.brown["500"],
    material.blueGrey["500"],
  ],
  circleSize = 28,
  styles: passedStyles = {},
  circleSpacing = 14,
  className = "",
}: Props) {
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

  const handleChange = (hexCode: Hex, e: React.MouseEvent) =>
    changeColor({ hex: hexCode, source: "hex" }, e);

  return (
    <div style={styles.card} className={`circle-picker ${className}`}>
      {colors.map((c) => (
        <CircleSwatch
          key={c}
          color={c}
          onClick={handleChange}
          onSwatchHover={onSwatchHover}
          active={hex === c.toLowerCase()}
          circleSize={circleSize}
          circleSpacing={circleSpacing}
        />
      ))}
    </div>
  );
}

export default withColorProvider(Circle);
