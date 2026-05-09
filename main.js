// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store/index'
import uView from "uview-ui";
import global from './utils/global.js'
import $config from './common/config.js'
import $api from './common/common.js'
//#ifdef H5
import * as jwx from './utils/jws.js'
//#endif
import {
	tools
} from './utils/tools.js';
Vue.use(uView);

Vue.config.productionTip = false
Vue.prototype.tools = tools;
Vue.prototype.$store = store;
Vue.prototype.$config = $config
Vue.prototype.$api = $api
Vue.prototype.httpImageUrl = global.imageUri+'upload_file/uploadfile';
App.mpType = 'app'
Date.prototype.Format = function(fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[
			k]).substr(("" + o[k]).length)));
	return fmt;
}
Array.prototype.del = function(n) {
	//return this.slice(0, index).concat(this.slice(parseInt(index, 10) + 1));
	//prototype为对象原型，注意这里为对象增加自定义方法的方法。
	if (n < 0) //如果n<0，则不进行任何操作。
		return this;
	else
		return this.slice(0, n).concat(this.slice(n + 1, this.length));
	/*
	 　concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
	 　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
	 组成的新数组，这中间，刚好少了第n项。
	 　slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
	 */
}
//给页面路径加上某参数  url 路径 key 参数的key value 参数的value
function shareAddParam(url, key, value) {
	var _index = url.lastIndexOf("?");
	if (_index > 0) {
		if (_index < (url.length - 1)) { //?号不是最后字符
			url += "&" + key + "=" + value;
		} else {
			url += key + "=" + value;
		}
	} else {
		url += "?" + key + "=" + value;
	}
	return url;
}
//获取当前路径
Vue.prototype.getPath = function() {
	var pages = getCurrentPages()
	let currentPage = pages[pages.length - 1]['$page']['fullPath']
	return currentPage;
}
//#ifdef MP-WEIXIN
//微信小程序分享
Vue.prototype.getMiniShareObj = function(title, path, imageUrl) {
	var sharePath = '';
	var shareImageUrl = '';
	var pathUrl = path ? path : '/pages/index/index'
	if (uni.getStorageSync('userId')) {
		sharePath = shareAddParam(pathUrl, 'recUserId', uni.getStorageSync('userId'));
	} else {
		sharePath = pathUrl
	}
	sharePath = shareAddParam(sharePath, 'shareEndType', uni.getStorageSync('endType'));
	if(	getApp().globalData.shareImage){
		shareImageUrl=tools.getImagePath(getApp().globalData.shareImage) 
	}
	return {
		title: getApp().globalData.shareTitle?getApp().globalData.shareTitle:title ? title : '绿豆锁大师',
		path: pathUrl,
		imageUrl:shareImageUrl?shareImageUrl: imageUrl ? imageUrl : this.httpImageUrl + '/static/share_logo.png'
	}
}
// #endif

//#ifdef H5
Vue.prototype.setWeChatShare = function(desc, path, imageUrl) {
	var sharePath = '';
	var pathUrl = path ? global.wexinLoadUrl+path : global.wexinLoadUrl+'/pages/index/index'
	// if (uni.getStorageSync('userId')) {
	// 	sharePath = shareAddParam(pathUrl, 'recUserId', uni.getStorageSync('userId'));
	// } else {
	// 	sharePath = pathUrl
	// }
	jwx.configWeiXin(jweixin => {
		let shareInfo = {
			title: '绿豆锁大师',
			desc: desc ? desc : '绿豆锁大师',
			link: pathUrl,
			imgUrl: imageUrl ? imageUrl : this.httpImageUrl + '/static/share_logo.png',
			success: function() {}
		};
		jweixin.updateAppMessageShareData(shareInfo);
		jweixin.updateTimelineShareData(shareInfo);
	});

}
//#endif

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
