module.exports = function(api) {
	api.cache.forever();

	return {
		plugins: [
			'@babel/proposal-class-properties'
		],
		presets: [
			['@babel/env', {modules: false}],
			'@babel/react'
		]
	};
};
