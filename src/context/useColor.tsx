import { debounce } from "lodash";
import React, { createContext, useCallback, useContext, useState } from "react";
import * as color from "../helpers/color";

type Colors = {
  hex: string;
  hsl: {
    h: number;
    l: number;
    s: number;
    a: number;
  };
  hsv: {
    h: number;
    s: number;
    v: number;
    a: number;
  };
  rgb: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  oldHue: number;
};

export interface ColorContextType {
  colors: Colors | null;
  changeColor: (data: any, event: any) => void;
}

export const ColorContext = createContext<ColorContextType>({
  colors: null,
  changeColor: () => {},
});

type Props = {
  children: React.ReactNode;
  onChangeComplete?: any;
  onChange?: any;
};

export default function ColorProvider({
  children,
  onChangeComplete,
  onChange,
}: Props) {
  const [colors, setColors] = useState<Colors>({
    ...color.toState(
      {
        h: 250,
        s: 0.5,
        l: 0.2,
        a: 1,
      },
      0
    ),
  });
  const debounceFn = useCallback(
    (fn: any, data: any, event: any) => debounce(fn(data, event), 1000),
    []
  );

  function changeColor(data: any, event: any) {
    const isValidColor = color.simpleCheckForValidColor(data);
    if (isValidColor) {
      const newColors = color.toState(data, data.h || colors.oldHue);

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

export const useColor = (): ColorContextType => useContext(ColorContext);

export const withColorProvider =
  (Component: React.FunctionComponent) => (props: any) =>
    (
      <ColorProvider>
        <Component {...props} />
      </ColorProvider>
    );
