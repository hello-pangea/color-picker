import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import dts from "rollup-plugin-dts";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import svg from "rollup-plugin-svg";

import pkg from "./package.json";

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

const snapshotArgs =
  process.env.SNAPSHOT === "match"
    ? {
        matchSnapshot: true,
        threshold: 1000,
      }
    : {};

export default [
  // CommonJS (cjs) build
  // - Keeping console.log statements
  // - All external packages are not bundled
  {
    input,
    output: { file: pkg.main, format: "cjs" },
    external: excludeAllExternals,
    plugins: [
      svg(),
      resolve({ extensions }),
      babel(getBabelOptions({ useESModules: false })),
    ],
  },

  // EcmaScript Module (esm) build
  // - Keeping console.log statements
  // - All external packages are not bundled
  {
    input,
    output: { file: pkg.module, format: "esm" },
    external: excludeAllExternals,
    plugins: [
      svg(),
      resolve({ extensions }),
      babel(getBabelOptions({ useESModules: true })),
      sizeSnapshot(snapshotArgs),
    ],
  },

  // TypeScript declaration
  {
    input,
    output: [{ file: pkg.types, format: "es" }],
    plugins: [dts()],
  },
];
