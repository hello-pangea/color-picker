require("dotenv").config();

module.exports = {
  core: {
    disableTelemetry: true,
  },
  reactOptions: {
    strictMode: true,
  },
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
};
