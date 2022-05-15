<template>
	<view class="supplier">
		<headerTab title="新建采购订单"></headerTab>
		<view class="table">
			<view class="from from-new">
				<text class="title">销售日期</text>
				<text class="fill">2021-5-10</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
			
			<view class="from from-new">
				<text class="title">交货日期</text>
				<text class="fill">2021-5-10</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
		</view>
		<view class="table">
			<view class="from from-new">
				<text class="title">供应商</text>
				<text class="fill gray">选择供应商(必填)</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
			
			<view class="from from-new">
				<text class="title">仓库</text>
				<text class="fill gray">选择仓库</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
		</view>
		<selectGoods></selectGoods>
		<view class="newBtn">
			<button>确定</button>
		</view>
	</view>
</template>

<script>
	import headerTab from '@/components/headerTab/index.vue';
	import selectGoods from "@/components/selectGoods.vue"
	export default {
		components: {
			headerTab,
			selectGoods
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
