//app.js

// 小程序配置文件
let siteinfo = require("./program.config");


App({

  /**
   * {
      "pagePath": "pages/evaluation/evaluation",
      "text": "估价",
      "iconPath": "/images/evaluation.png",
      "selectedIconPath": "/images/evaluation-s.png"
    },
   */

  // 全局变量

  globalData: {

  },


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