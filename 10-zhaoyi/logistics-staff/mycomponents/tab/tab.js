Component({
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/,
    multipleSlots: true
  },
  data:{
    selected:0
  },
  ready(){
    let that = this;
    let window = wx.getSystemInfoSync();
    let query = wx.createSelectorQuery().in(this);
    query.select("#tab").boundingClientRect(res=>{
      let scrollHeight = (window.windowHeight - res.height) * 2 - 20;
      that.setData({
        scrollHeight
      });
    }).exec();
  },
  properties:{
    title:{
      type: Array,
      value:[],
      observer(newVal){
        this.setData({
          title: newVal
        })
      }
    }
  },
  methods:{
    getCurrentIndex(e){
      let selected = e.currentTarget.dataset.index;
      this.setData({
        selected
      });
    },
    swiperChange(e){
      let selected = e.detail.current;
      this.setData({
        selected
      });
    },
    reachBottom(e){
    },
    pullDown(e){
      console.log(e);
      let that = this;
      this.triggerEvent('pullDown', true);
      setTimeout(()=>{
        that.setData({
          refresher: false
        });
      }, 1500);
    }
  }
});