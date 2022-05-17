<template>
	<view class="">
		<headerTab :scrollTab="scrollTab" @tabKey="change" :tab="first.id"></headerTab>
		<searchbox @filter="openFilter()"></searchbox>
		<view class="slide">
			<swiper class="swiper" :current="first.id" @change="slidingBlock">
				<swiper-item>
					<view class="swiper-item">
						<dataGrid url="pages/details/commodity" :list="productList" :date="false">
							<button class="pinless" style="background-color: #ffb535;">
								修改
							</button>
							<button class="pinless" style="background-color: #ff4622;">
								删除
							</button>
						</dataGrid>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<dataGrid url="pages/details/supplier">
							<button class="pinless" style="background-color: #ffb535;">
								修改
							</button>
							<button class="pinless" style="background-color: #ff4622;">
								删除
							</button>
						</dataGrid>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<dataGrid url="pages/details/client">
							<button class="pinless" style="background-color: #ffb535;">
								修改
							</button>
							<button class="pinless" style="background-color: #ff4622;">
								删除
							</button>
						</dataGrid>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<filtratePopup @close="openFilter()" :show="filterShow">
			<view>
				<block v-if="first.id==1">
					<view class="table" style="padding: 0;">
						<pulldown headline="类目" title="所有类目">
						</pulldown>
					</view>
					<view class="table" style="padding: 0;">
						<pulldown headline="库存状况">
							<stateBar
								:list="[{monicker: '全部',id: 1}, {monicker: '正常',id: 2}, {monicker: '负库存',id: 3}, {monicker: '超出上限',id: 4}, {monicker: '超出下限',id: 5}]">
							</stateBar>
						</pulldown>
					</view>
				</block>
				<view class="table" style="padding: 0;" v-if="first.id==3">
					<view class="contact-date">
						下次联系日期
					</view>
					<uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" />
				</view>
				<view class="table" style="padding: 0;">
					<pulldown headline="展示状态">
						<stateBar :list="[{monicker: '全部',id: 1}, {monicker: '显示',id: 2}, {monicker: '隐藏',id: 3}]">
						</stateBar>
					</pulldown>
				</view>
			</view>
		</filtratePopup>
		<addOrder :url="first.url"></addOrder>
	</view>
</template>

<script>
	import headerTab from '@/components/headerTab/index.vue';
	import searchbox from '@/components/searchbox/index.vue';
	import filtratePopup from '@/components/filtratePopup/index.vue';
	import dataGrid from '@/components/dataGrid/index.vue';
	import addOrder from '@/components/addOrder.vue';
	import pulldown from "@/components/pulldown.vue"
	import stateBar from "@/components/stateBar.vue"

	export default {
		components: {
			headerTab, //头部导航栏
			searchbox, //搜索框
			filtratePopup, //筛选
			dataGrid, //数据列表
			addOrder, //新建页面
			pulldown, //折叠样式
			stateBar,

		},
		data() {
			return {
				scrollTab: [{
					text: '物品',
					id: 0,
					url: "pages/plusForm/addGoods",
				}, {
					text: '供应商',
					id: 1,
					url: "pages/plusForm/addSupplier",
				}, {
					text: '客户',
					id: 2,
					url: "pages/plusForm/addCustomer",
				}],
				first: {
					text: '物品',
					id: 0,
					url: "pages/plusForm/addGoods",
				},
				filterShow: 'none',
				productList: [],

			}
		},
		onLoad() {
			this.getData();
		},
		methods: {
			getData() {
				let _this = this;
				_this.$request.get('prods', {
					page: 1,
					size: 10,
				}).then(res => {
					let data = res.data
					_this.productList = data.data;
				})
			},
			openFilter() {
				if (this.filterShow == 'none') {
					this.filterShow = 'show';
				} else {
					this.filterShow = 'hide';
					setTimeout(() => {
						this.filterShow = 'none';
					}, 500);
				}
			},
			change(item) {
				this.first = item;
			},
			slidingBlock(e) {
				this.first = this.scrollTab[e.detail.current];
			},
		}
	}
</script>

<style lang="scss">
</style>
