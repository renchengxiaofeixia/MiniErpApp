<template>
	<view class="">
		<headerTab title="供应商详情" :record="true"></headerTab>

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
								<text class="fill">{{list.remarks}}</text>
							</view>
						</view>
						<operator :list="operator"></operator>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item ">

					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<view class="header gray">
							2022-05-05
						</view>

						<view class="table">
							<view class="from diary goods-flex">
								<text class="title">供应商</text>
								<text class="green"> ￥999</text>
							</view>
							<view class="from diary gray">
								dd-262600-21626
							</view>
							<view class="from diary gray">
								￥990 x 1件
							</view>

						</view>

					</view>
				</swiper-item>
			</swiper>
		</view>
		<copyreader :show="compileShow" @close="handleClose()">
			<view class="operation" hover-class="checkActive"
				@click="$navto.navto('pages/plusForm/addSupplier',{id:id,header: '修改供应商',type:1})">
				修改
			</view>
			<view class="operation red" hover-class="checkActive" @click="supplierDel">
				删除
			</view>
		</copyreader>
		<addOrder type="2" @click="handleClose()"></addOrder>

	</view>
</template>

<script>
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
				toggle: [{
					name: "基本信息",
					id: 0
				}, {
					name: "库存信息",
					id: 1
				}, {
					name: "可供应商",
					id: 2
				}],
				current: 0,
				compileShow: "none",
				id: '',
				list: [],
				contact: {}, //联络方式
				operator: {}, //操作日记

			}
		},
		onLoad(option) {
			this.id = option.id;

		},
		onShow() {
			this.getData();
		},
		methods: {
			getData() {
				let _this = this;
				_this.$request.get('supplier/' + _this.id).then(res => {
					let operator = {};
					let contact = {};
					_this.list = res.data;
					contact.contacterName = res.data.contacterName;
					contact.mobile = res.data.mobile;
					contact.supplierName = res.data.supplierName;

					operator.createTime = res.data.createTime;
					operator.creator = res.data.creator;
					operator.updatedTime = res.data.updatedTime;
					operator.updator = res.data.updator;
					_this.contact = contact;
					_this.operator = operator;

				})
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
			supplierDel() {
				let _this = this;
				_this.$api.showModal('确定要删除供应商').then(() => {
					_this.$request.del('supplier/' + _this.id);
					setTimeout(() => {
						_this.$navto.navtab('pages/message/index')
					}, 1000)
					_this.$api.msg('删除成功')
				});

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

			.header {
				padding-left: 30rpx;
				padding-top: 20rpx;
			}

			.diary {
				padding-top: 6rpx;
				border: none;
			}
		}
	}
</style>
