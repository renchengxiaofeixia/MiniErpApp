
// 判断用户是否登入
const isLogin = () => {
	const app = getApp();
	if (!app.globalData.userLogin) {
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

// 提示
const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	return uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
//模态弹窗
const showModal = (content = "", title = '提示') => {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: title,
			content: content,
			success: function(res) {
				if (res.confirm) {
					resolve();
				} else if (res.cancel) {

				}
			}
		});
	});

}

// 电话拨打
const dialPhone = (item) => {
	uni.makePhoneCall({
		phoneNumber: item.toString()
	}).catch((e) => {
		// console.log(e)  //用catch(e)来捕获错误{makePhoneCall:fail cancel}
	})

}

// 上一页的数据
const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

// 获取当前时间
const dateTime = (time) => {
	Date.prototype.Format = function(fmt) { // author: meizz
		var o = {
			"M+": this.getMonth() + 1, // 月份
			"d+": this.getDate(), // 日
			"h+": this.getHours(), // 小时
			"m+": this.getMinutes(), // 分
			"s+": this.getSeconds(), // 秒
			"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
			"S": this.getMilliseconds() // 毫秒
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[
					k]) :
				(("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}

	return new Date().Format(time);
}


export {
	isLogin,
	msg,
	dialPhone,
	prePage,
	dateTime,
	showModal
}
