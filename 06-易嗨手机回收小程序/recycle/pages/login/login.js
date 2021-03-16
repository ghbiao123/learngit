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
  },
  getUserInfo(e){
    let that = this;
    e.detail.agentid = this.data.agentid ? this.data.agentid : 0;
    util.getUserInfo(e, function(res){
      if(res.code == 1){
        let msg = res.data.couponmsg || "登录成功";
        util.showSuccess( msg, function(){
          if(that.data.agentid){
            wx.reLaunch({
              url: '/pages/index/index',
            });
          }else{
            wx.navigateBack({
              delta: 1,
              fail(err){
                wx.reLaunch({
                  url: '/pages/index/index',
                });
              }
            });
          }
        });
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