<template>
	<view class="popup" v-if="show">
		<view class="mask" @click="close"></view>
		<view class="layer">
			<view class="popup-title">
				{{title}}
			</view>
			<input type="text" placeholder="填写单位名称">
			<view class="popup-bnt">
				<button class="blue" @click="close">取消</button>
				<button class="blue">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			show: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			};
		},
		methods: {
			close() {
				this.$emit("close");
			}
		}
	}
</script>

<style lang="scss">
	.popup {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 99;

		.mask {
			position: fixed;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.3);
		}

		.layer {
			position: fixed;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			margin: auto;
			background-color: #fff;
			width: 440rpx;
			height: 270rpx;
			border-radius: 14rpx;
			overflow: hidden;

			.popup-title {
				font-size: 28rpx;
				padding: 40rpx 0;
				text-align: center;

			}

			input {
				margin: 0 30rpx;
				border: 1rpx solid #ccc;
				border-radius: 10rpx;
				padding: 10rpx 6rpx;
			}

			.popup-bnt {
				display: flex;
				align-items: center;
				border-top: 1rpx solid #ccc;
				margin-top: 20rpx;

				button {
					flex: 1;
					font-size: 30rpx;
					border-radius: 0;

					&:nth-child(1) {
						border-right: 1rpx solid #ccc;
					}
				}
			}
		}
	}
</style>
