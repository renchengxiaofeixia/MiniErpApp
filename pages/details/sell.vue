<template>
	<view class="paddingBottom">
		<headerTab title="销售订单详情"></headerTab>

		<view class="goods-list gray">
			<view class="goods-flex" style="margin: 0;">
				<view>
					<view class="track">
						<text>销售单号：</text>
						<text class="black">{{market.orderNo}}</text>
					</view>
					<view class="track">
						<text>销售日期：</text>
						<text class="black">{{market.orderDate}}</text>
					</view>
					<view class="track">
						<text>交货日期：</text>
						<text class="black">{{market.deliveryDeadlineDate}}</text>
					</view>
				</view>
				<view class="storage">
					{{market.orderStatus}}
				</view>
			</view>


			<view class="track">
				<text>交货地址：</text>
				<text class="black site" v-if="market.deliveryCountryText">{{market.deliveryCountryText}}</text>
				<text class="black site" v-if="market.deliveryProvinceText">{{market.deliveryProvinceText}}</text>
				<text class="black site" v-if="market.deliveryCityText">{{market.deliveryCityText}}</text>
				<text class="black site" v-if="market.deliveryDistrictText">{{market.deliveryDistrictText}}</text>
				<text class="black site" v-if="market.deliveryAddress">{{market.deliveryAddress}}</text>
			</view>
			<view class="track">
				<text>仓库：</text>
				<text class="black">{{market.warehouseName}}</text>
			</view>
			<view class="track">
				<text class="gray">备注：</text>
				<text class="black">{{market.remarks}}</text>
			</view>
		</view>

		<linkman :list="customer"></linkman>

		<productMessage title="销售物品" :list="goodsList"></productMessage>

		<view class="table">
			<view class="goods-flex shove figure">
				<view class="">
					收款
				</view>
				<view class="green">
					￥{{payTotalPrice}}
				</view>
			</view>

			<block v-for="(item,index) in payList" :key="index">
				<view class="goods-flex payment" hover-class="checkActive"
					@click="$navto.navto('pages/details/proceeds',{id:item.id})">
					<view class="gray">
						<view class="">
							{{item.paymentDate}}
						</view>
						<view class="">
							{{item.remarks}}
						</view>
					</view>
					<view class="">
						<view class="">
							￥{{item.amount}}
						</view>
					</view>
				</view>
			</block>

		</view>

		<view class="table">
			<pulldown headline="销售员" size="32rpx" detail="详细" :switch="false">
				<view class="goods-flex shove" style="margin: 0;">
					<view>
						<view class="track">
							<text class="gray">销售员：</text>
							<text class="black">
								{{market.orderSaleUser || ''}}
							</text>
						</view>
						<view class="track">
							<text class="gray">联系电话：</text>
							<text class="black">{{market.orderSaleUserMobile || ''}}</text>
						</view>
					</view>
				</view>
			</pulldown>
		</view>

		<operator :list="operation"></operator>

		<copyreader :show="compileShow" @close="handleClose()">
			<view class="operation" hover-class="checkActive" @click="$navto.navto('pages/print/index')">
				打印
			</view>
			<view class="operation" hover-class="checkActive"
				@click="$navto.navto('pages/plusForm/addMarket',{id:id,header:'修改采购订单',type: 1})">
				修改
			</view>
			<view class="operation red" hover-class="checkActive" @click="delSell()">
				删除
			</view>
			<view class="operation" hover-class="checkActive" @click="$navto.navto('pages/plusForm/addStorage')">
				出库
			</view>
			<view class="operation" hover-class="checkActive"
				@click="$navto.navto('pages/plusForm/addPurchase',{id:id,type: 3})">
				采购
			</view>
			<view class="operation" hover-class="checkActive"
				@click="$navto.navto('pages/plusForm/addProceeds',{num: orderNo,name:customer.name})">
				收款
			</view>
		</copyreader>
		<addOrder type="2" @click="handleClose()"></addOrder>
	</view>
</template>

<script>
	let {
		$getOrderId,
		$getOrderGoods,
		$delOrder
	} = require('@/api/market.js'); //销售

	let {
		$getPay
	} = require('@/api/market.js'); //物品
	import headerTab from '@/components/headerTab/index.vue';
	import pulldown from '@/components/pulldown.vue';
	import productMessage from './components/productMessage.vue';
	import linkman from './components/linkman.vue';
	import operator from './components/operator.vue';
	import addOrder from '@/components/addOrder.vue';
	import copyreader from '@/components/copyreader/index.vue';
	export default {
		components: {
			headerTab,
			pulldown,
			productMessage,
			linkman,
			operator,
			addOrder,
			copyreader,

		},
		data() {
			return {
				id: "",
				market: {}, //销售
				compileShow: "none",
				customer: {}, //供应商联系
				goodsList: [], //物品数据
				operation: {}, //操作日记
				orderNo: '',
				payList: [], //收款
				payTotalPrice: 0, //收款总价


			}
		},
		onLoad(e) {
			this.id = e.id;

		},
		onShow() {
			this.getData();
			this.goodsData();
			this.payData();
		},
		methods: {
			async getData() {
				let _this = this;
				let res = await $getOrderId(_this.id);
				this.market = res.data;
				// 客户联系
				_this.customer.name = res.data.customerNo;
				_this.customer.linkman = res.data.customerName;
				_this.customer.phone = res.data.mobile;
				_this.orderNo = res.data.orderNo;
				// 操作日记
				_this.operation.createTime = res.data.createTime;
				_this.operation.creator = res.data.creator;
				_this.operation.updatedTime = res.data.updatedTime;
				_this.operation.updator = res.data.updator;
			},
			async goodsData() {
				let _this = this;
				let res = await $getOrderGoods(_this.id);
				_this.goodsList = res.data;
				_this.goodsList.forEach(e => {
					e.money = e.unitPrice * e.quantity;
					_this.totalPrice += e.money;
				})
			},
			async payData() {
				let _this = this;
				let res = await $getPay(_this.id);
				_this.payList = res.data;
				_this.payList.forEach(e => {
					_this.payTotalPrice += e.amount;
				})
			},
			delSell() {
				let _this = this;
				_this.$api.showModal('你确定要删除销售订单！').then(() => {
					$delOrder(_this.id).then(res => {
						_this.$api.msg('删除成功')
						setTimeout(() => {
							_this.$navto.navBack();
						}, 500)
					});
				});
			},
			handleClose() {
				if (this.compileShow == 'none') {
					this.compileShow = 'show';
				} else {
					this.compileShow = 'hide';
					setTimeout(() => {
						this.compileShow = 'none';
					}, 200);
				}
			},
		}
	}
</script>

<style lang="scss">
	.goods-list {
		padding: 20rpx;
		border-bottom: 1rpx solid #ccc;

	}

	.site {
		margin-left: 10rpx;
	}

	.track {
		padding-top: 10rpx;
	}

	.shove {
		padding: 20rpx 0;
	}

	.figure {
		font-size: 32rpx;
		border-bottom: 1rpx solid #ccc;
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

	.payment {
		padding: 20rpx 30rpx;
		border-bottom: 1rpx solid #ccc;
		font-size: 28rpx;

		&:last-child {
			border-bottom: none;
		}
	}

	.phone {
		border-radius: 50%;
		border: 1rpx solid #2ea469;
		width: 92rpx;
		text-align: center;
		color: #2ea469;
		font-size: 24rpx;
		padding: 12rpx 0;

		.iconfont {
			color: #2ea469;
			font-size: 36rpx;
		}
	}
</style>
