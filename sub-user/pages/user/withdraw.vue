<template>
	<view>
		<view class="mine-bg" style="display: flex;align-items: center;justify-content: center;flex-direction: column;">
			<view class="list-head-img-bg" style="margin-top: 20px">
				<u-image v-if="workerInfo.headUrl" shape="circle" :lazy-load="true" :src="tools.getImagePath(workerInfo.headUrl)" width="65px"
					height="65px">
					<view slot="error"
						class="width-100-p height-100-p display-flex-row align-items-center justify-content-center">
						<image style="width: 100%;height: 100%;border-radius: 50%;" mode="aspectFill"
							src="@/static/images/logo.png">
						</image>
					</view>
				</u-image>
				<u-image v-else shape="circle" :lazy-load="true" :src="tools.getImagePath(myInfo.headImage)" width="65px"
					height="65px">
					<view slot="error"
						class="width-100-p height-100-p display-flex-row align-items-center justify-content-center">
						<image style="width: 100%;height: 100%;border-radius: 50%;" mode="aspectFill"
							src="@/static/images/logo.png">
						</image>
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
					<view class="margin-top-2">可提金额</view>
				</view>

				<view
					style="display: flex;flex: 1;flex-direction: column;justify-content: center;align-items: center;padding: 4px 0 4px 0">
					<view>{{withDralFrozenAmount}}</view>
					<view class="margin-top-2">待审金额</view>
				</view>

				<view
					style="display: flex;flex: 1;flex-direction: column;justify-content: center;align-items: center;padding: 4px 0 4px 0">
					<view>{{withDralTatalAmount}}</view>
					<view class="margin-top-2">已提金额</view>
				</view>

				<view style="display: flex;flex: 1;flex-direction: column;justify-content: center;align-items: center;padding: 4px 0 4px 0">
					<view>{{freezAmount}}</view>
					<view class="margin-top-2">冻结金额</view>

				</view>
			</view>

			<view style="position: absolute;top: 20px;right: 20px;color: #ffffff;" class="font-size-14" @click="apply">
				申请提现</view>
		</view>


		<view class="order-confirm-card list-border notification-list-wrap" v-for="(item,index) in withDrawList"
			v-if="withDrawList.length>0" :key="index">
			<view style="width: 100%">
				<view style="position:relative;display: flex;justify-content: space-between">
					<view class="">提现金额:{{tools.toDecimal2(item.amount)}}</view>
					<view style="font-weight: bold;text-align: right;color: #44a1f0" v-if="item.status==0">申请中等待确认
					</view>
					<view class="main-color" style="font-weight: bold;text-align: right;" v-if="item.status==1">已确认等待打款
					</view>
					<view style="font-weight: bold;text-align: right;color: darkgreen;" v-if="item.status==2">打款完成
					</view>
					<view style="font-weight: bold;text-align: right;color:red" v-if="item.status==3">提现失败
					</view>
				</view>
				<view style="display: flex;align-items: center;margin-top: 6px;font-size: 13px;">
					<view>实际到账金额:{{item.key3}}</view>
					<view style="margin-left: 10px;">提现税点:{{item.key1}}%</view>
					<view style="margin-left: 10px;">提现费:{{item.key4?item.key4:0}}元</view>
				</view>
				<view style=" min-width: 0px;flex:1">
					<view class="margin-top-6 font-size-13 line-height-16" style="color:#888888;">
						{{item.remark}}
					</view>
					<view class="margin-top-6 font-size-13 line-height-16" style="color:red;"
						v-if="item.status==3&&item.reason">
						失败理由:{{item.reason}}
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between" class="margin-top-6">
						<view class="font-size-12 main-color border-radius-6"
							style="padding:4px 10px;border:1px solid #82C91E" v-if="item.status==0"
							@click.stop="cancel(item)">取消申请
						</view>
						<view class="font-size-12 main-color border-radius-6"
							style="padding:4px 10px;border:1px solid #82C91E" v-if="item.status==2"
							@click.stop="withDrawItemClick(item)">点击查看付款凭证
						</view>
						<view v-else></view>
						<view class="margin-top-6 font-size-12" style="color:#666666;text-align: right;">
							{{item.createTime}}
						</view>
					</view>

				</view>
			</view>
		</view>

		<view v-if="isRequest&&withDrawList.length<=0" class="limit-area use-area margin-lr-sm pos-r">
			<!-- 空白页 -->
			<use-empty tip="暂无数据" :btnTip="null" height="50vh" :auto="false">
			</use-empty>
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
			})
		},
		components: { // 注册子组件
			EmptyData
		},
		data() {
			return {
				httpImageUrl: this.httpImageUrl,
				pageNo: 1,
				pageSize: 30,
				isRequest: false,
				canLoadMore: true,
				withDrawList: [],
				avilableAmount: 0,
				freezAmount: 0,
				totalBalance: 0,
				withDralFrozenAmount: 0, //提现冻结佣金
				withDralTatalAmount: 0, //已提现佣金
				showImages: [],
				showBind: false,
			}
		},
		onLoad(options) {
			const _this = this;
		},
		onShow() {
			const _this = this;
			_this.getUserInfo();
			_this.getBalanceDetail();
			_this.getData();
		},
		methods: {
			getUserInfo() {
				const _this = this;
				uni.showLoading({
					title: '加载中'
				})
				api.user.getDbUserInfo().then(res => {
					if (res.data && res.data.user) {
						_this.$store.commit("updateMyInfo", res.data.user)
						if (res.data.user.phone.indexOf('USER') == 0) {
							_this.showBind = true
						} else {
							_this.showBind = false
						}
					}
					uni.hideLoading()
				}).catch(e=>{
				})
			},
			//申请提现
			apply() {
				const _this = this;
				uni.navigateTo({
					url:'/sub-user/pages/user/cashWithDraw'
				})
			},
			withDrawItemClick(item) {
				const _this = this;
				if (item.status == 2) {
					_this.showImages = [];
					if (item.payPoof1) {
						_this.showImages.push(_this.tools.getImagePath(item.payPoof1));
					}
					if (item.payPoof2) {
						_this.showImages.push(_this.tools.getImagePath(item.payPoof2));
					}
					if (item.payPoof3) {
						_this.showImages.push(_this.tools.getImagePath(item.payPoof3));
					}
					if (_this.showImages.length > 0) {
						uni.previewImage({
							urls: _this.showImages
						});
					}
				}
			},
			cancel(item) {
				const _this = this;
				uni.showModal({
					title: '温馨提示',
					content: '确定要取消提现申请吗?',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '加载中'
							})
							api.user.updateWithdrawalError({
								id: item.id
							}).then(res => {
								uni.hideLoading()
								uni.showToast({
									title: '取消提现成功',
									icon: 'none'
								})
								setTimeout(() => {
									_this.pageNo = 1;
									_this.getData()
									_this.getBalanceDetail()
								}, 1600)
							
							}).catch(e => {
							})
							
							
						}
					}
				});
			},
			getData() {
				const _this = this;
				uni.showLoading({
					title: '加载中'
				});
				api.user.getWithdrawList({
					pageNo: _this.pageNo,
					pageSize: _this.pageSize,
					keyWord: '',
					startTime: '',
					endTime: '',
					status: -1
				}).then(res => {
					_this.canLoadMore = true;
					if (res.code == 0) {
						if (_this.pageNo == 1) {
							_this.withDrawList = (res.data.listData);
						} else {
							_this.withDrawList = _this.withDrawList.concat(res.data.listData);
						}
						if (res.data.listData.length < _this.pageSize) {
							_this.canLoadMore = false;
						}
						_this.isRequest = true;
					} else {
						_this.canLoadMore = false;
						_this.isRequest = true;
					}
					uni.hideLoading()
					uni.stopPullDownRefresh()
				}).catch(e => {
					_this.canLoadMore = false
					_this.isRequest = true;
					_this.withDrawList = [];
					uni.stopPullDownRefresh()
				})
				
				
			},
			getBalanceDetail() {
				const _this = this;
				uni.showLoading({
					title: '加载中'
				});
					api.user.getBalanceList({
						pageNo: 1,
						pageSize: 1,
						type: '-1',
					}).then(res => {
						if (res.code == 0) {
							if (res.data) {
								_this.avilableAmount = res.data.availableAmount;
								_this.freezAmount = res.data.frozenAmount;
								_this.totalBalance = res.data.totalAmount;
								_this.withDralFrozenAmount = res.data.withDralFrozenAmount;
								_this.withDralTatalAmount = res.data.withDralTatalAmount;
							}
						}
						uni.hideLoading()
					}).catch(e => {
					})

				
			}
		},
		onPullDownRefresh: function() {
			var _this = this;
			_this.pageNo = 1;
			_this.canLoadMore = true;
			_this.getData();
			_this.getBalanceDetail();
		},
		onReachBottom: function() {
			var _this = this;
			if (_this.canLoadMore) {
				_this.pageNo++;
				_this.getData();
				_this.getBalanceDetail();
			}
		},
	}
</script>

<style>
</style>
