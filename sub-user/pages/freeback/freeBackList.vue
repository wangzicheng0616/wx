<template>
	<view style="display: flex;flex-direction: column;">
		<view style="margin-bottom: 50px;">
			<view style="flex-direction: column;align-items: baseline;"
				class="order-confirm-card notification-list-wrap" v-for="(item, key) in listData" :key="key"
				@click="freeBackItemClick(item)">
				<view style="width: 100%;">
					<view>{{item.content}}</view>
					<scroll-view :scroll-x="true" style="width: 100%;" class="margin-top-2" v-if="item.image1||item.image2||item.image3">
						<view style="display: flex;flex-wrap: nowrap;">
							<view style="display: inline-block;width:80px;height:80px;margin:0 5px;" @click="previewImage(item,0)" v-if="item.image1">
								<u-image border-radius="12" :src="tools.getImagePath(item.image1)"
									width="80px" height="80px" mode="aspectFill">
									
								</u-image>
							</view>
							
							<view style="display: inline-block;width:80px;height:80px;margin:0 5px;" @click="previewImage(item,1)" v-if="item.image2">
								<u-image border-radius="12" :src="tools.getImagePath(item.image2)"
									width="80px" height="80px" mode="aspectFill">
									
								</u-image>
							</view>
							
							<view style="display: inline-block;width:80px;height:80px;margin:0 5px;" @click="previewImage(item,2)" v-if="item.image3">
								<u-image border-radius="12" :src="tools.getImagePath(item.image3)"
									width="80px" height="80px" mode="aspectFill">
									
								</u-image>
							</view>
						</view>
					</scroll-view>
					<view style="text-align: right;color: #909399;" class="margin-top-10">
						{{item.createTime}}
					</view>
				</view>
			</view>
			
			<view v-if="isRequest&&listData.length<=0" class="limit-area use-area margin-lr-sm pos-r">
				<!-- 空白页 -->
				<use-empty tip="暂无数据" :btnTip="null" height="50vh" :auto="false"></use-empty>
			</view>
		</view>
		<view @click="goFreeBackEdit" class="btn-bg"
			style="display: flex;align-items: center;justify-content: center;height: 50px;position: fixed;bottom: 0;left: 0;right: 0;">
			<view style="color: #ffffff;">
				我要反馈
			</view>
		</view>
		<Menu></Menu>
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
				}
			})
		},
		data() {
			return {
				httpImageUrl:this.httpImageUrl,
				pageNo: 1,
				pageSize: 30,
				isRequest: false,
				canLoadMore: true,
				listData: [],
			}
		},
		components: { // 注册子组件
			EmptyData
		},
		onLoad() {
		},
		onShow() {
			this.getData();
		},
		methods: {
			goFreeBackEdit(){
				uni.navigateTo({
					url:'/sub-user/pages/freeback/freeBackEdit?parentId=0'
				})
			},
			freeBackItemClick(item){
				uni.navigateTo({
					url:'/sub-user/pages/freeback/freeBackDetail?parentId='+item.id
				})
			},
			previewImage(item,index){
				const _this=this
				var previewImageArray=[];
				if(item.image1){
					previewImageArray.push(_this.tools.getImagePath(item.image1))
				}
				if(item.image2){
					previewImageArray.push(_this.tools.getImagePath(item.image2))
				}
				if(item.image3){
					previewImageArray.push(_this.tools.getImagePath(item.image3))
				}
				uni.previewImage({
					urls: previewImageArray,
					current:index
				})
			},
			getData() {
				const _this = this;
				uni.showLoading({
					title: '加载中'
				});
				api.freeBack.list({
					pageNo: _this.pageNo,
					pageSize: _this.pageSize,
					keyWord: '',
					startTime:'',
					endTime:'',
				}).then(res => {
					_this.canLoadMore = true;
					if (res.code == 0) {
						if (_this.pageNo == 1) {
							_this.listData = (res.data.listData);
						} else {
							_this.listData = _this.listData.concat(res.data.listData);
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
					_this.listData = [];
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
