<template>
	<view class="order-detail">
		<view v-if="orderDetail">
			<order-info :orderDetail="orderDetail"></order-info>
			
			<view class="order-area padding margin-lr margin-tb-sm bg-main border-radius">
				<view class="item dflex-b" style="padding: 10rpx 0;" v-if="endType==2&&type==0" @click="selectWorker">
					<text>选择师傅</text>
					<view class="iconfont fs-sm iconjiantou-01"></view>
				</view>
				<view v-if="type==0" class="item dflex-b" style="padding: 10rpx 0;">
					<text>师傅姓名</text>
					<input :placeholder="endType==0?'请输入师傅姓名':'请选择师傅'" :disabled="endType==2"  style="text-align: right;" v-model="workerName"/>
				</view>
				<view v-if="type==0" class="item dflex-b" style="padding: 10rpx 0;">
					<text>师傅手机号</text>
					<input :placeholder="endType==0?'请输入师傅手机号':'请选择师傅'" :disabled="endType==2"  style="text-align: right;" v-model="workerTelephone"/>
				</view>
				<view class="item dflex-b" style="padding: 10rpx 0;">
					<text>服务时间</text>
					<use-date-time-picker
						fields="second"
						:start="$api.format(new Date())"
						:value = "serviceTime || '请选择服务时间'"
						@change="changeDate"
						@cancel="bindCancel"
					 />
				</view>
				<view class="item dflex-b row-s margin-bottom-sm" style="padding: 10rpx 0;">
					<text class="ws-np">师傅备注</text>
					<textarea v-model="workerMemo" placeholder="请输入师傅备注" style="text-align: right;max-height: 50px;"></textarea>
				</view>
				<view class="item dflex-b row-s margin-bottom-sm" style="padding: 10rpx 0;" v-if="orderDetail.workRemark&&type==0">
					<text class="ws-np">工单要求</text>
					<text class="flex1 fs-xs ft-dark margin-left-sm  padding-left-sm" style="flex: 1; max-height: 300rpx; overflow-y: auto;background-color: #f8f8f8;color:#f0ad4e">{{orderDetail.workRemark || ''}}</text>
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
		components : {
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
				endType: -1,
				orderNo: '',
				id: '',
				orderDetail: null,
				workId: 0,
				workerName:'',
				workerTelephone:'',
				serviceTime:'',
				workRemark:'',
				workerMemo:'',
				type:0
			}
		},
		onLoad(options) {
			if(options.type){
				this.type=options.type
			}else{
				this.type=0
			}
			if(options.id){
				this.id=options.id
			}
			this.orderNo = options.orderNo
			this.endType = uni.getStorageSync('endType')
			this.getOrderDetail()
		},
		methods:{
			submit(){
				const _this=this;
				if(!this.workerName&&this.type==0){
					uni.showToast({
						icon:'none',
						title:_this.endType==2?'请选择师傅': '请输入师傅姓名'
					})
					return
				}
				if(!this.workerTelephone&&this.type==0){
					uni.showToast({
						icon:'none',
						title:_this.endType==2?'请选择师傅':'请输入师傅手机号'
					})
					return
				}
				if(!this.serviceTime || this.serviceTime === '请选择服务时间'){
					uni.showToast({
						icon:'none',
						title: '请选择服务时间'
					});
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
							if(_this.type==0){
								if(_this.endType==2){
									api.workOrder.updateToDispatch({
										orderNo:_this.orderNo,
										workId:_this.workId,
										workerName:_this.workerName,
										workerTelephone:_this.workerTelephone,
										serviceTime:_this.serviceTime,
										workerMemo:_this.workerMemo,
										workRemark:_this.orderDetail.workRemark,
									}).then(res=>{
										uni.hideLoading()
										if(_this.endType==0){
											uni.showModal({
												title: '温馨提示',
												content: '抢单成功',
												showCancel:false,
												success: function(res) {
													if (res.confirm) {
														uni.navigateBack()
													}
												}
											})
										}else{
											uni.showModal({
												title: '温馨提示',
												content: '派单成功',
												showCancel:false,
												success: function(res) {
													if (res.confirm) {
														uni.navigateBack()
													}
												}
											})
										}
									}).catch(e=>{
										
									})
								}else{
									api.workOrder.updateToReassignment({
										orderNo:_this.orderNo,
										workId:_this.workId,
										workerName:_this.workerName,
										workerTelephone:_this.workerTelephone,
										serviceTime:_this.serviceTime,
										workerMemo:_this.workerMemo,
										workRemark:_this.orderDetail.workRemark,
									}).then(res=>{
										uni.hideLoading()
										if(_this.endType==0){
											uni.showModal({
												title: '温馨提示',
												content: '抢单成功',
												showCancel:false,
												success: function(res) {
													if (res.confirm) {
														uni.navigateBack()
													}
												}
											})
										}else{
											uni.showModal({
												title: '温馨提示',
												content: '派单成功',
												showCancel:false,
												success: function(res) {
													if (res.confirm) {
														uni.navigateBack()
													}
												}
											})
										}
									}).catch(e=>{
										
									})
								}
							}else{
								api.workOrder.updateWorkMemoAndServiceTime({
									id:_this.id,
									serviceTime:_this.serviceTime,
									workerMemo:_this.workerMemo,
								}).then(res=>{
									uni.hideLoading()
									uni.showModal({
										title: '温馨提示',
										content: '修改成功',
										showCancel:false,
										success: function(res) {
											if (res.confirm) {
												uni.navigateBack()
											}
										}
									})
								}).catch(e=>{
									
								})
							}
						} else if (res.cancel) {
				
						}
					}
				});
			},
			selectWorker(){
				const _this = this;
				uni.navigateTo({
					url:'/sub-user/pages/worker/list?type=1',
					events: {
						// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						getWorkerItemData: function(data) {
							_this.workerName = data.workerName;
							_this.workerTelephone = data.workerTelephone;
							_this.workId = data.id;
						},
					},
				})
			},
			changeDate(e) {
				this.serviceTime = e
			},
			bindCancel() {
				this.serviceTime = ''
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
						if(this.orderDetail.workerMemo){
							this.workerMemo=this.orderDetail.workerMemo
						}
						if(this.orderDetail.serviceTime){
							this.serviceTime=this.orderDetail.serviceTime
						}
					} else {
						this.workerMemo=''
						this.serviceTime=''
						this.orderDetail = null
					}
					uni.hideLoading()
				}).catch(e => {
					uni.hideLoading()
				})
			},
			getWorkerInfo(){
				uni.showLoading({
					title: '加载中'
				})
				api.worker.getInfo().then(res=>{
					uni.hideLoading()
					if(res.data){
						this.$store.commit("workerInfo", res.data)
					}
					this.workerName=res.data.workerName
					this.workerTelephone=res.data.workerTelephone
					this.workId=res.data.id
				}).catch(e=>{
					uni.hideLoading()
				})
			},
		},
		onReady() {
			if(this.type==0){
				if(this.endType==0){
					uni.setNavigationBarTitle({
						title:'抢单'
					})
					this.getWorkerInfo()
				}else{
					uni.setNavigationBarTitle({
						title:'派单'
					})
				}
			}else{
				uni.setNavigationBarTitle({
					title:'修改'
				})
			}
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