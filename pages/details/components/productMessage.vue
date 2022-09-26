<template>
	<view class="table">
		<view class="headline">
			{{title}}
		</view>

		<block v-for="(item,index) in list" :key="index">
			<view class="" hover-class="checkActive">
				<view class="goods-flex back">
					<view class="">
						<text>{{item.prodName}}</text>
						<text class="gray">({{item.prodModel}})</text>
					</view>
					<view class="" v-if="hide">
						￥{{item.money}}
					</view>
					<view class="green" v-else>
						库存: {{item.actualNum}}
					</view>
				</view>
				<view class="come gray back">
					{{item.prodNo}}
				</view>
				<view class="goods-flex" style="padding-bottom: 14rpx; border-bottom: 1rpx solid #ccc;" v-if="hide">
					<view class="gray">
						￥{{item.unitPrice}} x {{item.quantity}}件
					</view>
					<view class="gray" v-if="item.receiverStatus">
						{{item.receiverStatus}}
					</view>
				</view>
				<view class="goods-flex" v-else>
					计件：{{item.systemNum}}
				</view>
			</view>
		</block>

		<view class="money" v-if="hide">
			<text class="total">合计：</text>
			<text class="green">￥{{totalPrice}}</text>
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
				type: Array,
				default: []
			},
			hide: {
				type: Boolean,
				default: true
			}

		},
		watch: {
			list: {
				handler(item, index) {
					item.forEach(e => {
						this.totalPrice += e.money;
					})
				},
				deep: true // 深度监听父组件传过来对象变化
			}
		},
		data() {
			return {
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
		font-weight: 600;
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
