<template>
	<view class="">
		<headerTab :scrollTab="scrollTab" @tabKey="change" :tab="first.id"></headerTab>
		<searchbox @filter="openFilter()"></searchbox>

		<view class="slide">
			<block v-if="first.id == 0">
				<scroll-view class="scroll-roll" scroll-y @scrolltolower="productTolower">
					<dataGrid url="pages/details/commodity" :list="productList" tab="1" @drop="dropProduct"
						@amend="amendProduct">
					</dataGrid>
					<uni-load-more :status="productStatus" IconType="auto" :content-text="contentText" />
				</scroll-view>
			</block>
			<block v-if="first.id == 1">
				<scroll-view class="scroll-roll" scroll-y @scrolltolower="supplierTolower">
					<dataGrid url="pages/details/supplier" :list="supplierList" tab="2" @drop="dropSupplier"
						@amend="amendSupplier">
					</dataGrid>
					<uni-load-more :status="supplierStatus" IconType="auto" :content-text="contentText" />
				</scroll-view>
			</block>
			<block v-if="first.id == 2">
				<scroll-view class="scroll-roll" scroll-y @scrolltolower="clientTolower">
					<dataGrid url="pages/details/client" :list="clientList" tab="3" @drop="dropClient"
						@amend="amendClient">
					</dataGrid>
					<uni-load-more :status="clientStatus" IconType="auto" :content-text="contentText" />
				</scroll-view>
			</block>
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
					<uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" />
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
					id: 0,
					url: "pages/plusForm/addGoods",
				}, {
					text: '供应商',
					id: 1,
					url: "pages/plusForm/addSupplier",
				}, {
					text: '客户',
					id: 2,
					url: "pages/plusForm/addCustomer",
				}],
				first: {
					text: '物品',
					id: 0,
					url: "pages/plusForm/addGoods",
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
				contentText: {
					contentdown: '下拉加载',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}


			}
		},
		onLoad() {
			this.productData();
			this.supplierData();
			this.clientData();
		},
		onShow() {

		},
		mounted() {

		},
		methods: {
			// 物品数据
			productData() {
				let _this = this;
				_this.$request.get('prods', {
					page: _this.productPage,
					size: _this.productSize,
				}).then(res => {
					let data = res.data;
					if (!res.data.hasNextPage) {
						_this.productNext = false;
						_this.productStatus = 'noMore';
					}
					_this.productList.push(...data.data);
				})
			},
			// 供应商数据
			supplierData() {
				let _this = this;
				_this.$request.get('suppliers', {
					page: _this.supplierPage,
					size: _this.supplierSize,
				}).then(res => {
					let data = res.data;
					if (!res.data.hasNextPage) {
						_this.supplierNext = false;
						_this.supplierStatus = 'noMore';
					}
					_this.supplierList.push(...data.data);

				})
			},
			// 客户数据
			clientData() {
				let _this = this;
				_this.$request.get('customers', {
					page: _this.clientPage,
					size: _this.clientSize,
				}).then(res => {
					let data = res.data;
					if (!res.data.hasNextPage) {
						_this.clientNext = false;
						_this.clientStatus = 'noMore';
					}
					_this.clientList.push(...data.data);

				})
			},
			// 删除物品
			dropProduct(id, index) {
				let _this = this;
				_this.$api.showModal('确定要删除物品！').then(() => {

					_this.$request.del('prod/' + id).then(res => {
						_this.productList.splice(index, 1)
					});
					_this.$api.msg('删除成功')

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
					_this.$request.del('supplier/' + id).then(res => {
						_this.supplierList.splice(index, 1)
					});
					_this.$api.msg('删除成功')
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
					_this.$request.del('customer/' + id).then(res => {
						_this.clientList.splice(index, 1)
					});
					_this.$api.msg('删除成功')
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
			// tab切换
			change(item) {
				this.first = item;
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
