<template>
	<view class="supplier">
		<headerTab :title="header"></headerTab>
		<view class="table">
			<view class="from from-new">
				<text class="title">采购日期</text>
				<view class="fill">
					<uni-datetime-picker v-model="purchaseDate" type="date" @change="selectPurchase"
						:clear-icon="false">
						{{purchaseDate}}
					</uni-datetime-picker>
				</view>
				<text class="iconfont icon-right-1-copy"></text>
			</view>

			<view class="from from-new">
				<text class="title">交付日期</text>
				<view class="fill">
					<uni-datetime-picker v-model="deliveryDate" type="date" @change="selectDelivery"
						:clear-icon="false">
						{{deliveryDate}}
					</uni-datetime-picker>
				</view>
				<text class="iconfont icon-right-1-copy"></text>
			</view>

			<view class="from from-new" @click="$navto.navto('pages/conserve/choiceCargo',{id:2,headline:'选择供应商'})">
				<text class="title">供应商</text>
				<text class="fill">
					<text v-if="supplier.supplierName">{{supplier.supplierName}}</text>
					<text class="gray" v-else>选择供应商(必填)</text>
				</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
		</view>

		<selectGoods @shape="accept" ref="goods"></selectGoods>

		<block v-if="productList.length !=0">
			<view class="headline">
				相关约定
			</view>
			<view class="table product">
				<view class="from from-new" @click="$navto.navto('pages/conserve/storage',{header:'选择结算方式',id:5})">
					<text class="title">结算方式</text>
					<view class="fill">
						<text v-if="appoint.settlementMode">{{appoint.settlementMode}}</text>
						<text v-else class="gray">结算方式</text>
					</view>
					<text class="iconfont icon-right-1-copy"></text>
				</view>
				<view class="from from-new">
					<text class="title">备注</text>
					<input type="text" placeholder="填写备注" class="fill" v-model="appoint.remarks">
					<text class="iconfont icon-right-1-copy"></text>
				</view>
			</view>
		</block>

		<footerBtn @confirm="purchaseBnt()"></footerBtn>
	</view>
</template>

<script>
	let {
		$getPurchasesId,
		$getProdinfos,
		$putPurchases,
		$postPurchases
	} = require('@/api/purchase.js'); //采购
	
	let {
		$getOrderGoods
	} = require('@/api/market.js'); //销售
	import headerTab from '@/components/headerTab/index.vue';
	import selectGoods from "@/components/selectGoods.vue"
	import footerBtn from '@/components/footerBtn.vue';
	export default {
		components: {
			headerTab,
			selectGoods,
			footerBtn
		},
		data() {
			return {
				id: '',
				type: 0,
				header: '新建采购订单',
				purchaseDate: this.$api.dateTime("yyyy-MM-dd"),
				deliveryDate: this.$api.dateTime("yyyy-MM-dd"),
				supplier: {}, //接收供应商数据
				productList: [], //物品数据
				appoint: { //相关约定
					settlementMode: '',
					remarks: ""
				},
				updatedTime: '', //记录时间


			}
		},
		async onLoad(option) {
			let _this = this;
			_this.id = option.id ? option.id : '';
			_this.type = option.type ? option.type : 0;
			_this.header = option.header ? decodeURIComponent(option.header) : '新建采购订单';
			if (_this.type == 1) {
				let res = await $getPurchasesId(_this.id);
				_this.purchaseDate = res.data.purchaseOrderDate;
				_this.deliveryDate = res.data.deliveryDeadlineDate;
				// 供应商
				_this.supplier.mobile = res.data.mobile;
				_this.supplier.supplierNo = res.data.supplierNo;
				_this.supplier.supplierName = res.data.supplierName;
				_this.supplier.supplierContacterName = res.data.supplierContacterName;
				// 相关约定
				_this.appoint.remarks = res.data.remarks;
				_this.appoint.settlementMode = res.data.settlementMode;

				_this.updatedTime = new Date(res.data.updatedTime).valueOf();

				//采购物品
				let prodinfos = await $getProdinfos(_this.id);
				_this.productList = prodinfos.data;
				_this.productList.forEach(item => {
					let price = Number(item.unitPrice) * item.quantity;
					item.num = item.quantity;
					item.purchasePrice = item.unitPrice;
					item.newRemarks = item.remarks;
					item.totalPrice = price.toFixed(2);
				})

			} else if (_this.type == 3) {
				// 销售物品
				let order = await $getOrderGoods(_this.id);
				_this.productList = order.data;
				_this.productList.forEach(item => {
					let price = Number(item.unitPrice) * item.quantity;
					item.num = item.quantity;
					item.purchasePrice = item.unitPrice;
					item.newRemarks = item.remarks;
					item.totalPrice = price.toFixed(2);
				})

			}

			_this.$refs.goods.productList = _this.productList;
		},
		onShow() {},
		methods: {
			// 销售日期选择
			selectPurchase(date) {
				this.purchaseDate = date;
			},
			// 交货日期选择
			selectDelivery(date) {
				this.deliveryDate = date;
			},
			accept(item) {
				this.productList = item;
				this.$refs.goods.productList = this.productList;
			},
			// 确定
			async purchaseBnt() {
				let _this = this;
				let purchase = new Date(this.purchaseDate).valueOf();
				let elivery = new Date(this.deliveryDate).valueOf();

				if (purchase > elivery) {
					_this.$api.msg('交付日期不得晚于采购日期', 2000);
					return
				}
				if (!_this.supplier.supplierNo) {
					_this.$api.msg('请选择供应商！');
					return
				}
				if (_this.goods.length == 0) {
					_this.$api.msg('请选择物品！');
					return
				}

				let data = {};

				data.purchaseOrderDate = _this.purchaseDate;
				data.deliveryDeadlineDate = _this.deliveryDate;
				data.mobile = _this.supplier.mobile;
				data.supplierNo = _this.supplier.supplierNo;
				data.supplierName = _this.supplier.supplierName;
				data.supplierContacterName = _this.supplier.supplierContacterName;
				data.remarks = _this.appoint.remarks;
				data.settlementMode = _this.appoint.settlementMode;

				let goods = [];
				_this.productList.forEach(item => {
					goods.push({
						prodNo: item.prodNo,
						prodCustomNo: item.prodCustomNo,
						prodName: item.prodName,
						prodModel: item.prodModel,
						unit: item.unit,
						unitPrice: item.purchasePrice,
						quantity: item.quantity,
						remarks: item.newRemarks,
						...item
					})
				});
				data.prodInfoDtos = goods;

				if (_this.type == 1) {
					let time = await $getPurchasesId(_this.id);
					let updatedTime = new Date(time.data.updatedTime).valueOf();

					if (_this.updatedTime != updatedTime) {
						_this.$api.showModal('修改已经过期请重新进入！').then(() => {
							_this.$navto.navtab('pages/order/index')
						});
						return;
					};

					$putPurchases(_this.id, data).then(res => {
						_this.$api.msg('修改成功！');
						setTimeout(() => {
							_this.$navto.navClose('pages/details/purchase', {
								id: res.data.id,
							})
						}, 500)
					})

				} else {
					$postPurchases(data).then(res => {
						_this.$api.msg('创建成功！');
						setTimeout(() => {
							_this.$navto.navClose('pages/details/purchase', {
								id: res.data.id,
							})
						}, 500)
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.headline {
		padding: 16rpx 0;
		margin: 0 20rpx;
		font-size: 30rpx;
	}
</style>
