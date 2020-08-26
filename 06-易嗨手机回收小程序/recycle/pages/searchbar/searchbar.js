// pages/searchbar/searchbar.js
import util from "../../utils/util";
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Storage:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    // 查询历史记录
    this.getStorageData();


  },

  // search confirm
  result(e){
    let key = e.detail;

    // 更新搜索历史记录
    this.addStorageData(key);

    // 请求数据
    this.getSearchResult(key);
  },
  // 根据input value请求内容
  getSearchResult(val){
    // 跳转另一个页面，呈现搜索结果
    wx.navigateTo({
      url: '/pages/searchresult/searchresult?key='+ val,
    });
    
  },
  /**
   * Stprage 查， 增， 清空
   *  
   */
  // 查询
  getStorageData(){
    let Storage = wx.getStorageSync('browsingHistory') || [];
    this.setData({
      Storage
    });
  },
  // 增加记录
  addStorageData(item){
    this.data.Storage.unshift(item);
    let Storage = this.data.Storage;
    Storage = Array.from(new Set(Storage));
    this.setData({Storage});
    wx.setStorage({
      data: Storage,
      key: 'browsingHistory',
    });
  },
  // 清空
  clearStorageData(){

    wx.showModal({
      title: '提示',
      content: '确认删除全部历史记录？',
      success(res){
        if(res.confirm){
          that.setData({
            Storage: []
          });
          wx.removeStorage({
            key: 'browsingHistory',
          });
        }
      }
    });

    
  },

  // 点击记录查询
  getItem(e){
    let key = e.currentTarget.dataset.key;
    this.getSearchResult(key);
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