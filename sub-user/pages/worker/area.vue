<template>
	<view style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;">
		<view style="height: 100%;display: flex;flex-direction: column;">
			<view style="flex: 1;height: 0;">
				<scroll-view scroll-y style="height: 100%;">
					<view class="border-radius dflex-b bg-main padding-lr padding-tb-sm margin-top"
						v-for="(item, i) in areaDataList" :key="i" @click="selectArea(item)">
						<text>{{ item.text }}</text>
						<view class="dflex-c">
							<view v-if="serviceAreaList.findIndex(e=>e.value==item.value)>-1" class="iconfont iconselected fs-sm"
								style="color: #c0c0c0;"></view>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 底部操作区 -->
			<view class="oper-area dflex-b padding-right padding-left-sm safe-area-inset-bottom" style="position: relative;">
				<view class="dflex">
					<view class="btn-area dflex dflex-flow-c" @click="tohome">
						<text class="iconfont iconshouye-1"></text>
						<text>首页</text>
					</view>
				</view>
			
				<view class="dflex-e">
					<view><button @click="cancel" class="action-btn grey-btn">取消</button></view>
					<view><button @click="editConfirm" class="action-btn main-btn">确定</button></view>
				</view>
			</view>
		</view>
	</view>
	<!-- <view class="container margin-lr  " style="padding-bottom: 100rpx">
		
		
	</view> -->
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import local from '@/utils/location.json'
	export default {
		components: {

		},
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
		data() {
			return {
				areaDataList: [],
				serviceAreaList: [],
				provinceCode: '',
				provinceName: '',
				cityCode: '',
				cityName: '',
				location: ''
			};
		},
		onLoad(option) {
			this.provinceName = option.provinceName
			this.provinceCode = option.provinceCode
			this.cityCode = option.cityCode
			this.cityName = option.cityName
			this.location = local
			this.getData()
		},

		methods: {
			getData() {
				for (var i = 0; i < this.location.length; i++) {
					var province = this.location[i]
					if (province.value == this.provinceCode) {
						for (var j = 0; j < province.children.length; j++) {
							var city = province.children[j]
							if (city.value == this.cityCode) {
								this.areaDataList = city.children
								return
							}
						}
					}
				}
			},
			selectArea(row) {
				const index = this.serviceAreaList.findIndex(item => item.value == row.value)
				if (index > -1) {
					this.serviceAreaList.splice(index, 1)
					return
				}
				if (this.serviceAreaList.length === 3) {
					uni.showToast({
						icon: 'none',
						title: '服务地区不能超过3个'
					})
					return
				}

				this.serviceAreaList.push(row)
			},
			editConfirm() {
				if (this.serviceAreaList.length === 0) {
					uni.showToast({
						icon: 'none',
						title: '服务地区不能为空'
					})
					return
				}
				this.updateWorker()
			},

			cancel() {
				uni.navigateBack({
					delta: 3,
				})
			},
			// 首页
			tohome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			//更新师傅信息
			updateWorker() {
				var serviceArea = []
				var serviceAreaIds = []
				this.serviceAreaList.forEach(item => {
					serviceArea.push(this.provinceName + ',' + this.cityName + ',' + item.text)
					serviceAreaIds.push(this.provinceCode + ',' + this.cityCode + ',' + item.value)
				})
				this.$store.commit('updateWorkerInfo', {
					serviceArea: serviceArea.join(' '),
					serviceAreaIds: serviceAreaIds.join(';')
				})
				this.cancel()
			},
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
	}

	/* 操作区 */
	.oper-area {
		width: 100%;
		height: 100rpx;
		height: calc(env(safe-area-inset-bottom) + 100upx);
		background-color: #fff;
		position: fixed;
		z-index: 1;
		bottom: 0;
		left: 0;
		border-top: 1px solid #f0f0f0;

		.btn-area {
			font-size: $font-sm;
			color: $font-color-base;
			width: 96rpx;

			.iconfont {
				font-size: 40rpx;
				line-height: 48rpx;
			}
		}

		/* 操作按钮 */
		.action-btn {
			width: 156rpx;
			height: inherit;
			line-height: inherit;
			margin: 0;
			margin-left: 20rpx;
			padding: 12rpx 0;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;
			/* #ifdef MP-QQ || MP-ALIPAY */
			border: 1px solid;
			/* #endif */

			&:after {
				border-radius: 100px;
			}

			&.main-btn {
				background: rgba(129, 199, 31, 0.1);
				color: $base-color;

				&:after {
					border-color: rgba(129, 199, 31, 0.8);
				}
			}
		}
	}
</style>