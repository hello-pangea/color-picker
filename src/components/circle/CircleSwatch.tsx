import React from "react";
import { Color, Hex } from "../../types/colors";
import { Swatch } from "../common";
import { withHover } from "../common/withHover";

type Props = {
  circleSize?: number;
  circleSpacing?: number;
  onSwatchHover?: (color: Color, event: React.MouseEvent) => void;
  className?: string;
  color: string;
  active?: boolean;
  hover?: boolean;
  onClick: (hexCode: Hex, e: React.MouseEvent) => void;
};

export const CircleSwatch = ({
  color,
  onClick,
  onSwatchHover,
  hover,
  active,
  circleSize = 28,
  circleSpacing = 14,
}: Props) => {
  const styles: Record<string, React.CSSProperties> = {
    swatch: {
      width: circleSize,
      height: circleSize,
      marginRight: circleSpacing,
      marginBottom: circleSpacing,
      transform: "scale(1)",
      transition: "100ms transform ease",
    },
    Swatch: {
      borderRadius: "50%",
      background: "transparent",
      boxShadow: active
        ? `inset 0 0 0 3px ${color}`
        : `inset 0 0 0 ${circleSize / 2 + 1}px ${color}`,
      transition: "100ms box-shadow ease",
      transform: hover ? "scale(1.2)" : undefined,
    },
  };

  return (
    <div style={styles.swatch}>
      <Swatch
        style={styles.Swatch}
        color={color}
        onClick={onClick}
        onHover={onSwatchHover}
        focusStyle={{
          boxShadow: `${styles.Swatch.boxShadow}, 0 0 5px ${color}`,
        }}
      />
    </div>
  );
};

export default withHover(CircleSwatch);
