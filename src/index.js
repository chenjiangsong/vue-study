import Vue from './main'

const vm = new Vue({
	id: 'app',
	data: {
		msg: 'HEllo',
		hehe: 'hehe',
		show: true,
		hide: false,
		className: 'red',
		arr: [1,2,3],
		log() {
			vm.data.hehe = '点我有惊喜'
			vm.data.hide = true
		},
		pop() {
			alert('啦啦啦😝啦啦啦')
		}
	}
})

window.vm = vm