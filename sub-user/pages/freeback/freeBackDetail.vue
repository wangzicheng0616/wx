<template>
	<view style="display: flex;flex-direction: column;height: 100vh;">
		<view v-if="parentDetail">
			<view style="flex-direction: column;align-items: baseline;"
				class="order-confirm-card notification-list-wrap">
				<view style="width: 100%;">
					<view>{{parentDetail.content}}</view>
					<scroll-view :scroll-x="true" style="width: 100%;" class="margin-top-2"
						v-if="parentDetail.image1||parentDetail.image2||parentDetail.image3">
						<view style="display: flex;flex-wrap: nowrap;">
							<view style="display: inline-block;width:80px;height:80px;margin:0 5px;"
								v-if="parentDetail.image1">
								<u-image border-radius="12" :src="tools.getImagePath(parentDetail.image1)" width="80px"
									height="80px" mode="aspectFill" @click="previewImage(parentDetail,0)">
								</u-image>
							</view>

							<view style="display: inline-block;width:80px;height:80px;margin:0 5px;"
								v-if="parentDetail.image2">
								<u-image border-radius="12" :src="tools.getImagePath(parentDetail.image2)" width="80px"
									height="80px" mode="aspectFill" @click="previewImage(parentDetail,1)">
									
								</u-image>
							</view>

							<view style="display: inline-block;width:80px;height:80px;margin:0 5px;"
								v-if="parentDetail.image3">
								<u-image border-radius="12" :src="tools.getImagePath(parentDetail.image3)" width="80px"
									height="80px" mode="aspectFill" @click="previewImage(parentDetail,2)">
									
								</u-image>
							</view>
						</view>
					</scroll-view>
					<view style="text-align: right;color: #909399;" class="margin-top-10">
						{{parentDetail.createTime}}
					</view>
				</view>
			</view>
		</view>
		<view style="flex: 1;height: 0;margin-bottom: 10px;">
			<scroll-view :scroll-y="true" style="height: 100%;" :scroll-into-view="scrollInto" :scroll-with-animation="true">
				<view style="padding: 0 6px;">
					<view v-for="(item,index) in listData" :key="index" :id="'id-'+index ">
						<view style="width: 100%;">
							<!-- 自己 -->
							<template v-if="item.user.id==userId">
								<view style="text-align: center">
									<view style="color: #d0d0d0;font-size: 12px;">
										{{getMessageTimeShow(item.createTime)}}
									</view>
									<view class="me-message-wrap">
										<i></i>
										<view
											style="display: flex;align-items: flex-end; flex-direction: column;max-width: 70%">
											<view
												style="width: 60px;text-align: right;margin-right: 10px;font-size: 12px;color: #909399"
												class="text-display-1">{{item.user.name}}
											</view>
											<view>
												<view class="me-message" style="text-align: left">
													<view>{{item.content}}</view>
													<view style="display: flex;justify-content: flex-end;"
														v-if="item.image1||item.image2||item.image2">
														<u-image border-radius="12"
															:src="tools.getImagePath(item.image1)" v-if='item.image1'
															width="40px" height="40px" mode="aspectFill"
															style="margin:0 5px;" @click="previewImage(item,0)">
															
														</u-image>
														<u-image border-radius="12"
															:src="tools.getImagePath(item.image2)" v-if='item.image2'
															width="40px" height="40px" mode="aspectFill"
															style="margin:0 5px;" @click="previewImage(item,1)">
															
														</u-image>
														<u-image border-radius="12"
															:src="tools.getImagePath(item.image3)" v-if='item.image3'
															width="40px" height="40px" mode="aspectFill"
															style="margin:0 5px;" @click="previewImage(item,2)">
															
														</u-image>
													</view>
												</view>
											</view>
										</view>
										<u-image border-radius="12" :src="tools.getImagePath(item.user.headImage)"
											width="40px" height="40px" mode="aspectFill">
											
										</u-image>
									</view>
								</view>
							</template>
							<!-- 对方 -->
							<template v-else>
								<view style="text-align: center">
									<view style="color: #d0d0d0;font-size: 12px;">
										{{getMessageTimeShow(item.createTime)}}
									</view>
									<view class="you-message-wrap">
										<i></i>
										<u-image border-radius="12" :src="tools.getImagePath(item.user.headImage)"
											width="40px" height="40px" mode="aspectFill">
											
										</u-image>
										<view style="max-width: 70%">
											<view
												style="width: 60px;text-align: left;margin-left: 10px;font-size: 12px;color: #909399"
												class="text-display-1">{{item.user.name}}
											</view>
											<view class="you-message" style="text-align: left">
												<view>{{item.content}}</view>
												<view style="display: flex;justify-content: flex-start;"
													v-if="item.image1||item.image2||item.image2">
													<u-image border-radius="12" :src="tools.getImagePath(item.image1)"
														v-if='item.image1' width="40px" height="40px" mode="aspectFill"
														style="margin:0 5px;" @click="previewImage(item,0)">
														
													</u-image>
													<u-image border-radius="12" :src="tools.getImagePath(item.image2)"
														v-if='item.image2' width="40px" height="40px" mode="aspectFill"
														style="margin:0 5px;" @click="previewImage(item,1)">
														
													</u-image>
													<u-image border-radius="12" :src="tools.getImagePath(item.image3)"
														v-if='item.image3' width="40px" height="40px" mode="aspectFill"
														style="margin:0 5px;" @click="previewImage(item,2)">
														
													</u-image>
												</view>
											</view>
										</view>
									</view>
								</view>
							</template>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view @click="goFreeBackEdit" class="btn-bg"
			style="display: flex;align-items: center;justify-content: center;height: 50px;width: 100%;">
			<view style="color: #ffffff;">
				我要回复
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
				httpImageUrl: this.httpImageUrl,
				listData: [],
				parentDetail: '',
				parentId: 0,
				userId: 0,
				scrollInto:''
			}
		},
		onLoad(options) {
			this.parentId = options.parentId
			this.userId = uni.getStorageSync('userId')
			this.getInfo();
		},
		onShow() {
			this.getData();
			this.getUserInfo();
		},
		components: { // 注册子组件
			EmptyData
		},
		methods: {
			getData() {
				const _this = this;
				uni.showLoading({
					title: '加载中'
				});
				api.freeBack.detail({
					parentId: _this.parentId
				}).then(res => {
					_this.listData = res.listData;
					_this.isRequest = true;
					_this.$nextTick(function(){
						_this.setScroll();
					});
					uni.hideLoading()
				}).catch(e => {
					_this.isRequest = true;
					_this.listData = [];
				})
			},
			setScroll() {
				let len = this.listData.length;
				this.scrollInto = 'id-' + (len - 1);
				console.log(this.scrollInto);
			},
			getInfo() {
				const _this = this;
				api.freeBack.info({
					id: _this.parentId
				}).then(res => {
					if (res.code == 0) {
						_this.parentDetail = res.data;
					}
				})
			},
			previewImage(item, index) {
				const _this = this
				var previewImageArray = [];
				if (item.image1) {
					previewImageArray.push(_this.tools.getImagePath(item.image1))
				}
				if (item.image2) {
					previewImageArray.push(_this.tools.getImagePath(item.image2))
				}
				if (item.image3) {
					previewImageArray.push(_this.tools.getImagePath(item.image3))
				}
				uni.previewImage({
					urls: previewImageArray,
					current: index
				})
			},
			goFreeBackEdit() {
				uni.navigateTo({
					url: '/pages/mine/freeBackEdit?parentId=' + this.parentId
				})
			},
			getMessageTimeShow(time_str) {
				if (time_str) {
					var now = new Date();
					var date = new Date(time_str.replace(/-/g, '/'));
					var M=date.getMonth() + 1
					var D=date.getDate()
					var H=date.getHours()
					var m=date.getMinutes()
					//计算时间间隔，单位为分钟
					var inter = parseInt((now.getTime() - date.getTime()) / 1000 / 60);
					if (inter === 0) {
						return "刚刚";
					}
					//多少分钟前
					else if (inter < 60) {
						return inter.toString() + "分钟前";
					}
					//多少小时前
					else if (inter < 60 * 24) {
						return parseInt(inter / 60).toString() + "小时前";
					}
					//本年度内，日期不同，取日期+时间  格式如  06-13 22:11
					else if (now.getFullYear() == date.getFullYear()) {
						if(M<10){
							M='0'+M;
						}
						if(D<10){
							D='0'+D;
						}
						if(H<10){
							H='0'+H
						}
						if(m<10){
							m='0'+m
						}
						return M + "-" +
							D + " " +
							H + ":" +m;
					} else {
						if(M<10){
							M='0'+M;
						}
						if(D<10){
							D='0'+D;
						}
						if(H<10){
							H='0'+H
						}
						if(m<10){
							m='0'+m
						}
						return date.getFullYear().toString().substr(2, 2) + "-" +
							M + "-" +
							D + " " +
							H + ":" +
							m;
					}
				}
			},
			getUserInfo() {
				const _this = this;
				api.user.getDbUserInfo().then(res => {
					if (res.data && res.data.user) {
						_this.$store.commit("updateMyInfo", res.data.user)
					}
				})
			},
		},
	}
</script>

<style lang="scss">
	.me-message-wrap {
		width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;
		margin-top: 10px;
		position: relative;

		i {
			position: absolute;
			top: 30px;
			right: 43px;
			width: 0;
			height: 0;
			border-top: 6px solid transparent;
			border-left: 8px solid #04befe;
			border-bottom: 6px solid transparent;
		}
	}

	.you-message-wrap {
		width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		margin-top: 10px;
		position: relative;

		i {
			position: absolute;
			top: 30px;
			left: 43px;
			width: 0;
			height: 0;
			border-top: 6px solid transparent;
			border-right: 8px solid #fff;
			border-bottom: 6px solid transparent;
		}
	}

	.me-message {
		/*max-width: 70%;*/
		min-width: 10px;
		border: 1px solid #04befe;
		background: #04befe;
		text-align: right;
		margin-right: 10px;
		border-radius: 6px;
		color: white;
		font-size: 12px;
		line-height: 22px;
		min-height: 22px;
		padding: 3px 10px;
		margin-top: 8px;
		word-break: break-word;
	}

	.you-message {
		/*max-width: 70%;*/
		min-width: 10px;
		border: 1px solid white;
		background: white;
		text-align: right;
		margin-left: 10px;
		border-radius: 6px;
		color: #3c3c3c;
		font-size: 12px;
		line-height: 22px;
		min-height: 22px;
		padding: 3px 10px;
		margin-top: 8px;
		word-break: break-word;
	}
</style>
