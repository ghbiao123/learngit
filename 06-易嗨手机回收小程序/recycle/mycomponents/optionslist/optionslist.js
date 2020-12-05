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
    },
    scrollHeight: {
      type: Number,
      value: 792,
      observer(newVal){
        this.setData({
          scrollHeight: newVal
        });
      }
    }
  },
  data:{
    arrSelected: []
  },
  observers: {
    "arrConfig,arrOther": function(newConfigVal, newOtherVal){
      // 数据格式化
      let arrC = newConfigVal.map(v=>{
        return v.data;
      });
      let arrO = newOtherVal.map(v=>{
        return v.inquiryinfo
      });
      this.data.arrData = [...arrC, ...arrO];
      
      // 向组件传递的数据， 隐藏列表数据
      let arrLen = newConfigVal.length + newOtherVal.length;
      let arrSelected = new Array(arrLen).fill(0);
      arrSelected = arrSelected.map(v=>{
        let data = {value:"", isShow: true};
        return data
      });

      this.setData({
        arrSelected
      });
    }
  },
  lifetimes:{
    attached(){
      
    },
    ready(){
      
    }
  },
  methods: {
    radioChange(e){
      
      // 所选选项的id
      let id = e.detail.value;
      // 显示所选val
      let idx = e.currentTarget.dataset.idx;
      this.showValue(idx, id);

      // 向父组件传递数据
      this.triggerEvent("radioChange", e);
    },
    showValue(idx, id){

      // typeof item => Array
      let item = this.data.arrData[idx];
      
      let arrSelected = [...this.data.arrSelected];
      arrSelected[idx].value = item.filter(v=>{
        return v.id == id
      })[0].name;
      arrSelected[idx].isShow = false;

      this.setData({
        arrSelected
      });
      
    },
    changeConfig(e){
      let idx = e.currentTarget.dataset.idx;
      let arrSelected = this.data.arrSelected;
      arrSelected[idx].isShow = !arrSelected[idx].isShow;
      this.setData({
        arrSelected
      });
    }
  }
});