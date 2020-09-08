// pages/qainput/qainput.js
let that;
let util = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrImage:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
  },

  // 选择图片
  addImage(){
    wx.chooseImage({
      count: 5,
      success(res){
        let rlt = res.tempFilePaths;
        let arrImage = that.data.arrImage;
        arrImage.push(...rlt);
        that.setData({
          arrImage
        });
      }
    });
  },
  // 删除所选图片
  deleteImage(e){
    let idx = e.currentTarget.dataset.id;
    let arrImage = this.data.arrImage;
    arrImage.splice(idx,1);
    this.setData({
      arrImage
    });
  },
  // 提交
  submit(e){
    let data = e.detail.data;
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