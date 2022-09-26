<template>
	<view class="">
		<headerTab title="账号信息"></headerTab>
		<view class="table">
			<view class="goods-flex mgs">
				<view class="gray name">登录名：</view>
				<view class="black fill">{{user.userName}}</view>
			</view>
			<view class="goods-flex mgs">
				<view class="gray name">手机号：</view>
				<view class="black fill">{{user.mobile}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	let app = getApp();
	import headerTab from '@/components/headerTab/index.vue';
	export default {
		components: {
			headerTab,
		},
		data() {
			return {
				user: app.globalData.userName,
			}
		},
		onLoad(e) {

		},
		methods: {


		}

	}
</script>

<style lang="scss">
	.mgs {
		padding: 20rpx 0;
		border-bottom: 1rpx solid #ccc;
		font-size: 30rpx;
		align-items: center;

		&:last-child {
			border-bottom: none;
		}

		.name {
			width: 160rpx;
		}
	}
</style>
