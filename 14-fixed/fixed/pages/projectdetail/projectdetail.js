// pages/projectdetail/projectdetail.js
let that;
let util = require("../../utils/util");
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    siteUrl: util.getSiteRoot(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    this.data.pageOption = options;
    // 初始化数据
    this.init();
  },
  // init
  init(){
    let levelthree_id = this.data.pageOption.lv3id;
    util.post("/api/shou_ye/getServerDetail", {levelthree_id}).then(res=>{
      let detail = res.data;
      detail.xmimage = util.getImageFullUrl(detail.xmimage);
      that.setData({
        detail
      });
    });

  },
  // createOrder
  createOrder(){
    app.globalData.createOrderId = that.data.pageOption;
    console.log(app.globalData.createOrderId);
    wx.switchTab({
      url: `/pages/createorder/createorder`,
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