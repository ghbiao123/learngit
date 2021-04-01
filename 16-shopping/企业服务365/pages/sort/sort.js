// pages/sort/sort.js
let util = require("../../utils/util");
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabTitle: [  
      // {name: '全部', id: ''},
    ],
    selected: [true, true, true],  // true 降序， false 升序
    goodsList: {
      list: [],
      reqData: {
        cid: 'all',
        keywords: '',
        sortkey: 's1', //s1：默认；s2:销量；s3:价格
        sortvalue: '1', //1：降序；2：升序
        page: 1,
      },
      isMore: true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    this.init();
  },

  init(){
    // 获取商品分类
    util.post("/api/goodsinfo/goodsCategory").then(res=>{
      console.log(res);
      let tabTitle = res.data.map(v=>{
        return {
          id: v.id,
          name: v.category_name
        }
      });
      that.setData({
        tabTitle
      });
    });

    // 获取商品列表
    this.getGoodsList();
    
  },
  
  // 获取商品列表
  getGoodsList(){
    let goodsList = this.data.goodsList;
    if(!goodsList.isMore){
      return util.showSuccess('已加载所有商品');
    }
    util.post("/api/goodsinfo/goodsList", goodsList.reqData).then(res=>{
      if(res.data.current_page == res.data.last_page){
        goodsList.isMore = false;
      }else{
        goodsList.reqData.page++;
      }
      console.log(res);
      goodsList.list.push(...res.data.data);

      that.setData({
        goodsList
      });

    });

  },

  // getTabId
  getTabId(e){
    console.log(e.detail);
    this.data.goodsList = {
      list: [],
      reqData: {
        cid: e.detail.id,
        keywords: '',
        sortkey: 's1', //s1：默认；s2:销量；s3:价格
        sortvalue: '1', //1：降序；2：升序
        page: 1,
      },
      isMore: true
    }

    this.getGoodsList();

    let selected = [true, true, true];
    this.setData({
      selected
    });
  },

  // getTap sort
  getTap(e){
    let idx = e.currentTarget.dataset.idx;
    let oldSelectedVal = this.data.selected[idx];
    let selected = [true, true, true];
    selected[idx] = !oldSelectedVal;
    let sortKey = ['s1', 's2', 's3'];
    this.data.goodsList.list = [];
    this.data.goodsList.isMore = true;
    this.data.goodsList.reqData.page = 1;
    this.data.goodsList.reqData.sortkey = sortKey[idx];
    this.data.goodsList.reqData.sortvalue = selected[idx] ? 1 : 2;

    

    this.getGoodsList();

    // if(selected[idx]){
    //   // 降序
    // }else{
    //   // 升序
    // }

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
    this.getGoodsList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})