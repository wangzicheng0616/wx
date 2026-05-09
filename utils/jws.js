// jwx.js
//#ifdef H5
import api from '../common/api.js'
import global from './global.js'
const jweixin = require('jweixin-module')
//#endif
export function configWeiXin(callback) {
	const paramsInfo = {dt: encodeURIComponent(window.location.href)};
	api.user.getScanDataInfo(paramsInfo).then(result => {
		let apiList = [ 
			'updateAppMessageShareData',
			'updateTimelineShareData',
			'hideOptionMenu',
			'showOptionMenu',
			'chooseWXPay',
			'checkJsApi',
			'openLocation',
			'getLocation',
			'scanQRCode'
		];
		let info = {
			debug: false, // 调试，发布的时候改为false
			appId: global.officialAccountsAppid,
			nonceStr: result.data.nonceStr,
			timestamp: result.data.timestamp,
			signature: result.data.signature,
			jsApiList: apiList
		};
		jweixin.config(info);
		jweixin.error(err => {
			console.error('config fail:', err);
		});

		jweixin.ready(res => {
			if (callback) callback(jweixin);
		});
	}).catch()
}

