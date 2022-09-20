export type Hex = string;

export type Hsl = {
  h: number;
  l: number;
  s: number;
  a?: number;
};

export type Hsv = {
  h: number;
  s: number;
  v: number;
  a?: number;
};

export type Rgb = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

export type Color = Hex | Hsl | Hsv | Rgb;

export type ColorObject = {
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
  | { hex: Hex; source: string }
  | Hex;
