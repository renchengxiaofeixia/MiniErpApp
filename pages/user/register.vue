<template>
	<view class="">
		<headerTab title="注册"></headerTab>
		<view class="headline">

		</view>

		<form>
			<view class="login">
				<input type="text" placeholder="请输入账号" maxlength="13" v-model="userName">
				<input type="text" password placeholder="请输入密码" v-model="password">
				<input type="text" password placeholder="请确认密码" v-model="repassword">
			</view>
		</form>

		<view class="login-btn" @click="login()">
			<button class="bg-green white">注册</button>
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
				password: "",
				repassword: "",

			}
		},
		onLoad(e) {

		},
		methods: {
			login() {
				let _this = this;
				let userName = _this.userName;
				let password = _this.password;
				let repassword = _this.repassword;
				if (userName == '') {
					_this.$api.msg('账号不能为空');
					return;
				}
				if (password == '') {
					_this.$api.msg('密码不能为空');
					return;
				}
				if (repassword == '') {
					_this.$api.msg('确认密码不能为空');
					return;
				}
				if (repassword !== password) {
					_this.$api.msg('两次密码不一致，请重新输入');
					return;
				}
				_this.$request.post('signup', {
					userName: userName,
					password: password,
				}).then(res => {
					_this.$navto.navBack();
					_this.$api.msg('注册成功')
				}).catch(error => {
					_this.$api.msg('注册失败，已经该有账号');
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

	.login-btn {
		margin: 40rpx;

	}
</style>
