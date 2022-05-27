<template>
	<view class="table">
		<view class="headline">
			{{title}}
		</view>

		<block v-for="(item,index) in list" :key="index">
			<view class="goods-flex back">
				<view class="">
					<text>{{item.prodName}}</text>
					<text class="gray">({{item.prodModel}})</text>
				</view>
				<view class="">
					￥{{item.money}}
				</view>
			</view>
			<view class="come gray back">
				{{item.prodNo}}
			</view>
			<view class="goods-flex" style="padding-bottom: 14rpx; border-bottom: 1rpx solid #ccc;">
				<view class="gray">
					￥{{item.unitPrice}} x {{item.quantity}}件
				</view>
				<view class="gray" v-if="item.receiverStatus">
					{{item.receiverStatus}}
				</view>
			</view>
		</block>

		<view class="money">
			<text class="total">合计：</text>
			<text class="green">￥10000</text>
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
			list: {
				type: Object,
				default: []
			},

		},
		watch: {},
		data() {
			return {
				list: [],
				totalPrice: 0,
			}
		},
		created() {

		},
		mounted() {
			this.getData();
		},
		methods: {
			getData() {

			}

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
		padding: 20rpx 0;
		margin: 0 20rpx;
		font-size: 32rpx;

		.total {
			font-weight: 700;
		}
	}
</style>
