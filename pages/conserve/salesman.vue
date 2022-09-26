<template>
	<view class="storage">
		<headerTab title="选择销售员"></headerTab>
		<view class="salesman" v-for="(item,index) in list" :key="index" @click.stop="checked(item.userName)">
			<text>{{item.userName}}</text>
			<text class="icon-shenglvehao iconfont" @click.stop="handleClose(item)"></text>
		</view>
		
		
		<copyreader :show="isShow" @close="handleClose()">
			<view class="operation" @click="append(2)">
				修改
			</view>
			<view class="operation red" @click="delUnit()">
				删除
			</view>
		</copyreader>
		<addOrder type="3" @click="append(1)"></addOrder>

		<view class="dialog" v-if="addShow">
			<view class="cover" @click="append(1)"></view>
			<view class="content">
				<view class="title">
					添加销售员
				</view>

				<view class="suggest">
					<text>账号:</text>
					<input type="text" class="" placeholder="请输入账号" v-model="userName" />
				</view>
				<view class="suggest">
					<text>电话号码:</text>
					<input type="number" placeholder="请输入电话号码" v-model="mobile" />
				</view>
				<view class="suggest">
					<text>密码:</text>
					<input type="text" password placeholder="请输入密码" v-model="password" />
				</view>
				<view class="salesman-btn">
					<button @click="append(1)">取消</button>
					<button @click="addition">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let {
		$getUsers,
		$postUsers
	} = require('@/api/user.js');
	import headerTab from '@/components/headerTab/index.vue';
	import addOrder from '@/components/addOrder.vue';
	import copyreader from '@/components/copyreader/index.vue';
	export default {
		components: {
			headerTab,
			addOrder,
			copyreader
		},
		data() {
			return {
				addShow: false,
				isShow: "none",
				list:[],
				userName: "",
				password: "",
				mobile: "",
			};
		},
		onLoad(e) {
			this.getData();
		},
		methods: {
			async getData() {
				let _this = this;
				let res = await $getUsers();
				_this.list = res.data;

			},
			addition() {
				let _this = this;
				let data = {};

				data.userName = _this.userName;
				data.password = _this.password;
				data.mobile = _this.mobile;

				$postUsers(data).then((res) => {
					_this.$api.msg('添加成功');
				})
			},
			checked(val){
				this.$api.prePage().$data.salesman = val;
				setTimeout(() => {
					this.$navto.navBack();
				}, 500)
			},
			// 弹窗
			append(top) {
				this.addShow = !this.addShow
			},
			handleClose(item) {
				if (this.isShow == 'none') {
					this.isShow = 'show';
				} else {
					this.isShow = 'hide';
					setTimeout(() => {
						this.isShow = 'none';
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

		.salesman {
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

	.dialog {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 99;

		.cover {
			position: fixed;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.3);
		}

		.content {
			position: fixed;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			z-index: 9;
			width: 600rpx;
			height: 420rpx;
			margin: auto;
			background-color: #fff;
			border-radius: 14rpx;
			overflow: hidden;

			.title {
				padding: 20rpx 0;
				text-align: center;
				font-size: 28rpx;
				border-bottom: 1rpx solid #ccc;
			}

			.suggest {
				display: flex;
				align-items: center;
				margin: 14rpx 20rpx;
				height: 70rpx;

				text {
					font-size: 28rpx;
					width: 130rpx;
				}

				input {
					flex: 1;
					border: 1rpx solid #ccc;
					height: 100%;
					padding: 0 20rpx;
					border-radius: 8rpx;
				}
			}

			.salesman-btn {
				display: flex;
				align-items: center;

				button {
					flex: 1;
					border-radius: 0;
					border-top: 1rpx solid #ccc;

					&:nth-child(1) {
						border-right: 1rpx solid #ccc;
					}

				}

			}
		}
	}
</style>
