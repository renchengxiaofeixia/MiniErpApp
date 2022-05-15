<template>
	<view class="supplier">
		<headerTab title="新建供应商"></headerTab>

		<view class="table">
			<view class="from from-new">
				<text class="title">供应商名称</text>
				<input type="text" placeholder="填写供应商名称 (必填)" class="fill">
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

		}
	}
</script>

<style lang="scss">

</style>
