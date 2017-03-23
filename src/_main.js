
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

    bindDirective(attr, el) {
        const self = this
        // console.log(attr)
        // console.log(el)
        const key = attr.value
        // const value = attr.value
        const binding = self.bindings[key] = {}
        binding.el = el
        binding.attr = attr.name
        binding.update = map[attr.name]
        self.bind(binding, key)
    }

    bind(binding, value) {
        const self = this
        Object.defineProperty(self.data, value, {
            set: function(newVal) {
                binding.update(binding.el, newVal)
            },
            get: function() {

            }
        })
    }
}

