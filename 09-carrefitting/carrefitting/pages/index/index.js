//index.js
//获取应用实例
let that;
let util = require("../../utils/util");
const app = getApp()

Page({
  data: {
    
  },
  //事件处理函数
  
  onLoad: function () {
    that = this;

    // 获取banner
    this.getBannerList();
  },
  // 跳转查询页面
  getQuery(){
    let uid = wx.getStorageSync('uid');
    if(uid){
      wx.navigateTo({
        url: '/pages/qainput/qainput',
      })
    }else{
      wx.navigateTo({
        url: '/pages/login/login?from=qainput',
      });
    }
  },
  // 获取首页banner图
  getBannerList(){
    util._post("/api/banner/list").then(res=>{
      that.setData({
        bannerList: res
      });
    });
  },

  onShareAppMessage: function () {

  }
  
})
