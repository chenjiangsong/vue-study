/*
	预置指令
 */

export default {
		text(value) {
        this.textContent = value
    },
    show(value) {
        this.style.display = value ? '' : 'none'
    },
    class(value) {
    	this.className = value
    },
    on: {
    	update(handler) {
    		const event = this.dirArg

    		if (!this.handlers) {
            this.handlers = {}
        }
        var handlers = this.handlers
        if (handlers[event]) {
            this.el.removeEventListener(event, handlers[event])
        }
        if (handler) {
            handler = handler.bind(this.el)
            this.el.addEventListener(event, handler)
            handlers[event] = handler
        }
    	}
    }
}