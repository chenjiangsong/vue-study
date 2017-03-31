import Vue from './main'

const vm = new Vue({
	id: 'app',
	data: {
		msg: 'HEllo',
		show: true,
		className: 'red',
		arr: [1,2,3],
		log() {
			vm.data.msg = 'niMbi'
		}
	}
})

window.vm = vm