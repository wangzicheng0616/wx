<template>
	<view>
		<view class="order-confirm-card notification-list-wrap font-size-14" style="margin: 0;flex-direction: column;">
			<view style="width: 100%;position: relative;">
				<textarea v-model="content" maxlength="1000" placeholder="请输入内容" @confirm="submit()"
					:show-confirm-bar="false" confirm-type="done"
					style="position: relative; width: 100%;height: 150px;font-size: 14px;margin-top: 10px;"
					placeholder-style="color:#909399;font-size:14px">
				</textarea>
				<view style="position: absolute;bottom: 10px;right: 10px;color: #c0c4cc;" class="font-size-10">
					{{content.length}}/1000
				</view>
			</view>
			<view class="display-flex-row" style="margin-bottom:30px;margin-top:10px;flex-wrap: wrap;width: 100%;">
				<template v-if="imagesUrls.length>0">
					<view class="item-wrap" v-for="(item,index) in imagesUrls" :key="index">
						<view class="image-wrap border-radius-6" style="position: relative;">
							<image class="border-radius-6" :src="tools.getImagePath(item)"
								style="width: 100%;height: 100%;" mode="aspectFill" @click="previewImage(item,index)">
							</image>
							<view @click.top="delImage(index)"
								style="position: absolute;top: -10px;right: -10px;padding: 5px;">
								<uni-icons type="clear" size="14" color="#c0c4cc">
								</uni-icons>
							</view>
						</view>
					</view>
				</template>

				<view class="item-wrap" v-if="imagesUrls.length<3">
					<view class="image-wrap border-radius-6" style="background: #f1f1f1;" @click="uploadImage">
						<image :src="httpImageUrl+'/static/icon_camera.png'" style="width: 56px;height: 56px;"></image>
					</view>
				</view>
			</view>
		</view>

		<view
			style="height: 40px;margin-top: 20px;margin-bottom: 20px;display: flex;align-items: center;justify-content: center;">
			<view class="font-size-16 btn-bg"
				style="width: 90%;height: 100%;display: flex;align-items: center;justify-content: center;color: white;border-radius: 20px;"
				@click="submit">
				确定
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
	import global from '@/utils/global.js'
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
				httpImageUrl: this.httpImageUrl,
				parentId: 0,
				content: '',
				imagesUrls: [],
				previewImages: [],
			}
		},
		onLoad(options) {
			const _this = this;
			_this.parentId = options.parentId;
			if (_this.parentId == 0) {
				uni.setNavigationBarTitle({
					title: '我要反馈'
				});
			} else {
				uni.setNavigationBarTitle({
					title: '回复反馈'
				});
			}
		},
		methods: {
			submit() {
				const _this = this;
				if (!_this.content) {
					uni.showToast({
						title: '请输入内容',
						icon: 'none'
					})
					return
				}
				uni.showLoading({
					title: '加载中'
				})
				api.freeBack.save({
					parent: {
						id: _this.parentId
					},
					type: _this.parentId > 0 ? 1 : 0,
					content: _this.content,
					image1: _this.imagesUrls.length > 0 ? _this.imagesUrls[0] : '',
					image2: _this.imagesUrls.length > 1 ? _this.imagesUrls[1] : '',
					image3: _this.imagesUrls.length > 2 ? _this.imagesUrls[2] : ''
				}).then(res => {
					uni.hideLoading()
					uni.navigateBack({
						delta: 1
					})
				}).catch(e => {
				})
			},
			previewImage(item, index) {
				const _this = this;
				uni.previewImage({
					urls: _this.previewImages,
					current: index
				});
			},
			delImage(index) {
				const _this = this;
				_this.previewImages.splice(index, 1)
				_this.imagesUrls.splice(index, 1)
			},
			uploadImage() {
				const _this = this;
				uni.chooseImage({
					count: 3 - _this.imagesUrls.length,
					success(res) {
						uni.showLoading({
							title: '加载中'
						})
						const tempFilePaths = res.tempFilePaths;
						const tempFilePathsLength = res.tempFilePaths.length
						var upLoadNum = 0
						for (var i = 0; i < tempFilePathsLength; i++) {
							var item = res.tempFilePaths[i]
							uni.uploadFile({
								url: global.baseUri + global.path + 'upload/uploadPic',
								header: {
									'token': uni.getStorageSync("token"),
								},
								filePath: item,
								name: 'file',
								formData: {
									'type': 4
								},
								success(data) {
									upLoadNum++
									if (upLoadNum == tempFilePathsLength) {
										uni.hideLoading()
									}
									var data = JSON.parse(data.data);
									if (data.code == 0) {
										_this.imagesUrls.push(data.data)
										_this.previewImages.push(_this.tools.getImagePath(data.data))
									} else {
										uni.showToast({
											title: '上传图片失败!',
											icon: 'none'
										})
									}
								},
								fail() {
									uni.hideLoading();
									uni.showToast({
										title: '上传图片失败!',
										icon: 'none'
									})
								}
							})
						}
					}
				})
			},
		},
		
	}
</script>

<style lang="scss">
	.item-wrap {
		width: 33.333%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 10px;
	}
	
	.image-wrap {
		width: 100px;
		height: 100px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
