<template>
	<view class="footer">
		<view class="footer-btn">
			<button class="cancel" @click="$navto.navBack">取消</button>
			<button class="confirm" @tap.stop="confirm">确定</button>
		</view>


	</view>

</template>

<script>
	export default {
		props: {

		},
		computed: {

		},
		data() {
			return {

			};
		},
		methods: {
			confirm() {
				this.$emit("confirm")
			}
		}
	}
</script>

<style lang="scss">
	.footer {
		padding-top: 20rpx;
		height: 100rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: inherit;
	}

	.footer-btn {
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		align-items: center;
		background-color: #fff;
		border-top: 1rpx #ccc solid;
		padding-top: 20rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		z-index: 6;

		button {
			flex: 1;
			color: #fff;
			font-size: 30rpx;
			margin: 0 30rpx;
			height: 80rpx;

		}

		.cancel {
			background-color: #6d6d6d;
		}

		.confirm {
			background-color: #2ea469;
		}

	}
</style>
