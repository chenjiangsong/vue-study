/*
	解析指令
 */
import directives from './directives'
import observer from './observer'
import filters from './filters'

const ForEach = Array.prototype.forEach
const Map = Array.prototype.map

export function compileNode(els, vue) {
	ForEach.call(els, (el) => {
		getAttributes(el).map((attr) => {
			const directive = parseDirective(attr, el)
			if (directive) {
				bindDirective(vue, directive)
			}
		})
	})
}

function getAttributes(el) {
	return Map.call(el.attributes, (attr) => {
      return {
          name: attr.name,
          value: attr.value
      }
  })
}

function parseDirective(attr, el) {
	const { name, value } = attr
	let dirName, dirArg, key, filterName, filter
	el.removeAttribute(name)
	if (name.indexOf('v-') === -1) return 
	const attrArr = name.split('-')
	dirName = attrArr[1]
	dirArg = attrArr[2]

	const valueArr = value.replace(/\s/g, '').split('|')
	key = valueArr[0]
	filterName = valueArr[1]
	filter = filters[filterName]

	const directive = {
		el,
		dirName,
		dirArg,
		key,
		filter
	}
	const parseDirective = directives[dirName]

	if (typeof parseDirective === 'function') {
		directive._update = parseDirective.bind(el)
	} else {
		directive._update = parseDirective.update
	}
	return new Directive(directive)

}

class Directive {
	constructor(opts) {
		this.el = opts.el
		this.dirName = opts.dirName
		this.dirArg = opts.dirArg
		this.key = opts.key
		this.filter = opts.filter

		const parseDirective = directives[this.dirName]

		if (typeof parseDirective === 'function') {
			this._update = parseDirective
		} else {
			this._update = parseDirective.update
		}

	}

	applyFilter(value) {
		let ret = value
	}

	update(value) {
		if (this.filter) {
			value = this.filter(value)
		}
		this._update(value)
	}

	// _update(value) {
	// 	const parseDirective = directives[this.dirName]

	// 	if (typeof parseDirective === 'function') {
	// 		parseDirective.call(this, value)
	// 	} else {
	// 		parseDirective.update.call(this, value)
	// 	}

	// }
}

function bindDirective(vue, directive) {
	const { key } = directive
	let binding = vue.bindings[key]
	if (!binding) {
		vue.bindings[key] = binding = {
			value:'',
			directives: []
		}
	}
	binding.directives.push(directive)
}