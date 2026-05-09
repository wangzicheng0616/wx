<template>
	<use-loading v-if="loaded && !swiperDatas" mode="pos-r margin-right-xs"></use-loading>
	<view v-else class="box-sizing-b w-full">
		<!-- 01. 头部组件 -->
		<use-header :fixed="true" :search-tip="searchTip" :search-auto="searchAuto" type="gray" @search="search">
			<view @click="goAddOrder()" slot="right" v-if="endType==1" style="display: flex;flex-direction: column;align-items: center;justify-content: center;padding-left: 10rpx;">
				<!-- <view class="iconjia iconfont"></view> -->
				<view style="word-break: keep-all;font-size: 32rpx;font-weight: bold;" class="main-color">发布</view>
			</view>
		</use-header>

		<!-- 02. 轮播区 -->
		<view v-if="swiperDatas && swiperDatas.length > 0" class="swiper-area margin-lr-sm border-radius pos-r">
			<!-- 轮播组件 -->
			<swiper class="swiper w-full" :autoplay="autoplay" indicator-dots indicator-color="#f7f7f7"
				indicator-active-color="#82C91E" previous-margin="30px" next-margin="30px" circular :current="swiperIdx"
				@change="swiperChange">
				<swiper-item v-for="(item, idx) in swiperDatas" :key="idx" class="swiper-item wh-full box-sizing-b">
					<view class="wh-full animated-all" :style="{ 'transform': `scale(${swiperIdx == idx ? 1 : 0.93})` }"
						@click.stop="toContent(item)">
						<image class="border-radius wh-full" mode="aspectFill" lazy-load
							:src="tools.getImagePath(item.pic)" />
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="margin-lr-sm margin-top" v-show="endType==0||endType==2">
			<scroll-view scroll-x style="width: 100%;">
				<view>
					<view class="dflex">
						<button class="action-btn" @click="changeType({name:''})"
							:class="{'main-btn':workOrderType === ''}">全部</button>
						<button class="action-btn" @click="changeType(item)" v-for="item in workOrderTypeArray" :key="item"
							:class="{'main-btn':workOrderType === item.name}">{{ item.name }}</button>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 订单列表 -->
		<scroll-view>
			<view v-show="endType==0||endType==2">
				<view v-if="isRequestBack&&!orderDatas.length" class="limit-area use-area margin-lr-sm pos-r">
					<!-- 空白页 -->
					<use-empty tip="暂无数据" :btnTip="null" height="50vh" :auto="false"></use-empty>
				</view>
				<view v-else>
					<view class="limit-area use-area margin-lr-sm pos-r" v-for="(order, idx) in orderDatas" :key="idx"
						@click="todetails(order)">
						<view class="dflex-b">
							<text class="title clamp padding-bottom-xs fs-xs">联系人：{{ order.userName }}</text>
							<text class="title clamp padding-bottom-xs fs-xs">工单类型：{{ order.workOrderType }}</text>
						</view>
						<text class="title clamp padding-bottom-xs fs-xs" style="width: 70%">地址：{{ order.fullAddress }}</text>
						<!-- <text class="title clamp padding-bottom-xs fs-xs">联系电话：{{ order.userTelephone }}</text> -->
						<text class="title clamp padding-bottom-xs fs-xs"
							style="color:#81c71f">工单金额：{{ order.revenue ? ('￥'+ order.revenue) :'未报价' }}</text>
				
						<button class="pos-a action-btn main-btn" style="right: 20rpx;bottom:20rpx;">{{endType==0?'抢单':'派单'}}</button>
					</view>
					<!-- 上拉加载更多 -->
					<use-loadmore :type="loadmoreType"></use-loadmore>
				</view>
			</view>
			<view v-show="endType==1">
				<!-- <view v-if="isRequestBack&&!workerDatas.length" class="limit-area use-area margin-lr-sm pos-r"> -->
				<view v-if="true" class="limit-area use-area margin-lr-sm pos-r">
					<!-- 空白页 -->
					<use-empty tip="暂无数据" :btnTip="null" height="50vh" :auto="false"></use-empty>
				</view>
				<view v-else>
					<view class="limit-area use-area margin-lr-sm pos-r" v-for="(item, idx) in workerDatas" :key="idx"
						@click="toWorkerDetail(item)">
						<view style="display:flex;width:100%">
							<image v-if="item.headUrl" :src="tools.getImagePath(item.headUrl)" style="width:120rpx;height:120rpx;border-radius: 12rpx;"></image>
							<image v-else src="../../static/images/logo.png" style="width:120rpx;height:120rpx"></image>
							<view style="padding-left: 20rpx;flex: 1;width: 0;">
								<view class="dflex-b">
									<text class="title clamp padding-bottom-xs fs-xs">师傅名称：{{ item.workerName }}</text>
								</view>
								<text class="title clamp padding-bottom-xs fs-xs">技能：{{ item.tag?item.tag:'' }}</text>
								<!-- <view class="title clamp padding-bottom-xs fs-xs">
									标签：{{ item.evaluateTags?item.evaluateTags:'' }}</view> -->
								<view class="title padding-bottom-xs fs-xs"
									style="display: flex;align-items: center;width: 100%;">评分：
									<template v-if="item.evaluate&&item.evaluate>=0">
										<view style="display: flex;align-items: center;flex: 1;width: 0;">
											<uv-rate :value="Math.floor(item.evaluate)>=100?5:Math.floor(item.evaluate)/20"
												:readonly="true" activeColor="#82C91E" allowHalf></uv-rate>
											<view>（{{item.evaluate>=100?100:item.evaluate}}分/100分）</view>
										</view>
									</template>
									<template v-else>
										<view style="display: flex;align-items: center;flex: 1;width: 0;">
											<uv-rate class="line-height-1" :disabled="true"
												:value="0"></uv-rate>
										</view>
									</template>
								</view>
							</view>
						</view>
					</view>
					<!-- 上拉加载更多 -->
					<use-loadmore :type="loadmoreType"></use-loadmore>
				</view>
			</view>
		</scroll-view>
		<!-- 开屏广告 -->
		<use-popup v-if="adItem" v-model="adShow" bgclass=" " mode="center" :maskCloseAble="true">
			<view class="bg-main pos-r border-radius-top30">
				<view class="pos-a pos-top pos-right padding-sm" @click="adShow = false">
					<view class="iconfont iconguanbi"></view>
				</view>
				<view class="dflex">
					<view class="dflex-c">
						<image class="headimg border-radius" style="width: 600rpx;height: 800rpx;"
							:src="tools.getImagePath(adItem.pic)" @click="toContent(adItem)"></image>
					</view>
				</view>
			</view>
		</use-popup>
		<!-- 置顶 -->
		<use-totop ref="usetop" type="tabbar"></use-totop>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	import global from '../../utils/global.js'
	import QSPopup from '../../components/QS-popup/QS-popup.vue';
	export default {
		components: {
			QSPopup,
		},
		data() {
			return {
				httpImageUrl: this.httpImageUrl,
				workOrderTypeArray: [],
				workOrderType: '',
				// 头部参数
				searchAuto: !0,
				searchTip: '请输入搜索关键字',
				// 轮播区
				swiperDatas: null,

				scrollTop: 0,
				swiperIdx: 0,
				autoplay: true,
				loadmoreType: 'more',
				orderDatas: [],
				workerDatas:[],
				isRequestBack:false,
				total: 0,
				reqdata: {
					pageNo: 1,
					pageSize: 30,
				},
				adShow: false,
				adItem: null,
				loaded: true,

				endType: -1, //终端类型 0师傅端 1用户端 2管理员端 默认1
				shareEndType:-1,//分享出去的终端类型
				workOrderId: 0,
				
				chageEndType:false
			}
		},
		onLoad(options) {
			const _this = this;
			if (options.recUserId) {
				getApp().globalData.recUserId = options.recUserId
			}
			if (options.scene) {
				var sceneObject = _this.getSceneObject(decodeURIComponent(options.scene))
				if (sceneObject.recUserId) {
					getApp().globalData.recUserId = sceneObject.recUserId
				}
				if (sceneObject.shareEndType==0||sceneObject.shareEndType==1||sceneObject.shareEndType==2) {
					this.shareEndType = sceneObject.shareEndType
				}
			}
			if (options.workOrderId) {
				this.workOrderId = options.workOrderId
			}
			if (options.shareEndType==0||options.shareEndType==1||options.shareEndType==2) {
				this.shareEndType = options.shareEndType
			}
			this.getWorkerType()
		},
		onPageScroll(e) {
			// this.scrollTop = e.scrollTop
			if (this.$refs.usetop) {
				this.$refs.usetop.change(e.scrollTop);
			}
		},
		onShow() {
			const _this = this
			// 自动切换轮播
			this.autoplay = true;
			const storageEndType = uni.getStorageSync('endType')
			if(storageEndType!=this.endType&&this.endType!=-1){
				this.chageEndType=true
			}else{
				this.chageEndType=false
			}
			if(!storageEndType && storageEndType !== 0){
				this.endType=1
			}else{
				this.endType = storageEndType
			}
			this.updateEndType()
			_this.tools.miniCallBack(async function() {
				const res = await _this.handleShareData()
				_this.getData()
			}, function() {
				_this.miniLogin();
			})
		},
		onHide() {
			// 关闭自动切换轮播
			this.autoplay = false;
		},
		//#ifdef MP-WEIXIN
		onShareAppMessage(res) {
			const _this = this;
			return _this.getMiniShareObj('', '', '')
		},
		//#endif
		onPullDownRefresh() {
			const _this = this;
			this.loadOrderData('refresh');
			_this.getHomeBanner();
		},
		onReachBottom: function() {
			var _this = this;
			this.loadOrderData();
		},
		methods: {
			getWorkerType(){
				api.dictionary.info({
					number: 'WORK_ORDER_TYPE'
				}).then(res=>{
					if(res.listData){
						this.workOrderTypeArray=res.listData
					}
				}).catch(e=>{
				})
			},
			getData(){
				const _this=this
				_this.getUserInfo()
				if(_this.endType==0){
					this.getWorkerInfo()
				}
				//师傅端管理带你获取工单 用户端获取师傅列表
				this.loadOrderData('refresh');
				//获取轮播图
				_this.getHomeBanner();
				//如果是分享过来的跳转到工单详情
				_this.goWorkOrderDetail();
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
				}).catch(e => {
					uni.hideLoading()
				})
			},
			updateEndType(){
				this.$store.commit("updateEndType", this.endType)
			},
			handleShareData(){
				const _this=this
				new Promise((resolve) => {
					if(_this.shareEndType==-1){
						resolve()
					}else{
						api.user.getDbUserInfo().then(res => {
							if (res.data && res.data.user) {
								//TODO 判断分享的终端类型与本地终端类型
								
							}
							_this.updateEndType()
							resolve()
						}).catch(e=>{
							_this.endType==1
							_this.updateEndType()
							resolve()
						})
					}
				})
			},
			goWorkOrderDetail() {
				if (this.workOrderId&&this.endType==0) {
					//跳转工单详情 跳转后将id赋值为0
				}
			},
			miniLogin() {
				const _this = this;
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
							const res = await _this.handleShareData()
							_this.getData()
						}).catch(res => {});
					}
				})
			},
			getUserInfo() {
				const _this = this;
				api.user.getDbUserInfo().then(res => {
					if (res.data && res.data.user) {
						_this.$store.commit("updateMyInfo", res.data.user)
						uni.setStorageSync('userId', res.data.user.id)
					}
				})
			},
			getSceneObject(scene) {
				var obj = {};
				for (var i = 0; i < scene.split('*').length; i++) {
					var arr = scene.split('*')[i].split('/');
					obj[arr[0]] = arr[1];
				}
				return obj
			},
			loadOrderData(type = 'add', loading) {
				if (this.loadmoreType === 'loading') {
					// 防止重复加载
					return;
				}
				if (loading == 1 || type == 'refresh') {
					// 从首页开始加载
					this.reqdata.pageNo = 1;
					if(this.endType==0||this.endType==2){
						this.orderDatas = []
					}else{
						this.workerDatas=[]
					}
				}

				// 没有更多直接返回 
				if (type === 'add') {
					// if (this.loadmoreType === 'nomore') {
					// 	return;
					// }
					// 加载中
					this.loadmoreType = 'loading';
				} else {
					// 更多
					this.loadmoreType = 'more'
				}
				// 加载中
				this.loadmoreType = 'loading';
				this.isRequestBack=false
				if(this.endType==0||this.endType==2){
					//工单请求
					api.workOrder.getList({
						keyWord:'',
						startTime:'',
						endTime:'',
						orderNo:'',
						userName:'',
						status:1,
						workId:-1,
						userId:-1,
						pageNo:this.reqdata.pageNo,
						pageSize:this.reqdata.pageSize,
						workOrderType:this.workOrderType,
					}).then(res=>{
						if (res.data.listData && res.data.listData.length > 0) {
							if(loading == 1 || type == 'refresh'||this.reqdata.pageNo==1){
								this.orderDatas = res.data.listData
							}else{
								this.orderDatas = [...this.orderDatas, ...res.data.listData];
							}
							this.total = res.data.totalSize
							this.loaded = false
							if (this.orderDatas.length < this.total) {
								this.reqdata.pageNo++;
								this.loadmoreType = 'more'
							} else {
								this.loadmoreType = 'nomore'
							}
						} else {
							this.orderDatas=[]
							this.loadmoreType = 'nomore'
						}
						if (type === 'refresh') {
							uni.stopPullDownRefresh();
						}
						this.isRequestBack=true
					}).catch(e=>{
						this.isRequestBack=true
					})
				}else{
					//师傅请求
					api.worker.getList({
						keyWord:'',
						startTime:'',
						endTime:'',
						workerName:'',
						workerTelephone:'',
						status:1,
						state:2,
						pageNo:this.reqdata.pageNo,
						pageSize:this.reqdata.pageSize,
					}).then(res=>{
						if (res.data.listData && res.data.listData.length > 0) {
							if(loading == 1 || type == 'refresh'||this.reqdata.pageNo==1){
								this.workerDatas = res.data.listData
							}else{
								this.workerDatas = [...this.workerDatas, ...res.data.listData];
							}
							this.total = res.data.totalSize
							this.loaded = false
							if (this.workerDatas.length < this.total) {
								this.reqdata.pageNo++;
								this.loadmoreType = 'more'
							} else {
								this.loadmoreType = 'nomore'
							}
						} else {
							this.workerDatas=[]
							this.loadmoreType = 'nomore'
						}
						if (type === 'refresh') {
							uni.stopPullDownRefresh();
						}
						this.isRequestBack=true
					}).catch(e=>{
						this.isRequestBack=true
					})
				}
			},
			//首页轮播
			getHomeBanner() {
				const _this = this;
				api.home.homeBanner({
					endType: this.endType==1?1:0,
					displayType: -1
				}).then(res => {
					this.swiperDatas = res.listData.filter(item => item.displayType == 0) || [];
					// 开屏广告
					var resList = res.listData.filter(item => item.displayType == 1)
					if (resList && resList.length > 0) {
						const latest_time = uni.getStorageSync('__fg_ad_show_time')
						if (resList[0] && new Date().getTime() - latest_time > 86400000) {
							this.adItem = resList[0]
							setTimeout(() => {
								this.adShow = true
								uni.setStorage({
									key: '__fg_ad_show_time',
									data: new Date().getTime()
								});
							}, 400)
						}
					}
				})
			},
			changeType(item) {
				this.workOrderType = item.name
				this.loadOrderData('refresh', 1)
			},
			swiperChange(res) {
				if (res.detail) {
					this.swiperIdx = res.detail.current;
				}
			},
			// 搜索回调函数
			search() {
				if(this.endType==1){
					uni.navigateTo({
						url:'/sub-user/pages/worker/list'
					})
				}else{
					uni.navigateTo({
						url:'/sub-user/pages/workOrder/search'
					})
				}
			},
			// 跳转页面
			toContent(item) {
				if (item.click) {
					if (item.type == 0) {
						uni.navigateTo({
							url: '/pages/web/index?src=' + encodeURIComponent(item.click)
						})
					} else if (item.type == 1) {
						const id = item.click.split(':')[0]
						uni.navigateTo({
							url:'/sub-user/pages/news/detail?id='+ id
						})
					}
				}
			},
			getSceneObject(scene) {
				var obj = {};
				for (var i = 0; i < scene.split('*').length; i++) {
					var arr = scene.split('*')[i].split('/');
					obj[arr[0]] = arr[1];
				}
				return obj
			},
			todetails(item) {
				uni.navigateTo({
					url:'/sub-user/pages/workOrder/detail?orderNo='+item.orderNo
				})
			},
			toWorkerDetail(item) {
				uni.navigateTo({
					url:'/sub-user/pages/worker/detail?id='+item.id
				})
			},
			goAddOrder(){
				uni.navigateTo({
					url:'/sub-user/pages/workOrder/create'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}

	/* 轮播图区 */
	.swiper-area {
		.swiper {
			height: 240rpx;
		}
	}

	/* 操作按钮 */
	.action-btn {
		min-width: 186rpx;
		height: inherit;
		line-height: inherit;
		margin: 0;
		margin-left: 20rpx;
		padding: 12rpx 0;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		background: #fff;
		word-break: keep-all;
		border-radius: 100px;
		/* #ifdef MP-QQ || MP-ALIPAY */
		border: 1px solid;
		/* #endif */

		&:after {
			border-radius: 100px;
		}

		&.main-btn {
			background: rgb(129, 199, 31);
			color: #fff;

			&:after {
				border-color: rgb(129, 199, 31);
			}
		}
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
		display: none;
	}
</style>