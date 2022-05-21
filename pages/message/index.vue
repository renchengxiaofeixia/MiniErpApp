<template>
	<view class="">
		<headerTab :scrollTab="scrollTab" @tabKey="change" :tab="first.id"></headerTab>
		<searchbox @filter="openFilter()"></searchbox>
		<view class="slide">
			<swiper class="swiper" :current="first.id" @change="slidingBlock">
				<swiper-item>
					<scroll-view class="swiper-item scroll" scroll-y="true">
						<dataGrid url="pages/details/commodity" :list="productList" :date="false" tab="1"
							@drop="dropProduct" @amend="amendProduct" :hide="false">
						</dataGrid>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<dataGrid url="pages/details/supplier" :list="supplierList" :date="false" tab="2"
							@drop="dropSupplier" @amend="amendSupplier">

						</dataGrid>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<dataGrid url="pages/details/client" :list="clientlist" :date="false" tab="3" @drop="dropClient"
							@amend="amendClient">
						</dataGrid>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<filtratePopup @close="openFilter()" :show="filterShow">
			<view>
				<block v-if="first.id==1">
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
				supplierList: [], //供应商
				clientlist: [], //客户
		

			}
		},
		onLoad() {
			this.productData();
			this.supplierData();
			this.clientData();
		},
		mounted() {
		
		},
		computed: {

		},
		methods: {
			// 物品数据
			productData() {
				let _this = this;
				_this.$request.get('prods', {
					page: 1,
					size: 10,
				}).then(res => {
					let data = res.data
					_this.productList = data.data;
				})
			},
			// 供应商数据
			supplierData() {
				let _this = this;
				_this.$request.get('suppliers', {
					page: 1,
					size: 10,
				}).then(res => {
					let data = res.data
					_this.supplierList = data.data;

				})
			},
			// 客户数据
			clientData() {
				let _this = this;
				_this.$request.get('customers', {
					page: 1,
					size: 10,
				}).then(res => {
					let data = res.data
					_this.clientlist = data.data;

				})
			},
			// 删除物品
			dropProduct(id, index) {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '确定要删除物品',
					success: function(res) {
						if (res.confirm) {
							_this.$request.del('prod/' + id).then(res => {
								_this.productList.splice(index, 1)
							});
							_this.$api.msg('删除成功')
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
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
				uni.showModal({
					title: '提示',
					content: '确定要删除供应商',
					success: function(res) {
						if (res.confirm) {
							_this.$request.del('supplier/' + id).then(res => {
								_this.supplierList.splice(index, 1)
							});
							_this.$api.msg('删除成功')
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
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
				uni.showModal({
					title: '提示',
					content: '确定要删除供应商',
					success: function(res) {
						if (res.confirm) {
							_this.$request.del('customer/' + id).then(res => {
								_this.clientlist.splice(index, 1)
							});
							_this.$api.msg('删除成功')
						} else if (res.cancel) {}
					}
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
			change(item) {
				this.first = item;
			},
			slidingBlock(e) {
				this.first = this.scrollTab[e.detail.current];
			},
		}
	}
</script>

<style lang="scss">
	.scroll {
		height: 1000rpx;
	}
</style>
