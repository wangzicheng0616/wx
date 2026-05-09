<template>
	<view class="margin-sm">
		<!-- 搜索内容区 -->
		<view class="search-area margin-bottom-sm pos-r w-full dflex-b border-radius-big margin-top-sm">
			<view class="dflex-c flex1">
				<view class="icon-search pos-a">
					<text class="iconfont iconsousuo-01"></text>
				</view>
				<input type="text" class="padding-left w-full padding-tb-xs  box-sizing-b" maxlength="20" 
					 style="border-top-right-radius: 0;border-bottom-right-radius: 0;" focus
					placeholder="请输入关键字" @confirm="search" v-model="keyWord" />
			</view>
		
			<view class="bg-base padding-tb-16 padding-lr-lg" @click="search">搜索</view>
		</view>
		
		<!-- 空白页 -->
		
		<view>
			<view class="margin-lr-sm margin-top" >
				<scroll-view scroll-x>
					<view class="dflex">
						<button class="action-btn" @click="changeType('')" :class="{'main-btn':workOrderType === ''}">全部</button>
						<button class="action-btn"  @click="changeType(item)" v-for="item in typeData" :key="item" :class="{'main-btn':workOrderType === item}">{{ item }}</button>
					</view>
				</scroll-view>
			</view>
			<use-empty v-if="empty&&isRequestBack" e-style="round" e-type="search" tip="搜索数据为空" btn-tip="重新搜索" height="50vh" :auto="false" @goto="search"></use-empty>
			<view v-else  >
				<!-- 订单列表区 -->
				<view  class="limit-area use-area margin-lr-sm pos-r" v-for="(order, idx) in orderDatas" :key="idx"
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

		<!-- 置顶 -->
		<use-totop ref="usetop"></use-totop>
		
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import api from '@/common/api.js'
	export default {
		computed: {
			
		},
		data() {
			return {
				typeData: [],
				// 搜索关键字
				keyWord: '',
				empty: true,
				headerPosition: "fixed",
				// 订单数据
				orderDatas: [],
				// 加载更多状态
				loadmoreType: 'more',
				// 请求数据
				reqdata:{
					pageNum: 1,
					pageSize: 30,
				},
				total:0,
				scrollTop: 0,
				workOrderType: '',
				topCategory:[],	// 顶部可滑动种类内容数组
				currentIndex:0, // 当前选中的index
				scrollLeft: 0, // 横向滚动条位置
				screenWidth: 0, //屏幕宽度
				endType: -1, //终端类型 0师傅端 1用户端 2管理员端 默认1
				isRequestBack:false
			};
		},
		watch: {
			// 显示空白页
			orderDatas(e) {
				let empty = e.length === 0;
				if (this.empty !== empty) {
					this.empty = empty;
				}
			}
		},
		onPageScroll(e) {
			// 兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = "fixed";
			} else {
				this.headerPosition = "absolute";
			}
			// this.scrollTop = e.scrollTop
			this.$refs.usetop.change(e.scrollTop);
		},
		//下拉刷新
		onPullDownRefresh() {
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom() {
			this.loadData();
		},
		onLoad(options) {
			this.endType=uni.getStorageSync('endType')
			this.getWorkerType();
		},
		mounted() {
			
		},
		onShow() {
			// 初始化
			this.keyWord = '';

			// 加载数据
			this.loadData('refresh');
		},
		methods: {
			getWorkerType(){
				api.dictionary.info({
					number: 'WORK_ORDER_TYPE'
				}).then(res=>{
					if(res.listData){
						var list=[]
						res.listData.forEach(item=>{
							list.push(item.name)
						})
						this.typeData=list
					}
				}).catch(e=>{
				})
			},
			// 加载商品，下拉刷新|上拉加载
			async loadData(type = 'add', loading) {

				if (this.loadmoreType === 'loading') {
					// 防止重复加载
					return;
				}

				if (loading == 1 || type == 'refresh') {
					// 从首页开始加载
					this.reqdata.pageNum = 1;
				}

				// 没有更多直接返回 
				if (type === 'add') {
					if (this.loadmoreType === 'nomore') {
						return;
					}
					// 加载中
					this.loadmoreType = 'loading';
				} else {
					// 更多
					this.loadmoreType = 'more'
				}
				uni.showLoading({
					title:'加载中'
				})
				api.workOrder.getList({
					keyWord:this.keyWord,
					startTime:'',
					endTime:'',
					orderNo:'',
					userName:'',
					status:1,
					workId:-1,
					userId:-1,
					pageNo:this.reqdata.pageNum,
					pageSize:this.reqdata.pageSize,
					workOrderType:this.workOrderType,
				}).then(res=>{
					if (res.data.listData && res.data.listData.length > 0) {
						if(loading == 1 || type == 'refresh'){
							this.orderDatas = res.data.listData
						}else{
							this.orderDatas = [...this.orderDatas, ...res.data.listData];
						}
						this.total = res.data.totalSize
						if (this.orderDatas.length < this.total) {
							this.reqdata.pageNum++;
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
					uni.hideLoading()
				}).catch(e=>{
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					uni.hideLoading()
					this.isRequestBack=true
				})
			},
			changeType (item) {
				this.workOrderType = item
				this.loadData('refresh', 1)
			},
			todetails(item){
				uni.navigateTo({
					url:'/sub-user/pages/workOrder/detail?orderNo='+item.orderNo
				})
			},
			// 搜索
			search() {
				this.loadData('refresh', 1)
			},

		}
	};
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}
	
	.search-area {
		
		input {
			padding-left: 80rpx;
			height: 76rpx;
			line-height: 76rpx;
			background-color: #fff;
		}
		
		.icon-search {
			top: 50%;
			left: 30rpx;
			transform: translate(0, -50%);
			z-index: 1;
		
			text {
				color: #c0c0c0;
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
			background: rgb(129, 199, 31);;
			color: #fff;
	
			&:after {
				border-color: rgb(129, 199, 31);;
			}
		}
	}
</style>
