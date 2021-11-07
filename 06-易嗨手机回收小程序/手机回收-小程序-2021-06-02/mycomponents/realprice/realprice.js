Component({
  properties: {
    status:{
      type: Number,
      value: 0,
      observer(newVal){
        /**
         * 0，待验机
         * 1，代付款
         * 2，已完成
         * 3，已取消
         * 4，待发货
         */
        let name = ["预估价格", "验机价格", "成交价格", "预估价格", "预估价格",][newVal];
        this.setData({
          name
        });
      }
    },
    price:{
      type: Number,
      value: 0,
      observer(newVal){
        newVal = parseInt(newVal);
        this.setData({
          newVal
        });
      }
    },
   
  },
  observers: {
    
  },
  data:{
     name: "预估价格",
   }
});