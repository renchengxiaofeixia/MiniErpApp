<template>
	<view class="listing">

		<view class="amount" v-if="hide">
			<text class="sum">
				一共{{list.length}}条数据
			</text>
			<!-- <text class="price">
				￥1000.00
			</text> -->
		</view>
		<view class="tabulation">
			<radio-group @change="radioChange">
				<scroll-view class="scroll-view" scroll-x="true" v-for="(item,index) in list" :key="index">
					<view class="scroll-item">
						<view class="goods-list" @click.stop="$navto.navto(url,{id:item.id})">
							<view class="goods-flex">
								<view class="black name">
									<block v-if="tab == 1">{{item.prodName}} <text class="model"
											v-if="item.prodModel">({{item.prodModel}})</text> </block>
									<block v-if="tab == 2 || tab == 4 || tab==6">{{item.supplierName}}</block>
									<block v-if="tab == 3 || tab == 5">{{item.customerNo}}</block>

									<!-- <block>李三</block>
								<text class="gray shift">调拨到</text>
								<block>李三</block> -->
								</view>
								<view class="green" v-if="tab == 1">
									<text>0 </text>
									<text>{{item.unit}}</text>
								</view>
								<view class="green" v-if="tab == 4 || tab == 5 ||tab == 6">
									￥{{item.aggregateAmount}}
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
									<view v-if="tab == 4">
										{{item.purchaseNo}}
									</view>
									<view v-if="tab == 5">
										{{item.orderNo}}
									</view>
									<view v-if="tab == 6">
										{{item.enterWarehouseNo}}
									</view>
									<view v-if="tab == 4 || tab == 5 || tab == 6">
										{{item.prodNos}}
									</view>
								</view>
								<view class="supply-img" v-if="tab == 2 && !radio"
									@click.stop="$api.dialPhone(item.mobile)">
									<image src="../../static/image/adapter_supplier_search_result_item_phone_call.png"
										mode="aspectFit"></image>
								</view>

								<view class="supply-img" v-if="tab == 3 && !radio">
									<image src="../../static/image/home_main_btn_tab_product2.png" mode="aspectFit">
									</image>
								</view>
								<view class="storage" v-if="tab == 4">
									{{item.purchaseStatus}}
								</view>
								<view class="storage" v-if="tab == 5">
									{{item.orderStatus}}
								</view>
								<label class="radio" v-if="radio">
									<radio :value="JSON.stringify(item)" />
								</label>
							</view>
						</view>
						<view class="goods-btn" v-if="hide">
							<button class="pinless" style="background-color: #ffb535;" @click.stop="amend(item.id)">
								修改
							</button>
							<button class="pinless" style="background-color: #ff4622;"
								@click.stop="drop(item.id,index)">
								删除
							</button>
						</view>
					</view>
				</scroll-view>
			</radio-group>
			<view class="empty-log" v-if="list.length == 0">
				<image src="../../static/image/nodata.png" mode="aspectFill"></image>
				<text v-if="userLoginFlag">无相关信息，请去新建！</text>
				<text v-else @click="$navto.navto('pages/user/login')" class="isLog">去登录 ！</text>
			</view>
		</view>
	</view>
</template>

<script>
	let app = getApp();
	export default {
		props: {
			tab: {
				type: String,
				default: '0' //1物品  2供应商  3客户 4采购 5销售 6入库
			},
			list: { //数据
				type: Array,
				default: []
			},
			url: { //跳转地址
				type: String,
				default: ''
			},
			hide: { //关闭总数和更改
				type: Boolean,
				default: true,
			},
			radio: { //是否开启选择
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				touch: false,
				content: [],
				current: 0,

			};
		},
		watch: {
			list(item) {
				this.list = item;
			}
		},
		created() {
			this.userLoginFlag = app.globalData.userLogin;
		},
		methods: {
			logoTime() {
				this.touch = true;
			},
			loosenTime() {
				this.touch = false;
			},
			amend(id) {
				this.$emit("amend", id);
			},
			drop(id, index) {
				this.$emit("drop", id, index);
			},
			radioChange(e) {
				this.$emit("radioChange", e);
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
			.scroll-view {
				width: 750rpx;
				border-bottom: 1rpx solid #eee;

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

						.model {
							margin: 0 6rpx;
							font-size: 24rpx;
							color: #777;
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
		}
	}
</style>
