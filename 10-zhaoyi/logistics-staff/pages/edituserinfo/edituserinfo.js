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
    let userinfo = wx.getStorageSync('userinfo');
    let data = e.detail.value;

    for(let key in data){
      if(!data[key]){
        return util.showSuccess('请完善您的信息');
      }
      if(key == 'phone'){
        let reg = /^1[3-9]\d{9}$/;
        if(!reg.test(data[key])){
          return util.showSuccess('请输入正确的手机号')
        }
      }
    }

    data.userid = userinfo.uid;
    util.post('/api/Order/updateuser', data).then(res=>{

      userinfo.name = data.name;
      userinfo.phone = data.phone;
      userinfo.states = 1;
      wx.setStorage({
        data: userinfo,
        key: 'userinfo',
      });

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