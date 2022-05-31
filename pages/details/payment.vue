<template>
	<view>
		<headerTab title="付款详情"></headerTab>

		<view class="table">
			<view class="from from-new">
				<text class="title">支出日期</text>
				<text class="fill">{{payment.paymentDate}}</text>
			</view>
			<view class="from from-new">
				<text class="title">收款方</text>
				<text class="fill">{{payment.supplierName}}</text>
			</view>
			<view class="from from-new">
				<text class="title">支出类型</text>
				<text class="fill">{{payment.payType}}</text>
			</view>
			<view class="from from-new">
				<text class="title">资金账户</text>
				<text class="fill">{{payment.account}}</text>
			</view>
			<view class="from from-new">
				<text class="title">备注</text>
				<text class="fill">{{payment.remarks}}户</text>
			</view>
		</view>
		<view class="headline">
			支出明细
		</view>
		<view class="table">
			<view class="detail">
				<text class="name gray">单号：</text> {{payment.purchaseNo}}
			</view>
			<view class="detail">
				<text class="name gray">金额：</text> ￥{{payment.amount}}
			</view>
			<view class="detail">
				<text class="name gray">备注：</text> {{payment.remarks}}
			</view>

		</view>
		<copyreader :show="isShow" @close="handleClose()">
			<view class="operation" hover-class="checkActive"
				@click="$navto.navto('pages/plusForm/addPayment',{id:id,header:'修改付款',type: 1})">
				修改
			</view>
			<view class="operation red" hover-class="checkActive" @click="paymentDel">
				删除
			</view>
		</copyreader>
		<addOrder type="2" @click="handleClose()"></addOrder>
		<operator :list="operation"></operator>
	</view>
</template>

<script>
	let {
		$getPaymentId,
		$delPayment
	} = require('@/api/purchase.js'); //物品

	import headerTab from '@/components/headerTab/index.vue';
	import operator from './components/operator.vue';
	import addOrder from '@/components/addOrder.vue';
	import copyreader from '@/components/copyreader/index.vue';
	export default {
		components: {
			headerTab,
			operator,
			addOrder,
			copyreader

		},
		data() {
			return {
				id: "",
				payment: {},
				operation: {}, //操作日记
				isShow: "none",
			};
		},
		onLoad(e) {
			this.id = e.id;
		},
		onShow() {
			this.getData();
		},
		methods: {
			async getData() {
				let _this = this;
				let res = await $getPaymentId(_this.id);
				_this.payment = res.data;
				// 操作日记
				_this.operation.createTime = res.data.createTime;
				_this.operation.creator = res.data.creator;
				_this.operation.updatedTime = res.data.updatedTime;
				_this.operation.updator = res.data.updator;

			},
			paymentDel() {
				let _this = this;
				_this.$api.showModal('你要确定要删除付款吗?').then(() => {
					$delPayment(_this.id).then(res => {
						_this.$api.msg('删除成功！');
						setTimeout(function() {
							_this.$navto.navBack();
						}, 500)
					})
				});
			},
			handleClose() {
				if (this.isShow == 'none') {
					this.isShow = 'show';
				} else {
					this.isShow = 'hide';
					setTimeout(() => {
						this.isShow = 'none';
					}, 200);
				}
			},
		}
	}
</script>

<style lang="scss">
	.headline {
		font-size: 28rpx;
		margin: 0 20rpx;
		padding-top: 16rpx;
	}

	.detail {
		padding: 10rpx 20rpx;

		.name {
			width: 100rpx;
		}
	}
</style>
