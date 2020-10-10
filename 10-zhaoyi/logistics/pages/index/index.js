//index.js
let that;
let utils = require("../../utils/util");
Page({
  data: {
    bannerList:[],
    arrBetterChoice:[],
    newsList:[]
  },
  //事件处理函数
  
  onLoad: function () {
    that = this;
    this.init();
  },
  getChoiceDetail(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/choicedetail/choicedetail?id='+id,
    });
  },
  init(){
    function getFullUrl(arr, key){
      if(!arr || arr.length==0) return [];
      if(key){
        return arr.map(v=>{
          v[key] = utils.getSiteRoot() + (v[key] || '');
          return v;
        });
      }else{
        return utils.getSiteRoot() + arr;
      }
    }
    // banner
    utils.post('/api/order/selectimages').then(res=>{

      let bannerList = res.data.map(v => (utils.getSiteRoot() + v));
      that.setData({
        bannerList
      });
    });
    
    // batter choice
    utils.post('/api/Order/selectyouxuan').then(res=>{
      // let arrBetterChoice = getFullUrl(res, 'images');
      let arrBetterChoice = res;
      wx.setStorage({
        data: arrBetterChoice,
        key: 'choice',
      });
      that.setData({
        arrBetterChoice
      });
    });

    // news
    utils.post('/api/Order/selectgonggao').then(res=>{
      let newsList = getFullUrl(res, 'image');
      that.setData({
        newsList
      });
    });
  },

  onShareAppMessage: function () {

  }
  
})
