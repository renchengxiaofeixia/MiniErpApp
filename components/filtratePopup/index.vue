<template>
	<view class="">
		<uni-drawer ref="isShow" mode="right" :width="320">
			<view class="header bg-green" :style="{height:height}">
				<view class="header-bar" :style="{'padding-top': marginTop}">
					<text class="iconfont icon-guanbi" @click="closeDrawer"></text>
					<view class="header-text">
						筛选
					</view>
				</view>
			</view>
			<view class="content">
				<slot></slot>
			</view>
			<view class="btn">
				<button class="cancel black" @click="closeDrawer">取消</button>
				<button class="confirm bg-green white">确定</button>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		computed: {
			height() {
				const {
					platform,
					statusBarHeight
				} = uni.getSystemInfoSync()
				let height = statusBarHeight + 4 //ios 24px
				if (platform.toLowerCase() == "android") {
					height += 4
				}
				return height + 38 + "px"
			},
			marginTop() {
				const {
					platform,
					statusBarHeight
				} = uni.getSystemInfoSync()
				let height = statusBarHeight + 4
				if (platform.toLowerCase() == "android") {
					height += 4
				}
				return height + "px"
			}
		},
		methods: {
			// 打开窗口
			showDrawer() {
				this.$refs.isShow.open()
			},
			// 关闭
			closeDrawer() {
				this.$refs.isShow.close()
			},
		}
	}
</script>

<style lang="scss">
	.header-bar {
		display: flex;
		align-items: center;

		.icon-guanbi {
			color: #fff;
			font-size: 42rpx;
			margin-left: 30rpx;
		}

		.header-text {
			flex: 1;
			text-align: center;
			color: #fff;
			font-size: 30rpx;
			font-weight: 500;
		}

	}

	.content {
		background-color: #efeef3;
		height: 82vh;
		overflow-y: auto;
		padding-bottom: 40rpx;
	}

	.btn {
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		border-top: 1rpx solid #ccc;
		padding-top: 20rpx;


		button {
			margin-left: 20rpx;
			flex: 1;
			height: 70rpx;
			font-size: 28rpx;

		}

		.cancel {
			border-radius: 6rpx;
			border: 1rpx solid #eee;

		}

		.confirm {
			margin-right: 20rpx;
		}

	}
</style>
