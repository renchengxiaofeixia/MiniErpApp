<template>
	<view class="">
		<headerTab :scrollTab="scrollTab" @tabKey="change" :tab="warehouse.id"></headerTab>
		<searchbox @filter="showDrawer()" @confirm="confirm" :placeholder="warehouse.placeholder"></searchbox>


		<view v-if="warehouse.id == 0">
			<dataGrid url="pages/details/storage" :list="storageList" tab="6" @drop="dropStorage" @amend="amendStorage">
			</dataGrid>
		</view>
		<!-- <view v-if="warehouse.id == 1">
			<dataGrid url="pages/details/delivery">
			</dataGrid>
		</view> -->
		<view v-if="warehouse.id == 1">
			<dataGrid url="pages/details/inventory" :list="inventoryList" tab="8" @drop="dropInventory"
				@amend="amendInventory">
			</dataGrid>
		</view>
		<view v-if="warehouse.id == 2">
			<dataGrid url="pages/details/allocate" :list="transferList"></dataGrid>
		</view>


		<filtratePopup ref="show">
			<view>
				<!-- <view class="table" style="padding: 0;">
					<pulldown headline="库存状况">
						<stateBar
							:list="[{monicker: '全部',id: 1}, {monicker: '正常',id: 2}, {monicker: '负库存',id: 3}, {monicker: '超出上限',id: 4}, {monicker: '超出下限',id: 5}]">
						</stateBar>
					</pulldown>
				</view> -->

				<view class="table" style="padding: 0;">
					<view class="contact-date">
						下次联系日期
					</view>
					<uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" :clear-icon="false" />
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

	let {
		$getTransfer
	} = require('@/api/transfer.js'); //调拨
	import headerTab from '@/components/headerTab/index.vue';
	import searchbox from '@/components/searchbox/index.vue';
	import dataGrid from '@/components/dataGrid/index.vue';
	import addOrder from '@/components/addOrder.vue';

	import filtratePopup from '@/components/filtratePopup/index.vue';
	import stateBar from "@/components/stateBar.vue"

	export default {
		components: {
			headerTab,
			searchbox,
			dataGrid,
			addOrder,
			filtratePopup,
			stateBar,
		},
		data() {
			return {
				scrollTab: [{
						text: '入库',
						url: 'pages/plusForm/addStorage',
						id: 0,
						open: true,
						placeholder: "入库方/入库单号/物品名称"
					},
					// {
					// 	text: '出库',
					// 	url: 'pages/plusForm/adddElivery',
					// 	id: 1,
					// 	open: true,
					// 	placeholder: "出库对象/出库单号/物品名称"
					// }, 
					{
						text: '盘点',
						url: 'pages/plusForm/addInventory',
						id: 1,
						open: true,
						placeholder: "盘点单号/物品编号/物品名称"
					}, {
						text: '调拨',
						url: 'pages/plusForm/addAllot',
						id: 2,
						open: true,
						placeholder: "调拨单号/物品编号/物品名称"
					}
				],
				warehouse: {
					text: '入库',
					url: 'pages/plusForm/addStorage',
					id: 0,
					open: true,
					placeholder: "入库方/入库单号/物品名称"

				},
				storageList: [], //入库
				storagePage: 1, //页数
				storageSize: 14, //页数量
				storageNext: true, //是否也下页
				storageStatus: 'more', //加载中

				inventoryList: [], //盘点
				inventoryPage: 1, //页数
				inventorySize: 14, //页数量
				inventoryNext: true, //是否也下页
				inventoryStatus: 'more', //加载中

				transferList: [], //调拨
				transferPage: 1, //页数
				transferSize: 14, //页数量
				transferNext: true, //是否也下页
				transferStatus: 'more', //加载中

			}
		},
		onLoad() {

		},
		onShow() {
			this.warehouse.open = true;
			this.getData(this.warehouse.id)
		},
		methods: {
			// 入库数据
			async storageData(sky) {
				let _this = this;
				let data = {
					page: _this.storagePage,
					size: _this.storageSize,
				};

				let res = await $getStorage(data);
				if (!res) {
					return
				}
				if (sky) {
					_this.storageList = [];
				}
				let list = [];
				res.data.data.forEach(e => {
					list.push({
						id: e.id,
						name: e.supplierName,
						No: e.purchaseNo,
						count: e.prodNos,
						price: e.aggregateAmount.toString()

					})
				})
				_this.storageList.push(...list);

			},
			// 盘点数据
			async inventoryData(sky) {
				let _this = this;
				let data = {
					page: _this.inventoryPage,
					size: _this.inventorySize,
				};

				let res = await $getCheck(data);
				if (!res) {
					return
				}
				if (sky) {
					_this.inventoryList = [];
				}
				let list = [];
				res.data.data.forEach(e => {
					list.push({
						id: e.id,
						name: e.contacterName,
						No: e.checkNo,
						count: e.prodNos

					})
				})
				_this.inventoryList.push(...list);

			},
			// 调拨数据
			async transferData(sky) {
				let _this = this;
				let data = {
					page: _this.transferPage,
					size: _this.transferSize,
				};

				let res = await $getTransfer(data);
				if (!res) {
					return
				}
				if (sky) {
					_this.transferList = [];
				}
				let list = [];
				res.data.data.forEach(e => {
					list.push({
						id: e.id,
						inWarehouseName: e.inWarehouseName,
						outWarehouseName: e.outWarehouseName,
						No: e.transferNo,
						count: e.prodNos

					})
				})
				_this.transferList.push(...list);
			},
			getData(index) {
				if (this.warehouse.id == 0 && this.warehouse.open) {
					this.storageData(true);
				} else if (this.warehouse.id == 1 && this.warehouse.open) {
					this.inventoryData(true);
				} else if (this.warehouse.id == 2 && this.warehouse.open) {
					this.transferData(true)

				}
				this.scrollTab[index].open = false;
				this.warehouse.open = false;
			},
			// 删除入库
			dropStorage(id, index) {
				let _this = this;
				_this.$api.showModal('你要确定要删除该盘点吗?').then(() => {
					$delStorage(id).then(res => {
						_this.$api.msg('删除成功！');
						_this.storageList.splice(index, 1);
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
			//入库下拉加载
			storageTolower() {
				let _this = this;
				if (_this.storageNext) {
					_this.storageStatus = 'loading';
					_this.storagePage = 2;
					_this.storageData();
				} else {
					setTimeout(function() {
						_this.storageStatus = 'noMore';
					}, 1000)
				}
			},
			// 删除盘点
			dropInventory(id, index) {
				let _this = this;
				_this.$api.showModal('你要确定要删除该盘点吗?').then(() => {
					$delCheck(id).then(res => {
						_this.$api.msg('删除成功！');
						_this.inventoryList.splice(index, 1);
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
			//盘点下拉加载
			inventoryTolower() {
				let _this = this;
				if (_this.inventoryNext) {
					_this.inventoryStatus = 'loading';
					_this.inventoryPage = 2;
					_this.inventoryData();
				} else {
					setTimeout(function() {
						_this.inventoryStatus = 'noMore';
					}, 1000)
				}
			},
			//搜索
			confirm(val) {
				console.log(val);
			},
			change(item) {
				this.warehouse = item;
				this.getData(item.id);
			},
			showDrawer() {
				this.$refs.show.showDrawer()
			},

		}
	}
</script>

<style lang="scss">
</style>
