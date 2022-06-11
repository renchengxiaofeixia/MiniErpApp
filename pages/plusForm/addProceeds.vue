<template>
	<view>
		<headerTab :title="header"></headerTab>

		<view class="table">
			<view class="from from-new">
				<text class="title">收款日期</text>
				<view class="fill">
					<uni-datetime-picker v-model="receiveTime" type="date" @change="receiveChange">
						{{receiveTime}}
					</uni-datetime-picker>
				</view>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
			<view class="from from-new">
				<text class="title">付款方</text>
				<input type="text" placeholder="选择付款方(必填)" v-model="customerName" />
			</view>

			<view class="from from-new" @click="$navto.navto('pages/conserve/storage',{header:'选择支出类型',id:3})">
				<text class="title">收入类型</text>
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
				<text class="title">收款金额</text>
				<input type="text" placeholder="填写金额(必填)" v-model="amount" />
			</view>

			<view class="from from-new">
				<text class="title">备注</text>
				<input type="text" placeholder="填写备注" class="fill" v-model="remark">
			</view>
		</view>

		<footerBtn @confirm="payBut()"></footerBtn>
	</view>
</template>

<script>
	let {
		$postPay,
		$putPay,
		// $getPayId
	} = require('@/api/market.js'); //销售

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
				header: "新建收款",
				receiveTime: this.$api.dateTime("yyyy-MM-dd"),
				customerName: "", //付款人
				payType: "", //收入类型
				account: "", //资金账户
				amount: "", //收款金额
				remark: "", //备注
				orderNo: "", //单号

			};
		},
		onLoad(option) {
			let _this = this;
			_this.type = option.type || 0;
			if (_this.type == 1) {
				_this.id = option.id || '';
				_this.header = option.header ? decodeURIComponent(option.header) : '新建收款';
				_this.getData();
			} else {
				_this.orderNo = option.num;
				_this.customerName = decodeURIComponent(option.name);
			}

		},
		methods: {
			async getData() {
				let _this = this;
				let res = await $getPayId(_this.id);
				_this.orderNo = res.data.orderNo;
				_this.payType = res.data.payType;
				_this.account = res.data.account;
				// _this.receiveTime = res.data.paymentDate;
				_this.amount = res.data.amount;
				_this.customerName = res.data.customerName;
				_this.remark = res.data.remarks;

			},
			// 确定
			payBut() {
				let _this = this;
				if (!_this.customerName) {
					_this.$api.msg('收款方不能为空');
					return
				}

				if (!_this.amount) {
					_this.$api.msg('收款金额不能为空！');
					return
				}
				let data = {};

				data.orderNo = _this.orderNo;
				data.payType = _this.payType;
				data.account = _this.account;
				data.paymentDate = _this.receiveTime;
				data.amount = _this.amount;
				data.customerName = _this.customerName;
				data.customerNo = _this.customerName;
				data.remarks = _this.remark;

				if (_this.type == 1) {
					$putPay(_this.id, data).then(res => {
						_this.$api.msg('修改成功');
						setTimeout(() => {
							_this.$navto.navBack();
						}, 500)
					})
				} else {
					$postPay(data).then(res => {
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
			receiveChange(date) {
				this.receiveTime = date;
			},
		}
	}
</script>

<style lang="scss">

</style>
