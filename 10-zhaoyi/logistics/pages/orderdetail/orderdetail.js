// pages/orderdetail/orderdetail.js
let that;
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id:'',
    showToast: false
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
  // 支付
  payBill(){
    util.post('/api/order/payorder', {ordernumber: this.data.order.ordernum}).then(res=>{
      console.log(res);
      wx.requestPayment({
        nonceStr: res.nonceStr,
        package: res.package,
        paySign: res.paySign,
        timeStamp: res.timeStamp,
        signType: "MD5",
        success(){
          util.showSuccess('支付成功', function(){
            wx.navigateBack({
              delta: 1,
            });
          });
        },
        fail(err)
        {
        }
      })
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
        util.showSuccess('复制成功', function(){
          that.setData({
            showToast: true
          });
        });
      }
    })
  },
  // 保存照片到本地
  saveToLocal(e){
    let src = e.currentTarget.dataset.src;

    wx.saveImageToPhotosAlbum({
      filePath: src,
      success(res){
        console.log(res);
        util.showSuccess('保存成功', function(){
          that.toastCancel();
        });
      }
    });
  },
  // cancel
  toastCancel(){
    this.setData({
      showToast: false
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