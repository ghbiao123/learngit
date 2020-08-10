Component({
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/,
    multipleSlots: true
  },
  data:{
    selected:0
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
      console.log(e)
      let selected = e.detail.current;
      this.setData({
        selected
      });
    }
  }
});