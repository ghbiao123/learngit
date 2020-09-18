// pages/mine/mine.js
let that;
let util = require("../../utils/util");
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
  },
  // login
  getUserInfo(e){
    let userInfo = e.detail.userInfo;
    util.getUserInfo(e, function(res){
      console.log(res);
      if(res.code==1){
        util.showSuccess(res.msg);
        userInfo.uid = res.userid;
        wx.setStorage({
          data: userInfo,
          key: 'userinfo',
        });
        that.setData({
          isLogin: true,
          userInfo
        });
      }
    });
  },
  // 跳转我的订单页
  getMyOrder() {
    if(!this.data.isLogin){
      return util.showError('请您先登录');
    }
    wx.navigateTo({
      url: '/pages/edituserinfo/edituserinfo',
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