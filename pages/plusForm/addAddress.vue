<template>
	<view class="storage">
		<headerTab title="地址"></headerTab>
		<view class="table">
			<view class="from from-new" @click="btnClick">
				<text class="title">选择地址</text>
				<view class="fill">
					<view v-if="address.length !=0">
						<text class="city" v-for="(item,index) in address" :key="index">{{item.name}}</text>
					</view>
					<text v-else class="gray">请选择</text>
				</view>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
			<view class="from from-new">
				<text class="title">详细地址</text>
				<input type="text" placeholder="填写详细地址" class="fill" v-model="residence">
			</view>
		</view>

		<selectAddress ref='selectAddress' @selectAddress="successSelectAddress"></selectAddress>
		<footerBtn @confirm="addressBtn()"></footerBtn>
	</view>
</template>

<script>
	let {

	} = require('@/api/warehouse.js');

	import headerTab from '@/components/headerTab/index.vue';
	import addOrder from '@/components/addOrder.vue';
	import footerBtn from '@/components/footerBtn.vue';
	import selectAddress from '@/components/yixuan-selectAddress/yixuan-selectAddress.vue'
	export default {
		components: {
			headerTab,
			addOrder,
			footerBtn,
			selectAddress
		},
		data() {
			return {
				address: [],
				residence: "",
			};
		},
		onLoad(option) {
			this.address = JSON.parse(decodeURIComponent(option.address)) || [];
			this.residence = decodeURIComponent(option.residence) || "";
		},
		methods: {
			// 确定
			addressBtn() {
				let _this = this;
				if (!_this.address) {
					_this.$api.msg('请选择地址！');
					return
				}
				if (!_this.residence) {
					_this.$api.msg('详细地址不能为空！');
					return
				}
				_this.$api.prePage().$data.address = _this.address;
				_this.$api.prePage().$data.residence = _this.residence;

				this.$navto.navBack();

			},
			addition() {
				this.$navto.navto('pages/plusForm/address')
			},
			btnClick() {
				this.$refs.selectAddress.show();

				if (this.address.length != 0) {
					this.$refs.selectAddress.$data.dataList = this.address;

				}

				// console.log(this.$refs.selectAddress.$data);
			},
			successSelectAddress(address) {
				this.address = address;

			}
		}
	}
</script>

<style lang="scss">
	.city {
		margin-left: 12rpx;
	}
</style>
