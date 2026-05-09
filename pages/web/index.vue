<template>
	<web-view v-if="destruction" :src="src" @error="err"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				src: "",
				destruction: false
			}
		},
		onLoad(options) {
			this.src = decodeURIComponent(options.src);
			//#ifdef H5
			this.setWeChatShare('',this.getPath(),'')
			//#endif
		},
		//#ifdef MP-WEIXIN
		onShareAppMessage(res) {
			const _this = this;
			return _this.getMiniShareObj('',_this.getPath(),'')
		},
		//#endif
		onShow() {
			this.destruction = true;
		},
		onUnload() {
			this.src = "";
			this.destruction = false;
		},
		methods: {
			err() {
				uni.showModal({
					title: "您的网路出现问题，请重新加载",
					showCancel: false
				})
			}
		},
	}
</script>

<style>
</style>
