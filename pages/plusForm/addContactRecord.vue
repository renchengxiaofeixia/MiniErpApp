<template>
	<view class="supplier">
		<headerTab title="新建联系记录"></headerTab>
		<view class="table">
			<view class="from from-new">
				<text class="title">联系日期</text>
				<view class="fill">
					<uni-datetime-picker v-model="contactTime" type="date" @change="selectTime">
						{{contactTime}}
					</uni-datetime-picker>
				</view>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
			<view class="from from-new">
				<text class="title">下次联系</text>
				<view class="fill">
					<uni-datetime-picker v-model="nextContactTime" type="date" @change="selectNextTime">
						{{nextContactTime}}
					</uni-datetime-picker>
				</view>
				<text class="iconfont icon-right-1-copy"></text>
			</view>
		</view>

		<view class="table remarks">
			<view class="from from-new">
				<text class="title">联系内容</text>
				<textarea placeholder="填写联系内容" v-model="contactContent"></textarea>
			</view>
		</view>

		<view class="headline">
			现场照片
		</view>
		<view class="table uploading">
			<block v-for="(item,index) in contactImages" :key="index">
				<image :src="item" mode="aspectFill"></image>
			</block>
			<view class="uploading-img" @click='addImg'>
				上传图片
			</view>
		</view>
		<footerBtn @confirm="linkmanBnt()"></footerBtn>
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
				customerNo: "",
				nextContactTime: this.$api.dateTime("yyyy-MM-dd"),
				contactTime: this.$api.dateTime("yyyy-MM-dd"),
				contactContent: "",
				contactImages: []
			}
		},
		onLoad(e) {
			this.customerNo = decodeURIComponent(e.name);
		},
		methods: {
			linkmanBnt() {
				let _this = this;
				let next = new Date(this.nextContactTime).valueOf();
				let contact = new Date(this.contactTime).valueOf();
				if (next < contact) {
					_this.$api.msg('下次联系时间不得早于当前联系日期', 2000);
					return
				}

				if (_this.contactContent == "") {
					_this.$api.msg('联系内容不能为空');
					return
				}
				let data = {
					customerNo: _this.customerNo,
					nextContactTime: _this.nextContactTime,
					contactTime: _this.contactTime,
					contactContent: _this.contactContent,
					contactImages: _this.contactImages
				}

				_this.$request.post('customercontact', data).then(res => {
					setTimeout(() => {
						_this.$navto.navBack();
					}, 1000)
					_this.$api.msg('添加成功');
				}).catch(error => {
					_this.$api.msg(error.data);
				})

			},
			// 联系日期
			selectTime(date) {
				this.contactTime = date;

			},
			// 下次联系
			selectNextTime(date) {
				this.nextContactTime = date;

			},
			//*选择图片*//
			addImg: async function() {
				let _this = this
				uni.chooseImage({
					count: 9, // 最多可以选择的图片张数，默认9
					sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
					sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
					success: function(res) {
						if (_this.contactImages.length === 0) {
							_this.contactImages = res.tempFilePaths
						} else if (_this.contactImages.length < 9) {
							_this.contactImages = _this.contactImages.concat(res
								.tempFilePaths); //concat追加到数组
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.credit {
		width: auto !important;
		padding-right: 20rpx;
	}

	.headline {
		padding-top: 20rpx;
		margin-left: 30rpx;
	}
</style>
