'use strict'

import {
	queryElements,
	processNode
} from './compiler'
// import  from './observer'
import watcher from './watcher'
import directive from './directives'

class Vue {
	constructor(opts) {
		let data, root, bindings, els
		const self = this
		self.data = data = {}   // 内部数据类型
		self.root = root = document.getElementById(opts.id)
		self.bindings = bindings = {} // data和directive的绑定关系
		self.els = els = queryElements(root)

		Array.prototype.forEach.call(els, (el) => {
			processNode(self, el)
		})

		Object.keys(bindings).forEach((key) => {
			self.data[key] = opts.data[key]
		})

		return self.data
	}
}

export default Vue
