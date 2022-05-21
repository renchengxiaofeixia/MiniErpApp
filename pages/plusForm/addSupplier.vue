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
			}
		},
		onLoad(option) {
			let _this = this;
			_this.id = option.id ? option.id : '';
			_this.type = option.type ? option.type : 0;
			_this.header = option.header ? decodeURIComponent(option.header) : '新建供应商';

			if (_this.type == 1) {
				_this.$request.get('supplier/' + _this.id).then(res => {
					let data = res.data;
					_this.supplierNo = data.supplierNo;
					_this.supplierName = data.supplierName;
					_this.remarks = data.remarks;
					_this.contacterName = data.contacterName;
					_this.mobile = data.mobile;
				})
			}
		},
		methods: {
			supplierBnt() {
				let _this = this;
				if (_this.supplierNo) {
					_this.$api.msg('供应商编号不能为空！')
				}

				if (_this.supplierName) {
					_this.$api.msg('供应商名称不能为空！')
				}

				if (_this.contacterName) {
					_this.$api.msg('联系人不能为空！')
				}
				if (_this.mobile) {
					_this.$api.msg('手机不能为空！')
				}

				let data = {
					supplierNo: _this.supplierNo,
					supplierName: _this.supplierName,
					remarks: _this.remarks,
					contacterName: _this.contacterName,
					mobile: _this.mobile,
				}
				if (_this.type == 0) {
					_this.$request.post('supplier', data).then(res => {
						setTimeout(() => {
							_this.$navto.navBack();
						}, 1000)
						_this.$api.msg('新建成功')
					}).catch(error => {
						_this.$api.msg(error.data);
					})
				} else {
					_this.$request.put('supplier/' + _this.id, data).then(res => {
						setTimeout(() => {
							_this.$navto.navBack();
						}, 1000)
						_this.$api.msg('修改成功')
					}).catch(error => {
						_this.$api.msg(error.data);
					})
				}

			}
		}
	}
</script>

<style lang="scss">

</style>
