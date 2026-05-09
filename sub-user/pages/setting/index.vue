<template>
	<view class="container margin-lr">
		<use-navbar title="系统设置"></use-navbar>
		<view class="border-radius margin-top-sm">
			<use-list-title title="意见反馈" iconfont=" " @goto="to('/sub-user/pages/freeback/freeBackList')"></use-list-title>
			<use-list-title :title="aboutName" iconfont=" " @goto="to('/sub-user/pages/about/index')" :tip="version"></use-list-title>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		onLoad(options) {
			
		},
		computed: {
			aboutName() {
				return '关于' + this.$config.appabbr;
			},
			version() {
				return '版本' + this.$config.version;
			}
		},
		methods: {
			to(url) {
				uni.navigateTo({
					url
				})
			},
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
	}

	.use-item {
		height: 100rpx;
		line-height: 100rpx;
		position: relative;
		background: #fff;
		
		switch {
			transform: translateX(16rpx) scale(.84);
		}
		
		button {
			line-height: 100rpx;
			background: #fff;
			font-size: 15px;
		}
	}
</style>
