// pages/search/search.js
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

    // init()
    this.init();
  },

  // init()
  init(){
    
    // 初始化内容高度
    this.calculateHeight();

  },
  // 计算主要内容高度
  calculateHeight(){

    let windowHeight = wx.getSystemInfoSync().windowHeight;
    let query = wx.createSelectorQuery();
    query.select(".searchbar").boundingClientRect();
    query.exec(res=>{
      let contHeight = windowHeight - res[0].height;
      let newQuery = wx.createSelectorQuery();
      newQuery.select(".tab-box").boundingClientRect();
      newQuery.exec(ret=>{
        let contScrollHeight = contHeight - ret[0].height -10;
        that.setData({
          contHeight,
          contScrollHeight
        });
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