// pages/orderdetail/orderdetail.js
let util = require("../../utils/util");
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pdfUrl: "",
    isCheck: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    this.data.pageOption = options;


  },

  init(){
    let userInfo = wx.getStorageSync('userinfo');

    // 获取订单详情
    util.post("/api/repair/getRepairDetail", {
      // users_id: userInfo.id,
      repair_id: that.data.pageOption.id
    }).then(res=>{
      let order = res.data;
      order.repairimages = order.repairimages ? order.repairimages.split(",") : '';
      that.setData({
        order,
        userId: userInfo.id
      });
      wx.stopPullDownRefresh({
        success: (res) => {},
      });
    });

    // 获取订单合同

    // util.post("/api/orders/getHetong", {
    //   users_id: userInfo.id,
    //   // orders_id: that.data.pageOption.id
    //   orders_id: 4
    // }).then(res=>{
    //   console.log(res);

    //   that.data.pdfUrl = util.getSiteRoot() + res.data;

    // });


  },
  showImage(e){
    let key = e.currentTarget.dataset.key;
    let idx = e.currentTarget.dataset.idx;
    let arr = this.data.order[key];
    util.showImage(arr, idx);
  },
  // 下载PDF
  downloadPDF(){

    if(!this.data.isCheck) return util.showSuccess("请先查看合同");

    wx.downloadFile({
      url: that.data.pdfUrl,
      success(res){
        console.log(res);
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success(ret){
            console.log(ret);
          }
        })
      },
      fail(err){
        console.log(err);
      }
    });
  },
  // 签署合同
  signIn(){
    if(!this.data.isCheck) return util.showSuccess("请先查看合同");

    if(!that.data.order.orderDetail.status == 20) return util.showSuccess("还未确认销售，请稍等");
    
    let userInfo = wx.getStorageSync('userinfo');
    util.post("/api/orders/signature", {
      users_id: userInfo.id,
      // orders_id: that.data.pageOption.id,
      orders_id: 4,
    }).then(res=>{
      console.log(res);

      if(res.code == 2001){

        let order = that.data.order;

        // order.order_information.contract_status = 1;
        // order.orderDetail.status = 25;

        // that.setData({
        //   order
        // });

        that.init();


        util.showSuccess(res.msg);
      }

    });

  },

  // openPDF
  openPDF(e){

    if( ! this.data.pdfUrl.slice(-3) == "pdf"){
      return util.showSuccess("还未生成合同，请下拉刷新后再试");
    }


    // wx.downloadFile({
    //   url: that.data.pdfUrl,
    //   filePath: wx.env.USER_DATA_PATH + '/' + "123.pdf",
    //   success: function (res) {
    //     var filePath = res.filePath
    //     wx.openDocument({
    //       filePath: filePath,
    //       showMenu: true,
    //       success: function (res) {
    //       }
    //     })
    //   }
    // });
    // return;

    wx.navigateTo({
      url: '/pages/readPDF/readPDF?url=' + this.data.pdfUrl,
      success(){
        that.setData({
          isCheck: true
        });
      }
    });
  },

  // 取消订单
  cancelOrder(){
    util.post("/api/repair/cancelRepair", {
      users_id: this.data.userId,
      repair_id: this.data.order.id
    }).then(res=>{
      if(res.code == 2001){
        util.showSuccess(res.msg, function(){
          // 
          that.init();
        });
      }else{
        util.showSuccess(res.msg);
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
    this.init();
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
  onPullDownRefresh: function (e) {
    console.log(e);
    // 获取列表
    this.init();
    
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