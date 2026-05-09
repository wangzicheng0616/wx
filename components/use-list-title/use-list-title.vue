<template>
	<view>
		<!-- 列表标题 -->
		<view class="use-list-title dflex-b padding-lr w-full bg-main" :class="type == 'round' ? 'border-radius' : ''" @click="goto">
			<view class="dflex">
				<view v-if="iconfont && iconfont != ' '" class="iconfont __left margin-right-sm" :class="iconfont" :style="{ color: color }"></view>
				<text :style="{fontSize: size + 'rpx', fontWeight: fwt }">{{ title }}</text>
			</view>
			<view class="dflex">
				<text v-if="tip && title !== '优惠券'" class="tip margin-right-xs">{{tip}}</text>
				<text v-else-if="title === '优惠券' && !tip" class="tip margin-right-xs dot">{{num}}张可用</text>
				<text v-else-if="title === '优惠券' && tip" class="tip margin-right-xs">{{tip}}</text>
				<view class="iconfont fs-sm" :class="rightIcon" :style="{ color: rightColor }"></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: 'square'
		},
		title: {
			type: String,
			default: '列表标题'
		},
		size: {
			type: String,
			default: '28'
		},
		fwt: {
			type: String,
			default: 'normal'
		},
		tip: {
			type: [String, Number],
			default: ''
		},
		iconfont: {
			type: String,
			default: 'icondaifahuo-'
		},
		color: {
			type: String,
			default: '#C0C4CC'
		},
		rightIcon: {
			type: String,
			default: 'iconjiantou-01'
		},
		rightColor: {
			type: String,
			default: '#c0c0c0'
		},
		// title为优惠券时可用，为可用优惠券数量
		num: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {};
	},
	methods: {
		goto() {
			console.log('goto');
			this.$emit('goto', {
				type: 'goto'
			});
		}
	}
};
</script>

<style lang="scss">
.use-list-title {
	height: 100rpx;
	line-height: 100rpx;
}
.use-list-title {
	.__left{
		font-size: $font-lg + 8upx;
	}
	
	.iconfont {
		color: #c0c0c0;
	}
	
	.tip {
		font-size: $font-sm;
		color: #c0c0c0;
	}
	.dot{
		height: 40rpx;
		line-height: 20rpx;
		background: red;
		padding: 10rpx 10rpx;
		color: #fff;
		border-radius: 8rpx;
	}
}
</style>
