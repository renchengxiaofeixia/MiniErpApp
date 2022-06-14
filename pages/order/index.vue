<template>
	<view class="">
		<headerTab :scrollTab="scrollTab" @tabKey="change" :tab="order.id"></headerTab>
		<searchbox @filter="openFilter()" @confirm="confirm" :placeholder="order.placeholder"></searchbox>

		<view class="" v-show="order.id == 0">
			<dataGrid url="pages/details/purchase" :list="purchaseList" tab="4" @drop="dropPurchase"
				@amend="amendPurchase">
			</dataGrid>
		</view>

		<view class="" v-show="order.id == 1">
			<dataGrid url="pages/details/sell" :list="marketList" tab="5" @drop="dropSell" @amend="amendSell">
			</dataGrid>
		</view>

		<filtratePopup @close="openFilter()" :show="filterShow">
			<view>
				<view class="table" style="padding: 0;">
					<pulldown headline="接收状态">
						<stateBar
							:list="[{monicker: '全部',id: 1}, {monicker: '未接收',id: 2}, {monicker: '已接收',id: 3}, {monicker: '已取消',id: 4}]"
							breadth="20%">
						</stateBar>
					</pulldown>
				</view>

				<view class="table" style="padding: 0;">
					<pulldown headline="入库状态">
						<stateBar
							:list="[{monicker: '全部',id: 1}, {monicker: '未完成入库',id: 2}, {monicker: '已完成入库',id: 3}]">
						</stateBar>
					</pulldown>
				</view>

				<view class="table" style="padding: 0;">
					<pulldown headline="付款状态">
						<stateBar
							:list="[{monicker: '全部',id: 1}, {monicker: '未完成付款',id: 2}, {monicker: '已完成付款',id: 3}]">
						</stateBar>
					</pulldown>
				</view>

				<view class="table" style="padding: 0;">
					<pulldown headline="发票状态">
						<stateBar
							:list="[{monicker: '全部',id: 1}, {monicker: '未全部到票',id: 2}, {monicker: '已全部到票',id: 3}]">
						</stateBar>
					</pulldown>
				</view>
				<view class="table" style="padding: 0;">
					<pulldown headline="所属项目">
					</pulldown>
				</view>
				<view class="table" style="padding: 0;">
					<view class="contact-date">
						入库日期
					</view>
					<uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" :clear-icon="false"/>
				</view>
			</view>

		</filtratePopup>
		<addOrder :url="order.url"></addOrder>
	</view>
</template>

<script>
	let {
		$getPurchases,
		$delPurchases
	} = require('@/api/purchase.js'); //采购

	let {
		$getOrder,
		$delOrder
	} = require('@/api/market.js'); //销售
	import headerTab from '@/components/headerTab/index.vue';
	import searchbox from '@/components/searchbox/index.vue';
	import dataGrid from '@/components/dataGrid/index.vue';
	import addOrder from '@/components/addOrder.vue';
	import filtratePopup from '@/components/filtratePopup/index.vue';
	import pulldown from "@/components/pulldown.vue"
	import stateBar from "@/components/stateBar.vue"
	export default {
		components: {
			headerTab,
			searchbox,
			dataGrid,
			addOrder,
			filtratePopup,
			pulldown, //折叠样式
			stateBar,
		},
		data() {
			return {
				scrollTab: [{
					text: '采购',
					url: "pages/plusForm/addPurchase",
					id: 0,
					open: true,
					placeholder: "供应商/采购单号/物品名称"
				}, {
					text: '销售',
					url: "pages/plusForm/addMarket",
					id: 1,
					open: true,
					placeholder: "客户/销售单号/物品名称/销售员"
				}],
				order: {
					text: '采购',
					url: "pages/plusForm/addPurchase",
					id: 0,
					open: true,
					placeholder: "供应商/采购单号/物品名称"
				},
				filterShow: 'none',
				purchaseList: [], //采购数据
				marketList: [], //销售数据
			}
		},
		onLoad() {

		},
		onShow() {
			this.order.open = true;
			this.getData(this.order.id)
		},
		methods: {
			// 采购
			async purchaseData(sky) {
				let _this = this;
				let res = await $getPurchases();
				if (sky) {
					_this.purchaseList = [];
				}
				let list = [];
				res.data.data.forEach(e => {
					list.push({
						id: e.id,
						name: e.supplierName,
						No: e.purchaseNo,
						check: e.purchaseStatus,
						count: e.prodNos,
						price: e.aggregateAmount.toString()

					})

				})
				_this.purchaseList.push(...list);
				_this.$forceUpdate();

			},
			// 销售
			async marketData(sky) {
				let _this = this;
				let res = await $getOrder();
				if (sky) {
					_this.marketList = [];
				}
				let list = [];
				res.data.data.forEach(e => {
					list.push({
						id: e.id,
						name: e.customerNo,
						No: e.orderNo,
						check: e.orderStatus,
						count: e.prodNos,
						price: e.aggregateAmount.toString()

					})
				})
				_this.marketList.push(...list);
				_this.$forceUpdate();

			},
			getData(index) {
				if (this.order.id == 0 && this.order.open) {
					this.purchaseData(true);
				} else if (this.order.id == 1 && this.order.open) {
					this.marketData(true);
				}
				this.scrollTab[index].open = false;
				this.order.open = false;


			},
			// 删除采购
			dropPurchase(id, index) {
				let _this = this;
				_this.$api.showModal('你要确定要删除采购订单吗?').then(() => {
					$delPurchases(id).then(res => {
						_this.purchaseList.splice(index, 1)
						_this.$api.msg('删除成功！');
					});
				});
			},
			// 修改采购
			amendPurchase(id) {
				this.$navto.navto('pages/plusForm/addPurchase', {
					id: id,
					type: 1,
					header: '修改采购订单'
				})
			},
			// 删除销售
			dropSell(id, index) {
				let _this = this;
				_this.$api.showModal('你要确定要删除销售订单吗?').then(() => {
					$delOrder(id).then(res => {
						_this.marketList.splice(index, 1)
						_this.$api.msg('删除成功！');
					});
				});
			},
			// 修改销售
			amendSell(id) {
				this.$navto.navto('pages/plusForm/addMarket', {
					id: id,
					type: 1,
					header: '修改销售订单'
				})
			},
			//搜索
			confirm(val) {
				console.log(val);
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
				this.order = item;
				console.log(this.order);
				this.getData(item.id);
			}
		}
	}
</script>

<style lang="scss">
	page {
		overflow: hidden;
	}
</style>
