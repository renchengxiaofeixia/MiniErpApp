<template>
	<view class="listing">
		<view class="amount" v-if="hide">
			<text class="sum">
				一共{{list.length}}条数据
			</text>
		</view>

		<view class="tabulation">
			<scroll-view class="scroll-roll" scroll-y @scrolltolower="load" style="height: 79vh;"
				v-if="list.length != 0">
				<radio-group @change="radioChange">
					<block v-for="(item,index) in list" :key="index">
						<goodsList :item="item" :url="url" :tab="tab" :radio="radio" :hide="hide"
							@amend="amend(item.id)" @drop="drop(item.id,index)">
							<label class="radio" v-if="radio">
								<radio :value="JSON.stringify(item)" />
							</label>
						</goodsList>
					</block>
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
	import goodsList from './goodsList.vue';
	export default {
		components: {
			goodsList
		},
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
				userLoginFlag: false,
				contentText: {
					contentdown: '下拉加载',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}
			};
		},
		watch: {

		},
		created() {
			this.userLoginFlag = app.globalData.userLogin;
		},
		methods: {
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

<style lang="scss" scoped>
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
