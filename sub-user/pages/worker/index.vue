<template>
	<view style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;background: #f5f5f5;">
		<view style="height: 100%;display: flex;flex-direction: column;">
			<view style="flex: 1;height: 0;">
				<scroll-view scroll-y style="height: 100%;">
					<view class="container margin-lr">
						<view class="border-radius margin-top-sm bg-main">
							<view class="open-shop-wrap" style="justify-content: space-between;">
								<view class="open-shop-item">
									<view style="margin-left:6px;">认证状态
									</view>
								</view>
								<view style="font-weight: bold;">
									<text v-if="workerInfo.state==1" style="color: #f9ae3d;">认证中</text>
									<text v-else-if="workerInfo.state==2" style="color: #82C91E;">认证完成</text>
									<text v-else-if="workerInfo.state==3" style="color: #f56c6c;">认证驳回</text>
									<text v-else style="color: #3c9cff;">未认证</text>
								</view>
							</view>
							<view class="open-shop-wrap" style="justify-content: space-between;"
								v-if="workerInfo.state==3&&workerInfo.reason">
								<view class="open-shop-item">
									<view style="margin-left:6px;">驳回理由
									</view>
								</view>
								<view style="font-weight: bold;">
									{{workerInfo.reason}}
								</view>
							</view>
						</view>

						<view class="border-radius margin-top-sm bg-main">
							<view
								style="font-size: 24rpx;border-left: 8rpx solid #82C91E;padding:4rpx 10rpx;margin: 10rpx;color:#333;font-weight: bold;">
								基础信息</view>
							<view class="open-shop-wrap" style="justify-content: space-between;">
								<view class="open-shop-item">
									<view style="margin-left:6px;">真实姓名
										<text style="color: #ff0000;margin: 0 4rpx;">*</text>
									</view>
								</view>
								<input v-model="workerInfo.workerName" placeholder="请输入真实姓名" maxlength="20"
									style="flex: 1;width: 0;text-align: right;" />
							</view>

							<view class="open-shop-wrap bg-disabled" style="justify-content: space-between;">
								<view class="open-shop-item">
									<view style="margin-left:6px;">手机号
										<text style="color: #ff0000;margin: 0 4rpx;">*</text>
									</view>
								</view>
								<input v-model="workerInfo.workerTelephone" placeholder="请输入手机号" maxlength="11"
									style="flex: 1;width: 0;text-align: right;" type="tel" :disabled="true" />
							</view>
							<view class="open-shop-wrap" style="justify-content: space-between;">
								<view class="open-shop-item">
									<view style="margin-left:6px;">备用手机号
									</view>
								</view>
								<input v-model="workerInfo.workerTelephone1" placeholder="请输入备用手机号" maxlength="11"
									style="flex: 1;width: 0;text-align: right;" type="tel" />
							</view>
							<view class="open-shop-wrap" style="justify-content: space-between;">
								<view class="open-shop-item">
									<view style="margin-left:6px;">生日
									</view>
								</view>
								<view @click="open" style="display:flex;align-items: center;flex:1;width:0">
									<view style="flex: 1;width: 0;text-align: right;">
										<text v-if="workerInfo.birthday">{{workerInfo.birthday}}</text>
										<text v-else style="color: #ff0000;font-weight: bold;">未设置</text>
									</view>
									<view class="iconfont fs-sm iconjiantou-01"></view>
								</view>
							</view>
							<view class="open-shop-wrap" style="justify-content: space-between;">
								<view class="open-shop-item">
									<view style="margin-left:6px;">家庭地址
									</view>
								</view>
								<textarea v-model="workerInfo.workerAddress" :auto-height="true" placeholder="请输入家庭地址"
									maxlength="200" style="flex: 1;width: 0;text-align: right;" />
							</view>
						</view>

						<view class="border-radius margin-top-sm bg-main">
							<view
								style="font-size: 24rpx;border-left: 8rpx solid #3c9cff;padding:4rpx 10rpx;margin: 10rpx;color:#333;font-weight: bold;">
								专业信息</view>
							<view @click="goTag(false)" class="open-shop-wrap" style="justify-content: space-between;">
								<view class="open-shop-item">
									<view style="margin-left:6px;">技能
									</view>
								</view>
								<view style="display:flex;align-items: center;flex:1;width:0">
									<view style="flex: 1;width: 0;text-align: right;">
										<text v-if="workerInfo.tag">{{workerInfo.tag}}</text>
										<text v-else style="color: #ff0000;font-weight: bold;">未设置</text>
									</view>
									<view class="iconfont fs-sm iconjiantou-01"></view>
								</view>
							</view>

							<!-- <view class="open-shop-wrap" style="justify-content: space-between;">
								<view class="open-shop-item">
									<view style="margin-left:6px;">是否有资质
									</view>
								</view>
								<u-radio-group v-model="workerInfo.qualification" active-color="#82C91E" :disabled="workerInfo.state==1||workerInfo.state==2">
									<u-radio :label-disabled="false" v-for="(item, index) in list" :key="index"
										:name="item.name">
										{{item.name}}
									</u-radio>
								</u-radio-group>
							</view> -->
							<!-- <view class="open-shop-wrap" style="justify-content: space-between;">
								<view class="open-shop-item">
									<view style="margin-left:6px;">价格区间
									</view>
								</view>
								<view style="display: flex;align-items: center;">
									<uni-number-box v-model="workerInfo.beginPriceRange" :min="0" :max="999999999" :disabled="workerInfo.state==1||workerInfo.state==2"></uni-number-box>
									<view style="margin: 0 10rpx;">-</view>
									<uni-number-box v-model="workerInfo.endPriceRange" :min="0" :max="999999999" :disabled="workerInfo.state==1||workerInfo.state==2"></uni-number-box>
								</view>
							</view> -->
							<view @click="goProvince(false)" class="open-shop-wrap"
								style="justify-content: space-between;">
								<view class="open-shop-item">
									<view style="margin-left:6px;">服务区域
									</view>
								</view>
								<view style="display:flex;align-items: center;flex:1;width:0">
									<view style="flex: 1;width: 0;text-align: right;">
										<view v-if="workerInfo.serviceArea"
											style="display: flex;flex-direction: column;">
											<view v-for="(item,index) in workerInfo.serviceArea.split(' ')"
												:key="index">
												{{item}}
											</view>
										</view>
										<text v-else style="color: #ff0000;font-weight: bold;">未设置</text>
									</view>
									<view class="iconfont fs-sm iconjiantou-01"></view>
								</view>
							</view>
							<view class="open-shop-wrap" style="justify-content: space-between;">
								<view class="open-shop-item">
									<view style="margin-left:6px;">服务经验
									</view>
								</view>
								<textarea v-model="workerInfo.experience" :auto-height="true" placeholder="请输入服务经验"
									maxlength="200" style="flex: 1;width: 0;text-align: right;" />
							</view>
						</view>

						<view class="border-radius margin-top-sm bg-main">
							<view
								style="font-size: 24rpx;border-left: 8rpx solid #f9ae3d;padding:4rpx 10rpx;margin: 10rpx;color:#333;font-weight: bold;">
								身份信息</view>
							<view @click="changeHeadUrl(false)" class="open-shop-wrap"
								style="justify-content: space-between;">
								<view class="open-shop-item">
									<view style="margin-left:6px;">一寸照片
									</view>
								</view>
								<image v-if="workerInfo.headUrl" class="avatar"
									:src="tools.getImagePath(workerInfo.headUrl)"
									style="width: 36px;height: 36px;border-radius: 50%;"></image>
								<image v-else style="width: 36px;height: 36px;border-radius: 50%;" class="avatar"
									src="../../../static/images/logo.png">
								</image>
							</view>

							<view @click="goIdentify()" class="open-shop-wrap" style="justify-content: space-between;">
								<view class="open-shop-item">
									<view style="margin-left:6px;">身份证信息
									</view>
									<text style="color: #ff0000;margin: 0 4rpx;">*</text>
								</view>
								<view style="display: flex;align-items: center;">
									<view style="color: #ff0000;font-weight: bold;"
										v-if="!workerInfo.identityPicture||!workerInfo.identityPictureBack||!workerInfo.identityNumber">
										未上传
									</view>
									<view style="color: #82C91E; font-weight: bold;"
										v-if="workerInfo.identityPicture&&workerInfo.identityPictureBack&&workerInfo.identityNumber">
										<view v-if="workerInfo.state==2">
											<view>已认证({{workerInfo.workerName}})</view>
										</view>
										<view v-else>
											已上传
										</view>
									</view>
									<view class="iconfont fs-sm iconjiantou-01"></view>
								</view>
							</view>
							<!-- <view class="open-shop-wrap" style="justify-content: space-between;">
								<view class="open-shop-item">
									<view style="margin-left:6px;">招揽人
									</view>
								</view>
								<input v-model="workerInfo.operaUser" placeholder="请输入招揽人" maxlength="20"
									style="flex: 1;width: 0;text-align: right;" :disabled="workerInfo.state==1||workerInfo.state==2"/>
							</view> -->
						</view>

						<view class="border-radius margin-top-sm bg-main">
							<view
								style="font-size: 24rpx;border-left: 8rpx solid #f56c6c;padding:4rpx 10rpx;margin: 10rpx;color:#333;font-weight: bold;">
								收款信息</view>
							<view class="open-shop-wrap" style="justify-content: space-between;">
								<view class="open-shop-item">
									<view style="margin-left:6px;">默认支付
									</view>
								</view>
								<u-radio-group v-model="workerInfo.defaultPay" active-color="#82C91E">
									<u-radio :label-disabled="false" v-for="(item, index) in list" :key="index"
										:name="item.name">
										{{item.label}}
									</u-radio>
								</u-radio-group>
							</view>
							<view class="open-shop-wrap" style="justify-content: space-between;">
								<view class="open-shop-item">
									<view style="margin-left:6px;">微信收款账号
									</view>
								</view>
								<input v-model="workerInfo.payWxpay" placeholder="请输入微信收款账号" maxlength="100"
									style="flex: 1;width: 0;text-align: right;" />
							</view>

							<view class="open-shop-wrap" style="justify-content: space-between;">
								<view class="open-shop-item">
									<view style="margin-left:6px;">支付宝收款账号
									</view>
								</view>
								<input v-model="workerInfo.payAlipay" placeholder="请输入支付宝收款账号" maxlength="100"
									style="flex: 1;width: 0;text-align: right;" />
							</view>
							<view class="open-shop-wrap" style="justify-content: space-between;">
								<view class="open-shop-item">
									<view style="margin-left:6px;">银行卡号
									</view>
								</view>
								<input v-model="workerInfo.payAccount" placeholder="请输入银行卡号" maxlength="100"
									style="flex: 1;width: 0;text-align: right;" />
							</view>
							<view class="open-shop-wrap" style="justify-content: space-between;">
								<view class="open-shop-item">
									<view style="margin-left:6px;">开户行名称
									</view>
								</view>
								<input v-model="workerInfo.payBank" placeholder="请输入开户行名称" maxlength="100"
									style="flex: 1;width: 0;text-align: right;" />
							</view>
							<view class="open-shop-wrap" style="justify-content: space-between;">
								<view class="open-shop-item">
									<view style="margin-left:6px;">持卡人姓名
									</view>
								</view>
								<textarea v-model="workerInfo.payBankAddr" :auto-height="true" placeholder="请输入持卡人姓名"
									maxlength="100" style="flex: 1;width: 0;text-align: right;" />
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view style="display: flex;align-items: center;justify-content: center;padding: 40rpx 20rpx;">
				<view style="width: 100%;padding: 20rpx 0;" @click="submit()"
					class="border-radius-big bg-base dflex-c padding-lr">
					<view v-if="!workerInfo.state||workerInfo.state==0||workerInfo.state==3">提交认证</view>
					<view v-else>修改信息</view>
				</view>
			</view>
		</view>
		<u-top-tips ref="uTips"></u-top-tips>
		<uni-calendar ref="calendar" :insert="false" @confirm="confirm" />
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import api from '@/common/api.js'
	import global from '@/utils/global.js'
	import local from '@/utils/location.json'
	export default {
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
				list: [
					{
						name: 'WXPAY',
						label:'微信'
					},
					{
						name: 'AIPAY',
						label:'支付宝'
					},
					{
						name: 'CARDPAY',
						label:'银行卡'
					},
				],
				localdata: [],
				addressCode: ''
			}
		},
		onLoad() {
			this.localdata = local
			this.getWorkerInfo()
		},
		onUnload() {
			this.$store.commit("resetWorkerInfo")
		},
		methods: {
			open() {
				this.$refs.calendar.open();
			},
			confirm(e) {
				this.$set(this.workerInfo,'birthday',e.fulldate)
			},
			submit() {
				const _this = this;
				var isNumber = /^[+]{0,1}(\d+)$/;
				if (!_this.workerInfo.workerName) {
					_this.$refs.uTips.show({
						title: '请输入真实姓名',
						type: 'error',
						duration: '2300'
					})
					return
				}
				if (!_this.workerInfo.workerTelephone) {
					_this.$refs.uTips.show({
						title: '请输入手机号',
						type: 'error',
						duration: '2300'
					})
					return
				}
				if (_this.workerInfo.workerTelephone.length < 11 || !isNumber.test(_this.workerInfo.workerTelephone)) {
					_this.$refs.uTips.show({
						title: '请输入正确手机号',
						type: 'error',
						duration: '2300'
					})
					return;
				}
				if (!_this.workerInfo.identityPicture || !_this.workerInfo.identityPictureBack || !_this.workerInfo
					.identityNumber) {
					_this.$refs.uTips.show({
						title: '请上传身份证信息',
						type: 'error',
						duration: '2300'
					})
					return
				}
				// if (!_this.workerInfo.payAlipay) {
				// 	_this.$refs.uTips.show({
				// 		title: '请输入支付宝收款账号',
				// 		type: 'error',
				// 		duration: '2300'
				// 	})
				// 	return
				// }
				// if (!_this.workerInfo.payAccount) {
				// 	_this.$refs.uTips.show({
				// 		title: '请输入银行卡号',
				// 		type: 'error',
				// 		duration: '2300'
				// 	})
				// 	return
				// }
				var parmas = _this.workerInfo
				if (!parmas.defaultPay) {
					parmas.defaultPay = 'WXPAY'
				}
				if (!parmas.beginPriceRange) {
					parmas.beginPriceRange = 0
				}
				if (!parmas.endPriceRange) {
					parmas.endPriceRange = 0
				}
				// if (parmas.beginPriceRange > parmas.endPriceRange) {
				// 	_this.$refs.uTips.show({
				// 		title: '最小价格区间不应小于最大价格区间',
				// 		type: 'error',
				// 		duration: '2300'
				// 	})
				// 	return
				// }
				parmas.priceRange = parmas.beginPriceRange + '-' + parmas.endPriceRange
				parmas.source = 0
				parmas.identityName = parmas.workerName
				uni.showModal({
					title: '温馨提示',
					content: '确定要提交吗?',
					success: function(res) {
						if (res.confirm) {
							if (parmas.id) {
								if (parmas.state == 0 || parmas.state == 3) {
									uni.showLoading({
										title: '加载中'
									})
									api.worker.updateInfo(parmas).then(res => {
										uni.hideLoading()
										_this.$refs.uTips.show({
											title: '提交认证成功',
											type: 'success',
											duration: '2300'
										})
										api.worker.updateStateById({
											id: parmas.id,
											state: 1
										}).then(res => {
											_this.getWorkerInfo()
										})
										// if (parmas.state == 3) {
										// 	api.worker.updateStateById({
										// 		id: parmas.id,
										// 		status: 0
										// 	}).then(res => {
										// 		_this.getWorkerInfo()
										// 	})
										// } else {
										// 	_this.getWorkerInfo()
										// }
									}).catch(e => {
										uni.hideLoading()
									})

								} else {
									uni.showLoading({
										title: '加载中'
									})
									api.worker.updateInfo(parmas).then(res => {
										uni.hideLoading()
										_this.$refs.uTips.show({
											title: '修改成功',
											type: 'success',
											duration: '2300'
										})
										_this.getWorkerInfo()
									}).catch(e => {
										_this.$refs.uTips.show({
											title: e.message,
											type: 'error',
											duration: '2300'
										})
									})
								}
							} else {
								uni.showLoading({
									title: '加载中'
								})
								api.worker.saveInfo(parmas).then(res => {
									uni.hideLoading()
									_this.$refs.uTips.show({
										title: '提交认证成功',
										type: 'success',
										duration: '2300'
									})
									api.worker.updateStateById({
										id: res.data.id,
										state: 1
									}).then(res => {
										_this.getWorkerInfo()
									})
								}).catch(e => {
									uni.hideLoading()
									_this.$refs.uTips.show({
										title: e.message,
										type: 'error',
										duration: '2300'
									})
								})
							}
						} else if (res.cancel) {

						}
					}
				});
			},
			getWorkerInfo() {
				uni.showLoading({
					title: '加载中'
				})
				api.worker.getInfo().then(res => {
					if (res.data) {
						if (res.data.priceRange) {
							this.$set(res.data, 'beginPriceRange', res.data.priceRange.split('-')[0])
							this.$set(res.data, 'endPriceRange', res.data.priceRange.split('-')[1])
						}
						if (res.data.state == 2 && !res.data.userId) {
							this.$set(res.data, 'state', 0)
						}
						if(!res.data.defaultPay){
							res.data.defaultPay='WXPAY'
						}
						this.$store.commit("updateWorkerInfo", res.data)
					} else {
						this.$store.commit('updateWorkerInfo', {
							qualification: '否',
							workerTelephone: this.myInfo.phone,
							beginPriceRange: 0,
							endPriceRange: 0,
							defaultPay:'WXPAY'
						})
					}
					uni.hideLoading()
				}).catch(e => {
					uni.hideLoading()
				})
			},
			updateWorkerInfo(data) {
				this.$store.commit("updateWorkerInfo", data)
			},
			changeHeadUrl(isEdit) {
				const _this = this;
				uni.chooseImage({
					count: 1,
					success(res) {
						uni.showLoading({
							title: '加载中'
						})
						uni.uploadFile({
							url: global.baseUri + global.path + 'upload/uploadPic',
							filePath: res.tempFilePaths[0],
							name: 'file',
							header: {
								'token': uni.getStorageSync("token"),
							},
							formData: {
								'type': 3
							},
							success(res) {
								var data = JSON.parse(res.data);
								if (data.code == 0) {
									_this.updateWorkerInfo({
										headUrl: data.data
									})
									uni.hideLoading()
								} else {
									uni.showToast({
										title: '上传图片失败',
										icon: 'none'
									})
								}
							},
							fail() {
								uni.hideLoading()
								uni.showToast({
									title: '上传图片失败',
									icon: 'none'
								})
							}
						})
					},
					fail(e) {
						console.log(e)
					}
				})
			},
			goTag(isEdit) {
				uni.navigateTo({
					url: '/sub-user/pages/worker/setTag'
				})
			},
			goIdentify() {
				uni.navigateTo({
					url: '/sub-user/pages/worker/identify'
				})
			},
			goProvince(isEdit) {
				uni.navigateTo({
					url: '/sub-user/pages/worker/province'
				})
			},
		}
	}
</script>

<style>
	page {
		background: $page-color-base;
	}
</style>