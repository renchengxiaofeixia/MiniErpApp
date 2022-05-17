const navto = function(url, data) {
	console.log(url);
	url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
	uni.navigateTo({
		url: '/' + url
	})
}

const navtab = function(url, data) {
	console.log(url);
	uni.switchTab({
		url: '/' + url
	});
}

// 返回上一页
const navBack = function() {
	uni.navigateBack();
}

// 格式化参数对象
function param(data) {
	let url = ''
	for (var k in data) {
		let value = data[k] !== undefined ? data[k] : ''
		url += '&' + k + '=' + encodeURIComponent(value)
	}
	return url ? url.substring(1) : ''
}


// $navto.navto
export {
	navto,
	navtab,
	navBack

}
