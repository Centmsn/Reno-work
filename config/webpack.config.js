const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    contact: "./src/js/contact.js",
    services: "./src/js/services.js",
    projects: "./src/js/projects.js",
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../", "build"),
  },

  devServer: {
    open: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env"],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(sass|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|jpeg|svg|png|gif|mp4)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "assets",
            publicPath: "./assets",
          },
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: true,
      inject: true,
      favicon: "./src/assets/favicon.png",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/contact.html",
      filename: "contact.html",
      minify: true,
      inject: true,
      favicon: "./src/assets/favicon.png",
      chunks: ["contact"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/services.html",
      filename: "services.html",
      minify: true,
      inject: true,
      favicon: "./src/assets/favicon.png",
      chunks: ["services"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/projects.html",
      filename: "projects.html",
      minify: true,
      inject: true,
      favicon: "./src/assets/favicon.png",
      chunks: ["projects"],
    }),
  ],
};
