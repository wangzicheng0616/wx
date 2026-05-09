import global from "../utils/global"
import store from "@/store/index";
import {
	mapState
} from "vuex";
const baseUri = global.baseUri;
const appid = global.appid;
const r = (str, auth, noParameter) => {
	const query = str.split(' ');
	const method = query[0];
	let uri = query[1];
	if (!/^https:/gi.test(uri) && !/^http:/gi.test(uri)) {
		// uri = baseUri + uri;
		uri = uri.startsWith('http') ? uri : baseUri + uri;
	}
	const doRequest = (d) => {
		let data = d || Object.create(null);
		if (!noParameter) {
			// data = Object.assign({
			// 	appid: appid
			// }, data);
		}
		if (auth) {
			// data = Object.assign({
			// 	sessionId: store.state.user.sessionId
			// }, data);
		}
		if (method === 'GET') {
			data = Object.assign({
				__t: Math.floor(Math.random() * 1000000)
			}, data);
		}
		var token = '';
		try {
			token = uni.getStorageSync('token');
		} catch (e) {
			// error
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: uri,
				method: method,
				data: data,
				timeout: 60000,
				header: {
					// token: `${store.state.user.token}`
					token: token
				},
				success: (res) => {
					if (res.statusCode == 200) {
						if (res.data.code == 0 || res.data.code == -2000) {
							resolve(res.data);
						} else {
							// uni.hideLoading()
							if (res.data.code == -1000 ) {
								if(global.platform == 2||global.platform == 3){
									
								}else if(global.platform == 1){
									
								}else if(global.platform==0){
									store.commit("updateAuthorization", true);
								}
								
							}else{
								if(uri.indexOf('everydayVisitStatistics/saveInfo')==-1){
									uni.showToast({
										title: res.data.message || '系统异常,请稍后',
										icon: 'none',
										complete(){
											reject(res.data);
										}
									})
								}else{
									reject(res.data);
								}
							}
							console.error(uri);
							console.error(res.data.message || '系统异常,请稍后');
						}
					} else {
						uni.hideLoading()
						let msg = "Internal Server Error";
						switch (res.statusCode) {
							case 404:
								msg = `Api [${query[1]}] Not Found`;
								break;
							case 405:
								msg = "Request Method Not Allowed";
								break;
							case 401:
								store.commit("updateAuthorization", true);
								break;
							default:
								break;
						}
						console.error('123');
						reject(res);
					}
				},
				fail: (res) => {
					uni.hideLoading()
					let msg = "Internal Server Error";
					console.error(msg);
					reject(res);
				}
			});
		});
	};
	return doRequest;
}
const a = str => {
	return r(str, true);
}
const n = str => {
	return r(str, false, true);
}
export {
	r,
	a,
	n,
	appid
};
