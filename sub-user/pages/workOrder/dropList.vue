<template>
	<view>
		<view v-if="isRequestBack&&!datas.length" class="limit-area use-area margin-lr-sm pos-r">
			<!-- 空白页 -->
			<use-empty tip="暂无数据" :btnTip="null" height="50vh" :auto="false"></use-empty>
		</view>
		<view v-else>
			<view @click="goOrderDetail(item)" class="limit-area use-area margin-lr-sm pos-r" v-for="(item, idx) in datas" :key="idx">
				<view style="display:flex;width:100%">
					<view style="width: 100%;">
						<view class="dflex-b">
							<text class="title clamp padding-bottom-xs fs-xs">工单号：{{ item.orderNo }}</text>
						</view>
						<view class="dflex-b">
							<text class="title clamp padding-bottom-xs fs-xs">师傅名称：{{ item.workerName }}</text>
						</view>
						<text class="title clamp padding-bottom-xs fs-xs">师傅手机号：{{ item.workerTelephone }}</text>
						<text class="title clamp padding-bottom-xs fs-xs" v-if="item.dropReason"
							style="color:#81c71f">弃单原因：{{ item.dropReason }}</text>
						<text class="title clamp padding-bottom-xs fs-xs" style="width: 100%;text-align: right;color: #606266;">{{ item.createTime }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	export default {
		data() {
			return {
				httpImageUrl: this.httpImageUrl,
				datas:[],
				isRequestBack:false,
				pageNo: 1,
				pageSize: 30,
				type:0,
				canLoadMore: true,
			}
		},
		onLoad(options) {
			this.getData()
		},
		methods:{
			goOrderDetail(item){
				uni.navigateTo({
					url:'/sub-user/pages/workOrder/detail?orderNo='+item.orderNo+'&hideBottom=1'
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
				api.workOrder.getDropList({
					keyWord:'',
					startTime:'',
					endTime:'',
					workerName:'',
					orderNo:'',
					workerTelephone:'',
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