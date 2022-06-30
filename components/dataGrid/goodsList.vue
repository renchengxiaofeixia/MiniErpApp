<template>
	<view class="scroll-item">
		<view class="goods-list" @click.stop="$navto.navto(url,{id:item.id})">
			<view class="goods-flex">
				<view class="black name" v-if="item.name">
					{{item.name}}
					<text class="model" v-if="item.model">({{item.model}})</text>
				</view>
				<view v-if="item.inWarehouseName">
					{{item.inWarehouseName}}
					<text class="gray shift">调拨到</text>
					{{item.inWarehouseName}}
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

				<view class="supply-img" v-if="!radio && (tab == 2 || tab == 3)">
					<image src="../../static/image/adapter_supplier_search_result_item_phone_call.png" mode="aspectFit"
						v-if="tab == 2" @click.stop="$api.dialPhone(item.mobile)">
					</image>
					<image src="../../static/image/home_main_btn_tab_product2.png" mode="aspectFit" v-if="tab == 3">
					</image>
				</view>

				<view class="storage" v-if="item.check">
					{{item.check}}
				</view>
				<block>
					<slot></slot>
				</block>
			</view>
		</view>
		<view class="goods-btn" v-if="hide">
			<button class="pinless" style="background-color: #ffb535;" @click.stop="amend(item.id)">
				修改
			</button>
			<button class="pinless" style="background-color: #ff4622;" @click.stop="drop(item.id,index)">
				删除
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tab: {
				type: String,
				default: '0' //1物品  2供应商  3客户 4采购 5销售 6入库
			},
			item: { //数据
				type: Object,
				default: {}
			},
			url: { //跳转地址
				type: String,
				default: ''
			},
			radio: { //是否开启选择
				type: Boolean,
				default: false,
			},
			hide: { //关闭总数和更改
				type: Boolean,
				default: true,

			},
		},
		data() {
			return {

			};
		},
		methods: {
			amend() {
				this.$emit("amend");
			},
			drop() {
				this.$emit("drop");
			},
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-item {
		width: 750rpx;
		overflow-x: auto;
		display: flex;
		background-color: #fff;
		padding-top: 10rpx;
		border-bottom: 1rpx solid #ccc;


		.supply-img {
			width: 114rpx;
			height: 114rpx;
			transform: translateY(-16rpx);
		}

		.goods-list {
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
</style>
