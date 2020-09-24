// pages/orderdetail/orderdetail.js
let that;
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id:'',
    buttonText: '输入订单价格',
    showPrompt: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    this.data.order_id = options.id;

    // 获取订单详情
    this.getOrderDetail();
  },
  // 显示prompt
  showPrompt(){
    let showPrompt = !this.data.showPrompt;
    this.setData({
      showPrompt
    });
  },
  // 获取promptvalue
  getPromptValue(e){
    console.log(e.detail);
    let order = this.data.order;
    
    util.post('/api/Order/updateprice', {
      orderid: this.data.order_id,
      price: e.detail
    }).then(res=>{
      order.price = e.detail;
      this.setData({
        order
      });
      util.showSuccess(res.msg);
    });
  },
  // 获取订单详情
  getOrderDetail(){
    util.post('/api/Order/orderde', {orderid: this.data.order_id}).then(res=>{
      console.log(res);
      that.setData({
        order: res
      });
      wx.stopPullDownRefresh();
    });
  },
  // 复制单号
  cutText(e){
    let id = e.currentTarget.dataset.id;
    wx.setClipboardData({
      data: id,
      success(res){
        util.showSuccess('复制成功');
      }
    })
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
    // 获取订单详情
    this.getOrderDetail();
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