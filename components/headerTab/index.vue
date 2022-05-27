<template>
	<view class="header" :style="{height:height}">
		<view class="header-bar" :style="{height:height}">
			<view class="header-tab" :style="{'margin-top': marginTop}" v-if="scrollTab.length != 0">
				<view class="header-center">
					<block v-for="(item,index) in scrollTab" :key="index">
						<text @click="handover(item,index)" :class="{selector: index==tab}"
							:style="{padding: gauge}">{{item.text}}</text>
					</block>
				</view>
			</view>
			<view class="header-fixed" :style="{'margin-top': marginTop}" v-if="title != ''">
				<text class="iconfont icon-fanhui" @click="$navto.navBack(back)"></text>
				<text class="header-tilte">{{title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			scrollTab: Array,
			title: String,
			tab: {
				type: Number,
				default: 0
			},
			record: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				back: ''
			};
		},
		created() {
			// 记录进入多少次该页面
			if (this.record) {
				let _back = uni.getStorageSync('_back') || 1;
				_back += 1;
				uni.setStorageSync('_back', _back);
				this.back = _back;
			}

		},
		computed: {
			height() {
				const {
					platform,
					statusBarHeight
				} = uni.getSystemInfoSync()
				let height = statusBarHeight + 4 //ios 24px
				if (platform.toLowerCase() == "android") {
					height += 4
				}
				return height + 38 + "px"
			},
			marginTop() {
				const {
					platform,
					statusBarHeight
				} = uni.getSystemInfoSync()
				let height = statusBarHeight + 4
				if (platform.toLowerCase() == "android") {
					height += 4
				}
				return height + "px"
			},
			gauge() {
				let sum = this.scrollTab.length * 10;
				let padding = '10rpx ' + (60 - sum) + 'rpx'
				return padding
			}

		},
		mounted() {},
		methods: {
			handover(item, index) {
				this.$emit("tabKey", item)
			},
			conduct_() {

			}
		}
	}
</script>

<style lang="scss">
	.header {
		width: 100%;
		box-sizing: border-box;

		.header-bar {
			width: 100%;
			position: fixed;
			top: 0;
			box-sizing: border-box;
			background-color: $uni-color-success;
			z-index: 99;

			.header-tab {
				display: flex;
				justify-content: center;

				.header-center {
					border-radius: 10rpx;
					border: 1rpx solid #8aad86;
					height: 55rpx;
					line-height: 55rpx;
					color: $uni-text-color-inverse;

					text {
						padding: 10rpx 30rpx;
						white-space: nowrap;

					}

					.selector {
						background-color: #fff;
						color: #4d996d;
						border-radius: 10rpx;
					}
				}

			}

			.header-fixed {
				display: flex;
				align-items: center;
				color: #fff;
				justify-content: space-between;
				margin-left: 30rpx;
				width: 690rpx;

				.iconfont {
					font-size: 38rpx;
				}

				.header-tilte {
					font-size: 30rpx;
					margin: auto;
				}
			}

		}
	}
</style>
