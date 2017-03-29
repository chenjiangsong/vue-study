const directives = {
    text(el, value) {
        el.textContent = value
    },
    show(el, value) {
        el.style.display = value
    }
}

const prefix = 'v-'

const selector = Object.keys(directives).map((key) => {
    return `[v-${key}]`
}).join()

const forEach = Array.prototype.forEach

export default class Vue {
    constructor(opts) {
        // 获取根节点dom
        let root = this.root = document.getElementById(opts.id)
        // 获取root里所有带有预置directives的dom节点
        let els = this.els = root.querySelectorAll(selector)
        // bindings为data和directives的映射关系
        let bindings = this.bindings = {}
        // 解析dom
        this.compileNode()
    }

    compileNode() {
        forEach.call(this.els, (el) => {
            
        })
    }

}
