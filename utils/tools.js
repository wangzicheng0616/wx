import global from "./global.js"
const tools = {
	defaultIntegralName: '积分',
	//数组删除
	arrayDel(array, n) {
		if (n < 0) {
			return array;
		} else {
			return array.slice(0, n).concat(array.slice(n + 1, array.length));
		}
	},
	//截取字符串变成小数点后两位
	toDecimal2(x) {
		var f = parseFloat(x);
		if (isNaN(f)) {
			return 0.00;
		}
		var f = Math.round(x * 100) / 100;
		var s = f.toString();
		var rs = s.indexOf('.');
		if (rs < 0) {
			rs = s.length;
			s += '.';
		}
		while (s.length <= rs + 2) {
			s += '0';
		}
		return s;
	},
	//获取图片地址
	getImagePath(imageUrl) {
		if (imageUrl == null) {
			return "";
		}
		const ph = imageUrl.toUpperCase().startsWith("HTTP") ? imageUrl : imageUrl.toUpperCase().startsWith(
			"DATA") ? imageUrl : global.imageUri + imageUrl;
		return ph;
	},
	formatPrice(value) {
		return parseFloat(isNaN(value) ? 0 : value).toFixed(2);
	},

	formatPrice0(value) {
		return parseFloat(isNaN(value) ? 0 : value).toFixed(2).split('.')[0];
	},

	formatPrice1(value) {
		return parseFloat(isNaN(value) ? 0 : value).toFixed(2).split('.')[1];
	},
	substrPhone(value) {
		if (value) {
			return value.substring(0, 3) + "****" + value.substring(7);
		} else {
			return value
		}
	},
	getNum(array) {
		var num = 0;
		for (var i = 0; i < array.length; i++) {
			num = num + array[i].goodsQty
		}
		return num;
	},
	isIos() {
		let u = navigator.userAgent.toLowerCase();
		if (/iphone|ipad|ipod/.test(u)) {
			return true
		} else {
			return false
		}
	},
	getCommentLength(length) {
		if (length == 0 || !length) {
			return ''
		} else if (length < 10000) {
			if (length > 0 && length < 100) {
				return length
			} else if (length >= 100 && length < 1000) {
				return Math.floor(parseFloat(length / 100)) + '00+'
			} else if (length >= 1000 && length < 10000) {
				return Math.floor(parseFloat(length / 1000)) + '000+'
			}
		} else {
			return Math.floor(parseFloat(length / 10000)) + '万+'
		}
	},
	formatName(name) {
		var newStr;
		if (name.length == 2) {
			newStr = name.substr(0, 1) + '*'
		} else if (name.length > 2) {
			var char = ''
			for (var i = 0, len = name.length - 2; i < len; i++) {
				char += '*';
			}
			newStr = name.substr(0, 1) + char + name.substr(-1, 1)
		} else {
			newStr = name
		}

		return newStr
	},
	miniCallBack(success,fail){
		try {
			var token = uni.getStorageSync('token');
			if(token){
				success()
			}else{
				fail();
			}
		} catch (e) {
			// error
			fail()
		}
	},
	getSceneObject(scene) {
		var obj = {};
		for (var i = 0; i < scene.split('*').length; i++) {
			var arr = scene.split('*')[i].split('/');
			obj[arr[0]] = arr[1];
		}
		return obj
	}
};
export {
	tools
}
