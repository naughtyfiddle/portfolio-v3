function buildConfig(env, options) {
	return require(`./webpack/${(env || 'dev')}.config.js`)(options);
}

module.exports = buildConfig;
