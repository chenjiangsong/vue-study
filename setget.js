
var bindingMark = 'data-element-binding'

function MiniVue(id, initData) {
	const self = this
	el = self.el = document.getElementById(id)
	bindings = {}
	data = self.data = {}
	content = el.innerHTML.replace(/\{\{(.*)\}\}/g, markToken)

	el.innerHTML = content

	/*
		将bindings里的每个key都bind到self.data上，其实就是改写了data上每一个el里出现的key的get和set
		然后再将initData里的对应值赋给self.data，来触发该键的set方法，更新视图
	 */
	for (var variable in bindings) {
		bind(variable)
	}

	if (initData) {
		for (var variable in initData) {
			data[variable] = initData[variable]
		}
	}

	/*
		先遍历el里所有{{}}内的变量，做了bingings的一个对应关系，并返回做了标记的span
	 */
	function markToken(match, variable) {
		bindings[variable] = {}
		return `<span ${bindingMark}="${variable}"></span>`
	}

	function bind(variable) {
		const _this = bindings[variable]
		_this.els = el.querySelectorAll(`[${bindingMark}="${variable}]"`)

		Array.prototype.forEach.call(_this.els, function(e) {
			e.removeAttribute(bindingMark)
		})

		Object.defineProperty(data, variable, {
			/*
				改写set方法，此variable改变后，
				所有绑定了variable的dom里的textContent都变成新的值
			 */
			set: function(newVal) {
				Array.prototype.forEach.call(_this.els, function(e) {
					_this.value = e.textContent = newVal
				})
			},
			get: function() {
				return _this.value
			}
		})
	}
}

