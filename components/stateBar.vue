<template>
	<view class="fold-flex">
		<block v-for="(item,index) in list" :key="index">
			<text class="fold-text" :class="{'fold-selected': index == option }" :style="{width: breadth}"
				@click="switchover(item)">{{item.monicker}}</text>
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array,
			breadth: {
				type: String,
				default: '32%'
			},
		},
		computed: {

		},
		data() {
			return {
				option: 0
			};
		},
		methods: {
			switchover(item) {
				this.option =item.id;
				this.$emit("switch", item);
			}
		}
	}
</script>

<style lang="scss">
	.fold-flex {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding-bottom: 20rpx;
		padding-top: 10rpx;

		.fold-text {
			border: 1rpx solid #ccc;
			color: #999;
			padding: 14rpx 0;
			text-align: center;
			border-radius: 10rpx;
			margin-right: 10rpx;
			margin-top: 10rpx;


		}

		.fold-selected {
			background-color: #2ea469;
			color: #fff;
		}

	}
</style>
