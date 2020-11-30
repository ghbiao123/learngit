// pages/waitdeliver/waitdeliver.js
let that;
let util = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowPrompt: false,
    page: 1,
    list: [],
    isMore: true,
    selectedNum: 0,
    selectedType: [{
        name: "自行配送",
        value: "1",
        checked: true
      },
      {
        name: "快递配送",
        value: "2"
      },
    ],
    reqData: {
      type: 1
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    this.init();
  },
  init() {
    // 重新设置scroll高度
    wx.getSystemInfo({
      success: async (result) => {
        let systemHeight = result.windowHeight;
        let query = wx.createSelectorQuery();
        query.select(".send-box").boundingClientRect();
        let height = await new Promise((resolve) => {
          query.exec(res => {
            resolve(res[0]);
          });
        });
        let scrollHeight = (systemHeight - height.height) * 2 - 40;
        that.setData({
          scrollHeight
        });
      },
    });

    // 获取工作人员id
    this.data.staffid = wx.getStorageSync('staffid');

    // 初始化数据列表
    this.getList();


  },
  // 提交
  submit(e) {
    let data = e.detail.value;
    if (!data.region) return util.showSuccess("请输入城市名称");

    this.data.reqData.staffid = this.data.staffid;

    if(!this.data.reqData.orderids) return util.showSuccess("请至少选择一个订单");

    // 自行配送
    if(this.data.reqData.type == 1){
      this.submitSelectedOrder();
    }

    // 快递配送
    if(this.data.reqData.type == 2){
      this.setData({
        isShowPrompt: true
      });
    }

  },
  // 提交当前所选订单
  submitSelectedOrder(callback){
    util.post("/api/order/deliverModels", this.data.reqData).then(res=>{

      console.log(res);
      if(res.code == 1){

        that.data.page = 1;
        that.data.list = [];
        this.getList();

        return util.showSuccess(res.msg);

        
        callback&&callback(res);
      }
    });
  },
  // 勾选当前选项
  getSelected(e) {
    let selectedNum = e.detail.value.length;
    this.data.reqData.orderids = e.detail.value.toString();
    this.setData({
      selectedNum
    });
  },
  // 全选当前所有数据
  selectedAll(e) {
    console.log(e.detail.value);
    // 全选
    if (e.detail.value[0] == 1) {
      let list = this.data.list.map(v => {
        v.checked = true;
        return v;
      });
      this.data.reqData.orderids = list.map(v => v.id).toString();
      this.setData({
        list,
        selectedNum: list.length
      });
    }
    // 全不选
    if(!e.detail.value[0]){
      let list = this.data.list.map(v => {
        v.checked = false;
        return v;
      });
      this.data.reqData.orderids = "";
      this.setData({
        list,
        selectedNum: 0
      });
    }
  },
  // 选择配送方式
  getType(e) {
    this.data.reqData.type = e.detail.value;
  },
  // 获取更多数据
  getMoreList() {
    if (!this.data.isMore) return util.showSuccess("已加载所有");
    if (this.data.isMore) {
      this.data.page++;
      this.getList();
    }
  },
  // 获取订单数据
  getList() {

    let list = this.data.list;

    util.post("/api/order/deliveryOrders", {
      staffid: this.data.staffid,
      page: this.data.page
    }).then(res => {
      console.log(res);
      // 添加 checked 属性默认为false
      let moreList = res.data.data.map(v => {
        v.checked = false;
        return v;
      });
      list.push(...moreList);
      that.setData({
        list
      });
    });


  },

  // 获取快递单号
  getExpressOrder(e) {
    console.log(e.detail);
    this.data.reqData.cno = e.detail;
    this.submitSelectedOrder();
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