<template>
	<view
		style="width: 100vw;display: flex;align-items: center;justify-content: center;flex-direction: column;position: relative;">
		<image style="width: 300px;margin-top: 40px" mode="widthFix"
			:src="tools.getImagePath(CUSTOMER_CONTACT_CODE)"></image>
		<view style="margin-top: 20px;color: #303313;text-align: center;">
			<view>如果你有困难，请第一时间联系我</view>
			<view>绿豆锁大师全体成员祝您健康无忧！</view>
		</view>
		<view style="color: #606266;margin-top: 10px;">
			<view style="margin-top: 4px;font-size: 28rpx;display: flex;align-items: center;" v-for="(item,index) in listData" :key="index">
				{{item.name}}:
				<view style="color: #007AFF;" @click="tel(item.val)">{{item.val}}</view>
			</view>
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
				phone: '',
				company: '',
				CUSTOMER_CONTACT_CODE:'',
				listData:[]
			}
		},
		onLoad() {
			this.getGlobleInfo();
			this.getData();
			//#ifdef H5
			this.setWeChatShare('', '', '')
			//#endif
		},
		methods: {
			tel(val) {
				const _this = this;
				uni.makePhoneCall({
					phoneNumber: val
				});
			},
			getData(){
				const _this=this;
				uni.showLoading({
					title:'加载中'
				})
				api.dictionary.info({
					number: 'SERVICE'
				}).then(res=>{
					if(res.listData){
						this.listData=res.listData
					}
					uni.hideLoading()
				}).catch(e=>{
				})
			},
			getGlobleInfo() {
				api.globleSetting.getInfoByNumber({
					number: 'CUSTOMER_CONTACT_CODE'
				}).then(res => {
					if (res.data) {
						this.CUSTOMER_CONTACT_CODE = res.data.value1
					}
				})
			},
		},
		//#ifdef MP-WEIXIN
		onShareAppMessage(res) {
			const _this = this;
			return _this.getMiniShareObj('', '', '')
		},
		//#endif
	}
</script>

<style>
</style>
