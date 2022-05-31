<template>
	<view>
		<headerTab :title="headline"></headerTab>
		<searchbox @filter="openFilter()"></searchbox>

		<view class="slide">
			<block v-if="id == 1">
				<scroll-view class="scroll-roll" scroll-y @scrolltolower="productTolower">
					<dataGrid :list="productList" :date="false" tab="1" :hide="false" :radio="true"
						@radioChange="radioChange">
					</dataGrid>
					<uni-load-more :status="productStatus" IconType="auto" :content-text="contentText" />
				</scroll-view>
			</block>
			<block v-if="id == 2">
				<scroll-view class="scroll-roll" scroll-y @scrolltolower="supplierTolower">
					<dataGrid :list="supplierList" :date="false" tab="2" :hide="false" :radio="true"
						@radioChange="radioChange">
					</dataGrid>
					<uni-load-more :status="supplierStatus" IconType="auto" :content-text="contentText" />
				</scroll-view>
			</block>
			<block v-if="id == 3">
				<scroll-view class="scroll-roll" scroll-y @scrolltolower="clientTolower">
					<dataGrid :list="clientList" tab="3" :date="false" :hide="false" :radio="true"
						@radioChange="radioChange">
					</dataGrid>
					<uni-load-more :status="clientStatus" IconType="auto" :content-text="contentText" />
				</scroll-view>
			</block>
		</view>

		<addOrder :url="location" top="70%"></addOrder>
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
	import headerTab from '@/components/headerTab/index.vue';
	import searchbox from '@/components/searchbox/index.vue';
	import dataGrid from '@/components/dataGrid/index.vue';
	import addOrder from '@/components/addOrder.vue';
	import footerBtn from '@/components/footerBtn.vue';

	export default {
		components: {
			headerTab,
			searchbox,
			dataGrid,
			addOrder,
			footerBtn
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
				this.productData();
			} else if (this.id == 2) {
				this.supplierData();
			} else if (this.id == 3) {
				this.clientData();
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
				_this.productList.push(...res.data.data);
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
				_this.supplierList.push(...res.data.data);

			},
			// 客户数据
			async clientData() {
				let _this = this;
				let data = {
					page: _this.clientPage,
					size: _this.clientSize,
				}
				let res = await $getClient(data)
				if (!res.data.hasNextPage) {
					_this.clientNext = false;
					_this.clientStatus = 'noMore';
				}
				_this.clientList.push(...res.data.data);

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
