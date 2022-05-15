<template>
	<view>
		<headerTab title="出库单详情"></headerTab>

		<view class="goods-list gray">
			<view class="goods-flex">
				<view>
					<view class="track">
						<text>调拨单号：</text>
						<text class="black"> wp002151</text>
					</view>
					<view class="track">
						<text>调入日期：</text>
						<text class="black"> wp002151</text>
					</view>
					<view class="track">
						<text>调入仓库：</text>
						<text class="black"> wp002151</text>
					</view>
					<view class="track">
						<text>调出仓库：</text>
						<text class="black"> wp002151</text>
					</view>
				</view>
			</view>
		</view>

		<productMessage></productMessage>

		<view class="table">
			<pulldown headline="基本信息">
				<view class="shove">
					<view class="track">
						<text class="gray">经办人：</text>
						<text class="black"> 110</text>
					</view>
					<view class="track">
						<text class="gray">备注：</text>
						<text class="black"> 110</text>
					</view>
				</view>
			</pulldown>
		</view>
		<operator></operator>
		<copyreader :show="compileShow" @close="handleClose()">
			<view class="operation red">
				删除
			</view>
			<view class="operation">
				复制
			</view>
		</copyreader>
		<addOrder type="2" @click="handleClose()"></addOrder>
	</view>
</template>

<script>
	import headerTab from '@/components/headerTab/index.vue';
	import pulldown from '@/components/pulldown.vue';
	import productMessage from './components/productMessage.vue';
	import operator from './components/operator.vue';
	import addOrder from '@/components/addOrder.vue';
	import copyreader from '@/components/copyreader/index.vue';
	export default {
		components: {
			headerTab,
			pulldown,
			productMessage,
			operator,
			addOrder,
			copyreader,

		},
		data() {
			return {
				compileShow: "none",
			}
		},
		onLoad() {

		},
		methods: {
			handleClose() {
				if (this.compileShow == 'none') {
					this.compileShow = 'show';
				} else {
					this.compileShow = 'hide';
					setTimeout(() => {
						this.compileShow = 'none';
					}, 200);
				}
			},
		}
	}
</script>

<style lang="scss">
	.goods-list {
		padding-top: 20rpx;

	}

	.track {
		padding-top: 10rpx;
	}

	.shove {
		padding: 20rpx 0;
	}

	.phone {
		border-radius: 50%;
		border: 1rpx solid #2ea469;
		width: 92rpx;
		text-align: center;
		color: #2ea469;
		font-size: 24rpx;
		padding: 12rpx 0;

		.iconfont {
			color: #2ea469;
			font-size: 36rpx;
		}
	}
</style>
