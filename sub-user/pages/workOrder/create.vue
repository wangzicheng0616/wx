<template>
	<view class="margin-sm">
		<view class="padding bg-main margin-bottom-sm border-radius dflex-b" @click="toFeedbackType">
			<view class="dflex">
				<view class="iconfont iconmingxi ft-base margin-right-xs"></view>
				<view class="fwbd">工单类型</view>
			</view>
			<view class="dflex margin-left">
				<view class="fwbd">{{ postData.workOrderType || '请选择' }}</view>
				<view class="iconfont iconjiantou-01 fwb"></view>
			</view>
		</view>

		<!-- 联系方式 -->
		<view class="padding bg-main margin-bottom-sm border-radius">
			<view class="title">姓名</view>
			<input type="text" maxlength="30" v-model="postData.userName" placeholder="请输入姓名" />

		</view>
		<!-- 联系方式 -->
		<view class="padding bg-main margin-bottom-sm border-radius">
			<view class="title">手机号</view>
			<input type="tel" maxlength="11" class="wh-full" v-model="postData.userTelephone" placeholder="请输入手机号" />
		</view>

		<view class="padding bg-main margin-bottom-sm border-radius">
			<view class="title">要求上门时间</view>
			<use-date-time-picker fields="second" start="2023-01-01 00:00:00" end="2130-12-30 23:59:59"
				v-model="postData.reqDate" @change="changeDate"></use-date-time-picker>
		</view>

		<view class="padding bg-main margin-bottom-sm border-radius">
			<view class="title">省、市、县（区）</view>
			<uni-data-picker v-slot:default="{data, error, options}" v-model="postData.addressCode"
				:localdata="localdata" popup-title="请选择省市区" @change="onchange">
				<view v-if="data.length" style="display: flex;">
					<view v-for="(item,index) in data" :key="index">
						<text :style="index>0?'margin-left:6px':''">{{item.text}}</text>
					</view>
				</view>
				<view v-else>
					<text style="color:#777">请选择省市区</text>
				</view>
			</uni-data-picker>
		</view>

		<view class="padding bg-main margin-bottom-sm border-radius">
			<view class="title">详细地址</view>
			<input type="text" maxlength="30" class="wh-full" v-model="postData.address" placeholder="请输入上门地址" />
		</view>

		<view class="padding bg-main margin-bottom-sm border-radius">
			<view class="title">意向要求</view>
			<textarea style="max-height: 50px;" v-model="postData.customerIntention" placeholder="请输入意向和要求"></textarea>
		</view>

		<view class="padding bg-main margin-bottom-sm border-radius">
			<view class="title">故障照片或视频</view>
			<view style="width: 100%;margin-top: 20rpx;">
				<view class="use-upload pos-r dflex" style="flex-wrap: wrap;">
					<view class="item pos-r margin-bottom-xxs" v-for="(item, index) in imgs"
						:key="index">
						<template v-if="determineResourceType(item)===0">
							<image @click="preEndImage(item)" :src="tools.getImagePath(item)" mode="aspectFill"></image>
						</template>
						<template v-else-if="determineResourceType(item)===1">
							<video :src="tools.getImagePath(item)"></video>
						</template>
						<view class="del pos-a bg-main dflex-c border-radius-c iconfont iconlajitong-01 ft-dark"
							@tap.stop="delImage(index)"></view>
					</view>
					<view class="item border-radius-sm dflex-c dflex-flow-c" v-if="imgs.length < limit"
						@tap="chooseImage">
						<view class="iconfont iconxiangji-01 fs-big ft-dark"></view>
					</view>
				</view>
			</view>
		</view>


		<!-- 提交操作 -->
		<view class=" w-full">
			<view class="dflex-b border-radius-big">
				<view class="tac padding-tb-sm fwb flex1 bg-base" @click="submit">提交</view>
			</view>
		</view>

		<use-popup v-model="feedbackTypePopup" bgclass="" style="padding-bottom: 5px;" mode="bottom">
			<view class="padding bg-main" style="max-height: 60vh;">
				<view v-for="(item, idx) in workOrderTypeArray" :key="idx"
					:class="{ 'border-line': idx < workOrderTypeArray.length - 1 }" class="padding-16"
					@click="clickOrderType(item)">
					<view class="fwbd">{{item.name}}</view>
					<!-- <view class="ft-dark fs-xxs">{{item.description}}</view> -->
				</view>
			</view>
		</use-popup>

		<use-popup v-model="createOrderPopup" bgclass="" style="padding-bottom: 5px;" mode="center">
			<view class="padding bg-main" style="max-height: 30vh;">
				<view>创建成功，保持手机畅通， 关闭小程序！</view>
				<button @click="closeMiniApp">继续创建</button>
			</view>
		</use-popup>
		<!-- 云上版权 -->
		<use-copyright></use-copyright>
		<use-loading :loaded="isLoaded"></use-loading>
	</view>
</template>
<script>
	import global from '@/utils/global.js'
	import api from '@/common/api.js'
	import local from '@/utils/location.json'
	import {
		mapState
	} from 'vuex';

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
				feedbackTypePopup: false,
				feedbackType: {},
				workOrderTypeArray: [],
				isubmit: false,
				createOrderPopup: false,
				isLoaded: true,
				postData: {
					workOrderType: '',
					userName: '',
					reqDate: '设置上门时间',
					address: '',
					userTelephone: '',
					customerIntention: '',
					addressCode: '',
					remarks: '',
				},
				localdata: [],
				limit: 6,
				imgs: [],
			};
		},
		onLoad(options) {
			this.localdata = local
			this.getWorkerType()
		},
		methods: {
			determineResourceType(url) {
			      // 获取 URL 的文件扩展名
			      const extension = url.split('.').pop().toLowerCase();
			
			      // 定义图片和视频的扩展名数组
			      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
			      const videoExtensions = ['mp4', 'avi', 'mov', 'wmv'];
			
			      // 判断资源类型
			      if (imageExtensions.includes(extension)) {
			        return 0;
			      } else if (videoExtensions.includes(extension)) {
			        return 1;
			      } else {
			        return -1; // 如果不是图片也不是视频，则返回未知
			      }
			},
			chooseImage() {
				const _this = this
				uni.chooseMedia({
					count: _this.limit - _this.imgs.length,
					mediaType: ['image','video'],
					sourceType: ['album', 'camera'],
					sizeType: ['original', 'compressed'],
					maxDuration: 30,
					camera: 'back',
					success(res) {
						uni.showLoading({
							title: '加载中'
						})
						const tempFilePaths = res.tempFiles;
						const tempFilePathsLength = res.tempFiles.length
						var upLoadNum = 0
						
						for (var i = 0; i < tempFilePathsLength; i++) {
							var item = tempFilePaths[i]
							uni.uploadFile({
								url: global.baseUri + global.path + 'upload/uploadPic',
								header:{
									'token': uni.getStorageSync("token"),
								},
								filePath: item.tempFilePath,
								name: 'file',
								formData: {
									'type': 8
								},
								success(data) {
									upLoadNum++
									if (upLoadNum == tempFilePathsLength) {
										uni.hideLoading()
									}
									var data = JSON.parse(data.data);
									if (data.code == 0) {
										_this.imgs.unshift(data.data)
									} else {
										uni.showToast({
											title: '上传失败!',
											icon: 'none'
										})
									}
								},
								fail() {
									uni.hideLoading();
									uni.showToast({
										title: '上传失败!',
										icon: 'none'
									})
								}
							})
						}
						
						
						// uni.uploadFile({
						// 	url: global.baseUri + global.path + 'upload/uploadPic',
						// 	filePath: tempFilePaths[0].tempFilePath,
						// 	name: 'file',
						// 	header: {
						// 		'token': uni.getStorageSync("token"),
						// 	},
						// 	formData: {
						// 		'type': 8
						// 	},
						// 	success(res) {
						// 		var data = JSON.parse(res.data);
						// 		if (data.code == 0) {
						// 			_this.imgs.unshift(data.data)
						// 			uni.hideLoading()
						// 		} else {
						// 			uni.showToast({
						// 				title: '上传失败',
						// 				icon: 'none'
						// 			})
						// 		}
						// 	},
						// 	fail() {
						// 		uni.hideLoading()
						// 		uni.showToast({
						// 			title: '上传失败',
						// 			icon: 'none'
						// 		})
						// 	}
						// })
					}
				})
			},
			preEndImage(item) {
				const _this = this
				var urls = []
				_this.imgs.forEach(e => {
					if(this.determineResourceType(e)===0){
						urls.push(_this.tools.getImagePath(e))
					}
				})
				uni.previewImage({
					current: _this.tools.getImagePath(item),
					urls: urls,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {},
						fail: function(err) {}
					}
				});
			},
			delImage(idx) {
				this.imgs.splice(idx, 1);
			},
			getWorkerType(){
				api.dictionary.info({
					number: 'WORK_ORDER_TYPE'
				}).then(res=>{
					if(res.listData){
						this.workOrderTypeArray=res.listData
					}
				}).catch(e=>{
				})
			},
			onchange(e) {
				this.postData.addressCode = e.detail.value[e.detail.value.length - 1].value;
				this.postData.provinceCode = e.detail.value[0].value
				this.postData.cityCode = e.detail.value[1].value
				this.postData.areaCode = e.detail.value[2] ? e.detail.value[2].value : 0
				this.postData.provinceName = e.detail.value[0].text
				this.postData.cityName = e.detail.value[1].text
				this.postData.areaName = e.detail.value[2].text?e.detail.value[2].text:''
			},
			changeDate(e) {
				this.postData.reqDate = e
			},
			async clickOrderType(item) {
				this.postData.workOrderType = item.name;
				this.postData.workOrderTypeCode = item.number;
				this.feedbackTypePopup = false;
			},
			submit() {
				let _this = this;

				if (!this.postData.workOrderType) {
					this.$api.msg('请选择工单类型');
					return;
				}
				if (!this.postData.userName) {
					this.$api.msg('请填写姓名');
					return;
				}
				if (!this.postData.userTelephone) {
					this.$api.msg('请填写联系方式');
					return;
				}
				if (this.postData.reqDate === '设置上门时间') {
					this.$api.msg('请设置上门时间');
					return;
				}
				if (!this.postData.addressCode) {
					this.$api.msg('请选择省市区信息');
					return;
				}

				if (!this.postData.address) {
					this.$api.msg('请填写详细地址');
					return;
				}
				if (this.isubmit) return;

				this.isubmit = true;

				uni.showModal({
					title: '工单确认',
					content: '确认要发布吗?',
					success: (res) => {
						this.isubmit = false;
						this.isLoaded = false;
						const data = {
							...this.postData
						}
						data.fullAddress = this.postData.provinceName + ' ' + this.postData.cityName+' '+this.postData.areaName+' '+this.postData.address
						data.customPic=_this.imgs.join(';');
						if (res.confirm) {
							api.workOrder.saveInfo(data).then(res=>{
								this.isLoaded = true;
								uni.showModal({
									title: '温馨提示',
									content: '提交工单24小时内，会有工作人员联系您, 请保持手机畅通，确认继续创建。取消关闭页面',
									success(res) {
										if(res.confirm){
											uni.reLaunch({
												url:'/sub-user/pages/workOrder/create'
											})
										}else if(res.cancel){
											uni.navigateBack()
										}
									}
								})
							}).catch(e=>{
								this.isLoaded = true;
							})
						} else if (res.cancel) {
							this.isLoaded = true;
							console.log('用户点击取消');
						}
					}
				});
			},

			toFeedbackType() {
				this.feedbackTypePopup = true;
			}
		}
	};
</script>

<style lang="scss">
	page {
		background: $page-color-base;
	}

	.title {
		max-width: 120px;
		font-weight: 600;
	}
	.use-upload {
		width: 100%;
	
		.item {
			width: 150rpx;
			height: 210rpx;
			border: 1px solid #f0f0f0;
			margin-right: 10rpx;
	
			image,
			video {
				width: 100%;
				height: 100%;
			}
		}
	
		.del {
			top: -30rpx;
			right: -10rpx;
			width: 50rpx;
			height: 50rpx;
			z-index: 99;
			box-shadow: 0px 3px 5px #f0f0f0;
		}
	}
</style>
