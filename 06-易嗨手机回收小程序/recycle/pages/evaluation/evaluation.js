// pages/evaluation/evaluation.js
let util = require("../../utils/util");
let that;
let result;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    progressData:{
      chose: 0,
      all: 10
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    result = {};

    let list = ["a1","a2","a3","a4"];

    let arrList = new Array(11).fill(list);

    let progressData = this.data.progressData;
    progressData.all = arrList.length;
    
    this.setData({
      arrList,
      progressData
    });

    // init 
    this.init();

  },
  init(){
    util.post('/api/order/getInquiryInfo', {mid: 3}).then(res=>{
      console.log(res);
    });
  },

  radioChange(e){
    let val = e.detail.value;
    let id = e.currentTarget.dataset.id;
    let len = this.data.arrList.length;
    result[id] = val;

    let _len = Object.keys(result).length;
    let progressData = this.data.progressData;
    progressData.chose = _len;
    progressData.all = len;


    let progress = util.getToPersent(_len/len);
   
    this.setData({
      progress,
      progressData
    });

  },
  // 跳转估价结果页
  getResult(e){
    let rlt = JSON.stringify(result);
    wx.navigateTo({
      url: '/pages/evaluation/result?result='+rlt,
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