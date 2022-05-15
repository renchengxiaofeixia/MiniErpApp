<template>
	<view>
		<view class="headline">
			操作日记
		</view>

		<view class="table">
			<view class="from side">
				<text class="title gray">制单人</text>
				<text class="fill"> ￥999</text>
			</view>
			<view class="from side">
				<text class="title gray">制单时间</text>
				<text class="fill"> ￥999</text>
			</view>
			<view class="from side">
				<text class="title gray">修改人</text>
				<text class="fill"> ￥999</text>
			</view>
			<view class="from side">
				<text class="title gray">修改时间</text>
				<text class="fill"> ￥999</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {


		}
	}
</script>

<style lang="scss">
	.headline {
		padding-left: 30rpx;
		padding-top: 20rpx;
	}

	.side {
		padding: 10rpx 0;
		border: none;
	}
</style>
