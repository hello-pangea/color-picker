import React from "react";
import ColorProvider, { ChangeColor, useColor } from "../../context/useColor";
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

    return <Picker {...colors} onChange={changeColor} {...optionalEvents} />;
  }

  return ColorPicker;
};

export default (Component: React.FC<any>) => (props: Props) =>
  (
    <ColorProvider {...props}>
      <Component {...props} />
    </ColorProvider>
  );
