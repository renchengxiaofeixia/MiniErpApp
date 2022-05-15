<template>
	<view class="search">
		<view class="search-input">
			<text class="iconfont icon-sousuotianchong"></text>
			<input type="text" value="" placeholder="客户/销售/物品名称" />
		</view>
		<text class="iconfont icon-shaixuan" @click="filterShow()"></text>
	</view>
</template>

<script>
	export default {
		props: {
	
		},
		data() {
			return {};
		},
		methods: {
			filterShow() {
				this.$emit("filter")
			}
		}
	}
</script>

<style lang="scss">
	.search {
		display: flex;
		align-items: center;
		margin: 20rpx;

		.search-input {
			display: flex;
			align-items: center;
			flex: 1;
			background-color: #fff;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 10rpx;
			border: 1rpx solid #ccc;

			text {
				color: #878380;
				margin-left: 12rpx;
			}

			input {
				padding-left: 20rpx;
				flex: 1;
			}
		}

		.icon-shaixuan {
			padding: 0 20rpx;
			font-size: 40rpx;
			color: #616161;
			padding-right: 0;
		}
	}
</style>
