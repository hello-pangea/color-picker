import { debounce } from "lodash";
import React, {
  Context,
  createContext,
  useCallback,
  useContext,
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
}

export const ColorContext = createContext<ColorContextType | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
  onChangeComplete?: any;
  onChange?: any;
  color?: Color;
};

export default function ColorProvider({
  children,
  onChangeComplete,
  onChange,
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
  const debounceFn = useCallback(
    (fn: any, data: any, event: any) => debounce(fn(data, event), 1000),
    []
  );

  function changeColor(newColor: ChangeColor, event?: React.MouseEvent) {
    const isValidColor = color.simpleCheckForValidColor(newColor);
    if (isValidColor) {
      const newColors = color.toState(
        newColor,
        ("h" in newColor ? newColor.h : undefined) || colors.oldHue
      );

      setColors(newColors);

      onChangeComplete && debounceFn(onChangeComplete, colors, event);
      onChange && onChange(colors, event);
    }
  }

  return (
    <ColorContext.Provider
      value={{
        colors: colors,
        changeColor: changeColor,
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
    <ColorProvider>
      <Component {...props} />
    </ColorProvider>
  );
