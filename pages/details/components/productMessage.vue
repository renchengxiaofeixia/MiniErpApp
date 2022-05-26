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
				<view class="gray">
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
			coord: {
				type: Number,
				default: -1
			},

		},
		watch: {},
		data() {
			return {
				list: [],
				totalPrice: 0,
			}
		},
		mounted() {
			this.getData();
		},
		methods: {
			getData() {
				let _this = this;
				_this.$request.get('purchase/prodinfos/' + _this.coord).then(res => {
					_this.list = res.data;
					_this.list.forEach(e => {
						e.money = e.unitPrice * e.quantity;
						_this.totalPrice += e.money;
					})
				})
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
