let that;
Component({
  properties:{
    placeholder:{
      type: String,
      value:"搜索"
    },
    coverholder:{
      type: String,
      value:"搜索"
    },
    theme:{
      type:String,
      value:'#f5f5f5'
    }
  },
  data:{
    isFocus: false,
    result:''
  },
  created(){
    that = this;
  },
  methods:{
    onTap(){
      that.setData({  isFocus:true  });
    },
    clearValue(){
      let isFocus = true;
      if(!this.data.result){
        isFocus = false;
      }
      this.data.result = '';
      this.triggerEvent('getinput','');
      that.setData({value:this.data.result, isFocus});
      
    },
    getInput(e){
      this.data.result = e.detail.value;
      this.triggerEvent('getinput',e.detail.value);
    },
    getComfirm(e){
      this.triggerEvent('searchbar',e.detail.value);
    }
  }
});