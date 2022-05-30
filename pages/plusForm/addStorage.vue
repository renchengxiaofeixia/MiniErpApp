<template>
	<view class="">
		<headerTab :title="header"></headerTab>

		<view class="table">
			<view class="from from-new" style="margin: 0 40upx;">
				<text class="title">采购日期</text>
				<view class="fill">
					<uni-datetime-picker v-model="storageDate" type="date" @change="selectStorage">
						{{storageDate}}
					</uni-datetime-picker>
				</view>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
			<pulldown headline="仓库" :title="warehouseName"></pulldown>
			<pulldown headline="库存状况">
				<stateBar :list="stockState" breadth='20%' @switch="switchover">
				</stateBar>
			</pulldown>
		</view>

		<view class="table" v-if="inventoryState == 0">
			<view class="from from-new" @click="navSupplier()">
				<text class="title">供应商</text>
				<text class="fill">
					<text v-if="supplier.supplierName">{{supplier.supplierName}}</text>
					<text class="gray" v-else>选择供应商(必填)</text>
				</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
		</view>
		<view class="table" v-if="inventoryState == 1">
			<view class="from from-new">
				<text class="title">客户</text>
				<text class="fill gray">选择客户</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
		</view>

		<view class="table" v-if="inventoryState == 2">
			<view class="from from-new">
				<text class="title">生产部门</text>
				<text class="fill gray">选择生产部门</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>

			<view class="from from-new">
				<text class="title">生产人</text>
				<text class="fill gray">选择生产人</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
		</view>

		<view class="table" v-if="inventoryState == 3">
			<view class="from from-new">
				<text class="title">入库方</text>
				<input type="text" placeholder="填写入库方" class="fill">
			</view>
		</view>

		<selectGoods :list="productList" @shape="accept" :hide="type != 2"></selectGoods>

		<block v-if="productList.length !=0">
			<view class="headline">
				相关信息
			</view>
			<view class="table product">
				<view class="from from-new">
					<text class="title">经办人</text>
					<input type="text" placeholder="填写经办人" class="fill" v-model="correlation.transactor">
					<text class="iconfont icon-right-1-copy"></text>
				</view>
				<view class="from from-new">
					<text class="title">备注</text>
					<input type="text" placeholder="填写备注" class="fill" v-model="correlation.remarks">
					<text class="iconfont icon-right-1-copy"></text>
				</view>
			</view>
		</block>
		<footerBtn @confirm="productBnt()"></footerBtn>
	</view>
</template>

<script>
	let {
		$goodsStorage,
		$getStorageId,
		$putStorage,
		$postStorage
	} = require('@/api/storage.js'); //入库
	import headerTab from '@/components/headerTab/index.vue';
	import pulldown from "@/components/pulldown.vue"
	import stateBar from "@/components/stateBar.vue"
	import selectGoods from "@/components/selectGoods.vue"
	import footerBtn from '@/components/footerBtn.vue';
	export default {
		components: {
			headerTab,
			pulldown,
			stateBar,
			selectGoods,
			footerBtn

		},
		data() {
			return {
				id: '',
				type: 0,
				header: '新建入库单',
				inventoryState: 0,
				storageDate: this.$api.dateTime("yyyy-MM-dd"), //入库日期
				warehouseName: "本地",
				productList: [], //接收物品数据
				goods: [], //

				enterType: "采购入库", //库存状态
				supplier: {}, //采购入库  供应商
				client: {}, //销售入库   客户
				production: {}, //生产部门
				restsMode: "", //其他入库
				correlation: { //相关信息
					transactor: '',
					remarks: ""
				},
				purchaseList: [], //采购数据
				purchaseNo: "", //单号
				stockState: [{ //库存状况
						monicker: '采购入库',
						id: 0
					}, {
						monicker: '销售退货',
						id: 1
					},
					{
						monicker: '生产入库',
						id: 2
					}, {
						monicker: '其他入库',
						id: 3
					}
				],
				updatedTime: ""

			}
		},
		async onLoad(option) {
			let _this = this;
			_this.type = option.type || 0;
			_this.id = option.id || '';
			_this.header = option.header ? decodeURIComponent(option.header) : '新建入库单';

			if (_this.type == 1) {
				_this.goodsData();
				//物品
				let isGoods = await $goodsStorage(_this.id);

				_this.productList = isGoods.data;

				_this.productList.forEach(item => {
					let price = Number(item.unitPrice) * item.quantity;
					item.num = item.quantity;
					item.purchasePrice = item.unitPrice;
					item.newRemarks = item.remarks;
					item.totalPrice = price.toFixed(2);
				})

			}

			if (_this.type == 2) {
				let data = JSON.parse(decodeURIComponent(option.list)) || [];
				_this.stockState = [{
					monicker: '采购入库',
					id: 0
				}]
				// 供应商
				_this.supplier.mobile = data.supplierContact.phone;
				_this.supplier.supplierNo = data.supplierContact.linkman;
				_this.supplier.supplierName = data.supplierContact.name;
				_this.supplier.supplierContacterName = data.supplierContact.supplierContacterName;
				// 物品
				data.goodsList.forEach(item => {
					let price = Number(item.unitPrice) * item.quantity;
					item.num = item.quantity;
					item.purchasePrice = item.unitPrice;
					item.newRemarks = item.remarks;
					item.totalPrice = price.toFixed(2);
				})
				_this.purchaseNo = data.purchase.purchaseNo
				_this.productList = data.goodsList
				_this.purchaseList = data
				console.log(data);
			}
		},
		methods: {

			async goodsData() {
				let _this = this;
				let res = await $getStorageId(_this.id);
				let data = res.data;
				_this.storageDate = data.storageDate || _this.$api.dateTime("yyyy-MM-dd");
				_this.warehouseName = data.warehouseName;

				if (data.enterType == '采购入库') {
					_this.supplier.mobile = data.supplierTelNo;
					_this.supplier.supplierNo = data.supplierNo;
					_this.supplier.supplierName = data.supplierName;
					_this.supplier.supplierContacterName = data.supplierContacterName;
				}

				// 相关信息
				_this.correlation.transactor = data.transactor;
				_this.correlation.remarks = data.remarks;

				_this.updatedTime = new Date(data.updatedTime).valueOf();

			},
			// 确定
			async productBnt() {
				let _this = this;

				if (!_this.storageDate) {
					_this.$api.msg('请选择采购日期！');
					return
				}

				if (!_this.supplier.supplierNo && _this.inventoryState == 0 && _this.type != 2) {
					_this.$api.msg('请选择供应商！');
					return
				}

				if (_this.goods.length == 0) {
					_this.$api.msg('请选择物品！');
					return
				}

				let data = {};
				data.enterDate = _this.storageDate;
				data.warehouseName = _this.warehouseName;
				data.enterType = _this.enterType;
				data.purchaseNo = _this.purchaseNo;

				data.supplierTelNo = _this.supplier.mobile;
				data.supplierNo = _this.supplier.supplierNo;
				data.supplierName = _this.supplier.supplierName;
				data.supplierContacterName = _this.supplier.supplierContacterName;
				data.remarks = _this.correlation.remarks;
				data.transactor = _this.correlation.transactore || "";
				data.prodInfoDtos = _this.goods;

				if (_this.type == 1) {
					let time = await $getStorageId(_this.id);
					let updatedTime = new Date(time.data.updatedTime).valueOf();

					if (_this.updatedTime != updatedTime) {
						_this.$api.showModal('修改已经过期请重新进入！').then(() => {
							_this.$navto.navtab('pages/order/index')
						});
						return;
					};
					$putStorage(_this.id, data).then(res => {
						_this.$api.msg('修改成功！');
						setTimeout(function() {
							_this.$navto.navClose('pages/details/storage', {
								id: res.data.id,
							})
						}, 500)

					})
				} else {
					$postStorage(data).then(res => {
						_this.$api.msg('创建成功！');
						setTimeout(function() {
							_this.$navto.navClose('pages/details/storage', {
								id: res.data.id,
							})
						}, 500)
					})

				}

			},
			// 供应商选择
			navSupplier() {
				if (this.type == 2) {
					this.$api.msg('禁止选择供应商！');
					return
				}
				this.$navto.navto('pages/address/choiceCargo', {
					id: 2,
					headline: '选择供应商'
				})
			},
			switchover(item) {
				this.enterType = item.monicker;
				this.inventoryState = item.id;

			},
			// 入库日期选择
			selectStorage(date) {
				this.purchaseDate = date;
			},
			accept(item) {
				let goods = [];
				item.forEach(e => {
					goods.push({
						// purchaseNo: "",
						prodNo: e.prodNo,
						prodCustomNo: e.prodCustomNo,
						prodName: e.prodName,
						prodModel: e.prodModel,
						unit: e.unit,
						unitPrice: e.purchasePrice,
						quantity: e.quantity,
						remarks: e.newRemarks
					})
				});
				this.goods = goods;
			},

		}
	}
</script>

<style lang="scss">
	.headline {
		padding-top: 16rpx;
		margin: 0 20rpx;
		font-size: 30rpx;
	}
</style>
