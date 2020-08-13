// pages/list/list.js
let that;
let mQuery = require("../../utils/mQuery");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList:["土地（工业）","土地（商业）","土地（住宅）","土地（物流）","住宅","商铺","写字楼","车库","厂房","酒店","机械设备","动产","其他"],
    isShowFilter:false,
    reqData:{},
    resData:{
      isLastPage: false,
      list: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    // 设置filter高度
    this.getFilterHeight();

    // 获取列表
    this.getDataList();
  },
  // 搜索确认
  searchConfirm(e){
    let address = e.detail.value;
    console.log(address);
    if(!address){
      wx.showToast({
        title: '请输入您想搜索的内容',
        icon: "none"
      });

      return;
    }

    this.data.reqData = {address};

    this.getDataList(this.data.reqData);

  },

  // 获取列表
  getDataList(data = {}){
    console.log(data);
    mQuery.getQuery("api/info/list", data).then(res=>{
      console.log(res);
      let list = res.data.data;

      that.setData({
        list
      });
      
    });
  },

  // filter 确认
  filterSubmit(e){
    console.log(e.detail.value);
    if(this.data.reqData.hasOwnProperty("address")){
      delete this.data.reqData.address
    }
    Object.assign(this.data.reqData, e.detail.value);

    this.getDataList(this.data.reqData);
  },
  // filter reset
  filterReset(e){
    console.log(e);
    let isTypeHidden = new Array(this.data.isTypeHidden.length).fill(false);
    this.setData({
      isTypeHidden
    });
  },

  // 获取详情
  getDetail(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    });
  },

  // 筛选中的类型选择
  typeSelected(e){
    let idx = e.currentTarget.dataset.value;
    let isTypeHidden = new Array(this.data.isTypeHidden.length).fill(false);
    isTypeHidden[idx] = !this.data.isTypeHidden[idx];

    this.data.reqData.cate = isTypeHidden[idx] ? this.data.typeList[idx] : "";

    this.setData({
      isTypeHidden
    });

  },
 
  // 设置filter高度
  getFilterHeight(){
    // 设置filter高度
    let screenHeight = wx.getSystemInfoSync().windowHeight;
    let querySelecter = wx.createSelectorQuery();
    querySelecter.select("#search").boundingClientRect((res)=>{
      let filterHeight = (screenHeight - res.height) + "px";
      console.log(filterHeight);
      that.setData({
        filterHeight
      });
    }).exec();

    // 隐藏filter下类型的class

    let len = this.data.typeList.length;

    let isTypeHidden = new Array(len).fill(false);

    this.setData({
      isTypeHidden
    });

  },
  // 显示条件搜索框
  showFilter(){
    let isShow = this.data.isShowFilter;
    if(isShow){
      // 已展开，需隐藏
      this.getAnimation(750);
      this.data.isShowFilter = false;
    }else if(!isShow){
      // 已隐藏，需展开
      this.getAnimation(0);
      this.data.isShowFilter = true;
    }
  },
  // 隐藏条件搜索框
  closeFilter(){
    this.data.isShowFilter = false;
    this.getAnimation(750);
    console.log("closeFilter");
  },
  // 防止冒泡
  stopCloseFilter(){},
  // 隐藏/显示动画
  getAnimation(num){
    let animate = wx.createAnimation({
      delay: 0,
      duration: 500,
      timingFunction: 'ease-out'
    });
    animate.left(num+"rpx").step();
    this.setData({
      filterAnimate: animate.export()
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