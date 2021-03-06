const { resolve } = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "production",
  // context: resolve(__dirname, './src'),
  // entry: './src/index.html',
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      constants: resolve(__dirname, './src/constants'),
      screens: resolve(__dirname, './src/ui/screens'),
      app_redux: resolve(__dirname, './src/redux'),
      config: resolve(__dirname, './src/config'),
      service: resolve(__dirname, './src/service'),
      components: resolve(__dirname, './src/ui/components'),
      assets: resolve(__dirname, './src/assets'),
    },
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};
