<template>
	<view>
		<view style="margin-top: 20px;" class="padding-10">
			<view class="font-size-18" style="color: #282828;font-weight: bold;text-align: center">提现金额</view>
			<view class="certification-item">
				<view class="item-input-wrap"
					style="display: flex; border: 1px solid rgba(0,0,0,0.05);margin: 10px 20px 10px 20px;border-radius: 6px;">
					<input style="outline: none;flex: 1;padding:6px 10px;" type="number" placeholder="请输入提现金额"
						v-model="amount" @input="oninput">
				</view>
				<view style="width: 100%;height: 4px;" class="btn-bg"></view>
			</view>
			<view class="certification-item padding-left-right-10">
				<view class="certification-item-title">
					开户姓名:
				</view>
				<view class="item-input-wrap">
					<input style="outline: none;width: 100%;padding:6px 0;" type="text" placeholder="请输入开户姓名"
						v-model="bankaccount.name">
				</view>
			</view>
			<view class="certification-item padding-left-right-10">
				<view class="certification-item-title">支付宝收款账号:</view>
				<view class="item-input-wrap">
					<input style="outline: none;width: 100%;padding:6px 0;" type="text" placeholder="请输入支付宝收款账号"
						v-model="bankaccount.alipayaccount">
				</view>
			</view>
			<view class="certification-item padding-left-right-10">
				<view class="certification-item-title">微信收款账号:</view>
				<view class="item-input-wrap">
					<input style="outline: none;width: 100%;padding:6px 0;" type="text" placeholder="请输入微信收款账号"
						v-model="bankaccount.wechataccount">
				</view>
			</view> 
			<view class="certification-item padding-left-right-10">
				<view class="certification-item-title">银行卡号:</view>
				<view class="item-input-wrap">
					<input style="outline: none;width: 100%;padding:6px 0;" type="number" placeholder="请输入银行卡号"
						v-model="bankaccount.account">
				</view>
			</view>

			<view class="certification-item padding-left-right-10">
				<view class="certification-item-title">所属银行:</view>
				<view class="item-input-wrap">
					<input style="outline: none;width: 100%;padding:6px 0;" type="text" placeholder="请输入所属银行"
						v-model="bankaccount.bank">
				</view>
			</view>

			<view class="certification-item padding-left-right-10">
				<view class="certification-item-title">开户行地址:</view>
				<view class="item-input-wrap">
					<input style="outline: none;width: 100%;padding:6px 0;" type="text" placeholder="请输入身份证号"
						v-model="bankaccount.bankaddress">
				</view>
			</view>
			<!-- <view class="certification-item padding-left-right-10">
				<view class="certification-item-title">收款码:</view>
				<view class="display-flex-column" @click="uploadImage()">
					<image class="border-radius-6" v-if="bankaccount.key1" :src='tools.getImagePath(bankaccount.key1)'
						style="width:100px;" mode="widthFix"></image>
					<image v-else :src="httpImageUrl+'/static/icon_camera.png'" style="width:68px;height: 68px;"></image>
				</view>
			</view> -->
			<!-- <view class="certification-item padding-left-right-10">
				<view class="certification-item-title">支付宝账号:</view>
				<view class="item-input-wrap">
					<input style="outline: none;width: 100%;padding:6px 0;" type="text" placeholder="请输入支付宝账号"
						v-model="bankaccount.alipayaccount">
				</view>
			</view>
			<view class="certification-item padding-left-right-10">
				<view class="certification-item-title">支付宝姓名:</view>
				<view class="item-input-wrap">
					<input style="outline: none;width: 100%;padding:6px 0;" type="text" placeholder="请输入支付宝姓名"
						v-model="bankaccount.alipayname">
				</view>
			</view>
			<view class="certification-item padding-left-right-10">
				<view class="certification-item-title">微信账号:</view>
				<view class="item-input-wrap">
					<input style="outline: none;width: 100%;padding:6px 0;" type="text" placeholder="请输入微信账号"
						v-model="bankaccount.wechataccount">
				</view>
			</view> -->
		</view>
		<view
			style="height: 40px;margin-top: 20px;margin-bottom: 20px;display: flex;align-items: center;justify-content: center;">
			<view class="font-size-16 btn-bg"
				style="width: 90%;height: 100%;display: flex;align-items: center;justify-content: center;color: white;border-radius: 20px;"
				@click="submit()">
				提交
			</view>
		</view>
		<view
			style="display: flex;align-items: center;justify-content: center;flex-direction: column;padding: 10px;margin-top: 10px;">
			<view class="font-size-12 line-height-20 font-family" style="color: red;font-weight: bold">
				《提现须知》
			</view>
			<view class="font-size-12 line-height-20 font-family cash-info" style="color: red;margin-bottom: 80px;">
				提现手续费按照提现金额的{{USER_WRITHDRAL_AMOUNT_RATE}}%收取服务费，单笔最低0.1元/笔。
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	import global from '@/utils/global.js'
	export default {
		data() {
			return {
				httpImageUrl: this.httpImageUrl,
				rightText: '',
				amount: '',
				bankaccount: {
					id: '',
					name: '',
					account: '',
					bank: '',
					bankaddress: '',
					alipayaccount: '',
					alipayname: '',
					wechataccount: '',
					weChatAccountName: '',
					status: 0,
					reason: '',
					idnumber: '',
					idname: '',
					idimage1: '',
					idimage2: '',
					idimage3: '',
					file1: '',
					file2: '',
					file3: '',
					carname: '',
					cardnumber: '',
					driverlicense: '',
					key1: '',
					defaultCashMoney: 100 //默认为100 提大于100元 如果请求回来的是0则代表随便提 大于0代表可提的 如果是负数则走默认
				},
				isAgree: 0,
				USER_WRITHDRAL_AMOUNT_RATE: '',
				USER_WRITHDRAL_AMOUNT: '',
			}
		},
		onLoad(options) {
			const _this = this;
			_this.getWorkerInfo();
			_this.getGlobleInfo();
			_this.getWithdrawalAmount();
		},
		methods: {
			uploadImage() {
				var _this = this;
				uni.chooseImage({
					count: 1,
					success(res) {
						uni.showLoading({
							title: '加载中'
						})
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: global.baseUri + global.path + 'upload/uploadPic',
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								'token': uni.getStorageSync("token"),
							},
							formData: {
								'type': 3
							},
							success(res) {
								var data = JSON.parse(res.data);
								if (data.code == 0) {
									_this.key1 = data.data
									_this.$set(_this.bankaccount,'key1',data.data)
									uni.hideLoading()
								} else {
									uni.showToast({
										title: '上传图片失败',
										icon: 'none'
									})
								}
							},
							fail() {
								uni.hideLoading()
								uni.showToast({
									title: '上传图片失败',
									icon: 'none'
								})
							}
						})
					}
				})
			},
			getWorkerInfo() {
				uni.showLoading({
					title: '加载中'
				})
				api.worker.getInfo().then(res => {
					uni.hideLoading()
					if (res.data) {
						this.$store.commit("updateWorkerInfo", res.data)
						this.$set(this.bankaccount,'name',res.data.identityName)
						this.$set(this.bankaccount,'alipayaccount',res.data.payAlipay)
						this.$set(this.bankaccount,'wechataccount',res.data.payWxpay)
						this.$set(this.bankaccount,'account',res.data.payAccount)
						this.$set(this.bankaccount,'bank',res.data.payBank)
						this.$set(this.bankaccount,'bankaddress',res.data.payBankAddr)
					}
				}).catch(e => {
					uni.hideLoading()
				})
			},
			getGlobleInfo() {
				api.globleSetting.getInfoByNumber({
					number: 'USER_WRITHDRAL_AMOUNT_RATE'
				}).then(res => {
					if (res.data) {
						this.USER_WRITHDRAL_AMOUNT_RATE = res.data.rateValue
					}
				})
				api.globleSetting.getInfoByNumber({
					number: 'USER_WRITHDRAL_AMOUNT'
				}).then(res => {
					if (res.data) {
						this.USER_WRITHDRAL_AMOUNT = res.data.rateValue
					}
				})
			},
			submit() {
				const _this = this;
				if (_this.defaultCashMoney != 0) {
					if (_this.amount < _this.defaultCashMoney) {
						uni.showToast({
							title: '提现金额不能小于' + _this.defaultCashMoney + '元',
							icon: 'none'
						})
						return;
					}
				}
				var amount = _this.amount;
				var name = _this.bankaccount.name;
				var account = _this.bankaccount.account;
				var bank = _this.bankaccount.bank;
				var bankaddress = _this.bankaccount.bankaddress;
				if (_this.bankaccount.alipayaccount) {
					var alipayaccount = _this.bankaccount.alipayaccount;
				} else {
					var alipayaccount = '-';
				}
				if (_this.bankaccount.alipayname) {
					var alipayname = _this.bankaccount.alipayname;
				} else {
					var alipayname = '-';
				}
				if (_this.bankaccount.wechataccount) {
					var wechataccount = _this.bankaccount.wechataccount;
				} else {
					var wechataccount = '-';
				}
				if (_this.bankaccount.weChatAccountName) {
					var weChatAccountName = _this.bankaccount.weChatAccountName;
				} else {
					var weChatAccountName = '-';
				}

				var isNumber = /^[+]{0,1}(\d+)$/;
				if (amount == null || amount == '' || amount == "") {
					uni.showToast({
						title: '请输入提现金额',
						icon: 'none'
					})
					return;
				}
				if (amount <= 0) {
					uni.showToast({
						title: '请输入正确提现金额',
						icon: 'none'
					})
					return;
				}
				if (name == null || name == '' || name == "") {
					uni.showToast({
						title: '请输入开户姓名',
						icon: 'none'
					})
					return;
				}
				if (account == null || account == '' || account == "") {
					uni.showToast({
						title: '请输入银行账号',
						icon: 'none'
					})
					return;
				} else {
					if (account.length < 15 || account.length > 19) {
						uni.showToast({
							title: '请正确输入大于15位小于19位的银行账号',
							icon: 'none'
						})
						return;
					} else if (!isNumber.test(account)) {
						uni.showToast({
							title: '请正确输入银行账号',
							icon: 'none'
						})
						return;
					}
				}
				if (bank == null || bank == '' || bank == "") {
					uni.showToast({
						title: '请输入开户行',
						icon: 'none'
					})
					return;
				}
				if (bankaddress == null || bankaddress == '' || bankaddress == "") {
					uni.showToast({
						title: '请输入身份证ID',
						icon: 'none'
					})
					return;
				}
				uni.showLoading({
					title: '加载中'
				})
				api.user.saveBalanceWithdraw({
					amount: amount,
					userRealName: name,
					bankAccount: account,
					bankName: bank,
					bankAddress: bankaddress,
					weChatAccount: wechataccount,
					weChatAccountName: weChatAccountName,
					aliPayAccount: alipayaccount,
					aliPayAccountName: alipayname,
					key5: this.bankaccount.key1
				}).then(res => {
					uni.hideLoading()
					uni.navigateBack({
						delta: 1
					})
				}).catch(e => {

				})
			},
			getWithdrawalAmount() {
				const _this = this;
				uni.showLoading({
					title: '加载中'
				})
				api.user.getWithdrawalAmount({
					number: 'WITHDRAWAL_AMOUNT'
				}).then(res => {
					if (res.data) {
						_this.defaultCashMoney = res.data.rateValue;
					}
					uni.hideLoading()
				}).catch(e => {})
			},
			oninput() {
				this.amount = this.dealInputVal(this.amount);
			},
			dealInputVal(value) {
				value = value.replace(/^0*(0\.|[1-9])/, "$1");
				value = value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				value = value.replace(/^\./g, ""); //验证第一个字符是数字而不是字符
				value = value.replace(/\.{1,}/g, "."); //只保留第一个.清除多余的
				value = value
					.replace(".", "$#$")
					.replace(/\./g, "")
					.replace("$#$", ".");
				value = value.replace(/^(\-)*(\d*)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
				value =
					value.indexOf(".") > 0 ?
					value.split(".")[0].substring(0, 10) + "." + value.split(".")[1] :
					value.substring(0, 10);
				return value;
			}
		}
	}
</script>

<style>
</style>