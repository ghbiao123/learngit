//index.js
let that;
let util = require("../../utils/util");
Page({
  data: {
    selected: 0,
  },
  //事件处理函数
  
  onLoad: function () {
    that = this;

    this.init();

  },

  init(){

    util.post("/api/shou_ye/getshouye").then(res=>{

      let pageData = {
        topBannerList: [],
        projectList: [],
        bottomBanner: {
          title: "",
          list: []
        },
        phoneNum: ''
      }

      // phone number
      pageData.phoneNum = res.data.phoneNum;

      // top banner
      pageData.topBannerList = util.getImageFullUrl( res.data.toplunbo, "lunboimage");

      // project
      pageData.projectList = arrTrans(3, util.getImageFullUrl( res.data.levelone, "flimage"));

      // bottom banner
      pageData.bottomBanner.title = res.data.underlunbo.undername;
      pageData.bottomBanner.list = arrTrans(3, util.getImageFullUrl(res.data.underlunbo.underlunboimg, "showimage"));


      that.setData({
        pageData
      });

      function arrTrans(num, arr){
        let newArr = [];
        arr.forEach((v,i)=>{
          let line = Math.floor(i/num);
          if(!newArr[line]){
            newArr[line] = [];
          }
          newArr[line].push(v);
        });
        return newArr;
      }


    });

    // 初始化code session——key
    wx.login({
      success(res){
        let code = res.code;
        util.post("/api/wxlogin/getSession", {
          code
        }).then(res => {
          let data = {
            code: code
          }
          data.openid = res.data.openid;
          data.session_key = res.data.session_key;
         wx.setStorage({
           data: data,
           key: 'login',
         });
        });
      }
    });

    wx.getStorage({
      key: 'pageurl',
      success(res){
        let url = res.data;
        if(url){
          wx.navigateTo({
            url,
          });
        }
      },
      complete(){
        wx.setStorage({
          data: "",
          key: 'pageurl',
        });
      }
    });

  },

  makePhoneCall(e){
    if(!this.data.pageData.phoneNum){
      return;
    }
    wx.makePhoneCall({
      phoneNumber: this.data.pageData.phoneNum,
    });
  },

  bottomBannerChange(e){
     this.data.selected = e.detail.current;
  },

  prev(){
    let selected = this.data.selected;
    selected --;
    if(selected < 0){
      selected = this.data.pageData.bottomBanner.list.length - 1;
    }
    this.setData({
      selected
    });
  },
  next(){

    let selected = this.data.selected;
    selected++;
    if(selected > this.data.pageData.bottomBanner.list.length - 1){
      selected = 0;
    }
    this.setData({
      selected
    });

  },

  onShow(){
    setTimeout(()=>{
      wx.setStorage({
        data: "",
        key: 'pageurl',
      });
    }, 200);
  },

  onShareAppMessage: function () {

  }
  
})
