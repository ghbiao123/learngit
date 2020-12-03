// pages/staffinfo/staffinfo.js
let util = require('../../utils/util');
let that;
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

    this.init();
  },
  // 初始化数据
  init(){
    //工作人员id
    let staffid = wx.getStorageSync('staffid');
    // 获取工作人员二维码
    util.post('/api/user/getStaffInfo', {staffid}).then(res=>{
      console.log(res);
      res.data.avatar = util.getImageFullUrl(res.data.avatar);
      res.data.qrcode_path = util.getImageFullUrl(res.data.qrcode_path);
      wx.setStorage({
        data: res.data,
        key: 'staffinfo',
      });
      that.setData({
        staffInfo: res.data
      });
    });
    

  },
  // 展示二维码
  previewImage(){
    wx.previewImage({
      current: that.data.staffInfo.qrcode_path,
      urls: [that.data.staffInfo.qrcode_path],
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
    // 工作人员订单
    let staffid = wx.getStorageSync('staffid');
    // 待处理订单
    util.post('/api/order/staffOrderList', {
      orderstatus: 0,
      staffid
    }).then(res=>{
      that.setData({
        count: res.data.length
      });
    });

    // 待估价订单
    util.post("/api/order/assessOrderList", {
      staffid
    }).then(res=>{
      that.setData({
        evaluationCount: res.data.length
      });
    });

    // 已验机订单
    util.post('/api/order/staffOrderList', {
      orderstatus: 1,
      staffid
    }).then(res=>{
      that.setData({
        checkedCount: res.data.length
      });
    });

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