<template>
	<view class="supplier">
		<headerTab :title="header"></headerTab>

		<view class="table">
			<view class="from from-new">
				<text class="title">客户名称</text>
				<input type="text" placeholder="填写客户名称 (必填)" class="fill" v-model="customerNo">
			</view>
		</view>

		<view class="table">
			<view class="from from-new">
				<text class="title">联系人</text>
				<input type="text" placeholder="填写/导入联系人 (必填)" class="fill" v-model="customerName">
				<text class="iconfont icon-igw-l-user-2"></text>
			</view>
			<view class="from from-new">
				<text class="title">手机</text>
				<input type="text" placeholder="填写填写联系电话 (必填)" class="fill" v-model="mobile">
			</view>
		</view>

		<view class="table">
			<view class="from from-new" @click="$navto.navto('pages/conserve/storage',{header:'跟进状态',id:2})">
				<text class="title">跟进状态</text>
				<text class="fill gray" v-if="contactStatus == ''">选择跟进状态</text>
				<text class="fill" v-else>{{contactStatus}}</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
		</view>

		<view class="table remarks">
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
		$getClientId,
		$postClient,
		$putClient
	} = require('@/api/client.js'); //客户
	import headerTab from '@/components/headerTab/index.vue';
	import footerBtn from '@/components/footerBtn.vue';
	export default {
		components: {
			headerTab,
			footerBtn
		},
		data() {
			return {
				header: '新建客户', //表头
				id: '',
				type: 0, // 0 创建 1是修改
				customerNo: "", //客户名称
				customerName: "", //联系人
				mobile: "", //电话
				remarks: "", //备注
				contactStatus: "", //跟进状态
				updatedTime: ""
			}
		},
		async onLoad(option) {
			let _this = this;
			_this.id = option.id ? option.id : '';
			_this.type = option.type ? option.type : 0;
			_this.header = option.header ? decodeURIComponent(option.header) : '新建客户';

			if (_this.type == 1) {
				let res = await $getClientId(_this.id)
				let data = res.data;
				_this.customerNo = data.customerNo;
				_this.customerName = data.customerName;
				_this.mobile = data.mobile;
				_this.remarks = data.remarks;
				_this.contactStatus = data.contactStatus;

				_this.updatedTime = new Date(data.updatedTime).valueOf()

			}
		},
		methods: {

			async clientBtn() {
				let _this = this;
				if (!_this.customerNo) {
					_this.$api.msg('客户名称不能为空！')
					return
				}

				if (!_this.customerName) {
					_this.$api.msg('联系人不能为空！')
					return
				}

				if (!_this.mobile) {
					_this.$api.msg('手机号不能为空！')
					return
				}

				let data = {
					customerNo: _this.customerNo,
					customerName: _this.customerName,
					mobile: _this.mobile,
					remarks: _this.remarks,
					contactStatus: _this.contactStatus
				}
				if (_this.type == 1) {
					let time = await $getClientId(_this.id);
					let updatedTime = new Date(time.data.updatedTime).valueOf();

					if (_this.updatedTime != updatedTime) {
						_this.$api.showModal('修改已经过期请重新进入！').then(() => {
							_this.$navto.navtab('pages/order/index')
						});
						return;
					};
					$putClient(_this.id, data).then(res => {
						setTimeout(() => {
							_this.$navto.navClose('pages/details/client', {
								id: res.data.id
							});
						}, 500)
						_this.$api.msg('修改成功')
					}).catch(error => {
						_this.$api.msg(error.data);
					})

				} else {
					$postClient(data).then(res => {
						setTimeout(() => {
							_this.$navto.navClose('pages/details/client', {
								id: res.data.id
							});
						}, 500)
						_this.$api.msg('新建成功')
					}).catch(error => {
						_this.$api.msg(error.data);
					})
				}
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
