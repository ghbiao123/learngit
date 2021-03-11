let util = require("../../utils/util");
let that;
// pages/notice/notice.js
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
    console.log(options);
    this.data.key = options.key;
    this.data.id = options.id;
    this.init();
  },

  init(){
    let pageData = {
      use: {title: '使用说明', url: "",},
      help: {title: '我的帮助', url: "",},
      lay: {title: '法律声明', url: "",},
      notice: {title: '公告', url: "/api/homeindex/noticeDetail"}
    }

    wx.setNavigationBarTitle({
      title: pageData[this.data.key].title,
    });

    let data = {};
    if(this.data.id){
      data.id = this.data.id
    }

    util.post(pageData[this.data.key].url, data).then(res=>{
      console.log(res);
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