import React from "react";
import ColorProvider, {
  ColorContextType,
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

// The wrapped component will receive the following props
export type ColorWrapProps = ColorResult & {
  onChange: ColorContextType["changeColor"];
};

export const ColorWrap = <
  P extends ColorWrapProps,
  T extends React.ComponentType<P>
>(
  Picker: T
) => {
  function ColorPicker({
    onSwatchHover,
    onChangeComplete,
    color,
    defaultColor,
    ...rest
  }: InjectedColorProps &
    // The wrapped component should not expose the following props
    // since they are added internally by the ColorWrap component
    Omit<React.ComponentProps<T>, keyof ColorWrapProps>) {
    const { colors, changeColor } = useColor();

    return (
      <ColorProvider
        color={color}
        defaultColor={defaultColor}
        onChangeComplete={onChangeComplete}
        onSwatchHover={onSwatchHover}
      >
        <Picker {...(colors as any)} {...rest} onChange={changeColor} />
      </ColorProvider>
    );
  }

  return withColorProvider(ColorPicker);
};

export default ColorWrap;
