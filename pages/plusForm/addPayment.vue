<template>
	<view>
		<headerTab :title="header"></headerTab>

		<view class="table">
			<view class="from from-new">
				<text class="title">支出日期</text>
				<view class="fill">
					<uni-datetime-picker v-model="expendTime" type="date" @change="expendChange">
						{{expendTime}}
					</uni-datetime-picker>
				</view>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
			<view class="from from-new">
				<text class="title">收款方</text>
				<input type="text" placeholder="选择仓库(必填)" v-model="proceedsName" />
			</view>

			<view class="from from-new" @click="$navto.navto('pages/conserve/storage',{header:'选择支出类型',id:3})">
				<text class="title">支出类型</text>
				<view class="fill">
					<text v-if="payType">{{payType}}</text>
					<text v-else class="gray">选择支出类型</text>
				</view>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
			<view class="from from-new" @click="$navto.navto('pages/conserve/storage',{header:'选择资金账户',id:4})">
				<text class="title">资金账户</text>
				<view class="fill">
					<text v-if="account">{{account}}</text>
					<text v-else class="gray">选择资金账户</text>
				</view>
				<text class="iconfont icon-right-1-copy"></text>
			</view>

			<view class="from from-new">
				<text class="title">付款金额</text>
				<input type="text" placeholder="填写金额(必填)" v-model="amount" />
			</view>

			<view class="from from-new">
				<text class="title">备注</text>
				<input type="text" placeholder="填写备注" class="fill" v-model="remark">
			</view>
		</view>

		<footerBtn @confirm="paymentBut()"></footerBtn>
	</view>
</template>

<script>
	let {
		$postPayment,
		$getPaymentId,
		$putPayment
	} = require('@/api/purchase.js'); //物品

	import headerTab from '@/components/headerTab/index.vue';
	import footerBtn from '@/components/footerBtn.vue';
	export default {
		components: {
			headerTab,
			footerBtn
		},
		data() {
			return {
				id: "",
				type: 0,
				header: "新建付款",
				expendTime: this.$api.dateTime("yyyy-MM-dd"),
				proceedsName: "", //收款人
				payType: "", //支出类型
				account: "", //资金账户
				amount: "", //付款金额
				remark: "", //备注
				purchaseNo: "", //采购单号


			};
		},
		onLoad(option) {
			let _this = this;
			_this.type = option.type || 0;
			if (_this.type == 1) {
				_this.id = option.id || '';
				_this.header = option.header ? decodeURIComponent(option.header) : '新建付款';
				_this.getData();
			} else {
				_this.purchaseNo = option.num;
				_this.proceedsName = decodeURIComponent(option.name);
			}

		},
		methods: {
			async getData() {
				let _this = this;
				let res = await $getPaymentId(_this.id);
				_this.purchaseNo = res.data.purchaseNo;
				_this.payType = res.data.payType;
				_this.account = res.data.account;
				_this.expendTime = res.data.paymentDate;
				_this.amount = res.data.amount;
				_this.proceedsName = res.data.supplierName;
				_this.remark = res.data.remarks;

			},
			// 确定
			paymentBut() {
				let _this = this;
				if (!_this.proceedsName) {
					_this.$api.msg('收款方不能为空');
					return
				}

				if (!_this.amount) {
					_this.$api.msg('付款金额不能为空！');
					return
				}
				let data = {};
				data.purchaseNo = _this.purchaseNo;
				data.payType = _this.payType;
				data.account = _this.account;
				data.paymentDate = _this.expendTime;
				data.amount = _this.amount;
				data.supplierName = _this.proceedsName;
				data.remarks = _this.remark;

				if (_this.type == 1) {
					$putPayment(_this.id, data).then(res => {
						_this.$api.msg('修改成功');
						setTimeout(() => {
							_this.$navto.navBack();
						}, 500)
					})
				} else {
					$postPayment(data).then(res => {
						_this.$api.msg('添加成功');
						setTimeout(() => {
							_this.$navto.navClose('pages/details/payment', {
								id: res.data.id
							});
						}, 500)
					})
				}


			},
			// 支出日期
			expendChange(date) {
				this.expendTime = date;
			},
		}
	}
</script>

<style lang="scss">

</style>
