// pages/stafforder/stafforder.js
let that;
import util from "../../utils/util";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonePhoto: [],
    isChangePrice: false,
    isResetConfig: false,
    newConfig: {},
    imageUrl: [],
    reqImageUrl: [],
    currentPageId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this

    this.data.pageOptions = options;

    this.init();

  },

  // 初始化数据
  init() {

    // 获取订单详情
    let orderid = this.data.pageOptions.id;
    if (!orderid) return;

    util.post('/api/order/orderDetail', {
      orderid
    }).then(res => {
      console.log(res);
      that.data.order = res.data;
      that.setData({
        order: res.data
      });

    });
  },
  // 下一步
  nextPage(){
    this.setData({
      currentPageId: 1
    });
  },
  // 取消订单
  cancelOrder(){
    let staffid = wx.getStorageSync('staffid');
    let orderId = this.data.order.id;
    let url =`/pages/cancel/cancel?orderid=${orderId}&operator=2&operatorid=${staffid}`
    wx.navigateTo({
      url: url,
    });
  },
  // 最终提交
  submit(e) {
    let staffid = wx.getStorageSync('staffid');
    let data = {
      orderid: this.data.order.id,
      staffid,
      estimatefee: this.data.order.estimate_fee,
      configureinfo: this.data.order.configure_info,
      describeinfo: this.data.order.describe_info,
      pictures: this.data.reqImageUrl,
      imei: this.data.imei,
      pname: (this.data.idCard && this.data.idCard.name),
      pidcard: (this.data.idCard && this.data.idCard.id),
      ppic: this.data.idcardSrc,
    };

    let needData = ['imei','pname'];
    if(!data.imei || !data.pname){
      return util.showSuccess('请完善信息');
    }

    util.post('/api/order/testingMachineOrder', data).then(res=>{
      console.log(res);
      if(res.code == 1){
        return util.showSuccess(res.msg, function(){
          wx.navigateBack({
            delta: 1,
          });
        });
      }else{
        util.showError(res.msg);
      }
    });

  },
  // TMETInput
  TMETInput(e) {
    this.data.imei = e.detail.value;
  },
  // 删除图片
  cancelImage(e) {
    let id = e.currentTarget.dataset.idx;
    let imageUrl = this.data.imageUrl;
    imageUrl.splice(id, 1);
    this.data.reqImageUrl.splice(id, 1);
    this.setData({
      imageUrl
    });
  },
  // 设置新配置项
  resetConfigConfirm() {
    if (this.data.newConfig.cinfo) {
      this.data.order.model_info = this.data.newConfig.cinfo;
    }
    if (this.data.newConfig.des) {
      this.data.order.model_info.des = this.data.newConfig.des;
    }
    util.showSuccess('已修改');
    this.setData({
      isResetConfig: false
    });
  },
  // 放弃设置配置项
  resetConfigCancel() {
    this.setData({
      isResetConfig: false
    });
  },
  // 监听配置项修改
  textAreaInput(e) {
    let key = e.currentTarget.dataset.key;
    let value = e.detail.value;
    this.data.newConfig[key] = value;
  },
  // 设置新价格
  getNewPrice(e) {
    let changefee = Number(e.detail);
    if(!changefee){
      // 输入的是一个坏值
      return util.showSuccess("请输入正确的价格");
    }
    changefee = Math.min(1000, changefee);
    changefee = Math.max(-1000, changefee);

    let order = this.data.order;

    order.total_amount = Number(order.estimate_fee) + Number(order.coupon_fee) + Number(changefee);
    this.setData({
      order,
      changefee
    });
  },

  // 修改机器配置
  changeConfig() {
    if (this.data.order.estimate_type == 1) {
      // 人工估价，直接弹窗进行编辑
      this.setData({
        isResetConfig: true
      });
      return;
    }
    wx.setStorage({
      data: this.data.order,
      key: 'staffmachine',
      success(res) {
        wx.navigateTo({
          url: `/pages/staffevaluation/evaluation?id=${that.data.order.m_id}&cid=${that.data.order.c_id}`,
        });
      }
    });
  },
  // changePrice 修改订单估价
  changePrice() {
    this.setData({
      isChangePrice: true
    });
  },
  // 选择身份证照片
  chooseIdcard(res) {
    console.log(res);
    // image detail.image_path = 'wxfile://tmp_c7a5766c71bbe2b04f1003358e27a37f6e98207a5093a67b.png';
    wx.uploadFile({
      filePath: res.detail.image_path,
      name: 'file',
      url: util.getSiteRoot() + '/api/common/upload',
      success(ret) {
        console.log(ret);

        that.data.ppic = JSON.parse(ret.data).data.url;

        let idCard = {
          id: res.detail.id.text,
          name: res.detail.name.text
        }

        that.setData({
          idCard,
          idcardSrc: res.detail.image_path
        });

      }
    });


    return;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: async function (res) {
        let idcardSrc = res.tempFilePaths[0];

        try {
          const invokeRes = await wx.serviceMarket.invokeService({
            service: 'wx79ac3de8be320b71',
            api: 'OcrAllInOne',
            data: {
              // 用 CDN 方法标记要上传并转换成 HTTP URL 的文件
              img_url: idcardSrc,
              data_type: 3,
              ocr_type: 1
            },
          })

          console.log('invokeService success', invokeRes)
          // wx.showModal({
          //   title: 'success',
          //   content: JSON.stringify(invokeRes),
          // })
        } catch (err) {
          console.error('invokeService fail', err)
          // wx.showModal({
          //   title: 'fail',
          //   content: err,
          // })
        }

        return;

        wx.serviceMarket.invokeService({
          service: 'wx79ac3de8be320b71', // '固定为服务商OCR的appid，非小程序appid',
          api: 'OcrAllInOne',
          data: {
            img_url: idcardSrc,
            data_type: 3,
            ocr_type: 1,
          },
        }).then(res => {
          console.log('invokeService success', res)
          // wx.showModal({
          //   title: 'cost',
          //   content: (Date.now() - d) + '',
          // })
        }).catch(err => {
          console.error('invokeService fail', err)
          // wx.showModal({
          //   title: 'fail',
          //   content: err + '',
          // })
        });

        that.setData({
          idcardSrc
        });
      }
    });
  },
  // 选择手机图片
  getPhoto(e) {
    wx.chooseImage({
      count: 4,
      success(res) {
        console.log(res);
        // 所选图片数组
        let path = res.tempFilePaths;
        let imageUrl = that.data.imageUrl;
        imageUrl.push(...path);
        path.forEach(v => {

          wx.uploadFile({
            filePath: v,
            name: 'file',
            url: util.getSiteRoot() + '/api/common/upload',
            success(ret) {
              console.log(ret);
              let url = JSON.parse(ret.data).data.url;
              that.data.reqImageUrl.push(url);
            }
          });

        });
        that.setData({
          imageUrl
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
    let timer = setInterval(() => {
      let order = this.data.order;
      if (!order) {
        return;
      } else {
        clearInterval(timer)
      }
      let newMashine = wx.getStorageSync('newstaffmachine');
      if (!newMashine) return;
      let needId = ['pcram', 'pcssd', 'pcvideocard', 'phonecolor', 'phonestorage', 'phonemodel']
      order.estimate_fee = newMashine.totalprice;
      order.total_amount = Number(order.estimate_fee) + Number(order.coupon_fee);
      let cstr = '';
      needId.forEach(v => {
        if (newMashine[v]) {
          cstr = cstr + newMashine[v] + ',';
        }
      });
      util.post('/api/products/getModelConfigInfo', {
        cstr
      }).then(res => {
        console.log(res);
        order.model_info.cinfo = res.data;
        that.setData({
          order
        });
        wx.removeStorage({
          key: 'newstaffmachine',
        })
      });
    }, 100);
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