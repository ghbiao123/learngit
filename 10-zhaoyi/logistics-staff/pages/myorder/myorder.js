// pages/myorder/myorder.js
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
   that = this;

   let userInfo = wx.getStorageSync('userinfo');
    if(!userInfo){
      return util.showError('请您登录', function(){
        wx.navigateTo({
          url: '/pages/login/login',
        });
      });
    }

  },
  // 获取用户订单
  getOrderList(){
    let userid = wx.getStorageSync('userinfo').uid;
    // 已下单
    util.post('/api/Order/myuserorder', {userid}).then(res=>{
      that.setData({
        // toDealOrder: res
      });
    });
    // 已取件
    util.post('/api/Order/yizhifu', {userid}).then(res=>{
      that.setData({
        dealOrder: res
      })
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
    // 获取用户订单
   this.getOrderList();
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