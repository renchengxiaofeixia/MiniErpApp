<template>
	<view class="sliding">
		<block v-for="(item,index) in toggle" :key="index">
			<view class="switch" :class="{checked: index == tabIndex}" @click="slideshow(item)">
				{{item.name}}
			</view>
		</block>

	</view>
</template>

<script>
	export default {
		props: {
			toggle: Array,
			tabIndex: Number
		},
		data() {
			return {


			}
		},
		onLoad() {

		},
		methods: {
			slideshow(item) {
				this.$emit("slideshow", item)
			}
		}
	}
</script>

<style lang="scss">
	.sliding {
		display: flex;
		align-items: center;
		margin-top: 20rpx;
		background-color: #fff;
		text-align: center;
		border-top: 1rpx solid #ccc;
		border-bottom: 1rpx solid #ccc;
		padding: 20rpx 0;

		.switch {
			flex: 1;
			border-right: 1rpx solid #eee;
			height: 40rpx;

			&::last-child {
				border-right: none;
			}
		}

		.checked {
			position: relative;
			color: #54a26e;

			&::after {
				content: '';
				position: absolute;
				width: 100%;
				height: 1rpx;
				bottom: -20rpx;
				right: 0;
				background-color: #54a26e;

			}

		}

	}
</style>
