<template>
	<view class="filtrate" :class="show">
		<view class="mask" @click="handleClose"></view>

		<view class="layer">
			<view class="header bg-green" :style="{height:height}">
				<view class="header-bar" :style="{'padding-top': marginTop}">
					<text class="iconfont icon-guanbi" @click="handleClose"></text>
					<view class="header-text">
						筛选
					</view>
				</view>
			</view>
			<view class="content">
				<slot></slot>
			</view>
			<view class="btn">
				<button class="cancel black" @click="handleClose">取消</button>
				<button class="confirm bg-green white">确定</button>
			</view>

		</view>
	</view>
</template>

<script>
	
	export default {
		props: {
			show: {
				type: String,
				default: 'none'
			},
		},
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
			handleClose() {
				this.$emit("close");
			}
		}
	}
</script>

<style lang="scss">
	.filtrate {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;


		.mask {
			background-color: rgba(0, 0, 0, 0.3);
			position: fixed;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}

		.layer {
			position: fixed;
			top: 0;
			right: 0;
			width: 710rpx;
			height: 100%;
			background-color: #fff;

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
				height: 100%;
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
		}
	}

	/* 动画 */
	.show {
		display: block;

		.mask {
			animation: showPopup 0.5s linear both;
		}

		.layer {
			animation: showLayer 0.5s linear both;
		}
	}

	.hide {
		.mask {
			animation: hidePopup 0.6s linear both;
		}

		.layer {
			animation: hideLayer 0.6s linear both;
		}
	}

	.none {
		display: none;
	}

	@keyframes showPopup {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes hidePopup {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	@keyframes showLayer {
		0% {
			transform: translateX(120%);
		}

		100% {
			transform: translateX(0%);
		}
	}

	@keyframes hideLayer {
		0% {
			transform: translateX(0);
		}

		100% {
			transform: translateX(120%);
		}
	}
</style>
