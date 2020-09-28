// pages/evaluation/result.js
let that;
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected:1,
    timeSelected:["10:00", "14:00", "14:00", "14:00", "14:00",],
    pageOption: {},
    price: 0,
    totalPrice: 0,
    couponPrice: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    this.data.pageOption = options;
  },
  // init()
  init(){

    let data = this.data.pageOption;

    wx.setNavigationBarTitle({
      title: data.name,
    });


    let coupon = wx.getStorageSync('coupon');

    this.data.couponPrice = 0;
    this.data.price = Number(data.price);
    this.data.totalPrice = this.data.couponPrice + this.data.price;



    this.setData({
      price: this.data.price,
      totalPrice: this.data.totalPrice,
      couponPrice: this.data.couponPrice,
    });

  },
  // tab 点击事件, 切换回收类型
  getSelected(e){
    let selected = e.currentTarget.dataset.id;
    this.setData({
      selected
    });
  },
  // radios chang 事件
  radioChange(e){
    console.log(e.detail.value);
  },
  // 选择日期
  dateChange(e){
    let orderDate = e.detail.value;
    this.setData({orderDate});
  },
  // 选择时间
  timeChange(e){
    let orderTime = this.data.timeSelected[e.detail.value];
    this.setData({orderTime});
  },
  // 重新询价
  resetPrice(e){
    wx.navigateBack();
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
    // init data
    this.init();
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