import React from "react";
import { ChangeColor } from "../../types/colors";
import { Swatch } from "../common";

type Props = {
  colors: (string | { color: string; title?: string })[];
  onClick?: (newColor: ChangeColor, event: React.MouseEvent) => void;
};

export default function SketchPresetColors({
  colors,
  onClick = () => {},
}: Props) {
  const noPresets = !colors || !colors.length;

  const styles: Record<string, React.CSSProperties> = {
    colors: {
      margin: "0 -10px",
      padding: "10px 0 0 10px",
      borderTop: "1px solid #eee",
      display: noPresets ? "none" : "flex",
      flexWrap: "wrap",
      position: "relative",
    },
    swatchWrap: {
      width: "16px",
      height: "16px",
      margin: "0 10px 10px 0",
    },
    swatch: {
      borderRadius: "3px",
      boxShadow: "inset 0 0 0 1px rgba(0,0,0,.15)",
    },
  };

  const handleClick = (hex: string, e: React.MouseEvent) => {
    onClick(
      {
        hex,
        source: "hex",
      },
      e
    );
  };

  return (
    <div style={styles.colors} className="flexbox-fix">
      {colors.map((colorObjOrString) => {
        const c =
          typeof colorObjOrString === "string"
            ? { color: colorObjOrString }
            : colorObjOrString;
        const key = `${c.color}${("title" in c ? c.title : "") || ""}`;
        return (
          <div key={key} style={styles.swatchWrap}>
            <Swatch
              {...c}
              style={styles.swatch}
              onClick={handleClick}
              focusStyle={{
                boxShadow: `inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px ${c.color}`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
