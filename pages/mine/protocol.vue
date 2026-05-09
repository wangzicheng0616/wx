<template>
	<view style="padding: 10px;">
		<mp-html :content="content" :domain="domain" />
		<Menu></Menu>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	import global from '../../utils/global.js'
	export default {
		data() {
			return {
				number:'',
				content:'',
				domain: global.imageUri
			}
		},
		onLoad(options) {
			this.number=options.number
			//#ifdef H5
			this.setWeChatShare('', '', '')
			//#endif
			this.getData();
		},
		methods: {
			getData(){
				const _this=this;
				uni.showLoading({
					title: '加载中'
				})
				api.protocol.getInfoByNumber({
					number: _this.number
				}).then(res => {
					console.log(res);
					if (res.data) {
						_this.content=res.data.content
						uni.setNavigationBarTitle({
							title: res.data.name
						});
					}
					uni.hideLoading()
				}).catch(e => {
				})
			}
		}
	}
</script>

<style>
</style>
