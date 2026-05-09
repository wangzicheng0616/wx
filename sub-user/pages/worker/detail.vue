<template>
	<view class="margin-sm">
		<template v-if="isRequest">
			<template v-if="workerInfo">
				<view class="padding bg-main margin-bottom-sm border-radius dflex-b">
					<view class="dflex">
						<view class="iconfont iconmingxi ft-base margin-right-xs"></view>
						<view class="fwbd">头像</view>
					</view>
					<view class="dflex margin-left">
						<image v-if="workerInfo.headUrl" class="avatar"
							:src="tools.getImagePath(workerInfo.headUrl)"
							style="width: 36px;height: 36px;border-radius: 50%;"></image>
						<image v-else style="width: 36px;height: 36px;border-radius: 50%;" class="avatar"
							src="@/static/images/logo.png">
						</image>
					</view>
				</view>
				
				<view class="padding bg-main margin-bottom-sm border-radius">
					<view class="title">师傅姓名</view>
					<view class="margin-top-sm">{{workerInfo.workerName}}</view>
				</view>
				
				<view class="padding bg-main margin-bottom-sm border-radius">
					<view class="title">技能</view>
					<view v-if="workerInfo.tag" class="margin-top-sm"
						style="display: flex;flex-wrap: wrap;">
						<view style="margin-right: 10rpx;margin-bottom: 10rpx;padding: 4rpx 10rpx;border-radius: 8rpx;border-width: 2rpx;border-style: solid;" 
							:style="{ 'color': color[index]?color[index]:color[0],'border-color': color[index]?color[index]:color[0]}"
						v-for="(item,index) in workerInfo.tag.split(',')"
							:key="index">
							{{item}}
						</view>
					</view>
					<view v-else class="margin-top-sm"
						style="display: flex;flex-direction: column;color: #f0ad4e;">
						暂无
					</view>
				</view>
				
				<!-- <view class="padding bg-main margin-bottom-sm border-radius">
					<view class="title">标签</view>
					<view v-if="workerInfo.evaluateTags" class="margin-top-sm"
						style="display: flex;flex-wrap: wrap;">
						<view style="margin-right: 10rpx;margin-bottom: 10rpx;padding: 4rpx 10rpx;border-radius: 8rpx;border-width: 2rpx;border-style: solid;" 
							:style="{ 'color': color[index]?color[index]:color[0],'border-color': color[index]?color[index]:color[0]}"
						v-for="(item,index) in workerInfo.evaluateTags.split(',')"
							:key="index">
							{{item}}
						</view>
					</view>
					<view v-else class="margin-top-sm"
						style="display: flex;flex-direction: column;color: #f0ad4e;">
						暂无
					</view>
				</view> -->
				
				<view class="padding bg-main margin-bottom-sm border-radius">
					<view class="title">服务区域</view>
					<view v-if="workerInfo.serviceArea" class="margin-top-sm"
						style="display: flex;flex-wrap: wrap;">
						<view style="margin-right: 10rpx;margin-bottom: 10rpx;padding: 4rpx 10rpx;border-radius: 8rpx;border-width: 2rpx;border-style: solid;" 
							:style="{ 'color': color[index]?color[index]:color[0],'border-color': color[index]?color[index]:color[0]}"
						v-for="(item,index) in workerInfo.serviceArea.split(' ')"
							:key="index">
							{{item}}
						</view>
					</view>
					<view v-else class="margin-top-sm"
						style="display: flex;flex-direction: column;color: #f0ad4e;">
						暂无
					</view>
				</view>
				
				<view class="padding bg-main margin-bottom-sm border-radius">
					<view class="title">服务经验</view>
					<view style="" class="margin-top-sm">
						<!-- {{workerInfo.experience?workerInfo.experience:''}} -->
						<text v-if="workerInfo.experience">{{workerInfo.experience}}</text>
						<text v-else style="color: #f0ad4e;">暂无</text>
					</view>
				</view>
				<view class="padding bg-main margin-bottom-sm border-radius">
					<view class="title">是否有资质</view>
					<view style="" class="margin-top-sm">
						<text v-if="workerInfo.qualification">{{workerInfo.qualification}}</text>
						<text v-else style="color: #f0ad4e;">暂无</text>
					</view>
				</view>
				<view class="padding bg-main margin-bottom-sm border-radius">
					<view class="title">价格区间</view>
					<view style="" class="margin-top-sm">
						<text v-if="workerInfo.priceRange">
							<template v-if="workerInfo.priceRange.split('-').length>1">
								¥{{workerInfo.priceRange.split('-')[0]}} 至 ¥{{workerInfo.priceRange.split('-')[1]}}
							</template>
							<text v-else style="color: #f0ad4e;">暂无</text>
						</text>
						<text v-else style="color: #f0ad4e;">暂无</text>
					<!-- {{workerInfo.qualification?workerInfo.qualification:''}} -->
					</view>
				</view>
				<view class="padding bg-main margin-bottom-sm border-radius">
					<view class="title">评分</view>
					<view style="" class="margin-top-sm">
						<template v-if="workerInfo.evaluate&&workerInfo.evaluate>=0">
							<view style="display: flex;align-items: center;">
								<uv-rate :value="Math.floor(workerInfo.evaluate)>=100?5:Math.floor(workerInfo.evaluate)/20"
									:readonly="true" activeColor="#82C91E" allowHalf></uv-rate>
								<view>（{{workerInfo.evaluate>=100?100:workerInfo.evaluate}}分/100分）</view>
							</view>
						</template>
						<template v-else>
							<view style="display: flex;align-items: center;">
								<uv-rate class="line-height-1" :disabled="true"
									:value="0"></uv-rate>
							</view>
						</template>
						<!-- {{workerInfo.evaluate&&workerInfo.evaluate>=0?workerInfo.evaluate:'-'}} -->
					</view>
				</view>
				
				<!-- 云上版权 -->
				<use-copyright></use-copyright>
			</template>
		</template>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	export default {
		data() {
			return {
				httpImageUrl: this.httpImageUrl,
				workerInfo:null,
				id:0,
				isRequest:false,
				message:'',
				color:["#FAC858","#EE6666","#73C0DE","#3CA272","#9A60B4","#ea7ccc"]
			}
		},
		onLoad(options) {
			const _this = this;
			this.id=options.id
			this.getWorkerInfo()
		},
		methods:{
			getWorkerInfo(){
				uni.showLoading({
					title:'加载中'
				})
				api.worker.getInfoById({id:this.id}).then(res=>{
					uni.hideLoading()
					if(res.data){
						if(res.data.status==1){
							if(res.data.state==2){
								this.workerInfo=res.data
							}else{
								this.message='师傅认证未成功'
								this.workerInfo=null
							}
						}else{
							this.message='师傅状态未启用'
							this.workerInfo=null
						}
					}else{
						this.workerInfo=null
					}
					this.isRequest=true
				}).catch(e=>{
					this.isRequest=true
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
	}
	.title {
		max-width: 120px;
		font-weight: 600;
	}
</style>