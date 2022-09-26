<template>
	<view class="">
		<headerTab title="新建出库单"></headerTab>

		<!-- <pulldown headline="入库日期" title="2022-5-11"></pulldown>
		<pulldown headline="仓库" title="本地"></pulldown> -->
		
		<uni-collapse>
			<uni-collapse-item title="库存状况" :open="true">
					<stateBar
						:list="[{monicker: '内部领用',id: 1}, {monicker: '销售出库',id: 2}, {monicker: '退货出库',id: 3}, {monicker: '其他出库',id: 4}]"
						breadth='20%' @switch="switchover">
					</stateBar>
			</uni-collapse-item>
		</uni-collapse>

		<view class="table" v-if="indexes == 1">
			<view class="from from-new" @click="$navto.navto('pages/conserve/storage',{title:'选择领用部门',id:1})">
				<text class="title">领用部门</text>
				<text class="fill gray">选择领用部门</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>

			<view class="from from-new" @click="$navto.navto('pages/conserve/storage',{title:'选择领用人',id:1})">
				<text class="title">领用人</text>
				<text class="fill gray">选择领用人</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
		</view>

		<view class="table" v-if="indexes == 2">
			<view class="from from-new">
				<text class="title">客户</text>
				<text class="fill gray">选择客户</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>

			<view class="from from-new">
				<text class="title">交货地址</text>
				<text class="fill gray">选择地址</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
		</view>

		<view class="table" v-if="indexes == 3">
			<view class="from from-new">
				<text class="title">供应商</text>
				<text class="fill gray">选择供应商(必填)</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
		</view>

		<view class="table" v-if="indexes == 4">
			<view class="from from-new">
				<text class="title">出库对象</text>
				<input type="text" placeholder="选择客户" class="fill">
			</view>

			<view class="from from-new">
				<text class="title">联系人</text>
				<input type="text" placeholder="选择客户" class="fill">
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
	import stateBar from "@/components/stateBar.vue"
	import selectGoods from "@/components/selectGoods.vue"

	export default {
		components: {
			headerTab,
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
