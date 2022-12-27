const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src") + "/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js",
  },
  target: "web",
  // devServer: {
  //   port: "3000",
  //   /** "static"
  //    * This property tells Webpack what static file it should serve
  //    */
  //   static: ["./public"],
  //   open: true,
  //   hot: true,
  //   liveReload: true,
  // },
  module: {
    /** "rules"
     * This says - "Hey webpack compiler, when you come across a path that resolves to a '.js or .jsx'
     * file inside of a require()/import statement, use the babel-loader to transform it before you
     * add it to the bundle. And in this process, kindly make sure to exclude node_modules folder from
     * being searched"
     */

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
