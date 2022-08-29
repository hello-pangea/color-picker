import React from "react";
import reactCSS from "reactcss";
import { Color, Hex } from "../../types/colors";
import { Swatch } from "../common";

type Props = {
  colors: string[];
  onSwatchHover?: (color: Color, event: React.MouseEvent) => void;
  onClick: (hexCode: Hex, e: React.MouseEvent) => void;
};

export const BlockSwatches = ({ colors, onClick, onSwatchHover }: Props) => {
  const styles = reactCSS<any>({
    default: {
      swatches: {
        marginRight: "-10px",
      },
      swatch: {
        width: "22px",
        height: "22px",
        float: "left",
        marginRight: "10px",
        marginBottom: "10px",
        borderRadius: "4px",
      },
      clear: {
        clear: "both",
      },
    },
  });

  return (
    <div style={styles.swatches}>
      {colors.map((c) => (
        <Swatch
          key={c}
          color={c}
          style={styles.swatch}
          onClick={onClick}
          onHover={onSwatchHover}
          focusStyle={{
            boxShadow: `0 0 4px ${c}`,
          }}
        />
      ))}
      <div style={styles.clear} />
    </div>
  );
};

export default BlockSwatches;
