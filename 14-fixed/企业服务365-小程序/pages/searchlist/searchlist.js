// pages/searchlist/searchlist.js
let that;
let util = require("../../utils/util");
let app = getApp();
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

  },
  getKeyWords(e){
    util.post("/api/shou_ye/searchItem", {
      name: e.detail
    }).then(res=>{
      that.setData({
        list: res.data
      });
    });
  },
  create(e){
    let idx = e.currentTarget.dataset.idx;
    let data = this.data.list[idx];
    app.globalData.createOrderId = {
      lv1id: data.levelone_id,
      lv2id: data.leveltwo_id,
      lv3id: data.id,
    }
    wx.switchTab({
      url: '/pages/createorder/createorder',
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