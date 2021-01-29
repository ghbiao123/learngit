// pages/orderdetail/orderdetail.js
let util = require("../../utils/util");
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pdfUrl: "",
    isCheck: true
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
    util.post("/api/orders/getOrderDetail", {
      users_id: userInfo.id,
      orders_id: that.data.pageOption.id
    }).then(res=>{
      console.log(res);
      let order = res.data;
      order.orderDetail.orderimages = order.orderDetail.orderimages ? order.orderDetail.orderimages.split(",") : '';
      order.shifuDetail.fkimages = order.shifuDetail.fkimages ? order.shifuDetail.fkimages.split(",") : '';

      if(order.shifuDetail.fkimages.length > 0){
        order.shifuDetail.fkimages = order.shifuDetail.fkimages.filter(v=>{
          if(v) return v;
        });
      }

      
      that.setData({
        order,
        userId: userInfo.id
      });
      wx.stopPullDownRefresh({
        success: (res) => {},
      });
    });

    // 获取订单合同

    util.post("/api/orders/getHetong", {
      users_id: userInfo.id,
      orders_id: that.data.pageOption.id,
      // orders_id: 4
    }).then(res=>{
      console.log(res);
      if(res.code == 2001){ 
        that.data.pdfUrl = util.getSiteRoot() + res.data;
      }
      wx.stopPullDownRefresh({
        success: (res) => {},
      });
    });


  },
  // fixDone
  fixDone(){
    util.post("/api/orders/confirmCompletion", {
      users_id: that.data.userId,
      orders_id: that.data.order.orderDetail.id,
    }).then(res=>{
      if(res.code == 2001){
        util.showSuccess(res.msg, function(){
          that.init();
        });
      }else{
        util.showSuccess(res.msg);
      }
    });
  },
  // pay
  pay(e){
    let key = e.currentTarget.dataset.key;
    let data = {
      users_id: that.data.userId,
    }
    if(key == 'rest'){
      data.type = 2;
      data.orderNumber = that.data.order.orderDetail.wkordernum;
    }
    if(key == 'advance'){
      data.orderNumber = that.data.order.orderDetail.ordernum;
      data.type = 1;

    }
    util.post("/api/orders/unifiedOrder", data).then(res=>{
      console.log(res);
      wx.requestPayment({
        nonceStr: res.nonceStr,
        package: res.package,
        paySign: res.paySign,
        timeStamp: res.timeStamp,
        signType: res.signType,
        success(){
          that.init();
        },
        fail(){
          that.init();
        }
      })
    });
  },
  // 下载PDF
  downloadPDF(){

    // if(!this.data.isCheck) return util.showSuccess("请先查看合同");

    if( !(this.data.pdfUrl.slice(-3) == "pdf")){
      return util.showSuccess("还未生成合同，请下拉刷新后再试");
    }

    wx.downloadFile({
      url: that.data.pdfUrl,
      // filePath: wx.env.USER_DATA_PATH + '/机械设备维修维保合同.pdf',
      success(res){
        console.log(res);
        
        wx.openDocument({
          filePath: res.tempFilePath,
          showMenu: true,
          success(){
             
          }
        });

        
      },
      fail(err){
        console.log(err);
      }
    });
  },
  // 签署合同
  signIn(){
    if(!this.data.isCheck) return util.showSuccess("请先查看合同");

    // if(!that.data.order.orderDetail.status == 20) return util.showSuccess("还未确认销售，请稍等");
    
    let userInfo = wx.getStorageSync('userinfo');
    util.post("/api/orders/signature", {
      users_id: userInfo.id,
      orders_id: that.data.pageOption.id,
      // orders_id: 4,
    }).then(res=>{
      console.log(res);

      if(res.code == 2001){

        let order = that.data.order;

        order.order_information.contract_status = 1;
        order.orderDetail.status = 25;

        that.setData({
          order
        });

        that.init();


        util.showSuccess(res.msg);
      }

    });

  },
  showImage(e){
    let key = e.currentTarget.dataset.key;
    let idx = e.currentTarget.dataset.idx;
    let arr = this.data.order.orderDetail[key] || this.data.order.shifuDetail[key];
    util.showImage(arr, idx);
  },
  // openPDF
  openPDF(e){
    if( !(this.data.pdfUrl.slice(-3) == "pdf")){
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
  // cancel
  cancelOrder(e){
    util.post("/api/orders/cancelOrder", {
      users_id: that.data.userId,
      orders_id: that.data.order.orderDetail.id,
    }).then(res=>{
      if(res.code == 2001){
        util.showSuccess(res.msg, function(){
          // that.init();
          wx.navigateBack({
            delta: 1,
          });
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