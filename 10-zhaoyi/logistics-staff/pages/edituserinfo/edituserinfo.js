// pages/edituserinfo/edituserinfo.js
let that;
let util = require('../../utils/util');
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
    util.checkIsLogin.call(this);
  },
  submit(e){
    let userid = wx.getStorageSync('userinfo').uid;
    let data = e.detail.value;

    for(let key in data){
      if(!data[key]){
        return util.showSuccess('请完善您的信息');
      }
    }

    data.userid = userid;
    util.post('/api/Order/updateuser', data).then(res=>{
      util.showSuccess(res.msg, function(){
        wx.navigateBack({
          delta: 1,
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