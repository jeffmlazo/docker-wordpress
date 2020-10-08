const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { CUSTOM_THEME_FOLDER, CUSTOM_THEME_DISTRIBUTION_FOLDER } = process.env;
const wpThemeDistDir = `./wordpress/wp-content/themes/${CUSTOM_THEME_FOLDER}/${CUSTOM_THEME_DISTRIBUTION_FOLDER}`;

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contentHash].bundle.js",
    path: path.resolve(__dirname, wpThemeDistDir),
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contentHash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // 4th extract css into files
          "css-loader", // 3rd turns css into commonjs
          {
              loader: 'postcss-loader',
              options: {
                  postcssOptions: {
                      plugins: [
                          'autoprefixer' // 2nd turns CSS and add vendor prefixes to CSS rules 
                      ],
                  }
              }
          },
          "sass-loader", //1st turns sass into css
        ],
      },
    ],
  },
});
