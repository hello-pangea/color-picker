import merge from "lodash/merge";
import React from "react";
import { useColor, withColorProvider } from "../../context/useColor";
import * as color from "../../helpers/color";
import { ChangeColor } from "../../types/colors";
import { EditableInput, Raised } from "../common";

export type MaterialPickerProps = {
  styles?: Record<string, React.CSSProperties>;
  className?: string;
};

export const Material = ({
  styles: passedStyles = {},
  className = "",
}: MaterialPickerProps) => {
  const { colors, changeColor } = useColor();
  const { rgb, hex } = colors;

  const styles = merge<
    Record<string, React.CSSProperties>,
    Record<string, React.CSSProperties>
  >(
    {
      material: {
        width: "98px",
        height: "98px",
        padding: "16px",
        fontFamily: "Roboto",
      },
      HEXwrap: {
        position: "relative",
      },
      HEXinput: {
        width: "100%",
        marginTop: "12px",
        fontSize: "15px",
        color: "#333",
        padding: "0px",
        border: "0px",
        borderBottom: `2px solid ${hex}`,
        outline: "none",
        height: "30px",
      },
      HEXlabel: {
        position: "absolute",
        top: "0px",
        left: "0px",
        fontSize: "11px",
        color: "#999999",
        textTransform: "capitalize",
      },
      Hex: {},
      RGBwrap: {
        position: "relative",
      },
      RGBinput: {
        width: "100%",
        marginTop: "12px",
        fontSize: "15px",
        color: "#333",
        padding: "0px",
        border: "0px",
        borderBottom: "1px solid #eee",
        outline: "none",
        height: "30px",
      },
      RGBlabel: {
        position: "absolute",
        top: "0px",
        left: "0px",
        fontSize: "11px",
        color: "#999999",
        textTransform: "capitalize",
      },
      split: {
        display: "flex",
        marginRight: "-10px",
        paddingTop: "11px",
      },
      third: {
        flex: "1",
        paddingRight: "10px",
      },
    },
    passedStyles
  );

  const handleChange = (data: ChangeColor, e: React.MouseEvent) => {
    if (typeof data !== "string" && "hex" in data) {
      color.isValidHex(data.hex) &&
        changeColor(
          {
            hex: data.hex,
            source: "hex",
          },
          e
        );
    } else if (
      typeof data !== "string" &&
      ("r" in data || "g" in data || "b" in data)
    ) {
      changeColor(
        // @ts-ignore
        {
          r: data.r || rgb.r,
          g: data.g || rgb.g,
          b: data.b || rgb.b,
          source: "rgb",
        },
        e
      );
    }
  };

  return (
    <Raised styles={passedStyles}>
      <div style={styles.material} className={`material-picker ${className}`}>
        <EditableInput
          style={{
            wrap: styles.HEXwrap,
            input: styles.HEXinput,
            label: styles.HEXlabel,
          }}
          label="hex"
          value={hex}
          onChange={handleChange}
        />
        <div style={styles.split} className="flexbox-fix">
          <div style={styles.third}>
            <EditableInput
              style={{
                wrap: styles.RGBwrap,
                input: styles.RGBinput,
                label: styles.RGBlabel,
              }}
              label="r"
              value={rgb.r}
              onChange={handleChange}
            />
          </div>
          <div style={styles.third}>
            <EditableInput
              style={{
                wrap: styles.RGBwrap,
                input: styles.RGBinput,
                label: styles.RGBlabel,
              }}
              label="g"
              value={rgb.g}
              onChange={handleChange}
            />
          </div>
          <div style={styles.third}>
            <EditableInput
              style={{
                wrap: styles.RGBwrap,
                input: styles.RGBinput,
                label: styles.RGBlabel,
              }}
              label="b"
              value={rgb.b}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </Raised>
  );
};

export default withColorProvider(Material);
