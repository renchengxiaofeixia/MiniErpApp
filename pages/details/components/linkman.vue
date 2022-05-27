<template>
	<view class="table">
		<pulldown :headline="list.name" size="32rpx" detail="详细">
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
		</pulldown>
	</view>
</template>

<script>
	import pulldown from '@/components/pulldown.vue';
	export default {
		components: {
			pulldown
		},
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
	}
</style>
