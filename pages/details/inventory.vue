<template>
	<view class="paddingBottom">
		<headerTab title="盘点详情"></headerTab>

		<view class="goods-list gray">
			<view class="goods-flex">
				<view>
					<view class="track">
						<text>盘点单号：</text>
						<text class="black">{{check.checkNo}} </text>
					</view>
					<view class="track">
						<text>盘点日期：</text>
						<text class="black">{{check.createTime}}</text>
					</view>
					<view class="track">
						<text>仓库名称：</text>
						<text class="black">{{check.warehouseName}}</text>
					</view>
					<view class="track">
						<text>盘点人：</text>
						<text class="black">{{check.ourContacterName}}</text>
					</view>
					<view class="track">
						<text>备注：</text>
						<text class="black"> {{check.remarks}}</text>
					</view>
				</view>
			</view>
		</view>

		<productMessage title="盘点物品" :list="goodsList" :hide="false"></productMessage>

		<operator :list="operation"></operator>
		<copyreader :show="compileShow" @close="handleClose()">
			<view class="operation" hover-class="checkActive"
				@click="$navto.navto('pages/plusForm/addInventory',{id:id,header:'修改盘点',type: 1})">
				修改
			</view>
			<view class="operation red" hover-class="checkActive" @click="delInventory">
				删除
			</view>
		</copyreader>
		<addOrder type="2" @click="handleClose()"></addOrder>
	</view>
</template>

<script>
	let {
		$getCheckId,
		$getCheckGoods,
		$delCheck
	} = require('@/api/inventory.js'); //盘点
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
				check: {}, //详情数据
				operation: {}, //操作人
				goodsList: [], //物品数据
			}
		},
		onLoad(e) {
			this.id = e.id;
		},
		onShow() {
			this.getData();
			this.goodsData();
		},
		methods: {
			async getData() {
				let _this = this;
				let res = await $getCheckId(_this.id);
				_this.check = res.data;
				// 操作日记
				_this.operation.createTime = res.data.createTime;
				_this.operation.creator = res.data.creator;
				_this.operation.updatedTime = res.data.updatedTime;
				_this.operation.updator = res.data.updator;

			},
			async goodsData() {
				let _this = this;
				let res = await $getCheckGoods(_this.id);
				_this.goodsList = res.data;
			},
			// 删除
			delInventory() {
				let _this = this;
				_this.$api.showModal('你要确定要删除该盘点吗?').then(() => {
					$delCheck(_this.id).then(res => {
						_this.$api.msg('删除成功！');
						setTimeout(function() {
							_this.$navto.navBack();
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
