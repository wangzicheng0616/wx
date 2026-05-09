<template>
	<view class="wrap font-size-14">
		<image class="no-data-img" mode="widthFix"  :src="httpImageUrl+'/static/icon_empty_data.png'"/>
        <view style="margin-top: 8px;width: 80%;text-align: center;" class="text-color">{{notice}}</view>
	</view>
</template>

<script>
	export default {
		name: "empty-data",
		props: {
			notice: {
				type: String,
				default: '暂无数据',
				required: false
			}
		},
		data() {
			return {
				httpImageUrl:this.httpImageUrl
			}
		}
	}
</script>

<style lang="scss">
	.wrap {
		position: absolute;
		top: 0;
		bottom: 50px;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1;
		flex-direction: column;
	}
	.no-data-img {
	    width: 120px;
	}
</style>
