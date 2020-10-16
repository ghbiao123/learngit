// pages/cancel/cancel.js
let util = require('../../utils/util');
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

    this.data.options = options;

    this.init();
  },
  init(){
    util.post('/api/order/cancelReason').then(res=>{
      console.log(res);
      that.setData({
        arrChoice: res.data
      });
    });
  },
  // radioChange
  radioChange(e){
    this.data.options.reason = e.detail.value.join(',');
  },
  // 得出结果
  getResult(e){
    console.log(this.data.options);
    util.post('/api/order/cancelOrder', this.data.options).then(res=>{
      console.log(res);
      if(res.code == 1){
        util.showSuccess(res.msg, function(){
          wx.navigateBack({
            delta: 2
          });
        });
      }else{
        util.showError(res.msg);
      }
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