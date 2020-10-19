// // pages/makeorderonline/makeorderonline.js
// let that;
// let util = require("../../utils/util");
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     isAgree: false
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     that = this;

    
//   },
//   // submit
//   submit(e){
//     // 判断是否同意协议
//     if(!this.data.isAgree){
//       return util.showSuccess('请同意电子运单契约条款');
//     }
//     let getGoodsSize = function(){
//       return `${that.data.long}x${that.data.wide}x${that.data.high}`;
//     }
//     let data = {};
//     data = {
//       goodstype: that.data.goodsType,
//       goodsweight: that.data.weight,
//       reservetime: that.data.time,
//       goodssize: getGoodsSize(),
//       adder: that.data.sendCountry+','+that.data.receiveCountry,
//       mailname: that.data.sendCountryAddress.name,
//       mailphone: that.data.sendCountryAddress.phone,
//       mailadder: that.data.sendCountryAddress.address,
//       receiptname: that.data.receiveCountryAddress.name,
//       receiptphone: that.data.receiveCountryAddress.phone,
//       receiptadder: that.data.receiveCountryAddress.address,
//       transport: that.data.transport,
//     }

//     for(let key in data){
//       if(!data[key]){
//         return util.showSuccess('请完善您的信息');
//       }
//     }

//     let uid = wx.getStorageSync('userinfo').uid;
//     data.userid = uid;
//     console.log(data, Object.keys(data).length);

//     util.post('/api/Order/addorder', data).then(res=>{
//       console.log(res);
//       if(res.code == 1){
//         util.showSuccess(res.msg, function(){
//           wx.navigateBack({
//             delta: 1,
//           });
          
//         });
//       }else{
//         util.showError(res.msg);
//       }
//     });



//   },
//   // init data
//   init(){
//     // 商品类型
//     util.post('/api/Xd/selecttype').then(res=>{
//       that.setData({
//         goodsTypeRange: res
//       });
//     });
//     // 国家
//     util.post('/api/Xd/selectadder').then(res=>{
//       that.setData({
//         sendCountryRange: res,
//         receiveCountryRange: res
//       });
//     });
//     // 运输方式
//     util.post('/api/Xd/selectyunshu').then(res=>{
//       that.setData({
//         transportRange: res
//       });
//     });
//     // 用户storage地址,
//     // sendCountry,
//     wx.getStorage({
//       key: 'sendCountryAddress',
//       success(res){
//         that.setData({
//           sendCountryAddress: res.data
//         });
//       }
//     });
//     // reveiveCountry
//     wx.getStorage({
//       key: 'receiveCountryAddress',
//       success(res){
//         that.setData({
//           receiveCountryAddress: res.data
//         });
//       }
//     });
    
//   },
//   // 检测是否同意协议
//   checkAgreement(){
//     let isAgree = !this.data.isAgree;
//     this.setData({
//       isAgree
//     });
//   },
//   // 监听是否可以估价
//   checkEvaluationValue(){
//     function findIt(arr, key, val){
//       return arr.filter(v=>{
//         return v[key] == val;
//       });
//     }
    
//     let needData = {
//       huowuid: that.data.goodsType&&findIt(that.data.goodsTypeRange, 'name', that.data.goodsType)[0].id,
//       adderid: that.data.receiveCountry&&findIt(that.data.receiveCountryRange, 'name', that.data.receiveCountry)[0].id,
//       yunshuid: that.data.transport&&findIt(that.data.transportRange, 'name', that.data.transport)[0].id,
//       weight: that.data.weight,
//     }
//     for(let key in needData){
//       if(!needData[key]){
//         return
//       }
//     }
//     util.post('/api/Order/selectprice', needData).then(res=>{
//       console.log(res);
//       if(res.code == 1){
//         that.setData({
//           evaluationPrive: res.price
//         });
//       }
//     });
//   },
//   // 监听文字输入
//   textInput(e){
//     let type = e.currentTarget.dataset.type;
//     this.data[type] = e.detail.value;
//     // 检测是否满足估价条件
//     this.checkEvaluationValue();
//   },
//   // 商品类型picker
//   goodsTypeChange(e){
//     let val = e.detail.value;
//     that.setData({
//       goodsType: that.data.goodsTypeRange[val].name
//     });

//     // 检测是否满足估价条件
//     this.checkEvaluationValue();
//   },
//   // 发件国家picker
//   sendCountryChange(e){
//     let val = e.detail.value;
//     that.setData({
//       sendCountry: that.data.sendCountryRange[val].name
//     });
//     // 检测是否满足估价条件
//     this.checkEvaluationValue();
//   },
//   // 收件国家picker
//   receiveCountryChange(e){
//     let val = e.detail.value;
//     that.setData({
//       receiveCountry: that.data.receiveCountryRange[val].name
//     });
//     // 检测是否满足估价条件
//     this.checkEvaluationValue();
//   },
//   // 运输方式picker
//   transportChange(e){
//     let val = e.detail.value;
//     that.setData({
//       transport: that.data.transportRange[val].name
//     });
//     // 检测是否满足估价条件
//     this.checkEvaluationValue();
//   },
//   // 预约时间picker
//   timeChange(e){
//     let val = e.detail.value;
//     let startTime = util.getToday().date.replace(/\//g, "-");
//     that.setData({
//       time: val,
//       startTime
//     });
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//     // 初始化数据
//     this.init();
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })

// pages/makeorderonline/makeorderonline.js
let that;
let util = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAgree: false,
    isShowAgreement: false,
    isShowContact: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    
  },
  // agreementAgree
  agreementAgree(){
    this.setData({
      isAgree: true,
      isShowAgreement: false
    });
  },
  // agreementCancel
  agreementCancel(){
    this.setData({
      isShowAgreement: false,
      isShowContact: false
    });
  },
  // showAgreement
  showAgreement(){
    this.setData({
      isShowAgreement: true
    });
  },
  // 失去焦点
  blur(){
    this.setData({
      blur_it: false
    });
  },
  // submit
  submit(e){
    // 判断是否同意协议
    if(!this.data.isAgree){
      return util.showSuccess('请同意电子运单契约条款');
    }
    let getGoodsSize = function(){
      return `${that.data.long}x${that.data.wide}x${that.data.high}`;
    }
    let data = {};
    data = {
      goodstype: that.data.goodsType,
      goodsweight: that.data.weight,
      reservetime: that.data.date + ' ' + that.data.time,
      goodssize: getGoodsSize(),
      adder: that.data.receiveCountry,
      mailname: that.data.sendCountryAddress.name,
      mailphone: that.data.sendCountryAddress.phone,
      mailadder: that.data.sendCountryAddress.address,
      receiptname: that.data.receiveCountryAddress.name,
      receiptphone: that.data.receiveCountryAddress.phone,
      receiptadder: that.data.receiveCountryAddress.address,
      transport: that.data.transport,
      reserveprice: that.data.evaluationPrive,
    }

    for(let key in data){
      if(!data[key]){
        return util.showSuccess('请完善您的信息');
      }
    }

    let userInfo = wx.getStorageSync('userinfo');
    if(!userInfo){
      return util.showError('请您登录', function(){
        wx.navigateTo({
          url: '/pages/login/login',
        });
      });
    }
    
    data.userid = userInfo.uid;

    util.post('/api/Order/addorder', data).then(res=>{
      if(res.code == 1){
        util.showSuccess(res.msg, function(){
          wx.navigateBack({
            delta: 1,
          });
          
        });
      }else{
        util.showError(res.msg);
      }
    });



  },
  // init data
  init(){
    // 商品类型
    util.post('/api/Xd/selecttype').then(res=>{
      that.setData({
        goodsTypeRange: res
      });
    });
    // 国家
    util.post('/api/Xd/selectadder').then(res=>{
      that.setData({
        sendCountryRange: res,
        receiveCountryRange: res
      });
    });
    // 运输方式
    util.post('/api/Xd/selectyunshu').then(res=>{
      that.setData({
        transportRange: res
      });
    });
    // 用户storage地址,
    // sendCountry,
    wx.getStorage({
      key: 'sendCountryAddress',
      success(res){
        that.setData({
          sendCountryAddress: res.data
        });
      }
    });
    // reveiveCountry
    wx.getStorage({
      key: 'receiveCountryAddress',
      success(res){
        that.setData({
          receiveCountryAddress: res.data
        });
      }
    });

    // 契约条款
    util.post('/api//Order/findclause').then(res=>{
      that.setData({
        _html: res.content
      });
    });
    
  },
  // 检测是否同意协议
  checkAgreement(){
    let isAgree = !this.data.isAgree;
    this.setData({
      isAgree
    });
  },
  // 监听是否可以估价
  checkEvaluationValue(){
    function findIt(arr, key, val){
      return arr.filter(v=>{
        return v[key] == val;
      });
    }
    
    let needData = {
      huowuid: that.data.goodsType&&findIt(that.data.goodsTypeRange, 'name', that.data.goodsType)[0].id,
      adderid: that.data.receiveCountry&&findIt(that.data.receiveCountryRange, 'name', that.data.receiveCountry)[0].id,
      yunshuid: that.data.transport&&findIt(that.data.transportRange, 'name', that.data.transport)[0].id,
      weight: that.data.weight,
    }
    for(let key in needData){
      if(!needData[key]){
        return
      }
    }
    util.post('/api/Order/selectprice', needData).then(res=>{
      if(res.code == 1){
        that.setData({
          evaluationPrive: res.price
        });
      }
    });
  },
  // 监听文字输入
  textInput(e){
    let type = e.currentTarget.dataset.type;
    this.data[type] = e.detail.value;
    if(type == 'weight' && Number(this.data.weight)){

      let weight = Number(e.detail.value);
      if(!weight){
        return util.showSuccess('您输入的重量有误');
      }

      weight = weight.toString().split('.');
      if(weight.length>1){
        // 有小数
        weight[1] = Number(`0.${weight[1]}`) > 0.5 ?  1 : 0.5;
        weight = Number(weight[0]) + weight[1];
      }else{
        // 无小数
        weight = Number(weight[0]);
      }
      this.data[type] = weight;

      this.checkWeight()
    }
    // 检测是否满足估价条件
    this.checkEvaluationValue();
  },
  // 商品类型picker
  goodsTypeChange(e){
    let val = e.detail.value;
    that.setData({
      goodsType: that.data.goodsTypeRange[val].name
    });

    // 检测是否满足估价条件
    this.checkEvaluationValue();
  },
  // 发件国家picker
  sendCountryChange(e){
    let val = e.detail.value;
    that.setData({
      sendCountry: that.data.sendCountryRange[val].name
    });
    // 检测是否满足估价条件
    this.checkEvaluationValue();
  },
  // 收件国家picker
  receiveCountryChange(e){
    let val = e.detail.value;
    that.setData({
      receiveCountry: that.data.receiveCountryRange[val].name
    });

    // 获取当前国家现有的运输方式
    util.post('/api/Order/transport', {adderid: that.data.receiveCountryRange[val].id}).then(res=>{
      that.setData({
        transportRange: res,
        transport: ''
      });
    });

    // 检测是否满足估价条件
    this.checkEvaluationValue();
  },
  // 运输方式picker
  transportChange(e){
    let val = e.detail.value;
    that.setData({
      transport: that.data.transportRange[val].name
    });
    // 检测是否满足估价条件
    this.checkEvaluationValue();

    // 检测是否超重
    this.checkWeight();
  },
  checkWeight(){

    if(!Number(this.data.weight)){return}

    function findIt(arr, key, val){
      return arr.filter(v=>{
        return v[key] == val;
      });
    }
    let data = {
      adderid: that.data.receiveCountry&&findIt(that.data.receiveCountryRange, 'name', that.data.receiveCountry)[0].id,
      yunshuid: that.data.transport&&findIt(that.data.transportRange, 'name', that.data.transport)[0].id,
      huowuid: that.data.goodsType&&findIt(that.data.goodsTypeRange, 'name', that.data.goodsType)[0].id,
    }
    util.post('/api/Order/selectkg', data).then(res=>{
      let weight = res[0];
      if(Number(that.data.weight)>Number(weight)){
        that.setData({
          isShowContact: true
        });
      }
    });
  },

  // 预约日期picker
  dateChange(e){
    let val = e.detail.value;
    that.setData({
      date: val
    });
  },
  // 预约时间picker
  timeChange(e){
    let val = e.detail.value;
    let startTime = util.getToday().date.replace(/\//g, "-");
    that.setData({
      time: val,
      startTime
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

    // 初始化数据
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