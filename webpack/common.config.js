const path = require('path');

module.exports = function(options) {
	return {
		stats: 'verbose',
		entry: [
			path.resolve(__dirname, '../src/index.js'),
			// Adds babel es6 Promise API polyfill for cross browser support
			'core-js/fn/promise'
		],
		module: {
			rules: [{
				test: /\.(js|jsx)$/,
				exclude: path.resolve(__dirname, '../node_modules'),
				loader: 'babel-loader'
			}]
		},
		output: {
			path: path.resolve(__dirname, '../dist/'),
			filename: 'bundle.js'
		},
		resolve: {
			extensions: ['.js', '.jsx', '.json']
		}
	};
};
