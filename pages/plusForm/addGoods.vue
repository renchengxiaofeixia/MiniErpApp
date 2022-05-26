<template>
	<view class="paddingBottom">
		<headerTab :title="header"></headerTab>
		<view class="table">
			<view class="from from-new">
				<text class="title">物品编号</text>
				<input type="text" placeholder="填写编号,保存后不能修改 (必填)" class="fill" v-model="productSeries">
			</view>
			<view class="from from-new">
				<text class="title">物品名称</text>
				<input type="text" placeholder="填写名称 (必填)" class="fill" v-model="productName">
			</view>
		</view>
		<view class="table">
			<view class="from from-new">
				<text class="title">规格型号</text>
				<input type="text" placeholder="填写型号" class="fill" v-model="productType">
			</view>
			<view class="from from-new">
				<text class="title">品牌</text>
				<input type="text" placeholder="填写品牌" class="fill" v-model="productBrand">
			</view>
			<view class="from from-new" @click="$navto.navto('pages/address/storage',{id:1,header:'选择单位'})">
				<text class="title">单位</text>
				<text class="fill">{{unit}}</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
			<view class="from from-new" @click="$navto.navto('pages/address/category')">
				<text class="title">类目</text>
				<text class="fill">{{catCode}}</text>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
		</view>

		<view class="headline">
			物品图片
		</view>
		<view class="table uploading">
			<block v-for="(item,index) in prodImage" :key="index">
				<image :src="item" mode="aspectFill"></image>
			</block>
			<view class="uploading-img" @click='addImg'>
				上传图片
			</view>
		</view>
		<view class="headline">
			价格信息
		</view>
		<view class="table">
			<view class="from from-new">
				<text class="title">采购价</text>
				<input type="number" placeholder="填写采购价" class="fill" v-model="purchasePrice">
			</view>
			<view class="from from-new">
				<text class="title">销售价</text>
				<input type="number" placeholder="填写销售价" class="fill" v-model="salePrice">
			</view>
		</view>

		<view class="headline">
			库存信息
		</view>
		<view class="table">
			<view class="from from-new">
				<text class="title">库存下限</text>
				<input type="number" placeholder="填写库存下限" class="fill" v-model="inventoryFloor">
			</view>
			<view class="from from-new">
				<text class="title">库存上限</text>
				<input type="number" placeholder="填写库存上限" class="fill" v-model="inventoryUpper">
			</view>
		</view>

		<view class="table">
			<view class="from from-new">
				<text class="title">备注</text>
				<input type="text" placeholder="填写备注" class="fill" v-model="remarks">
			</view>
		</view>

		<footerBtn @confirm="addProducts()"></footerBtn>
	</view>
</template>

<script>
	import headerTab from '@/components/headerTab/index.vue';
	import footerBtn from '@/components/footerBtn.vue';
	export default {
		components: {
			headerTab,
			footerBtn
		},
		data() {
			return {
				id: '', //id
				header: '新建物品', //表头
				type: 0, // 复制 2 修改 1 创建 0
				productSeries: '', //物品编号
				productName: '', //产品名称
				productType: '', //型号
				productBrand: '', //品牌
				purchasePrice: Number, //采购价
				salePrice: Number, //销售价
				inventoryFloor: Number, //库存下限
				inventoryUpper: Number, //库存上限
				remarks: '', //备注
				unit: '件', //单位
				catCode: '其他', //类目
				prodImage: [], //上传图片


			}
		},
		onLoad(option) {
			let _this = this;
			_this.id = option.id ? option.id : '';
			_this.type = option.type ? option.type : 0;
			_this.header = option.header ? decodeURIComponent(option.header) : '新建物品';

			if (_this.id != '') {
				_this.$request.get('prod/' + _this.id).then(res => {
					let data = res.data;
					_this.productSeries = data.prodNo;
					_this.productName = data.prodCustomNo;
					_this.productName = data.prodName;
					_this.unit = data.unit;
					_this.productType = data.prodModel;
					_this.purchasePrice = data.purchasePrice;
					_this.salePrice = data.salePrice;
					_this.remarks = data.remarks;
					_this.catCode = data.catCode;
					_this.prodImage = data.prodImage;
					_this.productBrand = data.prodBrand;
					_this.inventoryFloor = data.upperQuantity;
					_this.inventoryUpper = data.lowerQuantity;
				})
			}
		},
		methods: {
			addProducts() {
				let _this = this;
				if (_this.productSeries == "") {
					_this.$api.msg('物品编号不能为空');
					return
				}
				if (_this.productName == "") {
					_this.$api.msg('物品名称不能为空');
					return
				}
				
				let data = {
					prodNo: _this.productSeries,
					prodCustomNo: _this.productName,
					prodName: _this.productName,
					unit: _this.unit,
					prodModel: _this.productType,
					purchasePrice: _this.purchasePrice,
					salePrice: _this.salePrice,
					remarks: _this.remarks,
					catCode: _this.catCode,
					prodImage: _this.prodImage,
					prodBrand: _this.productBrand,
					upperQuantity: _this.inventoryFloor,
					lowerQuantity: _this.inventoryUpper
				}
				if (_this.type == 1) {
					_this.$request.put('prod/' + _this.id, data).then(res => {
						setTimeout(() => {
							_this.$navto.navBack();
						}, 1000)
						_this.$api.msg('修改成功');
					}).catch(error => {
						_this.$api.msg(error.data);
					})
				} else {
					_this.$request.post('prod', data).then(res => {
						setTimeout(() => {
							_this.$navto.navBack();
						}, 1000)
						_this.$api.msg('添加成功');
					}).catch(error => {
						_this.$api.msg(error.data);
					})
				}
				
				// this.$api.prePage().onLoad();
				console.log(_this.$api.prePage().$vm);
			},
			//*选择图片*//
			addImg: async function() {
				let _this = this
				uni.chooseImage({
					count: 9, // 最多可以选择的图片张数，默认9
					sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
					sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
					success: function(res) {
						if (_this.prodImage.length === 0) {
							_this.prodImage = res.tempFilePaths
						} else if (_this.prodImage.length < 9) {
							_this.prodImage = _this.prodImage.concat(res.tempFilePaths); //concat追加到数组
						}
					}
				})
			},

		},
	}
</script>

<style lang="scss">
	.headline {
		padding-top: 20rpx;
		margin-left: 30rpx;
	}
</style>
