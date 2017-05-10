const path = require('path');
const webpackMerge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const commonConfig = require('./common.config');

module.exports = function(options) {
	const config = {
		plugins: [
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
				reportFilename: 'bundle-analysis.html',
				generateStatsFile: true,
				statsFileName: 'stats.json',
				openAnalyzer: false
			})
		]
	};

	return webpackMerge(commonConfig(options), config);
};
