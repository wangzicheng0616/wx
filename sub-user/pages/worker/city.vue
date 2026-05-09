<template>
	<view class="container margin-lr  padding-bottom-xl">
		<view class="border-radius dflex-b bg-main padding-lr padding-tb-sm margin-top" v-for="(item, i) in cityDataList" :key="i" @click="toArea(item,i, false)">
			<text>{{ item.text }}</text>
			<view class="dflex-c" >
				<view class="ft-base" ></view>
				<view class="iconfont iconjiantou-01 fs-sm" style="color: #c0c0c0;"></view>
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
		components: {
			
		},
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
				provinceCode:'',
				provinceName:'',
                cityDataList: [],
				location:''
			};
		},
        onLoad(option){
            this.provinceName = option.provinceName
            this.provinceCode = option.provinceCode
			this.location=local
			this.getData()
        },
		methods: {
			getData(){
				for (var i = 0; i < this.location.length; i++) {
					var province=this.location[i]
					if(province.value==this.provinceCode){
						this.cityDataList=province.children
						return
					}
				}
			},
            toArea (item,index) {
                let label = item.label
                let i = index
                uni.navigateTo({url:'/sub-user/pages/worker/area?provinceCode='+this.provinceCode+'&provinceName='+this.provinceName+'&cityCode='+item.value+'&cityName='+item.text})
            },
			
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
	}
</style>
