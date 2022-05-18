<template>
	<view class="listing">

		<view class="amount" v-if="hide">
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

			<scroll-view class="scroll-view" scroll-x="true" v-for="(item,index) in list" :key="index">
				<view class="scroll-item">
					<view class="goods-list" @click="$navto.navto(url,{id:item.id})">
						<view class="goods-flex">
							<view class="black name">
								<block v-if="tab == 1">{{item.prodName}}</block>
								<block v-if="tab == 2">{{item.supplierName}}</block>
								<block v-if="tab == 3">{{item.customerNo}}</block>
								<!-- <block>李三</block>
								<text class="gray shift">调拨到</text>
								<block>李三</block> -->
							</view>
							<view class="green" v-if="tab == 1">
								<text>0 </text>
								<text>{{item.unit}}</text>
							</view>
						</view>
						<view class="goods-flex gray">
							<view>
								<view v-if="tab == 1">{{item.prodNo}}</view>
								<block v-if="tab == 2 || tab == 3">
									<view class="">
										<text>联系人：</text>
										<text v-if="tab == 2">{{item.contacterName}}</text>
										<text v-if="tab == 3">{{item.customerName}}</text>
									</view>
									<view class="">
										<text>联系人电话：</text>
										<text>{{item.mobile}}</text>
									</view>
								</block>
								<!-- <view class="part">大佳品等1项</view> -->
							</view>
							<view class="supply-img" v-if="tab == 2">
								<image src="../../static/image/adapter_supplier_search_result_item_phone_call.png"
									mode="aspectFit"></image>
							</view>

							<view class="supply-img" v-if="tab == 3">
								<image src="../../static/image/home_main_btn_tab_product2.png" mode="aspectFit"></image>
							</view>
							<!-- <view class="storage">
								未完成出库
							</view> -->
						</view>
					</view>
					<view class="goods-btn" v-if="hide">
						<button class="pinless" style="background-color: #ffb535;" @click="amend(item.id)">
							修改
						</button>
						<button class="pinless" style="background-color: #ff4622;" @click="drop(item.id,index)">
							删除
						</button>
					</view>
				</view>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tab: {
				type: String,
				default: '0' //1 物品  2 供应商 3 客户
			},
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
			},
			hide:{
				type: Boolean,
				default: true,
			}
		},
		data() {
			return {
				touch: false,
			};
		},
		created() {

		},
		methods: {
			logoTime() {
				this.touch = true;
			},
			loosenTime() {
				this.touch = false;
			},
			amend(id) {
				this.$emit("amend",id);
			},
			drop(id) {
				this.$emit("drop",id);
			}
		}
	}
</script>

<style lang="scss">
	.listing {
		.amount {
			position: sticky;
			top: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10rpx 20rpx;
			background-color: #fff;
			border-bottom: 1rpx solid #ccc;
			z-index: 99;

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
				width: 750rpx;

				.scroll-item {
					display: flex;
					width: 100%;
					height: 100%;
				}

				.supply-img {
					width: 114rpx;
					height: 114rpx;
					transform: translateY(-16rpx);
				}

				.goods-list {
					padding-bottom: 20rpx;
					padding-top: 14rpx;
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
				}
			}

			.part {
				padding-bottom: 8rpx;
				padding-top: 6rpx;
			}
		}
	}
</style>
