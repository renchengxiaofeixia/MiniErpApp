<template>
	<view class="supplier">
		<headerTab title="新建客户"></headerTab>

		<view class="table">
			<view class="from from-new">
				<text class="title">客户名称</text>
				<input type="text" placeholder="填写客户名称 (必填)" class="fill">
			</view>
		</view>

		<view class="table">
			<view class="from from-new">
				<text class="title">联系人</text>
				<input type="text" placeholder="填写/导入联系人" class="fill">
				<text class="iconfont icon-igw-l-user-2"></text>
			</view>
			<view class="from from-new">
				<text class="title">手机</text>
				<input type="text" placeholder="填写填写联系电话" class="fill">
			</view>
		</view>

		<view class="table">
			<view class="from from-new" @click="$navto.navto('pages/address/storage',{title:'选择单位',id:3})">
				<text class="title">跟进状态</text>
				<text class="fill gray">选择跟进状态</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
		</view>

		<view class="table remarks">
			<view class="from from-new">
				<text class="title">备注</text>
				<textarea placeholder="填写备注"></textarea>
			</view>
		</view>

		<view class="newBtn">
			<button>确定</button>
		</view>
	</view>
</template>

<script>
	import headerTab from '@/components/headerTab/index.vue';
	export default {
		components: {
			headerTab
		},
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			navigation(url) {
				uni.navigateTo({
					url: '/' + url
				});
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
