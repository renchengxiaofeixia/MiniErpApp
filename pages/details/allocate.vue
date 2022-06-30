<template>
	<view>
		<headerTab title="调拨单详情"></headerTab>

		<view class="goods-list gray">
			<view class="goods-flex">
				<view>
					<view class="track">
						<text>调拨单号：</text>
						<text class="black">{{transfer.transferNo}}</text>
					</view>
					<view class="track">
						<text>调入日期：</text>
						<text class="black">{{transfer.transferDate}}</text>
					</view>
					<view class="track">
						<text>调入仓库：</text>
						<text class="black">{{transfer.inWarehouseName}}</text>
					</view>
					<view class="track">
						<text>调出仓库：</text>
						<text class="black">{{transfer.outWarehouseName}}</text>
					</view>
				</view>
			</view>
		</view>

		<productMessage title="调拨物品" :list="goodsList" :hide="false"></productMessage>

		<view class="table">
			<uni-collapse>
				<uni-collapse-item title="相关信息">
					<view class="shove">
						<view class="track">
							<text class="gray">经办人：</text>
							<text class="black"> {{transfer.contacterName}}</text>
						</view>
						<view class="track">
							<text class="gray">备注：</text>
							<text class="black"> {{transfer.remarks}}</text>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<operator :list="operation"></operator>

		<copyreader :show="compileShow" @close="handleClose()">
			<view class="operation red" hover-class="checkActive" @click="transferDel">
				删除
			</view>
			<view class="operation" hover-class="checkActive"
				@click="$navto.navto('pages/plusForm/addAllot',{id:id,header:'修改调拨单',type: 1})">
				修改
			</view>
		</copyreader>

		<addOrder type="2" @click="handleClose()"></addOrder>
	</view>
</template>

<script>
	let {
		$getTransferId,
		$getTransferGoods,
		$delTransfer
	} = require('@/api/transfer.js'); //调拨
	import headerTab from '@/components/headerTab/index.vue';
	import productMessage from './components/productMessage.vue';
	import operator from './components/operator.vue';
	import addOrder from '@/components/addOrder.vue';
	import copyreader from '@/components/copyreader/index.vue';
	export default {
		components: {
			headerTab,
			productMessage,
			operator,
			addOrder,
			copyreader,

		},
		data() {
			return {
				id: '',
				compileShow: "none",
				transfer: {},
				operation: {}, //操作日记
				goodsList: [], //物品

			}
		},
		onLoad(e) {
			this.id = e.id
		},
		onShow() {
			this.getData();
			this.goodsData();
		},
		methods: {
			async getData() {
				let _this = this;
				let res = await $getTransferId(_this.id);
				_this.transfer = res.data;
				// 操作日记
				_this.operation.createTime = res.data.createTime;
				_this.operation.creator = res.data.creator;
				_this.operation.updatedTime = res.data.updatedTime;
				_this.operation.updator = res.data.updator;
			},
			async goodsData() {
				let _this = this;
				let res = await $getTransferGoods(_this.id);
				res.data.forEach(item => {
					item.systemNum = item.systemNum;
					item.actualNum = item.transferNum;
				})
				_this.goodsList = res.data;
			},
			// 删除
			transferDel() {
				let _this = this;
				_this.$api.showModal('你要确定要删除该调拨单吗?').then(() => {
					$delTransfer(_this.id).then(res => {
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
		padding: 20rpx;
		border-top: 1rpx solid #ccc;
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
