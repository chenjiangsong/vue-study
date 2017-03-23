'use strict'

let data = {}
Object.defineProperty(data, 'name', {
    set: function(newVal) {
        console.log('hello'+ newVal)
    },
    get: function() {
        return this.name
    }
})

setTimeout(() => {
    data.name = 'cjs'
}, 1000)