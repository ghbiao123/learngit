// pages/otherlist/otherlist.js
let that;
let util = require('../../utils/util');
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
    
    this.data.pageOptions = options;

    this.init()
  },
  init(){
    util.post('/api/products/getOeModelList', this.data.pageOptions).then(res=>{
      console.log(res);
      let list = res.data;
      this.setData({
        list
      });
    });
  },
  getEvaluation(e){
    let idx = e.currentTarget.dataset.idx;
    let data = this.data.list[idx];
    wx.navigateTo({
      url: `/pages/cameraevaluation/evaluation?cateid=${data.oecid || data.pcateid}&mid=${data.id}&cid=${data.cid}&bid=${data.bid}&name=${data.name}`,
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