/*
	1.先获取所有预置的directive，在初始化时，获取rootEl里所有绑定了预置directive的dom元素赋值给els
	2.循环遍历els里每个元素，先进行该元素的指令转换，主要做一些'v-text' 'v-on-click'的复杂判断，
		然后再根据转换结果做指令绑定
	3.指令绑定中，获取该元素指令的value (v-text='value')，改写get set方法，在set方法里触发
		directive.update
 */

import directive from './directive'
const prefix = 'v',
			selector = Object.keys(directive).map(function(d) {
				return `[v-${d}]`
			}).join()

export default class Vue {
	constructor(opts) {
		const self = this,
					root = this.el = document.getElementById(opts.id),
					//如果两个指令绑定在同一个dom上，不会重复获取
					els = root.querySelectorAll(selector) 

		Array.prototype.forEach.call(els, processNode)
	}
}

/*
	加工每个绑定了预置指令的el
 */
function processNode(el) {
	cloneAttrs(el.attributes).forEach(function(attr) {
		const directive = parseDirective(attr)
	})
}

/*
	获取这个el的所有指令（每个el的指令可能不止1个）
 */
function cloneAttrs(attrs) {
	return Array.prototype.map.call(attrs, function(attr) {
		return {
			name: attr.name,
			value: attr.value
		}
	})
}

/*
	
 */
function parseDirective(attr) {

}
