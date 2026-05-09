<template>
	<view>
		<view class="mine-bg" style="position: relative;display: flex;align-items: center;justify-content: center;flex-direction: column;">
			<view class="list-head-img-bg" style="margin-top: 20px">
				<u-image shape="circle" :lazy-load="true" :src="tools.getImagePath(userInfo.headImage)" width="65px"
					height="65px" v-if="userInfo&&userInfo.headImage">
					<view slot="error"
						class="width-100-p height-100-p display-flex-row align-items-center justify-content-center">
						<image style="width: 100%;height: 100%;" mode="aspectFill"
							:src="httpImageUrl+'/static/icon_person.png'"></image>
					</view>
				</u-image>
				<image style="width: 65px;height: 65px;" mode="aspectFill" v-else
					:src="httpImageUrl+'/static/icon_person.png'"></image>
			</view>
			<view v-if="userInfo" class="font-size-16" style="font-weight: bold;margin-top: 16px;color: #ffffff;">
				{{userInfo.name}}
			</view>
			<template v-if="userLevelName">
				<text class="item-type-bg font-size-10" style="margin: 10px 0;">级别:{{userLevelName}}
				</text>
			</template>
			
			<!-- <view style="margin-top: 10px;display: flex;align-items: baseline;justify-content: flex-start; color: red;position: absolute;top: 60px;left: calc(50% + 60px);right: 10px;">
				<view style="font-size: 12px;font-weight: bold">¥</view>
				<view style="font-size: 18px;font-weight: bold">
					{{tools.formatPrice0(totalAmount)}}
				</view>
				<view style="font-size: 12px;font-weight: bold">
					.{{tools.formatPrice1(totalAmount)}}
				</view>
			</view> -->
		</view>
		<view class="order-confirm-card" v-for="(item,index) in listData" :key="index"
			v-if="listData.length>0" @click="goSelf(item)" style="background-image: linear-gradient(to right, #ffffff 0%, #deecdd 100%);border: 0;">
			<view style="width: 100%;position: relative;overflow: hidden;display: flex;" class="padding-10">
				<u-image  shape="circle" width="56px" height="56px" :lazy-load="true"
					:src="tools.getImagePath(item.headImage)">
					<view slot="error"
						class="width-100-p height-100-p display-flex-row align-items-center justify-content-center">
						<image style="width:56px;height:56px;" mode="aspectFill"
							:src="httpImageUrl+'/static/icon_person.png'"></image>
					</view>
				</u-image>
				<view style="flex: 1;width: 0;margin-left: 10px;">
					<view style="font-weight: bold;color: #303313;display: flex;align-items: center;">
						<view style="flex: 1;width: 0;margin-right: 10px;">
						{{item.name}}
						</view>
						<view style="font-size: 12px;font-weight: bold;" class="item-type-bg">{{item.userLevelName?item.userLevelName:'普通会员'}}</view>
					</view>
					<view
						style="margin-top: 15px;width: 100%;font-size: 14px;display: flex;align-items: center;justify-content: space-between;color: #606266;">
						<view @click.stop="tel(item.phone)" style="border-bottom: 1px solid #222539;">{{item.phone}}</view>
						<view style="color: #303313;">团队业绩:{{item.teamValue}}</view>
						<!-- <view v-if="item.status" style="color: red;font-weight: bold;">第{{item.status}}支</view> -->
						<!-- <view style="margin-top: 10px;display: flex;align-items: baseline;color: red;">
							<view style="font-size: 12px;font-weight: bold">¥</view>
							<view style="font-size: 18px;font-weight: bold">
								{{tools.formatPrice0(item.totalAmount?item.totalAmount:0)}}
							</view>
							<view style="font-size: 12px;font-weight: bold">
								.{{tools.formatPrice1(item.totalAmount?item.totalAmount:0)}}
							</view>
						</view> -->
					</view>
					<view v-if="item.transferParent"
						style="margin-top: 15px;width: 100%;font-size: 14px;display: flex;align-items: center;color: #606266;">
						<view>安置人：{{item.transferParent.name}}</view>
						<view @click.stop="tel(item.transferParent.phone)" style="border-bottom: 1px solid #222539;">{{item.transferParent.phone}}</view>
					</view>
				</view>
				<u-icon name="arrow-right" v-if="isCanClick==1" style="color: #909399;margin-left: 10px;"></u-icon>
				
			</view>
		</view>
		<view style="position: relative;min-height: 200px;margin-top: 200rpx;" v-if="isRequest&&listData.length<=0">
			<empty-data></empty-data>
		</view>
		<Menu></Menu>
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
				httpImageUrl: this.httpImageUrl,
				levelData: '',
				specialLevel: '',
				userLevel: '',
				listData: [],
				isRequest: false,
				recommendId: -1,
				isCanClick: 1,
				isGetUserLevel: 0,
				userLevelName: '',
				userInfo: null,
				totalAmount:0
			}
		},
		onLoad(options) {
			this.recommendId = options.recommendId
			this.isCanClick = options.isCanClick
			this.isGetUserLevel = options.isGetUserLevel
			if (options.userLevelName) {
				this.userLevelName = options.userLevelName
			}
			this.getData();
			//#ifdef H5
			this.setWeChatShare('', '', '')
			//#endif
		},
		onShow() {
			const _this = this;
			_this.getUserInfo();
			// _this.getTotalAmount();
			if (_this.isGetUserLevel == 1) {
				_this.getUserLevel();
			}
		},
		//#ifdef MP-WEIXIN
		onShareAppMessage(res) {
			const _this = this;
			return _this.getMiniShareObj('', '', '')
		},
		//#endif
		methods: {
			getTotalAmount(){
				uni.showLoading({
					title: '加载中'
				});
				api.user.getPosRecordMainById({
					userId:this.recommendId
				}).then(res=>{
					if(res.data&&res.data.totalAmount>0){
						this.totalAmount=res.data.totalAmount
					}
					uni.hideLoading()
				}).catch(e=>{
				})
			},
			goSelf(item) {
				const _this = this;
				if (_this.isCanClick == 1) {
					var userLevelName=item.userLevelName?item.userLevelName:'普通会员'
					uni.navigateTo({
						url: '/pages/mine/recommend?recommendId=' + item.id +
							'&isCanClick=1&isGetUserLevel=1&userLevelName=' + userLevelName
					})
				}
			},
			getUserLevel() {
				const _this = this;
				api.user.getUserLevel().then(res => {
					if (res.code == 0 && res.data) {
						if (res.data.userLevel) {
							_this.userLevelName = res.data.userLevel.name
						} else {
							_this.userLevelName = ''
						}
					} else {
						_this.userLevelName = ''
					}
				}).catch(e => {
					_this.userLevelName = ''
				})
			},
			getUserInfo() {
				const _this = this;
				api.user.getSystemUserById({
					id: _this.recommendId
				}).then(res => {
					if (res.data) {
						_this.userInfo = res.data
					}
				})
			},
			tel(phone) {
				const _this = this;
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			getData() {
				const _this = this;
				uni.showLoading({
					title: '加载中'
				});
				api.user.getListUserAndUserLevel({
					phone: '',
					recommendId: _this.recommendId
				}).then(res => {
					uni.hideLoading()
					_this.listData = res.listData;
					_this.listData.sort(_this.sortStatus);
					_this.isRequest = true
				}).catch(e => {
					_this.isRequest = true
				})
			},
			sortStatus(a, b) {
				return a.status - b.status
			},
		}
	}
</script>

<style>
</style>
