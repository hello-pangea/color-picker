import {
  EditableInput,
  Hue,
  useColor,
  withColorProvider,
} from "@hello-pangea/color-picker";
import React from "react";

function MyPicker() {
  const { colors, changeColor } = useColor();

  const styles: Record<string, React.CSSProperties> = {
    hue: {
      height: 10,
      position: "relative",
      marginBottom: 10,
    },
    input: {
      height: 34,
      border: `1px solid ${colors.hex}`,
      paddingLeft: 10,
    },
    swatch: {
      width: 54,
      height: 38,
      background: colors.hex,
    },
  };

  return (
    <div>
      <div style={styles.hue}>
        <Hue hsl={colors.hsl} onChange={changeColor} />
      </div>

      <div style={{ display: "flex" }}>
        <EditableInput
          style={{ input: styles.input }}
          value={colors.hex}
          onChange={changeColor}
        />
        <div style={styles.swatch} />
      </div>
    </div>
  );
}

export default withColorProvider(MyPicker);
