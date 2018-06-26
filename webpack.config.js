const path = require('path');
const { IS_RELEASE_CHANNEL_PRODUCTION } = require('./config/buildconfig');

const mode = IS_RELEASE_CHANNEL_PRODUCTION ? 'production' : 'development';

module.exports = {
  mode,
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'), // string
    filename: 'main.js',
  },
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
