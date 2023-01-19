import merge from "lodash/merge";
import React, { CSSProperties, useEffect, useRef } from "react";
import { calculateChange } from "../../helpers/saturation";
import { ChangeColor, HslColor, HsvColor } from "../../types/colors";

export type SaturationProps = {
  hsl: HslColor;
  hsv: HsvColor;
  pointer?: React.ReactNode;
  onChange?: (color: ChangeColor, event?: React.MouseEvent) => void;
  shadow?: CSSProperties["boxShadow"];
  radius?: CSSProperties["borderRadius"];
  style?: any;
};

export default function Saturation({
  hsl,
  hsv,
  pointer,
  onChange,
  shadow,
  radius,
  style,
}: SaturationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pointerPosition, pointerPositionSet] = React.useState({
    saturation: hsv.s * 100,
    brightness: hsv.v * 100,
  });

  useEffect(() => {
    return () => {
      unbindEventListeners();
    };
  }, []);

  function handleChange(
    event: React.MouseEvent | React.TouchEvent | MouseEvent
  ) {
    if (onChange) {
      const newData = calculateChange(event, hsl, ref.current);
      pointerPositionSet({
        saturation: newData.s * 100,
        brightness: newData.v * 100,
      });
      onChange(newData, event as any);
    }
  }

  function handleMouseDown(event: React.MouseEvent) {
    handleChange(event);

    if (ref.current) {
      ref.current.addEventListener("mousemove", handleChange);
      ref.current.addEventListener("mouseup", handleMouseUp);
    }
  }

  function handleMouseUp() {
    unbindEventListeners();
  }

  function unbindEventListeners() {
    if (ref.current) {
      ref.current.removeEventListener("mousemove", handleChange);
      ref.current.removeEventListener("mouseup", handleMouseUp);
    }
  }

  const { color, white, black, pointer: stylePointer, circle } = style || {};
  let styles: Record<string, CSSProperties> = {
    color: {
      position: "absolute",
      inset: "0px",
      background: `hsl(${hsl.h},100%, 50%)`,
      borderRadius: radius,
    },
    white: {
      position: "absolute",
      inset: "0px",
      borderRadius: radius,
    },
    black: {
      position: "absolute",
      inset: "0px",
      boxShadow: shadow,
      borderRadius: radius,
    },
    pointer: {
      position: "absolute",
      top: `${Math.max(0, Math.min(100, 100 - pointerPosition.brightness))}%`,
      left: `${Math.max(0, Math.min(100, pointerPosition.saturation))}%`,
      cursor: "default",
    },
    circle: {
      width: "4px",
      height: "4px",
      boxShadow: `0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),
            0 0 1px 2px rgba(0,0,0,.4)`,
      borderRadius: "50%",
      cursor: "hand",
      transform: "translate(-2px, -2px)",
    },
  };

  if (style) {
    styles = merge(styles, {
      color,
      white,
      black,
      stylePointer,
      circle,
    });
  }

  return (
    <div
      style={styles.color}
      ref={ref}
      onMouseDown={handleMouseDown}
      onTouchMove={handleChange}
      onTouchStart={handleChange}
    >
      <style>{`
          .saturation-white {
            background: -webkit-linear-gradient(to right, #fff, rgba(255,255,255,0));
            background: linear-gradient(to right, #fff, rgba(255,255,255,0));
          }
          .saturation-black {
            background: -webkit-linear-gradient(to top, #000, rgba(0,0,0,0));
            background: linear-gradient(to top, #000, rgba(0,0,0,0));
          }
        `}</style>
      <div style={styles.white} className="saturation-white">
        <div style={styles.black} className="saturation-black" />
        <div style={styles.pointer}>
          {pointer ? pointer : <div style={styles.circle} />}
        </div>
      </div>
    </div>
  );
}
