import merge from "lodash/merge";
import React from "react";
import { useColor, withColorProvider } from "../../context/useColor";
import * as color from "../../helpers/color";
import { Raised } from "../common";
import CompactColor from "./CompactColor";
import CompactFields from "./CompactFields";

export type CompactPickerProps = {
  colors?: string[];
  styles?: Record<string, React.CSSProperties>;
  className?: string;
};

export function Compact({
  colors = [
    "#4D4D4D",
    "#999999",
    "#FFFFFF",
    "#F44E3B",
    "#FE9200",
    "#FCDC00",
    "#DBDF00",
    "#A4DD00",
    "#68CCCA",
    "#73D8FF",
    "#AEA1FF",
    "#FDA1FF",
    "#333333",
    "#808080",
    "#cccccc",
    "#D33115",
    "#E27300",
    "#FCC400",
    "#B0BC00",
    "#68BC00",
    "#16A5A5",
    "#009CE0",
    "#7B64FF",
    "#FA28FF",
    "#000000",
    "#666666",
    "#B3B3B3",
    "#9F0500",
    "#C45100",
    "#FB9E00",
    "#808900",
    "#194D33",
    "#0C797D",
    "#0062B1",
    "#653294",
    "#AB149E",
  ],
  styles: passedStyles = {},
  className = "",
}: CompactPickerProps) {
  const { colors: currentColors, changeColor } = useColor();
  const { rgb, hex } = currentColors;

  const styles = merge<
    Record<string, React.CSSProperties>,
    Record<string, React.CSSProperties>
  >(
    {
      Compact: {
        background: "#f6f6f6",
        borderRadius: "4px",
      },
      compact: {
        paddingTop: "5px",
        paddingLeft: "5px",
        boxSizing: "initial",
        width: "240px",
      },
      clear: {
        clear: "both",
      },
    },
    passedStyles
  );

  const handleChange = (data: any, e: React.MouseEvent) => {
    if (data.hex) {
      color.isValidHex(data.hex) &&
        changeColor(
          {
            hex: data.hex,
            source: "hex",
          },
          e
        );
    } else {
      changeColor(data, e);
    }
  };

  return (
    <Raised styles={passedStyles}>
      <div style={styles.compact} className={`compact-picker ${className}`}>
        <div>
          {colors.map((c) => (
            <CompactColor
              key={c}
              color={c}
              active={c.toLowerCase() === hex}
              onClick={handleChange}
            />
          ))}
          <div style={styles.clear} />
        </div>
        <CompactFields hex={hex} rgb={rgb} onChange={handleChange} />
      </div>
    </Raised>
  );
}

export default withColorProvider(Compact);
