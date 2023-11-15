const assert = require('assert');
const { Buffer } = require('buffer');
const webpack = require('webpack');

module.exports = function override(config, env) {
    // Provide fallback for necessary modules
    config.resolve.fallback = {
        ...config.resolve.fallback,
        "assert": require.resolve("assert/"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer/"),
        "path": require.resolve("path-browserify"),
        "os": require.resolve("os-browserify/browser"),
    };

    config.plugins = config.plugins || [];
    config.plugins.push(
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        })
    );

    return config;
};
