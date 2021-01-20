// pages/otherlist/otherlist.js
let that;
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], // 当前品牌展示列表
    search: [], // 页面搜索结果列表
    result: [], // 页面展示列表
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
       
      that.data.list = res.data;
      this.setData({
        result: that.data.list
      });
    });
  },
  getInputText(e){
    let keywords = e.detail;
    if(!keywords.trim()) {
      let list = that.data.list;
      that.setData({
        result: list
      });
      return;
    };
    util.post('/api/products/searchEmodel', {
      keywords
    }).then(res => {
      // let arrRet = [...res.data];
      that.data.search = res.data.filter( v => {
        return v.cid == that.data.pageOptions.type && that.data.pageOptions.bid == that.data.pageOptions.bid
      });
       
      let result = that.data.search.length == 0 ? that.data.list : that.data.search;

      that.setData({
        result
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