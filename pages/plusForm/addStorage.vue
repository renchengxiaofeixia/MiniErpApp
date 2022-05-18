<template>
	<view class="">
		<headerTab title="新建入库单"></headerTab>

		<pulldown headline="入库日期" title="2022-5-11"></pulldown>
		<pulldown headline="仓库" title="本地"></pulldown>

		<pulldown headline="库存状况">
			<stateBar
				:list="[{monicker: '采购入库',id: 1}, {monicker: '销售退货',id: 2}, {monicker: '生产入库',id: 3}, {monicker: '其他入库',id: 4}]"
				breadth='20%' @switch="switchover">
			</stateBar>
		</pulldown>
		<view class="table" v-if="indexes == 1">
			<view class="from from-new">
				<text class="title">供应商</text>
				<text class="fill gray">选择供应商(必填)</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
		</view>
		<view class="table" v-if="indexes == 2">
			<view class="from from-new">
				<text class="title">客户</text>
				<text class="fill gray">选择客户</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
		</view>

		<view class="table" v-if="indexes == 3">
			<view class="from from-new" @click="$navto.navto('pages/address/storage',{title:'选择生产部门',id:1})">
				<text class="title">生产部门</text>
					<text class="fill gray">选择生产部门</text>
					<text class="iconfont icon-right-1-copy"></text>
			</view>

			<view class="from from-new" @click="$navto.navto('pages/address/storage',{title:'选择生产人',id:1})">
				<text class="title">生产人</text>
				<text class="fill gray">选择生产人</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
		</view>

		<view class="table" v-if="indexes == 4">
			<view class="from from-new">
				<text class="title">入库方</text>
				<input type="text" placeholder="填写入库方" class="fill">
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
	import pulldown from "@/components/pulldown.vue"
	import stateBar from "@/components/stateBar.vue"
	import selectGoods from "@/components/selectGoods.vue"

	export default {
		components: {
			headerTab,
			pulldown,
			stateBar,
			selectGoods

		},
		data() {
			return {
				indexes: 1,
			}
		},
		onLoad(e) {

		},
		methods: {
			switchover(index) {
				this.indexes = index + 1
			}
		}
	}
</script>

<style lang="scss">
</style>
