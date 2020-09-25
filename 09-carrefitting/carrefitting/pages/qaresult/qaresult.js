// pages/qaresult/qaresult.js
let that;
let util = require('../../utils/util');
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
    that = this;

    // 查询结果
    this.getResult(options);
  },
  // 展示图片
  showImage(e){
    let idx = e.currentTarget.dataset.idx;
    wx.previewImage({
      urls: that.data.images,
      current: that.data.images[idx]
    });
  },
  // 查询结果
  getResult(data){
    util._post('/api/warrantylist/search', data).then(res=>{
      if(res.code==0){
        res.data.createtime = util.getToday(res.data.createtime*1000).date;
        let needData = {
          'zhibao_no': '质保号',
          'name': '车主姓名',
          'phone': '联系方式',
          'sgtime': '施工时间',
          'chejia_no': '车架号',
          'chepai_no': '车牌号',
          'brand': '品牌类型',
          'p_model': '产品型号',
          'position': '施工部位',
          'year': '质保年限',
          'mendian': '门店名称',
          'address': '门店地址',
          'images': '案例照片'
        }
        that.data.images = res.data.images;
        res.data.sgtime = util.getToday(res.data.sgtime*1000).date;
        that.setData({
          rlt: res.data,
          needData
        });
      }else if(res.code==1){
        util.showError('未查询到数据', function(){
          wx.navigateBack();
        });
      }
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