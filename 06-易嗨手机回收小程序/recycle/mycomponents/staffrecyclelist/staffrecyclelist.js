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
    // 输入备注
    remarkInput(e){
      this.data.remark = e.detail.value;
    },
    // 确认备注
    confirmRemark(e){
      let id = e.currentTarget.dataset.id;
      let data = {
        id,
        remark: this.data.remark
      }
      util.post("/api/order/updateOrderRemark", data).then(res=>{
        console.log(res);
        return util.showSuccess(res.msg);
      });
    },
    // 复制信息
    copyText(e){
      let text = e.currentTarget.dataset.text;
      wx.setClipboardData({
        data: text,
        success(res){
          console.log(res);
        }
      });
    },
    // 获取详情
    getDetail(e){
      let id = e.currentTarget.dataset.id;
      let data = this.data.list.filter(v=>{
        return v.id == id;
      });
      if(data[0].order_status == 0 ){
        wx.navigateTo({
          url: '/pages/stafforder/stafforder?id=' + id,
        });
      }
      if(data[0].order_status == 1){
        wx.redirectTo({
          url: '/pages/paymentmethod/paymentmethod?orderid='+ data[0].orderid,
        });
      }
    }
  }
});
