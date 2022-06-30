<template>
	<view class="table">
		<uni-collapse>
			<uni-collapse-item :title="list.name" :open="true">
				<view class="goods-flex shove">
					<view>
						<view class="track">
							<text class="gray">联系人：</text>
							<text class="black">{{list.linkman}}</text>
						</view>
						<view class="track">
							<text class="gray">电话：</text>
							<text class="black">{{list.phone}}</text>
						</view>
					</view>
					<view class="phone" @click.stop="$api.dialPhone(list.phone)">
						<text class="icon-huchudianhuatianchong iconfont"></text>
						<view>呼叫</view>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Object,
				default: {}
			},
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
	.shove {
		padding: 20rpx 0;
		border-top: 1rpx solid #ccc;
	}
</style>
