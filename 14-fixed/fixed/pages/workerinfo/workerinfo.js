// pages/personalinfo/personalinfo.js
let util = require("../../utils/util");
let that;
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
  // init
  init(){
    let userInfo = wx.getStorageSync('userinfo');
    let users_id = userInfo.id;
    util.post("/api/personal/getPersonalData", {users_id}).then(res=>{

      let detail = res.data;

      detail.certimages = detail.certimages ? detail.certimages.split(",") : '';
      detail.sfzimages = detail.sfzimages ? detail.sfzimages.split(",") : '';
      detail.cardimage = detail.cardimage ? detail.cardimage.split(",") : '';

      that.setData({
        detail
      });

    });
  },

   // 展示图片
   showImage(e){
    let key = e.currentTarget.dataset.key;
    let idx = e.currentTarget.dataset.idx;
    let arr = this.data.detail[key] || this.data.reqData[key];
    util.showImage(arr, idx);
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
    this.init();
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