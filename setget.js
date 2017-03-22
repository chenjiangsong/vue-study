
var bindingMark = 'data-element-binding'

function MiniVue(id, initData) {
	const self = this
	el = self.el = document.getElementById(id)
	bindings = {}
	data = self.data = {}
	content = el.innerHTML.replace(/\{\{(.*)\}\}/g, markToken)
	
	console.log(bindings)

	el.innerHTML = content

	for (var variable in bindings) {
		bind(variable)
	}
	
	function markToken(match, variable) {
		bindings[variable] = {}
		return `<span ${bindingMark}="${variable}"></span>`
	}

	function bind(variable) {
		bindings[variable].els = el.querySelectorAll(`[${bindingMark}="${variable}]"`)
		
		Array.prototype.forEach.call(bindings[variable].els, function(e) {
			e.removeAttribute(bindingMark)
		})

		Object.defineProperty(data, variable, {
			set: function(newVal) {

			},
			get: function() {

			}
		})
	}
}

