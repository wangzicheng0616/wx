<template>
	<view class="order-detail">
		<!-- 图片识别 -->
		<view class="border-radius bg-main margin padding-lr-sm padding-tb-sm">
			<view v-if="!identityPicture" class="card-item  padding-tb-sm dflex-c  dflex-flow-c "
				@click="chooseImage('identityPicture')">
				<image class="item" src='../../../static/images/user/front.png' />
				<text class="ft-dark">点击上传身份证正面图片</text>
			</view>
			<view v-else class="card-item  padding-tb-sm dflex-c pos-r  margin-tb-sm">
				<image class="item" :src="tools.getImagePath(identityPicture)"
					@tap="preImage(tools.getImagePath(identityPicture))" />
				<view class="del pos-a bg-main dflex-c border-radius-c iconfont iconlajitong-01 ft-dark"
					@tap.stop="identityPicture=''" v-if="workerInfo.state==0||workerInfo.state==1||workerInfo.state==3"></view>
			</view>
			<view v-if="!identityPictureBack" class="card-item  padding-tb-sm dflex-c  dflex-flow-c margin-tb-sm"
				@click="chooseImage('identityPictureBack')">
				<image class="item" src="../../../static/images/user/back.png" />
				<text class="ft-dark">点击上传身份证反面图片</text>
			</view>
			<view v-else class="card-item  padding-tb-sm dflex-c pos-r  margin-tb-sm">
				<image class="item " :src="tools.getImagePath(identityPictureBack)"
					@tap="preImage(tools.getImagePath(identityPictureBack))" />
				<view class="del pos-a bg-main dflex-c border-radius-c iconfont iconlajitong-01 ft-dark"
					@tap.stop="identityPictureBack=''" v-if="workerInfo.state==0||workerInfo.state==1||workerInfo.state==3"></view>
			</view>
			<view class="open-shop-wrap" style="justify-content: space-between;padding-left: 0;padding-right: 0;">
				<view class="open-shop-item">
					<view style="margin-left:6px;">身份证号
					</view>
				</view>
				<input type="idcard" v-model="identityNumber" placeholder="请输入身份证号" maxlength="25"
					style="flex: 1;width: 0;text-align: right;" :disabled="workerInfo.state==2" />
			</view>
			<!-- <view class="open-shop-wrap" style="justify-content: space-between;padding-left: 0;padding-right: 0;">
				<view class="open-shop-item">
					<view style="margin-left:6px;">身份证名
					</view>
				</view>
				<input v-model="identityName" placeholder="请输入身份证名" maxlength="20"
					style="flex: 1;width: 0;text-align: right;"  :disabled="workerInfo.state==1||workerInfo.state==2"/>
			</view> -->
			<button type="primary" v-if="!workerInfo.state||workerInfo.state==0||workerInfo.state==1||workerInfo.state==3"
				:disabled="!identityPicture || !identityPictureBack || !identityNumber"
				class="confirm no-border border-radius-lg fs margin-bt-sm" @click="identifyHandle">保存</button>
		</view>
		<view class="safe-area-inset-bottom" style="height: 200rpx;"></view>

		<!-- 底部操作区 -->
		<view class="oper-area dflex-b padding-right padding-left-sm safe-area-inset-bottom">
			<view class="dflex">
				<view class="btn-area dflex dflex-flow-c" @click="tohome">
					<text class="iconfont iconshouye-1"></text>
					<text>首页</text>
				</view>
			</view>

			<view class="dflex-e">
				<view class="dflex">
					<button class="action-btn main-btn" @click="back">返回</button>
				</view>
			</view>
		</view>
		<u-top-tips ref="uTips"></u-top-tips>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	import global from '@/utils/global.js'
	import {
		mapState
	} from 'vuex';
	export default {
		components: {

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
				identityPicture: '',
				identityPictureBack: '',
				identityName: '',
				identityNumber: '',
			};
		},
		onLoad(res) {
			this.getWorkerInfo()
		},
		methods: {
			extractBirthday(idCard) {
				// 身份证号格式正则：15位或18位
				const idCardRegex = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;

				// 校验身份证号格式
				if (!idCardRegex.test(idCard)) {
					return {
						valid: false,
						message: '身份证号格式不正确'
					};
				}

				// 根据身份证号长度判断
				let birthday;
				if (idCard.length === 15) {
					// 15位身份证：19xx年
					birthday = '19' + idCard.substr(6, 2) + '-' +
						idCard.substr(8, 2) + '-' +
						idCard.substr(10, 2);
				} else {
					// 18位身份证
					birthday = idCard.substr(6, 4) + '-' +
						idCard.substr(10, 2) + '-' +
						idCard.substr(12, 2);
				}

				// 校验生日格式是否有效
				const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
				if (!dateRegex.test(birthday)) {
					return {
						valid: false,
						message: '生日格式不合法'
					};
				}

				// 进一步校验日期是否有效
				const date = new Date(birthday);
				if (isNaN(date.getTime()) ||
					date.getFullYear() !== parseInt(birthday.substr(0, 4)) ||
					date.getMonth() + 1 !== parseInt(birthday.substr(5, 2)) ||
					date.getDate() !== parseInt(birthday.substr(8, 2))) {
					return {
						valid: false,
						message: '生日日期不合法'
					};
				}

				// 18位身份证校验码验证
				if (idCard.length === 18) {
					const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
					const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
					let sum = 0;
					for (let i = 0; i < 17; i++) {
						sum += parseInt(idCard[i]) * weights[i];
					}
					const mod = sum % 11;
					if (idCard[17].toUpperCase() !== checkCodes[mod]) {
						return {
							valid: false,
							message: '身份证校验码错误'
						};
					}
				}

				return {
					valid: true,
					birthday
				};
			},
			getWorkerInfo() {
				uni.showLoading({
					title: '加载中'
				})
				api.worker.getInfo().then(res => {
					if (res.data) {
						if (res.data.identityPicture) {
							this.identityPicture = res.data.identityPicture
						}
						if (res.data.identityPictureBack) {
							this.identityPictureBack = res.data.identityPictureBack
						}
						if (res.data.workerName) {
							this.identityName = res.data.workerName
						}
						if (res.data.identityNumber) {
							this.identityNumber = res.data.identityNumber
						}
						// this.$store.commit("updateWorkerInfo", res.data)
					}
					uni.hideLoading()
				}).catch(e => {
					uni.hideLoading()
				})
			},
			// 首页
			tohome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			chooseImage(flag) {
				let _this = this;

				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success(res) {
						uni.showLoading({
							title: '加载中'
						})
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: global.baseUri + global.path + 'upload/uploadPic',
							filePath: tempFilePaths[0],
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
									if (flag == 'identityPicture') {
										_this.identityPicture = data.data
									} else {
										_this.identityPictureBack = data.data
									}
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
					}
				})

			},
			preImage(url) {
				uni.previewImage({
					current: url,
					urls: [url],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {

						},
						fail: function(err) {

						}
					}
				});
			},
			// 	认证
			identifyHandle() {
				var validData = this.extractBirthday(this.identityNumber)
				if (!validData.valid) {
					_this.$refs.uTips.show({
						title: '请输入正确的身份证号',
						type: 'error',
						duration: '2300'
					})
					return
				}
				if (this.workerInfo.id) {
					api.worker.updateIdentityById({
						id: this.workerInfo.id,
						identityPicture: this.identityPicture,
						identityPictureBack: this.identityPictureBack,
						identityNumber: this.identityNumber,
						identityName: this.identityName,
					}).then(res => {
						this.$store.commit("updateWorkerInfo", {
							identityPicture: this.identityPicture,
							identityPictureBack: this.identityPictureBack,
							identityNumber: this.identityNumber,
							identityName: this.identityName,
							birthday: validData.birthday
						})
						this.back()
					})
				} else {
					this.$store.commit("updateWorkerInfo", {
						identityPicture: this.identityPicture,
						identityPictureBack: this.identityPictureBack,
						identityNumber: this.identityNumber,
						identityName: this.identityName,
						birthday: validData.birthday
					})
					this.back()
				}
			},
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
	}

	.item {
		width: 500rpx;
		height: 300rpx;
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

	.card-item {
		border-radius: 10rpx;
		border: 2rpx #ccc dashed;
	}

	.del {
		top: -20rpx;
		right: -10rpx;
		width: 50rpx;
		height: 50rpx;
		z-index: 99;
		box-shadow: 0px 3px 5px #f0f0f0;
	}

	.confirm {
		padding: 0 40rpx;
		font-size: $font-base;
		background: $uni-color-primary;
		box-shadow: 1px 2px 5px rgba(129, 199, 31, 0.72)
	}

	.tip {
		font-size: $font-sm;
		color: #c0c0c0;
	}
</style>