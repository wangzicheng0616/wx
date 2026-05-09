<template>
	<view class="order-detail">
		<view v-if="orderDetail">
			<order-info :orderDetail="orderDetail"></order-info>
		</view>

		<view class="order-area padding margin-lr margin-tb-sm bg-main border-radius" style="flex-direction: column;">
			<view style="width: 100%;position: relative;">
				<textarea v-model="reason" maxlength="500" placeholder="请输入理由" @confirm="submit()"
					:show-confirm-bar="false" confirm-type="done"
					style="position: relative; width: 100%;height: 150px;font-size: 14px;margin-top: 10px;"
					placeholder-style="color:#909399;font-size:14px">
				</textarea>
				<view style="position: absolute;bottom: 10px;right: 10px;color: #c0c4cc;" class="font-size-10">
					{{reason.length}}/500
				</view>
			</view>
			<view class="display-flex-row" style="margin-bottom:30px;margin-top:10px;flex-wrap: wrap;width: 100%;">
				<template v-if="imagesUrls.length>0">
					<view class="item-wrap" v-for="(item,index) in imagesUrls" :key="index">
						<view class="image-wrap border-radius-6" style="position: relative;">
							<image class="border-radius-6" :src="tools.getImagePath(item)"
								style="width: 100%;height: 100%;" mode="aspectFill" @click="previewImage(item,index)">
							</image>
							<view @click.top="delImage(index)" style="position: absolute;top: -10px;right: -10px;padding: 5px;">
								<uni-icons 
									type="clear" size="14" color="#c0c4cc">
								</uni-icons>
							</view>
						</view>
					</view>
				</template>

				<view class="item-wrap" v-if="imagesUrls.length<limit">
					<view class="image-wrap border-radius-6" style="background: #f1f1f1;" @click="uploadImage">
						<image :src="httpImageUrl+'/static/icon_camera.png'" style="width: 56px;height: 56px;"></image>
					</view>
				</view>
			</view>
		</view>

		<view
			style="height: 40px;margin-top: 20px;margin-bottom: 20px;display: flex;align-items: center;justify-content: center;">
			<view class="font-size-16 btn-bg"
				style="width: 90%;height: 100%;display: flex;align-items: center;justify-content: center;color: white;border-radius: 20px;"
				@click="submit">
				确定
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
	export default {
		computed: {
			...mapState({
				myInfo(state) {
					return state.user.myInfo;
				},
				workerInfo(state) {
					return state.user.workerInfo;
				}
			}),
		},
		components : {
			OrderInfo
		},
		data() {
			return {
				endType: -1,
				httpImageUrl:this.httpImageUrl,
				orderNo: '',
				orderDetail: null,
				reason: '',
				parentId:0,
				imagesUrls: [],
				previewImages:[],
				limit:5
			}
		},
		onLoad(options) {
			const _this = this;
			this.endType = uni.getStorageSync('endType')
			this.orderNo = options.orderNo
			if(options.parentId){
				this.parentId=options.parentId
			}
			this.getOrderDetail()
		},
		methods: {
			submit() {
				const _this = this;
				if (!_this.reason) {
					uni.showToast({
						title: '请输入理由',
						icon: 'none'
					})
					return
				}
				uni.showModal({
					title: '温馨提示',
					content: '确定要提交吗?',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title:'加载中'
							})
							api.appeal.saveInfo({
								orderNo:_this.orderNo,
								reason:_this.reason,
								parentId:_this.parentId,
								title:'',
								workerId:_this.endType==0?_this.workerInfo.id:-1,
								workerName:_this.endType==0?_this.workerInfo.workerName:'',
								workerTelephone:_this.endType==0?_this.workerInfo.workerTelephone:'',
								workerTelephone1:_this.endType==0?_this.workerInfo.workerTelephone1:'',
								type:_this.parentId==0?0:1,
								status:_this.parentId==0?0:5,
								endType:_this.endType,
								infoType:0,
								userId:_this.endType==1?_this.myInfo.id:-1,
								userName:_this.endType==1?_this.myInfo.name:'',
								userPhone:_this.endType==1?_this.myInfo.phone:'',
								pic1:_this.imagesUrls.length>0?_this.imagesUrls[0]:'',
								pic2:_this.imagesUrls.length>1?_this.imagesUrls[1]:'',
								pic3:_this.imagesUrls.length>2?_this.imagesUrls[2]:'',
								pic4:_this.imagesUrls.length>3?_this.imagesUrls[3]:'',
								pic5:_this.imagesUrls.length>4?_this.imagesUrls[4]:'',
							}).then(res=>{
								uni.hideLoading()
								uni.showToast({
									title:_this.parentId==0?'申诉成功':'补充成功',
									icon:'none'
								})
								setTimeout(() => {
									uni.navigateBack({
										delta:1
									})
								}, 1600)
							}).catch(e=>{
								uni.hideLoading()
							})
						}
					},
				})
			},
			previewImage(item, index) {
				const _this = this;
				uni.previewImage({
					urls: _this.previewImages,
					current:index
				});
			},
			delImage(index) {
				const _this = this;
				_this.previewImages.splice(index, 1)
				_this.imagesUrls.splice(index, 1)
			},
			uploadImage() {
				const _this = this;
				uni.chooseImage({
					count: _this.limit - _this.imagesUrls.length,
					success(res) {
						uni.showLoading({
							title: '加载中'
						})
						const tempFilePaths = res.tempFilePaths;
						const tempFilePathsLength = res.tempFilePaths.length
						var upLoadNum = 0
						for (var i = 0; i < tempFilePathsLength; i++) {
							var item = res.tempFilePaths[i]
							uni.uploadFile({
								url: global.baseUri + global.path + 'upload/uploadPic',
								header:{
									'token': uni.getStorageSync("token"),
								},
								filePath: item,
								name: 'file',
								formData: {
									'type': 7
								},
								success(data) {
									upLoadNum++
									if (upLoadNum == tempFilePathsLength) {
										uni.hideLoading()
									}
									var data = JSON.parse(data.data);
									if (data.code == 0) {
										_this.imagesUrls.push(data.data)
										_this.previewImages.push(_this.tools.getImagePath(data.data))
									} else {
										uni.showToast({
											title: '上传图片失败!',
											icon: 'none'
										})
									}
								},
								fail() {
									uni.hideLoading();
									uni.showToast({
										title: '上传图片失败!',
										icon: 'none'
									})
								}
							})
						}
					}
				})
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
					} else {
						this.orderDetail = null
					}
					uni.hideLoading()
				}).catch(e => {
					uni.hideLoading()
				})
			},
		}
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
	.item-wrap {
		width: 33.333%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 10px;
	}

	.image-wrap {
		width: 100px;
		height: 100px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
