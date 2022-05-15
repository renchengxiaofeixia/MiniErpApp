<template>
	<view class="storage">
		<headerTab :title="title"></headerTab>
		<view class="storage-piece">
			<text>件</text>
			<text class="icon-shenglvehao iconfont" @click="handleClose()" v-if="id == 2"></text>
		</view>

		<copyreader :show="compileShow" @close="handleClose()">
			<view class="operation" @touchstart="touch()" @click="amend()">
				修改
			</view>
			<view class="operation red">
				删除
			</view>
		</copyreader>
		<block v-if="id != 3">
			<addOrder type="3" @click="append()"></addOrder>
		</block>
		<addPopup @close="append" :show="isShow" title="添加类目"></addPopup>
	</view>
</template>

<script>
	import headerTab from '@/components/headerTab/index.vue';
	import addOrder from '@/components/addOrder.vue';
	import addPopup from '@/components/addPopup.vue';
	import copyreader from '@/components/copyreader/index.vue';
	export default {
		components: {
			headerTab,
			addOrder,
			addPopup,
			copyreader
		},
		data() {
			return {
				isShow: false,
				title: '',
				id: -1,
				compileShow: "none",
			};
		},
		onLoad(e) {
			this.title = decodeURIComponent(e.title);
			this.id = e.id;
		},
		methods: {
			append() {
				this.isShow = !this.isShow
			},
			handleClose() {
				if (this.compileShow == 'none') {
					this.compileShow = 'show';
				} else {
					this.compileShow = 'hide';
					setTimeout(() => {
						this.compileShow = 'none';
					}, 200);
				}
			},
		}
	}
</script>

<style lang="scss">
	.storage {
		margin-top: 20rpx;
		background-color: #fff;
		border-bottom: 1rpx solid #ccc;

		.storage-piece {
			border-top: 1rpx solid #ccc;
			padding: 14rpx 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.iconfont {
				color: #2ea469;
				background-color: #efeef3;
				padding: 4rpx 4rpx;
				border-radius: 2rpx;
			}
		}
	}
</style>
