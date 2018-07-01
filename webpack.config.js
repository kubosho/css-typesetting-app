const path = require('path');
const webpack = require('webpack');
const { IS_RELEASE_CHANNEL_PRODUCTION } = require('./config/buildconfig');

const mode = IS_RELEASE_CHANNEL_PRODUCTION ? 'production' : 'development';
const ignorePlugin = new webpack.IgnorePlugin(
  /^((fs)|(path)|(os)|(crypto)|(source-map-support))$/,
  /vs(\/|\\)language(\/|\\)typescript(\/|\\)lib/,
);

module.exports = {
  mode,
  entry: './build/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
        exclude: [/node_modules/, /__tests__/],
      },
      // XXX: Don't use CSS Modules.
      // This config only use so as to monaco-editor.
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /assets/,
      },
    ],
  },
  plugins: [ignorePlugin],
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
};
