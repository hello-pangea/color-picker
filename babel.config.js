module.exports = (api) => {
  const isTest = api.env("test");

  return {
    plugins: ["@babel/plugin-transform-runtime"],
    presets: [
      "@babel/preset-react",
      "@babel/preset-typescript",
      ["@babel/preset-env", isTest ? { targets: { node: "current" } } : {}],
    ],
    comments: false,
  };
};
