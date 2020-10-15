// pages/stafforderlist/stafforderlist.js
let util = require('../../utils/util');
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identy: 1, // 1: 用户， 默认值， 2：工作人员
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    let type = options.type;
    this.getList(type);
  },
  // 获取列表数据
  getList(type){
    console.log(type);
    let staffid = wx.getStorageSync('staffid');
    let userInfo = wx.getStorageSync('userinfo');
    let title = '';
    let url = '/api/order/userOrderList';
    let identy = 1;
    let data = {};
    switch(type){
      case "staff":{
        title = "工作人员订单";
      }
      break;
      case "send":{
        title = "待验机";
        data.userid = userInfo.uid;
        data.orderstatus = 0;
      }
      break;
      case "check":{
        title = "待付款";
        data.userid = userInfo.uid;
        data.orderstatus = 1;
      }
      break;
      case "done":{
        title = "已完成";
        data.userid = userInfo.uid;
        data.orderstatus = 2;
      }
      break;
      case "cancel":{
        title = "已取消";
        data.userid = userInfo.uid;
        data.orderstatus = 3;
      }
      break;
      case 'todoor': {
        title = '待处理订单';
        identy = 2;
        url = '/api/order/staffOrderList';
        data.staffid = staffid;
        data.orderstatus = 0;
      }
      break;
      case 'dealwith' : {
        title =  '已验机订单';
        identy = 2;
        url = '/api/order/staffOrderList';
        data.staffid = staffid;
        data.orderstatus = 1;
      }
      break;
      default:{
        title = "全部";
        data.userid = userInfo.uid;
      }
    }

    util.post(url, data).then(res=>{
      console.log(res);
      if(res.data.length == 0){
        return util.showSuccess(res.msg, function(){
          wx.navigateBack({
            delta: 1,
          });
        });
      }
      let list = res.data.map(v=>{
        let t = util.getToday(v.createtime * 1000);
        v.createtime = t.date + ' ' + t.time;
        return v;
      });
      that.setData({
        list
      });
    });
    

    this.setData({
      identy
    });
    wx.setNavigationBarTitle({
      title: title,
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