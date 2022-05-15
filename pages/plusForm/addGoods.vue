<template>
	<view class="">
		<headerTab :title="'新建物品'"></headerTab>

		<view class="table">
			<view class="from from-new">
				<text class="title">物品编号</text>
				<input type="text" placeholder="填写编号,保存后不能修改 (必填)" class="fill">
			</view>
			<view class="from from-new">
				<text class="title">物品名称</text>
				<input type="text" placeholder="填写名称 (必填)" class="fill">
			</view>
		</view>
		<view class="table">
			<view class="from from-new">
				<text class="title">规格型号</text>
				<input type="text" placeholder="填写品牌" class="fill">
			</view>
			<view class="from from-new">
				<text class="title">品牌</text>
				<input type="text" placeholder="填写品牌" class="fill">
			</view>
			<view class="from from-new">
				<text class="title">制造商型号</text>
				<input type="text" placeholder="填写制造商型号" class="fill">
			</view>
			<view class="from from-new" @click="$navto.navto('pages/address/storage',{title:'选择单位',id:1})">
				<text class="title">单位</text>
				<text class="fill">件</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
			<view class="from from-new" @click="$navto.navto('pages/address/storage',{title:'选择类目',id:2})">
				<text class="title">类目</text>
				<text class="fill">其他</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
			<view class="from from-new">
				<text class="title">商品条码</text>
				<input type="text" placeholder="便于后续扫码用" class="fill">
				<text class="iconfont icon-saoma-big"></text>
			</view>
		</view>

		<view class="table">
			<view class="from from-new">
				<text class="title">物品照片</text>
				<view class="">
					上传图片
				</view>
			</view>
		</view>
		<view class="headline">
			价格信息
		</view>
		<view class="table">
			<view class="from from-new">
				<text class="title">采购价</text>
				<input type="text" placeholder="填写采购价" class="fill">
			</view>
			<view class="from from-new">
				<text class="title">销售价</text>
				<input type="text" placeholder="填写销售价" class="fill">
			</view>
		</view>

		<view class="headline">
			库存信息
		</view>
		<view class="table">
			<view class="from from-new">
				<text class="title">库存下限</text>
				<input type="text" placeholder="填写库存下限" class="fill">
			</view>
			<view class="from from-new">
				<text class="title">库存上限</text>
				<input type="text" placeholder="填写库存上限" class="fill">
			</view>
		</view>

		<view class="table">
			<view class="from from-new">
				<text class="title">备注</text>
				<input type="text" placeholder="填写备注" class="fill">
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
		methods: {}
	}
</script>

<style lang="scss">
	.headline {
		padding-top: 20rpx;
		margin-left: 30rpx;
	}
</style>
