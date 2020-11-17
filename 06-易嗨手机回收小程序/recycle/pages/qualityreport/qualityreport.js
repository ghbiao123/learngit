// pages/qualityreport/qualityreport.js
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

  // data init
  init(){


    // 计算中间背景部分高度
    // 1.获取手机系统高度
    wx.getSystemInfo({
      success: async (result) => {
        let systemHeight = result.windowHeight;
        
        // 2.上部分背景高度
        let upHeight = await new Promise((resolve, reject)=>{
          let query = wx.createSelectorQuery();
          query.select(".head").boundingClientRect();
          query.exec(res=>{
            resolve(res[0].height);
          });
        });

        // 3.下部分背景高度
        let downHeight = await new Promise(resolve=>{
          let query = wx.createSelectorQuery();
          query.select(".bg-down").boundingClientRect();
          query.exec(res=>{
            resolve(res[0].height);
          });
        });
        // 4.middleHeight 中间可变化部分高度
        let middleHeight = (systemHeight - upHeight - downHeight) * 2;
        that.setData({
          middleHeight
        });

      },
    })


    

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