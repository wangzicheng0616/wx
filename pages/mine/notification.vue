<template>
	<view class="u-skeleton" style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;display: flex;flex-direction: column;">
		<view style="border-bottom: 1px solid #f5f5f5;">
			<u-tabs-swiper ref="tabs" :current="current" @change="tabsChange" :list="list" active-color="#82C91E" :is-scroll="false">
			</u-tabs-swiper>
		</view>
		<view style="flex: 1;height: 0;border-top: 1px solid #f5f5f5;">
			<scroll-view scroll-y="true" style="height: 100%" @scrolltolower="getMoreData">
				<view class="display-flex-row border-bottom-list padding-10 background-white" style="margin: 10px;border-radius: 6px;" v-for="(item,index) in messageList" :key="index"
					v-if="messageList.length>0" @click="goNotificationDetail(item,index)">
					<view style="position:relative">
						<view class="btn-bg" style="left: -10px;top: -10px; position: absolute;z-index: 1;font-size: 10px;color: white;padding: 2px 6px;border-top-left-radius: 6px;border-bottom-right-radius: 6px;" v-if="current==0">
							<text v-if="item.state==0">系统</text>
							<text v-if="item.state==1">收益</text>
							<text v-if="item.state==2">升级</text>
							<text v-if="item.state==3">活动</text>
						</view>
						<u-image v-if="item.state==3||item.pic" border-radius='12' :lazy-load="true" :src="tools.getImagePath(item.pic)"
							width="56px" height="56px"  class="u-skeleton-circle">
							<view slot="error"
								class="width-100-p height-100-p display-flex-row align-items-center justify-content-center">
								<image style="width: 100%;height: 100%;" mode="aspectFill"
									:src="httpImageUrl+'/static/icon_person.png'"></image>
							</view>
						</u-image>
						<template v-else>
							<image v-if="item.state==0" :src="httpImageUrl+'/static/icon_msg_1.png'" style="width: 56px;height: 56px;border-radius: 12rpx;">
								
							</image>
							<image v-if="item.state==1" :src="httpImageUrl+'/static/icon_msg_2.png'" style="width: 56px;height: 56px;border-radius: 12rpx;">
								
							</image>
							<image v-if="item.state==2" :src="httpImageUrl+'/static/icon_msg_3.png'" style="width: 56px;height: 56px;border-radius: 12rpx;">
								
							</image>
						</template>
						<image v-if="item.isRead==0" class="notification-dot"
							:src="httpImageUrl+'/static/pop_red.png'" ></image>
					</view>
					<view style="margin-left:10px; min-width: 0px; flex: 1;">
						<view class="fashion-module-notice u-skeleton-rect">{{item.title}}</view>
						<view class="margin-top-2 text-display-2 font-size-13 line-height-16 u-skeleton-rect" style="color:#888888;">
							{{item.simpleInfo}}</view>
						<view class="margin-top-2 font-size-12 u-skeleton-rect" style="color:#666666; text-align: right">
							{{item.createTime}}</view>
					</view>
				</view>
				
			</scroll-view>
		</view>
		<empty-data v-if="isRequest&&messageList.length<=0"></empty-data>
		<u-skeleton :loading="loadingSkeleton" :animation="true" bgColor="#FFF" elColor="#F6F6F6"></u-skeleton>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	import EmptyData from '../../components/empty-data.vue'
	export default {
		components: { // 注册子组件
			EmptyData
		},
		data() {
			return {
				httpImageUrl:this.httpImageUrl,
				pageNo: 1,
				pageSize: 30,
				messageList: [{
					pic:'绿豆锁大师',
					title:'绿豆锁大师',
					simpleInfo:'绿豆锁大师',
					createTime:'绿豆锁大师'
				}],
				isRequest: false,
				canLoadMore: true,
				loadingSkeleton: true,
				current:0,
				list:[
					{name:'全部'},
					{name:'系统'},
					{name:'收益'},
					{name:'升级'},
					{name:'活动'},
				]
			}
		},
		onLoad() {
			this.getData();
			//#ifdef H5
			this.setWeChatShare('','','')
			//#endif
		},
		//#ifdef MP-WEIXIN
		onShareAppMessage(res) {
			const _this = this;
			return _this.getMiniShareObj('','','')
		},
		//#endif
		methods: {
			tabsChange(index) {
				this.current = index;
				this.pageNo=1
				this.getData();
			},
			getData() {
				const _this = this;
				uni.showLoading({
					title: '加载中'
				});
				var state=-1
				if(this.current==0){
					state=-1
				}else if(this.current==1){
					state=0
				}else if(this.current==2){
					state=1
				}else if(this.current==3){
					state=2
				}else if(this.current==4){
					state=3
				}
				api.user.getMessageList({
					pageNo: _this.pageNo,
					pageSize: _this.pageSize,
					state:state
				}).then(res => {
					_this.canLoadMore = true;
					if (res.code == 0) {
						if (_this.pageNo == 1) {
							_this.messageList = (res.data.listData);
						} else {
							_this.messageList = _this.messageList.concat(res.data.listData);
						}
						if (res.data.listData.length < _this.pageSize) {
							_this.canLoadMore = false;
						}
						_this.isRequest = true;
					} else {
						_this.canLoadMore = false;
						_this.isRequest = true;
					}
					_this.loadingSkeleton=false;
					uni.hideLoading()
					uni.stopPullDownRefresh()
				}).catch(e => {
					_this.canLoadMore = false
					_this.loadingSkeleton=false;
					_this.isRequest = true;
					_this.messageList = [];
					uni.stopPullDownRefresh()
				})
			},
			goNotificationDetail(item,index){
				const _this=this;
				_this.messageList[index].isRead=1;
				api.user.messageIsRead({id:item.id,isRead:1}).then(res=>{
					
				})
				uni.navigateTo({
					url:'/pages/mine/notificationDetail?id='+item.id
				})
			},
			getMoreData() {
				const _this = this;
				if (_this.canLoadMore) {
					_this.pageNo++;
					_this.getData();
				}
			},
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
