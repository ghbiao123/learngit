// pages/mine/mine.js
let that;
let util = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
  },
  // 跳转我的订单页
  getMyOrder() {
    if(!this.data.isLogin){
      return util.showError('请您先登录');
    }
    wx.navigateTo({
      url: '/pages/myorder/myorder',
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
    return;
    let a = util.checkIsLogin.call(this);
    if (!a) {
      return util.showError('请您先登录');
    }
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