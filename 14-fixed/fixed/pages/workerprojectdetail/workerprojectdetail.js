// pages/orderdetail/orderdetail.js
let util = require("../../utils/util");
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pdfUrl: "",
    isCheck: false,
    reqData: {
      fkneirong: "",
      fkimages: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    this.data.pageOption = options;

    this.init();

  },

  init() {
    let userInfo = wx.getStorageSync('userinfo');

    // 获取订单详情
    util.post("/api/worker/getOrderDetail", {
      users_id: userInfo.id,
      orders_id: that.data.pageOption.id
    }).then(res => {
      let order = res.data;
      order.orderimages = order.orderimages ? order.orderimages.split(",") : '';
      order.arrfk = order.fkimages ? order.fkimages.split(",") : '';
      order.fkimages = '';
      let reqData = {
        fkneirong: "",
        fkimages: []
      }
      that.setData({
        order,
        userId: userInfo.id,
        reqData,
      });

    });

    // 获取订单合同

    util.post("/api/orders/getHetong", {
      users_id: userInfo.id,
      // orders_id: that.data.pageOption.id
      orders_id: 4
    }).then(res => {

      that.data.pdfUrl = util.getSiteRoot() + res.data;

    });


  },
  // textInput
  textInput(e){
    this.data.reqData.fkneirong = e.detail.value;
  },
  // 展示图片
  showImage(e){
    let key = e.currentTarget.dataset.key;
    let idx = e.currentTarget.dataset.idx;
    let arr = this.data.order[key] || this.data.reqData[key];
    util.showImage(arr, idx);
  },
  // add image
  addImage() {
    // let count = 8 - this.data.reqData.orderimages.length;
    // if (count <= 0) {
    //   util.showSuccess("最多上传8张图片");
    //   return;
    // }
    wx.chooseImage({
      count: 9,
      success(res) {
        let arr = res.tempFilePaths;
        arr.forEach(v => {
          wx.uploadFile({
            filePath: v,
            name: 'image',
            url: util.getSiteRoot() + "/index.php/api/personal/upload",
            success(ret) {
              let reqData = that.data.reqData;
              // if (reqData.fkimages.length >= 8) {
              //   return
              // }
              let url = util.getSiteRoot() + JSON.parse(ret.data).data.replace(/\\/g, "/");
              reqData.fkimages.push(url);
              that.setData({
                reqData
              });
            }
          });
        });
      }
    });

  },

  // delete image
  deleteImage(e) {
    let idx = e.currentTarget.dataset.idx;

    let reqData = this.data.reqData;
    reqData.fkimages.splice(idx, 1);

    that.setData({
      reqData
    });

  },
  // startFix
  startFix(e){
    let data = {};
    data.users_id = this.data.userId;
    data.order_id = this.data.order.id;
    util.post("/api/worker/startWorker", data).then(res=>{
      console.log(res);
      if(res.code == 2001){
        util.showSuccess(res.msg, function(){
          let order = that.data.order;
          order.status = 45;
          that.setData({
            order
          });
        })
      }else{
        util.showSuccess(res.msg);
      }

    });
  },
  // submit()
  submit(){
    let data = this.data.reqData;
    data.users_id = this.data.userId;
    data.order_id = this.data.order.id;

    util.post("/api/worker/workerSubmitFk", data).then(res=>{
      console.log(res);
      if(res.code == 2001){
        util.showSuccess(res.msg, function(){
          // wx.navigateBack({
          //   delta: 1,
          // });
          that.init();
        })
      }else{
        util.showSuccess(res.msg);
      }

    });

  },
  // 下载PDF
  downloadPDF() {

    if (!this.data.isCheck) return util.showSuccess("请先查看合同");

    wx.downloadFile({
      url: that.data.pdfUrl,
      success(res) {
        console.log(res);
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success(ret) {
            console.log(ret);
          }
        })
      },
      fail(err) {
        console.log(err);
      }
    });
  },
  // 签署合同
  signIn() {
    if (!this.data.isCheck) return util.showSuccess("请先查看合同");

    if (!that.data.order.orderDetail.status == 20) return util.showSuccess("还未确认销售，请稍等");

    let userInfo = wx.getStorageSync('userinfo');
    util.post("/api/orders/signature", {
      users_id: userInfo.id,
      // orders_id: that.data.pageOption.id,
      orders_id: 4,
    }).then(res => {
      console.log(res);

      if (res.code == 2001) {

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
  openPDF(e) {

    if (!this.data.pdfUrl.slice(-3) == "pdf") {
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
      success() {
        that.setData({
          isCheck: true
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
  onPullDownRefresh: function (e) {
    console.log(e);
    wx.stopPullDownRefresh({
      success: (res) => {},
    });
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