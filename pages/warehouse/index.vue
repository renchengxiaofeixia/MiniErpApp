<template>
	<view class="">
		<headerTab :scrollTab="scrollTab" @tabKey="change" :tab="warehouse.id"></headerTab>
		<searchbox @filter="openFilter()"></searchbox>

		<view class="slide">
			<block v-if="warehouse.id == 0">
				<scroll-view class="scroll-roll" scroll-y>
					<dataGrid url="pages/details/storage" :list="storageList" tab="6">
					</dataGrid>
				</scroll-view>
			</block>
			<block v-if="warehouse.id == 1">
				<scroll-view class="scroll-roll" scroll-y>
					<dataGrid url="pages/details/delivery">

					</dataGrid>
				</scroll-view>
			</block>
			<block v-if="warehouse.id == 2">
				<scroll-view class="scroll-roll" scroll-y>
				</scroll-view>
			</block>
			<block v-if="warehouse.id == 3">
				<scroll-view class="scroll-roll" scroll-y>
					<dataGrid url="pages/details/allocate"></dataGrid>
				</scroll-view>
			</block>
		</view>

		<filtratePopup @close="openFilter()" :show="filterShow">
			<view>
				<view class="table" style="padding: 0;">
					<pulldown headline="库存状况">
						<stateBar
							:list="[{monicker: '全部',id: 1}, {monicker: '正常',id: 2}, {monicker: '负库存',id: 3}, {monicker: '超出上限',id: 4}, {monicker: '超出下限',id: 5}]">
						</stateBar>
					</pulldown>
				</view>

				<view class="table" style="padding: 0;">
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
		<addOrder :url="warehouse.url"></addOrder>
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
					text: '入库',
					url: 'pages/plusForm/addStorage',
					id: 0
				}, {
					text: '出库',
					url: 'pages/plusForm/adddElivery',
					id: 1
				}, {
					text: '盘点',
					id: 2
				}, {
					text: '调拨',
					url: 'pages/plusForm/addAllot',
					id: 3
				}],
				warehouse: {
					text: '入库',
					url: 'pages/plusForm/addStorage',
					id: 0

				},
				filterShow: 'none',
				storageList: [], //入库

			}
		},
		onLoad() {
			this.storageData();
		},
		methods: {
			// 入库数据
			storageData() {
				let _this = this;
				_this.$request.get('enterwarehouses').then(res => {
					let data = res.data;
					console.log(data.data);
					_this.storageList.push(...data.data);
				})
			},
			change(item) {
				this.warehouse = item;
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

		}
	}
</script>

<style lang="scss">
</style>
