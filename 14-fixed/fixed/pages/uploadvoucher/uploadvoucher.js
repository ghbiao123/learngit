// pages/uploadvoucher/uploadvoucher.js
let that;
let util = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reqData: {
      voucherimages: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    Object.assign(this.data.reqData, options);

    console.log(this.data.reqData);

  },

  // submit
  submit(){
    console.log(this.data.reqData);

    if(that.data.reqData.voucherimages.length == 0) return util.showSuccess("请选择图片");

    util.post("/api/orders/uploadPayVoucher", this.data.reqData).then(res=>{
      console.log(res);
      if(res.code == 2001){
        util.showSuccess(res.msg, function(){
          wx.navigateBack({
            delta: 1,
          });
        });
      }
    });

  },

  // add image
  addImage() {
    // let count = 8 - this.data.reqData.voucherimages.length;
    // if (count <= 0) {
    //   util.showSuccess("最多上传8张图片");
    //   return;
    // }
    wx.chooseImage({
      count: 9,
      success(res) {
        let arr = res.tempFilePaths;
        arr.forEach(v => {
          wx.uploadFile({
            filePath: v,
            name: 'image',
            url: util.getSiteRoot() + "/index.php/api/personal/upload",
            success(ret) {
              let reqData = that.data.reqData;
              if (reqData.voucherimages.length >= 8) {
                return
              }
              let url = util.getSiteRoot() + JSON.parse(ret.data).data.replace(/\\/g, "/");
              reqData.voucherimages.push(url);
              that.setData({
                reqData
              });
            }
          });
        });
      }
    });

  },

  // delete image
  deleteImage(e) {
    let idx = e.currentTarget.dataset.idx;

    let reqData = this.data.reqData;
    reqData.voucherimages.splice(idx, 1);

    that.setData({
      reqData
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