const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const { IS_RELEASE_CHANNEL_PRODUCTION } = require('./config/buildconfig');

const mode = IS_RELEASE_CHANNEL_PRODUCTION ? 'production' : 'development';
const monacoWebpackPlugin = new MonacoWebpackPlugin();

module.exports = {
  mode,
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  plugins: [monacoWebpackPlugin],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
};
