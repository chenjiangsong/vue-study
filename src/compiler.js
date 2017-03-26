/*
	在指令解析的过程中，可能会遇到这样几个情况：
	1. 1个标签1个指令
	2. 1个标签2个指令
	3. 带有'v-on-click'的指令
 */


import directives from './directives'
import { observer } from './observer'

const prefix = 'v'

export function queryElements(root) {
	let dirQuery, els

	root = root || document

	dirQuery = Object.keys(directives).map((directive) => {
		return `[${prefix}-${directive}]`
	}).join()

	els = root.querySelectorAll(dirQuery)

	return els
}

/*
	解析每个带有'v-'指令的el，得到该el上的每个v-指令
 */
export function processNode(vue, el) {
	cloneAttr(el.attributes).map((attr) =>{
		const directive = compilerDirective(vue, attr)
		if (directive) {
			bindDirective(vue, el, directive)
		}
	})
	// console.log(vue.bindings)
}

function cloneAttr(attributes) {
	return Array.prototype.map.call(attributes, (attr) => {
		return {
			name: attr.name,
			value: attr.value
		}
	})
}

function compilerDirective(vue, attr) {
	let binding, key, update, dirname, noprefix

	if (attr.name.indexOf(prefix) === -1) return

	dirname = attr.name.slice(prefix.length + 1)
	key = attr.value
	binding = vue.bindings[key]
	update = directives[dirname]

	return {
		attr: attr,
		dirname,
		key,
		update
	}
}

function bindDirective(vue, el, directive) {
	const key = directive.key
	el.removeAttribute(directive.attr.name)
	let binding = vue.bindings[key]
	if (!binding) {
		vue.bindings[key] = binding = {
			key,
			directives: []
		}
	}
	directive.el = el
	binding.value = ''
	binding.directives.push(directive)
	if (!vue.data.hasOwnProperty(key)) {
		observer(vue, binding)
	}
}
