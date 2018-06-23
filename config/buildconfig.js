/**
 * Release channels
 */
const RELEASE_CHANNEL = String(process.env.RELEASE_CHANNEL);
const IS_RELEASE_CHANNEL_PRODUCTION = RELEASE_CHANNEL === 'production';
const IS_RELEASE_CHANNEL_DEVELOPMENT = RELEASE_CHANNEL === 'development';

module.exports = Object.freeze({
  IS_RELEASE_CHANNEL_PRODUCTION,
  IS_RELEASE_CHANNEL_DEVELOPMENT,
});
