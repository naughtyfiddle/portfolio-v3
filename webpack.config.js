const webpack = require('webpack');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

module.exports = (env, options) => ({
	stats: 'normal',
	entry: path.resolve(__dirname, 'src/index.jsx'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			// transpile js and jsx files in src/ using config in babel.config.js
			test: /\.(js|jsx)$/,
			use: 'babel-loader',
			include: path.resolve(__dirname, 'src')
		}, {
			// css modules
			test: /\.module\.css$/,
			use: [
				ExtractCssChunks.loader,
				'css-loader?modules'
			]
		}, {
			// static assets
			test: /\.(gif|jpg|png|ttf|mp3)$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]'
				}
			}]
		}]
	},
	plugins: [
		// automatically link bundled assets in index.html
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'index.html'),
			favicon: path.resolve(__dirname, 'static/favicon.ico')
		}),
		// extract css modules to single css file
		new ExtractCssChunks({
			filename: '[name].css'
		}),
		...(options.mode === 'production' ? [
			// output bundle analysis for prod builds
			new BundleAnalyzerPlugin({
				reportFilename: path.resolve(__dirname, 'bundle-report.html'),
				analyzerMode: 'static',
				openAnalyzer: false
			})
		] : []),
		...(options.mode === 'development' ? [
			// enable hot module reloading for dev builds
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin()
		] : [])
	],
	resolve: {
		modules: [
			'node_modules',
			path.resolve(__dirname)
		],
		extensions: ['.js', '.jsx']
	}
});
