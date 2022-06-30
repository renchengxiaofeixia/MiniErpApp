// const baseUrl = 'http://192.168.110.187:30008/';
const baseUrl = 'https://127.0.0.1:7053/';

export default function request(url, method, data, isToken = false) {
	// options.header = {
	// 	"Content-Type": "application/x-www-form-urlencoded",
	// }
	let header = {};
	const token = getApp().globalData.token;
	if (token) {
		header = {
			'Authorization': 'Bearer ' + token
		}
	}

	if (!isToken && !token) {
		console.log("请登录");
		return
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url || '',
			method: method || 'GET',
			data: data || {},
			header: header || {}
		}).then(data => {
			let [err, res] = data;
			// console.log(data)
			if (res.statusCode == 200 || res.statusCode == 201 || res.statusCode == 202 ||
				res.statusCode == 203 || res.statusCode == 204 || res.statusCode == 205 ||
				res.statusCode == 206) {
				resolve(res);
			} else {
				reject(res)
			}
		}).catch(error => {
			reject(error)
		})
	});
}

['get', 'post', 'put', 'delete'].forEach((method) => {
	request[method] = (url, data, opt) => request(url, method, data, opt || "")
});
