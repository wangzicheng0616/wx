<template>
	<view class="margin-sm">
		<!-- 空白页 -->
		<use-empty v-if="empty" e-style="round" :btnTip="null" tip="暂无数据" height="50vh" :auto="false"></use-empty>
		<view v-else>
			<view class="member-area padding-sm dflex pos-r flex1 bg-main" v-for="(item, idx) in shareDatas"
				:key="idx">
				<view>
					<image v-if="item.headUrl" class="headimg border-radius-c" 
					:src="tools.getImagePath(item.headUrl)">
					</image>
					<image v-else class="headimg border-radius-c" src="@/static/images/logo.png"></image>
				</view>
				<view class="margin-left-sm" style="width: 0;flex: 1">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view v-if="item.status==1" style="color: #13ce66;">启用</view>
						<view v-else style="color: #E65D6E;">停用</view>
						<view v-if="item.state==0" style="color: #409EFF;">未认证</view>
						<view v-else-if="item.state==1" style="color: #E6A23C;">认证中</view>
						<view v-else-if="item.state==2" style="color: #13ce66;">完成认证</view>
						<view v-else-if="item.state==3" style="color: #E65D6E;">认证驳回</view>
					</view>
					<view class="info-box">
						<text class="fs-lg line-height-1">{{ item.workerName }}</text>
					</view>
					<view><text class="fs-xxs" v-if="item.checkinTime">入驻时间：{{item.checkinTime }}</text></view>
					<view v-if="item.completeOrderTime"><text
							class="fs-xxs">完成第一单时间：{{ item.completeOrderTime }}</text></view>
				</view>
			</view>
			<!-- 上拉加载更多 -->
			<use-loadmore :type="loadmoreType"></use-loadmore>
		</view>

		<!-- 置顶 -->
		<use-totop ref="usetop"></use-totop>

	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import api from '@/common/api.js'
	export default {
		data() {
			return {
				// 搜索关键字
				keyword: '',
				empty: true,
				headerPosition: "fixed",
				// 邀请列表数据
				shareDatas: [
				],
				// 加载更多状态
				loadmoreType: 'more',
				// 请求数据
				reqdata: {
					keyWord: '',
					startTime: '',
					endTime: '',
					workerName: '',
					workerTelephone: '',
					pageNo: 1,
					pageSize: 10,
					generalCondition: '',
					status: -1,
					state: -1,
				},
				total: 0,
				scrollTop: 0,
				scrollLeft: 0, // 横向滚动条位置
				screenWidth: 0 //屏幕宽度
			};
		},
		watch: {
			// 显示空白页
			shareDatas(e) {
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
			// 加载数据
			this.loadData();
		},
		onShow() {
		},
		methods: {
			loadData(type = 'add', loading) {
				if (this.loadmoreType === 'loading') {
					// 防止重复加载
					return;
				}
				if (loading == 1 || type == 'refresh') {
					// 从首页开始加载
					this.reqdata.pageNo = 1;
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
				api.worker.getListToRecommended(this.reqdata).then(res => {
					if (res.data.listData && res.data.listData.length > 0) {
						if (loading == 1 || type == 'refresh') {
							this.shareDatas = res.data.listData;
						} else {
							this.shareDatas = [...this.shareDatas, ...res.data.listData];
						}

						this.total = res.data.totalSize
						if (res.data.listData.length < this.total) {
							this.reqdata.pageNo++;
							this.loadmoreType = 'more'
						} else {
							this.loadmoreType = 'nomore'
						}
					} else {
						this.shareDatas = []
						this.loadmoreType = 'nomore'
					}
					if (type == 'refresh') {
						uni.stopPullDownRefresh();
					}
				})

			}
		}
	}
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

	.member-area {
		image {
			width: 130rpx;
			height: 130rpx;
			border: 5rpx solid #fff;
		}
	}
</style>