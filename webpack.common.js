const path = require("path");
const webpack  = require('webpack');
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env')
} );
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { CUSTOM_THEME_FOLDER, CUSTOM_THEME_DISTRIBUTION_FOLDER, CUSTOM_THEME_FONTS_FOLDER } = process.env;
const wpThemeJsDir = `./wordpress/wp-content/themes/${CUSTOM_THEME_FOLDER}/src/js`;
const wpThemeFontsDir = `../${CUSTOM_THEME_DISTRIBUTION_FOLDER}/${CUSTOM_THEME_FONTS_FOLDER}/`;

module.exports = {
  entry: {
    app: `${wpThemeJsDir}/app.js`,
    vendor: `${wpThemeJsDir}/vendor.js`,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
  }),
    new webpack.DefinePlugin({
      "process.env": dotenv.parsed
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
          test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
          use:[
              {
                  loader: 'file-loader',
                  options: {
                      name: '[name].[ext]',
                      outputPath: wpThemeFontsDir,
                      publicPath: wpThemeFontsDir,
                  }
              }
          ]
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        exclude: /(fonts)/,
        use: [
          {
            loader: "file-loader", // Image loader for webpack
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "images",
            },
          },
          {
            loader: "image-webpack-loader", // Image optimize
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
