<template>
	<view style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;display: flex;flex-direction: column;">
		<view style="border-bottom: 1px solid #f5f5f5;">
			<u-tabs-swiper active-color="#4cd964" ref="tabs" :current="current" @change="tabsChange" :list="list" :is-scroll="false">
			</u-tabs-swiper>
		</view>
		<view style="flex: 1;height: 0;border-top: 1px solid #f5f5f5;position: relative;">
			<scroll-view scroll-y="true" style="height: 100%" @scrolltolower="getMoreData">
				<view class="limit-area use-area margin-lr-sm pos-r" v-for="(order, idx) in orderList" :key="idx"
					@click="todetails(order)">
					<view class="dflex-b">
						<text>{{order.orderNo}}</text>
						<text class="fs-xs ft-dark" style="color: #82C91E;">
							<template v-if="endType==1">
								<template v-if="order.status>3">已完单</template>
								<template v-else>
									{{ getOrderStatus(order.status) }}
								</template>
							</template>
							<template v-else>
								{{ getOrderStatus(order.status) }}
							</template>
						
						</text>
					</view>
					<view class="dflex-b">
						<text class="title clamp padding-bottom-xs fs-xs">联系人：{{ order.userName }}</text>
						<text class="title clamp padding-bottom-xs fs-xs">工单类型：{{ order.workOrderType }}</text>
					</view>
					<text class="title clamp padding-bottom-xs fs-xs">地址：{{ order.fullAddress }}</text>
					<text class="title clamp padding-bottom-xs fs-xs">联系电话：{{ order.userTelephone }}</text>
					<text class="title clamp padding-bottom-xs fs-xs" v-if="endType==0"
						style="color:#81c71f">工单金额：{{ order.revenue ? ('￥'+ order.revenue) :'未报价' }}</text>
					<text class="title clamp padding-bottom-xs fs-xs" v-else-if="endType==1"
						style="color:#81c71f">工单金额：{{ order.originalAmount ? ('￥'+ order.originalAmount) :'未报价' }}</text>
						
					<view class="dflex-e">
						<view class="dflex" v-if="order.status == 1&&endType==0">
							<button class="action-btn main-btn" @click.stop="secKillOrder(order)">抢单</button>
						</view>
						<view class="dflex" v-if="order.status == 3 && order.workId === workerInfo.id && endType==0">
							<button class="action-btn main-btn" @click.stop="editOrder(order)">修改</button>
						</view>
						<view class="dflex" v-if="order.status == 3 && order.workId === workerInfo.id && endType==0">
							<button class="action-btn main-btn" @click.stop="giveupOrder(order)">弃单</button>
						</view>
						<view class="dflex" v-if="order.status == 3 && order.workId === workerInfo.id && endType==0">
							<button class="action-btn main-btn" @click.stop="completePost(order)">完单</button>
						</view>
						<view class="dflex" v-if="order.status == 4 && order.workId === workerInfo.id && endType==0">
							<button class="action-btn main-btn" @click.stop="backData(order)">回退</button>
						</view>
						<view class="dflex" v-if="(order.status == 1||order.status == 3) && order.userId === myInfo.id && endType==1">
							<button class="action-btn main-btn" @click.stop="cancelPost(order)">取消</button>
						</view>
						<view v-if="order.status >= 4 && order.userId==myInfo.id &&endType==1 && order.userEvaluate==-1">
							<button @click.stop="evaluateOrder(order)" class="action-btn main-btn">评价</button>
						</view>
					</view>
				</view>
			
			<view v-if="orderList.length<=0&&isRequestBack" class="limit-area use-area margin-lr-sm pos-r">
				<!-- 空白页 -->
				<use-empty tip="暂无数据" :btnTip="null" height="50vh" :auto="false"></use-empty>
			</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	import {
		mapState
	} from 'vuex';
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
				httpImageUrl: this.httpImageUrl,
				list: [],
				current: -1,
				pageNo: 1,
				pageSize: 30,
				orderList: [],
				isRequestBack: false,
				endType:0,
				status:-1,
				statusArray:[
					{text:'待核实',value:0},
					{text:'待接单',value:1},
					{text:'已取消',value:2},
					{text:'已接单',value:3},
					{text:'已完单',value:4},
					{text:'待审核',value:5},
					{text:'待付款',value:6},
					{text:'已完成',value:7},
				]
			}
		},
		onLoad(options) {
			const _this = this;
			this.endType = uni.getStorageSync('endType')
			if(options.status){
				_this.status = options.status
			}else{
				_this.status=-1
			}
			if(this.endType==0){
				this.list=[
					{name:'全部',value:-1},
					{name:'已接单',value:3},
					{name:'已完单',value:4},
					{name:'待审核',value:5},
					{name:'待付款',value:6},
					{name:'已完成',value:7},
				]
			}else{
				this.list=[
					{name:'全部',value:-1},
					{name:'待接单',value:1},
					{name:'已接单',value:3},
					{name:'已完单',value:4},
					{name:'已取消',value:2},
				]
			}
			this.current=this.list.findIndex(item=>item.value==this.status)
		},
		onShow() {
			const _this = this;
			_this.getData()
		},
		methods:{
			backData(item){
				const _this=this;
				uni.showModal({
					title: '温馨提示',
					content: '确定要回退吗?',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title:'加载中'
							})
							api.workOrder.updateToBackFromComplete({
								orderNo:item.orderNo,
							}).then(res=>{
								uni.hideLoading()
								uni.showToast({
									icon:'none',
									title:'回退成功'
								})
								_this.getOrderList()
							}).catch(e=>{
								uni.hideLoading()
							})
							
						} else if (res.cancel) {
				
						}
					}
				});
			},
			getData(){
				const _this=this;
				_this.tools.miniCallBack(async function() {
					if(_this.endType==0&&(!_this.workerInfo||!_this.workerInfo.id)){
						const workerInfo= await _this.getWorkerInfo()
					}else if(!_this.myInfo||!_this.myInfo.id){
						const userInfo = await _this.getUserInfo()
					}
					_this.getOrderList();
				}, function() {
					_this.canLoadMore = false
					_this.isRequestBack = true;
				})
			},
			getWorkerInfo() {
				const _this=this
				return new Promise((resolve, reject)=>{
					api.worker.getInfo().then(res => {
						if (res.data) {
							_this.$store.commit("updateWorkerInfo", res.data)
						}
						resolve(res)
					}).catch(e=>{
						reject(e)
					})
				})
			},
			getUserInfo() {
				const _this = this;
				return new Promise((resolve, reject)=>{
					api.user.getDbUserInfo().then(res => {
						if (res.data && res.data.user) {
							_this.$store.commit("updateMyInfo", res.data.user)
							uni.setStorageSync('userId', res.data.user.id)
						}
						resolve(res)
					}).catch(e=>{
						reject(e)
					})
				})
			},
			getOrderStatus(status){
				var find=this.statusArray.find(item=>item.value==status)
				return find.text
			},
			secKillOrder(item){
				uni.navigateTo({
					url:'/sub-user/pages/workOrder/dispatch?orderNo='+item.orderNo
				})
			},
			editOrder(item){
				uni.navigateTo({
					url:'/sub-user/pages/workOrder/dispatch?type=1&orderNo='+item.orderNo+'&id='+item.id
				})
			},
			giveupOrder(item){
				uni.navigateTo({
					url:'/sub-user/pages/workOrder/drop?orderNo='+item.orderNo
				})
			},
			cancelPost(item){
				uni.navigateTo({
					url:'/sub-user/pages/workOrder/cancel?orderNo='+item.orderNo
				})
			},
			completePost(item){
				uni.navigateTo({
					url:'/sub-user/pages/workOrder/complete?orderNo='+item.orderNo
				})
			},
			evaluateOrder(item){
				uni.navigateTo({
					url:'/sub-user/pages/workOrder/evaluate?orderNo='+item.orderNo
				})
			},
			getOrderList(){
				const _this = this;
				_this.tools.miniCallBack(function() {
					uni.showLoading({
						title: '加载中'
					})
					api.workOrder.getList({
						keyWord:'',
						startTime:'',
						endTime:'',
						orderNo:'',
						userName:'',
						status:_this.list[_this.current].value,
						workId:_this.endType==0&&_this.workerInfo?_this.workerInfo.id:-1,
						userId:_this.endType==1&&_this.myInfo?_this.myInfo.id:-1,
						pageNo:_this.pageNo,
						pageSize:_this.pageSize,
						workOrderType:'',
					}).then(res=>{
						_this.canLoadMore = true;
						if (res.code == 0) {
							if (_this.pageNo == 1) {
								_this.orderList = (res.data.listData);
							} else {
								_this.orderList = _this.orderList.concat(res.data.listData);
							}
							if (res.data.listData.length < _this.pageSize) {
								_this.canLoadMore = false;
							}
						} else {
							_this.canLoadMore = false;
						}
						_this.isRequestBack = true
						uni.hideLoading()
						uni.stopPullDownRefresh()
						_this.loadingSkeleton = false;
					}).catch(e => {
						_this.canLoadMore = false
						_this.isRequestBack = true;
						uni.stopPullDownRefresh()
					})
				}, function() {
					_this.canLoadMore = false
					_this.isRequestBack = true;
					uni.stopPullDownRefresh()
				})
			},
			tabsChange(index) {
				this.current = index;
				this.pageNo=1
				this.getOrderList();
			},
			getMoreData(){
				var _this = this;
				if (_this.canLoadMore) {
					_this.pageNo++;
					_this.getOrderList();
				}
			},
			todetails(item) {
				uni.navigateTo({
					url:'/sub-user/pages/workOrder/detail?orderNo='+item.orderNo
				})
			},
		},
		onPullDownRefresh: function() {
			var _this = this;
			_this.pageNo = 1;
			_this.canLoadMore = true;
			_this.getOrderList();
		},
		onReachBottom: function() {
			var _this = this;
			if (_this.canLoadMore) {
				_this.pageNo++;
				_this.getOrderList();
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