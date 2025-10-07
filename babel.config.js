module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Reanimated plugin if you use it
      "react-native-reanimated/plugin",
      // Add any other plugins here
    ],
  };
};
