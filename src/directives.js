/*
	预置指令
 */

export default {
		text(value) {
        this.el.textContent = value
    },
    show(value) {
        this.el.style.display = value ? '' : 'none'
    },
    class(value) {
    	this.el.className = value
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