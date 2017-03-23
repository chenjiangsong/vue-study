import Vue from './_main'

const vm = new Vue({
	id: 'app',
    data: {
        msg: 'hello',
        show: true
    }
})

setTimeout(() => {
    vm.msg = 'heheda'
    vm.show = false
}, 2000)