import filters from './filters'

export default function observer(key, vue) {
	const binding = vue.bindings[key]
	Object.defineProperty(vue.data, key, {
		get() {
			return binding.value
		},
		set(newVal) {
			binding.value = newVal
			binding.directives.forEach((directive) => {
				((value) => {
					const filter = directive.filter
					if (filter) {
						value = filters[filter](value)
					}
					directive.update(value)
				})(newVal)
			})
		}
	})
}