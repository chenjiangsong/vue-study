export function observer(vue, binding) {
    const { key } = binding
    Object.defineProperty(vue.data, key, {
        set(newVal) {
            binding.value = newVal
            binding.directives.forEach((directive) => {
                directive.update(directive.el, newVal)
            })
        },
        get() {
            return binding.value
        }
    })
}
