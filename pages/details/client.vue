<template>
	<view class="">
		<headerTab title="客户详情" :record="true"></headerTab>

		<liaisons :list="contact"></liaisons>
		<slidingBlock :toggle="toggle" :tabIndex="current" @slideshow="slideshow"></slidingBlock>

		<view class="slide">
			<swiper class="swiper" :current="current" @change="slidingBlock">
				<swiper-item>
					<view class="swiper-item">
						<view class="table">
							<view class="from from-details">
								<text class="title gray">跟进状态</text>
								<text class="fill">成交</text>
							</view>
							<view class="from from-details">
								<text class="title gray">备注</text>
								<text class="fill">15151</text>
							</view>
						</view>
						<operator :list="operator"></operator>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<view class="table record" v-for="(item,index) in contactList" :key="index"
							@click="$navto.navto('pages/details/contactRecord',{id: item.id})">
							<view class="goods-flex ">
								<view>
									<text class="gray date">联系日期：</text>
									<text class="">{{item.contactTime}}</text>
								</view>
								<view>
									<text class="gray date">下次联系时间：</text>
									<text class="">{{item.nextContactTime}}</text>
								</view>
							</view>
							<view class="content">
								{{item.contactContent}}
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="table">
						<view class="supplier" v-for="(item,index) in recordList" :key="index">
							<view class="diary goods-flex" style="margin: 0;">
								<text class="title black">{{item.customerName}}</text>
								<text class="green"> ￥{{item.aggregateAmount}}</text>
							</view>
							<view class="diary gray">
								{{item.orderNo}}
							</view>
							<view class="diary gray">
								{{item.prodNos}}
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<copyreader :show="compileShow" @close="handleClose()">
			<view class="operation" hover-class="checkActive"
				@click="$navto.navto('pages/plusForm/addCustomer',{id: id,header: '修改客户',type:1})">
				修改
			</view>
			<view class="operation red" hover-class="checkActive" @click="clientDel">
				删除
			</view>
			<view class="operation" hover-class="checkActive"
				@click="$navto.navto('pages/plusForm/addContactRecord',{name: contact.supplierName,id: id})">
				新建联系记录
			</view>
		</copyreader>
		<addOrder type="2" @click="handleClose()"></addOrder>

	</view>
</template>

<script>
	let {
		$getClientId,
		$delClient,
		$getClientRecord
	} = require('@/api/client.js'); //客户

	let {
		$getContactrecords
	} = require('@/api/contactrecords.js'); //联系

	import headerTab from '@/components/headerTab/index.vue';
	import slidingBlock from './components/slidingBlock.vue';
	import operator from './components/operator.vue';
	import liaisons from './components/liaisons.vue';
	import addOrder from '@/components/addOrder.vue';
	import copyreader from '@/components/copyreader/index.vue';
	export default {
		components: {
			headerTab,
			slidingBlock,
			addOrder,
			copyreader,
			operator,
			liaisons
		},
		data() {
			return {
				id: '',
				toggle: [{
					name: "基本信息",
					id: 0
				}, {
					name: "联系记录",
					id: 1
				}, {
					name: "销售记录",
					id: 2
				}],
				current: 0,
				compileShow: "none",
				contact: {},
				operator: {},
				list: {},
				contactList: [],
				recordList: [],

			}
		},
		onLoad(e) {
			this.id = e.id;
		},
		onShow() {
			this.getData();
			this.contactData();

		},
		methods: {
			async getData() {
				let _this = this;
				let res = await $getClientId(_this.id)
				let operator = {};
				let contact = {};
				_this.list = res.data;
				contact.contacterName = res.data.customerName;
				contact.mobile = res.data.mobile;
				contact.supplierName = res.data.customerNo;

				operator.createTime = res.data.createTime;
				operator.creator = res.data.creator;
				operator.updatedTime = res.data.updatedTime;
				operator.updator = res.data.updator;
				_this.contact = contact;
				_this.operator = operator;

				let record = await $getClientRecord(_this.list.customerNo);
				_this.recordList = record.data


			},
			// 联系记录
			async contactData() {
				let _this = this;
				let res = await $getContactrecords(_this.id);
				_this.contactList = res.data

			},
			// 删除
			clientDel() {
				let _this = this;

				_this.$api.showModal('确定要删除供应商?').then(() => {
					$delClient(_this.id).then(res => {
						setTimeout(() => {
							_this.$navto.navtab('pages/message/index')
						}, 500)
						_this.$api.msg('删除成功')
					});;

				});

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
			slideshow(e) {
				this.current = e.id;
			},
			slidingBlock(e) {
				this.current = e.detail.current;
			}
		}
	}
</script>

<style lang="scss">
	.swiper {
		height: 60vh;

		.swiper-item {
			height: 100%;


		}

		.supplier {
			margin: 0 20rpx;
			border-bottom: 1rpx solid #ccc;
			padding: 14rpx 0;
		}

		.diary {
			padding-top: 6rpx;
			border: none;
		}

		.record {
			padding: 14rpx 0;

			.content {
				margin-left: 20rpx;
				margin-top: 10rpx;
			}

			.date {
				margin-right: 10rpx;
			}
		}
	}
</style>
