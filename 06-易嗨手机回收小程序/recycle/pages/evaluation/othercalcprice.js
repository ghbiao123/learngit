// pages/evaluation/othercalcprice.js
let that;
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: [],
    reqImageUrl: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    
  },
  // 删除图片
  cancelImage(e) {
    let id = e.currentTarget.dataset.idx;
    let imageUrl = this.data.imageUrl;
    imageUrl.splice(id, 1);
    this.data.reqImageUrl.splice(id, 1);
    this.setData({
      imageUrl
    });
  },
  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 9,
      success(res) {
        let path = res.tempFilePaths;
        let imageUrl = that.data.imageUrl;
        imageUrl.push(...path);
        path.forEach(v => {

          wx.uploadFile({
            filePath: v,
            name: 'file',
            url: util.getSiteRoot() + '/api/common/upload',
            success(ret) {
              console.log(ret);
              let url = JSON.parse(ret.data).data.url;
              that.data.reqImageUrl.push(url);
            }
          });

        });
        that.setData({
          imageUrl
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