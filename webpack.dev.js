const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CUSTOM_THEME_FOLDER, CUSTOM_THEME_DISTRIBUTION_FOLDER } = process.env;
const wpThemeDir = `./wordpress/wp-content/themes/${CUSTOM_THEME_FOLDER}/`;
const wpThemeDistDir = `./wordpress/wp-content/themes/${CUSTOM_THEME_FOLDER}/${CUSTOM_THEME_DISTRIBUTION_FOLDER}/`;
const pubThemeDir = `http://localhost:3000/wp-content/themes/${CUSTOM_THEME_FOLDER}/${CUSTOM_THEME_DISTRIBUTION_FOLDER}/`;

module.exports = merge(common, {
  mode: "development",
  watchOptions: {
    ignored: [
      "/node_modules/**", "/config/**", "/mysql/**", "/wpcli/**"
    ],
    poll:1000,
    aggregateTimeout: 300
  },
  devServer: {
    contentBase: path.resolve(__dirname, wpThemeDir),
    writeToDisk: true,
    compress: true,
    hotOnly: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  devtool: 'inline-source-map',
  output: {
    publicPath: pubThemeDir,
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, wpThemeDistDir),
    hotUpdateChunkFilename: 'hot-update.js',
    hotUpdateMainFilename: 'hot-update.json',
  },
  optimization: {
    namedModules: true
  },
  plugins: [
    new BrowserSyncPlugin(
      // BrowserSync options
      {
        // browse to http://localhost:3000/ during development
        host: 'localhost',
        port: 3000,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:3100/)
        // through BrowserSync
        proxy: 'http://localhost',
        files: [
          `./wordpress/wp-content/themes/${CUSTOM_THEME_FOLDER}/**/*.php`,
        ],
        notify: false,
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false,
      }
      ),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
    ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // 4th inject styles into DOM
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
          "sass-loader", // 1st turns sass into css
        ],
      },
    ],
  },
});
