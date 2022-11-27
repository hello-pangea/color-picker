import React from "react";
import ColorProvider, {
  useColor,
  withColorProvider,
} from "../../context/useColor";
import { Color, ColorResult } from "../../types/colors";

export type InjectedColorProps = {
  onSwatchHover?: (color: ColorResult, event: React.MouseEvent) => void;
  onChangeComplete?: (color: ColorResult) => void;
  color?: Color;
  defaultColor?: Color;
};

export const ColorWrap = (Picker: any) => {
  function ColorPicker({
    onSwatchHover,
    onChangeComplete,
    color,
    defaultColor,
  }: InjectedColorProps) {
    const { colors, changeColor } = useColor();

    return (
      <ColorProvider
        color={color}
        defaultColor={defaultColor}
        onChangeComplete={onChangeComplete}
        onSwatchHover={onSwatchHover}
      >
        <Picker {...colors} onChange={changeColor} />
      </ColorProvider>
    );
  }

  return withColorProvider(ColorPicker);
};

export default ColorWrap;
