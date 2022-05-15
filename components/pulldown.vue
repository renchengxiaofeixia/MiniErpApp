<template>
	<view class="pulldown" @click="navigation()">
		<view class="headline" @click="close">
			<text class="headline-text" :style="{'font-size': size}">
				{{headline}}
			</text>
			<text class="title">{{title}}</text>
			<view>
				<text class="gray detail">{{detail}}</text>
				<text class="iconfont icon-right-1-copy" v-if="title"></text>
				<text class="iconfont icon-shangyi" v-else-if="spread"></text>
				<text class="iconfont icon-down-1-copy" v-else></text>
			</view>
		</view>
		<view class="content" v-if="spread">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			headline: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			url: {
				type: String,
				default: ''
			},
			size: {
				type: String,
				default: '28rpx'
			},
			detail: {
				type: String,
				default: ''
			},
			switch:{
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				spread:  this.switch
			};
		},
		methods: {
			close() {
				if (this.title) {
					return
				}
				this.spread = !this.spread;
			},
			navigation() {
				if (!this.url) {
					return
				}
				uni.navigateTo({
					url: this.url
				});
			}
		}
	}
</script>

<style lang="scss">
	.pulldown {
		padding: 0 20rpx;
		background-color: #fff;

		.headline {
			padding: 18rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.iconfont {
				color: #999;
				font-size: 36rpx;
				font-weight: 600;
			}

			.title {
				text-align: left;
				flex: 1;
				margin-left: 40rpx;
				font-size: 24rpx;
			}

			.detail {
				margin-right: 10rpx;
			}
		}

		.content {
			border-top: 1rpx solid #eee;
			background-color: #fff;
		}
	}
</style>
