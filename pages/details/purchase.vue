<template>
	<view class="paddingBottom">
		<headerTab title="采购订单详情" :record="true"></headerTab>

		<view class="goods-list gray">
			<view class="goods-flex">
				<view>
					<view class="track">
						<text>采购单号：</text>
						<text class="black">{{purchase.purchaseNo}}</text>
					</view>
					<view class="track">
						<text>采购日期：</text>
						<text class="black">{{purchase.purchaseOrderDate}}</text>
					</view>
					<view class="track">
						<text>交货日期：</text>
						<text class="black">{{purchase.deliveryDeadlineDate}}</text>
					</view>
				</view>
				<view class="storage">
					{{purchase.purchaseStatus}}
				</view>
			</view>
		</view>

		<linkman :list="supplierContact"></linkman>

		<!-- <view class="table">
			<view class="goods-flex shove figure">
				<view class="">
					付款
				</view>
				<view class="green">
					￥100
				</view>
			</view>
		</view> -->

		<view class="table">
			<pulldown headline="相关约定" size="32rpx" detail="详细" :switch="false">
				<view class="goods-flex shove" style="margin: 0;">
					<view>
						<view class="track">
							<text class="gray">结算方式：</text>
							<text class="black">{{purchase.settlementMode}}</text>
						</view>
						<view class="track">
							<text class="gray">备注：</text>
							<text class="black">{{purchase.remarks}}</text>
						</view>
					</view>
				</view>
			</pulldown>
		</view>

		<!-- 	<view class="table">
			<pulldown headline="往来日记" size="32rpx" detail="详细" :switch="false">
				<view class="goods-flex shove" style="margin: 0;">
					<view>
						<view class="track">
							<text class="gray">销售方：</text>
							<text class="black"> 阿三</text>
						</view>
					</view>
				</view>
			</pulldown>
		</view> -->

		<productMessage title="采购物品" :list="goodsList"></productMessage>



		<operator :list="operation"></operator>

		<copyreader :show="compileShow" @close="handleClose()">
			<view class="operation" hover-class="checkActive" @click="$navto.navto('pages/print/index')">
				打印
			</view>
			<view class="operation" hover-class="checkActive"
				@click="$navto.navto('pages/plusForm/addPurchase',{id:id,header:'修改采购订单',type: 1})"
				v-if="!purchase.isAudit">
				修改
			</view>
			<view class="operation red" hover-class="checkActive" @click="purchaseDel">
				删除
			</view>
			<view class="operation" hover-class="checkActive" @click="navStorage()">
				入库
			</view>
			<view class="operation" hover-class="checkActive" @click="$navto.navto('pages/addend/payment')">
				付款
			</view>
			<view class="operation" hover-class="checkActive" @click="checkPurchase" v-if="!purchase.isAudit">
				审核
			</view>
			<view class="operation" hover-class="checkActive" @click="anewPurchase" v-else>
				反审核
			</view>
		</copyreader>
		<addOrder type="2" @click="handleClose()"></addOrder>
	</view>
</template>

<script>
	let {
		$getPurchasesId,
		$getProdinfos,
		$delPurchases,
		$auditPurchases,
		$unauditPurchases
	} = require('@/api/purchase.js'); //采购
	import headerTab from '@/components/headerTab/index.vue';
	import pulldown from '@/components/pulldown.vue';
	import productMessage from './components/productMessage.vue';
	import operator from './components/operator.vue';
	import linkman from './components/linkman.vue';
	import addOrder from '@/components/addOrder.vue';
	import copyreader from '@/components/copyreader/index.vue';
	export default {
		components: {
			headerTab,
			pulldown,
			productMessage,
			operator,
			linkman,
			addOrder,
			copyreader,

		},
		data() {
			return {
				id: '',
				purchase: {}, //详情数据
				compileShow: "none",
				supplierContact: {}, //供应商联系
				operation: {}, //操作日记
				goodsList: [], //物品数据


			}
		},
		onLoad(e) {
			this.id = e.id
		},
		onShow() {
			this.getData();
			this.goodsData()
		},
		methods: {
			async getData() {
				let _this = this;
				let res = await $getPurchasesId(_this.id);
				let data = res.data;
				_this.purchase = data;
				// 供应商联系
				_this.supplierContact.name = data.supplierName;
				_this.supplierContact.linkman = data.supplierNo;
				_this.supplierContact.phone = data.mobile;
				_this.supplierContact.supplierContacterName = data.supplierContacterName;
				// 操作日记
				_this.operation.createTime = data.createTime;
				_this.operation.creator = data.creator;
				_this.operation.updatedTime = data.updatedTime;
				_this.operation.updator = data.updator;

			},
			async goodsData() {
				let _this = this;
				let res = await $getProdinfos(_this.id);
				_this.goodsList = res.data;
				_this.goodsList.forEach(e => {
					e.money = e.unitPrice * e.quantity;
					_this.totalPrice += e.money;
				})
			},
			// 删除
			purchaseDel() {
				let _this = this;
				_this.$api.showModal('你要确定要删除该采购订单吗?').then(() => {
					$delPurchases(_this.id);
					_this.$api.msg('删除成功！');
					setTimeout(function() {
						_this.$navto.navtab('pages/order/index')
					}, 500)
				});

			},
			// 审核
			checkPurchase() {
				let _this = this;
				_this.$api.showModal('确定完成采购订单审核？').then(() => {
					$auditPurchases(_this.id).then(res => {
						_this.$api.msg('审核通过！');
						_this.getData();
					})
				});
			},
			// 反审核审
			anewPurchase() {
				let _this = this;
				_this.$api.showModal('确定反审核采购订单？').then(() => {
					$unauditPurchasess(_this.id).then(res => {
						_this.$api.msg('反审核！');
						_this.getData();
					})
				});
			},
			// 入库
			navStorage() {
				let _this = this;
				let list = {
					purchase: _this.purchase,
					supplierContact: _this.supplierContact,
					operation: _this.operation,
					goodsList: _this.goodsList,
				}
				_this.$navto.navto('pages/plusForm/addStorage', {
					list: JSON.stringify(list),
					id: _this.id,
					type: 2
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
		padding-top: 20rpx;

	}

	.track {
		padding-top: 10rpx;
	}

	.shove {
		padding: 20rpx 0;
	}

	.figure {
		font-size: 32rpx;
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
</style>
