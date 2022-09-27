import debounce from "lodash/debounce";
import isEqual from "lodash/isEqual";
import React, {
  Context,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as color from "../helpers/color";
import { ChangeColor, Color, ColorResult } from "../types/colors";

export interface ColorContextType {
  colors: ColorResult;
  changeColor: (color: ChangeColor, event?: React.MouseEvent) => void;
  onSwatchHover?: (color: ChangeColor, event: React.MouseEvent) => void;
}

export const ColorContext = createContext<ColorContextType | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;

  /** Debounced version of `onChange`. Called after 100ms of no change */
  onChangeComplete?: (color: ColorResult) => void;

  onSwatchHover?: (color: ColorResult, event: React.MouseEvent) => void;

  /**
   * Called _every_ time the color changes, ex. when dragging to select a color.
   * Use `onChangeComplete` for a debounced value (only called once picking a color is complete)
   */
  onChange?: (color: ColorResult, event?: React.MouseEvent) => void;

  /** Allows you to control the color yourself */
  color?: Color;

  /** Default color */
  defaultColor?: Color;
};

export default function ColorProvider({
  children,
  onChangeComplete,
  onChange,
  onSwatchHover,
  color: passedColor,
  defaultColor = {
    h: 250,
    s: 0.5,
    l: 0.2,
    a: 1,
  },
}: Props) {
  const [colors, setColors] = useState<ColorResult>({
    ...color.toState(passedColor ?? defaultColor, 0),
  });
  const passedColorRef = useRef(passedColor);

  if (!isEqual(passedColorRef.current, passedColor)) {
    passedColorRef.current = passedColor;
  }

  useEffect(() => {
    if (passedColor) {
      setColors({ ...color.toState(passedColor, 0) });
    }
  }, [passedColorRef.current]);

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
