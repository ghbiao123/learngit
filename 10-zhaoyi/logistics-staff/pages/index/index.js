// pages/myorder/myorder.js
let that;
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toDealOrder: [],
    dealOrder: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   that = this;


  },
  // 下拉刷新
  getPullDown(e){
    // 更新用户订单
    this.getOrderList();
  },
  // 获取用户订单
  getOrderList(){ 
    let userInfo = wx.getStorageSync('userinfo');
    if(!userInfo){
      return util.showSuccess('请你先登录');
    }
    if(userInfo.states==0){
      return util.showSuccess('请你完善个人信息');
    }
    let userid = userInfo.uid;
    // 平台派单， 未接单
    util.post('/api/Order/myorder', {userid}).then(res=>{
      that.setData({
        toDealOrder: res
      });
    });
    // 已取件
    util.post('/api/Order/qvjian', {userid}).then(res=>{
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