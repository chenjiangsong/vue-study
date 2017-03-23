var path = require('path')

module.exports = {
	watch: true,
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
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