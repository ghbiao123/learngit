// pages/paymentchecking/paymentchecking.js
let that;
let util = require("../../utils/util");
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
    this.data.pageOption = options;

    this.init();
  },
  init(){

    let method = this.data.pageOption.method;
    console.log(method);

    let navigativeTitle = {
      wechat: '微信支付',
      union: '银联支付'
    }

    let title = navigativeTitle[method];
    wx.setNavigationBarTitle({
      title
    });

    this.setData({
      method
    });

  },
  // 确认收款
  confirmPayment(){

  },
  // 提交银联表单
  submit(e){
    
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