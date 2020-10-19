//index.js
let that;
let utils = require("../../utils/util");
Page({
  data: {
    bannerList:[],
    arrBetterChoice:[],
    newsList:[],
    page: 1,
    hasMore: true
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

    this.getNewsList();
    
  },

  // 获取首页新闻
  getNewsList(){
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
    // news
    let page = this.data.page;
    utils.post('/api/Order/selectgonggao', {page}).then(res=>{
      let list = getFullUrl(res.data, 'image');
      console.log(list);
      let newsList = that.data.newsList;
      newsList.push(...list);
      that.data.hasMore = res.has_more;
      that.setData({
        newsList
      });
    });
  },
  onReachBottom(){
    if(!this.data.hasMore){
      return utils.showSuccess('已加载所有新闻公告');
    }
    this.data.page++;
    this.getNewsList();
  },

  onShareAppMessage: function () {

  }
  
})
