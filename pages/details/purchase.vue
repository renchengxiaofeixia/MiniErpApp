<template>
	<view class="paddingBottom">
		<headerTab title="采购订单详情"></headerTab>

		<view class="goods-list gray">
			<view class="goods-flex">
				<view>
					<view class="track">
						<text>采购单号：</text>
						<text class="black"> wp002151</text>
					</view>
					<view class="track">
						<text>采购日期：</text>
						<text class="black"> wp002151</text>
					</view>
					<view class="track">
						<text>交货日期：</text>
						<text class="black"> wp002151</text>
					</view>
				</view>
			</view>
		</view>

		<linkman></linkman>


		<view class="table">
			<view class="goods-flex shove figure">
				<view class="">
					付款
				</view>
				<view class="green">
					￥100
				</view>
			</view>
		</view>
		<view class="table">
			<view class="goods-flex shove figure">
				<view class="">
					到票
				</view>
				<view class="green">
					￥100
				</view>
			</view>
		</view>

		<view class="table">
			<pulldown headline="相关约定" size="32rpx" detail="详细" :switch="false">
				<view class="goods-flex shove" style="margin: 0;">
					<view>
						<view class="track">
							<text class="gray">交货地址：</text>
							<text class="black"> 阿三</text>
						</view>
						<view class="track">
							<text class="gray">项目：</text>
							<text class="black"> 110</text>
						</view>
						<view class="track">
							<text class="gray">结算方式：</text>
							<text class="black"> 110</text>
						</view>
						<view class="track">
							<text class="gray">仓库：</text>
							<text class="black"> 110</text>
						</view>
						<view class="track">
							<text class="gray">备注：</text>
							<text class="black"> 110</text>
						</view>

					</view>
				</view>
			</pulldown>
		</view>

		<view class="table">
			<pulldown headline="采购方" size="32rpx" detail="详细" :switch="false">
				<view class="goods-flex shove" style="margin: 0;">
					<view>
						<view class="track">
							<text class="gray">采购方：</text>
							<text class="black"> 阿三</text>
						</view>
						<view class="track">
							<text class="gray">联系人：</text>
							<text class="black"> 110</text>
						</view>
						<view class="track">
							<text class="gray">电话：</text>
							<text class="black"> 110</text>
						</view>
					</view>
				</view>
			</pulldown>
		</view>

		<view class="table">
			<pulldown headline="往来日记" size="32rpx" detail="详细" :switch="false">
				<view class="goods-flex shove" style="margin: 0;">
					<view>
						<view class="track">
							<text class="gray">销售方：</text>
							<text class="black"> 阿三</text>
						</view>
					</view>
				</view>
			</pulldown>
		</view>

		<productMessage></productMessage>
		<operator></operator>
		<copyreader :show="compileShow" @close="handleClose()">
			<view class="operation">
				分享
			</view>
			<view class="operation" @touchstart="touch()" @click="amend()">
				打印
			</view>
			<view class="operation">
				修改
			</view>
			<view class="operation red">
				删除
			</view>
			<view class="operation">
				复制
			</view>
			<view class="operation">
				入库
			</view>
			<view class="operation">
				付款
			</view>
			<view class="operation">
				到票
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
	import linkman from './components/linkman.vue';
	import addOrder from '@/components/addOrder.vue';
	import copyreader from '@/components/copyreader/index.vue';
	export default {
		components: {
			headerTab,
			pulldown,
			productMessage,
			operator,
			linkman,
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

	.figure {
		font-size: 32rpx;
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
