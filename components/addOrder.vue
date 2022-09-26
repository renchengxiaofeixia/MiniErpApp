<template>
	<view>
		<block v-if="type == 1">
			<view class="add bg-green" @click="navto()" :style="{top: top}">
				<text class="iconfont icon-tianjia"></text>
			</view>
		</block>


		<block v-if="type == 2">
			<view class="recompile" @click="append()">
				<text class="iconfont icon-bianji1 green"></text>
				<view class="green">
					编辑
				</view>
			</view>
		</block>

		<block v-if="type == 3">
			<view class="recompile" @click="append()">
				<text class="iconfont icon-tianjiaadd143 green"></text>
				<view class="green">
					添加
				</view>
			</view>
		</block>

	</view>
</template>

<script>
	let  app = getApp();
	export default {
		props: {
			url: String,
			type: {
				type: Number,
				default: 1
			},
			top: {
				type: String,
				default: "90%"
			}
		},
		data() {
			return {

			};
		},
		methods: {
			navigation() {
				if (!this.url) {
					return
				}
				uni.navigateTo({
					url: this.url
				});
			},
			append() {
				this.$emit("click");
			},
			navto() {
				this.$api.isLogin();
				console.log(app);
				if (app.globalData.userLogin) {
					this.$navto.navto(this.url);
				}

			}
		}
	}
</script>

<style lang="scss">
	.recompile,
	.add {
		position: fixed;
		right: 30rpx;
		bottom: 0;
		margin: auto;
		width: 90rpx;
		height: 90rpx;
		z-index: 40;
	}

	.add {
		border-radius: 50%;
		line-height: 90rpx;
		text-align: center;

		.iconfont {
			color: #fff;
			font-size: 42rpx;
		}

	}

	.recompile {
		text-align: center;
		background-color: #fff;
		font-size: 24rpx;
		padding-top: 10rpx;
		border-radius: 10rpx;
		bottom: 110rpx;
		box-shadow: -1px 5px 20px 0px #cecbcb;


		.iconfont {
			font-size: 46rpx;
		}
	}
</style>
