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
			<view class="date gray">
				2032-05-03
			</view>
			<!-- @click="$navto.navto(url)" @touchstart="logoTime" @touchend="loosenTime"
				:style="{'background': touch ? '#bababa':''}" -->
			<scroll-view class="scroll-view" scroll-x="true">
				<view class="scroll-item">
					<view class="goods-list" @click="$navto.navto(url)">
						<view class="goods-flex gauge">
							<view class="black name">
								<block>李三</block>
								<text class="gray shift">调拨到</text>
								<block>李三</block>
							</view>
							<view class="green">￥6262</view>
						</view>
						<view class="goods-flex gray">
							<view>
								<view>xsjiudwmqwuf</view>
								<view class="part">大佳品等1项</view>
							</view>
							<view class="storage">
								未完成出库
							</view>
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
			url: {
				type: String,
				default: ''
			},
			icon: {
				type: Number,
				default: 0
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
				height: 210rpx;

				.scroll-item {
					display: flex;
					width: 100%;
					height: 100%;
				}

				.goods-list {
					padding-bottom: 50rpx;
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
