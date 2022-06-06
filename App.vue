<script>
	export default {
		//全局变量
		globalData: {
			//用于判断用户是否登录(默认为否)
			userLogin: false,
			token: uni.getStorageSync('token')
		},
		onLaunch: function() {
			console.log('App Launch')
			const token = uni.getStorageSync('token');
			if (token) {
				this.globalData.userLogin = true;
			} else {
				//解决token消失但登录未过期问题
				this.globalData.userLogin = false;
				//没登录就异步删除验证token
				uni.removeStorage({
					key: 'token',
					success: function(res) {
						console.log('token移除成功');
					}
				});
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url('@/static/iconfont/font.css');
	@import url('@/static/css/base.css');
	@import url('@/static/css/style.css');

	page {
		background-color: #f2f2f2;
	}
</style>
