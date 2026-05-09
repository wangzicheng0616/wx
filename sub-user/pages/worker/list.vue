<template>
	<view>
		<view class="search-area margin-bottom-sm pos-r w-full dflex-b border-radius-big margin-top-sm">
			<view class="dflex-c flex1">
				<view class="icon-search pos-a">
					<text class="iconfont iconsousuo-01"></text>
				</view>
				<input type="text" class="padding-left w-full padding-tb-xs  box-sizing-b" maxlength="20"
					style="border-top-right-radius: 0;border-bottom-right-radius: 0;" focus placeholder="请输入关键字"
					@confirm="initData" v-model="keyWord" />
			</view>

			<view class="bg-base padding-tb-16 padding-lr-lg" @click="initData">搜索</view>
		</view>
		<view v-if="isRequestBack&&!workerDatas.length" class="limit-area use-area margin-lr-sm pos-r">
			<!-- 空白页 -->
			<use-empty tip="暂无数据" :btnTip="null" height="50vh" :auto="false"></use-empty>
		</view>
		<view v-else>
			<view class="limit-area use-area margin-lr-sm pos-r" v-for="(item, idx) in workerDatas" :key="idx"
				@click="toWorkerDetail(item)">
				<view style="display:flex;width:100%">
					<image v-if="item.headUrl" :src="tools.getImagePath(item.headUrl)"
						style="width:120rpx;height:120rpx;border-radius: 12rpx;"></image>
					<image v-else src="@/static/images/logo.png" style="width:120rpx;height:120rpx"></image>
					<view style="padding-left: 20rpx;flex:1;width: 0;">
						<view class="dflex-b">
							<text class="title clamp padding-bottom-xs fs-xs">师傅名称：{{ item.workerName }}</text>
						</view>
						<text class="title clamp padding-bottom-xs fs-xs">技能：{{ item.tag?item.tag:'' }}</text>
						<!-- <view class="title clamp padding-bottom-xs fs-xs">
							标签：{{ item.evaluateTags?item.evaluateTags:'' }}</view> -->
						<view class="title padding-bottom-xs fs-xs"
							style="display: flex;width: 100%;align-items: center;">评分：
							<template v-if="item.evaluate&&item.evaluate>=0">
								<view style="display: flex;align-items: center;flex: 1;width: 0;">
									<uv-rate :value="Math.floor(item.evaluate)>=100?5:Math.floor(item.evaluate)/20"
										:readonly="true" activeColor="#82C91E" allowHalf></uv-rate>
									<view>（{{item.evaluate>=100?100:item.evaluate}}分/100分）</view>
								</view>
							</template>
							<template v-else>
								<view style="display: flex;align-items: center;width: 0;flex: 1;">
									<uv-rate class="line-height-1" :disabled="true" :value="0"></uv-rate>
								</view>
							</template>
						</view>
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
				workerDatas: [],
				isRequestBack: false,
				pageNo: 1,
				pageSize: 30,
				type: 0,
				canLoadMore: true,
				keyWord: ''
			}
		},
		onLoad(options) {
			if (options.type) {
				this.type = options.type
			}
			this.getData()
		},
		onReady() {
			if (this.type == 0) {
				uni.setNavigationBarTitle({
					title: '师傅列表'
				})
			} else {
				uni.setNavigationBarTitle({
					title: '选择师傅'
				})
			}
		},
		methods: {
			toWorkerDetail(item) {
				if (this.type == 0) {
					uni.navigateTo({
						url: '/sub-user/pages/worker/detail?id=' + item.id
					})
				} else {
					const eventChannel = this.getOpenerEventChannel();
					eventChannel.emit('getWorkerItemData', item);
					uni.navigateBack({
						delta: 1
					})
				}
			},
			initData() {
				var _this = this;
				_this.pageNo = 1;
				_this.canLoadMore = true;
				_this.getData();
			},
			getData() {
				const _this = this
				uni.showLoading({
					title: '加载中'
				})
				api.worker.getList({
					keyWord: this.keyWord,
					startTime: '',
					endTime: '',
					workerName: '',
					workerTelephone: '',
					status: 1,
					state: 2,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
				}).then(res => {
					_this.canLoadMore = true;
					if (_this.pageNo == 1) {
						_this.workerDatas = (res.data.listData);
					} else {
						_this.workerDatas = _this.workerDatas.concat(res.data.listData);
					}
					if (res.data.listData.length < _this.pageSize) {
						_this.canLoadMore = false;
					}
					this.isRequestBack = true
					uni.hideLoading()
					uni.stopPullDownRefresh()
				}).catch(e => {
					this.isRequestBack = true
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

<style lang="scss">
	page {
		background: #f5f5f5;
	}

	.search-area {

		input {
			padding-left: 80rpx;
			height: 76rpx;
			line-height: 76rpx;
			background-color: #fff;
		}

		.icon-search {
			top: 50%;
			left: 30rpx;
			transform: translate(0, -50%);
			z-index: 1;

			text {
				color: #c0c0c0;
			}
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
			background: rgb(129, 199, 31);
			;
			color: #fff;

			&:after {
				border-color: rgb(129, 199, 31);
				;
			}
		}
	}
</style>