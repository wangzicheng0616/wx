<template>
	<view class="container margin-lr  padding-bottom-xl">
		<view class="border-radius dflex-b bg-main padding-lr padding-tb-sm margin-top" v-for="(item, index) in provinceDataList" :key="index" @click="toCity(item, index, false)">
			<text>{{ item.text }}</text>
			<view class="dflex-c" >
				<view class="ft-base" ></view>
				<view  class="iconfont iconjiantou-01 fs-sm" style="color: #c0c0c0;"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import local from '@/utils/location.json'
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
                provinceDataList: [],
			};
		},
		onShow() {
			this.provinceDataList = local
		},
		methods: {
			toCity(item, index) {
				uni.navigateTo({url:'/sub-user/pages/worker/city?provinceCode='+item.value+'&provinceName='+item.text})
			},
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
	}
</style>
