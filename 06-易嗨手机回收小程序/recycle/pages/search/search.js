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
      cid: 1,
      bid: 1
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
      arrTitle[0].name = '手机';
      arrTitle[1].name = '平板';
      arrTitle[2].name = '电脑';
      arrTitle[3].name = '相机';
      arrTitle[4].name = '其他';
      let _id = id? id:arrTitle[0].id;
      that.setData({
        arrTitle,
        selected: _id
      });
      // let _id = arrTitle[0].id;
      that.tabChange({detail: _id});
    });
  },
  // getIconid
  getIconid(e){
    console.log(e.detail);
    let data = {
      cateid: this.data.reqData.bid,
      bid: e.detail.bid
    }
    if(this.data._tabid == 4 || this.data._tabid == 5){
      wx.navigateTo({
        url: `/pages/otherlist/otherlist?cateid=${data.cateid}&bid=${data.bid}`,
      });
    }
    // if(this.data._tabid == 4){
    //   // 跳转估价页面
    //   wx.navigateTo({
    //     url: `/pages/cameraevaluation/evaluation?cateid=${data.cateid}&cid=4&bid=${data.bid}&name=${e.detail.name}`,
    //   });
    // }else if(this.data._tabid == 5){
    //   // 跳转列表页
    //   wx.navigateTo({
    //     url: `/pages/otherlist/otherlist?cateid=${data.cateid}&bid=${data.bid}`,
    //   });
    // }
  },
  // getVtabTitleId
  getVtabTitleId(e) {
    if(e.detail == 'hot'){
      this.setData({
        arrContent: that.data.hotmodel,
        isHot: true
      });
      return;
    }
    this.data.reqData.bid = e.detail;

    if(this.data.reqData.cid<=3){
      util.post('/api/products/getEmodelList', this.data.reqData).then(res => {
        let arrContent = util.getImageFullUrl(res.data, 'image');
        that.setData({
          arrContent,
          isHot: false
        });
      });
    }else if(this.data.reqData.cid == 4 || this.data.reqData.cid == 5){
      util.post('/api/products/getOtherBrandList', {
        cid: this.data.reqData.cid,
        cateid: this.data.reqData.bid
      }).then(res => {
        console.log(res)
        function addUrl(arr){
          if(!arr) return [];
          return arr = arr.map(v=>{
            v.ebrands.image = util.getSiteRoot() + v.ebrands.image;
            return v;
          });
         }
        let arrContent = addUrl(res.data);
        that.setData({
          arrContent,
          isHot: false
        });
      });
    }


  },
  // tab component change, get current id
  tabChange(e) {
    let id = e.detail;
    console.log('tabChange:', id);
    that.data.reqData.cid = id;
    if(id <= 3){
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
          tabid: 0,
          _tabid: id,
          isHot: true
        });
      });
    }else if(id == 4 || id == 5){
      util.post('/api/products/getOtherCateList', {cid: id}).then(res=>{
        console.log(res);
         function addUrl(arr){
          if(!arr) return [];
          return arr = arr.map(v=>{
            v.ebrands.image = util.getSiteRoot() + v.ebrands.image;
            return v;
          });
         }
        let arrContent = addUrl(res.data.brand);
        that.setData({
          arrContent,
          arrVtabTitle: res.data.cate,
          tabid: 0,
          _tabid: id,
          isHot: true
        });
      });
    }
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