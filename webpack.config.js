const path = require("path");
/* const HtmlWebPackPlugin = require("html-webpack-plugin"); Se comenta en el curso de SSR */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  entry: [
    "./src/frontend/index.js",
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true",
  ],
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/app.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[hash].[ext]",
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //Refrescado hot del app
    /* new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }), Se comenta en el curso de SSR */
    new MiniCssExtractPlugin({
      filename: "assets/app.css",
    }),
  ],
};
