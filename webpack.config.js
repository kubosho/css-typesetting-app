const path = require('path');
const webpack = require('webpack');
const { IS_RELEASE_CHANNEL_PRODUCTION } = require('./config/buildconfig');

const mode = IS_RELEASE_CHANNEL_PRODUCTION ? 'production' : 'development';
const ignorePlugin = new webpack.IgnorePlugin(
  /^((fs)|(path)|(os)|(crypto)|(source-map-support))$/,
  /vs(\/|\\)language(\/|\\)typescript(\/|\\)lib/,
);
// XXX: https://github.com/Microsoft/monaco-editor-webpack-plugin/issues/13#issuecomment-390806320
const contextReplacementPlugin = new webpack.ContextReplacementPlugin(
  /monaco-editor(\\|\/)esm(\\|\/)vs(\\|\/)editor(\\|\/)common(\\|\/)services/,
  __dirname,
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
  plugins: [ignorePlugin, contextReplacementPlugin],
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
};
