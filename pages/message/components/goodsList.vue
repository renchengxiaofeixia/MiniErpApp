<template>
	<view class="commercial">
		<view class="commercial-sum">
			共2条数据
		</view>

		<block v-if="index == 1">
			<view class="goods-list gauge" @touchstart="logoTime" @touchend="loosenTime"
				:style="{'background': touch ? '#ccc':''}" @click.stop="$navto.navto('pages/details/commodity')">
				<view class="goods-flex">
					<view class="content">
						<text>李三</text>
						<text class="model gray">(000)</text>
						<text class="iconfont icon-tupian blue"></text>
					</view>
					<view class="red">
						-2件
					</view>
				</view>

				<view class="goods-flex gauge">
					<view class="gray">
						wp002151
					</view>
					<view class="red">
						低于下限
					</view>
				</view>
			</view>
		</block>

		<block v-if="index == 2">
			<view class="goods-list gauge" @touchstart="logoTime" @touchend="loosenTime"
				:style="{'background': touch ? '#ccc':''}"
				@click.stop="$navto.navto('pages/details/clientele',{title:'供应商详情'})">
				<view class="goods-flex">
					<view style="display: block;">
						<view>李三</view>
						<view class="gauge gray">联系人: 李三</view>
						<view class="phone gray">联系电话: 888</view>
					</view>
					<view class="dial">
						<text class="iconfont icon-huchudianhuatianchong"></text>
						<view>
							呼叫
						</view>
					</view>
				</view>
			</view>
		</block>

		<block v-if="index == 3">
			<view class="goods-list gauge" @touchstart="logoTime" @touchend="loosenTime"
				:style="{'background': touch ? '#ccc':''}"
				@click.stop="$navto.navto('pages/details/clientele',{title:'客户详情'})">
				<view class="goods-flex">
					<view style="display: block;">
						<view>李三</view>
						<view class="gauge gray">联系人: 李三</view>
						<view class="phone gray">联系电话: 888</view>
					</view>
					<view class="creating">
						<text class="iconfont icon-bianji"></text>
					</view>
				</view>
			</view>
		</block>

	</view>
</template>

<script>
	export default {
		props: {
			index: Number
		},
		data() {
			return {
				touch: false,
			};
		},
		methods: {
			logoTime() {
				this.touch = true;
			},
			loosenTime() {
				this.touch = false;
			}

		}
	}
</script>

<style lang="scss">
	.commercial {
		background-color: $uni-text-color-inverse;
		border-top: 1rpx solid #ccc;

		.commercial-sum {
			margin: 0 20rpx;
			padding: 14rpx 10rpx;
			color: #777;
			border-bottom: 1rpx solid #eee;
		}

		.goods-list .dial {
			border: 1rpx solid #54a26e;
			border-radius: 50%;
			width: 80rpx;
			padding: 10rpx 0;
			text-align: center;
			margin-right: 20rpx;
			background-color: #fff;
			position: relative;
			z-index: 9;
			color: #54a26e;

			.iconfont {
				color: #54a26e;
				font-size: 38rpx;
			}

			view {
				font-size: 20rpx;
			}
		}

		.goods-list .creating {
			margin-right: 20rpx;
		}

		.goods-list .creating .iconfont {
			color: #54a26e;
			font-size: 50rpx;
		}

		.goods-list .content .phone {
			padding-top: 6rpx;
		}

		.gauge {
			padding-top: 20rpx;
		}
	}
</style>
