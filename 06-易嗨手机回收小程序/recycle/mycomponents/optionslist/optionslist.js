Component({
  properties:{
    arrConfig: {
      type: Array,
      value: [],
      observer(newVal){
      }
    },
    arrSelected: {
      type: Array,
      value: [],
      observer(newVal){
      }
    },
    arrOther: {
      type: Array,
      value: []
    },
    currentIndex: {
      type: Number,
      value: 0,
      observer(newVal){
        console.log(newVal);
        this.setData({
          currentIndex: newVal
        });
      }
    },
    hideCode: {
      type: Number,
      value: 0,
      observer(newVal){
        this.setData({
          hideCode: newVal
        });
      }
    },
    arrChecked: {
      type: Array,
      value: [],
      observer(newVal){
        this.setData({
          arrChecked: newVal
        });
      }
    }
  },
  data:{
    arrSelected: []
  },
  observers: {
    "arrConfig,arrOther": function(newConfigVal, newOtherVal){
      // 向组件传递的数据， 隐藏列表数据
      let arrLen = newConfigVal.length + newOtherVal.length;
      let arrSelected = new Array(arrLen).fill({value:"", isShow: true});
      this.setData({
        arrSelected
      });
    }
  },
  lifetimes:{
    attached(){
      
    },
    ready(){
      console.log(this.data.arrConfig);
      console.log(this.data.arrOther);
    }
  },
  methods: {
    radioChange(e){
      console.log(e);
      // return;
      this.triggerEvent("radioChange", e);
    }
  }
});