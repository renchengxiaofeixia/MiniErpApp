<template>
	<view>
		<view class="headline">
			选择物品
		</view>

		<view class="product">
			<view class="product-show">
				<view class="goods-flex">
					<view class="product-btr">
						<text class="iconfont icon-guanbi1 red"></text>
						<text class="name">李三</text>
						<text class="gray">(8888)</text>
					</view>

					<view class="product-price green">
						￥3000
					</view>
				</view>
				<view class="serial gray">
					wp00001
				</view>
			</view>
			<view class="goods-flex product-back product-show">
				<view class="product-title">
					李三
				</view>
				<view class="product-sum">
					3000
				</view>
			</view>
			<view class="goods-flex product-back product-show">
				<view class="product-title">
					数量
				</view>
				<view class="product-sum">
					1
				</view>
			</view>
			<view class="goods-flex product-back product-show">
				<view class="product-title">
					备注
				</view>
				<view class="product-sum">
					<input type="text" placeholder="填写备注">
				</view>
			</view>
		</view>

		<view class="goods-add">
			<text class="icon-tianjia iconfont green"></text>
		</view>

		<view class="headline">
			相关信息
		</view>
		<view class="table product">
			<view class="from from-new">
				<text class="title">项目</text>
				<text class="fill gray">选择项目</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
			<view class="from from-new">
				<text class="title">物流公司</text>
				<text class="fill gray">选择物流公司</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
			<view class="from from-new">
				<text class="title">物流单号</text>
				<input type="text" placeholder="填写物流单号" class="fill">
				<text class="iconfont icon-right-1-copy"></text>
			</view>
			<view class="from from-new">
				<text class="title">经办人</text>
				<input type="text" placeholder="填写经办人" class="fill">
				<text class="iconfont icon-right-1-copy"></text>
			</view>
			<view class="from from-new">
				<text class="title">备注</text>
				<input type="text" placeholder="填写备注" class="fill">
				<text class="iconfont icon-right-1-copy"></text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.headline {
		padding: 16rpx 0;
		margin-left: 20rpx;
		font-size: 30rpx;


	}

	.product {
		background-color: #fff;
		margin: 0;

		.product-show {
			border-bottom: 1rpx solid #eee;
			padding: 20rpx;

			.goods-flex {
				margin: 0;

				.name {
					margin: 0 10rpx;
				}

				.product-price {
					margin-right: 14rpx;
					flex: 1;
					text-align: right;
				}
			}

			.serial {
				margin-top: 20rpx;
				margin-left: 34rpx;
			}
		}

		.product-back {
			margin-left: 34rpx;

			.product-title {
				text-align: left;
				width: 110rpx;
			}

			.product-sum {
				text-align: left;
				flex: 1;

			}

		}
	}

	.goods-add {
		background-color: #fff;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;

		.icon-tianjia {
			font-size: 44rpx;
		}

	}
</style>
