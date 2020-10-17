// pages/recyclelist/recyclelist.js
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
    let isLogin = util.checkIsLogin.call(this);
    if(!isLogin){
      return util.showError('请您先登录', function(){
        wx.navigateTo({
          url: '/pages/login/login',
        });
      });
    }


    let userid = isLogin.uid;

    util.post('/api/order/userrAssessOrderList', {userid}).then(res=>{
      console.log(res);
      if(res.code == 1){
        let list = [];
        list = res.data.map(v=>{
          let t = util.getToday(v.createtime*1000);
          v.createtime = t.date + ' ' + t.time;
          return v;
        });
        that.setData({
          list: res.data
        });
      }
    });

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