var path = require('path')

module.exports = {
	entry: './src/main.js',
	output: {
		filename: 'seed.js',
		path: path.resolve('./dist')
	}
}