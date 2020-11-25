// pages/orderinformation/orderinformation.js
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

    this.init();
  },
  // 初始化数据
  init(){
    wx.getStorage({
      key: 'currentResult',
      success(res){
        let data = res.data;
        data.endtime = data.endtime;
        data.ready = util.getImageFullUrl(data.ready, "picture");
        let time = parseInt(data.forecastTime);
        if(!time) {data.forecastTime = false;}
        that.setData({
          data
        });
      }
    });


  },
  // 查看订单
  getOrderList(){
    wx.switchTab({
      url: '/pages/order/order',
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