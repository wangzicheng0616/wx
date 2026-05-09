<template>
	<view v-if="userLevel"
		style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;display: flex;flex-direction: column;">
		<view style="flex: 1;height: 0;padding: 10px 0;display: flex;align-items: center;justify-content: center;">
			<image style="height: 100%;" mode="heightFix" :src="tools.getImagePath(POSTER_BG_IMAGE)"
				v-if="POSTER_BG_IMAGE"></image>
		</view>

		<view v-if="userLevel.number!='ZCHY'"
			style="display: flex;align-items: center;justify-content: center;padding: 20px;">
			<view @click="savePoster" class="btn-bg"
				style="border-radius: 20px;padding: 10px 0 10px 0;color: #ffffff;display: flex;align-items: center;justify-content: center;width: 100%;">
				生成海报
			</view>
		</view>

		<!-- 画布 -->
		<view class="hideCanvasView">
			<canvas class="hideCanvas" id="default_PosterCanvasId" canvas-id="default_PosterCanvasId"
				:style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
		</view>

		<!-- 海报 -->
		<QSPopup ref="popup" :tapMaskHide="false">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px" style="padding: 0;">
					<image :src="posterImage || ''" mode="widthFix" class="posterImage" style="border-radius: 6px;">
					</image>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<view class="marginTop2vh" style="display: flex;align-items: center;justify-content: space-between;">
					<view class="save-btn btn-bg font-size-14" @click="saveImage()">保存图片</view>
					<view class="save-btn font-size-14" style="background: #ffffff;color: #303133;" @click="hideBill()">
						关闭</view>
				</view>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<view class="marginTop2vh" style="display: flex;align-items: center;justify-content: space-between;">
					<view class="save-btn-app save-btn-wechat" @click="wechatShare()">微信分享</view>
					<view class="save-btn-app btn-bg" @click="saveImage()">保存图片</view>
					<view class="save-btn-app font-size-14" style="background: #ffffff;color: #303133;" @click="hideBill()">
						关闭</view>
				</view>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view style="color: white;text-align: center;margin-top: 10px;">
					<view>长按识别或保存海报</view>
					<view style="margin-top: 10px;" @click="hideBill">
						<uni-icons type="close" size="20" color="#ffffff"></uni-icons>
					</view>
				</view>
				<!-- #endif -->
			</view>
		</QSPopup>
	</view>
</template>

<script>
	import {
		getSharePoster
	} from '@/utils/QS-SharePoster/QS-SharePoster.js';
	import QSPopup from '../../components/QS-popup/QS-popup.vue';
	import api from '@/common/api.js'
	import global from '../../utils/global.js'
	export default {
		components: {
			QSPopup
		},
		data() {
			return {
				httpImageUrl: this.httpImageUrl,
				POSTER_BG_IMAGE: '',
				headerImage: '',
				userInfo: null,
				codeUrl: '',
				posterImage: '',
				canvasId: 'default_PosterCanvasId',
				count: 0,
				poster: {},
				miniCode: '',
				defaultHeadImageUrl: '',
				userLevel: null,
				showWechatShare:false
			}
		},
		onLoad() {
			const _this = this;
			_this.getUserInfo();
			_this.getGlobleInfo();
			//#ifdef H5
			_this.setWeChatShare('', '', '');
			//#endif
			_this.defaultHeadImageUrl = global.imageUri + 'upload_file/uploadfile/static/icon_person.png'
		},
		//#ifdef MP-WEIXIN
		onShareAppMessage(res) {
			const _this = this;
			return _this.getMiniShareObj('', '', '')
		},
		//#endif
		methods: {
			// #ifdef APP-PLUS
			//微信分享
			wechatShare(){
				this.showWechatShare=true
			},
			share(scene){
				const _this=this;
				uni.share({
					provider: "weixin",
					scene: scene,
					type: 2,
					imageUrl: _this.posterImage,
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
						_this.showWechatShare=false
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			// #endif
			getUserLevel() {
				const _this = this;
				api.user.getUserLevel().then(res => {
					if (res.code == 0 && res.data) {
						if (res.data.userLevel) {
							_this.userLevel = res.data.userLevel
						}
					}
				}).catch(e => {})
			},
			async savePoster() {
				const _this = this;
				uni.showLoading({
					title: '海报生成中'
				})
				if (_this.posterImage) {
					uni.hideLoading();
					this.$refs.popup.show()
				} else {
					//#ifdef H5 || APP-PLUS
					try {
						this.count++;
						const d = await getSharePoster({
							_this: _this, //若在组件中使用 必传
							canvasType: '2d',
							type: 'testShareType',
							formData: {
								//访问接口获取背景图携带自定义数据

							},
							posterCanvasId: _this.canvasId, //canvasId
							delayTimeScale: 20, //延时系数
							background: {
								height: 10,
								width: 10,
								backgroundColor: '#ffffff'
							},
							setCanvasWH({
								bgObj
							}) {
								_this.poster = bgObj
							},
							drawArray({
								bgObj,
								type,
								bgScale,
								setBgObj,
								getBgObj
							}) {

								return [{
										type: 'image',
										id: 'productImage',
										url: _this.tools.getImagePath(_this.POSTER_BG_IMAGE),
										dx: 0,
										dy: 0,
										serialNum: 0,
										infoCallBack(imageInfo) {
											let width;
											let height;
											if (imageInfo.width > imageInfo.height) {
												width = imageInfo.width > 700 ? 700 : imageInfo.width;
												height = width / imageInfo.width * imageInfo.height;
											} else {
												height = imageInfo.height > 700 ? 700 : imageInfo.height;
												width = height / imageInfo.height * imageInfo.width;
											}
											if (width < 500) {
												width = 500;
												height = width / imageInfo.width * imageInfo.height;
											}
											let addHeight = height * .2;
											if (addHeight < 150) addHeight = 150;
											if (addHeight > 250) addHeight = 250;
											setBgObj({
												width: width,
												height: height + addHeight
											});
											return {
												// roundRectSet: { // 圆角矩形
												// 	r: imageInfo.width * .02
												// },
												dWidth: width,
												dHeight: height
											}
										}
									},
									{
										type: 'image',
										url: _this.tools.getImagePath(_this.userInfo.headImage ? _this
											.userInfo.headImage : _this.defaultHeadImageUrl),
										serialNum: 4,
										allInfoCallback({
											drawArray
										}) {
											const productImage = drawArray.find(item => item.id ===
												'productImage')
											const addHeight = getBgObj().height - productImage.dHeight;
											const widthSize = getBgObj().width * .4;
											const heightSize = addHeight;
											const countSize = widthSize > heightSize ? heightSize :
												widthSize;
											const size = countSize * .8;
											return {
												dWidth: 86,
												dHeight: 86,
												circleSet: {
													r: 43
												},
												dx: getBgObj().width * .05,
												dy: getBgObj().height - countSize * .9
											}
										}
									},
									{
										type: 'text',
										text: '推荐码:',
										color: '#606266',
										serialNum: 3,
										id: 'text1',
										allInfoCallback({
											drawArray
										}) {
											const productImage = drawArray.find(item => item.id ===
												'productImage')
											const widthSize = getBgObj().width * .4;
											const heightSize = addHeight;
											const addHeight = getBgObj().height - productImage.dHeight;
											const countSize = widthSize > heightSize ? heightSize :
												widthSize;
											return {
												size: getBgObj().width * 0.05,
												lineFeed: {
													maxWidth: getBgObj().width * 0.5,
													lineNum: 1
												},
												dx: getBgObj().width * .05 + 90,
												dy: productImage.dHeight + 43,
											}
										}
									},
									{
										type: 'text',
										text: _this.userInfo.key5,
										color: '#303313',
										serialNum: 3,
										id: 'text1',
										allInfoCallback({
											drawArray
										}) {
											const productImage = drawArray.find(item => item.id ===
												'productImage')
											const widthSize = getBgObj().width * .4;
											const heightSize = addHeight;
											const addHeight = getBgObj().height - productImage.dHeight;
											const countSize = widthSize > heightSize ? heightSize :
												widthSize;
											return {
												size: getBgObj().width * 0.05,
												lineFeed: {
													maxWidth: getBgObj().width * 0.5,
													lineNum: 1
												},
												dx: getBgObj().width * .05 + 90,
												dy: productImage.dHeight + 83,
											}
										}
									},
									{
										type: 'text',
										text: _this.userInfo&&_this.userInfo.name ? _this.userInfo.name+
											'推荐给你' : '绿豆锁大师推荐给你',
										color: '#606266',
										serialNum: 3,
										id: 'text1',
										allInfoCallback({
											drawArray
										}) {
											const productImage = drawArray.find(item => item.id ===
												'productImage')
											const addHeight = getBgObj().height - productImage.dHeight;
											return {
												size: getBgObj().width * 0.05,
												lineFeed: {
													maxWidth: getBgObj().width * 0.5,
													lineNum: 1
												},
												dx: getBgObj().width * .05,
												dy: productImage.dHeight + addHeight * .8,
											}
										}
									},
									{
										type: 'qrcode',
										text: _this.codeUrl,
										serialNum: 4,
										allInfoCallback({
											drawArray
										}) {
											const productImage = drawArray.find(item => item.id ===
												'productImage')
											const addHeight = getBgObj().height - productImage.dHeight;
											const widthSize = getBgObj().width * .4;
											const heightSize = addHeight;
											const countSize = widthSize > heightSize ? heightSize :
												widthSize;
											const size = countSize * .8;
											return {
												size: size,
												dx: getBgObj().width - countSize * .95,
												dy: getBgObj().height - countSize * .9
											}
										}
									}
								]
							}
						})
						this.posterImage = d.poster.tempFilePath;
						uni.hideLoading();
						this.$refs.popup.show()
					} catch (e) {
						uni.hideLoading();
						uni.showToast({
							title: JSON.stringify(e),
							icon: 'none'
						})
					}
					//#endif
					//#ifdef MP-WEIXIN
					try {
						this.count++;
						const d = await getSharePoster({
							_this: _this, //若在组件中使用 必传
							canvasType: '2d',
							type: 'testShareType',
							formData: {
								//访问接口获取背景图携带自定义数据
							},
							posterCanvasId: _this.canvasId, //canvasId
							delayTimeScale: 20, //延时系数
							background: {
								height: 10,
								width: 10,
								backgroundColor: '#ffffff'
							},
							setCanvasWH({
								bgObj
							}) {
								_this.poster = bgObj
							},
							drawArray({
								bgObj,
								type,
								bgScale,
								setBgObj,
								getBgObj
							}) {
								return [{
										type: 'image',
										id: 'productImage',
										url: _this.tools.getImagePath(_this.POSTER_BG_IMAGE),
										dx: 0,
										dy: 0,
										serialNum: 0,
										infoCallBack(imageInfo) {
											let width;
											let height;
											console.log(imageInfo)
											if (imageInfo.width > imageInfo.height) {
												width = imageInfo.width > 700 ? 700 : imageInfo.width;
												height = width / imageInfo.width * imageInfo.height;
											} else {
												height = imageInfo.height > 700 ? 700 : imageInfo.height;
												width = height / imageInfo.height * imageInfo.width;
											}
											if (width < 500) {
												width = 500;
												height = width / imageInfo.width * imageInfo.height;
											}
											let addHeight = height * 0.2;
											if (addHeight < 150) addHeight = 150;
											if (addHeight > 250) addHeight = 250;
											setBgObj({
												width: width,
												height: height + 200
											});
											return {
												// roundRectSet: { // 圆角矩形
												// 	r: imageInfo.width * .02
												// },
												dWidth: width,
												dHeight: height
											}
										}
									},
									{
										type: 'image',
										url: _this.tools.getImagePath(_this.userInfo.headImage ? _this
											.userInfo.headImage : _this.defaultHeadImageUrl),
										serialNum: 4,
										allInfoCallback({
											drawArray
										}) {
											const productImage = drawArray.find(item => item.id ===
												'productImage')
											const addHeight = getBgObj().height - productImage.dHeight;
											const widthSize = getBgObj().width * .4;
											const heightSize = addHeight;
											const countSize = widthSize > heightSize ? heightSize :
												widthSize;
											const size = countSize * .8;
											return {
												dWidth: 86,
												dHeight: 86,
												circleSet: {
													r: 43
												},
												dx: getBgObj().width * .05,
												dy: getBgObj().height - countSize * .9
											}
										}
									},
									{
										type: 'text',
										text: '推荐码:',
										color: '#606266',
										serialNum: 3,
										id: 'text1',
										allInfoCallback({
											drawArray
										}) {
											const productImage = drawArray.find(item => item.id ===
												'productImage')
											const widthSize = getBgObj().width * .4;
											const heightSize = addHeight;
											const addHeight = getBgObj().height - productImage.dHeight;
											const countSize = widthSize > heightSize ? heightSize :
												widthSize;
											return {
												size: getBgObj().width * 0.05,
												lineFeed: {
													maxWidth: getBgObj().width * 0.5,
													lineNum: 1
												},
												dx: getBgObj().width * .05 + 90,
												dy: productImage.dHeight + 43,
											}
										}
									},
									{
										type: 'text',
										text: _this.userInfo.key5,
										color: '#303313',
										serialNum: 3,
										id: 'text1',
										allInfoCallback({
											drawArray
										}) {
											const productImage = drawArray.find(item => item.id ===
												'productImage')
											const widthSize = getBgObj().width * .4;
											const heightSize = addHeight;
											const addHeight = getBgObj().height - productImage.dHeight;
											const countSize = widthSize > heightSize ? heightSize :
												widthSize;
											return {
												size: getBgObj().width * 0.05,
												lineFeed: {
													maxWidth: getBgObj().width * 0.5,
													lineNum: 1
												},
												dx: getBgObj().width * .05 + 90,
												dy: productImage.dHeight + 83,
											}
										}
									},
									{
										type: 'text',
										text: _this.userInfo&&_this.userInfo.name ? _this.userInfo.name +
											'推荐给你' : '绿豆锁大师推荐给你',
										color: '#606266',
										serialNum: 3,
										id: 'text1',
										allInfoCallback({
											drawArray
										}) {
											const productImage = drawArray.find(item => item.id ===
												'productImage')
											const addHeight = getBgObj().height - productImage.dHeight;
											return {
												size: getBgObj().width * 0.05,
												lineFeed: {
													maxWidth: getBgObj().width * 0.5,
													lineNum: 1
												},
												dx: getBgObj().width * .05,
												dy: productImage.dHeight + addHeight * .75,
											}
										}
									},
									{
										type: 'image',
										url: _this.miniCode,
										serialNum: 4,
										allInfoCallback({
											drawArray
										}) {
											const productImage = drawArray.find(item => item.id ===
												'productImage')
											const addHeight = getBgObj().height - productImage.dHeight;
											const widthSize = getBgObj().width * .4;
											const heightSize = addHeight;
											const countSize = widthSize > heightSize ? heightSize :
												widthSize;
											const size = countSize * .8;
											return {
												dWidth: 150,
												dHeight: 150,
												dx: getBgObj().width - countSize * .95,
												dy: getBgObj().height - countSize * .9
											}
										}
									}
								]
							}
						})
						this.posterImage = d.poster.tempFilePath;
						uni.hideLoading();
						this.$refs.popup.show()
					} catch (e) {
						uni.hideLoading();
						uni.showToast({
							title: JSON.stringify(e),
							icon: 'none'
						})
					}
					//#endif
				}
			},
			hideBill() {
				this.$refs.popup.hide()
			},
			saveImage() {
				const _this=this
				// #ifndef H5
				
				uni.authorize({
				    /* 这个就是保存相册的 */
				    scope: 'scope.writePhotosAlbum',
				    success() {
				        /* 保存图片方法 */
				        _this.img();
				    },
					fail(err) {
						console.error(err)
						/* 这里判断一下如果没有授权重新打开设置选项 */
						uni.getSetting({
						    success(res) {
								console.log(res)
						        if (!res.authSetting['scope.writePhotosAlbum']) {
						            /* 打开设置的方法 */
						            _this.opensit();
						        }
						    }
						});
					},
				    complete(res) {
				        
				    }
				});
				// #endif
			},
			img(){
				uni.saveImageToPhotosAlbum({
					filePath: this.posterImage,
					success(res) {
						uni.showToast({
							title: '保存成功',
							icon: 'none'
						});
					},
					fail(err) {
						console.error(err)
					}
				})
			},
			/* 授权提示 ，这里就是重复提示用户去授权*/
			opensit() {
			    uni.showModal({
			        content: '由于您还没有允许保存图片到您相册里,这无法进行分享操作点击确定去允许授权',
			        success: function(res) {
			            if (res.confirm) {
			                /* 这个就是打开设置的API*/
			                uni.openSetting({
			                    success(res) {
			                        console.log(res.authSetting);
			                    }
			                });
			            } else if (res.cancel) {
			                uni.showModal({
			                    cancelText: '依然取消',
			                    confirmText: '重新授权',
			                    content: '很遗憾你点击了取消，这将无法进行分享操作，请慎重考虑',
			                    success: function(res) {
			                        if (res.confirm) {
			                            uni.openSetting({
			                                success(res) {
			                                    console.log(res.authSetting);
			                                }
			                            });
			                        } else if (res.cancel) {
			                            console.log('用户不授权');
			                        }
			                    }
			                });
			            }
			        }
			    });
			},
			getUserInfo() {
				const _this = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				api.user.getDbUserInfo().then(res => {
					if (res.data && res.data.user) {
						_this.userInfo = res.data.user
						_this.$store.commit("updateMyInfo", res.data.user)
						_this.headerImage = res.data.user.headImage
						_this.getUserLevel();
						//#ifdef H5 || APP-PLUS
						_this.codeUrl = global.wexinLoadUrl + '/pages/index/index?recUserId=' + btoa(_this.userInfo.key5)
						uni.hideLoading();
						//#endif
						//#ifdef MP-WEIXIN
						_this.codeUrl = '/pages/index/index'
						_this.getMiniCode()
						//#endif
					}
				}).catch(e => {
				})
			},
			getMiniCode() {
				const _this = this;
				const accountInfo = wx.getAccountInfoSync()
				var envVersion = accountInfo.miniProgram.envVersion
				api.mini.getBarCode({
					scene: "recUserId/" + _this.userInfo.id,
					page: 'pages/index/index',
					is_hyaline: true,
					width: 100,
					env_version: envVersion,
					auto_color: false,
					check_path:true
				}).then(res => {
					if (res.data) {
						_this.miniCode = 'data:image/png;base64,' + res.data.pic
					}
					uni.hideLoading()
				}).catch(e => {
				})
			},
			getGlobleInfo() {
				api.globleSetting.getInfoByNumber({
					number: 'POSTER_BG_IMAGE'
				}).then(res => {
					if (res.data) {
						this.POSTER_BG_IMAGE = res.data.value1
					}
				})
			},
		}
	}
</script>

<style>
	page {
		/* background: #ffffff; */
		background-image: linear-gradient(to top, white 0%, #dfe9f3 100%);
	}

	.hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(1.2);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}

	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.backgroundColor-white {
		background-color: white;
	}

	.border_radius_10px {
		border-radius: 10px;
	}

	.padding1vh {
		padding: 1vh;
	}

	.posterImage {
		width: 60vw;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.marginTop2vh {
		margin-top: 10px;
	}

	.save-btn {
		z-index: 16;
		width: 40%;
		height: 100%;
		line-height: 72rpx;
		color: #fff;
		text-align: center;
		border-radius: 36rpx;
	}
	.save-btn-wechat{
		background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);
	}
	.save-btn-app {
		z-index: 16;
		font-size: 12px;
		padding: 0 20rpx;
		height: 100%;
		line-height: 72rpx;
		color: #fff;
		text-align: center;
		border-radius: 36rpx;
	}
</style>
