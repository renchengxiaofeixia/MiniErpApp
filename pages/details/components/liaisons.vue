<template>
	<view>
		<view class="head bg-green">
			<view class="name white">{{list.supplierName}}</view>
			<view class="personal">
				<view class="personal-text">
					<view class="part">
						联系人
					</view>
					<view class="white">
						{{list.contacterName}}
					</view>
				</view>
				<view class="personal-text">
					<view class="dial">
						<text class="iconfont icon-huchudianhuatianchong green"></text>
						<view class="green" @click="$api.dialPhone(list.mobile)">
							呼叫
						</view>
					</view>
				</view>
				<view class="personal-text">
					<view class="part">
						联系电话
					</view>
					<view class="white">
						{{list.mobile}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: Object
		},
		data() {
			return {
		
			}
		},
		onLoad() {
		
		},
		methods: {
		
		
		}
	}
</script>

<style lang="scss">
	.head {
		.name {
			text-align: center;
			padding: 20rpx 0;
			font-size: 30rpx;
		}

		.personal {
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			background-color: #409d70;
			text-align: center;
			padding: 14rpx 0;
			margin-top: 68rpx;
			position: relative;

			.personal-text {
				flex: 1;

			}

			.part {
				color: #72c79b;
			}

			.dial {
				position: absolute;
				bottom: 20rpx;
				left: 0;
				right: 0;
				margin: auto;
				background-color: #fff;
				padding: 30rpx 0;
				width: 140rpx;
				border-radius: 50%;
				font-size: 24rpx;

				.iconfont {
					font-size: 44rpx;
					margin-bottom: 4rpx;
				}
			}
		}
	}
</style>
