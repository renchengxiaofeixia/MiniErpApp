<template>
	<view>
		<headerTab title="选择类目"></headerTab>
		<view class="category">
			<tki-tree ref="tkitree" :range="categoryList" @popup="upspring" rangeKey="categoryNam" @checked="checked">
			</tki-tree>
		</view>
		<copyreader :show="compileShow" @close="handleClose()">
			<view class="operation" hover-class="checkActive" @click="append(2)">
				新建子类目
			</view>
			<view class="operation" hover-class="checkActive" @click="append(3)">
				修改
			</view>
			<view class="operation red" hover-class="checkActive" @click="delcategory">
				删除
			</view>
		</copyreader>

		<addOrder type="3" @click="append(1)"></addOrder>
		<addPopup @close="append(1)" @confirm="addCat" :show="isShow" v-model="content" :title="addCategory">
		</addPopup>
	</view>
</template>

<script>
	let {
		$getCategory,
		$postCategory,
		$putCategory,
		$delCategory
	} = require('@/api/category.js'); //类目

	import headerTab from '@/components/headerTab/index.vue';
	import addOrder from '@/components/addOrder.vue';
	import addPopup from '@/components/addPopup.vue';
	import copyreader from '@/components/copyreader/index.vue';
	import tkiTree from '@/components/tki-tree/tki-tree.vue';
	export default {
		components: {
			headerTab,
			addOrder,
			addPopup,
			copyreader,
			tkiTree
		},
		data() {
			return {
				isShow: false,
				compileShow: "none",
				addCategory: '添加类目',
				categoryList: [], //类目数据
				sonCategory: {},
				content: "", //填写类目
				revamp: false //是否修改
			};
		},
		onLoad(e) {


		},
		onShow() {
			this.getData();
		},
		methods: {
			async getData() {
				let _this = this;
				let res = await $getCategory();
				_this.categoryList = res.data;

			},
			// 添加
			addCat(item) {
				let _this = this;
				let code = _this.sonCategory.parentCatCode ? _this.sonCategory.parentCatCode : '';
				let parentCatCode = !_this.revamp ? _this.sonCategory.catCode : code;
				let data = {
					catCode: item,
					categoryName: item,
					parentCatCode,
				}

				if (!_this.revamp) {
					$postCategory(data).then(res => {
						_this.getData();
					});

				} else {
					$putCategory(_this.sonCategory.id, data).then(res => {
						_this.getData();
					});

				}
			},
			// 打开弹窗
			upspring(item) {
				let _this = this;
				_this.sonCategory = item;
				_this.handleClose()
			},
			// 选中
			checked(item) {
				this.$api.prePage().$data.unit = item.categoryName;
				setTimeout(() => {
					this.$navto.navBack();
				}, 500)
			},
			delcategory() {
				let _this = this;
				_this.$api.showModal('确定要删除该类目！').then(() => {
					$delCategory(_this.sonCategory.id).then(res => {
						_this.getData();
					});
					_this.$api.msg('删除成功')
				});
			},
			// 弹出添加框
			append(top) {
				if (top == 1) {
					this.addCategory = "添加类目"
				} else if (top == 2) {
					this.handleClose();
					this.addCategory = "添加子类目";
				} else if (top == 3) {
					this.content = this.sonCategory.categoryName;
					this.addCategory = "修改类目";
					this.revamp = true;
				}
				if (this.isShow) {
					this.sonCategory = {};
					this.content = "";
					this.revamp = false;
				}
				this.isShow = !this.isShow;

			},
			// 选择框
			handleClose() {
				if (this.compileShow == 'none') {
					this.compileShow = 'show';
				} else {
					this.compileShow = 'hide';
					this.sonCategory = {};
					setTimeout(() => {
						this.compileShow = 'none';
					}, 200);
				}
			},

		}
	}
</script>

<style lang="scss">
	.category {
		background-color: #fff;
		border-bottom: 1rpx solid #ccc;
		margin-bottom: 100rpx;
	}
</style>
