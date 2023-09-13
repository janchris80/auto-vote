const assert = require('assert');
const { Buffer } = require('buffer');
const webpack = require('webpack');

module.exports = function override(config, env) {
    // Provide fallback for the assert module
    config.resolve.fallback = {
        ...config.resolve.fallback,
        "assert": require.resolve("assert/"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer/")
    };
    config.plugins = config.plugins || [];
    config.plugins.push(
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        })
    );

    return config;
};
