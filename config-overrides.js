/* eslint-disable */

module.exports = function override(config, env) {
    let loaders = config.resolve;
    loaders.fallback = {
        path: require.resolve('path-browserify'),
    };
    return config;
};
