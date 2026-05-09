<template>
	<view class="order-detail">
		<view v-if="orderDetail">
			<order-info :orderDetail="orderDetail"></order-info>

			<view class="order-area padding margin-lr margin-tb-sm bg-main border-radius">
				<view class="item" style="background-color: #fff8e1;padding: 20rpx;border-radius: 12rpx;">
					<text>验收说明</text>
					<view class="fs-xs">
						<template v-if="orderTypeMessage">
							<!-- <rich-text :nodes="orderTypeMessage"></rich-text> -->
							<!-- <text style="white-space: pre-line">{{orderTypeMessage}}</text> -->
							<text
								style="line-height: 20px;width: 100%;">{{ orderTypeMessage.replace(/\\n/g,'\n') }}</text>
						</template>
						<view v-else style="color: #ff4d51;">暂未配置</view>
						<u-button type="success" @click="checkStateClick()"
							:plain="checkState=='N'?true:false">验收确认</u-button>
					</view>
				</view>
				<template v-if="checkState=='Y'">
					<view class="item">
						<text>业主签字</text>
						<view v-if="userSignUrl">
							<image @click="preSingImage(userSignUrl)" :src="tools.getImagePath(userSignUrl)"
								style="width: 100%" mode="widthFix" />
						</view>
						<view v-else class=" bg-drak dflex fs-xs ft-dark sign-area w-full" @click="toSign">
							点击此处签字
						</view>
					</view>
					<template v-if="userSignUrl">
						<view class="item" style="display: flex;align-items: center;margin: 4rpx 0;">
							<text style="margin-right: 20rpx;">是否空跑</text>
							<view class="dflex fs-xs ft-dark">
								<u-radio-group v-model="emptyRunState" active-color="#82C91E">
									<u-radio :label-disabled="false" v-for="(item, index) in list" :key="index"
										:name="item.name">
										{{item.label}}
									</u-radio>
								</u-radio-group>
							</view>
						</view>
						<view class="item dflex-b row-s">
							<text class="ws-np  margin-right-sm ">完成凭证</text>
							<view style="flex: 1;">
								<view class="use-upload pos-r dflex" style="flex-wrap: wrap;">
									<view class="item pos-r margin-bottom-xxs" v-for="(item, index) in imgs"
										@click="preEndImage(item)" :key="index">
										<image :src="tools.getImagePath(item)" mode="aspectFill"></image>
										<view
											class="del pos-a bg-main dflex-c border-radius-c iconfont iconlajitong-01 ft-dark"
											@tap.stop="delImage(index)"></view>
									</view>
									<view class="item border-radius-sm dflex-c dflex-flow-c" v-if="imgs.length < limit"
										@tap="chooseImage">
										<view class="iconfont iconxiangji-01 fs-big ft-dark"></view>
									</view>
								</view>
							</view>
						</view>
						<view style="color: red">*注：请上传订单前、中、后期1～4张凭证</view>
						<view v-if="false">
							<view v-if="orderDetail.userId==0" class="item" style="display: flex;align-items: center;">
								<text style="margin-right: 20rpx;">评分</text>
								<view class="dflex fs-xs ft-dark">
									<use-rate class="line-height-1" @change="rateChange"
										:value="userEvaluate"></use-rate>
								</view>
							</view>
							<view v-if="orderDetail.userId==0" class="item">
								<text>评价</text>
								<view class="dflex fs-xs ft-dark">
									<textarea class="bg-drak w-full border-radius-sm margin-top-sm padding-sm"
										style="min-height: 70px;" maxlength="200" auto-height placeholder="请输入评价"
										v-model="userEvaluateComment">
									 </textarea>
								</view>
							</view>
						</view>
					</template>
				</template>
				<view v-if="checkState=='Y'"
					style="display: flex;align-items: center;justify-content: center;padding: 40rpx 20rpx;">
					<view style="width: 100%;padding: 20rpx 0;" @click="submit()"
						class="border-radius-big bg-base dflex-c padding-lr">
						<view>确定</view>
					</view>
				</view>

				<use-action-sheet v-model="actionSheetShow" :list="actionSheetList" :tips="actionSheetTips"
					@click="actionSheetClick" @close="actionSheetClose"></use-action-sheet>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import api from '@/common/api.js'
	import global from '@/utils/global.js'
	import OrderInfo from '../../components/order-info.vue'
	var QQMapWX = require('@/utils/qqmap-wx-jssdk.js');
	var qqmapsdk;
	export default {
		components: {
			OrderInfo
		},
		computed: {
			...mapState({
				myInfo(state) {
					return state.user.myInfo;
				},
				workerInfo(state) {
					return state.user.workerInfo;
				}
			})
		},
		data() {
			return {
				httpImageUrl: this.httpImageUrl,
				orderNo: '',
				orderDetail: null,
				limit: 4,
				imgs: [],
				userSignUrl: '',
				userEvaluate: 0,
				emptyRunState: 'N',
				checkState: 'N',
				userEvaluateComment: '',
				waterMarkName: '绿豆锁大师',
				orderTypeMessage: '',
				list: [{
						name: 'N',
						label: '否'
					},
					{
						name: 'Y',
						label: '是'
					}
				],
				actionSheetShow: false,
				actionSheetList: [
					{
						text: "从相册选择",
						color: "#333",
						value: 0
					},
					{
						text: "使用相机拍摄",
						color: "#333",
						value: 1
					},
					{
						text: "从聊天记录选择",
						color: "#333",
						value: 2
					},
				],
				actionSheetTips: {
					text: "",
					color: "#9a9a9a",
					size: 24
				},
			}
		},
		onLoad(options) {
			this.orderNo = options.orderNo
			this.type = options.type
			this.getOrderDetail()
			// 实例化API核心类
			qqmapsdk = new QQMapWX({
				// key: '4KUBZ-TPMKT-CZ5XB-LL76T-YUXNK-5VF42' //申请的key
				// key: '4IMBZ-QW4CH-7GDDV-W6QSG-PGGCF-UCF3C' //申请的key
				key: 'SRNBZ-NJF6J-76XFH-X4UQH-5FO6O-5YF2J' //申请的key
			});
		},
		onShow() {
			var userSignUrl = uni.getStorageSync('userSignUrl')
			if (userSignUrl) {
				this.userSignUrl = userSignUrl
				uni.removeStorageSync('userSignUrl')
			}
		},
		onUnload() {
			uni.removeStorageSync('userSignUrl')
		},
		methods: {
			actionSheetClick(index) {
				const value=this.actionSheetList[index].value
				this.chooseImageUpload(value)
			},
			actionSheetClose() {
				console.log(this.actionSheetShow);
			},
			checkStateClick() {
				if (this.checkState == 'N') {
					this.checkState = 'Y'
				} else {
					this.checkState = 'N'
				}
			},
			submit() {
				const _this = this;
				if (!_this.userSignUrl) {
					uni.showToast({
						icon: 'none',
						title: '请上传业主签字'
					})
					return
				}
				if (_this.imgs.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请上传完成凭证'
					})
					return
				}

				uni.showModal({
					title: '温馨提示',
					content: '确定要提交吗?',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '加载中'
							})
							api.workOrder.updateComplete({
								orderNo: _this.orderNo,
								userSignUrl: _this.userSignUrl,
								emptyRunState: _this.emptyRunState,
								checkState: _this.checkState,
								userEvaluate: _this.orderDetail.userId != 0 ? -1 : _this
									.userEvaluate >= 0 ? _this.userEvaluate : 0,
								userEvaluateComment: _this.userEvaluateComment ? _this
									.userEvaluateComment : '',
								endPic: _this.imgs.length > 0 ? _this.imgs[0] : '',
								endPic1: _this.imgs.length > 1 ? _this.imgs[1] : '',
								endPic2: _this.imgs.length > 2 ? _this.imgs[2] : '',
								endPic3: _this.imgs.length > 3 ? _this.imgs[3] : '',
							}).then(res => {
								uni.showModal({
									title: '温馨提示',
									content: '完单成功',
									showCancel: false,
									success: function(res) {
										if (res.confirm) {
											uni.navigateBack()
										}
									}
								})
								uni.removeStorageSync('userSignUrl')
							}).catch(e => {
								uni.hideLoading()
							})

						} else if (res.cancel) {

						}
					}
				});
			},
			// 签字
			toSign() {
				uni.navigateTo({
					url: '/sub-user/pages/sign/sign'
				})
			},
			chooseImage(flag) {
				let _this = this;
				if (_this.waterMarkName == '绿豆锁大师') {
					wx.getLocation({
						type: 'gcj02',
						success: function(res) {
							console.log('经纬度')
							console.log(res)
							const latitude = res.latitude
							const longitude = res.longitude
							// 调用腾讯地图api获取当前位置
							qqmapsdk.reverseGeocoder({
								location: {
									latitude: latitude,
									longitude: longitude
								},
								success: function(res) {
									console.log('地址')
									console.log(res)
									_this.waterMarkName = res.result.formatted_addresses.recommend
									// _this.chooseImageUpload()
									_this.actionSheetShow=true
								},
								fail: function(res) {
									console.log('地址失败')
									console.log(res)
									_this.actionSheetShow=true
									// _this.chooseImageUpload()
								}
							});
						},
						fail: function(err) {
							console.log(err)
							if (err.errMsg === 'getLocation:fail:auth denied') {
								wx.showToast({
									title: '拒绝授权',
									icon: 'none'
								})
							} else if (err.errMsg === 'getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF' ||
								err.errMsg === 'getLocation:fail system permission denied' ||
								err.errMsg === 'getLocation:fail:system permission denied' || err.errMsg ===
								'getLocation:fail auth deny') {
								wx.showModal({
									title: '您未开启地理位置授权',
									content: '请在系统设置中打开位置授权，以便我们为您提供更好的服务',
									success: (res) => {
										if (res.confirm) {
											wx.openSetting()
										}
									}
								})
							}
						}
					})
				} else {
					// _this.chooseImageUpload()
					_this.actionSheetShow=true
				}
			},
			chooseImageUpload(value) {
				const _this = this
				if(value==2){
					wx.chooseMessageFile({
						count: _this.limit - _this.imgs.length,
						type:'image',
						success(res) {
							uni.showLoading({
								title: '加载中'
							})
							const tempFilePaths=[]
							res.tempFiles.forEach(item=>{
								tempFilePaths.push(item.path)
							})
							// const tempFilePaths = res.tempFilePaths;
							const tempFilePathsLength = tempFilePaths.length
							if (_this.waterMarkName == '绿豆锁大师') {
								_this.waterMarkName = '绿豆锁大师·' + _this.$u.timeFormat(new Date().getTime(),
									'yyyy-mm-dd hh:MM:ss')
							}
							var upLoadNum = 0
							for (var i = 0; i < tempFilePathsLength; i++) {
								var item = tempFilePaths[i]
								uni.uploadFile({
									url: global.baseUri + global.path + 'upload/uploadPic',
									header: {
										'token': uni.getStorageSync("token"),
									},
									filePath: item,
									name: 'file',
									formData: {
										'type': 5,
										'waterMarkName': _this.waterMarkName
									},
									success(data) {
										upLoadNum++
										if (upLoadNum == tempFilePathsLength) {
											uni.hideLoading()
										}
										var data = JSON.parse(data.data);
										if (data.code == 0) {
											_this.imgs.unshift(data.data)
										} else {
											uni.showToast({
												title: '上传图片失败!',
												icon: 'none'
											})
										}
										_this.waterMarkName = '绿豆锁大师'
									},
									fail() {
										_this.waterMarkName = '绿豆锁大师'
										uni.hideLoading();
										uni.showToast({
											title: '上传图片失败!',
											icon: 'none'
										})
									}
								})
							}
						},
						fail(e) {
							_this.waterMarkName = '绿豆锁大师'
						}
					})
				}else{
					uni.chooseMedia({
						count: _this.limit - _this.imgs.length,
						mediaType:['image'],
						sourceType:value==0?['album']:['camera'],
						success(res) {
							uni.showLoading({
								title: '加载中'
							})
							const tempFilePaths=[]
							res.tempFiles.forEach(item=>{
								tempFilePaths.push(item.tempFilePath)
							})
							// const tempFilePaths = res.tempFilePaths;
							const tempFilePathsLength = tempFilePaths.length
							if (_this.waterMarkName == '绿豆锁大师') {
								_this.waterMarkName = '绿豆锁大师·' + _this.$u.timeFormat(new Date().getTime(),
									'yyyy-mm-dd hh:MM:ss')
							}
							var upLoadNum = 0
							for (var i = 0; i < tempFilePathsLength; i++) {
								var item = tempFilePaths[i]
								uni.uploadFile({
									url: global.baseUri + global.path + 'upload/uploadPic',
									header: {
										'token': uni.getStorageSync("token"),
									},
									filePath: item,
									name: 'file',
									formData: {
										'type': 5,
										'waterMarkName': _this.waterMarkName
									},
									success(data) {
										upLoadNum++
										if (upLoadNum == tempFilePathsLength) {
											uni.hideLoading()
										}
										var data = JSON.parse(data.data);
										if (data.code == 0) {
											_this.imgs.unshift(data.data)
										} else {
											uni.showToast({
												title: '上传图片失败!',
												icon: 'none'
											})
										}
										_this.waterMarkName = '绿豆锁大师'
									},
									fail() {
										_this.waterMarkName = '绿豆锁大师'
										uni.hideLoading();
										uni.showToast({
											title: '上传图片失败!',
											icon: 'none'
										})
									}
								})
							}
						},
						fail(e) {
							_this.waterMarkName = '绿豆锁大师'
						}
					})
				}
			},
			delImage(idx) {
				this.imgs.splice(idx, 1);
			},
			preSingImage(item) {
				const _this = this
				var current = _this.tools.getImagePath(item)
				uni.previewImage({
					current: current,
					urls: [current],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {},
						fail: function(err) {}
					}
				});
			},
			preEndImage(item) {
				const _this = this
				var urls = []
				_this.imgs.forEach(e => {
					urls.push(_this.tools.getImagePath(e))
				})
				uni.previewImage({
					current: _this.tools.getImagePath(item),
					urls: urls,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {},
						fail: function(err) {}
					}
				});
			},
			rateChange(value) {
				this.userEvaluate = value.value
			},
			getOrderDetail() {
				uni.showLoading({
					title: '加载中'
				})
				api.workOrder.getInfoByOrderNo({
					orderNo: this.orderNo
				}).then(res => {
					if (res.data) {
						this.orderDetail = res.data
						if (this.orderDetail.checkState == 'Y') {
							this.checkState = 'Y'
						}
						if (this.orderDetail.emptyRunState == 'Y') {
							this.emptyRunState = 'Y'
						}
						if (this.orderDetail.endPic) {
							this.imgs.push(this.this.orderDetail.endPic)
						}
						if (this.orderDetail.endPic1) {
							this.imgs.push(this.this.orderDetail.endPic)
						}
						if (this.orderDetail.endPic2) {
							this.imgs.push(this.this.orderDetail.endPic)
						}
						if (this.orderDetail.endPic3) {
							this.imgs.push(this.this.orderDetail.endPic)
						}
						if (res.data.userEvaluate < 0) {
							this.userEvaluate = 0
						} else {
							this.userEvaluate = res.data.userEvaluate
						}
						if (res.data.userEvaluateComment) {
							this.userEvaluateComment = res.data.userEvaluateComment
						}
						if (res.data.userSignUrl) {
							this.userSignUrl = res.data.userSignUrl
						}
						this.getOrderTypeInfo()
					} else {
						this.orderDetail = null
					}
					uni.hideLoading()
				}).catch(e => {
					uni.hideLoading()
				})
			},
			getOrderTypeInfo() {
				api.globleData.getListByGroupNo({
					groupNo: this.orderDetail.workOrderTypeCode
				}).then(res => {
					if (res.listData && res.listData.length > 0) {
						var find = res.listData.find(item => item.number == this.orderDetail.workOrderTypeCode)
						if (find) {
							// this.orderTypeMessage = find.data.replace(/\n/g, "<br/>");
							this.orderTypeMessage = find.data;
						}
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
	}

	.adress {
		width: 50%;
		font-size: 24rpx;
		color: #bbb;
		line-height: 40rpx;
	}

	.order-detail .item text:first-child {
		width: max-content;
		display: inline-block;
	}

	.payment_voucher {
		width: 180rpx;
		height: 180rpx;
	}

	/* 状态区 */
	.state-area {}

	/* 收货人 */
	.address-area {}

	/* 商品区 */
	.goods-area {
		&:last-child {
			margin-bottom: 0;
		}

		image {
			width: 180rpx;
			height: 180rpx;
		}
	}

	/* 订单数据区 */
	.order-area {
		.item {
			line-height: 66rpx;

			.copy {
				margin-left: 20rpx;
				padding: 12rpx 24rpx;
				background-color: #f1f1f1;
				border-radius: 40rpx;
				font-size: 22rpx;
				line-height: 1;
				width: auto !important;
				transform-origin: right center;
			}
		}
	}

	/* 数据统计区 */
	.total-area {
		.item {
			line-height: 48rpx;

			text {
				text-align: right;
			}
		}
	}

	/* 操作区 */
	.oper-area {
		width: 100%;
		height: 100rpx;
		height: calc(env(safe-area-inset-bottom) + 100upx);
		background-color: #fff;
		position: fixed;
		z-index: 1;
		bottom: 0;
		left: 0;
		border-top: 1px solid #f0f0f0;

		.btn-area {
			font-size: $font-sm;
			color: $font-color-base;
			width: 96rpx;

			.iconfont {
				font-size: 40rpx;
				line-height: 48rpx;
			}
		}
	}

	/* 操作按钮 */
	.action-btn {
		width: 156rpx;
		height: inherit;
		line-height: inherit;
		margin: 0;
		margin-left: 20rpx;
		padding: 12rpx 0;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		background: #fff;
		border-radius: 100px;
		/* #ifdef MP-QQ || MP-ALIPAY */
		border: 1px solid;
		/* #endif */

		&:after {
			border-radius: 100px;
		}

		&.main-btn {
			background: rgba(129, 199, 31, 0.1);
			color: $base-color;

			&:after {
				border-color: rgba(129, 199, 31, 0.8);
			}
		}
	}

	.group-user {
		.bg-base {
			background: rgba(129, 199, 31, .85);
		}

		.bg-trans {
			background: rgba(0, 0, 0, .45);
			color: #fff;
		}
	}

	.alert-box {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 999;
	}

	.alert-item {
		width: 600rpx;
		min-height: 435rpx;
		padding: 30rpx 0rpx;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		border-radius: 20rpx;
	}

	.alert-title {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
		width: 520rpx;
		font-weight: bold;
		font-size: 24rpx;
		margin-bottom: 20rpx;
		color: rgb(186, 186, 186);
	}

	.alert-content {
		font-size: 24rpx;
		text-align: center;
		margin-bottom: 20rpx;
		margin: 0 auto 10rpx;
		width: 540rpx;
	}

	.btn-box {
		width: 440rpx;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-around;
		margin: 30rpx auto 0;
		background-color: #82C91E;
		color: #fff;
		height: 80rpx;
		border-radius: 40rpx;
	}

	.input-nickname {
		border-radius: 6rpx;
		height: 80rpx;
		background-color: rgb(245, 245, 245);
		font-size: 26rpx;
		width: 440rpx;
		text-align: left;
		padding-left: 20rpx;
		color: #999
	}

	.btn-sure {
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	.sign-area {
		height: 200rpx;
		padding: 30rpx 0rpx;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: center;
		border-radius: 20rpx;
		color: #999;
		font-weight: 500;
		font-size: 38rpx;
		letter-spacing: 16rpx;

	}

	.use-upload {
		width: 100%;

		.item {
			width: 150rpx;
			height: 210rpx;
			border: 1px solid #f0f0f0;
			margin-right: 10rpx;

			image,
			video {
				width: 100%;
				height: 100%;
			}
		}

		.del {
			top: -30rpx;
			right: -10rpx;
			width: 50rpx;
			height: 50rpx;
			z-index: 99;
			box-shadow: 0px 3px 5px #f0f0f0;
		}
	}

	.reason-content {
		display: flex;
		flex-wrap: wrap;

		.reason-item {
			padding: 8rpx 15rpx;
			background: #FFFFFF;
			border-radius: 23rpx;
			border: 1rpx solid #B1B3B8;
			margin: 0 10rpx 10rpx 10rpx;
			color: #B1B3B8;

			&.active {
				color: #fff !important;
				background: #8ACA16;
			}
		}
	}
</style>