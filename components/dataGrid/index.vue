<template>
	<view class="listing">

		<view class="amount" v-if="hide">
			<text class="sum">
				一共{{list.length}}条数据
			</text>
		</view>
		<view class="tabulation">
			<scroll-view class="scroll-roll" scroll-y @scrolltolower="load" style="height: 79vh;" v-if="list != 0">
				<radio-group @change="radioChange">
					<view class="scroll-view" v-for="(item,index) in list" :key="index">
						<view class="scroll-item">
							<view class="goods-list" @click.stop="$navto.navto(url,{id:item.id})">
								<view class="goods-flex">
									<view class="black name">
										{{item.name}}
										<text class="model" v-if="item.model">({{item.model}})</text>
										<!-- <block>李三</block>
							                 <text class="gray shift">调拨到</text>
								             <block>李三</block> -->
									</view>

									<view class="green" v-if="item.price">
										￥{{item.price}}
									</view>
									<view class="green" v-if="item.num">
										{{item.num}}
									</view>
								</view>
								<view class="goods-flex gray">
									<view>
										<view v-if="item.No">
											{{item.No}}
										</view>
										<view v-if="item.count">
											{{item.count}}
										</view>
										<block v-if="tab == 2 || tab == 3">
											<view class="">
												联系人：{{item.linkman}}
											</view>
											<view>
												联系人电话：{{item.phone}}
											</view>
										</block>
									</view>
									<view class="supply-img" v-if="tab == 2 && !radio"
										@click.stop="$api.dialPhone(item.mobile)">
										<image
											src="../../static/image/adapter_supplier_search_result_item_phone_call.png"
											mode="aspectFit"></image>
									</view>

									<view class="supply-img" v-if="tab == 3 && !radio">
										<image src="../../static/image/home_main_btn_tab_product2.png" mode="aspectFit">
										</image>
									</view>
									<view class="storage" v-if="item.check">
										{{item.check}}
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
					</view>
				</radio-group>
				<uni-load-more :status="status" IconType="auto" :content-text="contentText" />
			</scroll-view>
			<view class="empty-log" v-else>
				<image src="../../static/image/nodata.png" mode="aspectFill"></image>
				<text v-if="userLoginFlag">空空如也！</text>
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
			},
			status: { //下拉加载
				type: String,
				default: ''
			}
		},
		data() {
			return {
				touch: false,
				content: [],
				current: 0,
				userLoginFlag: false,
				contentText: {
					contentdown: '下拉加载',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},

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
			},
			load(e) {
				this.$emit("load", e);
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
				overflow-x: auto;

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
