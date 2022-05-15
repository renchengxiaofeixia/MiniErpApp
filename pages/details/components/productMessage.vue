<template>
	<view class="table">
		<view class="headline">
			入库物品
		</view>

		<view class="goods-flex back">
			<view class="">
				<text>李三</text>
				<text class="gray">(8888)</text>
			</view>
			<view class="">
				￥1000
			</view>
		</view>
		<view class="come gray back">
			wp00001
		</view>
		<view class="goods-flex" style="padding-bottom: 14rpx;">
			<view class="gray">
				￥1000 x 1件
			</view>
			<view class="gray">
				一件未入库
			</view>
		</view>
		
		<view class="money">
			<view class="price">
				<text>合计：</text>
				<text class="green">￥10000</text>
			</view>
			<view class="price">
				<text>优惠：</text>
				<text class="green">￥10000</text>
			</view>

			<view class="price back">
				<text class="price-text">优惠后金额：</text>
				<text class="green">￥10000</text>
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
		font-size: 34rpx;
		margin: 0 20rpx;
		padding: 16rpx 0;
		border-bottom: 1rpx solid #eee;
	}

	.back {
		padding-top: 14rpx;
	}

	.come {
		margin-left: 20rpx;
		padding-bottom: 10rpx;
	}

	.money {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 20rpx 0;
		margin: 0 20rpx;
		border-top: 1rpx solid #eee;

		.price {
			margin-right: 20rpx;
			font-size: 32rpx;
		}

		.price-text {
			font-weight: 700;
			font-size: 34rpx;
		}
	}
</style>
