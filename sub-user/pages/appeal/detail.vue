<template>
	<view style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;">
		<view style="height: 100%;display: flex;flex-direction: column;">
			<view v-if="mainItem" style="border-bottom: 4px solid #f5f5f5; background: #ffffff;padding: 10rpx;margin: 0 10rpx">
				<view style="font-size: 14px;font-weight: bolder;color: #303133">{{getStatus(mainItem.status)}}</view>
				<view style="font-size: 12px;color: #606266;margin-top: 10rpx;">{{mainItem.reason}}</view>
				<view style="display: flex;width: 100%">
					<view style="width: 20%;padding:0 10rpx" v-if="mainItem.pic1">
						<image @click="preImage(mainItem,mainItem.pic1)" :src="tools.getImagePath(mainItem.pic1)"
							style="width: 100%;height: 100rpx;border-radius: 8rpx;" mode="aspectFill"></image>
					</view>
					<view style="width: 20%;padding:0 10rpx" v-if="mainItem.pic2">
						<image @click="preImage(mainItem,mainItem.pic2)" :src="tools.getImagePath(mainItem.pic2)"
							style="width: 100%;height: 100rpx;border-radius: 8rpx;" mode="aspectFill"></image>
					</view>
					<view style="width: 20%;padding:0 10rpx" v-if="mainItem.pic3">
						<image @click="preImage(mainItem,mainItem.pic3)" :src="tools.getImagePath(mainItem.pic3)"
							style="width: 100%;height: 100rpx;border-radius: 8rpx;" mode="aspectFill"></image>
					</view>
					<view style="width: 20%;padding:0 10rpx" v-if="mainItem.pic4">
						<image @click="preImage(mainItem,mainItem.pic4)" :src="tools.getImagePath(mainItem.pic4)"
							style="width: 100%;height: 100rpx;border-radius: 8rpx;" mode="aspectFill"></image>
					</view>
					<view style="width: 20%;padding:0 10rpx" v-if="mainItem.pic5">
						<image @click="preImage(mainItem,mainItem.pic5)" :src="tools.getImagePath(mainItem.pic5)"
							style="width: 100%;height: 100rpx;border-radius: 8rpx;" mode="aspectFill"></image>
					</view>
				</view>
				<view style="margin-top: 10rpx;font-size: 12px;color: #909399">{{mainItem.createTime}}</view>
			</view>

			<view style="flex: 1;height: 0;">
				<scroll-view :scroll-top="scrollTop" class="scroll-view" scroll-y style="height: 100%;" :scroll-with-animation="true">
					<view class="official-content" style="padding: 10rpx;">
						<view v-for="(item,index) in detailList" :key="index"
							:class="item.infoType==1?'display-left':'display-right'">
							<view class="content">
								<view style="display: flex;align-items: center;">
									<template v-if="item.infoType==1">
										<template v-if="item.infoType==1">
											<image style="width: 72rpx;height: 72rpx;border-radius: 50%;" class="avatar"
												src="@/static/images/logo.png">
											</image>
										</template>
										<template v-else>
											<template v-if="endType==0">
												<image v-if="workerInfo.headUrl" class="avatar"
													:src="tools.getImagePath(workerInfo.headUrl)"
													style="width: 72rpx;height: 72rpx;border-radius: 50%;"></image>
												<image v-else style="width: 72rpx;height: 72rpx;border-radius: 50%;" class="avatar"
													src="@/static/images/logo.png">
												</image>
											</template>
											<template v-else>
												<image v-if="myInfo.headImage" class="avatar"
													:src="tools.getImagePath(myInfo.headImage)"
													style="width: 72rpx;height: 72rpx;border-radius: 50%;"></image>
												<image v-else style="width: 72rpx;height: 72rpx;border-radius: 50%;" class="avatar"
													src="@/static/images/logo.png">
												</image>
											</template>
										</template>
										<view style="flex: 1;width: 0;margin-left: 8rpx;">
											<view style="font-size: 14px;font-weight: bolder"
												:style="item.infoType==1?'color: #303133':'color: #ffffff'">
												{{item.status!=7?getStatus(item.status):item.title}}
											</view>
											<view style="font-size: 12px;color: #909399"
												:style="item.infoType==1?'color: #909399':'color: #ffffff'">{{item.createTime}}
											</view>
										</view>
									</template>
									<template v-else>
										<view style="flex: 1;width: 0;margin-right: 8rpx;">
											<view style="font-size: 14px;font-weight: bolder;text-align: right;"
												:style="item.infoType==1?'color: #303133':'color: #ffffff'">
												{{item.status!=7?getStatus(item.status):item.title}}
											</view>
											<view style="font-size: 12px;color: #909399;text-align: right;"
												:style="item.infoType==1?'color: #909399':'color: #ffffff'">{{item.createTime}}
											</view>
										</view>
										<template v-if="item.infoType==1">
											<image style="width: 72rpx;height: 72rpx;border-radius: 50%;" class="avatar"
												src="@/static/images/logo.png">
											</image>
										</template>
										<template v-else>
											<template v-if="endType==0">
												<image v-if="workerInfo.headUrl" class="avatar"
													:src="tools.getImagePath(workerInfo.headUrl)"
													style="width: 72rpx;height: 72rpx;border-radius: 50%;"></image>
												<image v-else style="width: 72rpx;height: 72rpx;border-radius: 50%;" class="avatar"
													src="@/static/images/logo.png">
												</image>
											</template>
											<template v-else>
												<image v-if="myInfo.headImage" class="avatar"
													:src="tools.getImagePath(myInfo.headImage)"
													style="width: 72rpx;height: 72rpx;border-radius: 50%;"></image>
												<image v-else style="width: 72rpx;height: 72rpx;border-radius: 50%;" class="avatar"
													src="@/static/images/logo.png">
												</image>
											</template>
										</template>
									</template>
								</view>
								<view style="font-size: 12px;;margin-top: 10rpx;"
									:style="item.infoType==1?'color: #606266':'color: #ffffff;text-align: right'">{{item.reason}}</view>
								<view style="display: flex;width: 100%" :style="item.infoType==1?'':'justify-content: flex-end;'">
									<view style="width: 20%;padding:0 10rpx" v-if="item.pic1">
										<image @click="preImage(item,item.pic1)" :src="tools.getImagePath(item.pic1)"
											style="width: 100%;height:100rpx;border-radius: 8rpx;" mode="aspectFill"></image>
									</view>
									<view style="width: 20%;padding:0 10rpx" v-if="item.pic2">
										<image @click="preImage(item,item.pic2)" :src="tools.getImagePath(item.pic2)"
											style="width: 100%;height: 100rpx;border-radius: 8rpx;" mode="aspectFill"></image>
									</view>
									<view style="width: 20%;padding:0 10rpx" v-if="item.pic3">
										<image @click="preImage(item,item.pic3)" :src="tools.getImagePath(item.pic3)"
											style="width: 100%;height: 100rpx;border-radius: 8rpx;" mode="aspectFill"></image>
									</view>
									<view style="width: 20%;padding:0 10rpx" v-if="item.pic4">
										<image @click="preImage(item,item.pic4)" :src="tools.getImagePath(item.pic4)"
											style="width: 100%;height: 100rpx;border-radius: 8rpx;" mode="aspectFill"></image>
									</view>
									<view style="width: 20%;padding:0 10rpx" v-if="item.pic5">
										<image @click="preImage(item,item.pic5)" :src="tools.getImagePath(item.pic5)"
											style="width: 100%;height: 100rpx;border-radius: 8rpx;" mode="aspectFill"></image>
									</view>
								</view>
								
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="oper-area dflex-b padding-right padding-left-sm safe-area-inset-bottom" style="position: relative;">
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
				<view class="dflex-e" v-if="detailList.findIndex(item=>item.status==6)==-1">
					<button @click="reply()" class="action-btn main-btn">回复</button>
				</view>
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
		data() {
			return {
				endType: -1,
				httpImageUrl: this.httpImageUrl,
				parentId: 0,
				listData: [],
				statusArray: [{
						text: '客户申述申请',
						value: 0
					},
					{
						text: '平台确认审核',
						value: 1
					},
					{
						text: '修改申诉申请',
						value: 2
					},
					{
						text: '审核申诉进度',
						value: 3
					},
					{
						text: '申诉审核意见',
						value: 4
					},
					{
						text: '申诉信息补充',
						value: 5
					},
					{
						text: '申诉工单关闭',
						value: 6
					},
					{
						text: '自由信息类型',
						value: 7
					},
				],
				detailList: [],
				mainItem: null,
				scrollTop: 0, //滚动条位置
				scrollHeight: 0, // 滚动视图的高度
			}
		},
		onLoad(options) {
			if (options.parentId) {
				this.parentId = options.parentId
			}
			this.endType = uni.getStorageSync('endType')
			this.initScrollHeight();
		},
		onShow() {
			this.getData()	
		},
		onReady() {
		},
		methods: {
			initScrollHeight() {
				uni.createSelectorQuery()
					.in(this)
					.select('.scroll-view')
					.boundingClientRect(data => {
						if (data) {
							this.scrollHeight = data.height
						}
					})
					.exec();
			},
			 // 获取内容高度
			initContentHeight() {
				uni.createSelectorQuery()
					.in(this)
					.select('.official-content')
					.boundingClientRect(data => {
						if (data) {
							let top = data.height - this.scrollHeight;
							if (top > 0) {
								this.scrollTop = top;
							}
						}
					})
					.exec();
			},
			reply() {
				uni.navigateTo({
					url: '/sub-user/pages/appeal/index?orderNo=' + this.mainItem.orderNo + '&parentId=' + this
						.parentId
				})
			},
			getData() {
				const _this=this
				uni.showLoading({
					title: '加载中'
				})
				api.appeal.getInfoById({
					id: this.parentId
				}).then(res => {
					if (res.data) {
						this.mainItem = res.data
					}
				})

				api.appeal.getListByParentId({
					parentId: this.parentId
				}).then(res => {
					this.detailList = res.listData
					uni.hideLoading()
					this.$nextTick(() => {
						_this.initContentHeight()
					})
				}).catch(e => {
					uni.hideLoading()
				})
			},
			getStatus(value) {
				var find = this.statusArray.find(item => item.value == value)
				if (find) {
					return find.text
				}
				return ''
			},
			tohome() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			preImage(item, url) {
				const _this = this
				var urls = []
				if (item.pic1) {
					urls.push(_this.tools.getImagePath(item.pic1))
				}
				if (item.pic2) {
					urls.push(_this.tools.getImagePath(item.pic2))
				}
				if (item.pic3) {
					urls.push(_this.tools.getImagePath(item.pic3))
				}
				if (item.pic4) {
					urls.push(_this.tools.getImagePath(item.pic4))
				}
				if (item.pic5) {
					urls.push(_this.tools.getImagePath(item.pic5))
				}
				uni.previewImage({
					current: _this.tools.getImagePath(url),
					urls: urls,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {},
						fail: function(err) {}
					}
				});
			},
		}
	}
</script>

<style lang="scss">
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
	.display-left {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		margin-bottom: 10rpx;

		.content {
			width: 80%;
			background: #f5f7fa;
			border-radius: 20rpx;
			padding: 10rpx;
		}
	}

	.display-right {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		margin-bottom: 10rpx;

		.content {
			width: 80%;
			background: #82C91E;
			border-radius: 20rpx;
			padding: 10rpx;
			color: #ffffff;
		}
	}
</style>