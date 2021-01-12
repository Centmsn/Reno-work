const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js",
    contact: "./src/js/contact.js",
    services: "./src/js/services.js",
    projects: "./src/js/projects.js",
  },

  output: {
    filename: "js/[name]-[contenthash:6].js",
    path: path.resolve(__dirname, "../", "build"),
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
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpg|jpeg|svg|png|gif|mp4)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]-[contenthash:6].[ext]",
              outputPath: "assets",
              publicPath: "./assets",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 50,
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash:6].css",
    }),
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
