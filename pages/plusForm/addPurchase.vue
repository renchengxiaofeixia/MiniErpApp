<template>
	<view class="supplier">
		<headerTab :title="header"></headerTab>
		<view class="table">
			<view class="from from-new">
				<text class="title">采购日期</text>
				<view class="fill">
					<uni-datetime-picker v-model="purchaseDate" type="date" @change="selectPurchase">
						{{purchaseDate}}
					</uni-datetime-picker>
				</view>
				<text class="iconfont icon-right-1-copy"></text>
			</view>

			<view class="from from-new">
				<text class="title">交付日期</text>
				<view class="fill">
					<uni-datetime-picker v-model="deliveryDate" type="date" @change="selectDelivery">
						{{deliveryDate}}
					</uni-datetime-picker>
				</view>
				<text class="iconfont icon-right-1-copy"></text>
			</view>

			<view class="from from-new" @click="$navto.navto('pages/address/choiceCargo',{id:2,headline:'选择供应商'})">
				<text class="title">供应商</text>
				<text class="fill">
					<text v-if="supplier.supplierName">{{supplier.supplierName}}</text>
					<text class="gray" v-else>选择供应商(必填)</text>
				</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
		</view>

		<selectGoods :list="productList" @shape="accept" @appoint="appoint" :meetion="arrange"></selectGoods>

		<footerBtn @confirm="purchaseBnt()"></footerBtn>
	</view>
</template>

<script>
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
				header: '新建采购订单',
				purchaseDate: this.$api.currentTime(),
				deliveryDate: this.$api.currentTime(),
				supplier: {}, //接收供应商数据
				productList: [], //接收物品数据
				goods: [], //物品传递过来的数据
				arrange: {}, //相关约定传递过来的数据
			}
		},
		onLoad(option) {
			let _this = this;
			_this.id = option.id ? option.id : '';
			_this.type = option.type ? option.type : 0;
			_this.header = option.header ? decodeURIComponent(option.header) : '新建采购订单';

			if (_this.type == 1) {
				_this.$request.get('purchase/' + _this.id).then(res => {
					_this.purchaseDate = res.data.purchaseOrderDate;
					_this.deliveryDate = res.data.deliveryDeadlineDate;
					// 供应商
					_this.supplier.mobile = res.data.mobile;
					_this.supplier.supplierNo = res.data.supplierNo;
					_this.supplier.supplierName = res.data.supplierName;
					_this.supplier.supplierContacterName = res.data.supplierContacterName;
					// 相关约定
					_this.arrange.remarks = res.data.remarks;
					_this.arrange.settle = res.data.settlementMode;


				})
				//物品
				_this.$request.get('purchase/prodinfos/' + _this.id).then(res => {
					_this.productList = res.data;
					_this.productList.forEach(item => {
						let price = Number(item.unitPrice) * item.quantity;
						item.num = item.quantity;
						item.purchasePrice = item.unitPrice;
						item.newRemarks = item.remarks;
						item.totalPrice = price.toFixed(2);
					})
				})
			}
		},
		onShow() {
			console.log(this.supplier, '供应商');
			console.log(this.productList);
		},
		methods: {
			// 销售日期选择
			selectPurchase(date) {
				this.purchaseDate = date;
			},
			// 交货日期选择
			selectDelivery(date) {
				this.deliveryDate = date;
			},
			accept(item) {
				this.goods = item;
			},
			appoint(item) {
				this.arrange = item;
			},
			// 确定
			purchaseBnt() {
				let _this = this;
				let purchase = new Date(this.purchaseDate).valueOf();
				let elivery = new Date(this.deliveryDate).valueOf();
				if (purchase > elivery) {
					_this.$api.msg('交付日期不得晚于采购日期', 2000);
					return
				}

				if (!_this.supplier.supplierNo) {
					_this.$api.msg('请选择供应商！');
					return
				}

				if (_this.goods.length == 0) {
					_this.$api.msg('请选择物品！');
					return
				}

				let data = {
					// purchaseNo: "",
					// billCustomNo: "", 
					purchaseOrderDate: _this.purchaseDate,
					deliveryDeadlineDate: _this.deliveryDate,
					mobile: _this.supplier.mobile,
					supplierNo: _this.supplier.supplierNo,
					supplierName: _this.supplier.supplierName,
					supplierContacterName: _this.supplier.supplierContacterName,
					remarks: _this.arrange.remarks,
					settlementMode: _this.arrange.settle,
					prodInfoDtos: _this.goods
				};
				if (_this.type == 1) {
					_this.$request.put('purchase/' + _this.id, data).then(res => {
						// _this.$api.msg('修改成功！');
						// setTimeout(function() {
						// 	_this.$navto.navBack();
						// }, 500)
					})
				} else {
					_this.$request.post('purchase', data).then(res => {
						_this.$api.msg('创建成功！');
						setTimeout(function() {
							_this.$navto.navBack();
						}, 500)
					})
				}

			}
		}
	}
</script>

<style lang="scss">
</style>
