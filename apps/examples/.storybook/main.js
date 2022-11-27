require("dotenv").config();
const path = require("path");

module.exports = {
  framework: "@storybook/react",
  core: {
    disableTelemetry: true,
    builder: "@storybook/builder-vite",
  },
  reactOptions: {
    strictMode: true,
  },
  stories: ["../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    return {
      ...config,
      resolve: {
        alias: [
          {
            find: "@hello-pangea/color-picker",
            replacement: path.resolve(
              __dirname,
              "../../../packages/color-picker/"
            ),
          },
        ],
      },
    };
  },
};
