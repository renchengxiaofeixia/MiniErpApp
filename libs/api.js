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

const dialPhone = (item) => {
	uni.makePhoneCall({
		phoneNumber: item.toString()
	}).catch((e) => {
		// console.log(e)  //用catch(e)来捕获错误{makePhoneCall:fail cancel}
	})

}


const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}


const currentTime = ()=>{
	// 获取当前时间
	var datetime = new Date();
	var year = datetime.getFullYear();
	var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
	var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
	return year + '-' + month + '-' + date;
}
export {
	isLogin,
	token,
	msg,
	dialPhone,
	prePage,
	currentTime
}
