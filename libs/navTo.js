//保留当前页面.跳转到应用内的某个页面
const navto = function(url, data) {
	console.log(url);
	url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
	uni.navigateTo({
		url: '/' + url
	})
}
// 跳转到 tabBar 页面
const navtab = function(url) {
	console.log(url);
	uni.switchTab({
		url: '/' + url
	});
}

// 关闭当前页面，跳转到应用内的某个页面。
const navClose = function(url, data) {
	console.log(url);
	url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
	uni.redirectTo({
		url: '/' + url
	});
}


// 返回上一页
const navBack = function(page) {
	const pages = getCurrentPages();
	if (pages.length === 2) {
		uni.navigateBack({
			delta: 1
		});
	} else if (pages.length === 1) { //如果没有上一页返回首页
		uni.switchTab({
			url: '/pages/index/index',
		})
	} else {
		uni.navigateBack({
			delta: page || 1,
		});
	}

	if (page) {
		uni.removeStorageSync('_back');
	}
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
	navClose,
	navBack,
}
