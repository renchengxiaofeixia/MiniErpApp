<template>
	<view class="">
		<headerTab title="客户详情"></headerTab>

		<liaisons></liaisons>
		<slidingBlock :toggle="toggle" :tabIndex="current" @slideshow="slideshow"></slidingBlock>

		<view class="slide">
			<swiper class="swiper" :current="current" @change="slidingBlock">
				<swiper-item>
					<view class="swiper-item">
						<view class="table">
							<view class="from from-details">
								<text class="title gray">跟进状态</text>
								<text class="fill">成交</text>
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
					<view class="swiper-item">
						<view class="table record">
							<view class="goods-flex ">
								<view>
									<text class="gray date">联系日期：</text>
									<text class="">2022-5-11</text>
								</view>
								<view>
									<text class="gray date">下次联系时间：</text>
									<text class="">2022-5-11</text>
								</view>
							</view>
							<view class="content">
								你好
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<view class="header gray">
							2022-05-05
						</view>

						<view class="table">
							<view class="from diary goods-flex">
								<text class="title black">供应商</text>
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
			<view class="operation" hover-class="checkActive" @click="$navto.navto('pages/plusForm/addCustomer')">
				修改
			</view>
			<view class="operation red" hover-class="checkActive">
				删除
			</view>
			<view class="operation" hover-class="checkActive">
				隐藏
			</view>
			<view class="operation" hover-class="checkActive" >
				新建联系记录
			</view>
		</copyreader>
		<addOrder type="2" @click="handleClose()"></addOrder>

	</view>
</template>

<script>
	import headerTab from '@/components/headerTab/index.vue';
	import slidingBlock from './components/slidingBlock.vue';
	import operator from './components/operator.vue';
	import liaisons from './components/liaisons.vue';
	import addOrder from '@/components/addOrder.vue';
	import copyreader from '@/components/copyreader/index.vue';
	export default {
		components: {
			headerTab,
			slidingBlock,
			addOrder,
			copyreader,
			operator,
			liaisons
		},
		data() {
			return {
				toggle: [{
					name: "基本信息",
					id: 0
				}, {
					name: "联系记录",
					id: 1
				}, {
					name: "销售记录",
					id: 2
				}],
				current: 0,
				title: '',
				compileShow: "none",

			}
		},
		onLoad(e) {
			this.title = decodeURIComponent(e.title)
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
			slideshow(e) {
				this.current = e.id;
			},
			slidingBlock(e) {
				this.current = e.detail.current;
			}
		}
	}
</script>

<style lang="scss">
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

			.record {
				padding: 14rpx 0;

				.content {
					margin-left: 20rpx;
					margin-top: 10rpx;
				}

				.date {
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
