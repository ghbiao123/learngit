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