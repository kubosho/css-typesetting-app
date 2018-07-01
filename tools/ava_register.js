const { IS_RELEASE_CHANNEL_DEVELOPMENT } = require('../config/buildconfig');

const AVA_MODULE_COMPAT_PLUGINS = ['@babel/plugin-transform-modules-commonjs'];

const REACT_PRESETS = [['@babel/preset-react', { development: IS_RELEASE_CHANNEL_DEVELOPMENT }]];

require('@babel/register')({
  cache: false,
  plugins: Array.from(new Set([...AVA_MODULE_COMPAT_PLUGINS])),
  presets: [...REACT_PRESETS],
});
