<template>
	<view class="table">
		<pulldown headline="入库方" size="32rpx" detail="详细">
			<view class="goods-flex shove">
				<view>
					<view class="track">
						<text class="gray">联系人：</text>
						<text class="black"> 阿三</text>
					</view>
					<view class="track">
						<text class="gray">电话：</text>
						<text class="black"> 110</text>
					</view>
				</view>
				<view class="phone">
					<text class="icon-huchudianhuatianchong iconfont"></text>
					<view>呼叫</view>
				</view>
			</view>
		</pulldown>
	</view>
</template>

<script>
	import pulldown from '@/components/pulldown.vue';
	export default {
		components: {
			pulldown
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
	}
</style>
