<template>
	<view>
		<view class="search">
			<view class="search-input">
				<text class="iconfont icon-sousuotianchong"></text>
				<input type="text" :placeholder="placeholder" @blur="blurSearch" />
			</view>
			<text class="iconfont icon-shaixuan" @click="filterShow()"></text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			placeholder: {
				type: String,
				default: ''
			}
		},
		data() {
			return {};
		},
		methods: {
			filterShow() {
				this.$emit("filter")
			},
			blurSearch(event) {
				let val = event.detail.value;
				if (!val) {
					return
				}
				this.$emit('confirm', val.replace(/\s+/g, ''))
			},
		}
	}
</script>

<style lang="scss">
	.search {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 20rpx;
		background-color: #f2f2f2;

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
