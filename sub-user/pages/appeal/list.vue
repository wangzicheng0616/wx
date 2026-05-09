<template>
	<view>
		<view v-if="isRequestBack&&!datas.length" class="limit-area use-area margin-lr-sm pos-r">
			<!-- 空白页 -->
			<use-empty tip="暂无数据" :btnTip="null" height="50vh" :auto="false"></use-empty>
		</view>
		<view v-else>
			<view @click="goDetail(item)" class="limit-area use-area margin-lr-sm pos-r" v-for="(item, idx) in datas" :key="idx">
				<view style="display:flex;width:100%">
					<view style="width: 100%;">
						<view class="dflex-b">
							<text @click.stop="goOrderDetail(item)" class="title clamp padding-bottom-xs fs-xs main-color" style="text-decoration: underline;">
							{{ item.orderNo }}
							</text>
							<template v-if="item.status!=6&&item.platformNotReadNum>0">
								<view style="width: 10px;height: 10px;background-color: #ff0000;border-radius: 50%;"></view>
							</template>
						</view>
						<view class="dflex-b" v-if="item.pic1||item.pic2||item.pic3||item.pic4||item.pic5" style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
							<view v-if="item.pic1" style="width: 20%;padding: 6rpx;">
								<image :src="tools.getImagePath(item.pic1)" @click="preImage(item,item.pic1)" style="width: 100%;height: 100rpx;border-radius: 8rpx;" mode="aspectFill"></image>
							</view>
							<view v-if="item.pic2" style="width: 20%;padding: 6rpx;">
								<image :src="tools.getImagePath(item.pic2)" @click="preImage(item,item.pic2)" style="width: 100%;height: 100rpx;border-radius: 8rpx;" mode="aspectFill"></image>
							</view>
							<view v-if="item.pic3" style="width: 20%;padding: 6rpx;">
								<image :src="tools.getImagePath(item.pic3)" @click="preImage(item,item.pic3)" style="width: 100%;height: 100rpx;border-radius: 8rpx;" mode="aspectFill"></image>
							</view>
							<view v-if="item.pic4" style="width: 20%;padding: 6rpx;">
								<image :src="tools.getImagePath(item.pic4)" @click="preImage(item,item.pic4)" style="width: 100%;height: 100rpx;border-radius: 8rpx;" mode="aspectFill"></image>
							</view>
							<view v-if="item.pic5" style="width: 20%;padding: 6rpx;">
								<image :src="tools.getImagePath(item.pic5)" @click="preImage(item,item.pic5)" style="width: 100%;height: 100rpx;border-radius: 8rpx;" mode="aspectFill"></image>
							</view>
						</view>
						<text class="title clamp padding-bottom-xs fs-xs">{{ item.reason }}</text>
						
						<text class="title clamp padding-bottom-xs fs-xs" style="width: 100%;text-align: right;color: #606266;">{{ item.createTime }}</text>
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
				datas:[],
				isRequestBack:false,
				pageNo: 1,
				pageSize: 30,
				type:0,
				canLoadMore: true,
				endType: -1,
				statusArray:[
					{text:'客户申述申请',value:0},
					{text:'平台确认审核',value:1},
					{text:'修改申诉申请',value:2},
					{text:'审核申诉进度',value:3},
					{text:'申诉审核意见',value:4},
					{text:'申诉信息补充',value:5},
					{text:'申诉工单关闭',value:6},
					{text:'自由信息类型',value:7},
				]
			}
		},
		onLoad(options) {
			this.endType = uni.getStorageSync('endType')
		},
		onShow() {
			this.getData()
		},
		methods:{
			goOrderDetail(item){
				uni.navigateTo({
					url:'/sub-user/pages/workOrder/detail?orderNo='+item.orderNo+'&hideBottom=1'
				})
			},
			preImage(item,url) {
				const _this=this
				var urls=[]
				if(item.pic1){
					urls.push(_this.tools.getImagePath(item.pic1))
				}
				if(item.pic2){
					urls.push(_this.tools.getImagePath(item.pic2))
				}
				if(item.pic3){
					urls.push(_this.tools.getImagePath(item.pic3))
				}
				if(item.pic4){
					urls.push(_this.tools.getImagePath(item.pic4))
				}
				if(item.pic5){
					urls.push(_this.tools.getImagePath(item.pic5))
				}
				uni.previewImage({
					current: _this.tools.getImagePath(item),
					urls: urls,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
						},
						fail: function(err) {
						}
					}
				});
			},
			getStatus(value){
				var find=this.statusArray.find(item=>item.value==value)
				if(find){
					return find.text
				}
				return ''
			},
			goDetail(item){
				uni.navigateTo({
					url:'/sub-user/pages/appeal/detail?parentId='+item.id
				})
			},
			initData(){
				var _this = this;
				_this.pageNo = 1;
				_this.canLoadMore = true;
				_this.getData();
			},
			getData(){
				const _this=this
				uni.showLoading({
					title:'加载中'
				})
				api.appeal.getList({
					keyWord:'',
					startTime:'',
					endTime:'',
					workerName:'',
					workerTelephone:'',
					orderNo:'',
					infoType:-1,
					userId:this.endType==1?this.myInfo.id:-1,
					workerId:this.endType==0?this.workerInfo.id:-1,
					pageNo:this.pageNo,
					pageSize:this.pageSize,
				}).then(res=>{
					_this.canLoadMore = true;
					if (_this.pageNo == 1) {
						_this.datas = (res.data.listData);
					} else {
						_this.datas = _this.datas.concat(res.data.listData);
					}
					if (res.data.listData.length < _this.pageSize) {
						_this.canLoadMore = false;
					}
					this.isRequestBack=true
					uni.hideLoading()
					uni.stopPullDownRefresh()
				}).catch(e=>{
					this.isRequestBack=true
					uni.hideLoading()
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
	page {
		background: #f5f5f5;
	}
</style>