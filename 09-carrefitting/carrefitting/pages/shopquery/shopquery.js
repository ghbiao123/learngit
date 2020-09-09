// pages/shopquery/shopquery.js
let that;
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    isSearch:false,
    isMore: true,
    keyword: '',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    // 获取门店列表
    this.getShopList();

  },
  // search
  search(e){
    if(!e.detail){
      this.data.isSearch = true;
      this.getShopList();
      return;
    }else{
      this.data.keyword = e.detail;
    }
    if(!this.data.isSearch){
      this.data.page = 1;
      this.data.list = []
    }
    let data = {
      keyword: this.data.keyword,
      page: this.data.page
    }
    util._post('/api/store/search', data).then(res=>{
      that.data.isSearch = true;
      that.data.isMore = res.has_more;
      let list = that.data.list;
      list.push(...res.data);
      that.setData({
        list
      });
    });
  },
  // 获取门店列表
  getShopList(){
    if(this.data.isSearch){
      this.data.page = 1
      this.data.list = []
    }
    util._post('/api/store/list',{page: this.data.page}).then(res=>{
      that.data.isMore = res.has_more;
      that.data.isSearch = false;
      let list = that.data.list;
      console.log(list);
      list.push(...res.data);
      that.setData({
        list
      });
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
    if(!this.data.isMore){
      return util.showSuccess('已加载所有门店');
    }
    this.data.page++;
    if(this.data.isSearch){
      this.search()
    }else{
      this.getShopList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})