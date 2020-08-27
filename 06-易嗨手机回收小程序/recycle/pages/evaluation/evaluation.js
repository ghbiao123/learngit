// pages/evaluation/evaluation.js
let util = require("../../utils/util");
let that;
let result;
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
    result = {};

    let list = ["a1","a2","a3","a4"];

    let arrList = new Array(10).fill(list);
    
    this.setData({
      arrList
    });

  },
  radioChange(e){
    let val = e.detail.value;
    let id = e.currentTarget.dataset.id;
    let len = this.data.arrList.length;
    result[id] = val;

    let _len = Object.keys(result).length;

    console.log(result);

    let progress = util.getToPersent(_len/len);
   
    this.setData({progress});

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