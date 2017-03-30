const directives = {
    text(value) {
        this.textContent = value
    },
    show(value) {
        this.style.display = value ? '' : 'none'
    }
}

const prefix = 'v-'

const selector = Object.keys(directives).map((key) => {
    return `[v-${key}]`
}).join()

const ForEach = Array.prototype.forEach
const Map = Array.prototype.map

export default class Vue {

    constructor(opts) {

        // 获取根节点dom
        let root = this.root = document.getElementById(opts.id)
        // 获取root里所有带有预置directives的dom节点
        let els = this.els = root.querySelectorAll(selector)
        // bindings为data和directives的映射关系
        let bindings = this.bindings = {}
        let data = this.data = {

        }
        // 解析dom
        this.compileNode()
        Object.keys(bindings).forEach((key) => {
            this.data[key] = opts.data[key]
        })
    }

    compileNode() {
        ForEach.call(this.els, (el) => {
            const attrs = this.getAttributes(el)
            attrs.map((attr) => {
                this.bindDirectives(attr, el)
            })
        })
    }

    getAttributes(el) {
        return Map.call(el.attributes, (attr) => {
            return {
                name: attr.name,
                value: attr.value
            }
        })
    }

    bindDirectives(attr, el) {
        if (attr.name.indexOf('v-') === -1) return

        const key = attr.value
        const name = attr.name.slice(2)
        let binding = this.bindings[key]
        let directive = {}
        if (!binding) {
            this.bindings[key] = binding = {
                key: key,
                value: '',
                directives: []
            }
        }
        directive.update = directives[name].bind(el)
        binding.directives.push(directive)

        if (!this.data.hasOwnProperty(key)) {
            this.observer(key, binding)
        }
    }

    observer(key, binding) {
        Object.defineProperty(this.data, key, {
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

}
