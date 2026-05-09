<template>
	<view class="u-skeleton">
		<view>
			<view class="mine-bg" style="display: flex;align-items: center;justify-content: center;flex-direction: column;">
				<view class="list-head-img-bg" style="margin-top: 20px">
					<u-image v-if="workerInfo.headUrl" shape="circle" :lazy-load="true" :src="tools.getImagePath(workerInfo.headUrl)"
						width="65px" height="65px">
						<view slot="error"
							class="width-100-p height-100-p display-flex-row align-items-center justify-content-center">
							<image style="width: 100%;height: 100%;border-radius: 50%;" mode="aspectFill"
								src="@/static/images/logo.png"></image>
						</view>
					</u-image>
					<u-image v-else shape="circle" :lazy-load="true" :src="tools.getImagePath(myInfo.headImage)"
						width="65px" height="65px">
						<view slot="error"
							class="width-100-p height-100-p display-flex-row align-items-center justify-content-center">
							<image style="width: 100%;height: 100%;border-radius: 50%;" mode="aspectFill"
								src="@/static/images/logo.png"></image>
						</view>
					</u-image>
				</view>
				<view class="font-size-16" style="font-weight: bold;margin-top: 16px;color: #ffffff;">
					{{myInfo.name}}
				</view>

				<view class="font-size-14"
					style="width:100%;padding:6px 0;display: flex;flex-direction: row;color: white;margin: 10px 0 20px 0">
					<view
						style="display: flex;flex: 1;flex-direction: column;justify-content: center;align-items: center;padding: 4px 0 4px 0">
						<view>{{avilableAmount}}</view>
						<view class="margin-top-2">可用金额</view>
					</view>

					<view
						style="display: flex;flex: 1;flex-direction: column;justify-content: center;align-items: center;padding: 4px 0 4px 0">
						<view>{{totalBalance}}</view>
						<view class="margin-top-2">总收入</view>

					</view>
				</view>
			</view>
			<view class="order-confirm-card notification-list-wrap list-border" v-for="(item,index) in balanceData" :key="index"
				v-if="balanceData.length>0" style="background-image: linear-gradient(to right, #ffffff 0%, #deecdd 100%);border: 0;">
				<view style="min-width: 0;flex:1">
					<view style="display: flex;align-items: center;justify-content: space-between">
						<view class="font-size-12" style="color: red;font-weight: bold">
							{{tools.formatPrice(item.amount)}}元佣金
						</view>
						<!-- <view class="font-size-12">
							<span class="font-size-12" style="color: red" v-if="item.isFrzen==1">未到账</span>
							<span class="font-size-12 main-color" v-if="item.isFrzen==0">已到账</span>
						</view> -->
					</view>

					<view class="margin-top-6 font-size-13 line-height-16" style="color:#888888;">{{item.remark}}</view>
					<view class="margin-top-6 font-size-12" style="color:#484848;text-align: right;">{{item.createTime}}
					</view>
				</view>
			</view>
			<view v-if="isRequest&&balanceData.length<=0" class="limit-area use-area margin-lr-sm pos-r">
				<!-- 空白页 -->
				<use-empty tip="暂无数据" :btnTip="null" height="50vh" :auto="false"></use-empty>
			</view>
		
		</view>
		
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import api from '@/common/api.js'
	import EmptyData from '@/components/empty-data.vue'
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
				httpImageUrl:this.httpImageUrl,
				pageNo: 1,
				pageSize: 30,
				isRequest: false,
				canLoadMore: true,
				loadingSkeleton: true,
				balanceData: [],
				avilableAmount: 0,
				freezAmount: 0,
				totalBalance: 0,
				current:0,
			}
		},
		components: { // 注册子组件
			EmptyData
		},
		onLoad() {
			this.getData();
		},
		methods: {
			tabsChange(index){
				this.current=index
				this.pageNo=1
				this.getData();
			},
			getData() {
				const _this = this;
				uni.showLoading({
					title: '加载中'
				});
				api.user.getBalanceList({
					pageNo: _this.pageNo,
					pageSize: _this.pageSize,
					type: -1,
				}).then(res => {
					_this.canLoadMore = true;
					if (res.code == 0) {
						if (res.data) {
							_this.totalBalance = res.data.totalAmount;
							_this.avilableAmount = res.data.availableAmount;
							_this.freezAmount = res.data.frozenAmount;
						}
						if (_this.pageNo == 1) {
							_this.balanceData = (res.listData);
						} else {
							_this.balanceData = _this.balanceData.concat(res.listData);
						}
						if (res.listData.length < _this.pageSize) {
							_this.canLoadMore = false;
						}
						_this.isRequest = true;
					} else {
						_this.canLoadMore = false;
						_this.isRequest = true;
					}
					uni.hideLoading()
					uni.stopPullDownRefresh()
					_this.loadingSkeleton = false;
				}).catch(e => {
					_this.loadingSkeleton = false;
					_this.canLoadMore = false
					_this.isRequest = true;
					_this.balanceData = [];
					uni.stopPullDownRefresh()
				})
			}
		},
		onPullDownRefresh: function() {
			var _this = this;
			_this.pageNo = 1;
			_this.canLoadMore = true;
			_this.getData();
		},
		onReachBottom: function() {
			var _this = this;
			if (_this.canLoadMore) {
				_this.pageNo++;
				_this.getData();
			}
		},
	}
</script>

<style>
</style>
