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
      let idx = e.currentTarget.dataset.id;
      let data = this.data.list[idx];



      wx.setStorage({
        data: data,
        key: 'currentmachine',
      });
      // `/pages/evaluation/result?type=${that.data.type}&name=${that.data._data.name}&price=${res.data.totalprice || 0}&frompage=evaluation&otype=1&orderid=${res.data.aoid}`
      wx.navigateTo({
        url: `/pages/evaluation/result?type=pc&name=${data.name}&price=${data.total_amount}&frompage=recyclelist&orderid=${data.id}&otype=${data.otype}`,
      });
    }
  }
});