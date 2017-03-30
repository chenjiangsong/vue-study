import Seed from './main'

// var Seed = require('seed')
var app = Seed.create({
	id: 'test',
	// template
	scope: {
		'msg.wow': 'wow',
		hello: 'hello',
		changeMessage: function () {
			app.scope['msg.wow'] = 'hola'
		},
		remove: function () {
			app.destroy()
		},
		todos: [
			{
				title: 'make this shit work',
				done: false
			},
			{
				title: 'make this shit kinda work',
				done: true
			}
		]
	}
})