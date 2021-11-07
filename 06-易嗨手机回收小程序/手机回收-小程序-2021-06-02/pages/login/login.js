// pages/login/login.js
let that;
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let lunchOption = wx.getLaunchOptionsSync();
    this.data.agentid = lunchOption.query.agentid;

    let scene = lunchOption.scene + "";
    if (['1011', '1012', '1013', '1025', '1031', '1032', '1047', '1048', '1049', '1124', '1125', '1126'].includes(scene)) {
      // util.showSuccess(scene);
      wx.setStorage({
        data: lunchOption.query.agentid,
        key: 'agentid',
        complete() {
          wx.switchTab({
            url: '/pages/index/index',
          });
        }
      });
    }
    // 重定义scene
    wx.getLaunchOptionsSync().scene = 1000;

  },
  getUserInfo(e) {
    let that = this;
    this.data.agentid = wx.getStorageSync('agentid') || 0;
    e.detail.agentid = this.data.agentid ? this.data.agentid : 0;
    util.getUserInfo(e, function (res) {
      if (res.code == 1) {
        let msg = res.data.couponmsg || "登录成功";
        wx.removeStorage({  key: 'agentid',});
        util.showSuccess(msg, function () {
          if (that.data.agentid) {
            wx.reLaunch({
              url: '/pages/index/index',
            });
          } else {
            wx.navigateBack({
              delta: 1,
              fail(err) {
                wx.reLaunch({
                  url: '/pages/index/index',
                });
              }
            });
          }
        });
      }else{
        util.showSuccess(res.msg);
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