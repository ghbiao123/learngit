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
    this.data.type = options.type;

    util.post("/api/order/orderDetail", {
      orderid: 42
    }).then(res=>{
      console.log(res);
    });

  },
  // 获取列表数据
  getList(){
    let type = this.data.type;
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
        data.orderstatus = "0,4";
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
      case 'staffdone': {
        title =  '已完成订单';
        identy = 2;
        url = '/api/order/staffOrderList';
        data.staffid = staffid;
        data.orderstatus = 2;
      }
      break;
      case 'staffcancel': {
        title =  '已取消订单';
        identy = 2;
        url = '/api/order/staffOrderList';
        data.staffid = staffid;
        data.orderstatus = 3;
      }
      break;
      default:{
        title = "全部";
        data.userid = userInfo.uid;
      }
    }

    util.post(url, data).then(res=>{
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
        v.total_amount = v.total_amount ? v.total_amount * 1: 0;
        v.coupon_fee = v.coupon_fee ? v.coupon_fee * 1: 0;
        v.estimate_fee = v.estimate_fee ? v.estimate_fee * 1: 0;
        v.stafforderinfo.change_fee = v.stafforderinfo.change_fee ? v.stafforderinfo.change_fee * 1: 0;
        v.stafforderinfo.coupon_fee = v.stafforderinfo.coupon_fee ? v.stafforderinfo.coupon_fee * 1: 0;
        v.stafforderinfo.estimate_fee = v.stafforderinfo.estimate_fee ? v.stafforderinfo.estimate_fee * 1: 0;
        v.stafforderinfo.total_amount = v.stafforderinfo.total_amount ? v.stafforderinfo.total_amount * 1: 0;
        
        if(v.model_info.image){
          v.model_info.image = util.getImageFullUrl(v.model_info.image);
        }else{
          v.model_info.image = '/images/contact.png';
        }
        return v;
      });
      that.setData({
        list
      });
    });
    
    wx.stopPullDownRefresh({
      success: (res) => {},
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
    this.getList();
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
    this.getList();
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