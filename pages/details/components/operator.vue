<template>
	<view>
		<view class="headline-title">
			操作日记
		</view>

		<view class="table">
			<view class="from side">
				<text class="title gray">制单人</text>
				<text class="fill"> {{list.creator}}</text>
			</view>
			<view class="from side">
				<text class="title gray">制单时间</text>
				<text class="fill"> {{list.createTime}}</text>
			</view>
			<view class="from side">
				<text class="title gray">修改人</text>
				<text class="fill"> {{list.updator}}</text>
			</view>
			<view class="from side">
				<text class="title gray">修改时间</text>
				<text class="fill"> {{list.updatedTime}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: Object
		},
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
	.headline-title {
		padding: 20rpx 20rpx 0;
		font-size: 28rpx;
	}

	.side {
		padding: 10rpx 0;
		border: none;
	}
</style>
