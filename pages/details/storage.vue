<template>
	<view class="paddingBottom">
		<headerTab title="入库单详情" :record="true"></headerTab>

		<view class="goods-list gray">
			<view class="goods-flex">
				<view>
					<view class="track">
						<text>入库单号：</text>
						<text class="black"> {{storage.enterWarehouseNo}}</text>
					</view>
					<view class="track">
						<text>入库日期：</text>
						<text class="black"> {{storage.enterDate}}</text>
					</view>
					<view class="track">
						<text>仓库：</text>
						<text class="black"> {{storage.warehouseName}}</text>
					</view>
					<view class="track">
						<text>入库类型：</text>
						<text class="black"> {{storage.enterType}}</text>
					</view>
				</view>
			</view>
		</view>

		<linkman :list="supplierContact"></linkman>

		<productMessage title="入库物品" :list="storageGoods"></productMessage>

		<view class="table">
			<pulldown headline="相关信息">
				<view class="shove">
					<view class="track">
						<text class="gray">经办人：</text>
						<text class="black"> {{storage.transactor}}</text>
					</view>
					<view class="track">
						<text class="gray">备注：</text>
						<text class="black"> {{storage.remarks}}</text>
					</view>
				</view>
			</pulldown>
		</view>

		<operator :list="operation"></operator>

		<copyreader :show="compileShow" @close="handleClose()">
			<view class="operation" hover-class="checkActive" @click="$navto.navto('pages/print/index')">
				打印
			</view>
			<view class="operation" hover-class="checkActive"
				@click="$navto.navto('pages/plusForm/addStorage',{id:id,type:1,header: '修改入库单'})">
				修改
			</view>
			<view class="operation red" hover-class="checkActive" @click="storageDel">
				删除
			</view>
			<view class="operation" hover-class="checkActive">
				一键出库
			</view>
		</copyreader>
		<addOrder type="2" @click="handleClose()"></addOrder>
	</view>
</template>

<script>
	import headerTab from '@/components/headerTab/index.vue';
	import pulldown from '@/components/pulldown.vue';
	import productMessage from './components/productMessage.vue';
	import linkman from './components/linkman.vue';
	import operator from './components/operator.vue';
	import addOrder from '@/components/addOrder.vue';
	import copyreader from '@/components/copyreader/index.vue';
	export default {
		components: {
			headerTab,
			pulldown,
			productMessage,
			linkman,
			operator,
			addOrder,
			copyreader,

		},
		data() {
			return {
				id: 0,
				compileShow: "none",
				storage: {}, //入库数据
				operation: {}, //操作人
				supplierContact: {}, //供应商
				storageGoods: [] //入库物品
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getData();
			this.goodsData();
		},
		methods: {
			getData() {
				let _this = this;
				_this.$request.get('enterwarehouse/' + _this.id).then(res => {
					let data = res.data;
					_this.storage = data;
					// 供应商联系
					_this.supplierContact.name = data.supplierName;
					_this.supplierContact.linkman = data.supplierNo;
					_this.supplierContact.phone = data.supplierTelNo;

					// 操作日记
					_this.operation.createTime = data.createTime;
					_this.operation.creator = data.creator;
					_this.operation.updatedTime = data.updatedTime;
					_this.operation.updator = data.updator;

				})
			},
			goodsData() {
				let _this = this;
				_this.$request.get('enterwarehouse/prodinfos/' + _this.id).then(res => {
					_this.storageGoods = res.data;
					_this.storageGoods.forEach(e => {
						e.money = e.unitPrice * e.quantity;
						_this.totalPrice += e.money;
					})
				})
			},
			// 删除
			storageDel() {
				let _this = this;
				_this.$api.showModal('你要确定要删除入库单吗?').then(() => {
					_this.$request.del('enterwarehouse/' + _this.id).then(res => {
						_this.$api.msg('删除成功！');
						setTimeout(function() {
							_this.$navto.navtab('pages/warehouse/index')
						}, 500)
					})
				});
			},
			handleClose() {
				if (this.compileShow == 'none') {
					this.compileShow = 'show';
				} else {
					this.compileShow = 'hide';
					setTimeout(() => {
						this.compileShow = 'none';
					}, 200);
				}
			},
		}
	}
</script>

<style lang="scss">
	.goods-list {
		padding-top: 20rpx;

	}

	.track {
		padding-top: 10rpx;
	}

	.shove {
		padding: 20rpx 0;
	}

	.phone {
		border-radius: 50%;
		border: 1rpx solid #2ea469;
		width: 92rpx;
		text-align: center;
		color: #2ea469;
		font-size: 24rpx;
		padding: 12rpx 0;

		.iconfont {
			color: #2ea469;
			font-size: 36rpx;
		}
	}
</style>
