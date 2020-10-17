Component({
  properties:{
    list:{
      type: Array,
      value:[],
      observer(newVal){
        this.setData({
          list: newVal,
          status: 1
        });
      }
    }
  },
  methods:{
    copyText(e){
      let text = e.currentTarget.dataset.text;
      wx.setClipboardData({
        data: text,
        success(res){
          console.log(res);
        }
      });
    },
    getDetail(e){
      let id = e.currentTarget.dataset.id;
      let data = this.data.list.filter(v=>{
        return v.id == id;
      });
      if(data[0].order_status != 0 ){
        return
      }
      wx.navigateTo({
        url: '/pages/stafforder/stafforder?id=' + id,
      });
    }
  }
});
