// pages/evaluation/evaluation.js
let util = require("../../utils/util");
let that;
let result;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    progressData:{
      chose: 0,
      all: 10
    },
    reqData:{
      inquiryinfo:{
        last: ''
      }
    },
    _data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    result = {};

    // init 
    this.init();

  },
  init(){
    let mid = 3;
    this.data.reqData.mid = mid;
    util.post('/api/order/getInquiryInfo', {mid}).then(res=>{
      console.log(res);

      let _data = res.data;
      _data.image = util.getImageFullUrl(_data.image);

      let progressData = that.data.progressData;
      progressData.all = _data.other.length + 3;

      that.setData({
        _data,
        progressData,
        hideCode: progressData.all
      });
    });
  },

  radioChange(e){

    let val = e.detail.value;
    let id = e.currentTarget.dataset.id;

    let hiddenCode = ['1', '3', '5'];

    if(hiddenCode.indexOf(val)==0 || hiddenCode.indexOf(val)==1){
      // 5 -all hidden
      this.setData({
        hideCode: 4
      });
    }else if(hiddenCode.indexOf(val)==2){
      // 6 - all hidden
      this.setData({
        hideCode: 5
      });
    }else{
      this.setData({
        hideCode: 555
      });
    }

    
    if(Number(id)||Number(id)==0){
      if(id != this.data._data.other.length-1){
        this.data.reqData.inquiryinfo[id] = this.data._data.other[id].inquiryinfo.filter(v=> v.id == val)[0];
      }else if(id == this.data._data.other.length-1){
        this.data.reqData.inquiryinfo.last = val;
      }
    }else{
      this.data.reqData[id] = val;
    }

    let progressData = this.data.progressData;
    progressData.chose = Object.keys(this.data.reqData).length - 2 + Object.keys(this.data.reqData.inquiryinfo);
    let progress = util.getToPersent(progressData.chose / progressData.all);
   
    this.setData({
      progress,
      progressData
    });

  },
  // 跳转估价结果页
  getResult(e){
    let data = this.data.reqData;
    let inquiryinfo = [];
    for(let key in data.inquiryinfo){
      if(key != 'last'){
        inquiryinfo.push(data.inquiryinfo[key]);
      }else{
        let len = this.data._data.other.length;
        let arr = this.data._data.other[len-1].inquiryinfo.filter(v=>{
          if(data.inquiryinfo.last.indexOf(v.id.toString())>=0){
            return v;
          }
        });
        inquiryinfo.push(...arr);
      }
    }

    data.inquiryinfo = JSON.stringify(inquiryinfo);

    util.post('/api/order/calculatePrice', data).then(res=>{
      console.log(res);
      if(res.code == 1){
        wx.navigateTo({
          url: `/pages/evaluation/result?name=${that.data._data.name}&price=${res.data.totalprice}`,
        });
      }else{
        
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