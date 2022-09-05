import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  modulePathIgnorePatterns: ["/dist/"],
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  setupFiles: ["./test/setup/env-setup.ts"],
  setupFilesAfterEnv: ["./test/setup/test-setup.ts"],
  testEnvironment: "./test/setup/environment.ts",
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  verbose: true,
};

export default config;
