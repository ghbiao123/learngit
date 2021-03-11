let util = require("../../utils/util");
let that;
// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    this.init();

  },
  // 初始化
  init(){
    util.checkIsLogin.call(this);
  },
  // getUserInfo
  getUserInfo(e){
    util.getUserInfo(e, (res)=>{
      if(res.code == 1){
        // 登录成功
        let userInfo = e.detail.userInfo;
        userInfo.userid = res.data.code;
        wx.setStorage({
          data: userInfo,
          key: 'userinfo',
        });

        that.setData({
          isLogin: true,
          userInfo: userInfo
        });

        return util.showSuccess(res.msg);
      }else{
        return util.showSuccess(res.msg);
      }
      
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})