<template>
	<view class="supplier">
		<headerTab title="新建销售订单"></headerTab>
		<view class="table">
			<view class="from from-new">
				<text class="title">销售日期</text>
				<view class="fill">
					<uni-datetime-picker v-model="sellDate" type="date" @change="selectSell">
						{{sellDate}}
					</uni-datetime-picker>
				</view>
				<text class="iconfont icon-right-1-copy"></text>
			</view>

			<view class="from from-new">
				<text class="title">交货日期</text>
				<view class="fill">
					<uni-datetime-picker v-model="deliveryDate" type="date" @change="selectDelivery">
						{{deliveryDate}}
					</uni-datetime-picker>
				</view>
				<text class="iconfont icon-right-1-copy"></text>
			</view>

			<view class="from from-new">
				<text class="title">销售员</text>
				<view class="fill">
					<!-- <text v-if="client.customerNo">{{client.customerNo}}</text>
					<text class="gray" v-else>选择客户</text> -->
					选择销售员
				</view>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
		</view>

		<view class="table">
			<view class="from from-new" @click="$navto.navto('pages/conserve/choiceCargo',{id:3,headline:'选择客户'})">
				<text class="title">客户</text>
				<view class="fill">
					<text v-if="client.customerNo">{{client.customerNo}}</text>
					<text class="gray" v-else>选择客户</text>
				</view>
				<text class="iconfont icon-right-1-copy"></text>
			</view>

			<view class="from from-new" @click="$navto.navto('pages/conserve/address')">
				<text class="title">交货地址</text>
				<text class="fill gray">选择地址</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
			<view class="from from-new" @click="$navto.navto('pages/conserve/warehouse')">
				<text class="title">仓库</text>
				<text class="fill">
					<text v-if="warehouse.warehouseName">{{warehouse.warehouseName}}</text>
					<text class="gray" v-else>选择仓库</text>
				</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
		</view>

		<selectGoods :list="productList" @shape="accept"></selectGoods>

		<view class="table remarks" v-if="productList.length != 0">
			<view class="from from-new">
				<text class="title">备注</text>
				<textarea placeholder="填写备注" v-model="remarks"></textarea>
			</view>
		</view>
		<footerBtn @confirm="clientBtn()"></footerBtn>
	</view>
</template>

<script>
	let {
		$postOrder
	} = require('@/api/market.js'); //采购
	import headerTab from '@/components/headerTab/index.vue';
	import selectGoods from "@/components/selectGoods.vue";
	import footerBtn from '@/components/footerBtn.vue';
	export default {
		components: {
			headerTab,
			selectGoods,
			footerBtn
		},
		data() {
			return {
				sellDate: this.$api.dateTime("yyyy-MM-dd"), //销售日期
				deliveryDate: this.$api.dateTime("yyyy-MM-dd"), //交货日期
				remarks: '', //备注

				client: {}, //客户
				productList: [], //物品
				goods: [], //物品传递过来的数据
				warehouse: {}, //仓库

			}
		},
		onLoad() {},
		onShow() {
			console.log(this.client);
		},
		methods: {
			// 确定
			clientBtn() {
				let _this = this;
				let data = {};

				data.orderDate = _this.sellDate;
				data.deliveryDeadlineDate = _this.deliveryDate;
				data.warehouseName = _this.warehouse.warehouseName;
				data.remarks = _this.remarks;
				// 交货地址
				// data.deliveryProvinceText = "string";
				// data.deliveryCityText = "string";
				// data.deliveryDistrictText = "string";
				// data.deliveryAddress = "string";
				// 销售
				// data.orderSaleUser= "";

				data.mobile = _this.client.mobile;
				data.customerNo = _this.client.customerNo;
				data.customerName = _this.client.customerName;

				let goods = [];
				_this.goods.forEach(item => {
					goods.push({
						prodNo: item.prodNo,
						prodCustomNo: item.prodCustomNo,
						prodName: item.prodName,
						prodModel: item.prodModel,
						unit: item.unit,
						unitPrice: item.purchasePrice,
						quantity: item.quantity,
						remarks: item.newRemarks,
						...item
					})
				});
				data.prodInfoDtos = goods;

				$postOrder(data).then(() => {

				})
			},
			accept(item) {
				this.goods = item;
			},
			// 销售
			selectSell(date) {
				this.sellDate = data;
			},
			// 销售		
			selectDelivery(date) {
				this.deliveryDate = data;
			}
		}
	}
</script>

<style lang="scss">
	.credit {
		width: auto !important;
		padding-right: 20rpx;
	}
</style>
