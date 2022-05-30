<template>
	<view class="storage">
		<headerTab :title="header"></headerTab>

		<view class="storage-piece" v-for="(item,index) in unitList" :key="index" @click.stop="checked(item.propValue)">
			<text>{{item.propValue}}</text>
			<text class="icon-shenglvehao iconfont" @click.stop="handleClose(item)"></text>
		</view>

		<copyreader :show="compileShow" @close="handleClose()">
			<view class="operation" @click="append(2)">
				修改
			</view>
			<view class="operation red" @click="delUnit()">
				删除
			</view>
		</copyreader>
		<addOrder type="3" @click="append(1)"></addOrder>
		<addPopup @close="append(1)" :show="isShow" @confirm="addCat" :title="unitTitle" v-model="content"></addPopup>
	</view>
</template>

<script>
	let {
		$getUnit,
		$getFollowStatus,
		$postCustomprop,
		$putCustomprop,
		$delCustomprop
	} = require('@/api/preserve.js'); //

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
				id: 1,
				header: "选择单位",
				isShow: false,
				compileShow: "none",
				unitList: [], //单位列表
				simple: {},
				unitTitle: '添加单位',
				content: '',
				revamp: false, //是否修改
			};
		},
		onLoad(e) {
			this.id = e.id
			this.header = decodeURIComponent(e.header);
			this.getData()
		},
		methods: {
			async getData() {
				let _this = this;
				if (_this.id == 1) {
					let unit = await $getUnit();
					_this.unitList = unit.data;

				} else {
					let status = await $getFollowStatus();
					_this.unitList = status.data;

				}
			},
			// 添加
			addCat(item) {
				let _this = this;
				let data = {};
				if (_this.id == 1) {
					data = {
						module: "ProdInfo",
						propName: "Unit",
						propValue: item,
					}
				} else {
					data = {
						module: "Customer",
						propName: "FollowStatus",
						propValue: item,
					}
				}

				if (!_this.revamp) {
					$postCustomprop(data).then(res => {
						_this.getData();
					});


				} else {
					$putCustomprop(_this.simple.id, data).then(res => {
						_this.getData();
					});


				}

			},
			// 删除
			delUnit() {
				let _this = this;
				_this.$api.showModal('确定要删除！').then(() => {
					$delCustomprop(_this.simple.id).then(res => {
						_this.getData();
					});
					_this.$api.msg('删除成功')
				});
			},
			// 选中
			checked(val) {
				if (this.id == 1) {
					this.$api.prePage().$data.unit = val;
				} else {
					this.$api.prePage().$data.contactStatus = val;
				}

				setTimeout(() => {
					this.$navto.navBack();
				}, 500)
			},
			// 弹窗
			append(top) {
				if (top == 1) {
					this.unitTitle = "添加单位"
				} else {
					this.content = this.simple.propValue;
					this.revamp = true
					this.unitTitle = "修改单位"
				}
				if (this.isShow) {
					this.simple = {};
					this.content = "";
					this.revamp = false;
				}
				this.isShow = !this.isShow
			},
			handleClose(item) {
				this.simple = item;
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
