<template>
	<view>
		<headerTab :title="headline"></headerTab>
		<searchbox @filter="openFilter()"></searchbox>


		<view v-if="id == 1">
			<dataGrid :list="productList" :date="false" tab="1" :hide="false" :radio="true" @radioChange="radioChange"
				:status="productStatus" @load="productTolower">
			</dataGrid>
		</view>
		<view v-if="id == 2">
			<dataGrid :list="supplierList" :date="false" tab="2" :hide="false" :radio="true" @radioChange="radioChange"
				:status="supplierStatus" @load="supplierTolower">
			</dataGrid>
		</view>
		<view v-if="id == 3">
			<dataGrid :list="clientList" tab="3" :date="false" :hide="false" :radio="true" @radioChange="radioChange"
				:status="clientStatus" @load="clientTolower">
			</dataGrid>
		</view>
		<view v-if="id == 4">
			<dataGrid :list="warehouseList" :date="false" tab="1" :hide="false" :radio="true"
				@radioChange="radioChange">
			</dataGrid>
		</view>


		<block v-if="id != 4">
			<addOrder :url="location" top="70%"></addOrder>
		</block>

		<footerBtn @confirm="confirmBnt()"></footerBtn>
	</view>
</template>

<script>
	let {
		$getProduct,
	} = require('@/api/product.js'); //物品

	let {
		$getSupplier,
	} = require('@/api/supplier.js'); //供应商

	let {
		$getClient,
	} = require('@/api/client.js'); //客户

	let {
		$getWarehouseList,
	} = require('@/api/inventory.js'); //盘点库存
	import headerTab from '@/components/headerTab/index.vue';
	import searchbox from '@/components/searchbox/index.vue';
	import dataGrid from '@/components/dataGrid/index.vue';
	import addOrder from '@/components/addOrder.vue';
	import footerBtn from '@/components/footerBtn.vue';
	import UniNumberBox from '@/components/uni-number-box/uni-number-box.vue';

	export default {
		components: {
			headerTab,
			searchbox,
			dataGrid,
			addOrder,
			footerBtn,
			UniNumberBox
		},
		data() {
			return {
				id: '',
				headline: '',
				location: '',
				productList: [], //物品
				productPage: 1, //物品页数
				productSize: 14, //物品页数量
				productNext: true, //物品是否也下页
				productPitch: {}, //物品选中
				supplierList: [], //供应商
				supplierPage: 1, //供应商页数
				supplierSize: 10, //供应商页数量
				supplierNext: true, //供应商是否也下页
				supplierPitch: {}, //供应商选中
				clientList: [], //客户
				clientPage: 1, //客户页数
				clientSize: 10, //客户页数量
				clientNext: true, //客户是否也下页
				clientPitch: {}, //客户选中
				warehouseList: [], //库存数据
				warehousePitch: {}, //库存选中
				// 加载状态
				productStatus: 'more',
				supplierStatus: 'more',
				clientStatus: 'more',
				contentText: {
					contentdown: '下拉加载',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}
			};
		},
		onLoad(e) {
			this.headline = decodeURIComponent(e.headline);
			this.id = e.id;

			if (this.id == 1) {
				this.location = "pages/plusForm/addGoods";
			} else if (this.id == 2) {
				this.location = "pages/plusForm/addSupplier";
			} else if (this.id == 3) {
				this.location = "pages/plusForm/addCustomer";
			}
		},
		onShow() {
			if (this.id == 1) {
				this.productList = [];
				this.productData();
			} else if (this.id == 2) {
				this.supplierList = [];
				this.supplierData();
			} else if (this.id == 3) {
				this.clientList = [];
				this.clientData();
			} else if (this.id == 4) {
				this.warehouseList = [];
				this.warehousetData();
			}

		},
		methods: {
			// 物品数据
			async productData() {
				let _this = this;
				let data = {
					page: _this.productPage,
					size: _this.productSize,
				};
				let res = await $getProduct(data);
				if (!res.data.hasNextPage) {
					_this.productNext = false;
					_this.productStatus = 'noMore';
				}

				let list = [];
				res.data.data.forEach(e => {
					list.push({
						id: e.id,
						name: e.prodCustomNo,
						model: e.prodModel,
						No: e.prodNo,
						count: e.prodNos,
						num: e.salePrice + e.unit,
						...e

					})
				})
				_this.productList.push(...list);
			},
			// 供应商数据
			async supplierData() {
				let _this = this;
				let data = {
					page: _this.supplierPage,
					size: _this.supplierSize,
				}
				let res = await $getSupplier(data);
				if (!res.data.hasNextPage) {
					_this.supplierNext = false;
					_this.supplierStatus = 'noMore';
				}
				let list = [];
				res.data.data.forEach(e => {
					list.push({
						id: e.id,
						name: e.supplierName,
						linkman: e.contacterName,
						phone: e.mobile,
						...e

					})
				})
				_this.supplierList.push(...list);

			},
			// 客户数据
			async clientData() {
				let _this = this;
				let data = {
					page: _this.clientPage,
					size: _this.clientSize,
				}
				let res = await $getClient(data);

				if (!res.data.hasNextPage) {
					_this.clientNext = false;
					_this.clientStatus = 'noMore';
				}

				let list = [];
				res.data.data.forEach(e => {
					list.push({
						id: e.id,
						name: e.customerNo,
						linkman: e.customerName,
						phone: e.mobile,
						...e

					})
				})
				_this.clientList.push(...list);

			},
			// 仓库数据
			async warehousetData() {
				let _this = this;
				let res = await $getWarehouseList();

				let list = [];
				res.data.forEach(e => {
					list.push({
						id: e.id,
						name: e.prodCustomNo,
						model: e.prodModel,
						No: e.prodNo,
						num: e.unitPrice + e.unit,
						...e

					})
				})

				_this.warehouseList.push(...list);
				console.log(_this.warehouseList);
			},
			// 物品下拉加载数据
			productTolower(e) {
				let _this = this;
				if (_this.productNext) {
					_this.productStatus = 'loading';
					_this.productPage = 2;
					_this.productData();
				} else {
					setTimeout(function() {
						_this.productStatus = 'noMore';
					}, 1000)
				}
			},
			// 供应商下拉加载
			supplierTolower() {
				let _this = this;
				if (_this.supplierNext) {
					_this.supplierStatus = 'loading';
					_this.supplierPage = 2;
					_this.supplierData();
				} else {
					setTimeout(function() {
						_this.supplierStatus = 'noMore';
					}, 1000)
				}
			},
			// 客户下拉加载
			clientTolower() {
				let _this = this;
				if (_this.clientNext) {
					_this.clientStatus = 'loading';
					_this.clientPage = 2;
					_this.clientData();
				} else {
					setTimeout(function() {
						_this.clientStatus = 'noMore';
					}, 1000)
				}
			},
			// 选择数据
			radioChange(e) {
				let val = JSON.parse(e.detail.value);
				if (this.id == 1) {
					val.totalPrice = 0;
					val.num = 1;
					val.newRemarks = "";
					this.productPitch = val;
				} else if (this.id == 2) {
					this.supplierPitch = val;
				} else if (this.id == 3) {
					this.clientPitch = val;
				} else if (this.id == 4) {
					val.quantity = 1;
					val.newRemarks = "";
					this.warehousePitch = val;
				}

			},
			// 确定
			confirmBnt() {
				let _this = this;
				if (_this.id == 1) {
					_this.productPitch.quantity = 1;
					_this.$api.prePage().$data.productList.push(_this.productPitch);
				} else if (_this.id == 2) {
					_this.$api.prePage().$data.supplier = _this.supplierPitch;

				} else if (_this.id == 3) {
					_this.$api.prePage().$data.client = _this.clientPitch;

				} else if (_this.id == 4) {
					_this.$api.prePage().$data.productList.push(_this.warehousePitch);

				}
				setTimeout(function() {
					_this.$navto.navBack();
				}, 500)
			},
		}
	}
</script>

<style lang="scss">
	page {
		overflow: hidden;
	}

	.slide {
		height: 100%;
		width: 100%;
	}

	.scroll-roll {
		height: 75vh;

	}
</style>
