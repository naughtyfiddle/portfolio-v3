const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./common.config');

module.exports = function(options) {
	const config = {
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: true,
				test: /\.(js|jsx)$/,
				mangle: true,
				comments: false
			})
		]
	};

	return webpackMerge(commonConfig(options), config);
};
