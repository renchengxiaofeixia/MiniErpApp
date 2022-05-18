// 判断token是否存在
const token = uni.getStorageSync('token') ? uni.getStorageSync('token') : ''

// 判断用户是否登入或者登入是否过期
const isLogin = () => {
	if (token == '') {
		uni.showToast({
			title: '请登录',
			icon: 'none',
			duration: 2000,
			success(res) {
				setTimeout(function() {
					uni.navigateTo({
						url: "/pages/user/login"
					})
				}, 2000)
				return
			}
		});
	}
}


const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	return uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

export {
	isLogin,
	token,
	msg
}
