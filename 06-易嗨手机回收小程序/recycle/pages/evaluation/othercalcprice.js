// pages/evaluation/othercalcprice.js
let that;
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: [],
    reqImageUrl: [],
    reqData:{},
    showActionsheet: false,
    groups: [{
        text: '人工估价',
        value: 1
      },
      {
        text: '立即回收',
        value: 2
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    this.data.reqData.cid = options.id;
    
  },
  // 估价提交
  submit(e){
    let data = e.detail.value;
    Object.assign(data, this.data.reqData);
    let userInfo = util.checkIsLogin.call(this);
    if(!userInfo){
      return util.showError('请您先登录', function(){
        wx.navigateTo({
          url: '/pages/login/login',
        })
      });
    }

    data.userid = userInfo.uid;

    data.pictures = this.data.reqImageUrl.join(',');

    if(this.data.imageUrl.length != this.data.reqImageUrl.length){
      return util.showSuccess('图片正在上传，请稍后尝试...');
    }

    this.data._data = data;

    // this.setData({
    //   showActionsheet: true
    // });

    wx.setStorage({
      data: data,
      key: 'currentmachine',
    });

    wx.navigateTo({
      url: '/pages/tips/tips?frompage=othercalcprice',
    });


  },
  // close actionsheet
  close: function () {
    this.setData({
      showActionsheet: false
    })
  },
  sendData(e){
    // 关闭actionsheet
    this.close();

    let data = this.data._data;
    if(e.detail.value == 2){
      // 用户现场扫码
      data.otype = 1;
      // 添加storage： currentmachine
      wx.setStorage({
        data: data,
        key: 'currentmachine',
      });
      submit(data, function(res){
        // wx.navigateTo({
        //   url: `/pages/evaluation/result?frompage=othercalcprice&name=${data.name}&price=0&otype=1&orderid=${res.data.aoid}`,
        // });
        wx.navigateTo({
          url: `/pages/tips/tips?frompage=othercalcprice&name=${data.name}&price=0&otype=1&orderid=${res.data.aoid}`,
        });
      });
    }else if(e.detail.value == 1 ){
      // 用户正常流程进行人工估价
      data.otype = 1;
      submit(data, function(){
        wx.redirectTo({
          url: '/pages/recyclelist/recyclelist',
        });
      });
    }

    function submit(data, callBack){
      util.post('/api/order/calculatePriceOther', data).then(res=>{
        if(res.code == 1){
          callBack&&callBack(res);
        }
      });
    }
    // wx.showModal({
    //   cancelColor: '#000',
    //   cancelText: '人工估价',
    //   confirmText: '立即回收',
    //   title: '提示',
    //   content: '',
    //   success(res){
        
        
    //   }
    // });
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
  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 9,
      success(res) {
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