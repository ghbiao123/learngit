let util = require("../../utils/util");
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
        }
      });
    },
    getDetail(e){
      let that = this;
      let idx = e.currentTarget.dataset.id;
      let data = this.data.list[idx];
      let assessid = data.id;
      util.post("/api/order/isValidityOrder", {
        assessid
      }).then(res=>{
        if(res.code == 1){
          wx.setStorage({
            data: data,
            key: 'currentmachine',
          });
          // `/pages/evaluation/result?type=${that.data.type}&name=${that.data._data.name}&price=${res.data.totalprice || 0}&frompage=evaluation&otype=1&orderid=${res.data.aoid}`
          wx.navigateTo({
            url: `/pages/evaluation/result?type=pc&name=${data.name}&price=${data.total_amount}&frompage=recyclelist&orderid=${data.id}&otype=${data.otype}`,
          });
        }else{
          let list = that.data.list;
          list[idx].remainingtime = 0;
          that.setData({
            list
          });
        }
      });

      return;
    }
  }
});