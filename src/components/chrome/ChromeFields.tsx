import React, { useEffect, useState } from "react";
import UnfoldMoreHorizontalIcon from "../../../icons/unfold-more-horizontal.svg";
import * as color from "../../helpers/color";
import { EditableInput } from "../common";

type Props = {
  view?: "hex" | "rgb" | "hsl";
  onChange: any;
  rgb: any;
  hsl: any;
  hex: any;
  disableAlpha?: boolean;
};

export default function ChromeFields({
  view: defaultView = "hex",
  ...props
}: Props) {
  const [view, setView] = useState(defaultView);

  useEffect(() => {
    if (props.hsl.a !== 1 && defaultView === "hex") {
      setView("rgb");
    }
  }, []);

  useEffect(() => {
    if (props.hsl.a !== 1 && view === "hex") {
      setView("rgb");
    }
  }, [props]);

  function toggleViews() {
    if (view === "hex") {
      setView("rgb");
    } else if (view === "rgb") {
      setView("hsl");
    } else if (view === "hsl") {
      if (props.hsl.a === 1) {
        setView("hex");
      } else {
        setView("rgb");
      }
    }
  }

  function handleChange(data: any, e: React.MouseEvent) {
    if (data.hex) {
      color.isValidHex(data.hex) &&
        props.onChange(
          {
            hex: data.hex,
            source: "hex",
          },
          e
        );
    } else if (data.r || data.g || data.b) {
      props.onChange(
        {
          r: data.r || props.rgb.r,
          g: data.g || props.rgb.g,
          b: data.b || props.rgb.b,
          source: "rgb",
        },
        e
      );
    } else if (data.a) {
      if (data.a < 0) {
        data.a = 0;
      } else if (data.a > 1) {
        data.a = 1;
      }

      props.onChange(
        {
          h: props.hsl.h,
          s: props.hsl.s,
          l: props.hsl.l,
          a: Math.round(data.a * 100) / 100,
          source: "rgb",
        },
        e
      );
    } else if (data.h || data.s || data.l) {
      // Remove any occurances of '%'.
      if (typeof data.s === "string" && data.s.includes("%")) {
        data.s = data.s.replace("%", "");
      }
      if (typeof data.l === "string" && data.l.includes("%")) {
        data.l = data.l.replace("%", "");
      }

      // We store HSL as a unit interval so we need to override the 1 input to 0.01
      if (data.s == 1) {
        data.s = 0.01;
      } else if (data.l == 1) {
        data.l = 0.01;
      }

      props.onChange(
        {
          h: data.h || props.hsl.h,
          s: Number(data.s !== undefined ? data.s : props.hsl.s),
          l: Number(data.l !== undefined ? data.l : props.hsl.l),
          source: "hsl",
        },
        e
      );
    }
  }

  function showHighlight(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.background = "#eee";
  }

  function hideHighlight(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.background = "transparent";
  }

  const styles: Record<string, React.CSSProperties> = {
    wrap: {
      paddingTop: "16px",
      display: "flex",
    },
    fields: {
      flex: "1",
      display: "flex",
      marginLeft: "-6px",
    },
    field: {
      paddingLeft: "6px",
      width: "100%",
    },
    alpha: {
      paddingLeft: "6px",
      width: "100%",
      display: props.disableAlpha ? "none" : undefined,
    },
    toggle: {
      width: "32px",
      textAlign: "right",
      position: "relative",
    },
    icon: {
      marginRight: "-4px",
      marginTop: "12px",
      cursor: "pointer",
      position: "relative",
    },
    iconHighlight: {
      position: "absolute",
      width: "24px",
      height: "28px",
      background: "#eee",
      borderRadius: "4px",
      top: "10px",
      left: "12px",
      display: "none",
    },
    input: {
      fontSize: "11px",
      color: "#333",
      width: "100%",
      borderRadius: "2px",
      border: "none",
      boxShadow: "inset 0 0 0 1px #dadada",
      height: "21px",
      textAlign: "center",
    },
    label: {
      textTransform: "uppercase",
      fontSize: "11px",
      lineHeight: "11px",
      color: "#969696",
      textAlign: "center",
      display: "block",
      marginTop: "12px",
    },
    svg: {
      fill: "#333",
      width: "24px",
      height: "24px",
      border: "1px transparent solid",
      borderRadius: "5px",
    },
  };

  let fields;
  if (view === "hex") {
    fields = (
      <div style={styles.fields} className="flexbox-fix">
        <div style={styles.field}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="hex"
            value={props.hex}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  } else if (view === "rgb") {
    fields = (
      <div style={styles.fields} className="flexbox-fix">
        <div style={styles.field}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="r"
            value={props.rgb.r}
            onChange={handleChange}
          />
        </div>
        <div style={styles.field}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="g"
            value={props.rgb.g}
            onChange={handleChange}
          />
        </div>
        <div style={styles.field}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="b"
            value={props.rgb.b}
            onChange={handleChange}
          />
        </div>
        <div style={styles.alpha}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="a"
            value={props.rgb.a}
            arrowOffset={0.01}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  } else if (view === "hsl") {
    fields = (
      <div style={styles.fields} className="flexbox-fix">
        <div style={styles.field}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="h"
            value={Math.round(props.hsl.h)}
            onChange={handleChange}
          />
        </div>
        <div style={styles.field}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="s"
            value={`${Math.round(props.hsl.s * 100)}%`}
            onChange={handleChange}
          />
        </div>
        <div style={styles.field}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="l"
            value={`${Math.round(props.hsl.l * 100)}%`}
            onChange={handleChange}
          />
        </div>
        <div style={styles.alpha}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="a"
            value={props.hsl.a}
            arrowOffset={0.01}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrap} className="flexbox-fix">
      {fields}
      <div style={styles.toggle}>
        <div style={styles.icon} onClick={toggleViews}>
          <img
            width="24"
            height="24"
            onMouseOver={showHighlight}
            onMouseEnter={showHighlight}
            onMouseOut={hideHighlight}
            src={UnfoldMoreHorizontalIcon}
          />
        </div>
      </div>
    </div>
  );
}
