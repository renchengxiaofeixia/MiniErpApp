<template>
	<view class="supplier">
		<headerTab :title="header"></headerTab>

		<view class="table">
			<view class="from from-new">
				<text class="title">供应商编号</text>
				<input type="text" placeholder="填写供应商编号 (必填)" class="fill" v-model="supplierNo">
			</view>
			<view class="from from-new">
				<text class="title">供应商名称</text>
				<input type="text" placeholder="填写供应商名称 (必填)" class="fill" v-model="supplierName">
			</view>
		</view>

		<view class="table">
			<view class="from from-new">
				<text class="title">联系人</text>
				<input type="text" placeholder="填写/导入联系人(必填)" class="fill" v-model="contacterName">
				<text class="iconfont icon-igw-l-user-2"></text>
			</view>
			<view class="from from-new">
				<text class="title">手机</text>
				<input type="text" placeholder="填写填写联系电话(必填)" class="fill" v-model="mobile">
			</view>
		</view>

		<view class="table remarks">
			<view class="from from-new">
				<text class="title">备注</text>
				<textarea placeholder="填写备注" v-model="remarks"></textarea>
			</view>
		</view>

		<footerBtn @confirm="supplierBnt()"></footerBtn>
	</view>
</template>

<script>
	let {
		$getSupplierId,
		$postSupplier,
		$putSupplier
	} = require('@/api/supplier.js'); //供应商

	import headerTab from '@/components/headerTab/index.vue';
	import footerBtn from '@/components/footerBtn.vue';
	export default {
		components: {
			headerTab,
			footerBtn
		},
		data() {
			return {
				header: '新建供应商', //表头
				id: '',
				type: 0, // 0 创建 1是修改
				supplierNo: "", //供应商编号
				supplierName: "", //供应商名称
				remarks: "", //备注
				contacterName: "", //联系人
				mobile: "", //手机号
				updatedTime: ""
			}
		},
		async onLoad(option) {
			let _this = this;
			_this.id = option.id ? option.id : '';
			_this.type = option.type ? option.type : 0;
			_this.header = option.header ? decodeURIComponent(option.header) : '新建供应商';

			if (_this.type == 1) {
				let res = await $getSupplierId(_this.id);
				let data = res.data;
				_this.supplierNo = data.supplierNo;
				_this.supplierName = data.supplierName;
				_this.remarks = data.remarks;
				_this.contacterName = data.contacterName;
				_this.mobile = data.mobile;
				_this.updatedTime = new Date(data.updatedTime).valueOf()

			}
		},
		methods: {
			async supplierBnt() {
				let _this = this;
				if (!_this.supplierNo) {
					_this.$api.msg('供应商编号不能为空！')
					return
				}

				if (!_this.supplierName) {
					_this.$api.msg('供应商名称不能为空！')
					return
				}

				if (!_this.contacterName) {
					_this.$api.msg('联系人不能为空！')
					return
				}
				if (!_this.mobile) {
					_this.$api.msg('手机不能为空！')
					return
				}

				let data = {
					supplierNo: _this.supplierNo,
					supplierName: _this.supplierName,
					remarks: _this.remarks,
					contacterName: _this.contacterName,
					mobile: _this.mobile,
				}
				if (_this.type == 1) {
					let time = await $getSupplierId(_this.id);
					let updatedTime = new Date(time.data.updatedTime).valueOf();

					if (_this.updatedTime != updatedTime) {
						_this.$api.showModal('修改已经过期请重新进入！').then(() => {
							_this.$navto.navtab('pages/order/index')
						});
						return;
					};

					$putSupplier(_this.id, data).then(res => {
						setTimeout(() => {
							_this.$navto.navClose('pages/details/supplier', {
								id: res.data.id
							});
						}, 500)
						_this.$api.msg('修改成功')
					}).catch(error => {
						_this.$api.msg(error.data);
					})

				} else {
					$postSupplier(data).then(res => {
						setTimeout(() => {
							_this.$navto.navClose('pages/details/supplier', {
								id: res.data.id
							});
						}, 500)
						_this.$api.msg('新建成功')
					}).catch(error => {
						_this.$api.msg(error.data);
					});
				}

			}
		}
	}
</script>

<style lang="scss">

</style>
