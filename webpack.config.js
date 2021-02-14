/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const packageJson = require("./package.json");

const config = {
  mode: process.env.NODE_ENV,
  context: __dirname + "/src",
  entry: {
    "inject/index": "./inject/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "extension/img",
          to: "img",
        },
        {
          from: "extension/manifest.json",
          to: "manifest.json",
          transform: content => {
            const jsonContent = JSON.parse(content);
            jsonContent.version = packageJson.version;
            jsonContent.description = packageJson.description;
            jsonContent.homepage_url = packageJson.homepage;
            return JSON.stringify(jsonContent, null, 2);
          },
        },
      ],
    }),
  ],
};

if (config.mode === "development") {
  config.devtool = "eval-cheap-module-source-map";
}

module.exports = config;