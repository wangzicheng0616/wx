<template>
	<view class="address-area padding-lr margin-tb-sm">
		<view class="dflex padding border-radius bg-main">
			<view class="iconfont icondizhi- margin-right ft-main"></view>
			<view class="flex1">
				<view class="w-full dflex-wrap-w">
					<view class="margin-bottom-xs desc">
						<text class="clamp-2" :user-select="true">{{ orderDetail.fullAddress }}</text>
					</view>
					<view>
						<text :user-select="true">{{ orderDetail.userName }}</text>
						<text :user-select="true" class="margin-left main-color" style="text-decoration: underline;" v-if="orderDetail.userId==myInfo.id||(orderDetail.workId==workerInfo.id&&orderDetail.status>=3)"
							@click="callPhone(orderDetail.userTelephone)">{{ orderDetail.userTelephone }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
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
		props:{
			orderDetail: {
				type: Object,
				default () {
					return {};
				}
			},
		},
		data() {
			return {
				httpImageUrl:this.httpImageUrl,
			}
		},
		methods:{
			callPhone(number) {
				if(number){
					uni.makePhoneCall({
						phoneNumber: number, // 替换为你要拨打的电话号码
						success: () => {
						},
						fail: () => {
						}
					});
				}
			},
		}
		
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
	}
	
	.adress {
		width: 50%;
		font-size: 24rpx;
		color: #bbb;
		line-height: 40rpx;
	}
	
	.order-detail .item text:first-child {
		width: max-content;
		display: inline-block;
	}
	
	.payment_voucher {
		width: 180rpx;
		height: 180rpx;
	}
	
	/* 状态区 */
	.state-area {}
	
	/* 收货人 */
	.address-area {}
	
	/* 商品区 */
	.goods-area {
		&:last-child {
			margin-bottom: 0;
		}
	
		image {
			width: 180rpx;
			height: 180rpx;
		}
	}
	
	/* 订单数据区 */
	.order-area {
		.item {
			line-height: 66rpx;
	
			.copy {
				margin-left: 20rpx;
				padding: 12rpx 24rpx;
				background-color: #f1f1f1;
				border-radius: 40rpx;
				font-size: 22rpx;
				line-height: 1;
				width: auto !important;
				transform-origin: right center;
			}
		}
	}
	
	/* 数据统计区 */
	.total-area {
		.item {
			line-height: 48rpx;
	
			text {
				text-align: right;
			}
		}
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
	
	.group-user {
		.bg-base {
			background: rgba(129, 199, 31, .85);
		}
	
		.bg-trans {
			background: rgba(0, 0, 0, .45);
			color: #fff;
		}
	}
	
	.alert-box {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 999;
	}
	
	.alert-item {
		width: 600rpx;
		min-height: 435rpx;
		padding: 30rpx 0rpx;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		border-radius: 20rpx;
	}
	
	.alert-title {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
		width: 520rpx;
		font-weight: bold;
		font-size: 24rpx;
		margin-bottom: 20rpx;
		color: rgb(186, 186, 186);
	}
	
	.alert-content {
		font-size: 24rpx;
		text-align: center;
		margin-bottom: 20rpx;
		margin: 0 auto 10rpx;
		width: 540rpx;
	}
	
	.btn-box {
		width: 440rpx;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-around;
		margin: 30rpx auto 0;
		background-color: #82C91E;
		color: #fff;
		height: 80rpx;
		border-radius: 40rpx;
	}
	
	.input-nickname {
		border-radius: 6rpx;
		height: 80rpx;
		background-color: rgb(245, 245, 245);
		font-size: 26rpx;
		width: 440rpx;
		text-align: left;
		padding-left: 20rpx;
		color: #999
	}
	
	.btn-sure {
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
	
	.sign-area {
		height: 200rpx;
		padding: 30rpx 0rpx;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: center;
		border-radius: 20rpx;
		color: #999;
		font-weight: 500;
		font-size: 38rpx;
		letter-spacing: 16rpx;
	
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
	
	.reason-content {
		display: flex;
		flex-wrap: wrap;
	
		.reason-item {
			padding: 8rpx 15rpx;
			background: #FFFFFF;
			border-radius: 23rpx;
			border: 1rpx solid #B1B3B8;
			margin: 0 10rpx 10rpx 10rpx;
			color: #B1B3B8;
	
			&.active {
				color: #fff !important;
				background: #8ACA16;
			}
		}
	}
</style>