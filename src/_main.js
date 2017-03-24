
const preDir = ['v-text', 'v-show'].map(function(d) {
    return `[${d}]`
}).join()

const map = {
    'v-text'(el, value) {
        el.textContent = value
    },
    'v-show'(el, value) {
        el.style.display = value ? '' : 'none'
    }
}

export default class Vue {
    constructor(opts) {
        const self = this
        self.data = {}
        self.opts = opts || {}
        const root = self.root = document.getElementById(opts.id)
        self.els = root.querySelectorAll(preDir)
        self.bindings = {}
        Array.prototype.forEach.call(self.els, self.processNode.bind(self))
        Object.keys(self.bindings).forEach((key) => {
            self.data[key] = opts.data[key]
        })
        return self.data
    }
    /*
        compiler
     */
    processNode(el) {
        const self = this
        const attrs = Array.prototype.map.call(el.attributes, function(attr) {
            return {
                name: attr.name,
                value: attr.value
            }
        })
        attrs.forEach(function(attr) {
            self.bindDirective(attr, el)
        })
    }
    /*
        watcher
        建立data与指令的关联关系，
        以data为主键，把所有绑定了该data的directive都关联到该data下
     */
    bindDirective(attr, el) {
        const self = this
        const key = attr.value
        const binding = self.bindings[key] = {}
        binding.el = el
        binding.attr = attr.name
        binding.update = map[attr.name]
        if (!self.data.hasOwnProperty(key)) {
            self.bind(binding, key)
        }
    }
    /*
        observer
     */
    bind(binding, value) {
        const self = this
        console.log(binding)
        Object.defineProperty(self.data, value, {
            set: function(newVal) {
                binding.update(binding.el, newVal)
            },
            get: function() {

            }
        })
    }
}

