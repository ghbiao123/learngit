//index.js
let that;
let util = require("../../utils/util");
Page({
  data: {
    lList: [1,2,3],
    rList: [1,2,3,4],
  },
  //事件处理函数

  onLoad: function () {
    that = this;

  },
  getGoodsDetail(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goodsinfo/goodsinfo?id=' + id,
    });
    console.log(id);
  },
  onHide() {},

  onShareAppMessage: function () {

  }

})