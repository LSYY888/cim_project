import axios from 'axios'
var common = {
	log: function (url, data) {
		axios.post(url, data).then(response => {
      if (response.status === 200) {
        if (response.data.code === 200) {}
      }
    })
	}

}
export default common
