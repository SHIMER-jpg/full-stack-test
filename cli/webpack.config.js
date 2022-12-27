const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src") + "/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js",
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // kind of file extension this rule should look for and apply in test
        exclude: [/node_modules/, /build/], // folder to be excluded
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", "*"],
  },
};
