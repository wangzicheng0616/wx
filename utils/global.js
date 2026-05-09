const ENV = {
	PROD: 1, // 生产环境
	UAT: 2, // 用户测试环境
	DEV: 3, // 开发环境
	SIT: 4, // 集成测试环境
}


const envType = 1;
const platform = 0; // 0.微信小程序 1.公众号 2本地浏览器开发 3App

var appid = '';
var baseUri = '';
var imageUri = '';
var path = '';
var officialAccountsAppid=''
var wexinLoadUrl='';
switch (envType) {
	case ENV.PROD:
		// appid = 'wx9c80e82e9f06e6b7'; //测试
		appid = 'wxb7f9d81efc3da823';
		baseUri = 'https://www.lvdou.net.cn/';
		imageUri = 'https://www.lvdou.net.cn/h5api/';
		path='h5api/api/v1/'
		officialAccountsAppid='wx9c80e82e9f06e6b7';
		wexinLoadUrl='https://www.lvdou.net.cn/h5';
		break

	case ENV.UAT:
		// appid = 'wxd4c60ea802127c65';
		appid = 'wx9c80e82e9f06e6b7';
		baseUri = 'http://jlsqh.com:8081/';
		imageUri = 'http://jlsqh.com:8081/h5api/';
		path='h5api/api/v1/'
		officialAccountsAppid='wx56c53aece8fa18c1';
		wexinLoadUrl='http://jlsqh.com:8081/h5';
		break

	case ENV.DEV:
		appid = 'wx9c80e82e9f06e6b7';
		// baseUri = 'http://3o43497m29.wicp.vip/';
		baseUri = 'http://192.168.2.125:8888/';
		// baseUri = 'http://192.168.2.129:8888/';
		imageUri = 'http://192.168.2.125:8888/';
		path='api/v1/'
		officialAccountsAppid='wx9c80e82e9f06e6b7';
		wexinLoadUrl='http://jianbo.jllxq.com/web';
		break
	case ENV.SIT:
		appid = 'wx9ad81b8a50c0ce66';	
		baseUri = 'https://dm-sitcd.faw.cn/';
		imageUri = 'http://miniapp-hqwd.faw.cn/h5api/';
		path='h5api/api/v1/'
		officialAccountsAppid='wxf24bb9e8a699b2f8';
		wexinLoadUrl='http://jianbo.jllxq.com/web';
		break

}
export default {
	appid,
	officialAccountsAppid,
	baseUri,
	imageUri,
	path,
	envType,
	platform,
	wexinLoadUrl
};
