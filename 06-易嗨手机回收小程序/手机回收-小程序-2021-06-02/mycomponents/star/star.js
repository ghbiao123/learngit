Component({
  properties:{
    num:{
      type:Number,
      value:0
    },
    size:{
      type:Number,
      value:30
    },
    comment:{
      type: Boolean,
      value: false
    }
  },
  methods:{
    comment(e){
      if(!this.__data__.comment) return;
      let num = e.currentTarget.dataset.num;
      this.setData({ num });
      this.triggerEvent("star",num);
    }
  }
});