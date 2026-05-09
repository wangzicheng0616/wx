<template>
	<view class="pos-f w-full" :style="{ top: '-20px',zIndex: -2, marginTop: marginTop + 'rpx'}">
		<view class="use-fixbg1 pos-a bg-base w-full pos-t-full" :style="{background: bgColor}"></view>
		<view  class="use-fixbg2 pos-a  bg-drak w-full pos-t-full"></view>
	</view>
</template>

<script>
export default {
		props: {
			top: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: '#82C91E'
			}
		},
		computed: {
			marginTop() {
				console.log(this.color)
					return this.top;
			},
			bgColor() {
				console.log(this.color)
				return this.color
			}
		}
	}
</script>

<style>
	.use-fixbg1 {
		height: 550rpx; 
		z-index: -2;
	}
	.use-fixbg2 {
		border-top-left-radius: 40rpx; 
		border-top-right-radius: 40rpx; 
		top: 490rpx; 
		height: 100rpx; 
		z-index: -1;
	}
</style>
