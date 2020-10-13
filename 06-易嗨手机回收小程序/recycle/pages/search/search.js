// pages/search/search.js
let that;
let util = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrTitle: [], // 页面tab标题， 页面vtab标题
    arrVtabTitle:[],
    arrContent: {}, // vtab item-》content
    reqData: {
      cid: 0,
      bid: 0
    },
    hotmodel: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    // 初始化data
    this.init(options.id);
  },
  // init data
  init(id) {
    util.post('/api/products/getEcategoryList').then(res => {
      let arrTitle = res.data;
      let _id = id? id:arrTitle[0].id;
      that.setData({
        arrTitle,
        selected: _id
      });
      // let _id = arrTitle[0].id;
      that.tabChange({detail: _id});
    });
  },
  // getVtabTitleId
  getVtabTitleId(e) {
    if(e.detail == 'hot'){
      this.setData({
        arrContent: that.data.hotmodel
      });
      return;
    }
    this.data.reqData.bid = e.detail;
    util.post('/api/products/getEmodelList', this.data.reqData).then(res => {
      let arrContent = util.getImageFullUrl(res.data, 'image');
      that.setData({
        arrContent
      });
    });

  },
  // tab component change, get current id
  tabChange(e) {
    let id = e.detail;
    console.log('tabChange:', id);
    that.data.reqData.cid = id;
    util.post('/api/products/getEbrandsList', {cid: id}).then(res => {

      let arrContent = util.getImageFullUrl(res.data.hotmodel, 'image');
      that.data.hotmodel = [...arrContent];

      res.data.brands.unshift({
              ebrands: {
                id: 'hot',
                name: "推荐"
              }
            });
      let a = res.data.brands;
      that.setData({
        arrContent,
        arrVtabTitle: res.data.brands,
        tabid: id,
      });
    });
  },
  // searchBar
  getKeywords(e){
    let keywords = e.detail;
    wx.navigateTo({
      url: '/pages/searchresult/searchresult?keywords=' + keywords,
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