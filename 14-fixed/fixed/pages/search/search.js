// pages/search/search.js
let that;
let util = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lv1Id: 0,
    lv2Id: 0,
    contCurrent: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    this.data.pageOption = options;


    // init()
    this.init();
  },

  // init()
  init(){
    
    // 初始化内容高度
    this.calculateHeight();

    // 查询一级分类
    this.lv1();

  },
  // 计算主要内容高度
  calculateHeight(){

    let windowHeight = wx.getSystemInfoSync().windowHeight;
    let query = wx.createSelectorQuery();
    query.select(".searchbar").boundingClientRect();
    query.exec(res=>{
      let contHeight = windowHeight - res[0].height;
      let newQuery = wx.createSelectorQuery();
      newQuery.select(".tab-box").boundingClientRect();
      newQuery.exec(ret=>{
        let contScrollHeight = contHeight - ret[0].height -10;
        that.setData({
          contHeight,
          contScrollHeight
        });
      });
    });

  },

  // 查询一级分类
  lv1(){
    util.post("/api/shou_ye/getFirsLevel").then(res=>{

      that.lv2(this.data.pageOption.lv1id || res.data[0].id);

      that.setData({
        arrLv1: res.data
      });

    });
  },
  // 查询二级分类
  lv2(id){
    util.post("/api/shou_ye/getservers",{levelone_id: id}).then(res=>{
      
      let arrLv2 = res.data.leveltwo;
      let arrLv3 = res.data.levelthree.map(val=>{
        val.server_arr = util.getImageFullUrl(val.server_arr, "xmimage");
        return val;
      });

      let lv1Id = id;
      let lv2Id = arrLv2[0] ? arrLv2[0].id : 1;

      that.setData({
        lv1Id,
        lv2Id,
        arrLv2,
        arrLv3
      });
    
    });
  },

  // 点击一级分类
  getLv1(e){
    let lv1Id = e.currentTarget.dataset.id;

    this.lv2(lv1Id);

    that.setData({
      lv1Id
    });

  },

  // 点击二级分类
  getLv2(e){
    let lv2Id = e.currentTarget.dataset.id;
    let contCurrent = e.currentTarget.dataset.idx;

    this.setData({
      lv2Id,
      contCurrent,
    });

  },

  // 点击三级分类
  getLv3(e){
    let idx = e.currentTarget.dataset.idx;
    let data = this.data.arrLv3[this.data.contCurrent].server_arr[idx];
    let url = `/pages/projectdetail/projectdetail?lv1id=${data.levelone_id}&lv2id=${data.leveltwo_id}&lv3id=${data.id}`;
    wx.navigateTo({
      url,
    });
  },

  // cont swiper change
  contSwiperChange(e){

    this.data.contCurrent = e.detail.current;

    let lv2Id = this.data.arrLv2[e.detail.current].id;

    that.setData({
      lv2Id
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