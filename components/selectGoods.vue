<template>
	<view>
		<view class="headline option-gooods">
			<text>选择物品</text>
			<view class="icon bg-green">
				<text class="icon-tianjia iconfont"></text>
				<text class="" @click="$navto.navto('pages/address/choiceCargo',{id:1,headline:'选择物品'})">添加</text>
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
						<uni-number-box :min="1" v-model="item.num" @change="changeValue(item)" />
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

		<block v-if="productList.length !=0">
			<view class="headline">
				相关约定
			</view>
			<view class="table product">
				<view class="from from-new">
					<text class="title">结算方式</text>
					<input type="text" placeholder="结算方式" class="fill" v-model="appoint.settle">
					<text class="iconfont icon-right-1-copy"></text>
				</view>
				<view class="from from-new">
					<text class="title">备注</text>
					<input type="text" placeholder="填写备注" class="fill" v-model="appoint.remarks">
					<text class="iconfont icon-right-1-copy"></text>
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
			meetion: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				productList: [],
				appoint: {
					settle: '',
					remarks: ""
				}
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
			},
			appoint: {
				handler(item, index) {
					this.appointData(); //监听到数据变化执行方法
				},
				deep: true // 深度监听父组件传过来对象变化
			},
			meetion(e) {
				this.appoint = e;
			}
		},
		methods: {
			// 数量
			changeValue(e) {
				let _this = this;
				setTimeout(() => {
					let price = Number(e.purchasePrice) * e.num;
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
					let price = Number(e.purchasePrice) * e.num;
					this.$set(e, 'totalPrice', price.toFixed(2));
				});
			},
			// 删除
			disposeOf(index) {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '你要确定要删除该物品吗?',
					success: function(res) {
						if (res.confirm) {
							_this.productList.splice(index, 1);
						} else if (res.cancel) {}
					}
				});
			},
			// 物品数据的传递
			circulation() {
				let goods = [];
				this.productList.forEach(e => {
					goods.push({
						// purchaseNo: "",
						prodNo: e.prodNo,
						prodCustomNo: e.prodCustomNo,
						prodName: e.prodName,
						prodModel: e.prodModel,
						unit: e.unit,
						unitPrice: e.purchasePrice,
						quantity: e.num,
						remarks: e.newRemarks
					})

				})
				this.$emit("shape", goods);
			},
			appointData() {
				this.$emit("appoint", this.appoint);
			}
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

			}

		}
	}
</style>
