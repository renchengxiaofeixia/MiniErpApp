<template>
	<view class="storage">
		<headerTab :title="header"></headerTab>

		<view class="storage-piece" v-for="(item,index) in list" :key="index" @click.stop="checked(item.propValue)">
			<text>{{item.propValue}}</text>
			<text class="icon-shenglvehao iconfont" @click.stop="handleClose(item)"></text>
		</view>

		<copyreader :show="compileShow" @close="handleClose()">
			<view class="operation" @click="append(2)">
				修改
			</view>
			<view class="operation red" @click="delUnit()">
				删除
			</view>
		</copyreader>
		<addOrder type="3" @click="append(1)"></addOrder>
		<addPopup @close="append(1)" :show="isShow" @confirm="addCat" :title="unitTitle" v-model="content"></addPopup>
	</view>
</template>

<script>
	let {
		$getUnit,
		$getFollowStatus,
		$postCustomprop,
		$putCustomprop,
		$delCustomprop,
		$getPayType,
		$getFinanceAccount,
		$getSettlementType
	} = require('@/api/preserve.js');

	import headerTab from '@/components/headerTab/index.vue';
	import addOrder from '@/components/addOrder.vue';
	import addPopup from '@/components/addPopup.vue';
	import copyreader from '@/components/copyreader/index.vue';
	export default {
		components: {
			headerTab,
			addOrder,
			addPopup,
			copyreader
		},
		data() {
			return {
				id: 1, //1单位 2跟进状态 3支出类型 4资金账户 5结算方式 6仓库
				header: "选择单位",
				isShow: false,
				compileShow: "none",
				list: [], //单位列表
				simple: {},
				unitTitle: '添加单位',
				content: '',
				revamp: false, //是否修改
			};
		},
		onLoad(e) {
			this.id = e.id
			this.header = decodeURIComponent(e.header);
			this.getData()
		},
		methods: {
			async getData() {
				let _this = this;
				let list
				if (_this.id == 1) {
					list = await $getUnit();
				} else if (_this.id == 2) {
					list = await $getFollowStatus();
				} else if (_this.id == 3) {
					list = await $getPayType();
				} else if (_this.id == 4) {
					list = await $getFinanceAccount();
				} else if (_this.id == 5) {
					list = await $getSettlementType();
				}
				_this.list = list.data;

			},
			// 添加
			addCat(item) {
				let _this = this;
				let data = {};
				if (_this.id == 1) {
					data = {
						module: "ProdInfo",
						propName: "Unit",
					}
				} else if (_this.id == 2) {
					data = {
						module: "Customer",
						propName: "FollowStatus",
					}
				} else if (_this.id == 3) {
					data = {
						module: "Purchase",
						propName: "PayType"
					}
				} else if (_this.id == 4) {
					data = {
						module: "Purchase",
						propName: "FinanceAccount"
					}
				} else if (_this.id == 5) {
					data = {
						module: "Purchase",
						propName: "SettlementType"
					}
				}
				data.propValue = item;
				if (!_this.revamp) {
					$postCustomprop(data).then(res => {
						_this.getData();
					});
				} else {
					$putCustomprop(_this.simple.id, data).then(res => {
						_this.getData();
					});
				}
			},
			// 删除
			delUnit() {
				let _this = this;
				_this.$api.showModal('确定要删除！').then(() => {
					$delCustomprop(_this.simple.id).then(res => {
						_this.getData();
					});
					_this.$api.msg('删除成功')
				});
			},
			// 选中
			checked(val) {
				if (this.id == 1) {
					this.$api.prePage().$data.unit = val;
				} else if (this.id == 2) {
					this.$api.prePage().$data.contactStatus = val;
				} else if (this.id == 3) {
					this.$api.prePage().$data.payType = val;
				} else if (this.id == 4) {
					this.$api.prePage().$data.account = val;
				} else if (this.id == 5) {
					this.$api.prePage().$data.appoint.settlementMode = val;
				}
				setTimeout(() => {
					this.$navto.navBack();
				}, 500)
			},
			// 弹窗
			append(top) {
				if (top == 1) {
					this.unitTitle = "添加"
				} else {
					this.content = this.simple.propValue;
					this.revamp = true
					this.unitTitle = "修改"
				}
				if (this.isShow) {
					this.simple = {};
					this.content = "";
					this.revamp = false;
				}
				this.isShow = !this.isShow
			},
			handleClose(item) {
				this.simple = item;
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
	.storage {
		margin-top: 20rpx;
		background-color: #fff;
		border-bottom: 1rpx solid #ccc;

		.storage-piece {
			border-top: 1rpx solid #ccc;
			padding: 14rpx 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.iconfont {
				color: #2ea469;
				background-color: #efeef3;
				padding: 4rpx 4rpx;
				border-radius: 2rpx;
			}
		}
	}
</style>
