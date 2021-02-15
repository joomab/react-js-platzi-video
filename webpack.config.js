const path = require("path");
/* const HtmlWebPackPlugin = require("html-webpack-plugin"); Se comenta en el curso de SSR */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin"); //Solo para produccion

require("dotenv").config();

const isDev = process.env.ENV === "development";
const entry = ["./src/frontend/index.js"];

if (isDev) {
  entry.push(
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true"
  );
}

module.exports = {
  entry,
  mode: process.env.ENV,
  output: {
    path: path.resolve(__dirname, "src/server/public"),
    filename: isDev ? "assets/app.js" : "assets/app-[hash].js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: "async",
      name: true,
      cacheGroups: {
        //Hace nuestro vendor file
        vendors: {
          name: "vendors",
          chunks: "all",
          reuseExistingChunk: true,
          priority: 1,
          filename: isDev ? "assets/vendor.js" : "assets/vendor-[hash].js",
          enforce: true,
          test(module, chunks) {
            const name = module.nameForCondition && module.nameForCondition();

            return chunks.some(
              (chunk) =>
                chunk.name !== "vendors" && /[\\/]node_modules[\\/]/.test(name)
            );
          },
        },
      },
    },
  },
  module: {
    rules: [
      /* {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      }, */ /* Regla para eslint, pero en lo personal no lo estamos utilizando */
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
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
    isDev ? new webpack.HotModuleReplacementPlugin() : () => {}, //Refrescado hot del app
    !isDev
      ? new CompressionWebpackPlugin({
          //Vamos a comprimir nuestros assets en build
          test: /\.js$|\.css$/,
          filename: "[path].gz",
        })
      : () => {},
    !isDev ? new WebpackManifestPlugin() : () => {},
    /* new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }), Se comenta en el curso de SSR */
    new MiniCssExtractPlugin({
      filename: isDev ? "assets/app.css" : "assets/app-[hash].css",
    }),
  ],
};
