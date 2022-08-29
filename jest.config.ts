import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  modulePathIgnorePatterns: ["/dist/"],
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  testEnvironment: "jsdom",
  setupFiles: ["./test/setupTests.js"],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  verbose: true,
};

export default config;
