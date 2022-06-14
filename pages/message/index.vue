<template>
	<view class="">
		<headerTab :scrollTab="scrollTab" @tabKey="change" :tab="first.id"></headerTab>
		<searchbox @filter="openFilter()" @confirm="confirm" :placeholder="first.placeholder"></searchbox>

		<view v-if="first.id == 0">
			<dataGrid url="pages/details/product" :list="productList" tab="1" @drop="dropProduct" @amend="amendProduct"
				:status="productStatus">
			</dataGrid>
		</view>
		<view v-if="first.id==1">
			<dataGrid url="pages/details/supplier" :list="supplierList" tab="2" @drop="dropSupplier"
				@amend="amendSupplier" :status="supplierStatus"  @load="supplierTolower">
			</dataGrid>
		</view>
		<view v-if="first.id == 2">
			<dataGrid url="pages/details/client" :list="clientList" tab="3" @drop="dropClient" @amend="amendClient"
				:status="clientStatus" @load="clientTolower">
			</dataGrid>
		</view>

		<filtratePopup @close="openFilter()" :show="filterShow">
			<view>
				<block v-if="first.id == 1">
					<view class="table" style="padding: 0;">
						<pulldown headline="类目" title="所有类目">
						</pulldown>
					</view>
					<view class="table" style="padding: 0;">
						<pulldown headline="库存状况">
							<stateBar
								:list="[{monicker: '全部',id: 1}, {monicker: '正常',id: 2}, {monicker: '负库存',id: 3}, {monicker: '超出上限',id: 4}, {monicker: '超出下限',id: 5}]">
							</stateBar>
						</pulldown>
					</view>
				</block>
				<view class="table" style="padding: 0;" v-if="first.id==3">
					<view class="contact-date">
						下次联系日期
					</view>
					<uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" :clear-icon="false"/>
				</view>
				<view class="table" style="padding: 0;">
					<pulldown headline="展示状态">
						<stateBar :list="[{monicker: '全部',id: 1}, {monicker: '显示',id: 2}, {monicker: '隐藏',id: 3}]">
						</stateBar>
					</pulldown>
				</view>
			</view>
		</filtratePopup>
		<addOrder :url="first.url"></addOrder>
	</view>
</template>

<script>
	let {
		$getProduct,
		$delProduct
	} = require('@/api/product.js'); //物品

	let {
		$getSupplier,
		$delSupplier
	} = require('@/api/supplier.js'); //供应商

	let {
		$getClient,
		$delClient
	} = require('@/api/client.js'); //客户
	import headerTab from '@/components/headerTab/index.vue';
	import searchbox from '@/components/searchbox/index.vue';
	import filtratePopup from '@/components/filtratePopup/index.vue';
	import dataGrid from '@/components/dataGrid/index.vue';
	import addOrder from '@/components/addOrder.vue';
	import pulldown from "@/components/pulldown.vue"
	import stateBar from "@/components/stateBar.vue"

	export default {
		components: {
			headerTab, //头部导航栏
			searchbox, //搜索框
			filtratePopup, //筛选
			dataGrid, //数据列表
			addOrder, //新建页面
			pulldown, //折叠样式
			stateBar,

		},
		data() {
			return {
				scrollTab: [{
					text: '物品',
					open: true,
					id: 0,
					url: "pages/plusForm/addGoods",
					placeholder: "物品编号/名称/规格型号"
				}, {
					text: '供应商',
					open: true,
					id: 1,
					url: "pages/plusForm/addSupplier",
					placeholder: "供应商名称/联系人/联系电话"
				}, {
					text: '客户',
					open: true,
					id: 2,
					url: "pages/plusForm/addCustomer",
					placeholder: "客户名称/联系人/联系电话"
				}],
				first: {
					text: '物品',
					open: true,
					id: 0,
					url: "pages/plusForm/addGoods",
					placeholder: "物品编号/名称/规格型号"
				},
				filterShow: 'none',
				productList: [], //物品
				productPage: 1, //物品页数
				productSize: 14, //物品页数量
				productNext: true, //物品是否也下页
				supplierList: [], //供应商
				supplierPage: 1, //供应商页数
				supplierSize: 10, //供应商页数量
				supplierNext: true, //供应商是否也下页
				clientList: [], //客户
				clientPage: 1, //客户页数
				clientSize: 10, //客户页数量
				clientNext: true, //客户是否也下页
				// 加载状态
				productStatus: 'more',
				supplierStatus: 'more',
				clientStatus: 'more',

			}
		},
		onLoad() {

		},
		onShow() {
			this.first.open = true;
			this.getData(this.first.id);

		},
		mounted() {

		},
		methods: {
			// 物品数据
			async productData(sky) {
				let _this = this;
				let data = {
					page: _this.productPage,
					size: _this.productSize,
				};
				let res = await $getProduct(data);
				if (sky) {
					_this.productList = [];
				}
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

					})
				})

				_this.productList.push(...list);

			},
			// 供应商数据
			async supplierData(sky) {
				let _this = this;
				let data = {
					page: _this.supplierPage,
					size: _this.supplierSize,
				}

				let res = await $getSupplier(data);
				if (sky) {
					_this.supplierList = [];
				}
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
						phone: e.mobile

					})
				})

				_this.supplierList.push(...list);

			},
			// 客户数据
			async clientData(sky) {
				let _this = this;
				let data = {
					page: _this.clientPage,
					size: _this.clientSize,
				}
				let res = await $getClient(data);
				if (sky) {
					_this.clientList = [];
				}
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
						phone: e.mobile

					})
				})
				_this.clientList.push(...list);

			},
			// 删除物品
			dropProduct(id, index) {
				let _this = this;
				_this.$api.showModal('确定要删除物品！').then(() => {
					$delProduct(id).then(res => {
						_this.$api.msg('删除成功')
						_this.productList.splice(index, 1);
					});
				});
			},
			// 修改物品
			amendProduct(id) {
				this.$navto.navto('pages/plusForm/addGoods', {
					id: id,
					type: 1,
					header: '修改物品'
				})
			},
			// 删除供应商
			dropSupplier(id, index) {
				let _this = this;
				_this.$api.showModal('确定要删除供应商！').then(() => {
					$delSupplier(id).then(res => {
						_this.supplierList.splice(index, 1)
						_this.$api.msg('删除成功')
					});
				});
			},
			// 修改供应商
			amendSupplier(id) {
				this.$navto.navto('pages/plusForm/addSupplier', {
					id: id,
					header: '修改供应商',
					type: 1
				})
			},
			// 删除客户
			dropClient(id, index) {
				let _this = this;
				_this.$api.showModal('确定要删除客户！').then(() => {
					$delClient(id).then(res => {
						_this.clientList.splice(index, 1)
						_this.$api.msg('删除成功');
					});

				});
			},
			// 修改客户
			amendClient(id) {
				this.$navto.navto('pages/plusForm/addCustomer', {
					id: id,
					header: '修改客户',
					type: 1
				})
			},
			// 打开筛选
			openFilter() {
				if (this.filterShow == 'none') {
					this.filterShow = 'show';
				} else {
					this.filterShow = 'hide';
					setTimeout(() => {
						this.filterShow = 'none';
					}, 500);
				}
			},
			//搜索
			confirm(val) {
				console.log(val);
			},
			// tab切换
			change(item) {
				this.first = item;
				this.getData(item.id);
			},
			// 请求数据
			getData(index) {
				if (this.first.id == 0 && this.first.open) {
					this.productData(true);
				} else if (this.first.id == 1 && this.first.open) {
					this.supplierData(true);
				} else if (this.first.id == 2 && this.first.open) {
					this.clientData(true);
				}
				this.scrollTab[index].open = false;
				this.first.open = false;
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
			}
		}
	}
</script>

<style lang="scss">
	.slide {
		height: 100%;
		width: 100%;
	}

	page {
		overflow: hidden;
	}
</style>
