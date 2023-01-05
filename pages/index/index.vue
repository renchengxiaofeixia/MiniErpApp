<template>
	<view>
		<view class="header" :style="{height:height + 'px'}">
			<view class="header-flex" :style="{'padding-top': paddingTop + 'px'}">
				<button @click="login()" class="login-btn" hover-class='none'>
					<text class="iconfont icon-31wode"></text>
				</button>
				<text class="header-text">首页</text>
				<text class="header-right-space"></text>
			</view>
		</view>

		<view class="blackboard">
			<view class="transaction">
				<view class="left">
					<view class="title">
						<text>销售订单额（元）</text> <text class="iconfont icon-chakan"></text>
					</view>
					<view class="money">
						0.00
					</view>
					<view class="matter">
						待办事项:<text class="sum"> 2</text>
					</view>
				</view>

				<view class="right">
					<view class="time">
						今天
					</view>
					<view class="bargain">
						共 <text class="sum">2</text> 笔
					</view>
					<view class="pending">
						待审批:<text class="sum"> 2</text>
					</view>
				</view>
			</view>
			<view class="baffle"></view>
		</view>

		<view class="shortcut">
			<view class="headline">
				<text>快捷功能</text>
				<text class="iconfont icon-bianxie" @click="$navto.navto('pages/shortcutKey/index')"></text>
			</view>

			<view class="sudoku">

				<view class="grid">
					<image src="../../static/image/home_module_inquiry.png" mode="aspectFill"></image>
					<view class="title">
						新建物品
					</view>
				</view>
			</view>
		</view>

		<uni-drawer ref="isShow" mode="left" :width="320">
			<view class="header bg-green" :style="{height:height + 80  + 'px'}"
				@click="$navto.navto('pages/user/personal')">
				<view class="header-flex" :style="{'padding-top': paddingTop + 20 + 'px'}">
					<view class="login-img">
						<!-- <image src="../../static/image/adapter_supplier_search_result_item_phone_call.png" mode="">
							</image> -->
						<text class="iconfont icon-yonghu"></text>
					</view>
					<view class="login-text">
						<view class="login-name">
							{{user.userName}}
						</view>
					</view>
				</view>
			</view>

			<view class="" style="padding-top: 30rpx;">
				<view class="goods-flex set" hover-class="checkActive" @click="$navto.navto('pages/system/role')">
					<view class="">
						<text class="iconfont icon-yonghu"></text> 角色管理
					</view>
					<text class="iconfont icon-right-1-copy"></text>
				</view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	let app = getApp();
	export default {
		data() {
			return {
				isshow: false,
				user: app.globalData.userName,

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
				return height + 38;
			},
			paddingTop() {
				const {
					platform,
					statusBarHeight
				} = uni.getSystemInfoSync()
				let height = statusBarHeight + 8
				if (platform.toLowerCase() == "android") {
					height += 8
				}
				return height
			},
		},
		onLoad() {

		},
		onShow() {},
		methods: {
			login() {
				let _this = this;
				if (app.globalData.userLogin) {
					// _this.
					_this.showDrawer();
				} else {
					uni.showModal({
						title: '提示',
						content: '请去登入',
						success: function(res) {
							if (res.confirm) {
								_this.$navto.navto('pages/user/login')
							} else if (res.cancel) {
								// console.log('用户点击取消');
							}
						}
					});
				}
			},
			// 打开窗口
			showDrawer() {
				this.$refs.isShow.open()
			},
			// 关闭
			closeDrawer() {
				this.$refs.isShow.close()
			},
		}
	}
</script>

<style lang="scss">
	.header {
		width: 100%;
		background-color: $uni-color-success;
		position: sticky;
		top: 0;

		.header-flex {
			display: flex;

			.iconfont {
				margin-left: 40rpx;
				color: #fff;
				font-size: 48rpx;
				font-weight: 600;
			}

			.header-text {
				flex: 1;
				text-align: center;
				font-size: 30rpx;
				color: #fff;
			}
			
			.header-right-space{				
				margin-right: 80rpx;
				color: #fff;
			}

		}
	}

	.blackboard {
		background: url('@/static/image/home.png') no-repeat 0 -240rpx;
		background-size: 100%;
		padding-top: 40rpx;

		.transaction {
			width: 650rpx;
			height: 320rpx;
			background-color: #fff;
			margin: auto;
			border-radius: 20rpx;
			box-shadow: -1px -3px 20px 1px #65616169;
			display: flex;
			align-items: center;
			padding: 30rpx 30rpx 34rpx;

			.left,
			.right {
				flex: 1;
				font-size: 28rpx;
				color: #848484;
			}

			.right {
				text-align: center;
			}

			.title {
				display: flex;
				align-items: center;

				.iconfont {
					margin-left: 10rpx;
				}
			}

			.money {
				font-weight: 700;
				margin: 40rpx 0;
				font-size: 54rpx;
				color: #000;
			}

			.sum {
				font-size: 32rpx;
				color: #000;
				margin: 0 10rpx;
			}

			.time {
				text-align-last: right;
			}

			.bargain {
				margin: 50rpx 0;
			}
		}

		.baffle {
			height: 30rpx;
			width: 100%;
			background-color: #f2f2f2;
			box-shadow: 0px 6px 20px 1px #8a888830;
			;
		}
	}

	.shortcut {
		background-color: #fff;

		.headline {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			height: 80rpx;
			border-bottom: 1rpx solid #ccc;
			font-size: 28rpx;

			.iconfont {
				font-size: 32rpx;
			}

		}

		.sudoku {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding-bottom: 40rpx;

			.grid {
				font-size: 28rpx;
				color: #6b6b6b;
				text-align: center;
				width: 33%;
				margin-top: 30rpx;

				image {
					width: 60rpx;
					height: 60rpx;
				}

				.title {
					margin-top: 12rpx;
				}
			}
		}
	}

	.popup {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 99;

		.mask {
			position: fixed;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.3);
		}

		.layer {
			position: fixed;
			top: 0;
			left: 0;
			background-color: #fff;
			width: 580rpx;
			height: 100%;
			border-radius: 14rpx;

			.login-img {
				background-color: #2da66a;
				width: 120rpx;
				height: 120rpx;
				margin-left: 40rpx;
				margin-right: 30rpx;
			}

			.login-text {
				color: #fff;
				margin-top: 10rpx;
				font-size: 30rpx;
			}

			.set {
				margin: 0;
				font-size: 32rpx;
				padding: 20rpx 50rpx;

				.icon-right-1-copy {
					font-size: 36rpx;
					color: #ccc;
				}
			}
		}
	}

	/* 动画 */
	.show {
		display: block;

		.mask {
			animation: showPopup 0.3s linear both;
		}

		.layer {
			animation: showLayer 0.3s linear both;
		}
	}

	.hide {
		.mask {
			animation: hidePopup 0.4s linear both;
		}

		.layer {
			animation: hideLayer 0.4s linear both;
		}
	}

	.none {
		display: none;
	}
</style>
