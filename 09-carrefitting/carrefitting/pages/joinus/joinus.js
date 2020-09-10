// pages/joinus/joinus.js
let that;
let util = require("../../utils/util");
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
  },
  // 提交按钮事件
  submit(e){
    let data = e.detail.value;
    let needData = {
      name: '姓名',
      phone: '电话号码'
    }
    for(let key in needData){
      if(!data[key]){
        util.showSuccess(`${needData[key]}不能为空`);
        return
      }
    }
    util._post('/api/join/add', data).then(res=>{
      if(res.code == 0){
        that.setData({
          resetTxt:''
        });
      }
      util.showSuccess(res.msg);
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