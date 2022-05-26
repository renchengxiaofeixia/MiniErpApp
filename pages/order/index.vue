<template>
	<view class="">
		<headerTab :scrollTab="scrollTab" @tabKey="change" :tab="order.id"></headerTab>
		<searchbox @filter="openFilter()"></searchbox>


		<view class="slide">
			<swiper class="swiper" :current="order.id" @change="slidingBlock">
				<swiper-item>
					<view class="swiper-item">
						<dataGrid url="pages/details/purchase" :list="purchaseList" tab="4">
						</dataGrid>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<dataGrid url="pages/details/sell">
						</dataGrid>
					</view>
				</swiper-item>
			</swiper>
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
					<uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" />
				</view>
			</view>

		</filtratePopup>
		<addOrder :url="order.url"></addOrder>
	</view>
</template>

<script>
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
					id: 0
				}, {
					text: '销售',
					url: "pages/plusForm/addMarket",
					id: 1
				}],
				order: {
					text: '采购',
					url: "pages/plusForm/addPurchase",
					id: 0
				},
				filterShow: 'none',
				purchaseList: [], //采购数据
			}
		},
		onLoad() {
			this.purchaseData();
		},
		methods: {
			purchaseData() {
				let _this = this;
				_this.$request.get('purchases').then(res => {
					let data = res.data;
					_this.purchaseList.push(...data.data);
					
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
				this.order = item;
			},
			slidingBlock(e) {
				this.order = this.scrollTab[e.detail.current];
			},
		}
	}
</script>

<style lang="scss">

</style>
