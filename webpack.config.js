const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
	stats: 'normal',
	entry: {
		js: path.resolve(__dirname, './src/index.jsx'),
		css: path.resolve(__dirname, './src/main.less')
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		// unfortunately we end up with a useless css-bundle.js
		filename: '[name]-bundle.js'
	},
	module: {
		rules: [{
			// transpile js and jsx files in src/ using config in babel.config.js
			use: 'babel-loader',
			test: /\.(js|jsx)$/,
			include: path.resolve(__dirname, './src')
		}, {
			// compile less to css, remove webpack runtime, and output to css/bundle.css
			use: [
				'file-loader?name=css-bundle.css',
				'extract-loader',
				'css-loader?url=false', // by default css-loader treats url() like @import for some reason
				'less-loader'
			],
			test: /\.(less|css)$/
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
};

module.exports = function(env, options) {
	if (options.mode === 'development') {
		config.plugins = [
			new BundleAnalyzerPlugin({
				reportFilename: '../bundle-report.html',
				analyzerMode: 'static',
				openAnalyzer: false
			})
		];
	}
	return config;
};
