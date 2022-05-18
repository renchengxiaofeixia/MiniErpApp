<template>
	<view class="">
		<headerTab :scrollTab="scrollTab" @tabKey="change" :tab="warehouse.id"></headerTab>
		<searchbox @filter="openFilter()"></searchbox>
		<view class="slide">
			<swiper class="swiper" :current="warehouse.id" @change="slidingBlock">
				<swiper-item>
					<view class="swiper-item">
						<dataGrid url="pages/details/storage">
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
						<dataGrid url="pages/details/delivery">
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
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<dataGrid url="pages/details/allocate"></dataGrid>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<filtratePopup @close="openFilter()" :show="filterShow">
			<view>
				<view class="table" style="padding: 0;">
					<pulldown headline="库存状况">
						<stateBar
							:list="[{monicker: '全部',id: 1}, {monicker: '正常',id: 2}, {monicker: '负库存',id: 3}, {monicker: '超出上限',id: 4}, {monicker: '超出下限',id: 5}]">
						</stateBar>
					</pulldown>
				</view>

				<view class="table" style="padding: 0;">
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
		<addOrder :url="warehouse.url"></addOrder>
	</view>
</template>

<script>
	import headerTab from '@/components/headerTab/index.vue';
	import searchbox from '@/components/searchbox/index.vue';
	import dataGrid from '@/components/dataGrid/index.vue';
	import addOrder from '@/components/addOrder.vue';

	import filtratePopup from '@/components/filtratePopup/index.vue';
	import pulldown from "@/components/pulldown.vue"
	import stateBar from "@/components/stateBar.vue"

	export default {
		components: {
			headerTab,
			searchbox,
			dataGrid,
			addOrder,
			filtratePopup,
			pulldown, //折叠样式
			stateBar,
		},
		data() {
			return {
				scrollTab: [{
					text: '入库',
					url: 'pages/plusForm/addStorage',
					id: 0
				}, {
					text: '出库',
					url: 'pages/plusForm/adddElivery',
					id: 1
				}, {
					text: '盘点',
					id: 2
				}, {
					text: '调拨',
					url: 'pages/plusForm/addAllot',
					id: 3
				}],
				warehouse: {
					text: '入库',
					url: 'pages/plusForm/addStorage',
					id: 0

				},
				filterShow: 'none'

			}
		},
		onLoad() {

		},
		methods: {
			change(item) {
				this.warehouse = item;
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
			slidingBlock(e) {
				this.warehouse = this.scrollTab[e.detail.current];
			},
		}
	}
</script>

<style lang="scss">
</style>
