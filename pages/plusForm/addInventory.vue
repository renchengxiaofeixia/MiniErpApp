<template>
	<view class="">
		<headerTab :title="header"></headerTab>

		<view class="table">
			<view class="from from-new">
				<text class="title">盘点日期</text>
				<view class="fill">
					<uni-datetime-picker v-model="inventoryDate" type="date" @change="selectInventory"
						:clear-icon="false">
						{{inventoryDate}}
					</uni-datetime-picker>
				</view>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
			<view class="from from-new">
				<text class="title">仓库名</text>
				<input type="text" placeholder="填写仓库名称" class="fill" v-model="warehouseName">
			</view>
			<view class="from from-new">
				<text class="title">盘点人</text>
				<input type="text" placeholder="填写盘点人" class="fill" v-model="checkName">
			</view>
			<view class="from from-new">
				<text class="title">备注</text>
				<input type="text" placeholder="填写备注" class="fill" v-model="remarks">
			</view>
		</view>

		<selectGoods ref="goods" @shape="accept" :ids="4" :hide="false"></selectGoods>

		<footerBtn @confirm="checkBnt()"></footerBtn>
	</view>
</template>

<script>
	let {
		$postCheck,
		$getCheckId,
		$getCheckGoods,
		$putCheck
	} = require('@/api/inventory.js'); //盘点
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
				header: '新建盘点单',
				inventoryDate: this.$api.dateTime("yyyy-MM-dd"), //入库日期
				remarks: "", //备注
				warehouseName: "", //仓库名
				checkName: "", //盘点人
				productList: [], //接收物品数据

				purchaseNo: "", //单号
				updatedTime: ""

			}
		},
		async onLoad(option) {
			let _this = this;
			_this.type = option.type || 0;
			_this.id = option.id || '';
			_this.header = option.header ? decodeURIComponent(option.header) : '新建盘点单';

			if (_this.type == 1) {
				_this.goodsData();
				//物品
				let isGoods = await $getCheckGoods(_this.id);
				_this.productList = isGoods.data;
				_this.productList.forEach(item => {
					item.newRemarks = item.remarks;
					item.quantity = item.systemNum;
					item.nowQuantity = item.actualNum;
				})

			}
			this.$refs.goods.productList = this.productList;
		},
		methods: {
			async goodsData() {
				let _this = this;
				let res = await $getCheckId(_this.id);
				let data = res.data;

				_this.inventoryDate = data.checkDate || _this.$api.dateTime("yyyy-MM-dd");
				_this.warehouseName = data.warehouseName;
				_this.remarks = data.remarks;
				_this.checkName = data.ourContacterName;

				_this.updatedTime = new Date(data.updatedTime).valueOf();

			},
			// 确定
			async checkBnt() {
				let _this = this;
				if (!_this.warehouseName) {
					_this.$api.msg('仓库名称不能为空！');
					return
				}

				if (!_this.checkName) {
					_this.$api.msg('盘点人不能为空！');
					return
				}

				if (_this.productList.length == 0) {
					_this.$api.msg('请选择物品！');
					return
				}

				let data = {};
				data.checkDate = _this.inventoryDate;
				data.remarks = _this.remarks;
				data.ourContacterName = _this.checkName;
				data.warehouseName = _this.warehouseName;

				let goods = [];
				_this.productList.forEach(e => {
					goods.push({
						// purchaseNo: "",
						prodNo: e.prodNo,
						prodCustomNo: e.prodCustomNo,
						prodName: e.prodName,
						prodModel: e.prodModel,
						unit: e.unit,
						unitPrice: e.purchasePrice,
						quantity: e.quantity,
						remarks: e.newRemarks,
						systemNum: e.notReceiverQuantity,
						actualNum: e.quantity,

					})
				});
				data.prodInfoDtos = _this.goods;

				if (_this.type == 1) {
					let time = await $getCheckGoods(_this.id);
					let updatedTime = new Date(time.data.updatedTime).valueOf();
					if (_this.updatedTime != updatedTime) {
						_this.$api.showModal('修改已经过期请重新进入！').then(() => {
							_this.$navto.navtab('pages/warehouse/index')
						});
						return;
					};
					$putCheck(_this.id, data).then(res => {
						_this.$api.msg('修改成功！');
						setTimeout(function() {
							_this.$navto.navClose('pages/details/inventory', {
								id: res.data.id,
							})
						}, 500)

					})
				} else {
					$postCheck(data).then(res => {
						_this.$api.msg('创建成功！');
						setTimeout(function() {
							_this.$navto.navClose('pages/details/inventory', {
								id: res.data.id,
							})
						}, 500)
					})

				}

			},
			// 盘点日期选择
			selectInventory(date) {
				this.inventoryDate = date;
			},
			accept(item) {
				this.productList = item;
				this.$refs.goods.productList = this.productList;
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
