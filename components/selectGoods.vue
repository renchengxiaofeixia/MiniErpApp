<template>
	<view>
		<view class="headline option-gooods">
			<text>选择物品</text>
			<view class="icon bg-green" v-if="hide"
				@click="$navto.navto('pages/address/choiceCargo',{id:1,headline:'选择物品'})">
				<text class="icon-tianjia iconfont"></text>
				<text class="">添加</text>
			</view>
		</view>

		<block>
			<view class="product" v-for="(item,index) in productList" :key="index">
				<view class="product-show">
					<view class="goods-flex">
						<view class="product-btr">
							<text class="iconfont icon-guanbi1 red" @click="disposeOf(index)"></text>
							<text class="name">{{item.prodName}}</text>
							<text class="gray">({{item.prodModel}})</text>
						</view>

						<view class="product-price green">
							￥{{item.totalPrice}}
						</view>
					</view>
					<view class="serial gray">
						{{item.prodNo}}
					</view>
				</view>
				<view class="goods-flex product-back product-show">
					<view class="product-title">
						单价
					</view>
					<view class="product-sum">
						<input type="digit" placeholder="填写单价" v-model="item.purchasePrice"
							@input="numberFixedDigit(item)">
					</view>
				</view>
				<view class="goods-flex product-back product-show">
					<view class="product-title">
						数量
					</view>
					<view class="product-sum">
						<block v-if="hide">
							<uni-number-box :min="1" v-model="item.quantity" @change="changeValue(item)" :max="1000" />
						</block>

						<block v-else>
							<uni-number-box :min="1" v-model="item.quantity" @change="changeValue(item)"
								:max="item.notReceiverQuantity" />
							<text v-if="item.notReceiverQuantity == item.quantity"
								style="margin-left: 10upx; font-size: 24upx;"
								class="red">还剩{{item.notReceiverQuantity}}可入库</text>
						</block>
					</view>
				</view>
				<view class="goods-flex product-back product-show">
					<view class="product-title">
						备注
					</view>
					<view class="product-sum">
						<input type="text" placeholder="填写备注" v-model="item.newRemarks">
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: []
			},
			hide: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				productList: [],
				appoint: {
					settlementMode: '',
					remarks: ""
				},

			};
		},
		watch: {
			list(item) {
				this.productList = JSON.parse(JSON.stringify(item));
			},
			productList: {
				handler(item, index) {
					this.circulation(); //监听到数据变化执行方法
				},
				deep: true // 深度监听父组件传过来对象变化
			}
		},
		methods: {
			// 数量
			changeValue(e) {
				let _this = this;
				setTimeout(() => {
					let price = Number(e.purchasePrice) * e.quantity;
					_this.$set(e, 'totalPrice', price.toFixed(2));

				}, 100)
			},
			numberFixedDigit(e) { // 只能输入整数
				this.$nextTick(() => {
					let val = e.purchasePrice.toString();
					val = val.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
					val = val.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
					val = val.replace(/^0+\./g, '0.');
					val = val.match(/^0+[1-9]+/) ? val = val.replace(/^0+/g, '') : val;
					val = (val.match(/^\d*(\.?\d{0,2})/g)[0]) || '';
					this.$set(e, 'purchasePrice', val);
					let price = Number(e.purchasePrice) * e.quantity;
					this.$set(e, 'totalPrice', price.toFixed(2));
				});
			},
			// 删除
			disposeOf(index) {
				let _this = this;
				_this.$api.showModal('你要确定要删除该物品吗?').then(() => {
					_this.productList.splice(index, 1);
				});
			},
			// 物品数据的传递
			circulation() {
				console.log(this.productList);
				this.$emit("shape", this.productList);
			},

		}
	}
</script>

<style lang="scss">
	.option-gooods {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #ccc;
	}

	.headline {
		padding: 16rpx 0;
		margin: 0 20rpx;
		font-size: 30rpx;

		.icon {
			border: 1rpx solid #ccc;
			padding: 10rpx;
			border-radius: 10rpx;
			color: #fff;

		}

	}

	.product {
		background-color: #fff;
		margin: 0;
		border-bottom: 1rpx solid #ccc;

		.product-show {
			border-bottom: 1rpx solid #eee;
			padding: 20rpx;

			.goods-flex {
				margin: 0;

				.name {
					margin: 0 10rpx;
				}

				.product-price {
					margin-right: 14rpx;
					flex: 1;
					text-align: right;
				}
			}

			.serial {
				margin-top: 20rpx;
				margin-left: 34rpx;
			}
		}

		.product-back {
			margin-left: 34rpx;

			.product-title {
				text-align: left;
				width: 110rpx;
			}

			.product-sum {
				text-align: left;
				flex: 1;
				display: flex;
				align-items: center;

			}

		}
	}
</style>
