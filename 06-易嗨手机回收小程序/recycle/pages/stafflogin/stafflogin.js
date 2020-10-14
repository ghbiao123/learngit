// pages/stafflogin/stafflogin.js
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

  },
  submit(e){
    let data = e.detail.value;

    let needData = {
      account: '账号',
      password: '密码'
    }

    for(let key in needData){
      if(!data[key].trim()){
        return util.showSuccess(needData[key]+'不能为空');
      }
    }
    util.post('/api/login/loginByStaff', data).then(res=>{
      console.log(res);
      if(res.code == 1){
        util.showSuccess(res.msg, function(){
          wx.setStorage({
            data: res.data.staffid,
            key: 'staffid',
          });
          wx.reLaunch({
            url: '/pages/staffinfo/staffinfo',
          });
        });
      }else{
        util.showSuccess(res.msg);
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