<template>
	<view>
		<headerTab title="物品详情"></headerTab>
		<view class="commodity">
			<view class="goods-list gray">
				<view class="goods-flex gauge">
					<view class="name black">
						李三
					</view>
					<view class="red">
						-2件
					</view>
				</view>
				<view class="goods-flex">
					<view class="track">
						<text>物品编号：</text>
						<text>wp002151</text>
					</view>
					<view class="red">
						低于下限
					</view>
				</view>

				<view class="goods-flex">
					<view>
						<view class="track">
							<text>规格型号：</text> wp002151
						</view>
						<view class="track">
							<text>品牌：</text> wp002151
						</view>
						<view class="track">
							<text>制造商型号：</text> wp002151
						</view>
					</view>
				</view>

			</view>
		</view>

		<slidingBlock :toggle="toggle" :tabIndex="current" @slideshow="slideshow"></slidingBlock>
		<view class="slide">
			<swiper class="swiper" :current="current" @change="slidingBlock">
				<swiper-item>
					<view class="swiper-item">
						<view class="table">
							<view class="from from-details">
								<text class="title gray">物品图片</text>
								<view class="fill">
									选择图片
								</view>
							</view>
							<view class="from from-details">
								<text class="title gray">采购价</text>
								<text class="fill"> ￥999</text>
							</view>
							<view class="from from-details">
								<text class="title gray">销售价</text>
								<text class="fill"> ￥999</text>
							</view>
							<view class="from from-details">
								<text class="title gray">所属类目</text>
								<text class="fill"> ￥999</text>
							</view>

							<view class="from from-details">
								<text class="title gray">备注</text>
								<text class="fill">15151</text>
							</view>
						</view>
                       <operator></operator>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item ">
						<view class="table">
							<view class="from from-details">
								<text class="title gray">库存上限</text>
								<text class="fill"> ￥999</text>
							</view>
							<view class="from from-details">
								<text class="title gray">库存下限</text>
								<text class="fill"> ￥999</text>
							</view>
							<view class="from from-details">
								<text class="title gray">本地</text>
								<text class="fill"> ￥999</text>
							</view>
							<view class="from from-details">
								<text class="title gray">北京</text>
								<text class="fill"> ￥999</text>
							</view>
						</view>

						<view class="table">
							<view class="from from-details">
								<text class="title gray">销售占用量</text>
								<text class="fill"> ￥999</text>
							</view>
							<view class="from from-details">
								<text class="title gray">采购在途量</text>
								<text class="fill"> ￥999</text>
							</view>
							<view class="from from-details">
								<text class="title gray">当前可用量</text>
								<text class="fill"> ￥999</text>
							</view>
						</view>

					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						供应商
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<view class="header">
							2022-05-05
						</view>

						<view class="table">
							<view class="from diary goods-flex">
								<text class="title">供应商</text>
								<text class="green"> ￥999</text>
							</view>
							<view class="from diary gray">
								dd-262600-21626
							</view>
							<view class="from diary gray">
								￥990 x 1件
							</view>

						</view>

					</view>
				</swiper-item>
			</swiper>
		</view>
		<copyreader :show="compileShow" @close="handleClose()">
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
	import slidingBlock from './components/slidingBlock.vue';
	import operator from './components/operator.vue';
	import addOrder from '@/components/addOrder.vue';
	import copyreader from '@/components/copyreader/index.vue';
	export default {
		components: {
			headerTab,
			slidingBlock,
			addOrder,
			copyreader,
			operator
		},
		data() {
			return {
				toggle: [{
					name: "基本信息",
					id: 0
				}, {
					name: "库存信息",
					id: 1
				}, {
					name: "可供应商",
					id: 2
				}, {
					name: "采购记录",
					id: 3
				}],
				current: 0,
				compileShow: "none",
			}
		},
		onLoad() {

		},
		methods: {
			amend() {
				console.log(2);
			},
			touch() {
				console.log(1);
			},
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
			slideshow(e) {
				this.current = e.id;
			},
			slidingBlock(e) {
				this.current = e.detail.current;
			},

		}
	}
</script>

<style lang="scss">
	.commodity {
		font-size: 24rpx;

		.name {
			font-size: 26rpx;
		}

		.gauge {
			padding: 14rpx 0;
		}

		.track {
			padding-bottom: 6rpx;

		}
	}


	.swiper {
		height: 60vh;

		.swiper-item {
			height: 100%;

			.header {
				padding-left: 30rpx;
				padding-top: 20rpx;
			}

			.diary {
				padding-top: 6rpx;
				border: none;
			}
		}
	}
</style>
