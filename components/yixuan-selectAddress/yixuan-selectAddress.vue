<template>
	<view class="wrapper" v-show="isShowMask">
		<transition name="content">
			<view class="content_view" v-show="isShow">
				<view class="title_view">
					<view class="title">请选择所在地址</view>
					<view class="close_view" @click="hidden">
						<icon class="close_icon" :type="'clear'" size="26" />
					</view>
				</view>

				<view class="select_top">
					<view class="select_top_item" ref="select_top_item" v-for="(item,index) in dataList" :key="index"
						@click="select_top_item_click(index,item)">
						<text class="address_value">{{item.name}}</text>
					</view>
					<view class="indicator" :style="{ left: indicatorStyleLeft + 'px' }" ref="indicator"></view>
				</view>

				<swiper class="swiper" :current="currentIndex" @change="swiperChange">
					<swiper-item v-for="(swiper_item,swiper_index) in dataList" :key="swiper_index">
						<view class="swiper-item">
							<scroll-view class="scroll-view-item" scroll-y="true">
								<view class="address_item" v-for="(item,index) in cityAreaArray[swiper_index]"
									:key="index" @click="address_item_click(swiper_index,index,item)">
									<image v-if="selectIndexArr[swiper_index] === index" class="address_item_icon"
										src="../../static/image/gou.png" mode=""></image>
									{{item.name}}
								</view>
							</scroll-view>
						</view>
					</swiper-item>
				</swiper>

			</view>
		</transition>
		<view class="mask" @click="hidden" v-show="isShowMask"></view>
	</view>
</template>

<script>
	let {
		$getAddress
	} = require('@/api/user.js');
	export default {
		data() {
			return {
				isShow: false,
				isShowMask: false,
				dataList: [{
					name: '请选择'
				}],
				currentIndex: 0,
				cityData: {},
				cityAreaArray: [],
				selectIndexArr: [],
				indicatorStyleLeft: 16
			};
		},
		async created() {
			let res = await $getAddress(0);
			this.cityData = res.data;
			this.cityAreaArray.push(this.cityData);

		},
		mounted() {},
		methods: {
			show() {
				this.isShow = true;
				this.isShowMask = true;
			},
			hidden() {
				this.isShow = false;
				this.isShowMask = false;

			},
			async select_top_item_click(index, item) {
				if (item.id) {
					let id = index != 0 ? this.dataList[index - 1].id : 0;
					let res = await $getAddress(id);
					this.cityAreaArray.splice(index, 1, res.data);
				}
				this.currentIndex = index;
				this.$nextTick(() => {
					this.changeIndicator(index);
				});
			},
			swiperChange(event) {
				let index = event.detail.current;
				this.currentIndex = index; 
				this.changeIndicator(index);
			},
			changeIndicator(index) {
				let indicatorWidth = 30;
				const query = uni.createSelectorQuery().in(this);
				let arr = query.selectAll('.select_top_item .address_value');
				arr.fields({
					size: true,
					scrollOffset: false
				}, data => {
					let itemWidth = data[index]["width"] > 80 ? 70 : data[index]["width"];
					let itemCenterX = 10 + index * 80 + itemWidth / 2;
					let left = itemCenterX - indicatorWidth / 2;
					this.indicatorStyleLeft = left;
				}).exec();
			},
			async address_item_click(swiper_index, index, item) {
				console.log(swiper_index, index);
				let res = await $getAddress(item.id);
				this.selectIndexArr.splice(swiper_index, 5, index);
				item.id = item.id.toString();
				//判断当前是否为最下一级
				if (res.data.length != 0) { //第一级
					let currentObj = this.cityData[index];
					currentObj.city = res.data;

					this.dataList.splice(swiper_index, 5, item)
					this.dataList.splice(swiper_index + 1, 0, {
						name: '请选择'
					})
					this.cityAreaArray.splice(swiper_index + 1, 1, currentObj.city);
					setTimeout(() => {
						this.currentIndex = swiper_index + 1;
						this.changeIndicator(swiper_index + 1);
					}, 50);

				} else {
					this.dataList.splice(swiper_index, 5, item)
					this.dataList.splice(swiper_index + 1, 0)

					//选择成功返回数据
					this.$emit("selectAddress", this.dataList);
					this.$nextTick(() => {
						this.changeIndicator(swiper_index);
					})
					setTimeout(() => {
						this.isShowMask = false;
						this.isShow = false;
					}, 100);
				}


			}
		},
	}
</script>

<style lang="scss">
	// 不换行
	@mixin no-wrap() {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.wrapper {
		z-index: 1999;
		position: absolute;
		top: -44px;
		left: 0;
		bottom: 0;
		right: 0;

		.content_view {
			z-index: 999;
			background: white;
			position: absolute;
			height: 80%;
			left: 0;
			bottom: 0;
			right: 0;
			border-top-left-radius: 20px;
			border-top-right-radius: 20px;

			.title_view {
				height: 12%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 $uni-spacing-row-sm;

				.title {
					font-size: uni-font-size-sm;
				}

				.close_view {
					height: 60px;
					width: 60px;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			.select_top {
				height: 8%;
				display: flex;
				justify-content: start;
				align-items: center;
				padding: 10px;
				position: relative;
				box-sizing: border-box;

				.select_top_item {
					width: 80px;
					font-size: 14px;
					@include no-wrap();
				}

				.indicator {
					position: absolute;
					width: 30px;
					height: 2px;
					background: $uni-color-error;
					left: 16px;
					bottom: 0;
					transition: left 0.5s ease;
				}
			}

			.swiper {
				height: 80%;
				position: relative;
				left: 0;
				top: 0;
				bottom: 0;
				right: 0;

				.swiper-item {
					height: 100%;

					.scroll-view-item {
						height: 100%;
						padding: 0 10px;

						.address_item {
							padding: 5px 0;
							font-size: 14px;
							display: flex;
							align-items: center;

							.address_item_icon {
								width: 20px;
								height: 20px;
								margin-right: 10px;
							}
						}
					}
				}
			}
		}

		.mask {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background: $uni-text-color-grey;
			opacity: 0.7;
		}
	}

	.content-enter {
		transform: translateY(100%);
	}

	.content-enter-to {
		transform: translateY(0%);
	}

	.content-enter-active {
		transition: transform 0.5s;
	}

	.content-leave {
		transform: translateY(0%);
	}

	.content-leave-to {
		transform: translateY(100%);
	}

	.content-leave-active {
		transition: transform 0.5s;
	}
</style>
