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
    },
    pselected: {
      type: Number,
      value: 0,
      observer(newVal){
        
        this.setData({
          selected: newVal-1
        });
      }
    }
  },
  methods:{
    getCurrentIndex(e){
      let selected = e.currentTarget.dataset.index;
      this.sendData(selected);
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
    sendData(selected){
      //  +1
      let id = this.data.title[selected].id;
      this.triggerEvent('tabChange', id);
    }
  }
});