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
        }
      }

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

  onShareAppMessage: function () {

  }
  
})
