import filters from './filters'

export function observer(key, vue) {
	const binding = vue.bindings[key]
	Object.defineProperty(vue.data, key, {
		get() {
			return binding.value
		},
		set(newVal) {
			binding.value = newVal
			binding.directives.forEach((directive) => {
					directive.update(newVal)
			})
		}
	})
}

export function observerArray(collection) {

}