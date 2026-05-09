<template>
	<view style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;">
		<template v-if="isRequest">
			<view v-if="orderDetail" style="height: 100%;display: flex;flex-direction: column;">
				<view style="flex: 1;height: 0;">
					<scroll-view scroll-y style="height: 100%;">
						<view class="order-detail">
							<view class="address-area padding-lr margin-tb-sm">
								<view class="dflex padding border-radius bg-main">
									<view class="iconfont icondizhi- margin-right ft-main"></view>
									<view class="flex1">
										<view class="w-full dflex-wrap-w">
											<view class="margin-bottom-xs desc">
												<text class="clamp-2">{{ orderDetail.fullAddress }}</text>
											</view>
											<view>
												<text>{{ orderDetail.userName }}</text>
												<text
													v-if="orderDetail.userId==myInfo.id||(orderDetail.workId==workerInfo.id&&orderDetail.status>=3)"
													class="margin-left main-color" style="text-decoration: underline;"
													@click="callPhone(orderDetail.userTelephone)">{{ orderDetail.userTelephone }}</text>
											</view>
										</view>
									</view>
								</view>
							</view>

							<!-- 订单数据 -->
							<view class="order-area padding margin-lr margin-tb-sm bg-main border-radius">
								<view
									style="font-size: 24rpx;border-left: 8rpx solid #82C91E;padding:4rpx 10rpx;color:#333;font-weight: bold;">
									工单信息</view>
								<view class="item dflex-b">
									<text>工单号</text>
									<view class="dflex fs-xs ft-dark">
										{{ orderDetail.orderNo }}
									</view>
								</view>
								<view class="item dflex-b">
									<text>工单类型</text>
									<view class="dflex fs-xs ft-dark">
										{{ orderDetail.workOrderType }}
									</view>
								</view>

								<view class="item dflex-b">
									<text>工单状态</text>
									<text class="fs-xs ft-dark" style="color: #82C91E;">
										<template v-if="endType==1">
											<template v-if="orderDetail.status>3">已完单</template>
											<template v-else>
												{{ statusMAp.text }}
											</template>
										</template>
										<template v-else>
											{{ statusMAp.text }}
										</template>

									</text>
								</view>
								<view class="item dflex-b" v-if="orderDetail.promoter">
									<text>客户名称</text>
									<text class="fs-xs ft-dark">{{ orderDetail.promoter }}</text>
								</view>
								<view class="item dflex-b" v-if="orderDetail.reqDate">
									<text>业主要求上门时间</text>
									<text class="fs-xs ft-dark">{{ orderDetail.reqDate}}</text>
								</view>
								<view class="item dflex-b row-s  margin-bottom-sm">
									<text class="ws-np">业主意向</text>
									<text class="fs-xs ft-dark margin-left-sm padding-left-sm"
										style="flex: 1; max-height:150rpx; overflow-y: auto;background-color: #f8f8f8;color:#f0ad4e">{{ orderDetail.customerIntention || '' }}</text>
								</view>
								<view class="item dflex-b row-s margin-bottom-sm" v-if="orderDetail.workRemark">
									<text class="ws-np">工单要求</text>
									<text class="flex1 fs-xs ft-dark margin-left-sm  padding-left-sm"
										style="flex: 1; max-height: 300rpx; overflow-y: auto;background-color: #f8f8f8;color:#f0ad4e">{{orderDetail.workRemark || ''}}</text>
								</view>
								<view class="item dflex-b" v-if="orderDetail.revenue>0&&endType==0">
									<text>工单金额</text>
									<text class="fs-xs ft-dark">￥{{ orderDetail.revenue || 0 }}</text>
								</view>
								<view class="item dflex-b" v-if="orderDetail.originalAmount>0&&endType==1">
									<text>工单金额</text>
									<text class="fs-xs ft-dark">￥{{ orderDetail.originalAmount || 0 }}</text>
								</view>

								<view class="item dflex-b row-s" v-if="customPicArray&&customPicArray.length>0">
									<text class="ws-np  margin-right-sm ">故障信息</text>
									<view style="flex: 1;width: 0;">
										<view class="use-upload pos-r dflex" style="flex-wrap: wrap;">
											<view class="item pos-r margin-bottom-xxs"
												v-for="(item, index) in customPicArray" v-if="item" :key="index">
												<template v-if="determineResourceType(item)===0">
													<image @click="preCusImage(item)" :src="tools.getImagePath(item)"
														mode="aspectFill"></image>
												</template>
												<template v-else-if="determineResourceType(item)===1">
													<video controls :src="tools.getImagePath(item)"></video>
												</template>

											</view>
										</view>
									</view>
								</view>
								<!-- <view class="item dflex-b" v-if="orderDetail.workId==workerInfo.id||endType==2">
									<text>是否支付</text>
									<text class="fs-xs ft-dark main-color" v-if="orderDetail.isPay==1"
										style="color: #82C91E;">是</text>
									<text class="fs-xs ft-dark" v-else style="color: crimson;">否</text>
								</view> -->

								<!-- 上传图片 -->

							</view>

							<view v-if="orderDetail.status>=3"
								class="order-area padding margin-lr margin-tb-sm bg-main border-radius">
								<view
									style="font-size: 24rpx;border-left: 8rpx solid #3c9cff;padding:4rpx 10rpx;color:#333;font-weight: bold;">
									师傅信息</view>
								<view class="item dflex-b" v-if="orderDetail.workerName">
									<text>师傅姓名</text>
									<text class="fs-xs ft-dark">{{ orderDetail.workerName }}</text>
								</view>
								<view class="item dflex-b" v-if="orderDetail.workerTelephone">
									<text>师傅手机号</text>
									<text class="fs-xs ft-dark">{{ orderDetail.workerTelephone }}</text>
								</view>
								<view class="item dflex-b" v-if="orderDetail.workerTelephone1">
									<text>师傅备用手机号</text>
									<text class="fs-xs ft-dark">{{ orderDetail.workerTelephone1 }}</text>
								</view>
								<view class="item dflex-b" v-if="orderDetail.serviceTime">
									<text>实际上门时间</text>
									<text class="fs-xs ft-dark">{{ orderDetail.serviceTime}}</text>
								</view>
								<view class="item dflex-b" v-if="orderDetail.endDate">
									<text>完成时间</text>
									<text class="fs-xs ft-dark">{{ orderDetail.endDate}}</text>
								</view>
								<view class="item dflex-b row-s margin-bottom-sm" v-if="orderDetail.workerMemo">
									<text class="ws-np">师傅备注</text>
									<text class="flex1 fs-xs ft-dark margin-left-sm  padding-left-sm"
										style="flex: 1; max-height: 300rpx; overflow-y: auto;background-color: #f8f8f8;color:#f0ad4e">{{orderDetail.workerMemo || ''}}</text>
								</view>
							</view>
							<view v-if="orderDetail.status>=4"
								class="order-area padding margin-lr margin-tb-sm bg-main border-radius">
								<view
									style="font-size: 24rpx;border-left: 8rpx solid #f56c6c;padding:4rpx 10rpx;color:#333;font-weight: bold;">
									完单信息</view>
								<view class="item dflex-b row-s">
									<text class="ws-np  margin-right-sm ">完成凭证</text>
									<view style="flex: 1;width: 0;">
										<view class="use-upload pos-r dflex" style="flex-wrap: wrap;">
											<view class="item pos-r margin-bottom-xxs" v-for="(item, index) in imgs"
												@click="preEndImage(item)" :key="index">
												<image :src="item" mode="aspectFill"></image>
											</view>
										</view>
									</view>
								</view>
								<view class="item" style="display: flex;">
									<text>业主签字</text>
									<view v-if="orderDetail.userSignUrl" style="width: 0;flex: 1;">
										<image :src="tools.getImagePath(orderDetail.userSignUrl)"
											@click="preSingImage(orderDetail.userSignUrl)" style="width: 100%;"
											mode="widthFix"></image>
									</view>
								</view>
							</view>

							<view
								v-if="(orderDetail.userEvaluate>=0&&(orderDetail.userId==myInfo.id||orderDetail.workId==workerInfo.id))||(orderDetail.status>4&&(orderDetail.workId==workerInfo.id||endType==2))"
								class="order-area padding margin-lr margin-tb-sm bg-main border-radius">
								<view
									style="font-size: 24rpx;border-left: 8rpx solid #f9ae3d;padding:4rpx 10rpx;color:#333;font-weight: bold;">
									评价信息</view>

								<view>
									<view class="item dflex-b" style="align-items: flex-start;justify-content: flex-start;"
										v-if="orderDetail.userEvaluate>=0&&(orderDetail.userId==myInfo.id||orderDetail.workId==workerInfo.id)">
										<text style="margin-right: 20rpx;">客户评分</text>
										<view class="dflex fs-xs ft-dark">
											<view style="width: 100%;">
												<view style="display: flex;align-items: center;"
													v-for="(item,index) in userEvaluateList" :key="index">
													<view style="color: #303313;margin-right: 20rpx;font-size: 24rpx;">
														{{item.name}}
													</view>
													<uv-rate v-model="item.currentValue" readonly activeColor="#82C91E"
														allowHalf></uv-rate>
												</view>
											</view>
										</view>
									</view>
									<view class="item dflex-b"  style="align-items: flex-start;justify-content: flex-start;"
										v-if="backEvaluateList.length>0&&(orderDetail.userId==myInfo.id||orderDetail.workId==workerInfo.id)">
										<text  style="margin-right: 20rpx;">回访评分</text>
										<view class="dflex fs-xs ft-dark">
											<view style="width: 100%;">
												<view style="display: flex;align-items: center;"
													v-for="(item,index) in backEvaluateList" :key="index">
													<view style="color: #303313;margin-right: 20rpx;font-size: 24rpx;">
														{{item.name}}
													</view>
													<uv-rate v-model="item.currentValue" readonly activeColor="#82C91E"
														allowHalf></uv-rate>
												</view>
											</view>
										</view>
									</view>
									<view class="item" v-if="orderDetail.userEvaluateComment">
										<text>业主评价</text>
										<view class="dflex fs-xs ft-dark">
											{{orderDetail.userEvaluateComment}}
										</view>
									</view>

								</view>
								<view v-if="orderDetail.status>4&&(orderDetail.workId==workerInfo.id||endType==2)">
									<!-- <view class="item dflex-b">
										<text>回访评分</text>
										<view class="dflex fs-xs ft-dark">
											<use-rate class="line-height-1" :disabled="true"
												:value="orderDetail.evaluate>-1?orderDetail.evaluate:0"></use-rate>
										</view>
									</view> -->
									<view class="item" v-if="orderDetail.evaluateComment">
										<text>工单评价</text>
										<view class="dflex fs-xs ft-dark">
											{{orderDetail.evaluateComment}}
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>

				<!-- 底部操作区 -->
				<view style="position: relative;"
					class="oper-area dflex-b padding-right padding-left-sm safe-area-inset-bottom">
					<view class="dflex">
						<view class="btn-area dflex dflex-flow-c" @click="tohome">
							<text class="iconfont iconshouye-1"></text>
							<text>首页</text>
						</view>
						<button open-type="contact" plain="true" session-from="sessionFrom"
							class="btn-area dflex dflex-flow-c"
							style="padding: 0;border: 0;border-radius: 0;margin: 0;line-height: inherit;">
							<view class="iconfont iconkefu-01"></view>
							<view class="margin-left-xs fs-xs">客服</view>
						</button>
					</view>

					<view class="dflex-e" v-if="!hideBottom">
						<view class="dflex" v-if="orderDetail.status == 1&&endType==0">
							<button class="action-btn main-btn" @click="secKillOrder">抢单</button>
						</view>
						<view class="dflex" v-if="orderDetail.status == 1&&endType==2">
							<button class="action-btn main-btn" @click="secKillOrder">派单</button>
						</view>
						<view class="dflex"
							v-if="orderDetail.status == 3 && orderDetail.workId === workerInfo.id && endType==0">
							<button class="action-btn main-btn" @click="editOrder">修改</button>
						</view>
						<view class="dflex"
							v-if="orderDetail.status == 3 && orderDetail.workId === workerInfo.id && endType==0">
							<button class="action-btn main-btn" @click="giveupOrder">弃单</button>
						</view>
						<view class="dflex"
							v-if="orderDetail.status == 3 && orderDetail.workId === workerInfo.id && endType==0">
							<button class="action-btn main-btn" @click="completePost">完单</button>
						</view>
						<view class="dflex"
							v-if="orderDetail.status == 4 && orderDetail.workId === workerInfo.id && endType==0">
							<button class="action-btn main-btn" @click="backData">回退</button>
						</view>
						<view class="dflex"
							v-if="(orderDetail.status == 1||orderDetail.status == 3) && orderDetail.userId === myInfo.id && endType==1">
							<button class="action-btn main-btn" @click="cancelPost">取消</button>
						</view>
						<view
							v-if="orderDetail.status >= 4 && orderDetail.userId==myInfo.id &&endType==1 &&orderDetail.userEvaluate==-1">
							<button @click="evaluateOrder" class="action-btn main-btn">评价</button>
						</view>
						<view
							v-if="isAppealRequest&&!showAppealDetail&&orderDetail.status>=4&&endType!=2&&(orderDetail.userId === myInfo.id || orderDetail.workId === workerInfo.id)">
							<button @click="appealOrder()" class="action-btn main-btn">申诉</button>
						</view>
						<view
							v-if="isAppealRequest&&showAppealDetail&&orderDetail.status>=4&&endType!=2&&(orderDetail.userId === myInfo.id || orderDetail.workId === workerInfo.id)">
							<button @click="appealDetail()" class="action-btn main-btn">申诉详情</button>
						</view>
					</view>
				</view>
			</view>

			<template v-else>
				<use-empty :tip="'暂无数据'" :btnTip="null" height="50vh" :auto="false"></use-empty>
			</template>
		</template>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import api from '@/common/api.js'
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
			statusMAp() {
				if (this.orderDetail) {
					switch (this.orderDetail.status) {
						case 0:
							return {
								text: '待核实', color: '#337ab7'
							};
						case 1:
							return {
								text: '待接单', color: '#6e45e2'
							};
						case 2:
							return {
								text: '已取消', color: '#E65D6E'
							};
						case 3:
							return {
								text: '已接单', color: '#ff9100'
							};
						case 4:
							return {
								text: '已完单', color: '#3c763d'
							};
						case 5:
							return {
								text: '待审核', color: '#a13e0d'
							};
						case 6:
							return {
								text: '待付款', color: '#9d418c'
							};
						case 7:
							return {
								text: '已完成', color: '#4cd964'
							};
					}
				}
				return '';
			}
		},
		data() {
			return {
				httpImageUrl: this.httpImageUrl,
				endType: -1,
				orderNo: '',
				orderDetail: null,
				isRequest: false,
				limit: 4,
				imgs: [],
				customPicArray: [],
				hideBottom: 0,
				isAppealRequest: false,
				showAppealDetail: false,
				appealInfo: null,
				isWorker: 0,
				isCanGetDetail: false,
				userEvaluateList: [],
				backEvaluateList: [],
			}
		},
		onLoad(options) {
			if (options.hideBottom) {
				this.hideBottom = options.hideBottom
			} else {
				this.hideBottom = 0
			}
			this.orderNo = options.orderNo
			if (options.isWorker == 1) {
				this.isWorker = 1
			} else {
				this.isWorker = 0
				this.endType = uni.getStorageSync('endType')
			}
		},
		async onShow() {
			const _this = this
			_this.tools.miniCallBack(async function() {
					_this.handelData()
				},
				function() {
					uni.showLoading({
						title: '加载中',
						mask: true
					})
					uni.login({
						provider: "weixin",
						success(res) {
							var recUserId = 0
							if (getApp().globalData.recUserId) {
								recUserId = getApp().globalData.recUserId;
							} else {
								recUserId = 0
							}
							api.mini.getOpenId({
								code: res.code,
								webapp: 1,
								nickName: '',
								headUrl: '',
								recommendId: recUserId
							}).then(async r => {
								uni.hideLoading()
								uni.setStorageSync('token', r.data.usertoken);
								uni.setStorageSync('openid', r.data.openid);
								_this.handelData()
							}).catch(res => {});
						}
					})
				})
		},
		methods: {
			backData() {
				const _this = this;
				uni.showModal({
					title: '温馨提示',
					content: '确定要回退吗?',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '加载中'
							})
							api.workOrder.updateToBackFromComplete({
								orderNo: _this.orderNo,
							}).then(res => {
								uni.hideLoading()
								uni.showToast({
									icon: 'none',
									title: '回退成功'
								})
								_this.getOrderDetail()
							}).catch(e => {
								uni.hideLoading()
							})

						} else if (res.cancel) {

						}
					}
				});
			},
			async handelData() {
				const _this = this;
				if (_this.isWorker == 1) {
					if (_this.isCanGetDetail) {
						_this.setEndType(0)
						_this.getData()
					} else {
						const workerInfo = await _this.getWorkerInfo()
						if (!workerInfo.data || workerInfo.data.status == 0) {
							uni.showModal({
								title: '温馨提示',
								content: '您还不是师傅,暂不能接单',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										_this.goHome()
									}
								}
							})
						} else {
							_this.getData()
						}
					}
				} else {
					_this.getData()
				}
			},
			goHome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			getWorkerInfo() {
				const _this = this
				return new Promise((resolve, reject) => {
					api.worker.getInfo().then(res => {
						if (res.data) {
							_this.$store.commit("updateWorkerInfo", res.data)
						}
						resolve(res)
					}).catch(e => {
						reject(e)
					})
				})
			},
			getData() {
				this.getOrderDetail()
				if (this.endType != 2) {
					this.getAppealInfo()
				}
			},
			setEndType(endType) {
				this.endType = endType
				uni.setStorageSync('endType', endType)
			},
			preCusImage(item) {
				const _this = this
				var urls = []
				_this.customPicArray.forEach(e => {
					if (this.determineResourceType(e) === 0) {
						urls.push(_this.tools.getImagePath(e))
					}
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
			determineResourceType(url) {
				// 获取 URL 的文件扩展名
				const extension = url.split('.').pop().toLowerCase();

				// 定义图片和视频的扩展名数组
				const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
				const videoExtensions = ['mp4', 'avi', 'mov', 'wmv'];

				// 判断资源类型
				if (imageExtensions.includes(extension)) {
					return 0;
				} else if (videoExtensions.includes(extension)) {
					return 1;
				} else {
					return -1; // 如果不是图片也不是视频，则返回未知
				}
			},
			getAppealInfo() {
				api.appeal.getList({
					pageNo: 1,
					pageSize: 1,
					keyWord: '',
					startTime: '',
					endTime: '',
					workerName: '',
					workerTelephone: '',
					orderNo: this.orderNo,
					infoType: 0,
					userId: this.endType == 1 ? this.myInfo.id : -1,
					workerId: this.endType == 0 ? this.workerInfo.id : -1
				}).then(res => {
					if (res.data.listData && res.data.listData.length > 0) {
						this.appealInfo = res.data.listData[0]
						this.showAppealDetail = true
					} else {
						this.showAppealDetail = false
					}
					this.isAppealRequest = true
				}).catch(e => {
					this.isAppealRequest = true
				})
			},
			appealOrder() {
				uni.navigateTo({
					url: '/sub-user/pages/appeal/index?orderNo=' + this.orderNo
				})
			},
			appealDetail() {
				uni.navigateTo({
					url: '/sub-user/pages/appeal/detail?parentId=' + this.appealInfo.id
				})
			},
			secKillOrder() {
				uni.navigateTo({
					url: '/sub-user/pages/workOrder/dispatch?orderNo=' + this.orderNo
				})
			},
			editOrder() {
				uni.navigateTo({
					url: '/sub-user/pages/workOrder/dispatch?type=1&orderNo=' + this.orderNo + '&id=' + this
						.orderDetail.id
				})
			},
			giveupOrder() {
				uni.navigateTo({
					url: '/sub-user/pages/workOrder/drop?orderNo=' + this.orderNo
				})
			},
			cancelPost() {
				uni.navigateTo({
					url: '/sub-user/pages/workOrder/cancel?orderNo=' + this.orderNo
				})
			},
			completePost() {
				uni.navigateTo({
					url: '/sub-user/pages/workOrder/complete?orderNo=' + this.orderNo
				})
			},
			evaluateOrder() {
				uni.navigateTo({
					url: '/sub-user/pages/workOrder/evaluate?orderNo=' + this.orderNo
				})
			},
			preEndImage(item) {
				const _this = this
				uni.previewImage({
					current: item,
					urls: _this.imgs,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {},
						fail: function(err) {}
					}
				});
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
			callPhone(number) {
				if (number) {
					uni.makePhoneCall({
						phoneNumber: number, // 替换为你要拨打的电话号码
						success: () => {},
						fail: () => {}
					});
				}
			},
			getOrderDetail() {
				const _this = this
				uni.showLoading({
					title: '加载中'
				})
				api.workOrder.getInfoByOrderNo({
					orderNo: this.orderNo
				}).then(res => {
					if (res.data) {
						if (this.isWorker == 1) {
							if (this.workerInfo.id == res.data.workId) {
								this.isCanGetDetail = true
								this.setEndType(0)
								this.setOrderDetailData(res)
							} else {
								uni.showModal({
									title: '温馨提示',
									content: '工单【' + _this.orderNo + '】的派单师傅已改变,请确认',
									showCancel: false,
									success: function(res) {
										if (res.confirm) {
											_this.setEndType(0)
											_this.goHome()
										}
									}
								})
							}
						} else {
							this.setOrderDetailData(res)
						}
					} else {
						this.orderDetail = null
					}
					this.isRequest = true
					uni.hideLoading()
				}).catch(e => {
					this.isRequest = true
					uni.hideLoading()
				})
			},
			setOrderDetailData(res) {
				this.orderDetail = res.data
				var images = []
				if (this.orderDetail.endPic) {
					images.push(this.tools.getImagePath(this.orderDetail.endPic))
				}
				if (this.orderDetail.endPic1) {
					images.push(this.tools.getImagePath(this.orderDetail.endPic1))
				}
				if (this.orderDetail.endPic2) {
					images.push(this.tools.getImagePath(this.orderDetail.endPic2))
				}
				if (this.orderDetail.endPic3) {
					images.push(this.tools.getImagePath(this.orderDetail.endPic3))
				}
				this.imgs = images
				if (this.orderDetail.customPic) {
					this.customPicArray = this.orderDetail.customPic.split(';')
				}
				if (this.orderDetail.evaluateList && this.orderDetail.evaluateList.length > 0) {
					this.orderDetail.evaluateList.forEach(item => {
						item.currentValue = item.currentValue / 20
					})
					let evaluateList = this.orderDetail.evaluateList.sort((a, b) => b.level - a.level);
					this.userEvaluateList = evaluateList.filter(item => item.type == 2 && item.dataType == 0)
					this.backEvaluateList = evaluateList.filter(item => item.type == 2 && item.dataType == 1)
				}
			},
			tohome() {
				uni.switchTab({
					url: '/pages/index/index'
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
</style>