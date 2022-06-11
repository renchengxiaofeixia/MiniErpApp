<template>
	<view class="supplier">
		<headerTab title="联系记录"></headerTab>
		<view class="table">
			<view class="from from-new">
				<text class="title">联系日期</text>
				<text class="fill">{{list.contactTime}}</text>
			</view>
			<view class="from from-new">
				<text class="title">下次联系</text>
				<text class="fill">{{list.nextContactTime}}</text>
			</view>
			<view class="from from-new">
				<text class="title">联系内容</text>
				<text class="fill">{{list.creator}}</text>
			</view>
		</view>

		<block v-if="list.contactImages.length !=0">
			<view class="headline">
				现场照片
			</view>
			<view class="table uploading">
				<block v-for="(item,index) in list.contactImages" :key="index">
					<image :src="item" mode="aspectFill"></image>
				</block>
			</view>
		</block>


	</view>
</template>

<script>
	let {
		$getCustomercontact
	} = require('@/api/contactrecords.js'); //客户
	import headerTab from '@/components/headerTab/index.vue';
	export default {
		components: {
			headerTab,

		},
		data() {
			return {
				list: []
			}
		},
		async onLoad(e) {
			let _this = this;
			let res = await $getCustomercontact(e.id);
			res.data.contactImages = JSON.parse(res.data.contactImages);
			_this.list = res.data
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.credit {
		width: auto !important;
		padding-right: 20rpx;
	}

	.headline {
		padding-top: 20rpx;
		margin-left: 30rpx;
	}
</style>
