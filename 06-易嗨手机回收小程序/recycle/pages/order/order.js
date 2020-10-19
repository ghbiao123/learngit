// pages/order/order.js
let that;
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
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

    // 获取订单列表
    this.init();
  },
  // 获取订单列表
  init(){
    let userInfo = wx.getStorageSync('userinfo');
    if(!userInfo){
      return
    }
    let userid = userInfo.uid;
    // orderstatus
    let data = {
      userid,
      // orderstatus: 0
    };
    util.post('/api/order/userOrderList', data).then(res=>{
      console.log(res);
      if(res.code == 1){
        let list = [];
        list = res.data.map(v=>{
          let t = util.getToday(v.createtime*1000);
          v.createtime = t.date + ' ' + t.time;
          if(v.model_info.image){
            v.model_info.image = util.getImageFullUrl(v.model_info.image);
          }else{
            v.model_info.image = '/images/contact.png';
          }
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