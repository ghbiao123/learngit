// pages/orderdetail/orderdetail.js
let that;
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id:'',
    buttonText: '输入订单价格',
    showPrompt: false,
    isChange: false,
    oldData:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    this.data.order_id = options.id;

    // 获取订单详情
    this.getOrderDetail();

    

  },
  // resetData
  resetData(){
    let data = {
      orderid: this.data.order.id,
      goodstype: this.data.oldData.goodstype,
      goodsweight: this.data.oldData.goodsweight,
      goodssize: `${this.data.oldData.l}x${this.data.oldData.w}x${this.data.oldData.h}`,
    }
    util.post('/api/Order/editsize', data).then(res=>{
      console.log(res);
      if(res.code == 1){
        let order = that.data.order;
        Object.assign(order, data);
        that.setData({
          order,
          isChange: false
        });
        return util.showSuccess(res.msg);
      }else{
        return util.showError(res.msg);
      }

    });
  },
  // 显示修改数据框
  changeOrderData(){
    this.setData({
      isChange: true
    });
  },
  // 监听文字输入
  textInput(e){
    let type = e.currentTarget.dataset.type;
    this.data.oldData[type] = e.detail.value;
  },
   // 商品类型picker
   goodsTypeChange(e){
    let val = e.detail.value;
    this.data.oldData.goodstype = that.data.goodsTypeRange[val].name;
    that.setData({
      goodsType: that.data.goodsTypeRange[val].name
    });

  },

  // 显示prompt
  showPrompt(){
    let showPrompt = !this.data.showPrompt;
    this.setData({
      showPrompt
    });
  },
  // 获取promptvalue
  getPromptValue(e){
    console.log(e.detail);
    if(!e.detail) return;
    let order = this.data.order;
    
    util.post('/api/Order/updateprice', {
      orderid: this.data.order_id,
      price: e.detail
    }).then(res=>{
      order.price = e.detail;
      this.setData({
        order
      });
      util.showSuccess(res.msg);
    });
  },
  // 获取订单详情
  getOrderDetail(){
    util.post('/api/Order/orderde', {orderid: this.data.order_id}).then(res=>{
      console.log(res);
      let orderSize = res.goodssize.split('x');
      let oldData = {
        goodstype: res.goodstype,
        goodsweight: res.goodsweight,
        l: orderSize[0],
        w: orderSize[1],
        h: orderSize[2],
      };

      that.setData({
        order: res,
        oldData
      });
      wx.stopPullDownRefresh();
    });

    // 获取商品种类
    util.post('/api/Xd/selecttype').then(res=>{
      that.setData({
        goodsTypeRange: res
      });
    });

  },
  // 复制单号
  cutText(e){
    let id = e.currentTarget.dataset.id;
    wx.setClipboardData({
      data: id,
      success(res){
        util.showSuccess('复制成功');
      }
    })
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
    // 获取订单详情
    this.getOrderDetail();
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