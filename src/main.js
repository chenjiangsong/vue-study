'use strict'

import compiler from './compiler'
import observer from './observer'
import watcher from './watcher'
import directive from './directive'

class Vue {
	constructor(opts) {
		let data =  {},// 内部数据类型
				rootEl = document.getElementById(opts.id),
				bindings = {} // data和directive的绑定关系
	}
}

export default Vue