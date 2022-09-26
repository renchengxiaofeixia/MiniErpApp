<template>
	<view class="supplier">
		<headerTab :title="header"></headerTab>
		<view class="table">
			<view class="from from-new">
				<text class="title">销售日期</text>
				<view class="fill">
					<uni-datetime-picker v-model="sellDate" type="date" @change="selectSell" :clear-icon="false">
						{{sellDate}}
					</uni-datetime-picker>
				</view>
				<text class="iconfont icon-right-1-copy"></text>
			</view>

			<view class="from from-new">
				<text class="title">交货日期</text>
				<view class="fill">
					<uni-datetime-picker v-model="deliveryDate" type="date" @change="selectDelivery"
						:clear-icon="false">
						{{deliveryDate}}
					</uni-datetime-picker>
				</view>
				<text class="iconfont icon-right-1-copy"></text>
			</view>

			<view class="from from-new" @click="$navto.navto('pages/conserve/salesman')">
				<text class="title">销售员</text>
				<view class="fill">
					<text v-if="salesman">{{salesman}}</text>
					<text class="gray" v-else>选择销售员</text>
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

			<view class="from address" @click="placeLocation">

				<text class="title">交货地址</text>
				<view class="fill">
					<block v-if="address.length != 0">
						<text class="place" v-for="(item, index) in address" :key="index">{{item.name}}</text>
						<text class="place">{{residence}}</text>
					</block>
					<text v-else class="gray">选择地址</text>
				</view>
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

		<selectGoods ref="goods" @shape="accept"></selectGoods>

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
		$postOrder,
		$getOrderId,
		$getOrderGoods,
		$putOrder
	} = require('@/api/market.js'); //销售
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
				id: '',
				type: 0,
				header: '新建销售订单',
				sellDate: this.$api.dateTime("yyyy-MM-dd"), //销售日期
				deliveryDate: this.$api.dateTime("yyyy-MM-dd"), //交货日期
				remarks: '', //备注
				salesman: "", //销售员

				client: {}, //客户
				productList: [], //物品
				goods: [], //物品传递过来的数据
				warehouse: {}, //仓库
				address: [], //地址
				residence: "",

				updatedTime: "",

			}
		},
		async onLoad(option) {
			let _this = this;
			_this.id = option.id || '';
			_this.type = option.type || 0;
			_this.header = option.header ? decodeURIComponent(option.header) : '新建销售订单';
			if (_this.type == 1) {
				let res = await $getOrderId(_this.id);

				_this.sellDate = res.data.orderDate;
				_this.deliveryDate = res.data.deliveryDeadlineDate;
				_this.remarks = res.data.remarks;

				_this.warehouse.warehouseName = res.data.warehouseName;
				// 客户
				_this.client.mobile = res.data.mobile;
				_this.client.customerNo = res.data.customerNo;
				_this.client.customerName = res.data.customerName;
				_this.updatedTime = new Date(res.data.updatedTime).valueOf();
				// 销售员
				_this.salesman = res.data.orderSaleUser;
				_this.client.mobile = res.data.mobile;
				_this.client.customerNo = res.data.customerNo;
				_this.client.customerName = res.data.customerName;
				// 地址
				let address = [];

				if (res.data.deliveryCountryCode) {
					let deliveryCountry = {};
					deliveryCountry.id = res.data.deliveryCountryCode;
					deliveryCountry.name = res.data.deliveryCountryText;
					address.push(deliveryCountry);
				}
				if (res.data.deliveryProvinceCode) {
					let deliveryProvince = {};
					deliveryProvince.id = res.data.deliveryProvinceCode;
					deliveryProvince.name = res.data.deliveryProvinceText;
					address.push(deliveryProvince);
				}

				if (res.data.deliveryCityCode) {
					let deliveryCity = {};
					deliveryCity.id = res.data.deliveryCityCode;
					deliveryCity.name = res.data.deliveryCityText;
					address.push(deliveryCity);
				}

				if (res.data.deliveryDistrictCode) {
					let deliveryDistrict = {};
					deliveryDistrict.id = res.data.deliveryDistrictCode;
					deliveryDistrict.name = res.data.deliveryDistrictText;
					address.push(deliveryDistrict);
				}
				_this.address = address;
				_this.residence = res.data.deliveryAddress;

				//物品
				let prodinfos = await $getOrderGoods(_this.id);
				_this.productList = prodinfos.data;
				_this.productList.forEach(item => {
					let price = Number(item.unitPrice) * item.quantity;
					item.num = item.quantity;
					item.purchasePrice = item.unitPrice;
					item.newRemarks = item.remarks;
					item.totalPrice = price.toFixed(2);
				})

			}
			_this.$refs.goods.productList = _this.productList;
		},
		onShow() {

		},
		methods: {
			// 确定
			async clientBtn() {
				let _this = this;
				let data = {};

				data.orderDate = _this.sellDate;
				data.deliveryDeadlineDate = _this.deliveryDate;
				data.warehouseName = _this.warehouse.warehouseName;
				data.remarks = _this.remarks;


				// 地址
				_this.address.forEach((item, index) => {
					if (index == 0) {
						data.deliveryCountryCode = item.id;
						data.deliveryCountryText = item.name;
					} else if (index == 1) {
						data.deliveryProvinceCode = item.id;
						data.deliveryProvinceText = item.name;
					} else if (index == 2) {
						data.deliveryCityCode = item.id;
						data.deliveryCityText = item.name;
					} else if (index == 3) {
						data.deliveryDistrictCode = item.id;
						data.deliveryDistrictText = item.name;
					}
				})
				data.deliveryAddress = _this.residence
				// 销售
				data.orderSaleUser = _this.salesman;
				data.mobile = _this.client.mobile;
				data.customerNo = _this.client.customerNo;
				data.customerName = _this.client.customerName;

				let goods = [];
				_this.productList.forEach(item => {
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
				if (_this.type == 1) {
					let time = await $getOrderId(_this.id);
					let updatedTime = new Date(time.data.updatedTime).valueOf();
					if (_this.updatedTime != updatedTime) {
						_this.$api.showModal('修改已经过期请重新进入！').then(() => {
							_this.$navto.navtab('pages/order/index')
						});
						return;
					};
					$putOrder(_this.id, data).then((res) => {
						_this.$api.msg('修改成功！');
						setTimeout(() => {
							_this.$navto.navClose('pages/details/sell', {
								id: res.data.id,
							})
						}, 500)
					})
				} else {
					$postOrder(data).then((res) => {
						_this.$api.msg('添加成功！');
						setTimeout(() => {
							_this.$navto.navClose('pages/details/sell', {
								id: res.data.id,
							})
						}, 500)
					})
				}

			},
			// 选择仓库
			placeLocation() {
				this.$navto.navto('pages/plusForm/addAddress', {
					address: JSON.stringify(this.address),
					residence: this.residence
				});
			},
			accept(item) {
				this.productList = item;
				this.$refs.goods.productList = this.productList;
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

	.address {
		padding: 20rpx 0;
	}

	.place {
		margin-left: 10rpx;
	}
</style>
