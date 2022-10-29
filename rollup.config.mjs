import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import dts from "rollup-plugin-dts";
import svg from "rollup-plugin-svg";

import pkg from "./package.json" assert { type: "json" };

const input = "./src/index.ts";
const extensions = [".ts", ".tsx", ".js", ".jsx", ".svg"];

// Treat as externals all not relative and not absolute paths
// e.g. 'react'
const excludeAllExternals = (id) => !id.startsWith(".") && !id.startsWith("/");

const getBabelOptions = ({ useESModules }) => ({
  extensions,
  exclude: "node_modules/**",
  babelHelpers: "runtime",
  plugins: [["@babel/plugin-transform-runtime", { useESModules }]],
});

export default [
  // CommonJS (cjs) build
  {
    input,
    output: { file: pkg.main, format: "cjs" },
    external: excludeAllExternals,
    plugins: [
      svg({ base64: true }),
      resolve({ extensions }),
      babel(getBabelOptions({ useESModules: false })),
    ],
  },

  // EcmaScript Module (esm) build
  {
    input,
    output: { file: pkg.module, format: "esm", esModule: true },
    external: excludeAllExternals,
    plugins: [
      svg({ base64: true }),
      resolve({ extensions }),
      babel(getBabelOptions({ useESModules: true })),
    ],
  },

  // TypeScript declaration
  {
    input,
    output: [{ file: pkg.types, format: "es" }],
    plugins: [dts()],
  },
];
