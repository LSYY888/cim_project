var formate = {
	    add0: function (m) {
		return m < 10 ? '0' + m : m
	},
	format: function (tim) {
				var time = new Date(tim)
				var y = time.getFullYear()
				var m = time.getMonth() + 1
				var d = time.getDate()
				var h = time.getHours()
				var mm = time.getMinutes()
				var s = time.getSeconds()
				return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
	}
}
export default formate
