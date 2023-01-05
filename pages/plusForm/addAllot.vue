<template>
	<view class="supplier">
		<headerTab :title="header"></headerTab>
		<view class="table">
			<view class="from from-new">
				<text class="title">调拨日期</text>
				<view class="fill">
					<uni-datetime-picker v-model="transferDate" type="date" @change="transferPurchase"
						:clear-icon="false">
						{{transferDate}}
					</uni-datetime-picker>
				</view>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
			<view class="from from-new">
				<text class="title">调入仓库</text>
				<text class="fill">本地</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
			<view class="from from-new">
				<text class="title">调出仓库</text>
				<text class="fill gray">选择仓库(必填)</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
			<view class="table">
				<view class="from from-new" @click="navWarehouse()">
					<text class="title">调入仓库</text>
					<text class="fill">
						<text v-if="warehouse.warehouseName">{{warehouse.warehouseName}}</text>
						<text class="gray" v-else>选择调入仓库(必填)</text>
					</text>
					<text class="iconfont icon-right-1-copy"></text>
				</view>
			</view>
			<view class="table">
				<view class="from from-new" @click="navWarehouse()">
					<text class="title">调出仓库</text>
					<text class="fill">
						<text v-if="warehouse.warehouseName">{{warehouse.warehouseName}}</text>
						<text class="gray" v-else>选择调出仓库(必填)</text>
					</text>
					<text class="iconfont icon-right-1-copy"></text>
				</view>
			</view>
			
		</view>
		<selectGoods @shape="accept" ref="goods" :ids="4" :hide="false"></selectGoods>

		<block v-if="productList.length !=0">
			<view class="headline">
				相关信息
			</view>
			<view class="table product">
				<view class="from from-new">
					<text class="title">经办人</text>
					<input type="text" placeholder="填写经办人" class="fill" v-model="contacterName">
					<text class="iconfont icon-right-1-copy"></text>
				</view>
				<view class="from from-new">
					<text class="title">备注</text>
					<input type="text" placeholder="填写备注" class="fill" v-model="remarks">
					<text class="iconfont icon-right-1-copy"></text>
				</view>
			</view>
		</block>
		<footerBtn @confirm="addressBtn()"></footerBtn>
	</view>
</template>

<script>
	let {
		$postTransfer,
		$getTransferId,
		$getTransferGoods,
		$putTransfer
	} = require('@/api/transfer.js'); //调拨
	import headerTab from '@/components/headerTab/index.vue';
	import selectGoods from "@/components/selectGoods.vue"
	import footerBtn from '@/components/footerBtn.vue';
	export default {
		components: {
			headerTab,
			selectGoods,
			footerBtn
		},
		data() {
			return {
				id: '',
				type: 0,
				header: '新建调拨单',
				transferDate: this.$api.dateTime("yyyy-MM-dd"),
				inWarehouseName: "本地", //调入仓库
				outWarehouseName: "北京", //调出仓库
				remarks: "", //备注
				contacterName: "", //经办人
				productList: [], //物品数据

				updatedTime: "",

			}
		},
		async onLoad(option) {
			let _this = this;
			_this.type = option.type || 0;
			_this.id = option.id || '';
			_this.header = option.header ? decodeURIComponent(option.header) : '新建盘点单';
			if (_this.type == 1) {
				_this.getData();
				//物品
				let goods = await $getTransferGoods(_this.id);
				_this.productList = goods.data;
				_this.productList.forEach(item => {
					item.newRemarks = item.remarks;
					item.notReceiverQuantity = item.systemNum;
					item.quantity = item.transferNum;
				})

			}
			_this.$refs.goods.productList = _this.productList;
		},
		methods: {
			async getData() {
				let _this = this;
				let res = await $getTransferId(_this.id);
				let data = res.data;

				_this.transferDate = data.transferDate || _this.$api.dateTime("yyyy-MM-dd");
				_this.inWarehouseName = data.inWarehouseName;
				_this.outWarehouseName = data.outWarehouseName;
				_this.remarks = data.remarks;
				_this.checkName = data.contacterName;

				_this.updatedTime = new Date(data.updatedTime).valueOf();

			},
			// 确定
			async addressBtn() {
				let _this = this;
				let data = {};
				data.transferDate = _this.transferDate;
				data.inWarehouseName = _this.inWarehouseName;
				data.outWarehouseName = _this.outWarehouseName;
				data.remarks = _this.remarks;
				data.contacterName = _this.contacterName
				let goods = [];
				_this.productList.forEach(e => {
					goods.push({
						unitPrice: e.purchasePrice,
						warehouseProdId: e.id,
						remarks: e.newRemarks,
						systemNum: e.notReceiverQuantity,
						transferNum: e.quantity,
						...e
					})
				});
				data.prodInfoDtos = goods;

				if (_this.type == 1) {
					let time = await $getTransferId(_this.id);
					let updatedTime = new Date(time.data.updatedTime).valueOf();
					if (_this.updatedTime != updatedTime) {
						_this.$api.showModal('修改已经过期请重新进入！').then(() => {
							_this.$navto.navtab('pages/warehouse/index')
						});
						return;
					};
					$putTransfer(_this.id, data).then(res => {
						_this.$api.msg('修改成功！');
						setTimeout(function() {
							_this.$navto.navClose('pages/details/allocate', {
								id: res.data.id,
							})
						}, 500)

					})
				} else {
					$postTransfer(data).then(res => {
						_this.$api.msg('创建成功！');
						setTimeout(function() {
							_this.$navto.navClose('pages/details/allocate', {
								id: res.data.id,
							})
						}, 500)
					})

				}

			},
			// 调拨日期选择
			transferPurchase(date) {
				this.transferDate = date;
			},
			accept(item) {
				this.productList = item;
				this.$refs.goods.productList = this.productList;

			},
		}
	}
</script>

<style lang="scss">
	.credit {
		width: auto !important;
		padding-right: 20rpx;
	}

	.headline {
		padding: 16rpx 0;
		margin: 0 20rpx;
		font-size: 30rpx;
	}
</style>
