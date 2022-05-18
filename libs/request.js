

const baseUrl = 'http://192.168.110.187:30008/';


const request = (options = {}) => {
	// options.header = {
	// 	"Content-Type": "application/x-www-form-urlencoded",
	// }
	const token = uni.getStorageSync('token');
	if (token) {
		options.header = {
			'Authorization': 'Bearer ' + token
		}
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + options.url || '',
			method: options.type || 'GET',
			data: options.data || {},
			header: options.header || {}
		}).then(data => {
			let [err, res] = data;
			console.log(data)
			if (res.statusCode == 200 || res.statusCode == 201 || res.statusCode == 202 ||
				res.statusCode == 203 || res.statusCode == 204 || res.statusCode == 205 ||
				res.statusCode == 206) {

				resolve(res);
			} else {
				reject(res)
			}
		}).catch(error => {
			console.log(error)
			reject(error)
		})
	});
}

const get = (url, data, options = {}) => {
	options.type = 'GET';
	options.data = data;
	options.url = url;
	return request(options)
}

const post = (url, data, options = {}) => {
	options.type = 'POST';
	options.data = data;
	options.url = url;

	return request(options)
}

const put = (url, data, options = {}) => {
	options.type = 'PUT';
	options.data = data;
	options.url = url;

	return request(options)
}

const del = (url, data, options = {}) => {
	options.type = 'DELETE';
	options.data = data;
	options.url = url;

	return request(options)
}
export default {
	request,
	get,
	post,
	put,
	del
}
