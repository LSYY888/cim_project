import $ from '../../node_modules/jquery/dist/jquery.min.js'
var url = ''
$.ajax({
	url: 'http://api.snair.cn/domain',
	type: 'get',
	data: {},
	async: false,
	success: function (response) {
		url = response.data.api + '/'
	},
	error: function (error) {
		console.log(error)
	}
})
var api = {
	baseUrl: url,
	localUrl: 'http://vue.snair.cn/#/',
	/* wxUrl: 'http://2x3mei.natappfree.cc/' */
	wxUrl: 'http://api.laifanfan.cn/'
	// baseUrl: 'http://192.168.1.119:8080/',
// localUrl: 'http://192.168.1.118:8089/#/'
}
export default api
