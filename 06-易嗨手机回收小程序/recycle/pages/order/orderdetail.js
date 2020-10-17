// pages/order/orderdetail.js
let that;
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyArr:["顺丰", "中通", "圆通", "申通", "韵达", ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    that = this;
    this.data.pageOption = options;
    this.init();
  },
  copyText(e){
    let text = e.currentTarget.dataset.text;
    wx.setClipboardData({
      data: text,
      success(res){
        console.log(res);
      }
    });
  },
  init(){

    util.post('/api/order/orderDetail', {orderid: this.data.pageOption.id}).then(res=>{
      console.log(res);
      if(res.code == 1){
        let detail = res.data;
        let t = util.getToday(detail.createtime*1000);
        detail.createtime = t.date + ' ' + t.time;
        detail.model_info.image = util.getImageFullUrl(detail.model_info.image);
        // detail.model_info.des = detail.model_info.des.join('；')
        that.setData({
          detail: res.data
        });
      }
    });

    util.post('/api/user/getPlatforminfo').then(res=>{
      that.setData({
        platform: res.data
      });
    });

  },
  // 确认订单
  confirmOrder(){
    let data = {};
    data.pno = this.data.expressNumber;
    data.orderid = this.data.detail.id;
    data.userid = wx.getStorageSync('userinfo').uid;
    if(!data.pno){
      return util.showSuccess('请填写快递单号');
    }
    util.post('/api/order/upPackageNo', data).then(res=>{
      console.log(res);
      if(res.code == 1){
        util.showSuccess(res.msg, function(){
          wx.navigateBack({
            delta: 1,
          });
        });
      }else{
        util.showError(res.msg);
      }
    });
  },
  // 快递单号输入
  expressNumberInput(e){
    this.data.expressNumber = e.detail.value;
  },
  // 取消订单
  cancelOrder(){
    let userInfo = wx.getStorageSync('userinfo');
    let uid = userInfo.uid;
    let orderId = this.data.detail.id;
    let url =`/pages/cancel/cancel?orderid=${orderId}&operator=1&operatorid=${uid}`
    wx.navigateTo({
      url: url,
    });
  },
  // 复制平台信息
  copy(){
    let platform = this.data.platform;
    let str = `${platform.contactperson},${platform.contactphone},${platform.contactaddress}`;
    wx.setClipboardData({
      data: str,
    });
  },
  companyChange(e){
    let company = this.data.companyArr[e.detail.value];
    this.setData({company});
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