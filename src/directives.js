

export default {
	text(el, value) {
		el.textContent = value || ''
	},
	show(el, value) {
		el.style.display = value ? '' : 'none'
	},
	on: {
		updata: 1
	}
}