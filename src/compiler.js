/*
	解析指令
 */
import directives from './directives'
import observer from './observer'

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
	let dirName, dirArg, key, filter
	el.removeAttribute(name)
	if (name.indexOf('v-') === -1) return 
	const attrArr = name.split('-')
	dirName = attrArr[1]
	dirArg = attrArr[2]

	const valueArr = value.replace(/\s/g, '').split('|')
	key = valueArr[0]
	filter = valueArr[1]

	const directive = {
		el,
		dirName,
		dirArg,
		key,
		filter
	}
	const parseDirective = directives[dirName]

	if (typeof parseDirective === 'function') {
		directive.update = parseDirective.bind(el)
	} else {
		directive.update = parseDirective.update
		console.log(directive.update)
	}
	return directive

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