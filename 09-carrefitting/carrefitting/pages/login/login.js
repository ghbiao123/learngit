// pages/login/login.js
let that;
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPwd: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
  },
  // 显示/隐藏密码
  showPwd(){
    let isPwd = !this.data.isPwd;
    this.setData({
      isPwd
    });
  },
  submit(e){
    let data = e.detail.value;
    let needData = {
      username: '账号',
      password: '密码',
    }
    for(let key in data){
      if(!data[key]){
        return util.showSuccess(needData[key]+'不能为空');
      }
    }
    util._post('/api/staff/login', data).then(res=>{
      if(res.code==0){
        wx.setStorage({
          data: res.uid,
          key: 'uid',
        })
        util.showSuccess(res.msg, function(){
          wx.navigateBack();
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