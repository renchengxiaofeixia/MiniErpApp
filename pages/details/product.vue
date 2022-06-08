<template>
	<view>
		<headerTab title="物品详情" :record="true"></headerTab>
		<view class="commodity">
			<view class="goods-list gray">
				<view class="goods-flex gauge">
					<view class="name black">
						{{list.prodName}}
					</view>
					<view class="green">
						<text>0</text>
						<text>{{list.unit}}</text>
					</view>
					<!--<view class="red">
						-2件
					</view> -->
				</view>
				<view class="goods-flex">
					<view class="track">
						<text>物品编号：</text>
						<text>{{list.prodNo}}</text>
					</view>
					<!-- <view class="red">
						低于下限
					</view> -->
				</view>

				<view class="goods-flex">
					<view>
						<view class="track">
							<text>型号：</text> {{list.prodModel}}
						</view>
						<view class="track">
							<text>品牌：</text> {{list.prodBrand}}
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
							<view class="from">
								<text class="title gray" style="padding: 10upx 0;">物品图片</text>
								<view class="fill uploading">
									<block v-for="(item,index) in list.prodImage" :key="index">
										<image :src="item" mode="aspectFill"></image>
									</block>
								</view>
							</view>
							<view class="from from-details">
								<text class="title gray">采购价</text>
								<text class="fill"> ￥{{list.purchasePrice}}</text>
							</view>
							<view class="from from-details">
								<text class="title gray">销售价</text>
								<text class="fill"> ￥{{list.salePrice}}</text>
							</view>
							<view class="from from-details">
								<text class="title gray">所属类目</text>
								<text class="fill">{{list.catCode}}</text>
							</view>

							<view class="from from-details">
								<text class="title gray">备注</text>
								<text class="fill">{{list.remarks}}</text>
							</view>
						</view>
						<operator :list="operator"></operator>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item ">
						<view class="table">
							<view class="from from-details">
								<text class="title gray">库存上限</text>
								<text class="fill"> {{list.upperQuantity}}</text>
							</view>
							<view class="from from-details">
								<text class="title gray">库存下限</text>
								<text class="fill"> {{list.lowerQuantity}}</text>
							</view>
							<view class="from from-details">
								<text class="title gray">本地</text>
								<text class="fill"></text>
							</view>
							<view class="from from-details">
								<text class="title gray">仓库</text>
								<text class="fill"></text>
							</view>
						</view>

						<view class="table">
							<view class="from from-details">
								<text class="title gray">销售占用量</text>
								<text class="fill"></text>
							</view>
							<view class="from from-details">
								<text class="title gray">采购在途量</text>
								<text class="fill"></text>
							</view>
							<view class="from from-details">
								<text class="title gray">当前可用量</text>
								<text class="fill"></text>
							</view>
						</view>

					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<dataGrid url="pages/details/supplier" :list="supplierList" :date="false" tab="2" :hide="false">
						</dataGrid>
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
			<view class="operation" hover-class="checkActive"
				@click="$navto.navto('pages/plusForm/addGoods',{id:id,type:1,header: '修改物品'})">
				修改
			</view>
			<view class="operation red" hover-class="checkActive" @click="cutproduct()">
				删除
			</view>
		</copyreader>
		<addOrder type="2" @click="handleClose()"></addOrder>
	</view>
</template>

<script>
	let {
		$getProductId,
		$delProduct
	} = require('@/api/product.js'); //物品

	let {
		$goodsSupplier
	} = require('@/api/supplier.js'); //供应商

	import headerTab from '@/components/headerTab/index.vue';
	import slidingBlock from './components/slidingBlock.vue';
	import operator from './components/operator.vue';
	import addOrder from '@/components/addOrder.vue';
	import copyreader from '@/components/copyreader/index.vue';
	import dataGrid from '@/components/dataGrid/index.vue';
	export default {
		components: {
			headerTab,
			slidingBlock,
			addOrder,
			copyreader,
			operator,
			dataGrid,
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
					name: "可供供应商",
					id: 2
				}, {
					name: "采购记录",
					id: 3
				}],
				current: 0,
				compileShow: "none",
				id: Number,
				list: {},
				operator: {},
				supplierList: [],
			}
		},
		onLoad(option) {
			this.id = option.id;

		},
		onShow() {
			this.getData();
		},
		methods: {
			async getData() {
				let _this = this;
				let res = await $getProductId(_this.id);
				let data = res.data;

				let operator = {};
				_this.list = res.data;
				operator.createTime = data.createTime;
				operator.creator = data.creator;
				operator.updatedTime = data.updatedTime;
				operator.updator = data.updator;
				_this.operator = operator;

				let supplier = await $goodsSupplier(_this.id);
				_this.supplierList = supplier.data;

			},
			cutproduct() {
				let _this = this;

				_this.$api.showModal('确定要删除物品').then(() => {
					$delProduct(_this.id);
					setTimeout(() => {
						_this.$navto.navtab('pages/message/index')
					}, 500)
					_this.$api.msg('删除成功')

				});

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
