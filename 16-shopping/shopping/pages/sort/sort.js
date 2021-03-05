// pages/sort/sort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabTitle: [
      {name: '全部', id: ''},
      {name: '生鲜', id: ''},
      {name: '熟食', id: ''},
      {name: '酒水', id: ''},
      {name: '奶茶果汁', id: ''},
      {name: '面包蛋奶', id: ''},
    ],
    selected: [true, true, true]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  init(){

  },

  // getTabId
  getTabId(e){
    console.log(e.detail);
  },

  // getTap sort
  getTap(e){
    let idx = e.currentTarget.dataset.idx;
    let selected = [...this.data.selected];
    selected[idx] = !selected[idx];

    if(selected[idx]){
      // 降序
    }else{
      // 升序
    }

    this.setData({
      selected
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