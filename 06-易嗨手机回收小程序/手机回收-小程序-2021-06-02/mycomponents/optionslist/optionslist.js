Component({
  options: {
    addGlobalClass: true
  },
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
      
      let that = this;
      let arrC = newConfigVal.map(v=>{
        return v.data;
      });
      let arrO = newOtherVal.map(v=>{
        return v[that.data.key];
      });
      this.data.arrData = [...arrC, ...arrO];
      
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
      
     
      let id = e.detail.value;
      
   
      let idx = e.currentTarget.dataset.idx;
      this.showValue(idx, id);

      let viewId = idx;
      if(viewId != this.data.arrSelected.length - 1){
        this.setData({
          idx: viewId
        });
      }

     
      this.triggerEvent("radioChange", e);
    },
    
    showValue(idx, id){

      if(idx == this.data.arrData.length - 1) return;

     
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
    },
    // tipTap
    tipTap(e){
      let tip = e.currentTarget.dataset.tip;
      this.triggerEvent('tiptap', {tip});
    }
  }
});