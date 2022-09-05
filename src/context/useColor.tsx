import { debounce } from "lodash";
import React, {
  Context,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import * as color from "../helpers/color";
import { Color, Hex, Hsl, Hsv, Rgb } from "../types/colors";

export type Colors = {
  hex: Hex;
  hsl: Hsl;
  hsv: Hsv;
  rgb: Rgb;
  oldHue: number;
};

export type ChangeColor =
  | Hsl
  | Hsv
  | (Rgb & { source?: string })
  | { hex: Hex; source: string };

export interface ColorContextType {
  colors: Colors;
  changeColor: (newColor: ChangeColor, event?: React.MouseEvent) => void;
  onSwatchHover?: (color: Color, event: React.MouseEvent) => void;
}

export const ColorContext = createContext<ColorContextType | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
  onChangeComplete?: any;
  onSwatchHover?: (color: Color, event: React.MouseEvent) => void;
  onChange?: any;
  color?: ChangeColor;
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
  const [colors, setColors] = useState<Colors>({
    ...color.toState(defaultColor, 0),
  });

  const handler = (fn: any, data: any, event: any) => fn(data, event);

  const debouncedChangeHandler = useMemo(() => debounce(handler, 100), []);

  function changeColor(newColor: ChangeColor, event?: React.MouseEvent) {
    const isValidColor = color.simpleCheckForValidColor(newColor);
    if (isValidColor) {
      const newColors = color.toState(
        newColor,
        ("h" in newColor ? newColor.h : undefined) || colors.oldHue
      );

      setColors(newColors);

      onChangeComplete &&
        debouncedChangeHandler(onChangeComplete, colors, event);
      onChange && onChange(colors, event);
    }
  }

  function handleSwatchHover(data: Color, event: React.MouseEvent) {
    const isValidColor = color.simpleCheckForValidColor(data);
    if (isValidColor) {
      const newColors = color.toState(
        data,
        (typeof data !== "string" && "h" in data ? data.h : undefined) ||
          colors.oldHue
      );
      onSwatchHover && onSwatchHover(newColors as any, event);
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

export const withColorProvider = (Component: React.FC<any>) => (props: any) =>
  (
    <ColorProvider {...props}>
      <Component />
    </ColorProvider>
  );
