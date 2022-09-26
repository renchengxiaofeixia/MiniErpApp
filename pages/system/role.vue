<template>
	<view>
		<headerTab title="角色管理"></headerTab>

		<view class="role" v-for="(item,index) in list" :key="index">
			<view>
				<view>
					{{item.roleName}}
				</view>
				<view>
					{{item.remarks}}
				</view>
			</view>
			<text class="icon-shenglvehao iconfont" @click.stop="handleClose(item)"></text>
		</view>

		<copyreader :show="isShow" @close="handleClose()">
			<view class="operation red" hover-class="checkActive" @click="delRole">
				删除
			</view>
			<view class="operation" hover-class="checkActive" @click="amend">
				修改
			</view>
		</copyreader>

		<view class="role-pup" v-if="closePop">
			<view class="role-cover" @click="openRole"></view>
			<view class="role-box">
				<view class="theme">
					{{title}}
				</view>
				<view class="enter">
					<text>名称：</text>
					<input type="text" v-model="roleName">
				</view>
				<view class="enter">
					<text>备注：</text>
					<input type="text" v-model="remark">
				</view>

				<view class="enter">
					<text></text>
					<view class="role-bnt">
						<button class="" style="background-color: #999;" @click="openRole">取消</button>
						<button class="bg-green" @click="addRole">确定</button>
					</view>
				</view>

			</view>
		</view>

		<addOrder type="3" @click="openRole"></addOrder>
	</view>
</template>

<script>
	let {
		$postRole,
		$getRole,
		$delRole,
		$putRole
	} = require('@/api/user.js');
	import headerTab from '@/components/headerTab/index.vue';
	import addOrder from '@/components/addOrder.vue';
	import copyreader from '@/components/copyreader/index.vue';
	export default {
		components: {
			headerTab,
			addOrder,
			copyreader,

		},
		data() {
			return {
				isShow: "none",
				closePop: false,
				roleName: "",
				remark: "",
				list: [],
				personage: {},
				title: '添加角色'
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			async getData() {
				let _this = this;
				let res = await $getRole();
				_this.list = res.data;
			},
			// 确定
			addRole() {
				let _this = this;
				if (!_this.roleName) {
					_this.$api.msg('请输入名称');
					return
				}
				let data = {
					roleName: _this.roleName,
					remarks: _this.remark
				}
				if (!_this.personage.id) {
					$postRole(data).then((res) => {
						_this.$api.msg('添加成功');
						_this.getData();
					})

				} else {
					$putRole(_this.personage.id, data).then((res) => {
						_this.getData();
						_this.$api.msg('修改成功！')
					})
				}
			},
			// 删除
			delRole() {
				let _this = this;
				_this.$api.showModal('确定要删除！').then(() => {
					$delRole(_this.personage.id).then(res => {
						_this.getData();
						_this.$api.msg('删除成功')
					});
				});
			},
			// 修改
			amend() {
				let role = this.personage;
				this.roleName = role.roleName;
				this.remark = role.remarks;
				this.title = "修改角色";
				this.closePop = true;

			},
			handleClose(item) {
				if (this.isShow == 'none') {
					this.isShow = 'show';
					this.personage = item;
				} else {
					this.isShow = 'hide';
					setTimeout(() => {
						this.isShow = 'none';
						this.personage = {};
					}, 200);
				}
			},
			openRole() {
				this.closePop = !this.closePop;
				if (this.closePop) {
					this.personage = {};
					this.roleName = "";
					this.remark = "";
					this.title = "添加角色";
				}
			}
		}
	}
</script>

<style lang="scss">
	.goods-list {
		padding-top: 20rpx;

	}

	.track {
		padding-top: 10rpx;
	}

	.shove {
		padding: 20rpx 0;
	}

	.phone {
		border-radius: 50%;
		border: 1rpx solid #2ea469;
		width: 92rpx;
		text-align: center;
		color: #2ea469;
		font-size: 24rpx;
		padding: 12rpx 0;

		.iconfont {
			color: #2ea469;
			font-size: 36rpx;
		}
	}

	.role {
		padding: 14rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		border-bottom: 1rpx solid #ccc;

		.iconfont {
			color: #2ea469;
			background-color: #efeef3;
			padding: 4rpx 4rpx;
			border-radius: 2rpx;
		}
	}

	.role-pup {
		position: fixed;
		top: 0;
		z-index: 99;

		.role-cover {
			position: fixed;
			top: 0;
			background-color: rgba(0, 0, 0, 0.3);
			width: 100%;
			height: 100%;
		}

		.role-box {
			position: fixed;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			margin: auto;
			width: 600rpx;
			height: 400rpx;
			background-color: #fff;
			z-index: 2;
			border-radius: 10rpx;

			.theme {
				padding: 20rpx;
				text-align: center;
				font-size: 32rpx;
				border-bottom: 1rpx solid #f0f0f0;
			}

			.enter {
				margin: 0 40rpx;
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				height: 60rpx;

				text {
					width: 120rpx;
					text-align: center;
				}

				input {
					border: 1rpx solid #ccc;
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
					padding: 0 10rpx;
				}
			}

			.role-bnt {
				display: flex;
				align-items: center;
				justify-content: space-around;
				width: 100%;
				margin-top: 40rpx;

				button {
					width: 120rpx;
					height: 70rpx;
					font-size: 28rpx;
					color: #fff;
				}
			}
		}
	}
</style>
