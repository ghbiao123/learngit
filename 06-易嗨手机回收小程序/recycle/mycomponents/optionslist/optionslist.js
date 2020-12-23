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
        this.setData({
          currentIndex: newVal
        });
      }
    },
    hideCode: {
      type: Number,
      value: 200,
      observer(newVal){
        this.setData({
          hideCode: newVal,
          idx: this.data.idx
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
    },
    key: {
      type: String,
      value: ""
    }
  },
  data:{
    arrSelected: []
  },
  observers: {
    "arrConfig,arrOther": function(newConfigVal, newOtherVal){
      // 数据格式化
      let that = this;
      let arrC = newConfigVal.map(v=>{
        return v.data;
      });
      let arrO = newOtherVal.map(v=>{
        return v[that.data.key];
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

      let viewId = idx;
      if(viewId != this.data.arrSelected.length - 1){
        this.setData({
          idx: viewId
        });
      }

      // 向父组件传递数据
      this.triggerEvent("radioChange", e);
    },
    // 显示所选内容
    showValue(idx, id){

      if(idx == this.data.arrData.length - 1) return;

      // item => 当前所选选项
      let item = this.data.arrData[idx].filter(v=>{
        return v.id == id
      })[0];
      
      let arrSelected = [...this.data.arrSelected];
      arrSelected[idx].value = item.name;
      arrSelected[idx].isShow = false;

      this.setData({
        arrSelected
      });
      
    },
    // 修改配置按钮
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