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

		<view class="login-btn" @click="isRegister()">
			<button class="bg-green white">注册</button>
		</view>

	</view>
</template>

<script>
	let {
		$register
	} = require('@/api/user.js');
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
			isRegister() {
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
				let data = {
					userName: userName,
					password: password,
				}
				$register(data).then((res) => {
					setTimeout(() => {
						_this.$navto.navBack();
					}, 1000)
					_this.$api.msg('注册成功')
				}).catch(error => {
					_this.$api.msg(error.data);
				});
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
