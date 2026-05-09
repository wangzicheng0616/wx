<template>
	<view class="padding-sm pos-r">
		<use-navbar title="常见问题"></use-navbar>

		<scroll-view scroll-x class="ws-np">
			<view class="dflex">
				<block v-for="(item, idx) in list" :key="idx">
					<view class="pos-r padding-tb-sm margin-right-xs padding-lr-sm line-height-1 tac"
						:class="{ active: current === idx }" @click="onQuery(item, idx)">
						{{item.name}}
					</view>
				</block>
			</view>
		</scroll-view>

		<view v-if="dataList && dataList.length > 0" class="bg-main border-radius margin-top-sm">
			<!-- <view class="dflex-b border-line padding-bottom-sm">
				<view class="fwbd fs-30">猜你想问</view>
				<view class="dflex ft-dark">
					<view class="fs-xs"></view>
					<view class="iconfont iconjiantou-01 fs-xs margin-left-xs"></view>
				</view>
			</view> -->
			<view class="dflex-b padding-tb-sm padding" :style="idx%2==0?'background:rgb(250, 250, 250)':''" v-for="(item, idx) in dataList" :key="idx" @click="goDetail(item)">
				<view style="flex: 1;width: 0;">
					<view class="text-display-1" style="width: 100%;">{{item.title}}</view>
					<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 4px;">
						<view style="display: flex;align-items: center;">
							<uni-icons type="eye" size="16" color="#909399"></uni-icons>
							<view style="margin-left: 4px;color: #606266;font-size: 12px;">{{item.browserCnt}}
							</view>
						</view>
						<view style="font-size: 12px;color: #909399;">{{item.publishTime}}
						</view>
					</view>
				</view>
				<view class="iconfont iconjiantou-01 fs-xs margin-left-xs ft-dark"></view>
			</view>
		</view>

		<view class="pos-f padding-tb-lg bg-main pos-b-full">
			<button open-type="contact" plain="true"  session-from="sessionFrom" class="dflex-c bg-main w-full"
			style="padding: 0;border: 0;border-radius: 0;margin: 0;line-height: inherit;">
				<view class="iconfont iconkefu-01"></view>
				<view class="margin-left-xs fs-xs" style="font-size: 30rpx;">联系官方客服</view>
			</button>
		</view>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	export default {
		data() {
			return {
				endType: '',
				list: [],
				current: 0,
				pageNo: 1,
				pageSize: 30,
				dataList: [],
				isRequest: false,
			};
		},
		onLoad(options) {
			this.endType = options.endType;
			this.loadData();
		},
		onPullDownRefresh: function() {
			var _this = this;
			_this.pageNo = 1;
			_this.canLoadMore = true;
			_this.getDataList();
		},
		onReachBottom: function() {
			var _this = this;
			if (_this.canLoadMore) {
				_this.pageNo++;
				_this.getDataList();
			}
		},
		methods: {
			loadData() {
				this.list=[]
				api.news.getListTypNumber({endType:this.endType}).then(res=>{
					if(res.listData&&res.listData.length>0){
						res.listData.forEach(item=>{
							if(item.type){
								this.list.push({
									name:item.type.name,
									number:item.type.number
								})
							}
							
						})
						this.list.unshift({
							name:'全部',
							number:''
						})
						this.getDataList()
					}
				})
			},
			getDataList(){
				const _this = this;
				uni.showLoading({
					title: '加载中'
				})
				api.news.list({
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					status:1,
					endType:this.endType,
					typeNumber: this.list[this.current].number,
				}).then(res => {
					_this.canLoadMore = true;
					if (res.code == 0) {
						if (_this.pageNo == 1) {
							_this.dataList = (res.data.listData);
						} else {
							_this.dataList = _this.dataList.concat(res.data.listData);
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
					_this.dataList = [];
					uni.hideLoading()
					uni.stopPullDownRefresh()
				})
			},
			goDetail(item) {
				item.browserCnt=item.browserCnt+1
				uni.navigateTo({
					url:'/sub-user/pages/news/detail?id='+ item.id
				})
			},
			onQuery(item, idx) {
				this.current = idx;
				this.pageNo = 1;
				this.canLoadMore = true;
				this.getDataList()
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;

		button::after {
			border: none
		}

		.active {
			color: #82C91E;
			font-weight: bold;
			font-size: 34rpx;
		}

	}
</style>