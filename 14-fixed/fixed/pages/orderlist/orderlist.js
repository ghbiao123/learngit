// pages/orderlist/orderlist.js
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
    that = this;

    // init
    this.init();
  },

  // init
  init(){

    // calculate height
    this.calculateHeight();

  },

  // calculate height
  calculateHeight(){
    let sysHeight = wx.getSystemInfoSync().windowHeight;
    let query = wx.createSelectorQuery();
    query.select(".tab-box").boundingClientRect();
    query.exec(res=>{
      let contHeight = sysHeight - res[0].height;
      that.setData({
        contHeight
      });
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