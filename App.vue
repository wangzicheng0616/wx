<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<script>
	import global from './utils/global.js'
	import api from '@/common/api.js'
	export default {
		globalData: {
			recUserMap: {}, //存储分享的商品与推荐人的键值对信息
			recUserId: '',
			entityShopId: 0, //线下实体店id
			shareTitle:'',
			shareImage:'',
		},
		onLaunch: function(options) {
			const _this = this;
			if (options.query.recUserId) {
				// getApp().globalData.recUserId = options.query.recUserId
				_this.globalData.recUserId = options.query.recUserId
			}
			if (options.query.scene) {
				var sceneObject=_this.getSceneObject(decodeURIComponent(options.query.scene))
				if(sceneObject.recUserId){
					_this.globalData.recUserId = sceneObject.recUserId
				}
			}
			if (global.platform == 1) { //公众号
				// _this.wxAuthorize();
			} else if (global.platform == 0) {
				_this.tools.miniCallBack(function() {
					api.user.getDbUserInfo().then(res => {
						if (res.data && res.data.user) {
							_this.$store.commit("updateMyInfo", res.data.user)
							_this.getOpenId()
						}else{
							uni.removeStorageSync('token')
						}
					}).catch(e=>{
						uni.removeStorageSync('token')
					})
				}, function() {

				})
			}
			this.getShareConfig()
		},
		onShow: function() {
			const _this = this;
			_this.saveVisit();
		},
		onHide: function() {

		},
		methods: {
			getShareConfig(){
				api.globleData.getListByGroupNo({groupNo:'SHARE_CONFIG'}).then(res=>{
					if(res.listData&&res.listData.length>0){
						var share=res.listData.find(item=>item.number=='SHARE_CONFIG')
						this.globalData.shareTitle=share.name
						this.globalData.shareImage=share.data
					}
				})
			},
			getSceneObject(scene) {
				var obj = {};
				for (var i = 0; i < scene.split('*').length; i++) {
					var arr = scene.split('*')[i].split('/');
					obj[arr[0]] = arr[1];
				}
				return obj
			},
			saveVisit() {
				var userID = 0
				if (uni.getStorageSync('userId')) {
					userID = uni.getStorageSync('userId')
				} else {
					userID = Math.floor(Math.random() * (9000000000 - 9000000 + 1) + 9000000);
				}
				api.visit.save({
					user: {
						id: userID
					}
				}).then(res => {
					// console.log(res)
				})
			},
			getOpenId() {
				const _this = this;
				uni.login({
					provider: "weixin",
					success(res) {
						// uni.showLoading({
						// 	title: '加载中',
						// 	mask: true
						// })
						var recUserId=0
						if (_this.globalData.recUserId) {
							recUserId = _this.globalData.recUserId;
						} else {
							recUserId = 0
						}
						api.mini.getOpenId({
							code: res.code,
							webapp: 1,
							nickName: '',
							headUrl: '',
							recommendId:recUserId
						}).then(resData => {
							try {
								uni.setStorageSync('token', resData.data.usertoken);
								sessionStorage.setItem("openid", resData.data.openid);
								uni.setStorageSync('openid', resData.data.openid);
								// uni.hideLoading();
								_this.getUserInfo();
							} catch (e) {
								// error
							}
						}).catch(e => {
							// uni.hideLoading();
						})
					}
				})
			},
			wxAuthorize() {
				// #ifdef H5
				const _this = this;
				let link = window.location.href;
				let openid = sessionStorage.getItem("openid");
				if (!openid) {
					let code = _this.getPageParams("code"); // 地址解析
					if (code) {
						uni.showLoading({
							title: '加载中',
							mask: true
						})
						var recUserId=0
						if (_this.globalData.recUserId) {
							recUserId = _this.globalData.recUserId;
						} else {
							recUserId = 0
						}
						api.mini.getOpenId({
							code: code,
							webapp: 0,
							nickName: '',
							headUrl: '',
							recommendId:recUserId
						}).then(resData => {
							try {
								uni.setStorageSync('token', resData.data.usertoken);
								sessionStorage.setItem("openid", resData.data.openid);
								uni.setStorageSync('openid', resData.data.openid);
								uni.hideLoading();
								_this.getUserInfo();
							} catch (e) {
								// error
							}
						}).catch(e => {
						})
					} else {
						let appid = global.officialAccountsAppid
						let uri = encodeURIComponent(link);
						let authURL =
							`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
						window.location.replace(authURL);
					}
				}
				// #endif
			},
			//获得页面url参数
			getPageParams(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]);
				return null;
			},
			getUserInfo() {
				const _this = this;
				api.user.getDbUserInfo().then(res => {
					if (res.data && res.data.user) {
						_this.$store.commit("updateMyInfo", res.data.user)
						try {
							uni.setStorageSync('userId', res.data.user.id);
							uni.setStorageSync('userName', res.data.user.name);
						} catch (e) {
							// error
						}
					}
				})
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/base.css';
	/* 全局字体图标和公共样式 */
	@import url("/components/iconfont/iconfont.css");
	@import url("/common/common.scss");
	::-webkit-scrollbar{
	      display: none;
	}
</style>
