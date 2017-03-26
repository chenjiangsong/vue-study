import Vue from './main'

window.vm = new Vue({
	id: 'app',
	data: {
        msg: 'hello',
        show: true,
		hide: false
	 }
})

setTimeout(() => {
    vm.msg = 'heheda'
    vm.hide = true
    // console.log(vm.msg)
}, 2000)
