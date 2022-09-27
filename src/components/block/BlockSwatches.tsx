import React from "react";
import { HexColor } from "../../types/colors";
import { Swatch } from "../common";

type Props = {
  colors: string[];
  onClick: (hexCode: HexColor, e: React.MouseEvent) => void;
};

export const BlockSwatches = ({ colors, onClick }: Props) => {
  const styles: Record<string, React.CSSProperties> = {
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
  };

  return (
    <div style={styles.swatches}>
      {colors.map((c) => (
        <Swatch
          key={c}
          color={c}
          style={styles.swatch}
          onClick={onClick}
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
