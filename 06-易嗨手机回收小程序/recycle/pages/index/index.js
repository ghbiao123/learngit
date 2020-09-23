let util = require("../../utils/util");
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:["手机", "平板", "电脑", "摄影摄像", "其他产品",]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    let a = wx.getSystemInfo({
      success: (result) => {
        console.log(result);
      },
    });

    // init
    this.initData();
  },

  // 初始化数据
  initData(){
    util.post('/api/index/indexContent').then(res=>{
      res.data.banner = util.getImageFullUrl(res.data.banner, 'picture').map(v=>v.picture);
      res.data.category = util.getImageFullUrl(res.data.category, 'image');
      res.data.hotmodel = util.getImageFullUrl(res.data.hotmodel, 'image');
      that.setData({
        init: res.data
      });
    });
  },

  // 跳转加价券页面
  receiveCoupon(){
    wx.navigateTo({
      url: '/pages/coupon/coupon',
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