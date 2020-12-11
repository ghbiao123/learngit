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
      // let id = e.currentTarget.dataset.id;
      // let data = this.data.list.filter(v=>{
      //   return v.id == id;
      // });
      let idx = e.currentTarget.dataset.idx;
      let data = this.data.list[idx];
      console.log(data);
      // 待验机
      if(data.order_status == 0 || data.order_status == 4){

        // 人工估价
        if(data.estimate_type == 0){
          // 估算方式，0：系统，1：人工
          wx.setStorage({
            data: data,
            key: 'staffmachine',
            success(res){
              wx.navigateTo({
                // id=>mid,cid=>cid,orderid=>orderid
                url: `/pages/staffevaluation/evaluation?id=${data.m_id}&cid=${data.c_id}&orderid=${data.id}`,
              });
            }
          });
          
        }

        if(data.estimate_type == 1){
          // 估算方式，0：系统，1：人工
          wx.setStorage({
            data: data,
            key: 'newstaffmachine',
            success(res){
              wx.navigateTo({
                // id=>mid,cid=>cid,orderid=>orderid
                url: `/pages/stafforder/stafforder`,
              });
            }
          });

          
        }

        // wx.navigateTo({
        //   url: '/pages/stafforder/stafforder?id=' + id,
        // });
      }
      // 代付款
      if(data.order_status == 1){
        wx.redirectTo({
          url: '/pages/paymentmethod/paymentmethod?orderid='+ data.id,
        });
      }
    }
  }
});
