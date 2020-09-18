Component({
  data:{
    
  },
  properties:{
    selected:{
      type: Number,
      value:1
    },
    titleL:{
      type:String
    },
    titleR:{
      type:String
    }
  },
  methods:{
    getSelected(e){
      let selected = e.currentTarget.dataset.id;
      this.setData({selected});
      this.triggerEvent("selected", selected);
    },
  }
});