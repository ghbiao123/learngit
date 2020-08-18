//app.js

// 小程序配置文件
let siteinfo = require("./program.config");


App({


  // 全局变量

  globalData: {

  },

  // api地址
  api_root: siteinfo.siteroot,


  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {

    this.updateManager();
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  //   显示成功提示框

  showSuccess(msg, callBack) {
    wx.showToast({
      title: msg,
      icon: "success",
      mask: true,
      duration: 2000,
      success() {
        callBack && (setTimeout(() => {
          callBack();
        }, 2000));
      }
    });
  },

  // 显示失败提示框

  showError(msg, callBack) {
    wx.showModal({
      title: "友情提示",
      content: msg,
      showCancel: false,
      success(res) {
        callBack && callBack();
      }
    });
  },

  // post 请求
  _post(url, data = {}) {

    let _this = this;

    wx.showLoading({
      title: '加载中',
      mask: true
    });

    return new Promise((resolve, reject) => {

      wx.request({
        url: url,
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: data,
        success(res) {

          if (res.statusCode !== 200) {
            _this.showError("您的网络出错啦");
            return;
          }

          resolve(res.data);


        },
        fail(err) {
          reject(err)
        },
        complete(ret) {
          wx.hideLoading();
        }
      });


    });

  },

  // 小程序主动更新

  updateManager() {

    if (!wx.canIUse('getUpdateManager')) {
      return
    }

    const updateManager = wx.getUpdateManager();

    // 检测是否有版本更新
    updateManager.onCheckForUpdate();

    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: "更新提示",
        content: "新版本已经准备好，即将重启应用",
        showCancel: false,
        success(res) {
          updateManager.applyUpdate();
        }
      });
    });

    updateManager.onUpdateFailed(() => {
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    });
  },

  // 微信授权登录, 未完成
  getUserInfo(e, callBack) {

    let _this = this;

    if (e.detail.errMsg !== "getUserInfo:ok") {
      wx.showToast({
        title: '登录失败请重试',
        icon: "none"
      });
      return;
    }


    wx.login({
      success(res) {
        let data = {
          code: res.code,
          userInfo: e.detail.rawData,
          encrypted_data: e.detail.encryptedData,
          iv: e.detail.iv,
        }
        _this._post("url", data).then(res=>{
          console.log(res);
        });
      }
    });


  },

  // 通过手机号获取验证码  未完成
  getSendCode(num){
    let _this = this;
    // 检测手机号
    if(!(/1[3-9]\d{9}$/.test(num))){
     wx.showToast({
       title: '手机号有误，请重试！',
       icon: 'none'
     });
     return;
   }
 
   let data = {
     phone: num
   }
   this._post("url",data).then(res=>{
    _this.showSuccess(res.msg);
   });
 },


  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
});