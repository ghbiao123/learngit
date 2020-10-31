// pages/uploadimage/uploadimage.js
let that;
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: ['正面', '侧面', '背面'],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    this.init();

  },
  init(){
    let image = new Array(this.data.arr.length).fill(false);
    this.setData({
      image
    });
  },
  uploadImage(e){
    let idx = e.currentTarget.dataset.id;
    let image = [...that.data.image];

    wx.chooseImage({
      count: 1,
      success(res) {
        let path = res.tempFilePaths[0];
        console.log(path);
        wx.uploadFile({
          filePath: path,
          name: 'file',
          url: util.getSiteRoot() + '/api/common/upload',
          success(ret) {
            console.log(ret);
            let url = JSON.parse(ret.data).data.url;
            // that.data.image[idx] = url;
            image[idx] = util.getSiteRoot() + url;
            that.setData({
              image
            });
          }
        });
        
      }
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