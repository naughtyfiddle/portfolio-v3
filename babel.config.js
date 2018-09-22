module.exports = function(api) {
	api.cache.forever();

	return {
		plugins: [
			'@babel/proposal-class-properties',
			'@babel/proposal-object-rest-spread'
		],
		presets: [
			['@babel/env', {modules: false}],
			'@babel/react'
		]
	};
};
