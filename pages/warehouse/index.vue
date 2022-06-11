<template>
	<view class="">
		<headerTab :scrollTab="scrollTab" @tabKey="change" :tab="warehouse.id"></headerTab>
		<searchbox @filter="openFilter()"></searchbox>

		<view class="slide">
			<block v-if="warehouse.id == 0">
				<scroll-view class="scroll-roll" scroll-y>
					<dataGrid url="pages/details/storage" :list="storageList" tab="6" @drop="dropStorage"
						@amend="amendStorage">
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
					<dataGrid url="pages/details/inventory" :list="inventoryList" tab="8" @drop="dropInventory"
						@amend="amendInventory">
					</dataGrid>
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
	let {
		$getStorage,
		$delStorage
	} = require('@/api/storage.js'); //采购

	let {
		$getCheck,
		$delCheck
	} = require('@/api/inventory.js'); //盘点
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
					url: 'pages/plusForm/addInventory',
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
				deliveryList: [], //出库
				inventoryList: [], //盘点
				allotList: [], //调拨

			}
		},
		onLoad() {

		},
		onShow() {
			this.storageList = [];
			this.deliveryList = [];
			this.inventoryList = [];
			this.allotList = [];
			this.storageData();
			this.inventoryData();
		},
		methods: {
			// 入库数据
			async storageData() {
				let _this = this;
				let res = await $getStorage();
				_this.storageList.push(...res.data.data);

			},
			// 出库数据
			async deliveryData() {


			},
			// 盘点数据
			async inventoryData() {
				let _this = this;
				let res = await $getCheck();
				_this.inventoryList.push(...res.data.data);

			},
			// 删除入库
			dropStorage(id, index) {
				let _this = this;
				_this.$api.showModal('你要确定要删除该盘点吗?').then(() => {
					$delStorage(id).then(res => {
						_this.$api.msg('删除成功！');
						_this.storageList.splice(index, 1)
					})
				});
			},
			// 新建入库
			amendStorage(id) {
				this.$navto.navto('pages/plusForm/addStorage', {
					id: id,
					header: '修改入库单',
					type: 1
				})
			},
			// 删除盘点
			dropInventory(id, index) {
				let _this = this;
				_this.$api.showModal('你要确定要删除该盘点吗?').then(() => {
					$delCheck(id).then(res => {
						_this.$api.msg('删除成功！');
						_this.inventoryList.splice(index, 1)
					})
				});
			},
			// 新建盘点
			amendInventory(id) {
				this.$navto.navto('pages/plusForm/addInventory', {
					id: id,
					header: '修改盘点单',
					type: 1
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
