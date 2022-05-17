<template>
	<view class="listing">

		<view class="amount">
			<text class="sum">
				一共1条数据
			</text>
			<text class="price">
				￥1000.00
			</text>
		</view>
		<view class="tabulation">

			<view class="date gray" v-if="date">
				2032-05-03
			</view>

			<scroll-view class="scroll-view" scroll-x="true">
				<view class="scroll-item" v-for="(item,index) in list" :key="index">
					<view class="goods-list" @click="$navto.navto(url,{id:item.id})">
						<view class="goods-flex gauge">
							<view class="black name">
								{{item.prodName}}
								<!-- <block>李三</block>
								<text class="gray shift">调拨到</text>
								<block>李三</block> -->
							</view>
							<view class="green">
								<text>0 </text>
								<text>{{item.unit}}</text>
							</view>
						</view>
						<view class="goods-flex gray">
							<view>
								<view>{{item.prodNo}}</view>
								<!-- <view class="part">大佳品等1项</view> -->
							</view>
							<!-- <view class="storage">
								未完成出库
							</view> -->
						</view>
					</view>
					<view class="goods-btn">
						<slot></slot>
					</view>
				</view>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array,
			url: {
				type: String,
				default: ''
			},
			icon: {
				type: Number,
				default: 0
			},
			date: {
				type: Boolean,
				default: true,

			}
		},
		data() {
			return {
				touch: false,
			};
		},
		methods: {
			logoTime() {
				this.touch = true;
			},
			loosenTime() {
				this.touch = false;
			}
		}
	}
</script>

<style lang="scss">
	.listing {
		.amount {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10rpx 20rpx;
			background-color: #fff;
			border-bottom: 1rpx solid #ccc;

			.sum {
				color: #898989;
			}
		}

		.price {
			color: #367951;
		}

		.tabulation {

			.date {
				margin-left: 20rpx;
				padding: 16rpx 0;
			}

			.scroll-view {
				border-top: 1rpx solid #ccc;
				border-bottom: 1rpx solid #ccc;
				width: 750rpx;

				.scroll-item {
					display: flex;
					width: 100%;
					height: 100%;
				}

				.goods-list {
					padding-bottom: 20rpx;
					width: 750rpx;
					flex-shrink: 0;
					height: 100%;

					.name {
						font-size: 32rpx;
						font-weight: 500;

						.shift {
							margin: 0 6rpx;
						}
					}

					.storage {
						color: #f5c983;
						border: 4rpx solid #f5c983;
						font-size: 32rpx;
						font-weight: 600;
						padding: 6rpx 10rpx;
						transform: rotate(-10deg);
						margin-right: 20rpx;
						margin-top: 20rpx;
					}
				}

				.goods-btn {
					display: flex;
					align-items: center;
					height: 100%;
				}
			}

			.gauge {
				padding: 14rpx 0;
				padding-bottom: 20rpx;
			}

			.part {
				padding-bottom: 8rpx;
				padding-top: 6rpx;
			}
		}
	}
</style>
