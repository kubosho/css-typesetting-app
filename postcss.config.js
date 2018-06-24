const postCSSimport = require('postcss-import');
const customMedia = require('postcss-custom-media');

module.exports = {
  plugins: [postCSSimport, customMedia],
};
