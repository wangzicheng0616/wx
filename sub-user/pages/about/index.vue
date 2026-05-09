<template>
	<view style="width: 100vw;display: flex;align-items: center;justify-content: center;flex-direction: column;position: absolute;top: 0;bottom: 0;left: 0;right: 0;">
		<view style="flex: 1;height: 0;display: flex;flex-direction: column;align-items: center;justify-content: center;">
			<view style="display: flex;flex-direction: column;align-items: center;justify-content: center;">
				<image style="width: 300px;" mode="widthFix"
					:src="httpImageUrl+'/static/share_logo.png'" ></image>
				<view style="margin-top: 20px;display: flex;align-items: center;width: 100%;justify-content: center;flex-direction: column;">
					<view>联系电话</view>
					<view style="color: #007AFF;" @click="tel">{{phone}}</view>
				</view>
			</view>
		</view>
		
		<view style="width: 100%;display: flex;flex-direction: column;align-items: center;justify-content: center;margin-bottom: 20px;">
			<!-- #ifdef APP-PLUS -->
			<view style="display: flex;align-items: center;font-weight: bold;" class="main-color">
				<view @click="goProtocol('PPP')">服务协议</view>
				<view>｜</view>
				<view @click="goProtocol('PPP')">隐私政策</view>
			</view>
			<!-- #endif -->
			<view>{{company}}</view>
			<view style="color: #909399;margin-top: 4rpx;">沪ICP备2024047780号-3</view>
			<!-- <view style="color: #909399;margin-top: 4rpx;">辽公网安备21011402000603号</view>
			<view style="color: #909399;margin-top: 4rpx;">v1.0.0</view> -->
		</view>
		<Menu></Menu>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	export default {
		data() {
			return {
				httpImageUrl: this.httpImageUrl,
				phone:'',
				company:''
			}
		},
		onLoad() {
			this.getData();
		},
		methods:{
			goProtocol(number) {
				uni.navigateTo({
					url: '/pages/mine/protocol?number=' + number
				})
			},
			tel() {
				const _this = this;
				uni.makePhoneCall({
					phoneNumber: _this.phone
				});
			},
			getData(){
				const _this=this;
				uni.showLoading({
					title:'加载中'
				})
				api.dictionary.info({
					number: 'ABOUT_US'
				}).then(res=>{
					if(res.listData){
						for (var i = 0; i < res.listData.length; i++) {
							var item=res.listData[i]
							if(item.number=='ABOUT_US_COMPANY'){
								_this.company=item.val
							}
							if(item.number=='ABOUT_US_PHONE'){
								_this.phone=item.val
							}
						}
					}
					uni.hideLoading()
				}).catch(e=>{
				})
			}
		},
	}
</script>

<style>
</style>
