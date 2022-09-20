require("dotenv").config();

module.exports = {
  core: {
    disableTelemetry: true,
  },
  reactOptions: {
    strictMode: true,
  },
  stories: [
    "../src/components/google/Google.stories.tsx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
};
