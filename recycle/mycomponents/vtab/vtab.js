Component({
  data:{
    content:[0,1,2,3,4,5,6],
    selected: 0
  },
  properties:{
    vtab:{
      type:Array,
      value:[],
      observer(newVal){
        this.setData({
          vtab:newVal
        });
      }
    }
  },
  methods:{
    getSelected(e){
      let selected = e.currentTarget.dataset.index;
      this.setData({
        selected
      });
    }
  }
});