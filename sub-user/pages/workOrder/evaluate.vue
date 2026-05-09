<template>
	<view class="order-detail">
		<view v-if="orderDetail">
			<order-info :orderDetail="orderDetail"></order-info>

			<view class="order-area padding margin-lr margin-tb-sm bg-main border-radius">
				<view>
					<view class="item" style="display: flex;">
						<text style="margin-right: 20rpx;">客户评分</text>
						<view class="dflex fs-xs ft-dark">
							<!-- <use-rate class="line-height-1" @change="rateChange" :value="userEvaluate"></use-rate> -->
							<view style="width: 100%;">
								<view style="display: flex;align-items: center;" v-for="(item,index) in evaluateList"
									:key="index">
									<view style="color: #303313;margin-right: 20rpx;font-size: 24rpx;">{{item.name}}
									</view>
									<uv-rate v-model="item.currentValue" activeColor="#82C91E" allowHalf></uv-rate>
								</view>
							</view>
						</view>
					</view>
					<view class="item">
						<text>评价</text>
						<view class="dflex fs-xs ft-dark">
							<textarea class="bg-drak w-full border-radius-sm margin-top-sm padding-sm"
								style="min-height: 70px;" maxlength="200" auto-height placeholder="请输入评价"
								v-model="userEvaluateComment">
							 </textarea>
						</view>
					</view>
				</view>
				<view style="display: flex;align-items: center;justify-content: center;padding: 40rpx 20rpx;">
					<view style="width: 100%;padding: 20rpx 0;" @click="submit()"
						class="border-radius-big bg-base dflex-c padding-lr">
						<view>确定</view>
					</view>
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
	import OrderInfo from '../../components/order-info.vue'
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
				userEvaluate: 0,
				userEvaluateComment: '',
				evaluateList: []
			}
		},
		onLoad(options) {
			this.orderNo = options.orderNo
			this.getEvaluate()
			this.getOrderDetail()
		},
		methods: {
			getEvaluate() {
				api.workOrder.getEvaluateList().then(res => {
					let list = res.listData.sort((a, b) => b.level - a.level);
					list.forEach(item => {
						item.parent = {
							id: item.id
						}
						item.id = -1
					})
					this.evaluateList = list
				})
			},
			submit() {
				const _this = this;
				// if (_this.userEvaluate <= 0) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '请评分'
				// 	})
				// 	return
				// }
				uni.showModal({
					title: '温馨提示',
					content: '确定要提交吗?',
					success: function(res) {
						if (res.confirm) {
							let evaluateList = []
							let userEvaluateList = JSON.parse(JSON.stringify(_this.evaluateList));
							userEvaluateList.forEach(item => {
								item.currentValue = item.currentValue * 20
								item.type = 2
								item.dataType = 0
								evaluateList.push(item)
							})
							uni.showLoading({
								title: '加载中'
							})
							api.workOrder.updateEvaluate({
								orderNo: _this.orderNo,
								evaluateList:evaluateList,
								userEvaluate: _this.userEvaluate >= 0 ? _this.userEvaluate : 0,
								userEvaluateComment: _this.userEvaluateComment ? _this
									.userEvaluateComment : '',
							}).then(res => {
								uni.showModal({
									title: '温馨提示',
									content: '评价成功',
									showCancel: false,
									success: function(res) {
										if (res.confirm) {
											uni.navigateBack()
										}
									}
								})
							}).catch(e => {
								uni.hideLoading()
							})

						} else if (res.cancel) {

						}
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
					} else {
						this.orderDetail = null
					}
					uni.hideLoading()
				}).catch(e => {
					uni.hideLoading()
				})
			},
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