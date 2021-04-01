// pages/orderinfo/orderinfo.js
let util = require("../../utils/util");
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.data.orderid = options.id;

    that = this;

    this.init();

  },

  init(){
    util.post("/api/order/orderDetail", {
      orderid: this.data.orderid
    }).then(res=>{
      console.log(res);
      let detail = res.data;
      let t = util.getToday(detail.createtime * 1000);
      detail.createtime = t.date + ' ' + t.time;
      detail.goodsinfo.goods_pictures = util.getSiteRoot() + detail.goodsinfo.goods_pictures;
      that.setData({
        detail
      });
    });
  },
  pay(){
    let userInfo = wx.getStorageSync('userinfo');
    // if(!userInfo){
    //   return util.showError('请您先登录');
    // }

    let data = {
      orderid: this.data.detail.id,
      userid: userInfo.userid,
    }

    util.post("/api/order/wxPayAgain", data).then(res=>{
      console.log(res);

      if(res.code == -1){
        return util.showError(res.msg, function(){
          wx.navigateBack({
            delta: 1,
          });
        });
      }

      wx.requestPayment({
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        paySign: res.data.paySign,
        timeStamp: res.data.timeStamp,
        signType: 'MD5',
        success(res){
         util.showSuccess('支付成功', function(){
          that.init();
         });
        },
        fail(err){
          util.showError("支付失败，请重试");
        }
      })

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