<template>
	<view class="">
		<headerTab title="账号信息"></headerTab>
		<view class="table">
			<view class="goods-flex mgs">
				<view class="gray name">登录名：</view>
				<view class="black fill">123</view>
			</view>
			<view class="goods-flex mgs">
				<view class="gray name">手机号：</view>
				<view class="black fill">123</view>
			</view>
			<view class="goods-flex mgs">
				<view class="gray name">邮箱：</view>
				<view class="black fill">123</view>
			</view>
		</view>
	</view>
</template>

<script>
	let {

	} = require('@/api/user.js');
	import headerTab from '@/components/headerTab/index.vue';
	export default {
		components: {
			headerTab,

		},
		data() {
			return {


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
