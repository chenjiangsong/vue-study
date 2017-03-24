import Vue from './main'

const vm = new Vue({
		id: 'app',
	  data: {
      msg: 'hello',
      show: true
	  }
})

// setTimeout(() => {
//     vm.msg = 'heheda'
//     vm.show = false
//     console.log(vm.msg)
// }, 2000)