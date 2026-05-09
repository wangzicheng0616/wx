<template>
	<view style="">
		<view style="position: absolute;top: 0;bottom: 0;right: 0;left: 0;"
			:class="endType==0?'bg0':endType==1?'bg1':endType==2?'bg2':'bg3'">
			<view style="height: 100%;">
				<scroll-view scroll-y>
					<view>
						<view class="header-area padding-lr-sm" :style="{ 'padding-top': `${paddingTop}px` }">
							<view class="dflex-b" style="align-items: flex-end;">
								<view class="member-area padding-top-sm dflex pos-r flex1" @click="toInfo()">
									<view>
										<image v-if="headerImage" @click.stop="uploadHeader" shape="circle"
											class="headimg border-radius-c" style="border-radius: 50%;"
											:src="tools.getImagePath(headerImage)">
										</image>
										<image v-else @click.stop="uploadHeader" class="headimg border-radius-c"
											mode="aspectFill" src="../../static/images/user/default.png"></image>
									</view>
									<view class="margin-left-sm" v-if="userInfo">
										<view class="info-box">
											<text class="fs-lg line-height-1"
												:style="endType==0?'color:white':endType==1?'':'color:white'">{{ userInfo.name }}</text>
										</view>
										<view v-if="userInfo">
											<view v-if="userInfo.phone.indexOf('U')==0">
												<template v-if="needAuthorization">
													<view @click.stop="showPrivacy=true"
														style="display: flex;align-items: center;">
														<view style="font-size: 28rpx;color: #82C91E;font-weight: 500;"
															:style="endType==0?'color:white':endType==1?'color:#82C91E':'color:white'">
															授权手机号</view>
													</view>
												</template>
												<button v-else plain="true" @click.stop="handleClick"
													style="padding: 0;border: 0;border-radius: 0;margin: 0;line-height: inherit;"
													open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"
													lang="zh_CN">
													<view style="display: flex;align-items: center;">
														<view style="font-size: 28rpx;color: #82C91E;font-weight: 500;"
															:style="endType==0?'color:white':endType==1?'color:#82C91E':'color:white'">
															授权手机号</view>
													</view>
												</button>
											</view>
											<view v-else style="display: flex;align-items: center;">
												<view style="font-size: 28rpx;color: #82C91E;font-weight: 500;"
													:style="endType==0?'color:white':endType==1?'color:#82C91E':'color:white'">
													已授权</view>
											</view>
										</view>
									</view>
								</view>

								<view
									style="display: flex;align-items: center;justify-content: center;flex-direction: column;">
									<view @click.stop="actionSheetShow=true" v-if="endType==0||endType==1||endType==2"
										class="border-radius-big bg-base dflex-c padding-lr margin-right">
										<!-- <view class="iconfont fs-xl iconhuiyuan margin-right-xs"></view> -->
										<image src="../../static/images/user/icon-change-endtype.png"
											style="width: 36rpx;height: 36rpx;transform: rotate(90deg);"
											class="margin-right-xs"></image>
										<view>{{ endType==0 ? '师傅端' : endType==1 ?'用户端' :'管理端' }}</view>
									</view>
									<view class="use-tag bg-warn margin-top-sm" v-if="workerInfo&&endType==0">
										综合评分: {{ workerInfo.evaluate || 0 }}
									</view>
								</view>


								<!-- 切换终端 -->
								<use-action-sheet v-model="actionSheetShow" :list="actionSheetList"
									:tips="actionSheetTips" @click="actionSheetClick"
									@close="actionSheetClose"></use-action-sheet>
							</view>
						</view>

						<view class="container-area padding-lr-sm padding-bottom-sm">
							<!-- 我的收益 -->
							<view class="border-radius margin-top-sm bg-main" v-if="endType==0">
								<use-list-title title="我的收益" iconfont="iconincome" color="#82C91E" fwt="600"
									tip="查看我的收益" @goto="to('/sub-user/pages/user/balance', '全部')"></use-list-title>

								<view class="order-area padding-bottom-sm padding-lr dflex-c">
									<view class="item dflex dflex-flow-c">
										<view class="iconfont">
											￥{{ $api.format_price(totalBalance, ',') || 0 }}
										</view>
										<text>总收入</text>
									</view>
									<view class="item dflex dflex-flow-c">
										<view class="iconfont">
											￥{{ $api.format_price(avilableAmount, ',') || 0 }}
										</view>

										<text>可用金额</text>
									</view>
								</view>
							</view>
							<!-- 我的工单 -->
							<view class="border-radius margin-top-sm bg-main" v-if="endType==0||endType==1">
								<use-list-title title="我的工单" iconfont="icondingdan" color="#82C91E" fwt="600"
									tip="查看全部工单"
									@goto="to('/sub-user/pages/workOrder/list?status=-1')"></use-list-title>
								<template v-if="endType==0">
									<view class="order-area padding-bottom-sm padding-lr dflex-c">
										<view class="item dflex dflex-flow-c"
											@click="to('/sub-user/pages/workOrder/list?status=3')">
											<view class="iconfont iconpedding">
												<view class="badge badge-small" style="top: -20rpx;right:-20rpx"
													v-if="stats.receivedNumber">
													{{stats.receivedNumber}}
												</view>
											</view>
											<text>已接单</text>
										</view>
										<view class="item dflex dflex-flow-c"
											@click="to('/sub-user/pages/workOrder/list?status=4')">
											<view class="iconfont iconcomplete">
												<view class="badge badge-small" style="top: -20rpx;right:-20rpx"
													v-if="stats.accountsNumber">
													{{stats.accountsNumber}}
												</view>
											</view>
											<text>已完单</text>
										</view>
										<view class="item dflex dflex-flow-c"
											@click="to('/sub-user/pages/workOrder/list?status=5')">
											<view class="iconfont iconevaluate">
												<view class="badge badge-small" style="top: -20rpx;right:-20rpx"
													v-if="stats.completedNumber">
													{{stats.completedNumber}}
												</view>
											</view>
											<text>待审核</text>
										</view>
										<view class="item dflex dflex-flow-c"
											@click="to('/sub-user/pages/workOrder/list?status=6')">
											<view class="iconfont iconpedding">
												<view class="badge badge-small" style="top: -20rpx;right:-20rpx"
													v-if="stats.abandonedNumber">
													{{stats.abandonedNumber}}
												</view>
											</view>
											<text>待付款</text>
										</view>
										<view class="item dflex dflex-flow-c"
											@click="to('/sub-user/pages/workOrder/list?status=7')">
											<view class="iconfont iconcomplete">
												<view class="badge badge-small" style="top: -20rpx;right:-20rpx"
													v-if="stats.abandonedNumber">
													{{stats.abandonedNumber}}
												</view>
											</view>
											<text>已完成</text>
										</view>
									</view>
								</template>
								<template v-else>
									<view class="order-area padding-bottom-sm padding-lr dflex-c">
										<view class="item dflex dflex-flow-c"
											@click="to('/sub-user/pages/workOrder/list?status=1')">
											<view class="iconfont iconpedding">
												<view class="badge badge-small" style="top: -20rpx;right:-20rpx"
													v-if="stats.receivedNumber">
													{{stats.receivedNumber}}
												</view>
											</view>
											<text>待接单</text>
										</view>
										<view class="item dflex dflex-flow-c"
											@click="to('/sub-user/pages/workOrder/list?status=3')">
											<view class="iconfont iconevaluate">
												<view class="badge badge-small" style="top: -20rpx;right:-20rpx"
													v-if="stats.accountsNumber">
													{{stats.accountsNumber}}
												</view>
											</view>
											<text>已接单</text>
										</view>
										<view class="item dflex dflex-flow-c"
											@click="to('/sub-user/pages/workOrder/list?status=4')">
											<view class="iconfont iconcomplete">
												<view class="badge badge-small" style="top: -20rpx;right:-20rpx"
													v-if="stats.completedNumber">
													{{stats.completedNumber}}
												</view>
											</view>
											<text>已完单</text>
										</view>
										<view class="item dflex dflex-flow-c"
											@click="to('/sub-user/pages/workOrder/list?status=2')">
											<view class="iconfont icongiveup">
												<view class="badge badge-small" style="top: -20rpx;right:-20rpx"
													v-if="stats.abandonedNumber">
													{{stats.abandonedNumber}}
												</view>
											</view>
											<text>已取消</text>
										</view>
									</view>
								</template>
							</view>

							<view v-if="endType==0&&officeImage"
								class="border-radius margin-top-sm bg-main">
								<!-- 未关注公众号的情况下显示 -->
								<use-list-title title="关注公众号" iconfont="iconweixin" color="#58bc8a" fwt="600"
									tip="关注公众号后才可抢单" @goto="toFollow"></use-list-title>
							</view>

							<view class="border-radius margin-top-sm bg-main">
								<use-list-title v-if="endType==0&&workerInfo.status==1&&workerInfo.state==2"
									title="我要提现" iconfont="iconqianbao-01" color="#9776ff" fwt="600" :tip="stats.share"
									@goto="to('/sub-user/pages/user/withdraw')"></use-list-title>
								<use-list-title v-if="endType==0&&workerInfo.status==1&&workerInfo.state==2"
									title="邀请师傅" iconfont="iconmianxing-05" color="#ff7043" fwt="600" :tip="stats.share"
									@goto="toShare"></use-list-title>
								<use-list-title v-if="endType==0&&workerInfo.status==1&&workerInfo.state==2"
									title="已邀请列表" iconfont="iconfenxiaozhongxin-01" color="#ff756e" fwt="600"
									:tip="workerInfo.inviterNumber"
									@goto="to('/sub-user/pages/worker/shareList')"></use-list-title>
								<use-list-title v-if="endType==1" title="发布工单" iconfont="iconhuiyuan" color="#ff756e"
									fwt="600" @goto="to('/sub-user/pages/workOrder/create')"></use-list-title>
								<use-list-title v-if="(endType==1||endType==0)&&userInfo&&userInfo.phone.indexOf('U')!=0" :title="endType==1?'成为师傅':'修改师傅'" iconfont="iconyouhui" color="#9776ff"
									fwt="600" @goto="to('/sub-user/pages/worker/index')"></use-list-title>
								<use-list-title v-if="endType==1||endType==2" title="师傅列表" iconfont="iconmianxing-05"
									color="#ff7043" fwt="600" :tip="stats.share"
									@goto="to('/sub-user/pages/worker/list?type=0')"></use-list-title>
								<use-list-title v-if="endType==0" title="弃单列表" iconfont="iconshoucang-" color="#5a9ded"
									fwt="600" @goto="to('/sub-user/pages/workOrder/dropList')"></use-list-title>
								<use-list-title v-if="endType==0||endType==1" title="申诉列表" iconfont="iconzuji"
									color="#5a9ded" fwt="600"
									@goto="to('/sub-user/pages/appeal/list')"></use-list-title>
								<use-list-title title="常见问题" iconfont="iconchangjianwenti-01" color="#ffab6c" fwt="600"
									@goto="to('/sub-user/pages/news/index?endType='+endType)"></use-list-title>
								<use-list-title title="设置" iconfont="iconshezhi-" color="#58bc8a" fwt="600"
									@goto="to('/sub-user/pages/setting/index')"></use-list-title>
							</view>
						</view>
						<!-- 生成分享小程序码 -->
						<view class="alert-box" v-if="showShareAlert">
							<view class="alert-item pos-r" @click.stop>
								<view class="pos-a pos-top pos-right padding-sm" @click="showShareAlert = false">
									<view class="iconfont iconguanbi"></view>
								</view>
								<view class="qrcode-box tac">
									<image show-menu-by-longpress class="img" :src="miniCode"
										mode="">
									</image>
									<view class="ft-xs ft-dark-3 tac margin-top-sm">长按识别</view>
								</view>
								<view class="btn-box" @click="showShareAlert = false">
									完成
								</view>
							</view>
						</view>
						<!-- <use-popup mode="bottom" bgclass=" " v-model="showShareAlert">
							<view class="padding border-radius margin">
								<view v-if="!miniCode" class="tac padding border-radius pos-a pos-l-c ft-white"
									style="bottom: 45vh">
									<use-loading mode="pos-r margin-right-xs"></use-loading>
									二维码生成中，请稍等
								</view>
								<view class="w-full" v-else style="height: 70vh">
									<image :src="miniCode" class="wh-full" mode="aspectFit"></image>
								</view>

								<view class="dflex-c" @click.stop="showShareAlert = false">
									<view class="iconfont iconguanbi fs-xxxl ft-white"></view>
								</view>
							</view>
						</use-popup> -->
						<!-- #ifdef MP-WEIXIN -->
						<official-account @bindload="wxOAccountLoad" @binderror="wxOAccountErr"></official-account>
						<!-- #endif -->
						<!-- 引导关注微信公众号框 -->
						<view class="alert-box" v-if="showFollowAlert">
							<view class="alert-item pos-r" @click.stop>
								<view class="pos-a pos-top pos-right padding-sm" @click="showFollowAlert = false">
									<view class="iconfont iconguanbi"></view>
								</view>
								<view class="qrcode-box tac">
									<image show-menu-by-longpress class="img" :src="tools.getImagePath(officeImage)"
										mode="">
									</image>
									<view class="ft-xs ft-dark-3 tac margin-top-sm">长按识别</view>
								</view>
								<view class="btn-box" @click="showFollowAlert = false">
									完成
								</view>
							</view>
						</view>
						<!-- 版权 -->
						<!-- <use-copyright></use-copyright> -->
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 隐私协议 -->
		<view @click="showPrivacy=false" v-show="showPrivacy"
			style="position: absolute;top: 0;right: 0;bottom: 0;left: 0;background: rgba(0,0,0,0.5);z-index: 10;">
		</view>
		<uni-transition :show="showPrivacy" :styles="styles" mode-class="slide-bottom">
			<view>
				<view style="background-color: #ffffff;padding: 40rpx;">
					<view style="line-height: 32rpx;color: #222222;font-weight: 500;font-size: 32rpx;">隐私保护指引</view>
					<view
						style="margin-top: 32rpx;color: #A6A6A6;font-size: 28rpx;line-height: 40rpx;font-weight: 400;">
						在使用当前小程序服务之前，请仔细阅读
						<text class="link" @click="openPrivacyContract">{{ privacyContractName }}</text>
						。如果你同意{{ privacyContractName }}，请点击“同意”开始使用。
					</view>
					<view style="margin-top: 48rpx;display: flex;align-items: center;justify-content: space-between;">
						<view @click="closePrivacy"
							style="background: #ffffff;color: #A6A6A6;font-weight: 500;font-size: 28rpx;width: 320rpx;border-radius: 10rpx;height: 84rpx;display: flex;align-items: center;justify-content: center;">
							拒绝
						</view>
						<button class="share" plain="true" open-type="agreePrivacyAuthorization"
							@agreeprivacyauthorization="handleAgreePrivacyAuthorization"
							style="padding: 0;border: 0;border-radius: 0;margin: 0;line-height: inherit;">
							<view
								style="background: #82C91E;color: #FFFFFF;font-weight: 500;font-size: 28rpx;width: 320rpx;border-radius: 10rpx;height: 84rpx;display: flex;align-items: center;justify-content: center;">
								同意
							</view>
						</button>
					</view>
				</view>
			</view>
		</uni-transition>

	</view>

</template>

<script>
	import {
		mapState
	} from 'vuex';
	import api from '@/common/api.js'
	import global from '@/utils/global.js'
	export default {
		computed: {
			...mapState({
				myInfo(state) {
					return state.user.myInfo;
				},
				workerInfo(state) {
					return state.user.workerInfo;
				},
				endType(state) {
					return state.user.endType;
				},
				paddingTop() {
					return this.$api.navbar.top + 6;
				},
				config() {
					return this.$config;
				},
			})
		},
		data() {
			return {
				httpImageUrl: this.httpImageUrl,
				userInfo: null,
				headerImage: '',
				// 统计数据
				stats: {
					abandonedNumber: 0,
					canceledNumber: 0,
					completedNumber: 0,
					pendingNumber: 0,
					receivedNumber: 0,
					timedOutNumber: 0
				},
				actionSheetShow: false,
				actionSheetList: [],
				actionSheetTips: {
					text: "",
					color: "#9a9a9a",
					size: 24
				},
				showFollowAlert: false, // 关注公众号弹层
				showShareAlert: false, // 邀请用户弹层
				posterUrl: '',
				isFollowAccounts: true, // 是否关注公众号

				privacyContractName: '', //隐私协议名称
				needAuthorization: false, //是否要弹出隐私协议
				showPrivacy: false, //隐私协议弹框
				styles: {
					'position': 'absolute',
					'bottom': 0,
					'left': 0,
					'right': 0,
					'z-index': 100
				},
				miniCode: '',
				totalBalance: 0,
				avilableAmount: 0,
				officeImage: '',
			}
		},
		onLoad() {},
		onShow() {
			const _this = this;
			let endType = -1
			const storageEndType = uni.getStorageSync('endType')
			if (!storageEndType && storageEndType !== 0) {
				endType = 1
			} else {
				endType = storageEndType
			}
			_this.$store.commit("updateEndType", endType)
			_this.getData()
			_this.getAccounts()
			_this.getPrivacySetting()
		},
		methods: {
			getBalanceInfo() {
				const _this = this
				api.user.getBalanceList({
					pageNo: 1,
					pageSize: 1,
					type: -1,
				}).then(res => {
					if (res.code == 0) {
						if (res.data) {
							_this.totalBalance = res.data.totalAmount;
							_this.avilableAmount = res.data.availableAmount;
						}
					}
				})
			},
			getMiniCode() {
				const _this = this;
				const accountInfo = wx.getAccountInfoSync()
				var envVersion = accountInfo.miniProgram.envVersion
				api.mini.getBarCode({
					scene: "recUserId/" + uni.getStorageSync('userId') + '*shareEndType/' + _this.endType,
					page: 'pages/index/index',
					is_hyaline: false,
					width: 60,
					env_version: envVersion,
					auto_color: false,
					check_path: true
				}).then(res => {
					if (res.data) {
						_this.miniCode = 'data:image/png;base64,' + res.data.pic
					}
					uni.hideLoading()
				}).catch(e => {})
			},
			getWorkerInfo() {
				uni.showLoading({
					title: '加载中'
				})
				api.worker.getInfo().then(res => {
					uni.hideLoading()
					if (res.data) {
						this.$store.commit("updateWorkerInfo", res.data)
					}
					if (res.data.followSubscription) {
						this.isFollowAccounts = true
					} else {
						this.isFollowAccounts = false
					}
				}).catch(e => {
					uni.hideLoading()
				})
			},
			getData() {
				if (this.endType == 0) {
					this.getWorkerInfo()
					this.getBalanceInfo()
					this.getImage()
				}
				this.getUserInfo();
			},
			getImage() {
				api.globleData.getListByGroupNo({
					groupNo: 'PUBLIC_NUMBER_PIC'
				}).then(res => {
					if (res.listData && res.listData.length > 0) {
						var share = res.listData.find(item => item.number == 'PUBLIC_NUMBER_PIC')
						this.officeImage = share.data
					}
				})
			},
			handleClick(event) {
				event.stopPropagation();
			},
			toInfo() {
				if (this.endType == 0 || this.endType == 1) {
					if (this.userInfo && this.userInfo.phone.indexOf('U') == 0) {
						if (this.needAuthorization) {
							this.showPrivacy = true
						} else {
							uni.showToast({
								icon: 'none',
								title: '请先授权手机号'
							})
						}
					} else {
						uni.navigateTo({
							url: '/sub-user/pages/worker/index'
						})
					}

				}
			},
			//授权手机号
			getPhoneNumber(e) {
				const _this = this
				if (e.detail.errMsg == 'getPhoneNumber:ok') {
					uni.showLoading({
						title: '加载中'
					})
					api.mini.updateXcxPhoneNumber({
						code: e.detail.code,
					}).then(res => {
						uni.hideLoading()
						_this.getData()
						_this.getUserInfo(true)
					}).catch(res => {
						uni.hideLoading()
					});
				}
			},
			//隐私协议开始
			getPrivacySetting() {
				const _this = this;
				uni.getPrivacySetting({
					success: res => {
						_this.privacyContractName = res.privacyContractName
						if (res.needAuthorization) {
							// 需要弹出隐私协议
							_this.needAuthorization = true
							_this.showPrivacy = true
						} else {
							_this.needAuthorization = false
							_this.showPrivacy = false
						}
					}
				})
			},
			closePrivacy() {
				const _this = this;
				_this.showPrivacy = false
			},
			handleAgreePrivacyAuthorization() {
				this.needAuthorization = false
				this.showPrivacy = false
			},
			openPrivacyContract() {
				wx.openPrivacyContract({});
			},
			actionSheetClick(index) {
				this.updateEndType(this.actionSheetList[index].value)
				this.getData()
			},
			actionSheetClose() {
				console.log(this.actionSheetShow);
			},
			// 获取是否关注公众号信息
			getAccounts() {

			},
			updateEndType(type) {
				this.$store.commit("updateEndType", type)
			},
			// 统一跳转接口，拦截未登录路由
			to(url) {
				uni.navigateTo({
					url
				});
			},
			// 	去关注公众号
			toFollow() {
				this.showFollowAlert = true
			},
			//邀请师傅
			toShare() {
				this.showShareAlert = true
			},
			clearData() {
				uni.removeStorageSync('token')
				uni.removeStorageSync('userId')
				uni.removeStorageSync('userName')
				this.$store.commit("updateMyInfo", {})
				this.headerImage = ''
				this.userInfo = null
			},
			//上传头像
			uploadHeader() {
				const _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success(res) {
						uni.showLoading({
							title: '加载中'
						})
						uni.uploadFile({
							url: global.baseUri + global.path + 'systemUser/uploadHeadPic',
							header: {
								'token': uni.getStorageSync("token"),
							},
							filePath: res.tempFilePaths[0],
							name: 'file',
							success(data) {
								var resData = JSON.parse(data.data);
								_this.$store.commit("updateMyInfo", {
									headImage: resData.data
								})
								_this.headerImage = resData.data;
								uni.hideLoading();
								api.user.updateSystemUserHeadImage({
									id: 0,
									headImage: resData.data
								}).then(res => {
									uni.showToast({
										title: '上传头像成功',
										icon: 'none'
									})
								})
							},
							fail(e) {
								uni.hideLoading();
								uni.showToast({
									title: JSON.stringify(e),
									icon: 'none'
								})
							}
						})
					}

				})
			},
			getUserInfo() {
				const _this = this;
				api.user.getDbUserInfo().then(res => {
					if (res.data && res.data.user) {
						_this.userInfo = res.data.user
						var actionSheetList = []
						if (res.data.user.isOpened == 1) {
							actionSheetList = [{
									text: "师傅端",
									color: "#333",
									value: 0
								},
								{
									text: "用户端",
									color: "#333",
									value: 1
								},
								{
									text: "管理端",
									color: "#333",
									value: 2
								},
							]
						} else {
							if (res.data.user.isWorker == 1) {
								actionSheetList = [{
										text: "师傅端",
										color: "#333",
										value: 0
									},
									{
										text: "用户端",
										color: "#333",
										value: 1
									},
								]
							}else{
								actionSheetList=[
									{
										text: "用户端",
										color: "#333",
										value: 1
									},
								]
							}
						}
						this.actionSheetList=actionSheetList
						_this.$store.commit("updateMyInfo", res.data.user)
						uni.setStorageSync('userId', res.data.user.id)
						if (_this.endType == 0) {
							_this.getMiniCode()
						}
						if(!_this.headerImage){
							_this.headerImage = res.data.user.headImage
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.bg0 {
		background-image: linear-gradient(to top, white 0%, #82C91E 100%);
	}

	.bg1 {
		background-image: linear-gradient(to top, white 0%, #dfe9f3 100%);
	}

	.bg2 {
		background-image: linear-gradient(to top, white 0%, #434343 100%);
	}

	.bg3 {
		background-color: #f5f5f5;
	}

	.member-area {
		image {
			width: 130rpx;
			height: 130rpx;
			border: 5rpx solid #fff;
		}
	}

	.vip-card-area {
		padding-top: 12rpx;
		padding-bottom: 12rpx;
		font-size: 24rpx;
		color: #c6b181;
		background-color: #000000;
		/* 不支持线性的时候显示 */
		background-image: linear-gradient(to right, #3a3a3a, #000000);

		.iconfont {
			font-size: 66rpx;
		}
	}

	.stats-area {
		.item {
			padding: 30rpx 0;
		}

		.num {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 6rpx;
		}
	}

	.order-area {
		.item {}

		.iconfont {
			position: relative;
			font-size: $font-lg + 8upx;

			.badge {
				right: initial;
			}
		}
	}

	.stats-area .item,
	.order-area .item {
		position: relative;
		font-size: $font-sm;
		color: $font-color-base;
		flex: 1;
	}

	.browsing-area {
		image {
			width: 160rpx;
			height: 160rpx;
		}
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
		display: none;
	}

	.log-out-btn {
		color: $font-color-base;
	}

	.info {
		color: #e9a60c;
		background: #f4ead4;
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
		width: 420rpx;
		font-weight: bold;
		font-size: 24rpx;
		margin-bottom: 20rpx;
		color: rgb(186, 186, 186);
	}

	.alert-content {
		font-size: 24rpx;
		margin-bottom: 20rpx;
		margin: 0 auto 10rpx;
		width: 440rpx;
	}

	.btn-box {
		width: 440rpx;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-around;
		margin: 30rpx auto 0;
		background-color: #28c445;
		color: #fff;
		height: 80rpx;
		border-radius: 40rpx;
	}

	.btn-sure {
		width: 160rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	.text-line {
		text-decoration-line: underline;
	}

	.img {
		width: 400rpx;
		height: 400rpx;
	}

	.link {
		color: #82C91E;
		text-decoration: underline;
	}
</style>