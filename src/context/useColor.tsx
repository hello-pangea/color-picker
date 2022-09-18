import debounce from "lodash/debounce";
import React, {
  Context,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import * as color from "../helpers/color";
import { ChangeColor, Color, ColorObject } from "../types/colors";

export interface ColorContextType {
  colors: ColorObject;
  changeColor: (color: ChangeColor, event?: React.MouseEvent) => void;
  onSwatchHover?: (color: ChangeColor, event: React.MouseEvent) => void;
}

export const ColorContext = createContext<ColorContextType | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
  onChangeComplete?: (color: ColorObject) => void;
  onSwatchHover?: (color: ColorObject, event: React.MouseEvent) => void;
  onChange?: (color: ColorObject, event?: React.MouseEvent) => void;
  color?: Color;
};

export default function ColorProvider({
  children,
  onChangeComplete,
  onChange,
  onSwatchHover,
  color: defaultColor = {
    h: 250,
    s: 0.5,
    l: 0.2,
    a: 1,
  },
}: Props) {
  const [colors, setColors] = useState<ColorObject>({
    ...color.toState(defaultColor, 0),
  });

  const handler = (fn: any, data: any, event: any) => fn(data, event);

  const debouncedChangeHandler = useMemo(() => debounce(handler, 100), []);

  function changeColor(newColor: ChangeColor, event?: React.MouseEvent) {
    const isValidColor = color.simpleCheckForValidColor(newColor);
    if (isValidColor) {
      const newColors = color.toState(
        newColor,
        (typeof newColor !== "string" && "h" in newColor
          ? newColor.h
          : undefined) || colors.oldHue
      );

      setColors(newColors);

      onChangeComplete &&
        debouncedChangeHandler(onChangeComplete, newColors, event);
      onChange && onChange(newColors, event);
    }
  }

  function handleSwatchHover(data: ChangeColor, event: React.MouseEvent) {
    const isValidColor = color.simpleCheckForValidColor(data);
    if (isValidColor) {
      const newColors = color.toState(
        data,
        (typeof data !== "string" && "h" in data ? data.h : undefined) ||
          colors.oldHue
      );
      onSwatchHover && onSwatchHover(newColors, event);
    }
  }

  return (
    <ColorContext.Provider
      value={{
        colors: colors,
        changeColor: changeColor,
        onSwatchHover: onSwatchHover ? handleSwatchHover : undefined,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
}

export const useColor = (): ColorContextType =>
  useContext(ColorContext as Context<ColorContextType>);

export const withColorProvider =
  <P extends object>(Component: React.FC<P>) =>
  (props: P & Omit<Props, "children">) =>
    (
      <ColorProvider {...props}>
        <Component {...props} />
      </ColorProvider>
    );
