<template>
	<view class="container margin-lr">
		<view class="border-radius dflex-b bg-main padding-lr padding-tb-sm margin-top" >
			<view class="item">
				<view class="title">技能</view>
				<view class="tags" v-if="selectedTag">
					<view class="tag" :class="{selected: selectedTag.indexOf(item.name)>-1}" v-for="(item, index) in tags" :key="item" @click="changeTags(item, index)">{{ item.name }}</view>
				</view>
			</view>
		</view>
        <!-- 底部操作区 -->
		<view class="oper-area dflex-b padding-right padding-left-sm safe-area-inset-bottom">
			<view class="dflex">
				<view class="btn-area dflex dflex-flow-c" @click="tohome">
					<text class="iconfont iconshouye-1"></text>
					<text>首页</text>
				</view>
			</view>

			<view class="dflex-e">
                <view ><button @click="cancel" class="action-btn grey-btn">取消</button></view>
				<view ><button @click="editConfirm" class="action-btn main-btn">确定</button></view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/common/api.js'
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
		data() {
			return {
                tags: [],
                selectedTag: [],
			};
		},
		onReady() {
			if(this.workerInfo.tag){
				this.selectedTag=this.workerInfo.tag.split(',')
			}
		},
		onShow() {
			this.getData()
		},
		methods: {
			getData(){
				const _this=this;
				uni.showLoading({
					title:'加载中'
				})
				api.dictionary.info({
					number: 'WORKER_TAG'
				}).then(res=>{
					if(res.listData){
						this.tags=res.listData
					}
					uni.hideLoading()
				}).catch(e=>{
				})
			},
            changeTags (item) {
				const index = this.selectedTag.indexOf(item.name)
				if(index > -1){
					this.selectedTag.splice(index, 1)
				}else{
					this.selectedTag.push(item.name)
				}
			},
            cancel(){
                uni.navigateBack()
            },
            editConfirm () {
                const tagList = []
                
                this.selectedTag.forEach(o=>{
                    tagList.push(o)
                })
                const tag = tagList.join(',')
                this.updateWorker(tag)
            },
            //更新师傅信息
			updateWorker(data) {
				this.$store.commit("updateWorkerInfo", {tag:data})
				this.cancel()
			},
			tohome(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
	}
    .item{
		background: #fff;
		// padding:0 30rpx 30rpx;
		.tags{
			margin-top: 30rpx;
			display: flex;
			flex-wrap: wrap;
			.tag{
				border: 1rpx solid #a1a6af;
				margin-left: 10rpx;
				margin-bottom: 10rpx;
				padding: 8rpx 16rpx;
				font-size: 26rpx;
				color: #8f96a2;
				background: #fff;
				border-radius: 30rpx;
				&.selected{
					border-color: #81c71f;
					background: #81c71f;
					color: #fff;
				}
			}
		}
		.othertag-box{
			padding: 20rpx;
			border: 1rpx solid #d5dae4;
			border-radius: 10rpx;
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
	}
</style>
