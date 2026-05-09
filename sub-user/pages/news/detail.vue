<template>
	<view v-if="detail" style="padding: 10px;">
		<view class="font-size-16" style="font-weight: bold;color: #000000;text-align: center;margin-top: 10px;">{{detail.title}}</view>
		<view style="margin-top: 10px;color: #909399;text-align: right;" class="font-size-12">
			{{detail.publishTime}}
		</view>
		<view class="font-size-14" style="margin: 18px 0;color: #606266;line-height: 16px;">
			{{detail.subtitle}}
		</view>
		<mp-html :content="content" :domain="domain"/>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	import global from '@/utils/global.js'
	export default {
		data() {
			return {
				id: '',
				detail: '',
				content: '',
				domain: global.imageUri
			}
		},
		onLoad(options) {
			const _this=this;
			_this.id=options.id
			_this.getDetail()
		},
		methods:{
			getDetail(){
				const _this=this;
				uni.showLoading({
					title:'加载中'
				})
				api.news.getAdNewsById({id:_this.id}).then(res=>{
					if(res.data){
						_this.detail=res.data;
						_this.content=res.data.content
						uni.setNavigationBarTitle({
							title: _this.detail.title
						});
					}
					uni.hideLoading()
				}).catch(e=>{
				})
			}
		}
	}
</script>

<style>
</style>
