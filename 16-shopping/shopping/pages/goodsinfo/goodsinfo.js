// pages/goodsinfo/goodsinfo.js
let util = require("../../utils/util");
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doMain: util.getSiteRoot(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    this.data.id = options.id;
    console.log(this.data.id);
    this.init();
  },

  init(){
    util.post("/api/goodsinfo/goodsDetail", {
      id: this.data.id
    }).then(res=>{
      console.log(res);
      let detail = res.data;
      detail.goods_pictures = util.getSiteRoot() + detail.goods_pictures;
      that.setData({
        detail
      });
    });
  },
  placeOrder(){
    let userInfo = wx.getStorageSync('userinfo');
    if(!userInfo){
      return util.showError('请您先登录', function(){
        wx.navigateTo({
          url: '/pages/login/login',
        });
      });
    }

    let data = {
      goodsid: this.data.id,
      userid: userInfo.userid,
    }

    util.post("/api/order/placeOrder", data).then(res=>{
      console.log(res);

      if(res.code == 1){
        wx.requestPayment({
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          paySign: res.data.paySign,
          timeStamp: res.data.timeStamp,
          signType: 'MD5',
          success(res){
            wx.navigateTo({
              url: '/pages/order/order',
            });
          },
          fail(err){
            wx.navigateTo({
              url: '/pages/order/order',
            });
          }
        })
  
      }else{
        util.showSuccess(res.msg);
      }

      
    });

  },
  /**
   * 
   * 
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
    console.log('share');
    return {
      title: '袋鼠霸王餐',
      path: `/pages/goodsinfo/goodsinfo?id=${this.data.id}`,
    }
  }
})