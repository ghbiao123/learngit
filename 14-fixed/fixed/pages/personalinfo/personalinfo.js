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

      that.setData({
        detail: res.data
      });

      wx.setStorage({
        data: res.data,
        key: 'userinfo',
        success(){
          wx.stopPullDownRefresh({
            success: (res) => {},
          });
        }
      });

    });
  },

  // logOut
  logOut(e){
    wx.removeStorage({
      key: 'userinfo',
      success(){
        util.showSuccess("已退出登录", function(){
          wx.navigateBack({
            delta: 1,
          });
        });
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
    this.init();
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