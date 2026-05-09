<template>
	<view class="use-upload dgrid dgrid-col-3 pos-r">
		<view class="dflex" v-if="imgs.length"> 
			<view class="item pos-r" v-for="(item, index) in imgs" @click="preImage(item)" :key="index">
				<video v-if="item.type.indexOf('video/') !== -1" :src="item.url"></video>
				<image v-else :src="item.url" mode="aspectFill"></image>
				<view class="del pos-a bg-main dflex-c border-radius-c iconfont iconlajitong-01 ft-dark" v-if="isDelete" @tap.stop="delImage(index)"></view>
			</view>
		</view>
		<view class="item border-radius-sm dflex-c dflex-flow-c"  @tap="chooseImage">
			<view class="iconfont iconxiangji-01 fs-big ft-dark"></view>
			<view v-if="desc" class="ft-dark">{{ desc }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			limit: {
				type: Number,
				default: 3
			},
			desc: {
				type: String,
				default: ''
			}, 
			imgsArr: {
				type: Array,
				default: ()=>{
					return []
				}
			},
			isDelete: {
				type: Boolean,
				default: true
			}, 
		},
		data() {
			return {
				imgs: [],
				canvasSize: {
					canvasHeight: 0,
					canvasWidth: 0
				}
			};
		},
		mounted(){
			this.imgs = this.imgsArr
		},
		methods: {	
			chooseImage(flag) {
				let _this = this;
				uni.chooseImage({
					count: _this.limits - _this.imgs.length,
					// 可以指定是原图|压缩图，默认二者都有
					sizeType: ['original', 'compressed'],
					success: async (res) => {
						uni.showLoading({
							title: '上传中',
							mask: true
						});
						
						for (var i = 0; i < res.tempFilePaths.length; i++) {
							console.log('res.tempFilePaths[i]', res.tempFilePaths[i], res.tempFiles[i]);
							let filename = res.tempFilePaths[i];
							if (res.tempFiles[i] && res.tempFiles[i].name) {
								filename = res.tempFiles[i].name;
							}
							console.log(res.tempFilePaths[i])
							const result = await uniCloud.uploadFile({
								filePath: res.tempFilePaths[i],
								cloudPath: this.$api.getFileName(filename),
								onUploadProgress: function(progressEvent) {
									var percentCompleted = Math.round((progressEvent.loaded *
										100) / progressEvent.total);
								}
							}).then(async uRes => {
								console.log('uploadFile', uRes, res.tempFiles[i]);
								uRes.url = uRes.fileID;
								// 兼容腾讯云上传文件
								if (uRes.url.indexOf('cloud://') != -1)
								{
									const tempRes = await uniCloud.getTempFileURL({
										fileList: [uRes.url]
									});
									
									if (tempRes.fileList && tempRes.fileList.length > 0) {
										uRes.url = tempRes.fileList[0].tempFileURL;
									}
								}
								
								uRes.type = res.tempFiles[i].type || 'image/';
								uRes.size = res.tempFiles[i].size;
								_this.imgs.push(uRes)
								_this.sendData();
							}).catch(err => {
								console.log('use-upload', err);
							});
						}

						uni.hideLoading();
					}
				});
			},			
			preImage(item) {
				console.log(item)
				const urls = this.imgsArr.length>0 ?this.imgsArr: this.imgs
				console.log(item, urls);
				if (item.type.indexOf('video/') !== -1) {
					return;
				}
				
				let _urls = urls.filter(x => x.type.indexOf('image/') !== -1).map(ele => {
					return ele.url;
				});
				
				
				uni.previewImage({
					current: item.url,
					urls: _urls,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},

			delImage(idx) {
				this.imgs.splice(idx, 1);
				this.sendData();
			},

			sendData() {
				this.$emit('upload', this.imgs);
			}
		}
	};
</script>

<style lang="scss">
	.use-upload {
		width: 100%;
		.item {
			width: 150rpx;
			height: 210rpx;
			border: 1px solid #f0f0f0;
			margin-right: 10rpx;
			image, video {
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
