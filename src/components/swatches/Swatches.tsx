import merge from "lodash/merge";
import React from "react";
import { useColor, withColorProvider } from "../../context/useColor";
import { Color } from "../../types/colors";
import { Raised } from "../common";
import SwatchesGroup from "./SwatchesGroup";

export type SwatchesPickerProps = {
  width?: string | number;
  height?: string | number;
  className?: string;
  styles?: Record<string, React.CSSProperties>;
  colors?: string[][];
};

export function Swatches({
  width = 320,
  height = 240,
  colors = [
    ["#B71C1C", "#D32F2F", "#F44336", "#E57373", "#FFCDD2"],
    ["#880E4F", "#C2185B", "#E91E63", "#F06292", "#F8BBD0"],
    ["#4A148C", "#7B1FA2", "#9C27B0", "#BA68C8", "#E1BEE7"],
    ["#311B92", "#512DA8", "#673AB7", "#9575CD", "#D1C4E9"],
    ["#1A237E", "#303F9F", "#3F51B5", "#7986CB", "#C5CAE9"],
    ["#0D47A1", "#1976D2", "#2196F3", "#64B5F6", "#BBDEFB"],
    ["#01579B", "#0288D1", "#03A9F4", "#4FC3F7", "#B3E5FC"],
    ["#006064", "#0097A7", "#00BCD4", "#4DD0E1", "#B2EBF2"],
    ["#004D40", "#00796B", "#009688", "#4DB6AC", "#B2DFDB"],
    ["#1B5E20", "#388E3C", "#4CAF50", "#81C784", "#C8E6C9"],
    ["#33691E", "#689F38", "#8BC34A", "#AED581", "#DCEDC8"],
    ["#827717", "#AFB42B", "#CDDC39", "#DCE775", "#F0F4C3"],
    ["#F57F17", "#FBC02D", "#FFEB3B", "#FFF176", "#FFF9C4"],
    ["#FF6F00", "#FFA000", "#FFC107", "#FFD54F", "#FFECB3"],
    ["#E65100", "#F57C00", "#FF9800", "#FFB74D", "#FFE0B2"],
    ["#BF360C", "#E64A19", "#FF5722", "#FF8A65", "#FFCCBC"],
    ["#3E2723", "#5D4037", "#795548", "#A1887F", "#D7CCC8"],
    ["#263238", "#455A64", "#607D8B", "#90A4AE", "#CFD8DC"],
    ["#000000", "#525252", "#969696", "#D9D9D9", "#FFFFFF"],
  ],
  styles: passedStyles = {},
  className = "",
}: SwatchesPickerProps) {
  const { colors: currentColors, changeColor } = useColor();
  const { hex } = currentColors;

  const styles = merge<
    Record<string, React.CSSProperties>,
    Record<string, React.CSSProperties>
  >(
    {
      picker: {
        width,
        height,
      },
      overflow: {
        height,
        overflowY: "scroll",
      },
      body: {
        padding: "16px 0 6px 16px",
      },
      clear: {
        clear: "both",
      },
    },
    passedStyles
  );

  const handleChange = (data: Color, e: React.MouseEvent) =>
    changeColor({ hex: data as string, source: "hex" }, e);

  return (
    <div style={styles.picker} className={`swatches-picker ${className}`}>
      <Raised>
        <div style={styles.overflow}>
          <div style={styles.body}>
            {colors.map((group) => (
              <SwatchesGroup
                key={group.toString()}
                group={group}
                active={hex}
                onClick={handleChange}
              />
            ))}
            <div style={styles.clear} />
          </div>
        </div>
      </Raised>
    </div>
  );
}

export default withColorProvider(Swatches);
