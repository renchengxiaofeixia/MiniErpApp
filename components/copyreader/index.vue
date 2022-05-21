<template>
	<view class="copyreader" :class="show">
		<view class="cover mask" @click="handleClose()"></view>
		<view class="layer">
			<view class="listing">
				<slot></slot>
			</view>
			<view class="cancel" @click="handleClose()">
				取消
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
			adjustList: Array
		},
		data() {
			return {};
		},
		methods: {
			handleClose() {
				this.$emit("close");

			},
		}
	}
</script>

<style lang="scss">
	.copyreader {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 99;

		.cover {
			position: fixed;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 2;
			background-color: rgba(0, 0, 0, 0.3);
		}

		.layer {
			position: fixed;
			bottom: 0;
			width: 710rpx;
			margin: 0 20rpx;
			z-index: 9;

			.cancel {
				background-color: #ffffffd6;
				margin-bottom: 0;
				margin-bottom: constant(safe-area-inset-bottom);
				margin-bottom: env(safe-area-inset-bottom);
				text-align: center;
				font-weight: 600;
				color: #2067e8;
				font-size: 32rpx;
				height: 90rpx;
				line-height: 90rpx;
				border-radius: 16rpx;
				margin-top: 16rpx;
			}

			.listing {
				background-color: #fff;
				border-radius: 16rpx;
				overflow: hidden;
			}
		}
	}


	/* 动画 */
	.show {
		display: block;

		.mask {
			animation: showPopup 0.3s linear both;
		}

		.layer {
			animation: showLayer 0.3s linear both;
		}
	}

	.hide {
		.mask {
			animation: hidePopup 0.4s linear both;
		}

		.layer {
			animation: hideLayer 0.4s linear both;
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
			transform: translateY(120%);
		}

		100% {
			transform: translateY(0%);
		}
	}

	@keyframes hideLayer {
		0% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(120%);
		}
	}
</style>
