<template>
	<view class="">
		<headerTab title="登录"></headerTab>
		<view class="headline">
			采购订单登录
		</view>
		<form>
			<view class="login">
				<input type="text" placeholder="请输入账号" maxlength="13" v-model="userName">
				<input type="text" password placeholder="请输入密码" v-model="password">
			</view>
		</form>
		<view class="sign">
			<view>
				忘记密码
			</view>
			<view class="blue" @click="$navto.navto('pages/user/register')">
				立即注册
			</view>
		</view>
		<view class="login-btn" @click="login()">
			<button class="bg-green white">登录</button>
		</view>

	</view>
</template>

<script>
	import headerTab from '@/components/headerTab/index.vue';
	export default {
		components: {
			headerTab,

		},
		data() {
			return {
				userName: "",
				password: ""

			}
		},
		onLoad(e) {

		},
		methods: {
			login() {
				let _this = this;
				let userName = _this.userName;
				let password = _this.password;
				if (userName == '') {
					_this.$api.msg('账号不能为空');
					return;
				}
				if (password == '') {
					_this.$api.msg('密码不能为空');
					return;
				}
				_this.$request.post('signin', {
					userName: userName,
					password: password,
				}).then(res => {
					let token = res.data.token;
					uni.setStorage({
						key: "token",
						data: token,
						success: function() {
							setTimeout(() => {
								_this.$navto.navBack();
							}, 1000)
						}
					})
					_this.$api.msg('成功登录！');

				}).catch(error => {
					_this.$api.msg('登录失败！');
				})
			}
		}
	}
</script>

<style lang="scss">
	.headline {
		font-weight: 700;
		font-size: 50rpx;
		text-align: center;
		color: #2ea469;
		margin-top: 40rpx;
	}

	.login {
		margin: 100rpx 40rpx;
		margin-bottom: 0;

		input {
			border-bottom: 1rpx solid #ccc;
			height: 100rpx;
			font-size: 32rpx;
			padding-left: 20rpx;
		}
	}

	.sign {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 30rpx 40rpx;
	}

	.login-btn {
		margin: 40rpx;

	}
</style>
