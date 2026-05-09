require('../../common/vendor.js');(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["sub-user/pages/user/cashWithDraw"],{

/***/ 196:
/*!******************************************************************************************************!*\
  !*** /Users/mima0000/Desktop/交接/绿豆-小程序端前端/main.js?{"page":"sub-user%2Fpages%2Fuser%2FcashWithDraw"} ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 30);
__webpack_require__(/*! @dcloudio/uni-stat/dist/uni-stat.es.js */ 31);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _cashWithDraw = _interopRequireDefault(__webpack_require__(/*! ./sub-user/pages/user/cashWithDraw.vue */ 197));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_cashWithDraw.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 197:
/*!*********************************************************************************!*\
  !*** /Users/mima0000/Desktop/交接/绿豆-小程序端前端/sub-user/pages/user/cashWithDraw.vue ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cashWithDraw_vue_vue_type_template_id_6cd54bed___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cashWithDraw.vue?vue&type=template&id=6cd54bed& */ 198);
/* harmony import */ var _cashWithDraw_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cashWithDraw.vue?vue&type=script&lang=js& */ 200);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _cashWithDraw_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _cashWithDraw_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 50);

var renderjs




/* normalize component */

var component = Object(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _cashWithDraw_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _cashWithDraw_vue_vue_type_template_id_6cd54bed___WEBPACK_IMPORTED_MODULE_0__["render"],
  _cashWithDraw_vue_vue_type_template_id_6cd54bed___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _cashWithDraw_vue_vue_type_template_id_6cd54bed___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "sub-user/pages/user/cashWithDraw.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 198:
/*!****************************************************************************************************************!*\
  !*** /Users/mima0000/Desktop/交接/绿豆-小程序端前端/sub-user/pages/user/cashWithDraw.vue?vue&type=template&id=6cd54bed& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cashWithDraw_vue_vue_type_template_id_6cd54bed___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./cashWithDraw.vue?vue&type=template&id=6cd54bed& */ 199);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cashWithDraw_vue_vue_type_template_id_6cd54bed___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cashWithDraw_vue_vue_type_template_id_6cd54bed___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cashWithDraw_vue_vue_type_template_id_6cd54bed___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cashWithDraw_vue_vue_type_template_id_6cd54bed___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 199:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/mima0000/Desktop/交接/绿豆-小程序端前端/sub-user/pages/user/cashWithDraw.vue?vue&type=template&id=6cd54bed& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 200:
/*!**********************************************************************************************************!*\
  !*** /Users/mima0000/Desktop/交接/绿豆-小程序端前端/sub-user/pages/user/cashWithDraw.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cashWithDraw_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./cashWithDraw.vue?vue&type=script&lang=js& */ 201);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cashWithDraw_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cashWithDraw_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cashWithDraw_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cashWithDraw_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cashWithDraw_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 201:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/mima0000/Desktop/交接/绿豆-小程序端前端/sub-user/pages/user/cashWithDraw.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _api = _interopRequireDefault(__webpack_require__(/*! @/common/api.js */ 41));
var _global = _interopRequireDefault(__webpack_require__(/*! @/utils/global.js */ 40));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  data: function data() {
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
      USER_WRITHDRAL_AMOUNT: ''
    };
  },
  onLoad: function onLoad(options) {
    var _this = this;
    _this.getWorkerInfo();
    _this.getGlobleInfo();
    _this.getWithdrawalAmount();
  },
  methods: {
    uploadImage: function uploadImage() {
      var _this = this;
      uni.chooseImage({
        count: 1,
        success: function success(res) {
          uni.showLoading({
            title: '加载中'
          });
          var tempFilePaths = res.tempFilePaths;
          uni.uploadFile({
            url: _global.default.baseUri + _global.default.path + 'upload/uploadPic',
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              'token': uni.getStorageSync("token")
            },
            formData: {
              'type': 3
            },
            success: function success(res) {
              var data = JSON.parse(res.data);
              if (data.code == 0) {
                _this.key1 = data.data;
                _this.$set(_this.bankaccount, 'key1', data.data);
                uni.hideLoading();
              } else {
                uni.showToast({
                  title: '上传图片失败',
                  icon: 'none'
                });
              }
            },
            fail: function fail() {
              uni.hideLoading();
              uni.showToast({
                title: '上传图片失败',
                icon: 'none'
              });
            }
          });
        }
      });
    },
    getWorkerInfo: function getWorkerInfo() {
      var _this2 = this;
      uni.showLoading({
        title: '加载中'
      });
      _api.default.worker.getInfo().then(function (res) {
        uni.hideLoading();
        if (res.data) {
          _this2.$store.commit("updateWorkerInfo", res.data);
          _this2.$set(_this2.bankaccount, 'name', res.data.identityName);
          _this2.$set(_this2.bankaccount, 'alipayaccount', res.data.payAlipay);
          _this2.$set(_this2.bankaccount, 'wechataccount', res.data.payWxpay);
          _this2.$set(_this2.bankaccount, 'account', res.data.payAccount);
          _this2.$set(_this2.bankaccount, 'bank', res.data.payBank);
          _this2.$set(_this2.bankaccount, 'bankaddress', res.data.payBankAddr);
        }
      }).catch(function (e) {
        uni.hideLoading();
      });
    },
    getGlobleInfo: function getGlobleInfo() {
      var _this3 = this;
      _api.default.globleSetting.getInfoByNumber({
        number: 'USER_WRITHDRAL_AMOUNT_RATE'
      }).then(function (res) {
        if (res.data) {
          _this3.USER_WRITHDRAL_AMOUNT_RATE = res.data.rateValue;
        }
      });
      _api.default.globleSetting.getInfoByNumber({
        number: 'USER_WRITHDRAL_AMOUNT'
      }).then(function (res) {
        if (res.data) {
          _this3.USER_WRITHDRAL_AMOUNT = res.data.rateValue;
        }
      });
    },
    submit: function submit() {
      var _this = this;
      if (_this.defaultCashMoney != 0) {
        if (_this.amount < _this.defaultCashMoney) {
          uni.showToast({
            title: '提现金额不能小于' + _this.defaultCashMoney + '元',
            icon: 'none'
          });
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
        });
        return;
      }
      if (amount <= 0) {
        uni.showToast({
          title: '请输入正确提现金额',
          icon: 'none'
        });
        return;
      }
      if (name == null || name == '' || name == "") {
        uni.showToast({
          title: '请输入开户姓名',
          icon: 'none'
        });
        return;
      }
      if (account == null || account == '' || account == "") {
        uni.showToast({
          title: '请输入银行账号',
          icon: 'none'
        });
        return;
      } else {
        if (account.length < 15 || account.length > 19) {
          uni.showToast({
            title: '请正确输入大于15位小于19位的银行账号',
            icon: 'none'
          });
          return;
        } else if (!isNumber.test(account)) {
          uni.showToast({
            title: '请正确输入银行账号',
            icon: 'none'
          });
          return;
        }
      }
      if (bank == null || bank == '' || bank == "") {
        uni.showToast({
          title: '请输入开户行',
          icon: 'none'
        });
        return;
      }
      if (bankaddress == null || bankaddress == '' || bankaddress == "") {
        uni.showToast({
          title: '请输入身份证ID',
          icon: 'none'
        });
        return;
      }
      uni.showLoading({
        title: '加载中'
      });
      _api.default.user.saveBalanceWithdraw({
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
      }).then(function (res) {
        uni.hideLoading();
        uni.navigateBack({
          delta: 1
        });
      }).catch(function (e) {});
    },
    getWithdrawalAmount: function getWithdrawalAmount() {
      var _this = this;
      uni.showLoading({
        title: '加载中'
      });
      _api.default.user.getWithdrawalAmount({
        number: 'WITHDRAWAL_AMOUNT'
      }).then(function (res) {
        if (res.data) {
          _this.defaultCashMoney = res.data.rateValue;
        }
        uni.hideLoading();
      }).catch(function (e) {});
    },
    oninput: function oninput() {
      this.amount = this.dealInputVal(this.amount);
    },
    dealInputVal: function dealInputVal(value) {
      value = value.replace(/^0*(0\.|[1-9])/, "$1");
      value = value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
      value = value.replace(/^\./g, ""); //验证第一个字符是数字而不是字符
      value = value.replace(/\.{1,}/g, "."); //只保留第一个.清除多余的
      value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      value = value.replace(/^(\-)*(\d*)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
      value = value.indexOf(".") > 0 ? value.split(".")[0].substring(0, 10) + "." + value.split(".")[1] : value.substring(0, 10);
      return value;
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ })

},[[196,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/sub-user/pages/user/cashWithDraw.js.map