var path = require('path')

module.exports = {
	watch: true,
	entry: {
		bundle: './src/index.js',
		test: './src/_test.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve('./dist')
	},
	devtool: 'eval-source-map',
	module: {
		rules: [
			{
				test: /\.js[x]$/,
				loader: 'babel-loader'
			}
		]
	}
}
