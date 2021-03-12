// pages/goodsinfo/goodsinfo.js
let util = require("../../utils/util");
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doMain: util.getSiteRoot(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    this.data.id = options.id;
    console.log(this.data.id);
    this.init();
  },

  init(){
    util.post("/api/goodsinfo/goodsDetail", {
      id: this.data.id
    }).then(res=>{
      console.log(res);
      let detail = res.data;
      detail.goods_pictures = util.getSiteRoot() + detail.goods_pictures;
      that.setData({
        detail
      });
    });
  },
  placeOrder(){
    
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
    console.log('share');
  }
})