import React from "react";
import ColorProvider, {
  ChangeColor,
  useColor,
  withColorProvider,
} from "../../context/useColor";
import * as color from "../../helpers/color";
import { Color } from "../../types/colors";

type Props = {
  onSwatchHover?: (color: ChangeColor, event: React.MouseEvent) => void;
  color?: Color;
};

export const ColorWrap = (Picker: any) => {
  function ColorPicker({ onSwatchHover }: Props) {
    const { colors, changeColor } = useColor();

    function handleSwatchHover(data: any, event: React.MouseEvent) {
      const isValidColor = color.simpleCheckForValidColor(data);
      if (isValidColor) {
        const newColors = color.toState(data, data.h || colors?.oldHue);
        onSwatchHover && onSwatchHover(newColors, event);
      }
    }

    const optionalEvents: any = {};
    if (onSwatchHover) {
      optionalEvents.onSwatchHover = handleSwatchHover;
    }

    return (
      <ColorProvider>
        <Picker {...colors} onChange={changeColor} {...optionalEvents} />
      </ColorProvider>
    );
  }

  return withColorProvider(ColorPicker);
};

export default ColorWrap;
