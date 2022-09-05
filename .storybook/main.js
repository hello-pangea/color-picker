require("dotenv").config();

module.exports = {
  core: {
    disableTelemetry: true,
  },
  reactOptions: {
    strictMode: true,
  },
  stories: [
    "../src/**/story.@(js|jsx|ts|tsx)",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../stories/**/story.*.@(js|jsx|ts|tsx)",
  ],
};
